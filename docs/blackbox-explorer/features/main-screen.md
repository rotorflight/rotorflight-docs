# The Main Screen

With a log open, the window is made up of the toolbar along the top, the
graph in the middle, the seek bar below it and the legend on the right.

The red vertical line in the centre of the graph marks the current time.
The values in the legend, the overlays and any flight video all show what
was happening at that moment.

!!! warning "SCREENSHOT NEEDED: main-window.png"
    Whole window with a log open. Toolbar, graph with the red time line, seek bar and legend all visible. Optionally label the four areas.

<!-- ![Blackbox Explorer main screen with a log open](img/main-window.png) -->

## Moving around the log

| To | Do this |
| --- | --- |
| Play and pause | Press **Space**, or use the play button. |
| Move through the log | Drag the graph sideways, click or drag on the seek bar, or scroll with **Shift** held. A sideways swipe on a trackpad also works. |
| Zoom in and out | Scroll the mouse wheel over the graph. It zooms around the pointer. On a trackpad, pinch. |
| Step precisely | **←** and **→** move 100 ms at a time. Hold **Alt** to move a single frame. |
| Jump to a time | Type the time into the **Time** box in the toolbar. |

All the shortcuts are listed on [Keyboard Shortcuts](shortcuts.md). The
Explorer has the same list under its **?** button.

### The right-click menu

*New in 2.4.*

Right-click anywhere on the graph or the seek bar to get a menu for that
point in the log:

- **Go to here** moves the red line to where you clicked.
- **Set start here** and **Set end here** (keys **I** and **O**) mark a
  stretch of the log. The [Analyser](analyser.md),
  [Step Response](step-response.md) and video export all use this
  stretch. **Clear start and end** removes the marks.
- **Place marker here** (key **M**) drops a marker. While it's there, the
  toolbar shows how far you are from it, which is handy for timing the gap
  between two events.
- **Add bookmark** saves the time so you can come back to it with
  **Alt** and a number. There are nine bookmarks.
- **Zoom in here**, **Zoom out** and **Reset zoom**.
- **Export video…** and **Save graph as image…**, covered on
  [Video & Export](video-and-export.md).

!!! warning "SCREENSHOT NEEDED: right-click-menu.png"
    The right-click menu open over the graph, ideally with a start/end range and a marker already set so they show too.

<!-- ![Right-click menu on the graph](img/right-click-menu.png) -->

## The toolbar

!!! warning "SCREENSHOT NEEDED: toolbar.png"
    Crop of the full toolbar at a wide window size so no groups are folded into drop-downs.

<!-- ![The toolbar](img/toolbar.png) -->

