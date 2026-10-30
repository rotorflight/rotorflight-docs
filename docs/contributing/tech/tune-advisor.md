# Tune Advisor Internals

How the Tune Advisor works, end to end: what the flight controller measures,
how the radio stores and combines it, the exact rules that produce the advice,
and exactly which parameters **Save** writes. For using it, see
[Tune Advisor](../../radio/ethos/tune-advisor.md).

The work is split in two:

| Side | Does | Source |
| --- | --- | --- |
| Flight controller | Measures how the heli answers the rate loop and reports the numbers over MSP. Gives no advice and changes no settings. | `src/main/flight/tune_advisor.c`, `MSP2_GET_TUNE_ADVISOR` in `src/main/msp/msp.c` (rotorflight-firmware) |
| Radio (Ethos Lua suite) | Reads the numbers after each flight, keeps the last 5 flights, works out the advice, and writes it to the flight controller when the pilot presses **Save**. | `tasks/tune_history.lua`, `lib/tune_history.lua`, `lib/msp_tune_advisor.lua`, `app/pages/tune_advisor.lua` (rotorflight-lua-ethos-suite) |

The advice rules live on the radio so they can change without flashing the
flight controller.

## Firmware: what is measured

The feature is built when `USE_TUNE_ADVISOR` is defined (on by default in
`common_pre.h`). `tuneAdvisorUpdate()` runs every PID loop, straight after
`pidController()`.

### Sampling

PID loops are averaged into one **sample every 10 ms** (100 Hz). Each sample
holds, per axis (roll, pitch, yaw):

| Value | Taken from |
| --- | --- |
| Setpoint (deg/s) | The PID controller's setpoint |
| Gyro (deg/s) | The PID controller's gyro rate |
| I-term | The PID controller's I output |
| Feedback | P + I + D + B output: the PID sum minus F and the offset (O). F and collective-to-pitch precomp are left out so they do not count as braking. |
| Stick deflection | -1 to 1 |
| Saturated | Set if the mixer saturated that axis in any loop of the block |

plus |collective| (0 to 1) from the stabilised collective mixer input.

### Which samples count

A sample is **valid** only if, in every PID loop of its block:

- the heli is armed, spooled up (governor) and airborne, and
- none of Angle, Horizon, Trainer, Altitude hold, Rescue, GPS rescue or
  failsafe is active.

On top of that, the body must have been rotating: |roll| + |pitch| + |yaw|
rate of at least **40 deg/s** within the last **200 samples (2 s)**. Yaw
counts, so a pirouette is flying. This keeps spooled-up stick checks on the
ground out.

Invalid samples are not used for anything below. The reported flight time is
the number of valid samples / 100, in seconds.

### Response (feed-forward match)

F sends the setpoint straight to the servos, so the ratio gyro / setpoint
says how well F fits the airframe: 1.0 means the heli flies the rate it is
asked for; above 1 it turns faster than asked (F too high for the rates).

The heli answers late, so the setpoint is compared **delayed by 0 to 25
samples (0 to 250 ms)**. For each delay the firmware keeps three running sums
over usable pairs: Σ setpoint·gyro, Σ setpoint², Σ gyro². A pair is usable
when:

- the current sample is valid and the axis is not saturated now, and
- the delayed setpoint came from a valid, unsaturated sample with
  40 ≤ |setpoint| < 200 deg/s.

From these, for each delay:

- **gain** = Σ setpoint·gyro / Σ setpoint² (least-squares slope through zero)
- **correlation** = Σ setpoint·gyro / √(Σ setpoint² · Σ gyro²)

Once a second the delay with the **highest correlation** becomes the best
lag. The reported `ffGain`, `ffCorr` and `ffCount` are those of the best lag,
and `ffLagMs` is the lag × 10 ms.

At the best lag the same ratio is also split into bands:

| Bands | Split by | Edges |
| --- | --- | --- |
| Setpoint bands | Size of the request, \|setpoint\| | 40–100, 100–200, 200+ deg/s |
| Collective bands | \|collective\| | below 25%, 25–50%, 50% and above (only requests below 200 deg/s) |

### Full stick

A sample counts as full stick when the stick deflection one best-lag ago was
at least **90%**. For those samples the firmware counts how many there were
(`fullCount`) and how many were saturated (`fullSatCount`), and keeps the rate
reached in the stick's direction against the rate asked:

- `fullRatio` = Σ rate reached / Σ |setpoint|
- `fullMaxRate` = the highest rate reached (deg/s)

