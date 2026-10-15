# Radio & Lua

Rotorflight works with any radio and receiver whose protocol it supports
(see [Receiver](../configurator/tabs/receiver.md)). With a radio that runs
Lua scripts and a receiver with telemetry, you also get the **Rotorflight
Lua suite**: configure and tune the helicopter at the field from the radio,
a live dashboard, voice callouts, and ESC programming -- no laptop needed.

## Pick your radio

| Radio | Lua suite | Needs |
| --- | --- | --- |
| **[FrSky Ethos](ethos/index.md)** (X10, X12, X14, X18, X20, Twin X Lite) | RFSuite for Ethos | Ethos 1.6.2+; FrSky S.Port / F.Port / F.Bus receiver, or ExpressLRS |
| **[EdgeTX](edgetx/index.md)** colour radios | RFSuite for EdgeTX | EdgeTX 2.11+; CRSF link (ExpressLRS or Crossfire) |
| **[EdgeTX / OpenTX](edgetx/classic-scripts.md)**, older or black-and-white | Classic Lua scripts | OpenTX 2.3.12+ / EdgeTX 2.5+; S.Port, F.Port or CRSF |
| **[Futaba](futaba.md)** | -- | SBUS2 telemetry |
| **[Jeti](jeti.md)** | -- | EX Bus telemetry |
| **[Spektrum](../reference/receivers.md#spektrum-receiver-settings)** | -- | Receiver settings and binding for DSM satellites and SRXL/SRXL2 |
| [Other radios](others.md) | -- | |

## What every radio needs

However you fly, set up the radio model with:

- **Separate collective and throttle channels.** Collective is a pitch
  curve on the left stick; throttle is a separate channel -- a switch or a
  flat curve, with the governor doing the work.
- **A throttle hold** that sends a throttle value below 0%.
- **An arm switch** on its own channel (AUX 1 / channel 5 with ExpressLRS).
- **No trims or mixes on cyclic or yaw.** The flight controller does all
  the mixing; the radio just sends stick positions.
- **Failsafe** that stops sending channels on signal loss (see
  [Failsafe](../configurator/tabs/failsafe.md)).

A typical channel layout:

| Channel | ELRS order | FrSky / Futaba order |
| :-: | --- | --- |
| 1 | Roll (aileron) | Roll |
| 2 | Pitch (elevator) | Pitch |
| 3 | Collective | Throttle |
| 4 | Yaw (rudder) | Yaw |
| 5 | AUX 1 -- arm | Collective (FrSky) / AUX 1 (Futaba) |
| 6 | Throttle | AUX 1 -- arm (FrSky) / Collective (Futaba) |
| 7+ | Profile switch, rescue, Blackbox ... | ... |

Match it with the channel preset on the
[Receiver](../configurator/tabs/receiver.md#channel-assignment) tab.

## Versions must match

The Lua suite talks to the firmware over MSP, so it must be from the same
Rotorflight release as the firmware. When you update one, update the other.
