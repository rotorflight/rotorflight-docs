---
sidebar_position: 30
---

# Running Rotorflight Docs Locally

This guide walks through installing Node.js, cloning the Rotorflight‑docs repository, installing dependencies, and running the Docusaurus development server. Everything can be done directly from the terminal.

The purpose of the development server is you can make changes to a page very quickly and it will be immediately visible each time you save. Errors are immediatly seen and can be fixed.

## 1. Install Git (Optional if already installed)

Git is required to clone the Rotorflight‑docs repository.

### Install Git on Windows

1. Download the official installer from the Git website.
2. Run the installer and accept the default options unless you have specific preferences.
3. After installation, open a new terminal window.

### Verify installation

```bash
git --version
```

## 2. Install Node.js (Optional if already installed)

Rotorflight‑docs uses Docusaurus, which requires **Node.js** and **npm**.

### Install Node.js on Windows

1. Download the **LTS** installer from the official Node.js website.
2. Run the installer and accept the default options.
3. This installs both **Node.js** and **npm**.

### Verify your installation

```bash
node -v
npm -v
```

## 3. Clone the Rotorflight‑docs Repository

Use Git to download the documentation source:

```bash
git clone https://github.com/rotorflight/rotorflight-docs.git
cd rotorflight-docs
```

This directory contains all Markdown files, configuration, and Docusaurus tooling for the Rotorflight documentation site.

## 4. Install Dependencies

Install all required packages using npm:

```bash
npm install
```

This installs:

* Docusaurus core
* React
* Plugins
* Themes
* Rotorflight‑specific tooling

## 5. Run the Development Server

Start the local Docusaurus server:

```bash
npm run start
```

This launches your internet browser to displat your site:

* A local dev server (typically http://localhost:3000)
* Hot‑reload for Markdown, config, and React components
* The full Rotorflight documentation site

## 6. (Optional) Build and Serve the Production Site

To generate the optimized static build. This site does not automatically update with each save and is only to check your work is completely correct as it will be deployed:

```bash
npm run build
```

To preview the built site locally:

```bash
npm run serve
```
