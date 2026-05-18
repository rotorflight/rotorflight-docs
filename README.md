# rotorflight-docs

Documentation site for [rotorflight.org](https://www.rotorflight.org/), built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

All documentation lives in the [`docs/`](docs/) folder as plain Markdown. No Node.js, no React, no build-time transpilation — just Python and Markdown.

---

## Prerequisites

| Tool | Minimum version | Check |
|------|----------------|-------|
| Python | 3.10 | `python --version` |
| pip | any recent | `pip --version` |
| Git | any | `git --version` |

---

## Quick start

```bash
git clone https://github.com/rotorflight/rotorflight-docs
cd rotorflight-docs
```

Then run the setup script for your platform:

**Windows (PowerShell)**
```powershell
.\setup.ps1
```

**Linux / macOS**
```bash
bash setup.sh
```

The script creates a virtual environment, installs dependencies, and starts the dev server at <http://localhost:8000>.

---

## Manual setup

If you prefer not to use the setup scripts:

```bash
# 1. Create and activate a virtual environment (recommended)
python -m venv .venv

# Windows
.venv\Scripts\activate
# Linux / macOS
source .venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the dev server
mkdocs serve
```

The dev server hot-reloads on every file save.

---

## Commands

| Command | Description |
|---------|-------------|
| `mkdocs serve` | Live dev server at http://localhost:8000 |
| `mkdocs build` | Build static site to `site/` |
| `mkdocs build --strict` | Build and treat warnings as errors (used in CI) |

---

## Deployment

The site is deployed to GitHub Pages automatically on every push to `main` via GitHub Actions (`mkdocs gh-deploy`). No manual steps are needed for a normal release.

### Manual deploy (maintainers)

If you need to deploy outside of CI — for example to test a hotfix — run from the repo root:

```bash
mkdocs gh-deploy --force
```

This builds the site and pushes the output directly to the `gh-pages` branch.

---

## Repository layout

```
rotorflight-docs/
├── docs/                   # All documentation (Markdown)
│   ├── index.md            # Home page
│   ├── blog/               # Announcements
│   │   ├── .authors.yml    # Blog author profiles
│   │   └── posts/          # One .md file per post
│   ├── controllers/        # Supported flight controllers
│   ├── configurator/       # Configurator tab documentation
│   ├── setup/              # Tutorial – setup guides
│   ├── Tuning/             # Tuning guides
│   ├── download/           # Download pages
│   ├── Manufacturers/      # Hardware design docs
│   ├── Contributing/       # Contributor guides
│   └── stylesheets/        # Custom CSS
├── mkdocs.yml              # Site configuration
├── requirements.txt        # Python dependencies
├── setup.ps1               # Windows setup script
├── setup.sh                # Linux / macOS setup script
└── .github/workflows/      # CI/CD (build test + deploy)
```

---

## Writing documentation

- All pages are plain Markdown (`.md`). No MDX or React.
- **Admonitions:** `!!! note "Title"` with 4-space indented content. Types: `note`, `tip`, `warning`, `info`, `danger`.
- **Tabbed content:** `=== "Tab Name"` with 4-space indented content.
- **Mermaid diagrams:** fenced code blocks with `mermaid` language tag.
- **Images:** place in an `img/` subdirectory next to the page, reference as `![alt](./img/file.png)`.
- **Internal links:** always include `.md` extension, e.g. `[Arming](../setup/arming.md)`.

Full guide: [Contributing → Editing the Website](docs/Contributing/Editing-the-Website.md)

