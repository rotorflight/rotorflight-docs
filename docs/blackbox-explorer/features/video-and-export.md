# Video & Export

## Syncing a flight video

With a flight video playing behind the graphs, you can see exactly what
the helicopter was doing at each point in the log. It makes it much easier
to match a wobble on the graph to something you saw from the ground.

1. Open the log first, then the video. Drag the video onto the window or
   use **Open**. `.mp4`, `.mov` and `.avi` files are supported.
2. Line the two up using **Log sync** in the toolbar.
    - The flight controller beeps when it arms, and that's also the moment
      the log starts. Play the video up to the beep and press **Start Log
      Here**.
    - Fine-tune with the **◀** and **▶** buttons, or type an offset in
      seconds. A positive offset moves the log later in the video.
3. Play it back. **Alt**+**←** and **Alt**+**→** step one video frame at a
   time, and the **VID** buttons jump to the start or end of the video.

### Smart Sync

If you can't hear the beep, you can sync on anything sharp that shows up
in both the log and the video, such as the start of a flip or a hard stop.

1. On the graph, move the red line to the event and press **M** to drop a
   marker there.
2. Step through the video until it shows the same moment.
3. Press **Alt**+**M**. The log and video are now synced at that point.

### When a video won't play

The Explorer can only play formats its browser engine supports. If a video
won't load, convert it with [HandBrake](https://handbrake.fr), which is
free. Choose an **MP4** container and **H.264** video.

Sometimes the flight video in an *exported* video jumps back a frame or two
now and then. To stop this, convert the video in HandBrake again and add
`keyint=1` in **Additional Options**. That makes every frame a key frame,
which the export needs in order to seek accurately.

## Export video

**Export → Video…** (also on the right-click menu) renders the graphs to a
**WebM** video file, with the flight video behind them if one is loaded
and switched on. It's a handy way to share a flight with someone who
doesn't have the Explorer, or to put a tuning flight on YouTube.

The export looks exactly like the screen. The graphs, overlays (craft,
sticks, Analyser) and their positions all go into the video, so set them
up the way you want before you start.

| Option | |
| --- | --- |
| **Video duration** | The stretch between the start and end marks (**I** and **O**). With no marks, the whole log. |
| **Framerate** | 15 to 240 fps. If there's a flight video, match its frame rate. |
| **Resolution** | 480p, 720p or 1080p. |
| **Dim flight video** | Darkens the flight video so the graphs are easier to read. |

The exported video has no sound. While it renders, the dialog shows the
progress, file size and time left.

There is an extra option for videos in the **Settings**:

- **Watermark** puts a logo on the video. You can set its position, size
  and transparency.

## Export CSV

**Export → CSV…** saves every field in the selected log, frame by frame,
to a CSV file you can open in a spreadsheet, Python or MATLAB. The column
headings are the field names listed under
[Field names](graphs-and-workspaces.md#field-names).

## Save the graph as an image

Press **Alt**+**S**, or right-click and choose **Save graph as image…**, to
save the screen as a PNG. Posting one of these is usually the fastest way
to get help on Discord.

## Export workspaces

**Export → Workspaces…** saves all your
[workspaces](graphs-and-workspaces.md#your-own-workspaces) to a `.json`
file. Opening that file in the Explorer loads them, whether on another
computer, in another browser or on a friend's Explorer. Loading a
workspace file replaces the workspaces that are already there, so export
your own first if you want to keep them.

Each export asks where to save the file, and suggests a name based on the
log's file name. Cancelling at that point cancels the export.
