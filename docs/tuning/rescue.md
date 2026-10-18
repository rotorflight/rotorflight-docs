# Rescue

Rescue is a panic button. Flip the RESCUE switch and the flight controller
levels the helicopter -- flipping it upright first if it's inverted --
pulls up, climbs, and then holds a hover until you take over.

It needs the accelerometer [calibrated](../configurator/tabs/setup.md#calibrate-accelerometer)
and turned on.

## Setting it up

1. On the [Modes](../configurator/tabs/modes.md) tab, put **RESCUE** on a
   switch -- a momentary or spring-loaded switch works well, so it ends
   when you let go.
2. On the [Profiles](../configurator/tabs/profiles.md#rescue-settings) tab,
   turn on **Enable Rescue** in each profile you want it in.
3. Choose **Flip to upright**: *Flip* (the default) rights an inverted
   helicopter; *No-Flip* recovers in whatever orientation it's in.

The flight controller won't arm while the rescue switch is on.

## What happens

| Phase | Lasts | Collective |
| --- | --- | --- |
| **Pull-up** | Pull-up Time (0.3 s) | Pull-up Collective (65%) |
| **Flip** (if inverted and Flip is on) | Until upright, or Flip Fail Time (2 s) | -- |
| **Climb** | Climb Time (1 s) | Climb Collective (45%) |
| **Hover** | Until you release the switch | Hover Collective (35%) |
| **Exit** | Exit Time (0.5 s) | Collective changes smoothed, so a sudden negative stick can't drive it into the ground |

With a barometer, **Enable Altitude Hold** makes the hover hold a set
altitude, using the altitude PID settings.

## Setting the collective values

The defaults are percentages of your collective range, for a typical sport
setup. Check them for your helicopter:

- **Pull-up Collective** -- a strong initial pull to arrest a 
descent.

- **Pull-up Time** -- How long to apply pull up collective.

- **Climb Collective** -- enough for a firm climb.

- **Climb Time** -- How long to apply climb collective.

- **Hover Collective** -- set it to what your helicopter actually needs to hover. Too low and it sinks during rescue; too high and it climbs away.


**Leveling Gain**, **Flip-to-Upright Gain** and the **Max Levelling Rate**
and **Acceleration** set how aggressively it rights itself. Larger
helicopters may need slower rates.

## Test it

Test at a safe height, with plenty of room, starting the right way up:

1. Climb high, put the helicopter in a gentle bank, and flip the switch.
   It should level, climb and settle into a hover.
2. Adjust the hover collective until the hover holds height.
3. Only then try it from steeper attitudes, and inverted.

!!! warning
    Rescue needs height. From low down, inverted, a flip and pull-up may
    not finish before the ground arrives.
