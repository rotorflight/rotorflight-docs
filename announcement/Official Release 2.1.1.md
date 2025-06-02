---
title: Official Release 2.1.1
authors:
  name: Rotorflight
  title: Rotorflight Team
  url: https://github.com/rotorflight
  image_url: https://github.com/rotorflight.png
---

This is the the Official Release of the Rotorflight firmware for RF 2.1.1.

NOTE! The firmware for RF 2.1 uses version number 4.4.x.

Swashplate wiggle indications
The swashplate is now indicating the FC readiness by doing a wiggle. Also, any errors or arming
failures are now clearly indicated. Currently there are four different kind of wiggles:

- FC ready to be armed
- Arming temporarily disabled
- Arming permanent failure
- Armed succesfully (disabled by default)
- FBUS support
- With help from FrSky, FBUS is now officially supported.

- SBUS2 support
- Futaba SBUS2 telemetry is now available on the F7 and H7 targets.

- SBUS Output support
- SBUS output is available as a tech preview, on CLI only. It allows expanding the number of servo outputs
- with an expander, or using SBUS servos directly.

- Tx/Rx pinswap for serial ports
- A support for swapping the Tx/Rx pins on serial receivers, ESC telemetry,  
  and transmitter telemetry UARTs have been added.

- ESC Forward Programming support - A support for ESC Forward Programming has been added. So far, four ESC vendors/models are supported:
- Hobbywing Platinum V5
- Scorpion
- YGE
- FlyRotor
- BB logging for ESC telemetry
- Three new BB log options have been added: ESC, BEC and ESC2.
- These options are logging the data received from the ESC(s).

Other Changes

- Allow RPM filter Q up to 25
- Add Graupner ESC telemetry
- Add RPM (freq) input edge and pull parameters
- Add model_id and MSP_PILOT_CONFIG for Lua integration
- Add more SmartPort sensors
- Add gov_min_throttle for nitro
- Add Adjustments for ACC trims
- Improved PID defaults
- Improved Rates defaults
- Improved Cyclic Cross-Coupling
- Improved Govnernor precomps
- Improved BB headers
- Improved battery voltage filtering
- Fix adjfunction initilisation bug
- Fix RPM filter update rate calculation
- Fix lost S.Port telemetry issue
- Fix UART bidir mode pull-up on F4
- Fix beep on disarm
- Various CMS fixes
