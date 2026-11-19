# Graphs & Workspaces

The graph area is divided into several graphs stacked on top of each
other, and each graph can hold one or more traces (logged fields). A
workspace is a saved arrangement of graphs that you can bring back with a
click or a single key.

## Built-in workspaces

The **Workspace** menu in the toolbar comes with a few layouts set up for
common jobs. You can't overwrite these, but you can load one, change it,
and save the result to one of your own slots.

!!! warning "SCREENSHOT NEEDED: filter-tuning-workspace.png"
    The main screen with the built-in Filter Tuning workspace loaded, so the raw and filtered gyro graphs and headspeed are visible with the legend.

<!-- ![The Filter Tuning workspace](img/filter-tuning-workspace.png) -->

| Workspace | Graphs | Good for |
| --- | --- | --- |
| **Filter Tuning** | Raw and filtered gyro for roll, pitch and yaw, plus headspeed | Seeing how much vibration the filters take out. Use it alongside the [Analyser](analyser.md). |
| **Roll Preset**, **Pitch Preset**, **Yaw Preset** | P, I, D and F for that axis; gyro, setpoint and error; mixer output | PID tuning, one axis at a time. |
| **Governor Preset** | Governor P, I, D, F, sum, requested and target headspeed | [Governor tuning](../../tuning/governor.md). |
| **Power Preset** | Battery voltage and current, BEC voltage and current, headspeed and motor | Checking the battery, BEC and the rest of the power system. |

A trace only shows up if the field is in the log, so make sure it's ticked
on the Configurator's [Blackbox](../../configurator/tabs/blackbox.md) tab.
ESC and BEC fields also need [ESC telemetry](../../setup/esc-telemetry.md)
to be working.

## Your own workspaces

The **Workspace** menu has 20 slots for your own layouts.

- To save the current graphs into a slot, click the disk icon beside it.
  The pencil icon renames the slot.
- **Shift** plus a number key (0 to 9) saves into that slot, and the number
  key on its own loads it again. Two layouts on two keys makes it very
  quick to flip between different views of the same moment.
- **Ctrl**+**Z** goes back to the layout you had before. Pressing it again
  returns to the one you were on.
- **Clear saved workspaces**, at the bottom of the menu, deletes all of
  your own workspaces. The built-in ones stay. *New in 2.4.*

!!! warning "SCREENSHOT NEEDED: workspace-menu.png"
    The Workspace menu open, showing the built-in workspaces, a few of your own named slots with the disk and pencil icons, and Clear saved workspaces at the bottom.

<!-- ![The Workspace menu](img/workspace-menu.png) -->

The Explorer remembers your workspaces itself. In the web version they are
stored by the browser, so a different browser or computer won't have them.
To move them, or to share them with someone, use
**Export → Workspaces…** and open the `.json` file at the other location.

## Graph setup

The **Graph setup** button at the bottom of the legend opens the full graph
configuration.

**Add graph** gives you a choice of an empty **Custom graph** or one of the
ready-made graphs, such as Gyros, Gyros (pre-filter), Setpoints, RC
Command, Controls, PID roll, PID pitch, PID yaw, Governor, Rotor Speeds,
Motors, Servos, Battery, Voltages, Temperatures, ESC Telemetry, BEC
Telemetry, Attitude, Accelerometer and Debug. Only the graphs the log has
data for are offered.

!!! warning "SCREENSHOT NEEDED: add-graph.png"
    The Add graph list open in Graph setup, showing Custom graph and the ready-made graphs.

<!-- ![The Add graph list](img/add-graph.png) -->

Each graph has an **Axis label** (its name) and a list of traces. Use
**Add field** to add a trace, and **Remove graph** or **Remove all
graphs** to clear things out.

!!! warning "SCREENSHOT NEEDED: graph-setup.png"
    The Graph setup dialog with two or three graphs, each with a few traces, so the Axis label, Add field, Remove graph buttons and all the trace columns (Name to Grid) are readable.

<!-- ![The Graph setup dialog](img/graph-setup.png) -->

For each trace you can set:

| Column | |
| --- | --- |
| **Name** | The logged field. Fields ending in `[all]` add every axis or channel at once. |
| **Smooth** | How much the trace is smoothed on screen, in %. At 0 you see exactly what was logged, which is what you want when looking for vibration. |
| **Expo** | Compresses large values so that small ones are easier to see. 100% means no expo. |
| **Zoom** | Vertical zoom for this trace, in %. |
| **Line** | Line width. |
| **Color** | Colour of the trace. |
| **Grid** | Draws grid lines to the scale of this trace. |

Smoothing, expo and zoom only affect how a trace is drawn. The Analyser,
Step Response and exports always use the logged data.

Click **Save changes** to apply the new layout. If you want to keep it,
save it to a workspace as well.

!!! tip "Quick overrides"
    **S** switches all smoothing off until you press it again. **X** does
    the same for expo and **G** for grids. Turn smoothing off before you
    judge vibration from the graph, because smoothing hides it.

!!! warning "SCREENSHOT NEEDED: smoothing-compare.png"
    The same Gyro trace over the same stretch with smoothing on and off (S), one above the other in a single image, so the vibration that smoothing hides is obvious.

<!-- ![The same gyro trace with smoothing on and off](img/smoothing-compare.png) -->

## Field names

The legend uses readable names. **Graph setup** and CSV exports use the
names the firmware logs under. Axes are numbered 0 for roll, 1 for pitch
and 2 for yaw.

| In the legend | Field | What it is |
| --- | --- | --- |
| RC Command [roll … throttle] | `rcCommand[0-4]` | Stick commands for roll, pitch, yaw, collective and throttle. |
| Setpoint | `setpoint[0-3]` | What the flight controller is asking for after rates are applied. Rotation rate in deg/s for the first three, then collective. |
| Gyro | `gyroADC[0-2]` | Filtered gyro, in deg/s. |
| Unfiltered Gyro | `gyroRAW[0-2]` | The gyro before filtering. Needs **Raw Gyro** logging. |
| PID P, I, D, Feedforward | `axisP`, `axisI`, `axisD`, `axisF` `[0-2]` | The PID terms. |
| PID Boost, PID Offset | `axisB`, `axisO` `[0-2]` | The B and O terms. |
| PID Sum | `axisSum[0-2]` | The PID controller's output to the mixer. |
| PID PD Sum | `axisPD[0-2]` | P plus D. Calculated by the Explorer. |
| PID Error | `axisError[0-2]` | Setpoint minus gyro. Calculated by the Explorer. |
| Mixer | `mixer[0-3]` | Mixer inputs for roll, pitch, yaw and collective. |
| Servo, Motor | `servo[n]`, `motor[n]` | Servo and motor outputs. |
| Headspeed, Tailspeed | `headspeed`, `tailspeed` | Main and tail rotor rpm. |
| HS Target, HS Requested, Gov P … | `govTarget`, `govRequest`, `govP` … | The governor's target and requested headspeed, and its PID terms. |
| Battery Voltage, Battery Current | `Vbat`, `Ibat` | Measured by the flight controller. |
| ESC …, BEC … | `Esc…`, `Bec…` | ESC and BEC telemetry. |

The **Values Table** (**T**) lists every field in the log.
