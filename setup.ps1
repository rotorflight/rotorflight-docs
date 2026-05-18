# Rotorflight Docs – Windows setup script
# Creates a virtual environment, installs dependencies, and starts the dev server.
#
# Usage:  .\setup.ps1          (install + serve)
#         .\setup.ps1 -Build   (install + build only)
#         .\setup.ps1 -NpServe (install only, no server)

param(
    [switch]$Build,
    [switch]$NoServe
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step([string]$msg) {
    Write-Host "`n==> $msg" -ForegroundColor Cyan
}

function Abort([string]$msg) {
    Write-Host "`nERROR: $msg" -ForegroundColor Red
    exit 1
}

# ── 1. Check Python ───────────────────────────────────────────────────────────
Write-Step "Checking Python"
try {
    $ver = & python --version 2>&1
    Write-Host "  Found: $ver"
    $parts = ($ver -replace "Python ", "") -split "\."
    if ([int]$parts[0] -lt 3 -or ([int]$parts[0] -eq 3 -and [int]$parts[1] -lt 10)) {
        Abort "Python 3.10 or newer is required. Download from https://www.python.org/downloads/"
    }
} catch {
    Abort "Python not found. Download from https://www.python.org/downloads/"
}

# ── 2. Create virtual environment ─────────────────────────────────────────────
$venvDir = ".venv"
if (-not (Test-Path $venvDir)) {
    Write-Step "Creating virtual environment in .venv"
    python -m venv $venvDir
} else {
    Write-Host "`n==> Virtual environment already exists, skipping creation" -ForegroundColor Cyan
}

# ── 3. Activate ───────────────────────────────────────────────────────────────
Write-Step "Activating virtual environment"
$activate = Join-Path $venvDir "Scripts\Activate.ps1"
if (-not (Test-Path $activate)) {
    Abort "Could not find $activate. Try deleting .venv and re-running this script."
}
& $activate

# ── 4. Install dependencies ───────────────────────────────────────────────────
Write-Step "Installing dependencies from requirements.txt"
pip install -r requirements.txt --quiet

# ── 5. Verify ─────────────────────────────────────────────────────────────────
Write-Step "Verifying installation"
$mkdocsVer = & mkdocs --version 2>&1
Write-Host "  $mkdocsVer"

# ── 6. Run ────────────────────────────────────────────────────────────────────
if ($Build) {
    Write-Step "Building site"
    mkdocs build --strict
    Write-Host "`nBuild complete. Output is in the site/ directory." -ForegroundColor Green
} elseif (-not $NoServe) {
    Write-Host ""
    Write-Host "Setup complete. Starting dev server..." -ForegroundColor Green
    Write-Host "Open http://localhost:8000 in your browser. Press Ctrl+C to stop.`n"
    mkdocs serve
} else {
    Write-Host "`nSetup complete. Run 'mkdocs serve' to start the dev server." -ForegroundColor Green
}
