# Tools and Logs

## Tools[​](#tools "Direct link to Tools")

![The Tools menu](/assets/images/tools_menu-128537362edadb97b447c43865fd6c43.png)

### Copy Profiles[​](#copy-profiles "Direct link to Copy Profiles")

Copies one PID or rate profile over another. Pick the profile type, the source and the destination, then press **Save**.

![Copy Profiles page](/assets/images/copy_profiles-5159f0e9b1c25734146d60a95508896b.png)

### Select Profile[​](#select-profile "Direct link to Select Profile")

Switches the flight controller to another PID or rate profile. The tuning pages follow the profile you pick.

![Select Profile page](/assets/images/profile_select-0175d9c4337a9293dac7748aa6833065.png)

### Diagnostics[​](#diagnostics "Direct link to Diagnostics")

Read-only pages for checking the link and the flight controller:

![Diagnostics menu](/assets/images/diagnostics_menu-3ab6bea55d9fa9c78079d9f352d5f080.png)

| Page           | What it shows                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Status         | Whether the radio side is working: free memory, the RF module, the MSP sensor, the connection to the flight controller and the API version. |
| ELRS Telemetry | Probes the ExpressLRS module and its link. It needs CRSF telemetry.                                                                         |
| FBL Status     | The flight controller's arming flags, blackbox space, load, and active profiles.                                                            |
| Info           | Version numbers: the suite, Ethos, the firmware, and the MSP protocol.                                                                      |

![Diagnostics, Status page](/assets/images/diagnostics_rfstatus-d8d08b6095d5cab9912c212f8c6ebb33.png)

![Diagnostics, Info page](/assets/images/diagnostics_info-0159489befa937e45814a3ced440927e.png)

When something doesn't work, **Status** and **Info** are the first places to look, and worth a screenshot when you ask for help.

## Logs[​](#logs "Direct link to Logs")

The radio logs telemetry while you fly: voltage, current, head speed, ESC temperature and throttle. **Logs** works without the model connected.

Logs are kept per model, under the craft name:

![Logs: one folder per model](/assets/images/logs-folders-e59133244d9654ccde4c8389f1cfa9c7.png)

Inside, flights are grouped by date, one tile per flight:

![A model\&#39;s logs, grouped by date](/assets/images/logs-list-e1ce47a55910bc6b339e67275f4934bd.png)

Open a flight to see it as a graph. The legend on the right shows each value's minimum and maximum over the flight, and its value at the cursor. Drag the slider to move through the flight. **-** and **+** zoom out and in; they are greyed out when the whole flight already fits.

![A flight log graph, with voltage, current, head speed, ESC temperature and throttle](/assets/images/logs-graph-65a63ecaca91a550e84644171d34cbd9.png)
