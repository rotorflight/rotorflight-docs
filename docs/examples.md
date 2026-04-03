# Getting Started

The general process for setting up a helicopter using Rotorflight.

This process is generic and may be slightly different, depending on your particular helicopter.

1. Install the latest RF2 [release](/rotorflight-docs/docs/setup/flashing-the-firmware.md#install-rotorflight-configurator)
2. [Remap](/rotorflight-docs/docs/setup/remapping.md) your servos and motors if you are using a Betaflight FC, otherwise, skip this step.
3. [Calibrate the Accelerometer](/rotorflight-docs/docs/configurator/tabs/setup.md#calibrate-accelerometer).
4. Check you [Board alignment](/rotorflight-docs/docs/configurator/tabs/configuration.md#board-and-sensor-alignment) setting and adjust if necessary.
5. Connect [Receiver](/rotorflight-docs/docs/configurator/tabs/receiver.md) to a free UART and select corresponding receiver settings.
6. Select [Battery Voltage and Current Source](/rotorflight-docs/docs/configurator/tabs/power.md#battery) as per you setup, and Set Battery [Capacity](/rotorflight-docs/docs/configurator/tabs/power.md#capacity) and [Cell Count](/rotorflight-docs/docs/configurator/tabs/power.md#cell-count).
7. Select [ESC Throttle protocol](/rotorflight-docs/docs/configurator/tabs/motors.md#esc-throttle-protocol), and Optional: [ESC Telemetry protocol](/rotorflight-docs/docs/configurator/tabs/motors.md#esc-telemetry-protocol), Set [Gear Ratios](/rotorflight-docs/docs/configurator/tabs/motors.md#gear-ratio-configuration), and [Motor Pole Count](/rotorflight-docs/docs/configurator/tabs/motors.md#motor-pole-count).
8. Optional: Select and Setup the [Governor](/rotorflight-docs/docs/setup/governor.md).
9. Setup [Servos](/rotorflight-docs/docs/setup/setup-servos.md).
10. Setup and Calibrate the [Mixer](/rotorflight-docs/docs/setup/setup-mixer.md).
11. Setup the [Gyro RPM Filters](/rotorflight-docs/docs/setup/rpm-filters.md#basic-rpm-filters-settings).
12. Set the [Rates](/rotorflight-docs/docs/configurator/tabs/rates.md) as per flying style.
13. Set the [PID](/rotorflight-docs/docs/configurator/tabs/profiles.md#pid-controller-gains) Values.
14. Setup [ARMING](/rotorflight-docs/docs/configurator/tabs/modes.md#arm), and other required modes.
15. Setup [Profile Switching](/rotorflight-docs/docs/setup/profile-switching-example.md) and other [Adjustments](/rotorflight-docs/docs/configurator/tabs/adjustments.md) if required.
16. Setup [BLACKBOX](/rotorflight-docs/docs/configurator/tabs/blackbox.md#what-is-blackbox) Logging.
17. Optional: Setup [LUA Script](/rotorflight-docs/docs/setup/lua-scripts.md#introduction) on radio.
