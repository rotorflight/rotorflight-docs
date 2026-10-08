# Settings

**Settings** are the suite's own options. They are stored on the radio, not on the flight controller, so this menu works with the model switched off. Saving here asks *Save current page to flight controller?* like every other page, but the settings go to the radio.

![The Settings menu](/assets/images/settings_menu-9dab5aa2dc72f18bcb6314e316a1c6e9.png)

## General[​](#general "Direct link to General")

Grouped into panels; tap a panel to open it.

![Settings, General page](/assets/images/settings_general-b598785b569e54ea2e030f45ce327048.png)

| Panel          | Settings                                                                                                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Display        | How the radio's own battery is shown (*Tx Battery Options*), and the temperature unit.                                                                                                                                                                 |
| Developer      | *Developer mode*, which adds a Developer menu under **Tools**. You won't need it for flying.                                                                                                                                                           |
| Safety Prompts | *Save confirm* and *Reload confirm*: turn off to save or reload without being asked.                                                                                                                                                                   |
| Integration    | *Sync model name*: while the model is connected, the radio shows the flight controller's craft name as the model name, and puts the old name back afterwards. *Battery profile on connect*: asks which battery is fitted each time the model connects. |

## Dashboard[​](#dashboard "Direct link to Dashboard")

Choose and set up the [dashboard](/docs/setup/radio-setup/radio-setup-ethos/lua-suite/dashboard.md) theme.

![Settings, Dashboard menu](/assets/images/settings_dashboard_menu-9294520cd0f489b921792f89383f243c.png)

* **Themes:** the default theme for all models, and optionally a different theme for this model.
* **Settings:** one tile per theme, for the options that theme has.

![Settings, Dashboard, Themes page](/assets/images/settings_dashboard_theme-c813477a81f63b0bf3094e9270e1fd56.png)

## ActiveLook[​](#activelook "Direct link to ActiveLook")

For ActiveLook glasses: what the glasses show before, during and after a flight. **Settings** turns the glasses display on and sets its position; the other three pages each pick a layout and what goes in each slot.

![Settings, ActiveLook menu](/assets/images/settings_activelook_menu-7af41c678350a8251105548faa639c0b.png)

![Settings, ActiveLook, Preflight page](/assets/images/settings_activelook_preflight-226c99100c5af124cb282dd3473ab399.png)

## Audio[​](#audio "Direct link to Audio")

What the radio says, and when.

![Settings, Audio menu](/assets/images/settings_audio_menu-3c9d2e88fa3f2d6ac4aed33bba331a2a.png)

### Events[​](#events "Direct link to Events")

Callouts and alerts, one page per kind:

![Settings, Audio, Events menu](/assets/images/settings_audio_events_menu-f1f58d202ab74d9cfeea213a402f0a7f.png)

| Page           | What it covers                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| Voltage        | Low battery voltage, and BEC and receiver voltage alerts, with their thresholds.                       |
| ESC temp       | An alert when the ESC gets hotter than a threshold.                                                    |
| Fuel           | Fuel (charge left) callouts, and the low-fuel warning.                                                 |
| State callouts | Arming flags, governor state, PID, rate and battery profile changes, and adjustment functions.         |
| FC status      | Alerts from the flight controller: gyro overflow, GPS not responding, blackbox full and control limit. |
| Model callout  | Plays the model's name when it connects, if you have recorded it.                                      |

![Settings, Audio, Events, State callouts page](/assets/images/settings_audio_events_state-6390c88441fa4e0e496f6cf3dd99f642.png)

### Switches[​](#switches "Direct link to Switches")

Pick a switch for a value, and the radio reads that value aloud when you flip it: altitude, BEC voltage, consumption, current, ESC temperature, head speed and more.

![Settings, Audio, Switches page](/assets/images/settings_audio_switches-4d9fbc345a58ff1cb3e0d7c0098f3119.png)

### Timer[​](#timer "Direct link to Timer")

Callouts for the flight timer: when it runs out, and alerts before and after.

![Settings, Audio, Timer page](/assets/images/settings_audio_timer-62fdaabc79e33e3684b5b381dec776f4.png)
