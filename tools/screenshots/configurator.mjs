// Captures Rotorflight Configurator screenshots for the docs.
//
// Drives the web build of the Configurator (cfg.rotorflight.org by default)
// with Playwright, connects to the built-in Virtual FC, and saves one PNG per
// tab into docs/assets/images/configurator/.
//
// Usage:
//   node configurator.mjs [--url URL] [--fw "Rotorflight 2.3.x"] [--out DIR]
//                         [--theme dark|light] [--tabs status,setup,...] [--expert]
//
// --url defaults to the master (development) build. Point it at a local
// `VITE_APP_BACKEND=web pnpm vite` server to capture unreleased changes.
//
// Real flight controller, read-only:
//   node configurator.mjs --cdp http://127.0.0.1:9222 --port COM4
// attaches to a desktop Configurator started with
// `nw --remote-debugging-port=9222 <configurator checkout>` and connects to
// that port instead of the Virtual FC. Nothing is ever saved to the board:
// the optional-tab and prepare steps are skipped, and a tab that asks to
// save stops the run.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = path.dirname(fileURLToPath(import.meta.url));

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .join(" ")
    .split(/\s+--/)
    .filter(Boolean)
    .map((a) => {
      const [k, ...v] = a.replace(/^--/, "").split(" ");
      return [k, v.join(" ") || true];
    }),
);

const url = args.url || "https://cfg.rotorflight.org/master/";
const fwLabel = args.fw || "Rotorflight 2.4.x";
const outDir = path.resolve(args.out || path.join(here, "../../docs/assets/images/configurator"));
const theme = args.theme || "dark";
const width = Number(args.width || 1440);
const height = Number(args.height || 900);
const realPort = args.port;

// Tab class (li.tab_<name>) -> output file name. Order matches the nav.
const ALL_TABS = [
  "status",
  "setup",
  "configuration",
  "presets",
  "power",
  "receiver",
  "failsafe",
  "mixer",
  "servos",
  "motors",
  "governor",
  "profiles",
  "rates",
  "gyro",
  "auxiliary",
  "adjustments",
  "gps",
  "led_strip",
  "remap_fc",
  "beepers",
  "sensors",
  "crsf_sensors",
  "xact_servo",
  "esc_programming",
  "blackbox",
  "cli",
];
const tabs = args.tabs ? args.tabs.split(",") : ALL_TABS;

fs.mkdirSync(outDir, { recursive: true });

let browser, page;
if (args.cdp) {
  browser = await chromium.connectOverCDP(args.cdp);
  page = browser.contexts().flatMap((c) => c.pages()).find((p) => /main\.html|index\.html/.test(p.url()));
  if (!page) throw new Error(`no Configurator window at ${args.cdp}`);
  await page.emulateMedia({ colorScheme: theme });
  // NW.js keeps chrome.serial connections across a reload; close any left
  // over from an earlier run, or the port fails to open.
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        if (!globalThis.chrome?.serial) return resolve();
        chrome.serial.getConnections((cs) => {
          if (!cs.length) return resolve();
          let left = cs.length;
          for (const c of cs) chrome.serial.disconnect(c.connectionId, () => --left || resolve());
        });
      }),
  );
} else {
  browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    colorScheme: theme,
  });
  page = await context.newPage();
}
page.on("pageerror", (e) => console.warn("page error:", e.message));

// Grow the window until the tab's scrolling content fits, so one image shows
// the whole tab (--crop keeps the fixed window size instead).
async function fitContent() {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => {
    let extra = 0;
    for (const el of document.querySelectorAll("#content, #content *")) {
      const style = getComputedStyle(el);
      if (!/(auto|scroll)/.test(style.overflowY)) continue;
      extra = Math.max(extra, el.scrollHeight - el.clientHeight);
    }
    return extra;
  });
  if (overflow > 0) {
    await page.setViewportSize({ width, height: Math.min(height + overflow + 20, 4000) });
  }
}

// Tabs whose content is an open-ended list; a fixed window shows them better.
const FIXED_HEIGHT_TABS = ["presets", "cli", "welcome", "firmware-flasher"];

async function shot(name) {
  if (args.crop || FIXED_HEIGHT_TABS.includes(name)) {
    await page.setViewportSize({ width, height });
  } else {
    await fitContent();
  }
  // Let charts, 3D models and fade-ins settle before capturing.
  await page.waitForTimeout(1500);
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file });
  console.log("saved", path.relative(process.cwd(), file));
}

if (!args.cdp) await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector("#port");

// Pre-connect screens.
await shot("welcome");

if (!args.tabs || tabs.includes("firmware_flasher")) {
  await page.click("li.tab_firmware_flasher a");
  await page.waitForTimeout(1000);
  await shot("firmware-flasher");
  await page.click("li.tab_landing a");
}

if (realPort) {
  await page.selectOption("#port", realPort);
} else {
  // Pick the Virtual FC and the firmware version to emulate.
  await page.selectOption("#port", "virtual");
  await page.waitForSelector("#firmware-version-dropdown", { state: "visible" });
  await page.selectOption("#firmware-version-dropdown", { label: fwLabel });
}

