# Editing the Docs

This site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
from the [rotorflight-docs](https://github.com/rotorflight/rotorflight-docs)
repository. Every page is a Markdown file under `docs/`, and every page has
an **edit** button (the pencil at the top) that opens it on GitHub.

## Small fixes

Click the pencil on the page, edit on GitHub, and propose the change. GitHub
forks the repository for you and opens a pull request.

## Bigger changes

```
git clone https://github.com/rotorflight/rotorflight-docs.git
cd rotorflight-docs
python -m venv .venv
.venv/bin/pip install -r requirements.txt     # .venv\Scripts\pip on Windows
.venv/bin/mkdocs serve
```

Open http://127.0.0.1:8000/; the site reloads as you edit. New pages must
also be added to `nav` in `mkdocs.yml`. Before opening a pull request, check
the strict build passes -- it's what the site's deployment runs:

```
mkdocs build --strict
```

## Writing style

- Write for pilots, in plain words. Say what a setting **does to the
  helicopter**, not just what it is.
- Keep each fact in one place and link to it. Settings are explained on the
  [Configurator](../configurator/index.md) tab pages; procedures live in the
  [Setup Guides](../setup/index.md).
- Check facts against the current firmware and Configurator source, not old
  forum posts. Mark features that only exist in the development version as
  *New in 2.4* (or whichever version).
- Put images in an `img/` folder next to the page. Keep photos under about
  200 KB; prefer SVG for diagrams, using colours that read on both the light
  and dark theme.

## Screenshots

Configurator screenshots are generated, so they stay current:

```
cd tools/screenshots
npm install
npx playwright install chromium
node configurator.mjs --expert                # all tabs
node configurator.mjs --expert --tabs mixer   # one tab
```

The script opens the web Configurator at
[cfg.rotorflight.org](https://cfg.rotorflight.org), connects to its Virtual
FC, and saves one image per tab in `docs/assets/images/configurator/`. See
the top of `configurator.mjs` for options -- a different Configurator build,
firmware version, theme, or fixed window size.

Ethos screenshots are taken in the Ethos WASM simulator with the
`ethos-simulator` Claude Code plugin from
[FrSkyRC/ethos-tools](https://github.com/FrSkyRC/ethos-tools).

## Generated pages

Two reference pages are generated from source code. Re-run the generators
after a firmware release, and commit the result:

```
python tools/gen_cli_settings.py <path to rotorflight-firmware> [git ref]
python tools/gen_telemetry_sensors.py <rotorflight-firmware> <rotorflight-configurator>
```

They write [CLI Settings](../reference/cli-settings.md) and the sensor table
on [Telemetry Sensors](../reference/telemetry.md).
