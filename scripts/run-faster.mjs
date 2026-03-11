/**
 * Helper script to run Docusaurus with the experimental faster config enabled.
 *
 * Usage:
 *   node ./scripts/run-faster.mjs start   -> fast dev server (current version only)
 *   node ./scripts/run-faster.mjs build   -> fast production build (current version only)
 */
import { execSync } from "node:child_process";

const command = process.argv[2];
if (!command) {
  console.error("Usage: node run-faster.mjs <start|build>");
  process.exit(1);
}

execSync(`npx docusaurus ${command}`, {
  stdio: "inherit",
  env: { ...process.env, DOCUSAURUS_FASTER: "true" },
});
