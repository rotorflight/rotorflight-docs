# BLHeli_S to Bluejay

Small electric helicopters often use BLHeli_S multirotor ESCs. Out of the
box, BLHeli_S can't report RPM back to the flight controller, which
Rotorflight needs for the governor and the RPM filter. Flashing the ESCs
with the open-source [Bluejay](https://github.com/bird-sanctuary/bluejay)
firmware adds **bidirectional DShot**, so the RPM comes back on the throttle
wire.

Bluejay also lets each ESC have its own settings -- important on an
all-in-one board where the main and tail ESCs share one connection -- and can
turn off *damped light* (active braking), which a helicopter without a
one-way bearing needs off on the main motor.

## Flashing with ESC Configurator

[ESC Configurator](https://esc-configurator.com/) runs in Chrome or Edge and
connects through the flight controller.

1. Close the Rotorflight Configurator (it holds the USB port).
2. In ESC Configurator, open **Settings** and tick **Disable common
   settings**, so each ESC can be set separately.
3. Click **Connect**, power the ESCs from the flight battery, and click
   **Read Setup**.
4. Click **Flash All** and choose:
    - **Firmware**: Bluejay
    - **ESC**: leave as detected -- it's specific to your hardware
    - **Version**: the latest
    - **PWM frequency**: 24 kHz suits most helicopters; very small tail
      motors (e.g. the K110's) can use higher.
5. Click **Flash**. When it's done, click **Read Setup** again.
6. Settings:
    - On **both** ESCs, turn off **Brake on stop**.
    - On the **main** motor ESC, set **Maximum Braking Strength** to 0. This
      disables damped light, so the rotor freewheels instead of being
      braked in throttle hold. Leave braking on for the tail motor.
7. Click **Write Setup**.

## Then in Rotorflight

On the [Motors](../configurator/tabs/motors.md) tab:

- **Throttle Protocol**: DSHOT300 (or DSHOT600).
- **Dshot RPM Telemetry**: on.
- **Main Motor Pole Count**: the number of magnets in the motor.

Then check the RPM reads correctly -- see [RPM Measurement](rpm-measurement.md).
