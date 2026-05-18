#!/usr/bin/env bash
# Rotorflight Docs – Linux / macOS setup script
# Creates a virtual environment, installs dependencies, and starts the dev server.
#
# Usage:  bash setup.sh           (install + serve)
#         bash setup.sh --build   (install + build only)
#         bash setup.sh --no-serve (install only)

set -euo pipefail

BUILD=0
NO_SERVE=0

for arg in "$@"; do
    case "$arg" in
        --build)    BUILD=1 ;;
        --no-serve) NO_SERVE=1 ;;
    esac
done

step() { printf "\n\033[0;36m==> %s\033[0m\n" "$1"; }
abort() { printf "\n\033[0;31mERROR: %s\033[0m\n" "$1" >&2; exit 1; }

# ── 1. Check Python ───────────────────────────────────────────────────────────
step "Checking Python"
PYTHON=""
for cmd in python3 python; do
    if command -v "$cmd" &>/dev/null; then
        ver=$("$cmd" --version 2>&1)
        major=$(echo "$ver" | sed 's/Python \([0-9]*\).*/\1/')
        minor=$(echo "$ver" | sed 's/Python [0-9]*\.\([0-9]*\).*/\1/')
        if [ "$major" -ge 3 ] && [ "$minor" -ge 10 ]; then
            PYTHON="$cmd"
            echo "  Found: $ver"
            break
        fi
    fi
done
[ -z "$PYTHON" ] && abort "Python 3.10+ not found. Install from https://www.python.org/downloads/"

# ── 2. Create virtual environment ─────────────────────────────────────────────
VENV=".venv"
if [ ! -d "$VENV" ]; then
    step "Creating virtual environment in .venv"
    "$PYTHON" -m venv "$VENV"
else
    step "Virtual environment already exists, skipping creation"
fi

# ── 3. Activate ───────────────────────────────────────────────────────────────
step "Activating virtual environment"
# shellcheck disable=SC1091
source "$VENV/bin/activate"

# ── 4. Install dependencies ───────────────────────────────────────────────────
step "Installing dependencies from requirements.txt"
pip install -r requirements.txt --quiet

# ── 5. Verify ─────────────────────────────────────────────────────────────────
step "Verifying installation"
mkdocs --version

# ── 6. Run ────────────────────────────────────────────────────────────────────
if [ "$BUILD" -eq 1 ]; then
    step "Building site"
    mkdocs build --strict
    printf "\n\033[0;32mBuild complete. Output is in the site/ directory.\033[0m\n"
elif [ "$NO_SERVE" -eq 0 ]; then
    printf "\n\033[0;32mSetup complete. Starting dev server...\033[0m\n"
    printf "Open http://localhost:8000 in your browser. Press Ctrl+C to stop.\n\n"
    mkdocs serve
else
    printf "\n\033[0;32mSetup complete. Run 'mkdocs serve' to start the dev server.\033[0m\n"
fi
