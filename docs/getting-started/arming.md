# Arming & Safety

A helicopter rotor is dangerous. Rotorflight has several layers of
protection between "battery plugged in" and "rotor spinning" -- this page
explains them, and how to read what the flight controller is telling you.

!!! danger "Blades off"
    Remove the main and tail blades for any setup work that can spin the
    motor: motor or mixer override, governor and ESC setup, arming tests.

## Arming is not throttle hold

You need **two separate switches** on your radio:

| | Arm switch | Throttle hold |
| --- | --- | --- |
| Lives in | The flight controller (the **ARM** mode) | The radio (sets the throttle channel to its minimum) |
| What it does | Enables the flight controller's outputs to the motor, and starts the stabilisation | Keeps the motor stopped, or stops it in flight for an autorotation |
| When you use it | Once before take-off, once after landing | Whenever you need the motor to stop -- including in flight |
| In flight | **Never switch it off** -- disarming stops the motor and the stabilisation, and the helicopter will crash | Safe to use; the governor can bail out of an autorotation |

Put the arm switch where you can't knock it by accident. Put throttle hold
where you can reach it instantly.

## Setting up the arm switch

1. On the radio, put the arm switch on a spare channel so it sends about
   1000 µs when disarmed and 2000 µs when armed.

    !!! note "ELRS / CRSF receivers"
        Use **AUX1 (channel 5)** for the arm switch. ExpressLRS sends AUX1
        at full rate and uses it to know when the model is armed. See
        [ExpressLRS switch configs](https://www.expresslrs.org/software/switch-config/).

2. On the [Modes](../configurator/tabs/modes.md) tab, add a range for
   **ARM** on that channel, covering the upper end of its travel.
3. Save, then flip the switch: the marker should move into the range and
   the ARM mode lights up.

## The arming sequence

The flight controller arms only when every check passes. The usual order
at the field:

1. Throttle hold **on**, arm switch **off**.
2. Plug in the battery and keep the helicopter still and level while the
   gyro calibrates.
3. Wait for the **ready** wiggle (below) -- the flight controller is
   happy to arm.
4. Arm.
5. Release throttle hold to spool up.

After landing: throttle hold on, wait for the rotor to stop, disarm,
unplug.

## Swashplate wiggle

Before the first arming after power-on, the flight controller "talks" by
moving the swashplate:

| Wiggle | Meaning |
| --- | --- |
| **One short wiggle** when arming becomes possible | *Ready.* Nothing is preventing arming. |
| **Short collective bounce every 3 s** while the arm switch is on | *Can't arm yet* -- something temporary, such as throttle not at zero, the helicopter not level, failsafe, or the RX not connected. Fix it and toggle the arm switch. |
| **Long collective bounce every 5 s** while the arm switch is on | *Configuration error* -- something that needs fixing on the bench: no gyro, CPU load too high, governor or RPM filter without an RPM signal, accelerometer not calibrated, no motor protocol, or reboot required. |
| One brief movement on arming | *Armed* (off by default). |

<div class="grid" markdown>
<figure markdown>
<video src="../img/arming-ready.mp4" controls muted playsinline width="100%"></video>
<figcaption>Ready to arm</figcaption>
</figure>
<figure markdown>
<video src="../img/arming-fail.mp4" controls muted playsinline width="100%"></video>
<figcaption>Can't arm yet -- arm switch on</figcaption>
</figure>
</div>

The wiggles only happen before the first arming of a flight, never in
flight. They're configured from the CLI:

| Setting | Default | |
| --- | --- | --- |
| `wiggle_enable_ready` | `ON` | Ready wiggle |
| `wiggle_enable_error` | `ON` | Short error bounce |
| `wiggle_enable_fatal` | `ON` | Long error bounce |
| `wiggle_enable_armed` | `OFF` | Wiggle on arming |
| `wiggle_strength` | `50` | How far the swashplate moves (0-100) |
| `wiggle_frequency` | `10` | How fast it moves (2-50) |

## Arming disable flags

When the flight controller refuses to arm, the reason is shown as one or
more **arming disable flags**. You can read them:

- On the [Status](../configurator/tabs/status.md) tab of the Configurator.
- On the radio, in the Rotorflight Lua suite.
- In the CLI, with the `status` command.

| Flag | Meaning | What to do |
| --- | --- | --- |
| `NO_GYRO` | No gyro detected. | Check the board selection; the gyro may be faulty. |
| `FAILSAFE` | Failsafe is active. | Check the receiver link. |
| `RX_FAILSAFE` | No valid signal from the receiver. | Check wiring, protocol and UART on the [Receiver](../configurator/tabs/receiver.md) tab, and that the radio is bound. |
| `BAD_RX_RECOVERY` | The receiver has just recovered from failsafe while the arm switch was on. | Toggle the arm switch. |
| `BOXFAILSAFE` | The FAILSAFE mode switch is on. | Turn it off. |
| `GOVERNOR` | The governor is enabled but has no usable RPM signal. | Set up [RPM measurement](../setup/rpm-measurement.md). |
| `RPM_SIGNAL` | A required RPM signal is missing. | Check the motor pole count and the RPM source on the [Motors](../configurator/tabs/motors.md) tab. |
| `THROTTLE` | Throttle is not at zero. | Turn throttle hold on, or lower the throttle. |
| `ANGLE` | The helicopter is not level. | Level it (within 25° by default). |
| `BOOT_GRACE_TIME` | Too soon after power-on. | Wait a moment and arm again. |
| `NOPREARM` | A PREARM mode is set up but not switched on. | Switch PREARM on before arming. |
| `LOAD` | CPU load is too high. | Lower the PID loop frequency on the [Configuration](../configurator/tabs/configuration.md) tab, or turn off features. |
| `CALIBRATING` | Sensor calibration is still running. | Keep the helicopter still until it finishes. |
| `CLI` | The CLI is open. | Leave the CLI. |
| `CMS_MENU` | An on-screen menu is open. | Close it. |
| `BST` | A Black Sheep Telemetry device is preventing arming. | See the device's manual. |
| `MSP` | The Configurator is connected. | Expected while connected -- see below. |
| `PARALYZE` | PARALYZE mode was triggered. | Power cycle the flight controller. |
| `GPS` | A GPS fix is required but missing. | Wait for a fix. |
| `RESC` | The RESCUE mode switch is on. | Switch rescue off. |
| `RPMFILTER` | RPM filtering is enabled but an RPM signal is missing. | Set up [RPM measurement](../setup/rpm-measurement.md), or turn off the [RPM filter](../setup/rpm-filters.md). |
| `REBOOT_REQ` | Settings were changed that need a reboot. | Reboot the flight controller. |
| `DSHOT_BITBANG` | DShot bitbang failed. | Check the board's timers and DMA, or `set dshot_bitbang = OFF`. |
| `ACC_CALIB` | The accelerometer needs calibrating. | Calibrate it on the [Setup](../configurator/tabs/setup.md) tab, or turn off the features that use it. |
| `MOTOR_PROTO` | No motor protocol is selected, the motor outputs failed to set up, or the tail is motorised but there is no MOTOR 2. CLI `status` says which. | Select the ESC protocol on the [Motors](../configurator/tabs/motors.md) tab. If one is selected, check the motor pins and DMA, and for a motorised tail that the tail pin is MOTOR 2 -- see [Setup Wizard MSP](../contributing/tech/setup-wizard-msp.md#motor-arming-checks). |
| `OVERRIDE` | Servo, motor or mixer override is on. | Turn off all overrides. |
| `ARM_SWITCH` | The arm switch is on but something else is blocking arming, or it was on at power-up. | Fix the other flags and toggle the arm switch. |

### Arming with the Configurator connected

The `MSP` flag stops the helicopter arming while the Configurator is
connected. For bench tests you can lift it with **Enable Arming** on the
Status tab. **Blades off** -- with arming enabled, releasing throttle hold
spools the motor up.

## Failsafe

If the receiver loses the radio link, the flight controller holds the
controls for a short time, then goes into failsafe. Set up what happens --
and test it, blades off, by switching the radio off -- on the
[Failsafe](../configurator/tabs/failsafe.md) tab. Your receiver must be
set to send *no pulses* (or the flight controller's own failsafe values) on
signal loss, not to hold the last throttle position.
