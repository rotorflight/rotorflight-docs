---
title: Official Release 2.3.0
authors: Rotorflight
---

# 🚁 Rotorflight 2.3.0 – Official Release Notes

[**Download Notes**](/docs/download/notes)\
[**Download Configurator**](/docs/download/configurator)\
[**Download Blackbox**](/docs/download/blackbox)\
[**Download EdgeTX Lua**](/docs/download/edge-tx-Lua)\
[**Download Ethos Lua**](/docs/download/ethos-Lua)

## 🔧 Firmware (Rotorflight 4.6.x)

The full list of changes is located in the [**Changes**](https://github.com/rotorflight/rotorflight-firmware/blob/RF-4.6.x/Changes.md)

**New features**

* Introduce Rotorflight Rates with refactored rate handling
* Add support for applying rates in polar coordinates
* Refactor Governor for Nitro/I.C. engines with multiple improvements and fixes
* Refactor throttle channel range and arm limit
* Refactor Adjustment Function implementation
* Add battery profile support
* Add SmartFuel battery charge estimator
* New hardware and protocol support
* Add Forward Programming support for AM32, BLHeli S/Bluejay, ZTW, OMP, and XDFly ESCs
* Add FlySky IBUS2 Control & Telemetry Support
* Add FBUS Master Out
* Add FBUS sensor input
* Add S.PORT sensor input
* Add GYRO\_CLK support for external gyro clocking
* Add BMP581 barometer driver
* Add BMI323 gyro driver
* Add native ELRS telemetry sensors for RPM and TEMP
* Add ESC telemetry output to Spektrum transmitters
* Add Winbond W25N04KV flash ID
* Add PY25Q128HA flash ID

**Improvements**

* Reject incompatible dump/diff files
* Improve gyro calibration routine
* Improve the decimation filter
* Enable Blackbox logging while ARMed by default
* Enable flight stats by default
* Increase max cyclic deadband to 100
* Disable yaw dynamic ceiling and reduce deadband defaults
* Change RESCUE default to FLIP
* Increase default I-term and O-term (HSI) limits
* Add motor override timeout
* Disallow arming while rescue is active
* Disallow arming if motor override is active
* Remove PID term reset on profile change
* Add new MSP APIs for tools and Lua scripts
* Add freq\_input\_minhz parameter
* Extend servo parameter ranges
* Improve Hobbywing V4 ESC telemetry
* Start tail motor ASAP
* Remove error\_rotation parameter

**Bug fixes**

* Fix potential buffer overflows in RX protocols and rcdevice
* Fix isVoltageStable check in battery presence
* Fix ACRO TRAINER catastrophic failure
* Fix failsafe throttle handling
* Fix JR Xbus Mode-A channel corruption
* Fix APD ESC telemetry
* Fix MSPv2 over SmartPort
* Fix IBUS2 channel decoding
* Fix Hobbywing Platinum V5 ESC parameter writes

## 🖥️ Rotorflight Configurator (v2.3.0)

**Changes from 2.2.x**

* Support for Rotorflight Firmware 4.6.0
* Add Expert Mode toggle (only implemented on some tabs)
* New layouts for Motors, Receiver and Failsafe tab
* Governor configuration moved to a new tab
* Live updates to throttle range parameters
* Simplified firmware flasher tab
* Various mobile layout improvements
* Removed confusing arm mode active indicator on Modes tab
* Bulgarian translation
* Windows installer now includes the STM32 DFU driver

**Important:** The Apple silicon build is not notarized by Apple. It is necessary to run the following command before installing.

\:::note NOTE
Replace /path/to with the actual path to the file.

`xattr -cr "/path/to/rotorflight-configurator_2.3.0_macos_arm64.dmg"`
\:::

## 📟 Lua Scripts for EdgeTX / OpenTX (v2.3.0)

**Changes Since Version 2.2.1**

* Model page: added support for per model statistics like Total flights and Total time.
* Battery page: new page for configuring and specifying your batteries.
* Governor page: added support for the new Rotorflight governor.
* Rates page: added support for Rotorflight rates.
* Rate Dynamics page: added support for Cyclic ring and Polar coordinates.
* AM32 ESC page: new page for configuring AM32 ESCs.
* BLHeli\_S ESC page: new page for configuring BLHeli\_S ESCs.
* Bluejay ESC page: new page for configuring Bluejay ESCs.
* FLYROTOR ESC page: updated parameters.
* Added support for configuring OMP and ZTW ESCs.
* Added partial support for the FlySky PA01.
* Various minor fixes.

## 📟 Lua Scripts for EdgeTX / OpenTX (v2.3.0)

**Changes Since Version 2.2.1**

* Model page: added support for per model statistics like Total flights and Total time.
* Battery page: new page for configuring and specifying your batteries.
* ESC Sensor page: new page for configuring ESC telemetry.
* Governor page: added support for the new Rotorflight governor.
* Rates page: added support for Rotorflight rates.
* Rate Dynamics page: added support for Cyclic ring and Polar coordinates.
* Smart Fuel page: new page for configuring Smart Fuel.
* AM32 ESC page: new page for configuring AM32 ESCs.
* BLHeli\_S ESC page: new page for configuring BLHeli\_S ESCs.
* Bluejay ESC page: new page for configuring Bluejay ESCs.
* FLYROTOR ESC page: updated parameters.
* HW Platinum V5 page: improved support for various Hobbywing Platinum V5 ESCs, including support for the Stratos 200 ESC.
* Added support for configuring OMP and ZTW ESCs.
* Various minor fixes.

## 📟 Lua Suite for FrSky Ethos (v2.3.0)

**Changes Since Version 2.2.1**

* Added the new dashboard system, dashboard theme support, Ethos 2.6 theme integration, theme selection, and improved dashboard loader/status handling.
* Reworked the menu structure and added/expanded modules so more Rotorflight configuration can be edited directly from the radio, including mixer, receiver, FBUS, ESC/motor, governor, rates, tail, smart fuel, and RF 2.3-specific settings.
* Added Battery Profile support and improved battery/profile-aware behaviour for gauges, alerts, smart fuel, and fuel calculations.
* Added Smart Fuel support on the FBL side, including improved model detection, voltage/consumption handling, sensor reset behaviour, and related translations/audio.
* Added and improved ESC programming support, including BLHeli\_S/Bluejay, AM32, Hobbywing/HW5, ZTW, OMP, Flyrotor, Skorpion, and 4-way ESC reliability improvements.
* Improved MSP and telemetry transport with MSPv2 support, MSP boost mode, API/message-bus refactors, better S.Port reliability, FBUS sensor support, ELRS telemetry improvements, and safer reconnect/queue handling.
* Added the Session Log tool, protocol/debug logging improvements, diagnostics/admin tools, and support for Ethos malloc debugging.
* Added the new FrSky package format and cross-platform Ethos Suite updater/deployment tooling.
* Reduced radio load throughout the app, background tasks, widgets, dashboard objects, ESC tools, telemetry modules, progress dialogs, image/theme handling, and navigation paths by reducing allocations, lazy loading more code, clearing caches, and fixing memory leaks.
* Includes many UI fixes, translation/audio updates, sensor-tool updates, dashboard theme additions, and smaller stability fixes from the 2.3.0 snapshots and release candidates.

## 📊 Blackbox Explorer (v2.3.0)
