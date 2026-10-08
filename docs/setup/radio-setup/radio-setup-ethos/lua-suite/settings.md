---
sidebar_position: 70
---

# Settings

**Settings** are the suite's own options. They are stored on the radio, not
on the flight controller, so this menu works with the model switched off.
Saving here asks _Save current page to flight controller?_ like every other
page, but the settings go to the radio.

![The Settings menu](./img/settings_menu.png)

## General

Grouped into panels; tap a panel to open it.

![Settings, General page](./img/settings_general.png)

| Panel | Settings |
| --- | --- |
| Display | How the radio's own battery is shown (_Tx Battery Options_), and the temperature unit. |
| Developer | _Developer mode_, which adds a Developer menu under **Tools**. You won't need it for flying. |
| Safety Prompts | _Save confirm_ and _Reload confirm_: turn off to save or reload without being asked. |
| Integration | _Sync model name_: while the model is connected, the radio shows the flight controller's craft name as the model name, and puts the old name back afterwards. _Battery profile on connect_: asks which battery is fitted each time the model connects. |

## Dashboard

Choose and set up the [dashboard](./dashboard.md) theme.

![Settings, Dashboard menu](./img/settings_dashboard_menu.png)

- **Themes:** the default theme for all models, and optionally a different
  theme for this model.
- **Settings:** one tile per theme, for the options that theme has.

![Settings, Dashboard, Themes page](./img/settings_dashboard_theme.png)

## ActiveLook

For ActiveLook glasses: what the glasses show before, during and after a
flight. **Settings** turns the glasses display on and sets its position; the
other three pages each pick a layout and what goes in each slot.

![Settings, ActiveLook menu](./img/settings_activelook_menu.png)

![Settings, ActiveLook, Preflight page](./img/settings_activelook_preflight.png)

## Audio

What the radio says, and when.

![Settings, Audio menu](./img/settings_audio_menu.png)

### Events

Callouts and alerts, one page per kind:

![Settings, Audio, Events menu](./img/settings_audio_events_menu.png)

| Page | What it covers |
| --- | --- |
| Voltage | Low battery voltage, and BEC and receiver voltage alerts, with their thresholds. |
| ESC temp | An alert when the ESC gets hotter than a threshold. |
| Fuel | Fuel (charge left) callouts, and the low-fuel warning. |
| State callouts | Arming flags, governor state, PID, rate and battery profile changes, and adjustment functions. |
| FC status | Alerts from the flight controller: gyro overflow, GPS not responding, blackbox full and control limit. |
| Model callout | Plays the model's name when it connects, if you have recorded it. |

![Settings, Audio, Events, State callouts page](./img/settings_audio_events_state.png)

### Switches

Pick a switch for a value, and the radio reads that value aloud when you flip
it: altitude, BEC voltage, consumption, current, ESC temperature, head speed and more.

![Settings, Audio, Switches page](./img/settings_audio_switches.png)

### Timer

Callouts for the flight timer: when it runs out, and alerts before and after.

![Settings, Audio, Timer page](./img/settings_audio_timer.png)
