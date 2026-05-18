# AGENTS.md — Rotorflight Docs

## Project Overview

MkDocs Material static site for [Rotorflight](https://www.rotorflight.org/) — an open-source RC helicopter flight controller. Python ≥ 3.10 required.

## Architecture

* **`docs/`** — All documentation in Markdown. Subdirectories mirror the nav in `mkdocs.yml`.
* **`docs/blog/`** — Blog posts (announcements). Posts live in `docs/blog/posts/`, authors in `docs/blog/.authors.yml`.
* **`docs/stylesheets/extra.css`** — Custom CSS (Rotorflight orange brand colour).
* **`mkdocs.yml`** — Site config: theme, plugins, nav, markdown extensions.
* **`requirements.txt`** — Python deps: mkdocs-material, mike, pymdown-extensions.
* **`versioned_docs/`** — Legacy Docusaurus versioned content. Not built by MkDocs. Will be migrated to `mike` versioned deploys.

## Key Commands

```bash
mkdocs serve           # Dev server at localhost:8000 with hot reload
mkdocs build           # Production build → /site
mkdocs build --strict  # Build with warnings as errors (used in CI)
```

## Versioning (mike)

Versions are deployed via `mike`. Each version is a separate deploy to the `gh-pages` branch:

```bash
mike deploy --push --update-aliases <version> latest
mike set-default --push latest
```

The GitHub Actions workflow deploys `main` automatically as `latest`.

## Content Conventions

* All documentation is plain Markdown (`.md`). No MDX or React components.
* Admonitions use MkDocs Material syntax: `!!! note "Title"` with 4-space indented content.
* Tabbed content uses `=== "Tab Name"` with 4-space indented content (pymdownx.tabbed).
* Mermaid diagrams work in fenced code blocks: ` ```mermaid `.
* Images live in `img/` subdirectory alongside the referencing document.
* Internal links must include `.md` extension (e.g., `[link](../other-page.md)`).