Saturated samples are included here: this is what tells the radio the cyclic
ran out of travel.

### Stops (stick releases)

Per axis, a small state machine follows each stick input:

1. **Input**: starts when |setpoint| leaves the centre band (5 deg/s). While
   the stick is out, the setpoint and gyro extremes are kept.
2. **Release**: when the setpoint returns inside 5 deg/s. The direction of the
   input is the side with the larger setpoint peak. At that moment the I-term
   is recorded, signed so that positive means opposing the input that just
   ended.
3. **Watch**: for the next **80 samples (0.8 s)**, the largest rate in the
   opposite direction is the **rebound**, and the largest opposite feedback
   output is the **counter-output**. The rate peak in the input direction keeps
   updating for the first 10 samples, as the heli coasts.
4. The release counts only if the input asked for at least **60 deg/s** and the
   heli reached at least **60 deg/s**. If the stick moves out again within 15
   samples (0.15 s), it is not a stop and is dropped; after that, a new input
   ends the watch early and the release still counts.

For each counted release the firmware adds up:

| Value | Meaning |
| --- | --- |
| `releases` | Number of counted releases |
| `bigRebounds` | Releases with a rebound of 15% of the peak rate or more |
| `meanRebound` | Mean of rebound / peak rate |
| `meanOvershoot` | Mean of peak rate / peak setpoint |
| `meanCounter` | Mean peak counter-output (P + I + D + B) after the release |
| `meanIterm` | Mean I-term at the release, positive = pushing back against the input |

A small counter-output with the I-term near zero points at the airframe
rebounding on its own (not enough damping). A positive I-term points at the
I-term pushing the heli back.

### Shake (stick centred)

An oscillating loop (usually P too high) also leaves an opposite-sign peak
after every stop, so on its own it reads as rebound. The shake figure tells
the two apart. Per axis, on valid samples only:

- The gyro is high-passed at **2 Hz** (first order at 100 Hz, k = 0.118), so
  slow drift is left out.
- A sample counts while |setpoint| is inside the centre band (5 deg/s) and
  the stick has been centred for at least **30 samples (0.3 s)**, so the stop
  has settled.
- `shakeCount` is the number of samples counted and `shakeRms` the RMS of the
  high-passed gyro over them, in deg/s.

A tuned heli holds a few deg/s there; an oscillating one tens.

### Accumulation and reset

Everything accumulates in RAM across flights until it is reset. It is **not**
saved and is lost at power-off. It is reset when:

- `MSP2_CLEAR_TUNE_ADVISOR` is received (the radio sends it after saving each
  flight), or
- the heli arms on a **different tune**. At each arm the firmware hashes the
  current PID and rate profile numbers, every PID gain (P, I, D, F, B, O) of
  the PID profile, Iterm Relax Cutoff, PID mode, rate type, and the RC rates,
  expo and super rates of all axes. If the hash differs from the previous arm,
  the statistics start again.

The tune is only checked at arming. A setting changed in flight (for example
by an adjustment function) is not noticed until the next arm.

## MSP interface

| Command | ID | Direction | Payload |
| --- | --- | --- | --- |
| `MSP2_GET_TUNE_ADVISOR` | `0x5F10` | Read | Request: `U8` axis (0 roll, 1 pitch, 2 yaw). Any other length or axis is an error. |
| `MSP2_CLEAR_TUNE_ADVISOR` | `0x5F11` | Write | Empty. Resets all statistics. |

One axis per request. The reply is 52 bytes: the most one CRSF frame carries
after the 6-byte MSP header, and 12 S.Port/FBUS frames. Firmware without the
feature answers with an MSP error.

Reply, payload version 3. Each value takes as few bytes as the advice needs:
a scaled value is stored as value × scale and saturates at its byte's range;
counts saturate at 65535; all values little-endian.

