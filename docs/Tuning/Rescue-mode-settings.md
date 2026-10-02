# Rescue mode settings

Test before you trust it

Rescue is a flight-critical safety feature, but it is still only as good as the settings you give it. Always test Rescue at a safe altitude (20m+), over soft ground, with an escape plan (be ready to disarm or take back control). Never assume Rescue will save a helicopter it has not been tested on.

## What Rescue does[​](#what-rescue-does "Direct link to What Rescue does")

Rescue is a self-contained recovery mode built into the PID profile. When it's activated — normally by flipping a switch, intentionally or because you've lost orientation — it takes temporary control of collective, roll and pitch to arrest any descent, climb to a safe height, flip the helicopter upright if needed, and bring it to a stable hover. You then take back control smoothly.

It is a **helicopter attitude/collective recovery system**, not a "return to home" or GPS navigation feature. It doesn't move the helicopter horizontally and doesn't know where "home" is — it only cares about being upright, not falling, and (optionally) holding a height. Rotorflight also ships a `gps_rescue_*` subsystem inherited from Betaflight — that is a **different, unrelated feature** which is not functional for helicopters and should not be configured (see [Arming disable flags](/docs/setup/arming.md#disable-flags-description)).

## Enabling it[​](#enabling-it "Direct link to Enabling it")

Rescue is turned on in two places:

1. **Per-profile**: `rescue_mode` must be set to something other than `OFF` on the active PID profile (**Profiles** tab → **Rescue Settings** → *Enable Rescue*). Rescue settings are per-profile, so you can tune different behaviour (or disable it entirely) on different profiles.
2. **A switch**: assign the **RESCUE** box to an AUX channel on the [Modes tab](/docs/configurator/tabs/modes.md#rescue). Rescue only runs while that switch is active.

While the RESCUE switch is on, arming is blocked (arming disable flag `RESCUE_SW`) — you can't take off straight into Rescue. If the switch is toggled on mid-flight, Rescue activates immediately; toggling it back off hands control back to you (see [Exit](#5-exit--back-to-the-pilot) below).

## Rescue mode = CLIMB[​](#rescue-mode--climb "Direct link to Rescue mode = CLIMB")

`rescue_mode` controls whether Rescue is active, and which behaviour it uses once it reaches the Climb stage:

* **OFF** — Rescue disabled.
* **CLIMB** — the recommended mode, and the one to actually set up and test. Pull-up, Climb and Hover Collective are fixed values you choose yourself; Rescue never tries to hold a precise height, it just climbs on a set collective for a set time and then holds a steady hover collective.

There's a third value, **ALT\_HOLD**, that adds a barometer/GPS altitude-hold loop on top of this — see [Rescue mode = Altitude Hold](#rescue-mode--altitude-hold) near the end of this page if you want to experiment with it. It isn't the recommended starting point.

## The rescue sequence[​](#the-rescue-sequence "Direct link to The rescue sequence")

Internally Rescue moves through a straight sequence of stages. Every stage keeps running its own logic every control loop, moving on to the next once its own condition is met:

<!-- -->

Flipping the switch off drops straight to Exit from Pull-up, Climb or Hover — but not instantly from Flip, which has its own rule (see below). The stage-by-stage breakdown covers each one, including the exact condition Pull-up checks before moving on.

### 1. Pull-up[​](#1-pull-up "Direct link to 1. Pull-up")

The instant Rescue activates, the helicopter immediately starts leveling (roll and pitch only — **yaw stick does nothing in this state**) and applies **Pull-up Collective**. Nothing else happens in this stage — no flipping, just leveling and collective. This runs for **Pull-up Time**, after which Rotorflight checks whether the craft is close enough to level (within 30°):

* If level and still inverted, and *Flip to upright* is set to **Flip** → go to **Flip**.
* If level and upright (or *Flip to upright* is **No-Flip**) → go straight to **Climb**.
* If **not** level by the time Pull-up Time has elapsed → Rescue gives up and goes to **Exit**, handing control back. If your helicopter needs longer to recover from a bad attitude, increase Pull-up Time rather than the gains — it's a timer, not a target.

Pull-up levelling strength is set by **Flip-to-Upright Gain**, not Leveling Gain (see [Gains](#which-gain-applies-when) below).

### 2. Flip (only if needed)[​](#2-flip-only-if-needed "Direct link to 2. Flip (only if needed)")

A separate stage, entered only when Pull-up finishes still inverted with *Flip to upright* enabled — Climb itself has no flip logic. It drives roll/pitch to roll the helicopter the short way to upright (still no yaw authority), continuing to apply Pull-up Collective. This is bounded by **Flip Fail Time**:

* Completes (within \~18° of upright) → go to **Climb**, or to **Exit** if the switch was turned off while it was finishing up.
* Fail Time expires first: if the craft happens to be level anyway → go to **Climb**; otherwise → **Exit** (abort).

note

Flip is the one stage that doesn't check the switch on every cycle. Turning Rescue off mid-flip doesn't cancel it immediately — the helicopter keeps trying to roll upright until it either completes or Flip Fail Time runs out, and only then does it hand back control. This is deliberate: handing back control partway through a flip would leave you in an unpredictable attitude.

### 3. Climb[​](#3-climb "Direct link to 3. Climb")

Collective is applied to gain height, and **you get roll and pitch authority back** — Rescue now self-levels like Angle mode (blending your stick with a leveling correction) rather than flying open-loop. Yaw is fully yours throughout Climb and Hover.

* **CLIMB mode**: applies **Climb Collective** for **Climb Time**, then moves to Hover regardless of altitude.
* **ALT\_HOLD mode**: runs the altitude-hold PID toward **Hover Altitude** instead of a fixed collective value, and moves on to Hover either when within 0.5m of that target or when Climb Time expires — whichever comes first, so Climb Time acts as a safety cap rather than a fixed duration. See [Rescue mode = Altitude Hold](#rescue-mode--altitude-hold) for how well this actually works today.

### 4. Hover[​](#4-hover "Direct link to 4. Hover")

The helicopter holds its height — **Hover Collective** in CLIMB mode, or the altitude-hold PID targeting **Hover Altitude** in ALT\_HOLD mode — while you fly roll, pitch and yaw with self-leveling assistance, for as long as the RESCUE switch stays on.

### 5. Exit — back to the pilot[​](#5-exit--back-to-the-pilot "Direct link to 5. Exit — back to the pilot")

When the switch is turned off (from any state), Rescue doesn't let go abruptly. It holds its last commanded roll/pitch/collective and blends it toward your actual stick positions over **Exit Time**, so you don't get a sudden jolt — useful if collective or cyclic trim would otherwise be very different from where Rescue left them (particularly if you were flying inverted and it has flipped to upright). If the switch is flicked back on during Exit, Rescue restarts from Pull-up.

### Which gain applies when[​](#which-gain-applies-when "Direct link to Which gain applies when")

| Stage         | Control used                                     | Gain                     | Pilot authority                                                |
| ------------- | ------------------------------------------------ | ------------------------ | -------------------------------------------------------------- |
| Pull-up, Flip | Open-loop leveling to 0° (or 180° when flipping) | **Flip-to-Upright Gain** | None on roll/pitch/collective; yaw locked to zero              |
| Climb, Hover  | Angle-mode-style self-leveling                   | **Leveling Gain**        | Full yaw; roll/pitch blended with Rescue's leveling correction |

A tilt-compensation factor (proportional to `cos(tilt)²`, signed) is applied to whatever collective value Rescue is commanding at every stage. This is why collective authority fades out as the helicopter rolls toward knife-edge or inverted, instead of fighting the collective the wrong way.

## Settings reference[​](#settings-reference "Direct link to Settings reference")

All Rescue settings are per-PID-profile. The ranges and defaults below are the firmware defaults; CLI names are shown for `diff`/`dump` output. These apply regardless of `rescue_mode` — Pull-up, Climb and Hover Collective (and Flip, which reuses Pull-up Collective) are used in both CLIMB and ALT\_HOLD. The Altitude Hold-only parameters are listed separately in [Rescue mode = Altitude Hold](#rescue-mode--altitude-hold).

| Configurator label                | CLI parameter               | Range                        | Default |
| --------------------------------- | --------------------------- | ---------------------------- | ------- |
| Enable Rescue                     | `rescue_mode`               | `OFF` / `CLIMB` / `ALT_HOLD` | `OFF`   |
| Flip to upright                   | `rescue_flip`               | `OFF` / `ON`                 | `ON`    |
| Pull-up Collective \[%]           | `rescue_pull_up_collective` | 0–100.0                      | 65.0    |
| Pull-up Time \[s]                 | `rescue_pull_up_time`       | 0–25.0                       | 0.3     |
| Climb Collective \[%]             | `rescue_climb_collective`   | 0–100.0                      | 45.0    |
| Climb Time \[s]                   | `rescue_climb_time`         | 0–25.0                       | 1.0     |
| Hover Collective \[%]             | `rescue_hover_collective`   | 0–100.0                      | 35.0    |
| Flip Fail Time \[s]               | `rescue_flip_time`          | 0–25.0                       | 2.0     |
| Exit Time \[s]                    | `rescue_exit_time`          | 0–25.0                       | 0.5     |
| Leveling Gain                     | `rescue_level_gain`         | 5–250                        | 100     |
| Flip-to-Upright Gain              | `rescue_flip_gain`          | 5–250                        | 200     |
| Max Levelling Rate \[°/s]         | `rescue_max_sp_rate`        | 5–1000                       | 300     |
| Max Leveling Acceleration \[°/s²] | `rescue_max_sp_accel`       | 1–10000                      | 3000    |

## Tuning walkthrough[​](#tuning-walkthrough "Direct link to Tuning walkthrough")

Tune in this order, re-testing after each step:

1. **Collective values first, on the ground or in a low hover.** Set Pull-up, Climb and Hover Collective to values appropriate for your helicopter's weight and head speed — Hover Collective should be close to what it actually takes to hover. Get these right before touching anything else; every other setting assumes the collective values are sane.
2. **Pull-up and Climb Time.** Long enough that the helicopter visibly levels and climbs, short enough that it doesn't balloon upward. If Rescue keeps aborting to Exit right after activating, Pull-up Time is probably too short for your gains/collective combination.
3. **Leveling Gain and Flip-to-Upright Gain.** Increase from the defaults if the helicopter responds sluggishly during recovery; too high causes wobble or overshoot on the way to level. Remember Flip-to-Upright Gain governs Pull-up as well as Flip.
4. **Max Rate / Max Acceleration.** Lower these for larger, heavier helicopters that can't snap to level as fast as a small one without overstressing the mechanics.
5. **Flip Fail Time and Exit Time.** Flip Fail Time should comfortably cover how long a flip actually takes at your Flip-to-Upright Gain. Exit Time is a smoothness knob — increase it if handback after Rescue feels abrupt.

That's a complete CLIMB-mode setup. If you want to experiment further with Altitude Hold, its own tuning notes are in [Rescue mode = Altitude Hold](#rescue-mode--altitude-hold).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

* **Rescue immediately bails to Exit.** The helicopter didn't level within Pull-up Time (or Flip Fail Time). Increase the relevant time, or increase Flip-to-Upright Gain if it's visibly leveling too slowly.
* **Yaw doesn't respond right after activating Rescue.** Expected — yaw is locked during Pull-up and Flip. It comes back as soon as Rescue reaches Climb.
* **Arming is blocked and the Status tab shows `RESCUE_SW`.** The RESCUE switch is currently active. Move it to the disarmed position before arming — Rescue is not meant to be engaged from the ground.
* **Handback feels abrupt when disabling Rescue.** Increase Exit Time.
* **Altitude Hold won't hold a sensible height.** See [Known issues with Altitude Hold](#known-issues-with-altitude-hold) in [Rescue mode = Altitude Hold](#rescue-mode--altitude-hold) — this is a known weak point, not necessarily a configuration mistake.

## Rescue mode = Altitude Hold[​](#rescue-mode--altitude-hold "Direct link to Rescue mode = Altitude Hold")

Experimental — don't rely on this yet

Altitude Hold is new, and in practice it has **not been reliably tuned to hold a stable height** — expect drift, overshoot, or oscillation around the target even after careful tuning, on top of whatever error the altitude source itself contributes. **CLIMB mode is the one to actually rely on** for real flying; treat everything in this section as a description of what the code is *trying* to do, from reading the firmware source, not a proven tuning recipe.

One working theory for why: a single main rotor pushes a much more concentrated column of downwash directly over the fuselage than a quad's four smaller, more spread-out rotors do — and most boards mount the barometer right in that airflow. That can disturb the pressure reading in ways PID tuning on the altitude-hold loop can't fix, particularly while collective is actively changing (pull-up, climb). This altitude-hold approach is proven on multi-rotor drones in Betaflight; it may simply be fighting a noisier sensor environment on a helicopter. Unconfirmed, but worth keeping in mind if more P/I/D doesn't help.

If you experiment with this, do it at a safe altitude expecting it may not settle, and treat any result — success or failure — as useful feedback for the project.

### Enabling it[​](#enabling-it-1 "Direct link to Enabling it")

Set `rescue_mode = ALT_HOLD` from the CLI (`set rescue_mode = ALT_HOLD`, then `save`). The Configurator's *Enable Altitude Hold* toggle on the Rescue Settings panel only appears once the FC already reports this — it's deliberately not exposed as a normal UI path, reflecting its experimental status.

### Altitude source[​](#altitude-source "Direct link to Altitude source")

Altitude Hold needs a usable altitude source. `position_alt_source` controls where it comes from: `DEFAULT`, `BARO_ONLY`, or `GPS_ONLY`.

* With a **barometer** (enable it on the [Configuration tab](/docs/configurator/tabs/configuration.md#barometer)) and `position_alt_source = DEFAULT` (the default), baro *is* the altitude and climb-rate reading — fast and low-noise. If GPS is also present and fixed, it isn't blended into that reading; it's only used to slowly re-anchor baro's offset against long-term drift while armed.
* **GPS can be the altitude source** — either set `GPS_ONLY`, or just fly a board with no barometer at all; GPS altitude is used directly once it's available.
* Either way, GPS altitude only counts once `feature GPS` is on, a module is wired up and detected, there's a 3D fix, and the satellite count is at least `position_gps_min_sats` (default **12**).
* GPS altitude is coarse next to baro — typically several metres of vertical error and slow to settle — so treat it as a "something is better than nothing" fallback, not a substitute for a barometer if you actually want a clean hold at a specific height.
* With no altitude source at all, altitude reads as zero and the altitude-hold PID has nothing useful to hold.

### The altitude-hold PID[​](#the-altitude-hold-pid "Direct link to The altitude-hold PID")

When `rescue_mode = ALT_HOLD`, Climb and Hover run a dedicated altitude PID (separate from the main flight PID loop):

* **Altitude P-Gain** — proportional response to height error.
* **Altitude I-Gain** — accumulates to hold against steady effects like wind or a slightly-off hover collective. On entering Climb, the I-term is seeded with your **Hover Collective** value so it doesn't have to wind up from zero.
* **Altitude D-Gain** — damps using vertical speed (vario), i.e. acts against climb/descent rate rather than height error.
* **Maximum Collective** — caps how much collective the altitude PID is allowed to command on the high side. It does not limit how far collective is allowed to drop, only the ceiling.

### Settings[​](#settings "Direct link to Settings")

| Configurator label      | CLI parameter                                           | Range     | Default |
| ----------------------- | ------------------------------------------------------- | --------- | ------- |
| Enable Altitude Hold    | *(sets `rescue_mode` to `ALT_HOLD` instead of `CLIMB`)* | —         | —       |
| Hover Altitude \[m]     | `rescue_hover_altitude`                                 | 0–100.0   | 5.0     |
| Altitude P-Gain         | `rescue_alt_p_gain`                                     | 0–10000   | 20      |
| Altitude I-Gain         | `rescue_alt_i_gain`                                     | 0–10000   | 20      |
| Altitude D-Gain         | `rescue_alt_d_gain`                                     | 0–10000   | 10      |
| Maximum Collective \[%] | `rescue_max_collective`                                 | 0.1–100.0 | 50.0    |

### Tuning notes[​](#tuning-notes "Direct link to Tuning notes")

Confirm the altitude source reads sensibly and stationary on the ground first (check **Status** or a Blackbox log), then try the default P/I/D and nudge them the way you would any altitude controller — more P for a sluggish response, more D if it oscillates around the target, I to remove a steady-state offset. Don't be surprised if it still doesn't settle cleanly; that matches our own experience so far. If you get it holding well, or find a combination that clearly doesn't work, that's worth reporting back to the project.

### Known issues with Altitude Hold[​](#known-issues-with-altitude-hold "Direct link to Known issues with Altitude Hold")

First rule out the basics: a barometer detected and enabled, and `position_alt_source` not pointed at a source you don't actually have (e.g. `GPS_ONLY` without a GPS fix). Beyond that, drift or oscillation around the target height is a known, currently-unresolved weak point of this mode — possibly the rotor-downwash effect on the barometer described above — rather than always a configuration mistake. CLIMB mode doesn't have this problem since it never tries to hold a precise height.

## Related pages[​](#related-pages "Direct link to Related pages")

* [Profiles tab — Rescue Settings](/docs/configurator/tabs/profiles.md#rescue-settings) — where these settings live in the Configurator.
* [Modes tab — RESCUE](/docs/configurator/tabs/modes.md#rescue) — assigning the switch.
* [Arming](/docs/setup/arming.md) — the `RESCUE_SW` arming-disable flag.
* [Using stability modes](/docs/setup/using-stability-modes-example.md) — Rescue's leveling shares the same accelerometer trims as Angle/Horizon mode; trim those first.
