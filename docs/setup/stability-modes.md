# Stability Modes

Normally a helicopter flies in *acro* mode: centring the sticks stops
the rotation, but it doesn't level the helicopter. Rotorflight also has
self-levelling modes, using the accelerometer:

| Mode | Behaviour |
| --- | --- |
| **ANGLE** | The stick sets a tilt angle. Centre the sticks and the helicopter levels itself. It can't flip. |
| **HORIZON** | Self-levelling near centre stick; at full stick it flips and rolls like normal. |
| **TRAINER** | Normal flight, but tilt is limited to a set angle (Acro Trainer). |
| **RESCUE** | A panic button: levels, flips upright if inverted, climbs and hovers. |

None of them hold *position* -- the helicopter will still drift with the
wind. They're aids for learning and for getting out of trouble.

You need the [accelerometer calibrated](../configurator/tabs/setup.md#calibrate-accelerometer)
with the helicopter level, and turned on on the
[Configuration](../configurator/tabs/configuration.md) tab.

## A mode switch

Example: a 3-position switch on channel 8 (**AUX 3**) -- down for normal
flight, middle for HORIZON, up for ANGLE.

1. On the radio, put the switch on channel 8.
2. On the [Modes](../configurator/tabs/modes.md) tab, **Add mode** →
   HORIZON. Set the channel to AUX 3 and drag the range over the middle
   switch position.
3. **Add mode** → ANGLE, AUX 3, range over the top position.
4. **Save**, and check each mode lights up in its switch position.

Add **RESCUE** on its own switch the same way, and set it up on the
[Profiles](../configurator/tabs/profiles.md#rescue-settings) tab -- see
[Rescue](../tuning/rescue.md).

## Stopping the drift

Self-levelling holds the flight controller's idea of level, which is never
quite the helicopter's real hover attitude -- so it drifts. Trim that out
with the **accelerometer trims**.

!!! warning "Don't use your radio trims"
    Keep roll, pitch and yaw trims on the radio at centre. Radio trims are
    a stick input, which in self-levelling modes means a constant tilt
    command.

Hover tail-in in ANGLE mode with the sticks centred and note the drift:

| Drifts | Change |
| --- | --- |
| Left | Increase **roll** trim |
| Right | Decrease roll trim |
| Backwards | Increase **pitch** trim |
| Forwards | Decrease pitch trim |

Ways to set the trims:

=== "Lua suite"

    On the radio, open **Accelerometer** trims in the Rotorflight Lua
    suite, change the values, and save. Fly again and repeat.

=== "Configurator"

    Under **Accelerometer Trim** on the
    [Configuration](../configurator/tabs/configuration.md#accelerometer-trim)
    tab.

=== "Adjustments"

    Add **Accelerometer Trim** roll and pitch [adjustments](../configurator/tabs/adjustments.md)
    on a stepped switch, and trim in flight.

=== "Stick commands"

    With `set enable_stick_commands = ON`, **disarmed**, in ANGLE or
    HORIZON mode: hold **collective high**, yaw centre, and move the
    cyclic stick in the direction to trim. Each step beeps; the trims save
    when you let go of the collective.

    | Collective | Yaw | Pitch | Roll | Does |
    | --- | --- | --- | --- | --- |
    | High | Centre | Centre | Left / Right | Trim roll |
    | High | Centre | Forward / Back | Centre | Trim pitch |
    | High | Left | Back | Centre | Calibrate accelerometer |
    | Low | Left | Back | Centre | Calibrate gyro |

## Tuning the levelling

The **Auto-leveling Settings** on the
[Profiles](../configurator/tabs/profiles.md#auto-leveling-settings) tab set
how firmly each mode levels and the maximum angles. The defaults are a good
start.
