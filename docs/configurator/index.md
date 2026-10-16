# Configurator

The Rotorflight Configurator flashes, configures and tunes the flight
controller. Run it in the browser at
[cfg.rotorflight.org](https://cfg.rotorflight.org), or install the desktop
app -- see [Downloads](../getting-started/downloads.md).

This section goes through every tab, in the order they appear once
connected. Some tabs only appear when the feature behind them is on, and
some fields only with **Expert Mode** on (the screenshots here are taken
with it on).

!!! tip "Looking for a procedure?"
    These pages explain what each setting does. For step-by-step set-up --
    servos, swashplate, governor, RPM filters -- see the
    [Setup Guides](../setup/index.md).

| Tab | What it's for |
| --- | --- |
| **Setup** | |
| [Status](tabs/status.md) | Live dashboard: arming flags, battery, attitude, receiver. |
| [Setup](tabs/setup.md) | Accelerometer calibration, reset, DFU, mass storage, reboot. |
| [Configuration](tabs/configuration.md) | Names, loop speed, sensors, features, serial ports, board orientation. |
| [Presets](tabs/presets.md) | Ready-made configuration snippets and tunes. |
| [Power](tabs/power.md) | Battery profiles, SmartFuel, voltage and current sensors. |
| [Receiver](tabs/receiver.md) | Receiver protocol, channel order, stick calibration, telemetry. |
| [Failsafe](tabs/failsafe.md) | What happens when the radio link is lost. |
| **Outputs** | |
| [Mixer](tabs/mixer.md) | Swashplate type, directions, calibration and limits; tail type. |
| [Servos](tabs/servos.md) | Servo centre, travel, rate and direction. |
| [Motors](tabs/motors.md) | ESC protocol, throttle range, ESC telemetry, RPM. |
| [Governor](tabs/governor.md) | Governor mode, throttle type, ramps, bypass curve. |
| **Flight tuning** | |
| [Profiles](tabs/profiles.md) | PID tune, helicopter compensations, rescue, per-profile governor. |
| [Rates](tabs/rates.md) | Stick feel and collective range. |
| [Gyro](tabs/gyro.md) | Gyro filtering: RPM filter, lowpass, notch, dynamic notch. |
| **Modes & adjustments** | |
| [Modes](tabs/modes.md) | Switch assignments: arm, self-levelling, rescue, governor bypass. |
| [Adjustments](tabs/adjustments.md) | Change settings in flight from the radio. |
| **Peripherals** | |
| [GPS](tabs/gps.md) | GPS settings and status. |
| [LED Strip](tabs/led-strip.md) | Addressable LED layout and effects. |
| [Beepers](tabs/beepers.md) | When the buzzer sounds. |
| [Sensors](tabs/sensors.md) | Live sensor graphs. |
| **Diagnostics** | |
| [Blackbox](tabs/blackbox.md) | Flight logging. |
| [CLI](tabs/cli.md) | Command line access to every setting. |

## Saving

Most tabs have **Save** (or **Save and Reboot**, when the change needs a
restart) and **Revert** at the bottom. If you leave a tab with unsaved
changes, the Configurator asks whether to save or discard them.
