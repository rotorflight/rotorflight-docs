# Tuning

Rotorflight's defaults are chosen to be safe and flyable on any properly
set-up helicopter. Most helicopters hover and fly well on them -- but they're
deliberately conservative, so with some tuning yours will feel more
locked-in and precise.

## Before you tune

Tuning only works on a helicopter that's set up correctly. Check first:

- [ ] The [mixer is calibrated](../setup/mixer.md): commanded blade angles
      match real ones. The defaults assume this.
- [ ] The [RPM filter](../setup/rpm-filters.md) is working, and a
      [Blackbox log](filters.md) shows a clean gyro. **Don't raise D on an
      unfiltered helicopter** -- it will cook servos.
- [ ] The headspeed is steady -- [tune the governor](governor.md) first if
      it isn't.
- [ ] No slop: worn ball links, a sticky tail pitch slider or a loose servo
      arm can't be tuned out, and make the helicopter wag or wobble whatever
      the gains.
- [ ] Blackbox logging is on, so you can see what happened.

## What "too high" looks like

Raise a gain until the helicopter starts to misbehave, then back off. How
hard you test depends on how you fly:

| You fly | Test with |
| --- | --- |
| Sport | Sharp stick taps; fast forward flight with a sudden stop; hard climb-outs |
| Aerobatics | Flips and rolls with crisp stops; tic-tocs |
| 3D | Everything above, at full rates and collective; piro-flips; fast backwards flight |

Fast wobbles (5-8 Hz -- a shudder) come from **P** or **D** too high. Slow
oscillations (around 1 Hz -- a wallow) come from **I** too high, or P too low.

## The order

Follow [Tuning Process](process.md):

1. Cyclic cross-coupling and collective-to-pitch compensation, while the
   gains are still soft and the effects are easy to see.
2. Cyclic **P**, then **D**, then **I**.
3. Cyclic **F**, then **B** if you want a sharper feel.
4. The tail: P, D, I, then the stop gains and precompensation.
5. [High Speed Integral](high-speed-integral.md) for fast forward flight.

Change **one thing at a time**, and keep notes. A profile per tune
([Profile Switching](../setup/profile-switching.md)) lets you compare two in
the same flight.

## Tools that help

- **Blackbox** -- logs show what your eyes can't: whether I is doing the
  work F should, whether a stop overshoots, where the noise is. Open logs in
  the [Blackbox Explorer](https://blackbox.rotorflight.org).
- **[Adjustments](../configurator/tabs/adjustments.md)** -- sweep a gain on
  a knob in flight, then read the value off afterwards.
- **The Lua suites** -- change gains at the field between flights.
- **Tune Advisor** *(2.4, Ethos suite)* -- the flight controller measures
  how the helicopter follows your sticks in acro flight; after each flight
  the radio combines your recent flights and suggests one change per axis --
  for example F and rates when it turns faster or slower than asked, or
  I-term relax for bounce-back after stops. See
  *Flight Tuning → Tune Advisor* in the Ethos suite.
- **[Presets](../configurator/tabs/presets.md)** -- complete tunes for
  popular helicopters, as a starting point.

## The settings

Each setting is explained on the [Profiles](../configurator/tabs/profiles.md)
tab page, with a "Why these defaults" section and a symptom table.
