# Getting Started

The general process for setting up a helicopter using Rotorflight.

This process is generic and may be slightly different, depending on your particular helicopter.

1. Install the latest RF2 [release](/docs/setup/flashing-the-firmware.md#install-rotorflight-configurator)
2. [Remap](/docs/setup/remapping.md) your servos and motors if you are using a Betaflight FC, otherwise, skip this step.
3. [Calibrate the Accelerometer](/configurator/tabs/setup.md#calibrate-accelerometer).
4. Check you [Board alignment](/configurator/tabs/configuration.md#board-and-sensor-alignment) setting and adjust if necessary.
5. Connect [Receiver](/docs/configurator/tabs/receiver.md) to a free UART and select corresponding receiver settings.
6. Select [Battery Voltage and Current Source](/docs/configurator/tabs/power.md#battery) as per you setup, and Set Battery [Capacity](/docs/configurator/tabs/power.md#capacity) and [Cell Count](/docs/configurator/tabs/power.md#cell-count).
7. Select [ESC Throttle protocol](/configurator/tabs/motors.md#esc-throttle-protocol), and Optional: [ESC Telemetry protocol](/configurator/tabs/motors.md#esc-telemetry-protocol), Set [Gear Ratios](/configurator/tabs/motors.md#gear-ratio-configuration), and [Motor Pole Count](/configurator/tabs/motors.md#motor-pole-count).
8. Optional: Select and Setup the [Governor](/docs/configurator/tabs/governor.md).
9. Setup [Servos](/docs/setup/setup-servos.md).
10. Setup and Calibrate the [Mixer](/docs/setup/setup-mixer.md).
11. Setup the [Gyro RPM Filters](/docs/setup/rpm-filters.md#rpm-filters-1).
12. Set the [Rates](/docs/configurator/tabs/rates.md) as per flying style.
13. Set the [PID](/configurator/tabs/profiles.md#pid-controller-gains) Values.
14. Setup [ARMING](/configurator/tabs/modes.md#arm), and other required modes.
15. Setup [Profile Switching](/docs/setup/profile-switching-example.md) and other [Adjustments](/configurator/tabs/adjustments.md) if required.
16. Setup [BLACKBOX](/configurator/tabs/blackbox.md#what-is-blackbox) Logging.
17. Optional: Setup [LUA Script](/docs/setup/radio-setup/radio-setup-edgetx/edgetx-lua-scripts.md#introduction) on radio.