| Control | |
| --- | --- |
| **Open** | Opens another log, a video, a workspace file or a CLI dump. |
| **Export** | Exports video, CSV or workspaces. See [Video & Export](video-and-export.md). |
| **Flight analysis** (pulse line) | Runs a health check on the whole flight. See [Flight Analysis](flight-analysis.md). *New in 2.4.* |
| **Settings** (cog) | Display settings, described [below](#settings). |
| **?** | The keyboard shortcuts. |
| **View** | Switches between the graph, the **Header** (**H**) and the **Values Table** (**T**), and turns the overlays on and off. |
| **Playback** | Jumps to the start or end of the log, or of the video if one is loaded. Also step back, step forward, play and pause. |
| **Speed** | Playback speed, from 10% to 300%. |
| **Zoom** | The zoom level of the graph. |
| **Time** | Type a time here to jump to it. |
| **Log sync** | Lines a flight video up with the log. See [Syncing a flight video](video-and-export.md#syncing-a-flight-video). |
| **Workspace** | Loads one of your saved layouts or a built-in one. See [Graphs & Workspaces](graphs-and-workspaces.md). |

If the window is narrow, some of these groups fold up into drop-down menus.

## The seek bar

The strip under the graph is an overview of the whole log. Its outline
follows the average motor output, which makes spool-up, the flight itself
and spool-down easy to spot. Events recorded by the flight controller are
marked along it.

You can also have the seek bar coloured by the PID profile that was active
at the time. Turn on **Profile Hints** in the [Settings](#settings). This
is useful if you switch profiles in flight, for example to compare two
tunes in the same log.

!!! warning "SCREENSHOT NEEDED: seek-bar.png"
    Crop of the seek bar with Profile Hints on, using a log where the PID profile changes in flight. Event marks visible if possible.

<!-- ![Seek bar coloured by PID profile](img/seek-bar.png) -->

## The legend

The legend lists each graph and its traces, along with the value of each
trace at the red line. You can also use it to change the display:

!!! warning "SCREENSHOT NEEDED: legend.png"
    Crop of the legend panel, including the buttons along the bottom and the Graph setup button. Hovering a trace (highlighted) is a bonus.

<!-- ![The legend](img/legend.png) -->


- Hover over a trace name and that trace is highlighted on the graph.
- Click a trace name to send it to the [Analyser](analyser.md).
- Click a graph's title to show that graph on its own at full height.
  Click it again to go back. **Alt**+click splits the graph so that each
  trace gets a graph of its own.
- Drag a graph's title up or down to change the order of the graphs.
- Hover over a trace and scroll while holding **Ctrl** to change its
  smoothing, **Shift** to change its zoom, or **Alt** to change its expo.

The buttons at the bottom of the legend switch expo, smoothing and grids
on or off for all traces together. **Graph setup** opens the
[graph configuration](graphs-and-workspaces.md#graph-setup).

If you need more room for the graph, close the legend with its **×**.

## Header and values table

The **Header** (**H**) lists the settings the flight controller was using
when the log was recorded. That includes the PID gains and master gains,
governor gains, rates, filters and RPM filter settings. When you have a
pile of logs and can't remember which tune each one was flown on, this is
where to check. The master gains were added in 2.4.

!!! warning "SCREENSHOT NEEDED: header.png"
    The Header view (H), showing the PID, master gain and governor section.

<!-- ![Header view](img/header.png) -->

The **Values Table** (**T**) shows every logged field at the red line. Each
one is given twice: the raw number from the log, and the value converted to
real units such as degrees per second, volts, amps or rpm.

!!! warning "SCREENSHOT NEEDED: values-table.png"
    The Values Table (T), with the raw and converted columns both visible.

<!-- ![Values Table view](img/values-table.png) -->

## Overlays

Overlays sit on top of the graph. Turn them on and off from the **View**
menu.

!!! warning "SCREENSHOT NEEDED: overlays.png"
    Graph with the Craft and Sticks overlays on, mid-flight with collective and cyclic applied so the rotor disc colouring shows.

<!-- ![Craft and stick overlays over the graph](img/overlays.png) -->

| Overlay | Shows |
| --- | --- |
| **Video** | The synced flight video, behind the graph. |
| **Craft** | A 3D helicopter that follows the logged attitude. Since 2.4 the rotor disc also shows the controls. It turns green for positive collective and blue for negative, and gets more solid the further the stick is from centre. The side the cyclic is tilting towards is drawn brightest. |
| **Sticks** | Both sticks as the pilot moved them. The stick mode is set in the [Settings](#settings). |
| **Analyser** (**A**) | The [spectrum analyser](analyser.md). |
| **Step Response Graph** | The [step response](step-response.md). *New in 2.4.* |

If the log has no attitude data, the craft shows *Attitude Unavailable*.
To fix that for future flights, tick **Attitude** on the Configurator's
[Blackbox](../../configurator/tabs/blackbox.md) tab.

## Settings

The cog in the toolbar opens the display settings. These belong to the
Explorer, so they stay the same whichever log you open.

!!! warning "SCREENSHOT NEEDED: settings.png"
    The Settings dialog opened from the cog. If it scrolls, capture the top half, or take two shots.

<!-- ![Settings dialog](img/settings.png) -->

| Setting | |
| --- | --- |
| **Stick Settings** | Stick mode (1 to 4), units, stick trails, inverted yaw, and the position of the stick overlay. |
| **Legend Settings** | Show real units in the legend. |
| **Seekbar Settings** | **Profile Hints** colours the seek bar by PID profile. Off by default. |
| **Craft, Analyser and Step Response Settings** | Position and size of each overlay, as a percentage of the screen. |
| **Analyser Settings** | **Hanning** window for the spectrum. On by default, and best left on. |
| **Watermark** and **Lap Timer** | Extras for exported videos. See [Export video](video-and-export.md#export-video). |
| **Graph Style Settings** | Gradient background, and the vertical time bar. |
