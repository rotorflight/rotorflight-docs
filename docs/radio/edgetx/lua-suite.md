# Using RFSuite on EdgeTX

## Before you start

Once RFSuite is installed, set up each model you fly with it like this:

1. **Put the RFSuite dashboard on a screen of the model** if you want to use
   it. That is all: the dashboard keeps the link to the flight controller,
   decodes the telemetry and speaks the announcements, also while its screen
   isn't the one shown. The widget has no options in the radio's screen
   setup: the dashboard is configured entirely in RFSuite, under **System →
   Settings → Dashboard**. Don't put a second dashboard or the RFSuite
   Service widget on the same model.
2. **For a third-party dashboard, use RFSuite Service instead.** This small
   widget does the same background work without drawing a dashboard. It
   isn't needed beside the RFSuite dashboard -- use one or the other.
3. **Leave the background job to RFSuite.** On the first connection, either
   RFSuite widget adds a special function `rfsbg` to the model (**Model → Special
   Functions**); it runs from the next time the model is loaded. Don't
   delete it. Remove an active `rf2bg` entry of the classic Lua scripts:
   while it is there, RFSuite adds no background job of its own, and both
   write the same sensors.
4. **Without the model template, discover the telemetry sensors** once the
   flight controller is set up -- see
   [Radio Setup](radio-setup.md#telemetry). A model made from the
   Rotorflight template already has them.
5. **Set up the alarms before the first flight:** the timer and voltage
   alerts under **Configuration → Setup → Power → Alerts**, and which
   announcements are spoken under **System → Settings → Audio → Events**.
   The link announcements there are off by default.

## The configuration tool

Open **RFSuite** from the radio's **Tools** menu. It opens on its menu
straight away; the status button in its header shows the connection. The
tiles come in two groups: **Configuration** becomes usable once the flight
controller answers; **System** holds the tools, logs and the suite's own
settings.

| Section | Holds |
| --- | --- |
| **Configuration → Flight Tuning** | PIDs, rates, governor, filters, PID controller and bandwidth, autolevel, main and tail rotor, rescue, advanced rate tables, the Tune Advisor. |
| **Configuration → Setup** | Configuration, radio config, telemetry, accelerometer, alignment, ports, model and pilot settings, mixer, servos (PWM and bus), controls (modes, adjustments, failsafe, beepers, Blackbox, statistics), power (battery, alerts, sources, SmartFuel, preferences), governor, GPS, ESC & motors (ESC programming, Motor Override). |
| **System → Tools** | Copying and selecting profiles; the flight log; diagnostics. |
| **System → Logs** | A browser for the radio's own telemetry logs, plotting channels against flight time. |
| **System → Settings** | The suite's own settings: general, dashboard, localization and audio. |

Changes are only written when you save. While the helicopter is armed,
RFSuite refuses writes and locks the pages that would make them; telemetry,
the dashboard and announcements carry on.

## Widgets

Two widgets come with the installation:

- **RFSuite** -- the dashboard. It draws a theme from live telemetry, with
  separate preflight, in-flight and postflight layouts. Choose the theme
  per model and flight phase under **System → Settings → Dashboard →
  Theme**. Shipped themes include Default, RF Status, Urban, Grid, Deck
  and several pilot-designed themes; you can also make your own.
- **RFSuite Service** -- a background service that keeps the link and the
  announcements alive while the tool isn't open. It draws only a small
  status tile, so put it in a small zone on a screen you don't use.

One of the two widgets -- or the background decoder -- must be running for
custom ELRS telemetry to be decoded into sensors.

## Voice announcements

Arming state, flight and rate profile changes, in-flight adjustments,
battery and fuel are announced. Choose which under the suite's settings.

## Troubleshooting

**The tool never connects** (the tiles under Configuration stay greyed out,
the status button never shows its tick). Check in this order:

1. The link is **CRSF** (ExpressLRS or Crossfire) -- RFSuite talks to the
   flight controller over CRSF only.
2. **Telemetry** is on and arriving: the radio shows RSSI from the receiver.
3. The receiver **forwards MSP** to the flight controller. If it passes
   telemetry but not MSP, the tool reports *No MSP reply from flight
   controller*.
4. The firmware's MSP API is one the suite supports (12.09 or 12.10 --
   Rotorflight 2.3 or 2.4). Older firmware shows an *Unsupported MSP API*
   message.

**Arming while it's still connecting** pauses the configuration traffic;
it finishes once you disarm. Nothing needs power-cycling.

**Sensors missing or not updating** -- see
[ELRS Custom Telemetry](../../setup/elrs-custom-telemetry.md#troubleshooting).
A sensor the suite doesn't recognise stops the rest of its frame from being
read; update the suite or untick that sensor.

## Reference

Page-by-page documentation, dashboard theming and more troubleshooting:
[RFSuite for EdgeTX docs](https://rotorflight.github.io/rotorflight-lua-edgetx-suite/).
