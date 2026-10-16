# rotorflight-docs

Source for [doc.rotorflight.org](https://doc.rotorflight.org), the documentation
for the Rotorflight helicopter flight controller firmware, Configurator,
Blackbox Explorer and radio Lua suites. Built with
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Local preview

```
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt   # .venv/bin/pip on Linux/macOS
.venv/Scripts/mkdocs serve
```

Then open http://127.0.0.1:8000/. In VS Code, the "MkDocs serve" task does
the same.

## Structure

All content lives under `docs/` as plain Markdown. The site navigation is
defined in `mkdocs.yml` -- add new pages there as well as under `docs/` for
them to appear in the nav. Page images live in an `img/` folder next to the
page; Configurator screenshots live in `docs/assets/images/configurator/`.

## Screenshots

Configurator screenshots are generated, not hand-captured. The script in
`tools/screenshots/` opens the web Configurator at
[cfg.rotorflight.org](https://cfg.rotorflight.org), connects to its Virtual
FC and saves one image per tab:

```
cd tools/screenshots
npm install
npx playwright install chromium
node configurator.mjs --expert                 # all tabs, master build
node configurator.mjs --expert --tabs mixer    # just one tab
```

See the header of `configurator.mjs` for the other options (`--url` to point
at a local Configurator build, `--fw` to pick the emulated firmware, `--theme`,
`--crop`).

Ethos Lua suite screenshots are taken in the Ethos WASM simulator with the
`ethos-simulator` Claude Code plugin from
[FrSkyRC/ethos-tools](https://github.com/FrSkyRC/ethos-tools).

## Deployment

Pushing to `main` builds the site with `mkdocs build --strict` and publishes
it to the `gh-pages` branch via `.github/workflows/deploy.yml`, served at
[doc.rotorflight.org](https://doc.rotorflight.org). Pull requests run the
same strict build without deploying.
