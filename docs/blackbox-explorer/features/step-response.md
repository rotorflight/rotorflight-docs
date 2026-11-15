# Step Response

!!! info "New in 2.4"

The **Step Response** graph shows how well each axis follows the sticks.
When you ask for a sudden rotation, you can see how quickly the helicopter
gets there, whether it overshoots, and how cleanly it settles. It's worked
out from an ordinary flight, so there's no need to fly any special test
manoeuvres.

## Opening it

1. Choose **View → Step Response Graph**.
2. If you only want part of the flight, mark it with **I** and **O**, or
   right-click and use **Set start here** and **Set end here**. Otherwise
   the whole log is used, up to 5 minutes of it.
3. The **Roll**, **Pitch** and **Yaw** switches show or hide each axis. The
   expand button makes the graph full screen.

Pressing **Shift** while you Hover the mouse over the graph will display the time and the value for each
axis at that point.

## Getting a useful log

The Step Response is calculated from your stick movements, so the log needs
to have some in it. The Explorer cuts the log into one-second pieces and
only keeps the pieces where the stick moved by at least 20 deg/s. It then
averages them, after dropping any that are very different from the rest.

- Fly some crisp stick inputs on every axis: flips, rolls, pirouettes and
  sharp stops all work. A log of gentle hovering won't give it much to go
  on.
- Stick to one tune per log, or mark a stretch that was all flown on the
  same tune. If two tunes get averaged together, the result doesn't
  describe either of them.
- Log setpoint and gyro (both on by default) at 500 Hz or more.

If fewer than 10 pieces could be used, the axis is labelled *(low
confidence)*. Treat the shape as a rough guide only, and fly another log
with more stick movement. *No data* means none of the pieces were usable.

## Reading it

Across the bottom is the time after the stick input, up to 500 ms. Up the
side is the gyro rate as a fraction of the requested rate, so **1.0** means
the helicopter is turning exactly as fast as you asked.

Each axis is labelled with the gains it was flown on, taken from the log
header: **P**, **I**, **D** and **F**, plus **MG** if the master gain was
anything other than 100%. That makes it easy to tell screenshots of
different flights apart.

| The line | What it means |
| --- | --- |
| Rises quickly and settles flat at 1.0 | A good tune. |
| Goes well over 1.0 and then comes back down | Overshoot. The helicopter overruns the stops. |
| Swings above and below 1.0 before settling | Ringing. The stops bounce. |
| Creeps up towards 1.0 | Sluggish. The helicopter lags behind the sticks. |
| Levels off below 1.0 | The axis never quite reaches the rate you asked for. |

Change one thing at a time, fly the same manoeuvres again and compare the
two graphs. The [Tuning Process](../../tuning/process.md) explains which
gain to adjust for each of these, and in what order.

!!! note
    The Step Response is an average over the whole stretch. A one-off
    event such as a gust or a tail blowout is better looked at directly on
    the graph, using the **Roll**, **Pitch** or **Yaw Preset**
    [workspace](graphs-and-workspaces.md#built-in-workspaces).