await page.click("#connectbutton a.connect");
await page.waitForSelector("#tabs ul.mode-connected li.tab_status", { state: "visible", timeout: 30000 });
await page.waitForTimeout(2000);

// Open a tab. A tab with unsaved changes asks before letting go: answer Save,
// which is harmless on the Virtual FC (Revert would also undo
// enableOptionalTabs()).
async function goto(tab) {
  const link = page.locator(`#tabs li.tab_${tab} a`);
  await link.click();
  const exitDialog = page.locator("dialog.dialogTabExit[open]");
  if (await exitDialog.isVisible({ timeout: 1000 }).catch(() => false)) {
    if (realPort) throw new Error(`leaving a tab for ${tab} asks to save; stopping so nothing is written to the board`);
    await exitDialog.locator(".tabExitSaveBtn").click();
    await page.waitForTimeout(1000);
    if (!(await page.locator(`#tabs li.tab_${tab}.active`).count())) await link.click();
  }
  await page.waitForTimeout(1500);
}

// Turn on the optional features and port functions that gate the GPS, LED
// Strip, CRSF Sensors and XACT tabs, so every tab can be captured.
async function enableOptionalTabs() {
  await goto("configuration");
  for (const feature of ["GPS", "LED_STRIP"]) {
    const toggle = page.locator(`#feature-${feature}`);
    if (!(await toggle.isChecked())) await toggle.evaluate((el) => el.click());
  }
  // The Virtual FC's UART4 and UART5 are unused.
  const portSelect = (uart) =>
    page.locator("table.ports tr", { hasText: uart }).locator("select").first();
  await portSelect("UART4").selectOption({ label: "CRSF Sensors" });
  await portSelect("UART5").selectOption({ label: "F.BUS" });
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Save and Reboot" }).click();
  // The Virtual FC "reboots" and the tab list is rebuilt for the new features.
  await page.locator("#tabs li.tab_gps").waitFor({ state: "visible", timeout: 30000 });
  await page.waitForTimeout(2000);
  // Opening Configuration again re-runs updateTabList with the new ports,
  // which shows the CRSF Sensors and XACT tabs.
  await goto("status");
  await goto("configuration");
}

if (!realPort && !args["no-optional"]) await enableOptionalTabs().catch((e) => console.warn("enableOptionalTabs:", e.message));

if (args.expert) {
  // The checkbox is hidden behind a Switchery toggle.
  await page.click("#expert-mode .switchery");
  await page.waitForTimeout(1000);
}

// Pick an entry in one of the Configurator's searchable picker dialogs.
async function pick(openButton, search) {
  await page.click(openButton);
  const dialog = page.locator("dialog[open]").last();
  await dialog.locator("input").first().fill(search);
  await page.waitForTimeout(300);
  // Entries are buttons whose name starts with the title (then the
  // description); group headings can share the text, so match buttons only.
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  await dialog.getByRole("button", { name: new RegExp(`^${escaped}`) }).first().click();
  await page.waitForTimeout(300);
}

// Some tabs are empty on a fresh Virtual FC. Fill them in through the UI so
// the screenshot shows what a configured tab looks like. Nothing is saved.
const PREPARE = {
  async auxiliary() {
    await page.locator(".add", { hasText: "Add Range" }).first().click();
    for (const mode of ["ANGLE", "RESCUE", "BLACKBOX", "GOVERNOR BYPASS"]) {
      await pick("button.add-mode", mode);
    }
  },
  async remap_fc() {
    await page.getByRole("button", { name: "Read FC" }).click();
    await page.getByText("Reading FC").waitFor({ state: "detached", timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(2000);
  },
  async esc_programming() {
    await page.getByLabel("I have removed the propellers/blades").check();
    await page.waitForTimeout(1000);
  },
  async adjustments() {
    for (const fn of ["Profile Selection", "Rate Profile Selection", "Battery Profile Selection"]) {
      await pick("button.add-btn", fn);
    }
  },
};

for (const tab of tabs) {
  if (tab === "firmware_flasher") continue;
  const link = page.locator(`#tabs li.tab_${tab} a`);
  if (!(await link.isVisible())) {
    console.warn(`tab ${tab} not shown for this firmware/expert mode, skipping`);
    continue;
  }
  await goto(tab);
  await page.waitForSelector("#content .tab-" + tab.replace(/_/g, "-") + ", #content > *", { timeout: 15000 }).catch(() => {});
  if (PREPARE[tab] && !realPort) {
    await page.waitForTimeout(1000);
    await PREPARE[tab]().catch((e) => console.warn(`prepare ${tab} failed:`, e.message));
  }
  await shot(tab.replace(/_/g, "-"));
  // Throw away what a prepare step changed, so leaving the tab doesn't prompt.
  if (PREPARE[tab] && !realPort) {
    const revert = page.getByRole("button", { name: "Revert" });
    if (await revert.isVisible().catch(() => false)) await revert.click();
    await page.waitForTimeout(500);
  }
}

if (args.cdp) {
  // Leave the desktop app running, just disconnected from the board.
  await page.click("#connectbutton a.connect").catch(() => {});
  await page.waitForTimeout(1000);
}
await browser.close();
