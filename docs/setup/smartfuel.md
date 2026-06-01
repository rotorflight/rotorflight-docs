---
sidebar_position: 95
---

# SmartFuel

:::info
SmartFuel is Rotorflight's smarter battery gauge. At plug-in, it uses pack
voltage to estimate the starting fuel level, so the telemetry reflects the
pack's actual state instead of assuming every battery is full.

SmartFuel can calculate fuel from voltage alone, which is useful when no
current sensor is fitted. If a current sensor is available, it can also track
mAh used, or use combined mode to compare both estimates and report the more
conservative value.
:::

## Why SmartFuel?

A standard battery percentage is calculated directly from voltage using a straight line between your minimum and maximum cell voltages. This works at rest, but helicopters are hard on batteries. A hard collective input can drop cell voltage by 0.3 V or more for a fraction of a second — enough to make a simple estimator cry "low battery" even when the pack has plenty left.

SmartFuel fixes this by:

- **Starting from an honest baseline** — on plug-in, SmartFuel reads the pack voltage and sets the initial percentage from that, rather than always assuming 100%. If you plug in a partially used pack, the gauge starts at the right place.
- **Compensating for sag** — while airborne, it accounts for the load on the rotor so a punch doesn't trigger a false warning
- **Only ever counting down** — the displayed percentage never rises during a flight, so you always see the worst case seen so far
- **Optionally tracking actual consumption** — if you have a current sensor, SmartFuel can blend in real mAh usage for extra accuracy

The result is a cleaner, calmer fuel gauge on your radio that you can actually trust.

## Requirements

SmartFuel always needs a battery voltage source and a known cell count. Cell
count can be detected automatically or set in the Power tab.

- **VOLTAGE** — a battery voltage sensor configured (Battery ADC or ESC telemetry).
- **CURRENT** — a current sensor configured and battery capacity set.
- **COMBINED** — a battery voltage sensor, current sensor, and battery capacity
  set.

## Setup

### Step 1 — Open the Power tab

Connect to your flight controller in the Rotorflight Configurator and go to the **Power** tab.

### Step 2 — Set battery capacity

If you plan to use **CURRENT** or **COMBINED** mode, enter your pack capacity under **Capacity** (e.g. `2200` for a 2200 mAh pack). This is not required for **VOLTAGE** mode.

### Step 3 — Enable SmartFuel

Scroll to the **SmartFuel** section and select a mode from the dropdown:

| Mode | What it does |
|---|---|
| **OFF** | SmartFuel disabled. Falls back to the legacy charge-level source: consumption if capacity is set, otherwise linear voltage. |
| **VOLTAGE** | Uses pack voltage with sag compensation. Works with no current sensor. Recommended starting point. |
| **CURRENT** | Seeds from voltage at plug-in, then tracks actual mAh used once capacity and consumption data are available. |
| **COMBINED** | Takes the **lower** of the voltage and current estimates at every moment once capacity and consumption data are available. |

:::tip
If your flight controller has a current sensor, **CURRENT** is the simplest and
most reliable mode. It reads pack voltage on plug-in to set the starting
percentage, then tracks actual mAh used from there. Voltage calibration still
matters for the initial anchor, but sag tuning does not affect the current-based
part of the estimate. **VOLTAGE** and the voltage side of **COMBINED** both rely
on accurate voltage calibration throughout the flight to give a good reading.
Use **VOLTAGE** only if you have no current sensor.
:::

### Step 4 — Save

Click **Save** in the Power tab. A reboot is not required.

## Tuning

The defaults are a sensible starting point. Most pilots will not need to change them. If you do want to tune:

### Voltage Drop Rate

*Default: 10 (mV per second, per cell)*

Controls how fast the voltage reading is allowed to drop. A lower value makes the estimate more stable but slower to react to genuine depletion.

- **Drops too aggressively under load** → decrease this value
- **Tracks real depletion too slowly** → increase this value

### Charge Drop Rate

*Default: 50 (= 0.50% per second)*

The maximum speed at which the voltage-based percentage can fall once the model
is armed, or has been armed during the current power cycle. This acts as a
smoothing limit on the voltage path.

- **Percentage lags too far behind real pack state** → increase this value
- **Percentage drops too hard during load spikes** → decrease this value

### Sag Gain

*Default: 40 (= up to +0.40 V per cell of sag compensation while airborne)*

How aggressively SmartFuel compensates for voltage sag under load. A higher value means the estimate is more tolerant of dips during hard maneuvers.

- **Reading feels too pessimistic under load** → increase this value
- **Reading seems too optimistic** → decrease this value

### Tuning workflow

Start with the default values and work through this process:

**1. Fly a normal flight and note the reading at landing.**
Check what SmartFuel shows when you land, then charge the pack and note how many mAh go back in. If the two roughly agree, the defaults are working well for you.

**2. Watch for dips during heavy load.**
If the percentage drops sharply every time you punch collective or pull hard cyclic, increase **Sag Gain** in steps of 5–10. If the percentage barely moves during heavy maneuvers and feels optimistic, decrease **Sag Gain**.

**3. Check whether the overall trend is too fast or too slow.**
If SmartFuel hits your warning level well before the pack is genuinely low, reduce **Charge Drop Rate**. If the reading lags behind and the pack is more depleted than SmartFuel suggests at landing, increase **Charge Drop Rate** or increase **Voltage Drop Rate**.

**4. Change one parameter at a time.**
Re-fly after each change. Small adjustments (5–10 units) are usually enough — large changes are rarely needed.

:::note
Tuning is only necessary for **VOLTAGE** mode and the voltage side of
**COMBINED** mode. **CURRENT** mode tracks actual mAh used and does not depend
on sag tuning once consumption data are available.
:::

## Radio Display

When firmware SmartFuel is enabled, it feeds the standard battery charge-level
telemetry output, so the percentage you set up on your radio will show
SmartFuel values.

### Frsky Ethos with RF Suite

RF Suite exposes two virtual sensors:

- **Smart Fuel** — the usable fuel percentage, with your configured reserve remapped to 0%. When this reads 0%, land.
- **Smart Consumption** — consumed mAh reported by the firmware, or a value
  derived by RF Suite for the current SmartFuel session.

RF Suite creates these local Ethos sensors from the real telemetry sensors sent
by the flight controller. If you use RF Suite's telemetry defaults, the required
voltage, current, consumption, and fuel/charge-level sensors are selected for
you.

:::info
RF Suite maps your reserve/consumption warning percentage to 0% on the Smart Fuel sensor. For example, if your reserve is set to 30%, a pack that is at 30% raw charge will show as 0% Smart Fuel — meaning land now. A full pack always shows 100%.
:::

### CRSF / ELRS

SmartFuel drives the **Charge Level** sensor (`0x1014`). Assign this sensor to a fuel gauge or warning on your transmitter as you would any other telemetry value.

### FrSky S.Port / FBus

SmartFuel drives the **Fuel** sensor (`0x0600`).

## Troubleshooting

**SmartFuel shows OFF even though I enabled it**
Check that a battery voltage source is configured in the Power tab. SmartFuel requires voltage to run.

**The percentage is not changing / stuck at 100%**
If using CURRENT or COMBINED mode, verify that the battery capacity is set to a non-zero value and that a current sensor is configured and returning readings.

**The percentage drops immediately on plug-in**
The initial percentage is anchored to the first voltage sample after cell count is detected. If you plug in a partially discharged pack, the starting value will reflect that — this is correct behavior.

**Percentage is stable during hover but drops too fast when loading the rotor**
Increase **Sag Gain** in small steps until the dips flatten out during aggressive maneuvers.
