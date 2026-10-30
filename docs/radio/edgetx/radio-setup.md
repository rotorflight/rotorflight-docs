# EdgeTX Radio Setup

Setting up an EdgeTX model for a Rotorflight helicopter with an ExpressLRS
link. (With an FrSky receiver, use the FrSky channel order from
[Radio & Lua](../index.md#what-every-radio-needs) instead.)

!!! tip "Template model"
    RFSuite installs a **Rotorflight** model template. On the radio, create a
    new model, open the folder **5.Rotorflight** and choose **Rotorflight**.
    The model gets a CRSF module, the channels below, switch warnings, the
    telemetry sensors and the RFSuite dashboard, and a short dialog asks
    which switch does which job. See
    [Model template](https://rotorflight.github.io/rotorflight-lua-edgetx-suite/reference/model-template/) in the RFSuite docs.

    Without RFSuite, [rotorflight-generic.yml](files/rotorflight-generic.yml)
    is a ready-made model (EdgeTX 2.9 format) with the example switches
    below. Copy it to the SD card's `MODELS` folder and adapt it.

## ExpressLRS module

Suggested ELRS settings for a helicopter:

| Setting | Value |
| --- | --- |
| Baud rate | 5.25M, or as high as your module supports |
| Packet rate | 500 Hz |
| Telemetry ratio | 1:8 to 1:32 (1:4 is fine with ELRS 3.5.5+ if the link stays solid) |
| Switch mode | Wide -- see the note below |
| Power | 250 mW, dynamic |

See the [ExpressLRS switch configuration](https://www.expresslrs.org/software/switch-config/)
guide for what the switch modes do.

!!! warning "Wide switches and the throttle"
    In ExpressLRS's *Hybrid* and *Wide* switch modes, channels 6 and up are
    sent at reduced resolution. That's fine for switches, but the
    governor's **NORMAL** and **SWITCH** throttle types need a
    full-resolution throttle. Either use the governor's **FUNCTION**
    throttle type, which is made for switch channels (see
    [Governor](../../setup/governor.md#throttle-types)), or use one of
    ExpressLRS's *Full Resolution* switch modes.

## Channels (ELRS order)

| Channel | Function | Example control |
| :-: | --- | --- |
| 1 | Aileron (roll) | Right stick |
| 2 | Elevator (pitch) | Right stick |
| 3 | Collective | Left stick, through a pitch curve |
| 4 | Rudder (yaw) | Left stick |
| 5 | AUX 1 -- **Arm** | SB, up = armed |
| 6 | Throttle | SF throttle hold + SE flight mode |
| 7 | AUX 2 -- Profile switch | SE |
| 8 | AUX 3 -- Rescue | SH, momentary |
| 9 | AUX 4 -- Blackbox | SA (optional) |
| 10 | AUX 5 -- Backup pack | SC (optional) |
| 11-12 | AUX 6-7 -- adjustments | Pots or trims |

The model template's dialog asks for the switches of channels 5 to 10 and
refuses one switch for two jobs; the governor and the profiles may share
one, as in the example above. Blackbox and backup may stay empty and then
sit at the bottom of their travel. Channel 11 follows pot P2 and channel 12
the trim buttons.

Pick the **ELRS** preset on the
[Receiver](../../configurator/tabs/receiver.md#channel-assignment) tab.

Leave cyclic and rudder trims at zero, and set no mixes on the cyclic or
tail -- the flight controller does all the mixing.

## Telemetry

1. Enable telemetry and custom telemetry on the flight controller -- see
   [ELRS Custom Telemetry](../../setup/elrs-custom-telemetry.md).
2. With RFSuite, save its **Telemetry** page to select the sensors it
   needs.
3. A model created from the Rotorflight template already has the sensors.
   For any other model, on the radio, **Model → Telemetry**: delete all
   sensors, start **Discover new**, and only then power up the helicopter.

!!! note "Link warnings"
    A model created from the template has the radio's telemetry alarms
    (sensor lost, low RSSI) switched off. RFSuite's own link announcements
    are off by default too; switch them on under **System → Settings →
    Audio → Events → Link** in RFSuite, or untick **Disable telemetry
    alarms** on the model's telemetry page.

## Flight controller side

- [Modes](../../configurator/tabs/modes.md): ARM on AUX 1, rescue,
  Blackbox and so on.
- [Adjustments](../../configurator/tabs/adjustments.md): profile switching
  on AUX 2 -- see [Profile Switching](../../setup/profile-switching.md).