| Offset | Type | Field |
| --- | --- | --- |
| 0 | U8 | Payload version (3) |
| 1 | U8 | Flags: bits 0–1 axis, bit 2 collecting now (1 = the current sample is valid), bits 3–5 rate type (current rate profile) |
| 2 | U16 | Seconds of valid flight |
| 4 | U32 | P, F and B gains (current PID profile), 10 bits each: P in bits 0–9, F in 10–19, B in 20–29 |
| 8 | U8 | Iterm Relax Cutoff for this axis |
| 9 | U8 | RC rate for this axis (raw) |
| 10 | U8 | Super rate for this axis (raw) |
| 11 | U16 | `ffCount` |
| 13 | U8 | `ffGain` × 64 (0–3.98) |
| 14 | S8 | `ffCorr` × 100 |
| 15 | U8 | `ffLagMs` |
| 16 | 3 × (U8, U16) | Setpoint bands 40–100, 100–200, 200+: gain × 64, count |
| 25 | 3 × (U8, U16) | Collective bands <25%, 25–50%, 50%+: gain × 64, count |
| 34 | U16 | `fullCount` |
| 36 | U16 | `fullSatCount` |
| 38 | U8 | `fullRatio` × 100 |
| 39 | U8 | `fullMaxRate` in steps of 10 deg/s |
| 40 | U16 | `releases` |
| 42 | U16 | `bigRebounds` |
| 44 | U8 | `meanRebound` × 100 |
| 45 | U8 | `meanOvershoot` × 64 |
| 46 | U8 | `meanCounter` × 100 |
| 47 | S16 | `meanIterm` × 1000 (16-bit: it needs both the range and the 0.01s) |
| 49 | U16 | `shakeCount` |
| 51 | U8 | `shakeRms` × 4 (0–63.75 deg/s) |

The tune values at offsets 1 and 4–10 are the settings the numbers belong to,
so a client can work out new values without reading the profiles first. The
radio reads version 3 only and refuses any other length or version rather
than guess at it. Versions 1 (67 bytes) and 2 (71 bytes, adding the shake
fields) stored every ratio as a signed 16-bit value × 1000 and were never in
a firmware release.

## Radio: capturing each flight

The background task captures every flight, whether or not the Tune Advisor
page is open. It only runs when the flight controller reports firmware
4.7.0 or newer (the planned first release with the feature); until the
version is known it sends nothing.

On each **disarm**:

1. Wait **5 s** (the flight-stats sync goes first).
2. Read roll, then pitch, then yaw, with **2 s** between one answer and the
   next request. Over S.Port and FBUS each reply takes about 15 telemetry
   frames, so the gaps keep sensors updating.
3. If a read fails, ask again for that axis only after **5 s**; axes already
   read are kept. Each read is sent at most 3 times. After **3** link errors
   the capture stops until the next disarm. The flight controller still holds
   the numbers, so that disarm saves them.
4. If the three replies report different flight times, the flight controller
   restarted or flew between reads, and the capture starts again.
5. Save the three axes as one flight, unless the flight time is 0 (no valid
   flight) or the same as the last flight saved for this model (the previous
   clear never arrived and nothing new was flown).
6. Send `MSP2_CLEAR_TUNE_ADVISOR`, so the next flight is measured on its own.

Arming during a capture abandons it. The flight controller was not cleared,
so on the same tune the next disarm saves both flights as one; on a changed
tune the firmware resets at arming and the earlier flight is lost. A disarm
during a link loss is captured on reconnect, as long
as the flight controller was not powered off.

### Files on the radio

All under `LOGS:/rfsuite/tune/<mcuId>/`, where `<mcuId>` is the flight
controller's ID (the same one that names the flight log folders):

| File | Contents |
| --- | --- |
| `history.csv` | One row per axis per flight, newest last. Only the last **5 flights** are kept. Columns: `date`, `flight_seconds`, `axis`, then every reply field in the order above (`p`, `f`, `b`, `relax_cutoff`, `rates_type`, `rc_rate`, `s_rate`, `ff_count`, …, `mean_iterm`, `shake_count`, `shake_rms`). A file with a different header is started again. |
| `logs.ini` | The model name. |
| `changes.csv` | Every value **Save** wrote: `date,axis,setting,from,to`, raw values as the flight controller stores them. Appended, never trimmed, never erased by the page. |

### Combining flights

For each axis separately, the page starts from the newest flight and goes
back up to 5 flights, stopping at the first flight whose **tune** on that axis
differs from the newest one. The tune is: P, F, B, Iterm Relax Cutoff, rate
type, RC rate and super rate for that axis.

- Counts are added (`ffCount`, band counts, `fullCount`, `fullSatCount`,
  `releases`, `bigRebounds`, seconds).
- `ffGain`, `ffCorr` and `ffLagMs` are averaged weighted by `ffCount`; each
  band's gain by its count; `fullRatio` by `fullCount`; the four stop means by
  `releases`.
- `fullMaxRate` is the highest of the flights.
- `shakeCount` is added; `shakeRms` combines exactly, as the square root of
  the mean of the squares weighted by `shakeCount`.

