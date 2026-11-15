# Flight Analysis

!!! info "New in 2.4"

Click **Flight analysis** (the pulse line button in the toolbar) and the
Explorer reads through the log and reports on the headspeed, power,
battery, vibration and how closely the helicopter followed the sticks.
It's meant as a quick first check. When something looks wrong, it tells
you which part of the Explorer to look at next.

## How it works

The analysis covers the whole of the selected log. Start and end marks are
ignored. The line at the top gives the craft name, firmware version,
length of the flight and how many seconds of it counted as steady flight.

All the numbers come from the steady parts of the flight only, so
spool-up, spool-down and headspeed changes don't affect them. Steady flight
is picked out using:

- the governor target, if the Rotorflight governor is in use. A stretch
  counts when the target isn't changing and the headspeed is within 8% of
  it.
- the headspeed itself, if there is no governor target. A stretch counts
  when the headspeed is holding steady.
- the gyro, if no headspeed was logged. A stretch counts when the
  helicopter isn't being thrown around.

A steady stretch has to last at least 3 seconds. Short or very busy
flights may not have any, and in that case most of the checks will say
there isn't enough data.

If the log is longer than 4 minutes, only the steadiest 4 minutes are
analysed, to save time. The dialog tells you when this has happened.

## The verdict

The **Verdict** section gives a one-line summary and a card each for
**Headspeed**, **Power**, **Battery** and **PID Tracking**. Each card has
one of three ratings:

| Rating | |
| --- | --- |
| **Looks good** | Nothing to do. |
| **Worth watching** | Keep an eye on it over the next few flights. |
| **Needs attention** | Sort it out before you fly again. |

Under the verdict is a section for each check, with a short explanation
and the figures it was based on. If a check couldn't run because the log
was missing something, it says what was missing.

## The checks

### Headspeed / Governor

This check needs headspeed in the log, which means an
[RPM source](../../setup/rpm-measurement.md) and **RPM** logging.

With the Rotorflight governor running, it looks at how far the headspeed
drops below the target. Short dips when you punch the collective are
normal and are left out. What counts is sag that lasts.

| Sustained sag | Rating |
| --- | --- |
| Up to 2.5% | Looks good |
| 2.5% to 5% | Worth watching |
| More than 5% | Needs attention |

The worst single dip and the overall tracking error are shown as well. A
lot of sag usually means either the governor needs tuning or the power
system has run out of headroom, so check the **Power** card too. See
[Governor Tuning](../../tuning/governor.md).

With an ESC governor or a throttle curve there's no target in the log.
Instead, the check looks at how steady the headspeed was. Variation up to
1.2% looks good, and over 3% needs attention.

### Power / ESC

This uses the throttle reported by
[ESC telemetry](../../setup/esc-telemetry.md). Without telemetry it uses
the motor output instead.

- **Needs attention** if the throttle was at 97% or above for more than 2%
  of the steady flight. At that point the governor has nothing left in
  reserve, and the headspeed will drop every time the load goes up.
- **Worth watching** if the average throttle left less than 12% headroom.

Running short of headroom normally means the headspeed is too high for the
gearing and battery. See [Gear Ratios](../../setup/gear-ratios.md). Average
and peak current are also shown if they were logged.

### Battery

This uses the battery voltage, or the ESC's voltage if that's all there
is, and works out the cell count. The rating is based on the lowest
voltage the pack held under load, per cell. A brief dip on its own doesn't
count.

| Under load | Rating |
| --- | --- |
| 3.45 V per cell or more | Looks good |
| 3.30 to 3.45 V per cell | Worth watching |
| Below 3.30 V per cell | Needs attention |

If the battery needs attention, the flights are too long or the pack is
getting tired. Try a shorter flight, or check the pack.

### Vibration

This finds the strongest vibration in the gyro on each axis and compares
its frequency with the main and tail rotor speeds to suggest a likely
cause:

- **main rotor 1×**: main blade tracking or balance
- **main rotor 2× or 3×**: blade pass on a two or three blade head
- **tail rotor 1× or 2×**: tail blade balance, tail drive or tail blade
  pass
- **high frequency**: motor, gear mesh or bearing noise
- **not linked to rotor speed**: a frame or electrical resonance

There is no rating for vibration, only the findings. For a proper look,
open the [Analyser](analyser.md) on the same part of the flight, and see
[Filter Tuning](../../tuning/filters.md).

### PID Tracking

This compares the gyro with the setpoint on each axis while the sticks are
moving. The normal delay between command and response is taken out first.
The result is given as an error, in % of the requested rate, together with
the delay in milliseconds. A well-tuned helicopter typically comes out
somewhere around 15% to 25%.

| Worst axis | Rating |
| --- | --- |
| Up to 30% error | Looks good |
| 30% to 45% | Worth watching |
| More than 45% | Needs attention |

The check also counts how often each axis hit its PID sum limit. Over 1%
of the steady flight is worth watching and over 5% needs attention. If it
happens on the tail, the tail probably doesn't have enough authority.
Check the tail mechanics, gearing and pitch range before you touch the
gains.

To look more closely at any axis, open the
[Step Response](step-response.md).

!!! tip
    Flight Analysis is a quick check and won't tune the helicopter for
    you. A good result from a gentle hover doesn't say much about how it
    will fly 3D, so analyse logs of the kind of flying you actually do.
