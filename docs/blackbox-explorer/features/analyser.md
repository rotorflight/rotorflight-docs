# Spectrum Analyser

The **Analyser** splits a trace up by frequency, so you can see which
vibrations are getting through to the gyro and how strong each one is.
You'll use it for [filter tuning](../../tuning/filters.md) and to check
that the [RPM filter](../../setup/rpm-filters.md) is doing its job.

## Opening it

1. Press **A**, or choose **View → Analyser**.
2. Click the trace you want to look at in the legend. Usually that's
   **Gyro** or **Unfiltered Gyro** for one of the axes. The Analyser always
   shows the last trace you clicked.
3. Mark the part of the flight you're interested in. Right-click where it
   starts and choose **Set start here** (or press **I**), then do the same
   at the end with **Set end here** (**O**). If nothing is marked, the
   whole log is used.

!!! warning "SCREENSHOT NEEDED: analyser.png"
    Main screen with the Analyser overlay open on Gyro or Unfiltered Gyro, a start/end stretch marked over a steady hover, and the red Max noise line visible.

<!-- ![Analyser open over a hover, with a start and end marked](img/analyser.png) -->

Choose a stretch of steady flight at a constant headspeed, such as a hover
or some straight forward flight. Spool-up, spool-down and headspeed
changes spread every peak out over a range of frequencies and make the
spectrum hard to read. The Analyser takes at most 5 minutes of data,
counted from the start mark.

The highest frequency you can see is half the logging rate, so a 1 kHz log
goes up to 500 Hz. Filter work needs 1 kHz or more. The
[Blackbox](../../reference/blackbox.md#logging-rate-and-space) reference
page has more on logging rates.

The expand button in the corner of the Analyser makes it full screen. In
full screen there are two sliders, one to zoom the frequency axis (up to
500%) and one for the height (up to 1000%).

!!! warning "SCREENSHOT NEEDED: analyser-full-screen.png"
    The Analyser in full screen, with the expand button and both zoom sliders visible.

<!-- ![Analyser in full screen with the zoom sliders](img/analyser-full-screen.png) -->

## Spectrum types

| Type | Shows |
| --- | --- |
| **Frequency** | How much of the trace is at each frequency. This is the default and the one to use for filters. A red line marks the biggest peak (**Max noise**). |
| **Freq. vs Throttle** | A heat map of frequency against throttle. With a governor the throttle hardly moves, so on most helicopters this doesn't tell you much. |
| **Error vs Setpoint** | Average PID error for each range of stick rate. This is for checking the tune rather than the filters. See [below](#error-vs-setpoint). |

<!-- TODO: check Freq. vs Throttle with a Rotorflight log. It reads the field
`rcCommands[3]`, which Rotorflight logs don't seem to contain. -->

### Filter lines

The second drop-down draws the filters from the log header on top of the
spectrum, so you can see where each one cuts in. You can show all filters,
only the gyro, D-term or yaw filters, or none. **Auto** shows the filters
that apply to the trace you're looking at.

!!! warning "SCREENSHOT NEEDED: filter-lines.png"
    A Gyro spectrum with the filter drop-down set to Auto, so the filter lines are drawn over it. Show both drop-downs open or readable.

<!-- ![Gyro spectrum with the filter lines drawn on top](img/filter-lines.png) -->

## Finding the source of a peak

Hold **Shift** and move the mouse over the spectrum. A line follows the
pointer, and seven more lines mark the 2nd to 8th harmonics of that
frequency. Every line is labelled with its frequency in Hz and the same
frequency in rpm. The eight labelled harmonics are new in 2.4.

!!! warning "SCREENSHOT NEEDED: harmonics.png"
    Shift held with the pointer on the main rotor peak, so the eight harmonic lines and their Hz and rpm labels show. Ideally the rpm on the first line matches the headspeed.

<!-- ![Harmonic lines with Hz and rpm labels on a main rotor peak](img/harmonics.png) -->

Because the labels are in rpm, you can compare them straight against the
headspeed:

1. Find the headspeed for the stretch you're analysing, from the
   **Headspeed** trace or the values table.
2. Hold **Shift** and put the pointer on the lowest peak.
3. If the rpm on the first line matches the headspeed, that peak comes from
   the main rotor. Any other peaks sitting on the harmonic lines are main
   rotor harmonics.
4. Repeat with the tail rotor speed to check the tail.

If a peak doesn't match either rotor and stays put when the headspeed
changes, it's most likely a frame resonance. The
[Filter Tuning](../../tuning/filters.md#3-identify-the-peaks) page explains
what to do about each type of peak.

!!! tip "Raw against filtered"
    Look at **Unfiltered Gyro** and **Gyro** for the same axis over the
    same stretch. Whatever is in the first and missing from the second has
    been removed by the filters. A peak that is still there in the
    filtered gyro is getting past them.

!!! warning "SCREENSHOT NEEDED: raw-vs-filtered.png"
    Unfiltered Gyro and Gyro spectra for the same axis over the same stretch, side by side or one above the other in a single image, so the peaks the filters removed stand out.

<!-- ![Unfiltered Gyro and Gyro spectra for the same stretch](img/raw-vs-filtered.png) -->

## Error vs Setpoint

**Error vs Setpoint** plots the average PID error (setpoint minus gyro)
against the rotation rate you were asking for. It uses the axis of the
trace you last clicked in the legend, so click any roll, pitch or yaw
trace first. The stick rates are grouped into ten bars.

!!! warning "SCREENSHOT NEEDED: error-vs-setpoint.png"
    The Error vs Setpoint chart for roll or pitch from a flight with plenty of hard stick inputs, so all ten bars have data.

<!-- ![Error vs Setpoint chart](img/error-vs-setpoint.png) -->

On a good tune the error stays low all the way across. If it rises steeply
at the higher rates, the helicopter is struggling to keep up with big
stick inputs, and feedforward and the cyclic gains are worth a look. The
[Step Response](step-response.md) shows the same problem in a different
way.