The firmware's gains are weighted by setpoint² within a flight, so the
combined response is a close estimate. The stop figures combine exactly.

## Radio: the advice rules

All rules work per axis, on the combined numbers. At most **3 changes** and 3
reasons are shown; a change and its reason are added together or not at all.

A change is never clamped into the setting's range. If a new value would fall
outside what the flight controller accepts, that change is not suggested, nor
any change tied to it (F and its rates go together or not at all), and the
reasons say "The change needed goes past a setting's limit" once.

### Thresholds

| Name | Value | Used for |
| --- | --- | --- |
| Response data needed | `ffCount` ≥ 1000 (10 s) | Judging the response at all |
| Consistent enough | `ffCorr` ≥ 0.85 | Judging the response at all |
| Too fast / too slow | `ffGain` > 1.15 / < 0.85 | F and rate change |
| F step limit | ±20% per step | F change |
| Full stick data needed | `fullCount` ≥ 100 | Full-stick rate change |
| Cyclic at its limit | `fullSatCount` ≥ 50% of `fullCount` | Full-stick rate change |
| Rate not reached | `fullMaxRate` < 80% of the rate asked | Full-stick rate change |
| Full-stick step limit | −20% per step | Full-stick rate change |
| Stops needed | `releases` ≥ 10 | Judging stops at all |
| Bounce too big | `meanRebound` ≥ 0.12 | Stop changes |
| Shaking | `shakeCount` ≥ 500 (5 s) and `shakeRms` ≥ 15 deg/s | P down; no other change on the axis |
| I-term pushing back | `meanIterm` ≥ 0.03 | Iterm Relax Cutoff change |
| P raise limit | 1.5 × the pilot's own P | P change |
| Collective fact | both outer bands ≥ 300 samples, spread ≥ 25% | Information only |

### Shake

Checked first. When the axis is shaking, *Stops* shows "Shaking N deg/s" and
the only change for the axis is less P: with P > 1 and room for a change,
new P = min(round(P / 1.2), P − 1), at least 1, with the reason "Shakes N
deg/s at centre stick. Less P calms it." The response figure is still shown,
but no F, rate or stop change is given: an oscillation reads as bounce-back
after every stop and spoils the F match, so those rules would ask for more P.

### Response

Checked in this order:

1. `ffCount` < 1000: **Needs more flying** (shown as a percentage of 1000).
   The page asks for rolls, flips or pirouettes. No change.
2. `ffCorr` < 0.85: **Too uneven to judge**. No change.
3. `ffGain` above 1.15 or below 0.85, F > 0 and the axis not shaking: change
   **F and the rates together**:
    - new F = round(F × clamp(1 / `ffGain`, 0.8, 1.2))
    - rate factor k = old F / new F
    - each rate value that scales the curve linearly (table below) becomes
      round(raw × k)

    If new F is outside 1–1000 or a new rate value outside its range (RC rate
    1–255, super rate 0–255), neither F nor the rates are suggested.

    F × rate is what the pilot feels at the stick, so it stays the same; the
    setpoint now matches what the heli does. With F = 0 on the axis (common on
    yaw) there is no F advice: the PID gains set the response.
4. Otherwise the response matches. Then, on **roll and pitch only** and not
   shaking, if the full-stick conditions above all hold, the rates are scaled by
   k = max(`fullMaxRate` / rate asked, 0.8): toward what the heli can reach,
   at most 20% per step. A scaled value outside its range means no rate
   change.

Rate values scaled, by rate type:

| Rate type | Values scaled | Max rate asked at full stick |
| --- | --- | --- |
| Actual | RC rate (centre sensitivity) and super rate (max rate) | max(RC rate, super rate) × 10 deg/s |
| Quick | RC rate and super rate (max rate) | max(super rate × 10, RC rate × 2) deg/s |
| Rotorflight | RC rate only (super rate is the curve shape) | RC rate × 5 deg/s |
| Betaflight, Raceflight, KISS, None | None: the page shows "all rates about N% higher/lower" | Not known: no full-stick advice |

For the last group the curve cannot be scaled exactly, so the rate change is
shown as a percentage only and **not** written. The F change that goes with
it is not written either, because F alone would change the stick feel.

### Stops

When the axis is shaking, see *Shake* above instead.

