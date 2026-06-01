---
sidebar_position: 95
---

# SmartFuel

:::info
SmartFuel is Rotorflight's smarter battery gauge. It estimates how much usable battery you have left by reading pack voltage at plug-in, then using the selected mode to compensate for voltage sag, track mAh used, or combine both for a more realistic percentage than a simple voltage-based reading.
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

Battery capacity and cell count must be set in the Power tab for all modes.

- **VOLTAGE** — a battery voltage sensor configured (Battery ADC or ESC telemetry).
- **CURRENT** — a current sensor configured.
- **COMBINED** — a battery voltage sensor and a current sensor configured.

## Setup

### Step 1 — Open the Power tab

Connect to your flight controller in the Rotorflight Configurator and go to the **Power** tab.

### Step 2 — Set battery capacity

If you plan to use **CURRENT** or **COMBINED** mode, enter your pack capacity under **Capacity** (e.g. `2200` for a 2200 mAh pack). This is not required for **VOLTAGE** mode.

### Step 3 — Enable SmartFuel

Scroll to the **SmartFuel** section and select a mode from the dropdown:

| Mode | What it does |
|---|---|
| **OFF** | SmartFuel disabled. Falls back to legacy voltage or consumption-based percentage. |
| **VOLTAGE** | Uses pack voltage with sag compensation. Works with no current sensor. Recommended starting point. |
| **CURRENT** | Seeds from voltage at plug-in, then tracks actual mAh used. Requires a current sensor and capacity set. |
| **COMBINED** | Takes the **lower** of the voltage and current estimates at every moment — the most conservative option. |

:::tip
If your flight controller has a current sensor, **CURRENT** is the simplest and most reliable mode. It reads the pack voltage once on plug-in to set the starting percentage, then tracks actual mAh used from there — so ongoing voltage calibration and sag tuning don't matter. **VOLTAGE** and **COMBINED** both rely on accurate voltage calibration throughout the flight to give a good reading. Use **VOLTAGE** only if you have no current sensor.
:::

### Step 4 — Save and reboot

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

The maximum speed at which the displayed percentage can fall while armed. This acts as a smoothing limit on the voltage path.

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
Tuning is only necessary for **VOLTAGE** and **COMBINED** modes. **CURRENT** mode tracks actual mAh used and does not depend on sag tuning.
:::

## Radio Display

SmartFuel feeds directly into the standard battery telemetry output, so the percentage you set up on your radio will automatically show SmartFuel values once it is enabled.

### Frsky Ethos with RF Suite

RF Suite exposes two virtual sensors:

- **Smart Fuel** — the usable fuel percentage, with your configured reserve remapped to 0%. When this reads 0%, land.
- **Smart Consumption** — the estimated mAh used since plug-in.

These appear automatically in your Ethos widget and callout settings once SmartFuel is active. No extra configuration is needed on the radio side.

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
The initial percentage is anchored to the first voltage sample after cell count is detected. If you plug in a partially discharged pack, the starting value will reflect that — this is correct behaviour.

**Percentage is stable during hover but drops too fast when loading the rotor**
Increase **Sag Gain** in small steps until the dips flatten out during aggressive maneuvers.
