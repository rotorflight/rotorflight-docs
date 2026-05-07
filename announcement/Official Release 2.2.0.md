---
title: Official Release 2.2.1
authors: Rotorflight
---

# 🚁 Rotorflight 2.2.1 – Official Release Notes

[**Download Notes**](/docs/download/notes)\
[**Download Configurator**](/docs/download/configurator)\
[**Download Blackbox**](/docs/download/blackbox)\
[**Download EdgeTX Lua**](/docs/download/edge-tx-Lua)\
[**Download Ethos Lua**](/docs/download/ethos-Lua)

## 🔧 Firmware (Rotorflight 4.5.x)

### 🆕 New Features

* FrSky attitude sensor scaling fixed
* Voltage and Current corrections added to XDFly ESC telemetry
* Force half-duplex setting with Spektrum SRXL2
* Support for **USB Mass Storage (MSC)** across Mac, Android, and other platforms.
* **Automatic configuration erase** when flashing firmware to ensure clean installs.
* **Adjustment function** added for `yaw_precomp_cutoff`.
* New **Rate Dynamics** and **PID Controller Settings** accessible via Lua scripts.

### 🔁 Updated Defaults and Improvements

* Lowered default **D gains** for improved stability.
* Increased default **HSI gains** (Helicopter Stability Index).
* Improved **collective-to-yaw precompensation**.
* Enabled **CRSF/ELRS custom telemetry** via background Lua script.
* Updated gyro Output Data Rate (ODR) to 4kHz on F4 and F7 targets for stability.
* Added **Blackbox header timestamps** using background Lua sync.
* Enhanced **RPM notch filtering**, fixing glitches at startup and low RPM.
* Improved compatibility with **JR XBus** (both Mode A and Mode B).
* Fixed telemetry sensor scaling for **ESC1** on S.Port.
* Resolved lockups and flash handling on **G4** processors and **W25N** NAND flash.
* Fixed issues with **XDFly ESC telemetry** lockups.

## 🖥️ Rotorflight Configurator (v2.2.1)

### 🆕 New Features

* Added a **Presets system** to quickly apply CLI snippets from the UI.
* Added **Android and macOS Apple Silicon builds** (note: macOS requires manual xattr removal).
* Improved **telemetry sensor interface**.

### 🌐 Localization & Platform Support

* Added **Spanish** language support.
* Created a **portable ZIP version** for Windows users.

### 🐞 Fixes & UI Enhancements

* Performance improvements
* Fix crash with older hardware lacking WebGL 2 support
* Fix Windows 32-bit installer
* Fix visual bugs on presets tab
* Fix maximum allowed value for cyclic deadband
* Improved visibility of **mode active indicators** in dark theme.
* Corrected **suggested backup filenames**.
* Resolved issues with **custom target flashing** and **Windows installation errors**.

## 📟 Lua Scripts for EdgeTX / OpenTX (v2.2.1)

**NOTE!** Use the SYS key to bring up the Save menu with Touch UI feature enabled on EdgeTX 2.11+

### 🆕 Pages & Controls

* Added touch UI support for EdgeTX 2.11+
* Improved support for FLYROTOR ESC
* Various minor fixes
* New **"Rate Dynamics"** page for advanced rate tuning.
* New **"PID Controller Settings"** page for deep tuning options.
* Units added to most fields for clarity and consistency.

### 🛠 Performance & Stability

* **Reduced memory usage** to improve script responsiveness.
* Background script (`rf2bg`) sets the FC clock and enables CRSF/ELRS telemetry automatically.
* Numerous minor fixes and UX improvements.

## 📟 Lua Suite for FrSky Ethos (v2.2.1)

### 🔄 Framework Overhaul

* Complete rewrite using a **modular API-driven architecture**.
* Supports dynamic **page/module/widget creation** based on MSP data.
* Enabled **VSCode development integration**.

### 📈 Functional Enhancements

* Added **Blackbox status**, **arm state**, and **disarm flags widgets**.
* Improved **connect/reconnect speed** and user feedback.
* Introduced **MSP sensor framework** for scalable telemetry.

### 🌍 Internationalization

* Improved translation functions and added **Italian translation/audio**.
* Fixed character encoding issues in non-English locales.

### 🐞 Fixes & UX

* Improved alignment of PID defaults to match **Flybarless (FBL)** systems.
* Added new **adjustment function sounds** and UI feedback.

## 📊 Blackbox Explorer (v2.2.0)

* Added full support for **Rotorflight 4.5.0 log format** including headers and log events.
* Fixed installation issues on some Windows environments.

## ✅ Compatibility Notes

* Fully compatible with Rotorflight **2.0 and 2.1** configurations.
* Users updating from Rotorflight **1.x must reconfigure** from scratch.
* Always **verify settings and behavior on the bench** before flying after upgrading.