1. `releases` < 10: **Needs more stops**. No change.
2. `meanRebound` < 0.12: shown as the bounce-back percentage. No change.
3. `meanRebound` ≥ 0.12, first matching case:
    - I-term pushing back (`meanIterm` ≥ 0.03) and Iterm Relax Cutoff > 1, and
      room for a change: new cutoff = min(round(cutoff × 0.8), cutoff − 1),
      given only if it is within 1–100. A lower cutoff relaxes the I-term
      more.
    - The response is still off (step 3 above applies) and F > 0: reason only,
      "fix F first". Left out when F was held back by a limit.
    - Otherwise, with room for a change: new P = max(round(P × 1.2), P + 1).
      It is given only if it is at most 1000 and at most 1.5 × the pilot's own
      P (rounded down). The pilot's own P is the current P followed back
      through `changes.csv` while each P change there ended at the value the
      next one started from; a P set by hand breaks the chain and becomes the
      pilot's own. Past 1.5 × the reason is "P is already N% above your
      setting. Check the mechanics."; past 1000 it is "The change needed goes
      past a setting's limit". The shake rule's P reductions are part of that
      chain too. The page also mentions B as an alternative but
      never changes B.

### Collective fact

If the response is judged and both the low and high collective bands have at
least 300 samples, the larger band gain / smaller band gain is computed. At
1.25 or more the page adds a reason such as "It turns 30% faster at high
collective than at low". This is information only and is the first reason
dropped when there is no room.

## Radio: what Save writes

**Save** writes the changes for the **axis on screen only**. These are the
only parameters it can ever change:

| Setting (as the page names it) | CLI parameter | MSP message, field | Accepted range |
| --- | --- | --- | --- |
| PIDs > *axis* > P | `roll_p_gain`, `pitch_p_gain`, `yaw_p_gain` | `MSP_SET_PID_TUNING` (202), `<axis>_p` | 0–1000 |
| PIDs > *axis* > F | `roll_f_gain`, `pitch_f_gain`, `yaw_f_gain` | `MSP_SET_PID_TUNING` (202), `<axis>_f` | 0–1000 |
| Advanced > PID Controller > Iterm Relax Cutoff > *axis* | `iterm_relax_cutoff` (one value per axis) | `MSP_SET_PID_PROFILE` (95), `iterm_relax_cutoff_<0-2>` | 1–100 |
| Rates > *axis* > RC rate / centre sensitivity | `roll_rc_rate`, `pitch_rc_rate`, `yaw_rc_rate` | `MSP_SET_RC_TUNING` (204), `rcRates_<1-3>` | 1–255 |
| Rates > *axis* > Rate / max rate | `roll_srate`, `pitch_srate`, `yaw_srate` | `MSP_SET_RC_TUNING` (204), `rates_<1-3>` | 0–255 |

All of them belong to the **active** PID or rate profile. Save never changes
I, D, B, O, expo, rate type, collective rates, filters, governor or any other
setting, and never touches another axis or profile.

### The write sequence

1. **Confirm.** The dialog lists every change exactly as the page shows it.
2. **Read** `MSP_PID_TUNING` (112), `MSP_PID_PROFILE` (94) and
   `MSP_RC_TUNING` (111). A failed read, or a reply too short to hold every
   field, stops here with nothing changed.
3. **Check**, and stop with nothing changed if any of these fail:
    - the heli is disarmed;
    - the active PID and rate profile are the same as when Save was pressed;
    - P, F, B, Iterm Relax Cutoff, rate type, RC rate and super rate on that
      axis are exactly the values of the newest flight the advice came from
      (so a hand edit, a profile switch or advice already applied stops it);
    - every value about to change still holds its expected old value, and
      every new value is in range.
4. **Write** only the messages that contain a change, in the order PID tuning,
   PID profile, RC tuning. Each is a full-message write: every other field is
   sent back exactly as it was read in step 2.
5. **Save** with `MSP_EEPROM_WRITE` (250).
6. **Verify**: read all three messages again and check each changed field
   holds its new value.
7. Append each change to `changes.csv`.

If a write fails, nothing has been saved to EEPROM, and restarting the flight
controller undoes any part already sent. If the EEPROM save fails, the
changes are active until the next restart.

The saved flights are kept. Because the tune changed, the next flight starts
a new combination on the page, and the firmware resets its statistics when
it next arms.

## Clearing

The page's clear button deletes `history.csv` for the model and, when the
firmware supports it, sends `MSP2_CLEAR_TUNE_ADVISOR`. `changes.csv` and
`logs.ini` are kept.
