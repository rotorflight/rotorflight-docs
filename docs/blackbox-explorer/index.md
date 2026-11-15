# Blackbox Explorer

The **Blackbox Explorer** opens the flight logs recorded by the flight
controller and lets you step through the flight frame by frame. You can see
the stick inputs, setpoints, gyro, PID terms, servo and motor outputs,
headspeed, governor, battery and ESC telemetry, all on one time line.
Most tuning starts here, and so does most crash investigation.

The Explorer can also do some of the analysis for you. The spectrum
analyser helps with filter tuning, the step response graph helps with PID
tuning, and the flight analysis gives a quick health check of headspeed,
power, battery, vibration and tracking.

## Running it

=== "In the browser"

    Go to **[blackbox.rotorflight.org](https://blackbox.rotorflight.org)** and
    click **Launch Blackbox Explorer** to open the latest stable release.
    Snapshots and development builds are listed further down the same page,
    if you want to try something that hasn't been released yet.

    There is nothing to install. The log is read by your browser and is
    never uploaded anywhere.

=== "Desktop app"

    Download the installer for Windows, macOS or Linux from the
    [Blackbox releases page](https://github.com/rotorflight/rotorflight-blackbox/releases/latest).
    Windows 10 or later is required.

    The desktop app works without an internet connection, and you can open
    `.bbl` files with it straight from your file manager.

Both do the same job. Try to use the Explorer from the same release as your
firmware, because a newer firmware can log fields that an older Explorer
doesn't recognise.

## Getting a log

Logging is set up on the Configurator's [Blackbox](../configurator/tabs/blackbox.md)
tab. The easiest way to get the logs off is **mass storage mode**, which
makes the flight controller show up as a USB drive so you can copy the
files across. The [Blackbox](../reference/blackbox.md) reference page covers
logging rates, which fields to log and the other ways of downloading logs.

!!! tip "Log for the job"
    For filter and vibration work, log at 1 kHz or more and tick both
    **Raw Gyro** and **Gyro**. For PID tuning, 500 Hz to 1 kHz is enough.
    A few minutes of steady flying with some sharp stick movements makes a
    good log. Keep one flight per log if you can.

## Opening a log

Drag the file onto the Explorer window, or click **Open log file / video**
on the welcome screen. Once a log is loaded, the same button is called
**Open** and sits in the toolbar.

| File | |
| --- | --- |
| `.bbl`, `.bfl`, `.txt` | Blackbox logs. |
| `.mp4`, `.mov`, `.avi` | A flight video to play behind the graphs. See [Video & Export](features/video-and-export.md). |
| `.json` | Exported workspaces. See [Graphs & Workspaces](features/graphs-and-workspaces.md). |
| `.txt` containing a `dump` or `diff` | A CLI configuration, which you can view with **C**. Useful next to a log from older firmware. |

A single file often holds more than one log, because a new one starts every
time you arm. When that happens a drop-down list appears above the legend
on the right. Each entry shows the start time, end time and length of that
log, so you can pick the flight you want.

## A first look

1. Open the log. The default traces are drawn on the graph, and the seek
   bar underneath shows the whole flight.
2. Press **Space** to play it, or drag the graph sideways. The mouse wheel
   zooms in and out.
3. Choose a layout from the **Workspace** menu in the toolbar. The built-in
   **Filter Tuning**, **Roll**, **Pitch** and **Yaw Preset**, **Governor
   Preset** and **Power Preset** layouts are a good place to start.
4. Click **Flight analysis** (the button with the pulse line in the
   toolbar) to get a summary of how the flight went.

## Features

| Page | What it covers |
| --- | --- |
| [The Main Screen](features/main-screen.md) | Toolbar, graph, seek bar, legend and overlays. |
| [Graphs & Workspaces](features/graphs-and-workspaces.md) | Choosing what's plotted and saving layouts. |
| [Spectrum Analyser](features/analyser.md) | Vibration by frequency, for filter tuning. |
| [Step Response](features/step-response.md) | How each axis follows the sticks, for PID tuning. *New in 2.4.* |
| [Flight Analysis](features/flight-analysis.md) | An automatic health check of the flight. *New in 2.4.* |
| [Video & Export](features/video-and-export.md) | Syncing a flight video, and exporting video, CSV and images. |
| [Keyboard Shortcuts](features/shortcuts.md) | All the keys and mouse actions. |

The Explorer shows you what happened. For what to change afterwards, see
[Tuning](../tuning/index.md), in particular
[Filter Tuning](../tuning/filters.md) and the
[Tuning Process](../tuning/process.md).
