# Setup Guides

Step-by-step guides for setting up a helicopter, in roughly the order you
need them. Each guide links to the [Configurator](../configurator/index.md)
pages that explain the individual settings.

!!! danger "Blades off"
    Keep the main and tail blades off until the setup is finished and the
    first spool-up test has passed.

## The basic setup

| Step | Guide |
| :-: | --- |
| 1 | [Flash the firmware](../getting-started/flashing-the-firmware.md) and make a [first connection](../getting-started/first-connection.md). |
| 2 | Betaflight flight controller? [Remap the outputs](remapping.md) for servos and motors. Rotorflight flight controllers skip this. |
| 3 | Set the board orientation on the [Configuration](../configurator/tabs/configuration.md#board-and-sensor-alignment) tab, and [calibrate the accelerometer](../configurator/tabs/setup.md#calibrate-accelerometer). |
| 4 | Connect the receiver and set it up on the [Receiver](../configurator/tabs/receiver.md) tab; set up the [arm switch](../getting-started/arming.md). |
| 5 | Battery sensors and profiles on the [Power](../configurator/tabs/power.md) tab. |
| 6 | [Servo Setup](servos.md) -- centres, rates and directions. |
| 7 | [Mixer & Swashplate Setup](mixer.md) -- swashplate type, calibration and limits. |
| 8 | ESC protocol and throttle range on the [Motors](../configurator/tabs/motors.md) tab, then [RPM Measurement](rpm-measurement.md) and [ESC Telemetry](esc-telemetry.md). |
| 9 | [Governor](governor.md) -- headspeed control. |
| 10 | [RPM Filters](rpm-filters.md) on the Gyro tab. |
| 11 | [Rates](../configurator/tabs/rates.md) to taste, and check the [failsafe](../configurator/tabs/failsafe.md). |
| 12 | Set up your radio and the [Lua suite](../radio/index.md). |
| 13 | [Back up](../getting-started/backup-and-restore.md), then fly and [tune](../tuning/index.md). |

The [Example Build](../getting-started/example-build.md) follows these steps
for a real helicopter.

## More guides

| Guide | For |
| --- | --- |
| [ESC Forward Programming](esc-programming.md) | Programming the ESC through the flight controller. |
| [BLHeli_S to Bluejay](blheli-s-to-bluejay.md) | Flashing small-heli ESCs for bidirectional DShot. |
| [Nitro Helicopters](nitro.md) | Throttle servo, RPM sensor and governor for nitro. |
| [Gear Ratios](gear-ratios.md) | Working out ratios for two-stage gearboxes. |
| [SmartFuel](smartfuel.md) | A fuel gauge that behaves in flight. |
| [Profile Switching](profile-switching.md) | Several tunes and headspeeds on one switch. |
| [Stability Modes](stability-modes.md) | Angle, Horizon, Rescue and trimming them. |
| [LED Strip](led-strip.md) | Orientation and status lights. |
| [OpenLager Logging](openlager.md) | Blackbox logging to an external logger. |
| [FBUS Master](fbus-master.md) | F.Bus servos and sensors driven by the flight controller. |
| [ELRS Custom Telemetry](elrs-custom-telemetry.md) | Full Rotorflight telemetry over ExpressLRS. |
