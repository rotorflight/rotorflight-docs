# Using RFSuite on EdgeTX

## The configuration tool

Open **RFSuite** from the radio's **Tools** menu. The start screen shows the
connection state; once the flight controller answers, the configuration
and system sections become available.

| Section | Holds |
| --- | --- |
| **Flight Tuning** | PIDs, rates, governor, filters, PID controller and bandwidth, autolevel, main and tail rotor, rescue, advanced rate tables. |
| **Setup** | Configuration, radio config, telemetry, accelerometer, alignment, ports, model and pilot settings, mixer, servos (PWM and bus), controls (modes, adjustments, failsafe, beepers, Blackbox, statistics), power (battery, alerts, sources, SmartFuel), ESC & motors. |
| **ESC** | Programming for AM32, BLHeli_S, Bluejay, FlyRotor, Hobbywing Platinum V5, OMP, Scorpion, XDFly, YGE and ZTW -- unlocked for the ESC telemetry protocol the flight controller reports. |
| **Tools** | Copying and selecting profiles; Motor Override for bench tests (behind a disarm check, arm-switch check and dead-man timeout); diagnostics -- flight controller status, ELRS link, sensor validation, SmartFuel, session logs. |
| **Logs** | A browser for the radio's own telemetry logs, plotting channels against flight time. |

Changes are only written when you save. While the helicopter is armed,
RFSuite refuses writes and locks the pages that would make them; telemetry,
the dashboard and announcements carry on.

## Widgets

Two widgets come with the installation:

- **RFSuite** -- the dashboard. It draws a theme from live telemetry, with
  separate preflight, in-flight and postflight layouts. Choose the theme
  per model and flight phase under **Settings → Dashboard → Design**.
  Shipped themes include Default, RF Status, Urban and several
  pilot-designed themes; you can also make your own.
- **RFSuite Service** -- a background service that keeps the link and the
  announcements alive while the tool isn't open. It draws nothing useful, so
  put it in a small zone on a screen you don't use.

One of the two widgets -- or the background decoder -- must be running for
custom ELRS telemetry to be decoded into sensors.

## Voice announcements

Arming state, flight and rate profile changes, in-flight adjustments,
battery and fuel are announced. Choose which under the suite's settings.

## Troubleshooting

**The tool never connects** (start screen stays, tiles greyed out). Check
in this order:

1. The link is **CRSF** (ExpressLRS or Crossfire) -- RFSuite talks to the
   flight controller over CRSF only.
2. **Telemetry** is on and arriving: the radio shows RSSI from the receiver.
3. The receiver **forwards MSP** to the flight controller. If it passes
   telemetry but not MSP, the tool reports *No MSP reply from flight
   controller*.
4. The firmware's MSP API is one the suite supports (12.08 to 12.10 --
   Rotorflight 2.2 to 2.4). Older firmware shows an *Unsupported MSP API*
   message.

**Arming while it's still connecting** pauses the configuration traffic;
it finishes once you disarm. Nothing needs power-cycling.

**Sensors missing or not updating** -- see
[ELRS Custom Telemetry](../../setup/elrs-custom-telemetry.md#troubleshooting).
A sensor the suite doesn't recognise stops the rest of its frame from being
read; update the suite or untick that sensor.

## Reference

Page-by-page documentation, dashboard theming and more troubleshooting:
[RFSuite for EdgeTX docs](https://github.com/rotorflight/rotorflight-lua-edgetx-suite/blob/master/docs/README.md).
