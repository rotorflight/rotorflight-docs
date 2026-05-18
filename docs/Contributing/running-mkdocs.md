# Running Rotorflight Docs Locally

This guide walks through installing Python, cloning the repository, installing dependencies, and running the MkDocs development server.

## 1. Install Git

Git is required to clone the repository.

```bash
git --version
```

If not installed, download from [git-scm.com](https://git-scm.com/).

## 2. Install Python 3.10+

MkDocs requires Python 3.10 or newer.

```bash
python --version
```

If not installed, download from [python.org](https://www.python.org/downloads/).

## 3. Clone the Repository

```bash
git clone https://github.com/rotorflight/rotorflight-docs.git
cd rotorflight-docs
```

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

This installs MkDocs, the Material theme, and all required plugins.

## 5. Run the Development Server

```bash
mkdocs serve
```

Opens a live-reload server at <http://localhost:8000>. The site updates automatically on each file save.

## 6. Build the Production Site

```bash
mkdocs build
```

Output is written to the `site/` directory (not committed to git).

## 7. Deploy (maintainers only)

Deployment is handled automatically by GitHub Actions on every push to `main`. The site is published via `mike` which manages versioned documentation on the `gh-pages` branch.

To deploy a specific version manually:

```bash
mike deploy --push --update-aliases 2.3.0 latest
mike set-default --push latest
```
