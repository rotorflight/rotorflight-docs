# Running Rotorflight Docs Locally

This guide walks through installing Node.js, cloning the Rotorflight‑docs repository, installing dependencies, and running the Docusaurus development server. Everything can be done directly from the terminal.

The purpose of the development server is you can make changes to a page very quickly and it will be immediately visible each time you save. Errors are immediately seen and can be fixed.

## 1. Install Git (Optional if already installed)[​](#1-install-git-optional-if-already-installed "Direct link to 1. Install Git (Optional if already installed)")

Git is required to clone the Rotorflight‑docs repository.

### Install Git on Windows[​](#install-git-on-windows "Direct link to Install Git on Windows")

1. Download the official installer from the Git website.
2. Run the installer and accept the default options unless you have specific preferences.
3. After installation, open a new terminal window.

### Verify installation[​](#verify-installation "Direct link to Verify installation")

```
git --version
```

## 2. Install Node.js (Optional if already installed)[​](#2-install-nodejs-optional-if-already-installed "Direct link to 2. Install Node.js (Optional if already installed)")

Rotorflight‑docs uses Docusaurus, which requires **Node.js** and **npm**.

### Install Node.js on Windows[​](#install-nodejs-on-windows "Direct link to Install Node.js on Windows")

1. Download the **LTS** installer from the official Node.js website.
2. Run the installer and accept the default options.
3. This installs both **Node.js** and **npm**.

### Verify your installation[​](#verify-your-installation "Direct link to Verify your installation")

```
node -v
npm -v
```

## 3. Clone the Rotorflight‑docs Repository[​](#3-clone-the-rotorflightdocs-repository "Direct link to 3. Clone the Rotorflight‑docs Repository")

Use Git to download the documentation source:

```
git clone https://github.com/rotorflight/rotorflight-docs.git
cd rotorflight-docs
```

This directory contains all Markdown files, configuration, and Docusaurus tooling for the Rotorflight documentation site.

## 4. Install Dependencies[​](#4-install-dependencies "Direct link to 4. Install Dependencies")

Install all required packages using npm:

```
npm install
```

This installs:

* Docusaurus core
* React
* Plugins
* Themes
* Rotorflight‑specific tooling

## 5. Run the Development Server[​](#5-run-the-development-server "Direct link to 5. Run the Development Server")

Start the local Docusaurus server:

```
npm run start
```

This launches your internet browser to display your site:

* A local dev server (typically <http://localhost:3000>)
* Hot‑reload for Markdown, config, and React components
* The full Rotorflight documentation site

## 6. (Optional) Build and Serve the Production Site[​](#6-optional-build-and-serve-the-production-site "Direct link to 6. (Optional) Build and Serve the Production Site")

To generate the optimized static build. This site does not automatically update with each save and is only to check your work is completely correct as it will be deployed:

```
npm run build
```

To preview the built site locally:

```
npm run serve
```
