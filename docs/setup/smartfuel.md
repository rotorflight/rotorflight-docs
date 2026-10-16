# SmartFuel

SmartFuel is a battery fuel gauge built for helicopters. A plain
voltage-to-percent reading jumps around in flight: it drops on every
collective pump as the pack sags, then climbs back when you unload. SmartFuel
gives a percentage that only ever goes **down**, allows for sag under load,
and can use consumed mAh as well.

It feeds the fuel reading everywhere: radio telemetry, the Lua suite
dashboards and callouts, and the LED strip.

## Setting it up

1. Set up the battery voltage source -- and, for the *Current* and
   *Combined* modes, the current source -- on the
   [Power](../configurator/tabs/power.md) tab. A voltage source is required:
   without one, SmartFuel turns itself off.
2. In the **Battery** panel, fill in the cell count (or 0 for automatic),
   capacity in mAh, and the **Full** and **Minimum** cell voltages. SmartFuel
   reads 100% at Full and 0% at Minimum.
3. Choose the **Smart Fuel Mode**:

    | Mode | Uses | Best for |
    | --- | --- | --- |
    | **Voltage** | Pack voltage, with sag compensation in flight. | No current sensor. |
    | **Current** | The starting voltage, then mAh used against the pack's capacity. | A well-calibrated current sensor. |
    | **Combined** | Whichever of the two reads lower at the moment. | The safest choice with a current sensor. |

4. Set the landing reserve in the CLI with `cbat_alert_percent`, default 35%.
   The radio scripts show 0% fuel at this level, so "empty" on the radio
   means "land now, with reserve left".

## How it behaves

- When you plug in, SmartFuel takes its starting point from the pack
  voltage, once the cell count is known.
- From then on the reading can only stay the same or fall.
- In flight, it adds back the voltage sag it expects from your collective
  and cyclic load, so pumps and punch-outs don't make it plunge.
- If you plug in a pack that isn't full, it starts from the lower reading.

## Tuning

Start with the defaults and fly. After a few flights, compare where
SmartFuel is at landing with how much charge the pack really has left (what
your charger puts back in). Change one thing at a time:

| What you see | Change |
| --- | --- |
| Drops sharply under hard load | Raise **Sag Gain**, or lower **Charge Drop Rate** |
| Too pessimistic in flight | Raise **Sag Gain** |
| Too optimistic in flight -- lands with less left than it says | Lower **Sag Gain** |
| Lags behind the real pack throughout the flight | Raise **Voltage Drop Rate** or **Charge Drop Rate** |

| Setting | Default | Range | Meaning |
| --- | :-: | :-: | --- |
| **Voltage Drop Rate** | 10 | 0-250 | How fast (mV per second, per cell) the voltage it works from may fall. |
| **Charge Drop Rate** | 50 | 0-250 | How fast the displayed percentage may fall once armed, in 0.01% per second (50 = 0.5% per second). |
| **Sag Gain** | 40 | 0-100 | Expected sag per cell at full stick load, in 0.01 V (40 = 0.40 V). |

These three only affect the voltage part. In **Current** mode with mAh
coming in, the reading follows the mAh counter directly.

!!! note "Without SmartFuel"
    With SmartFuel **Off**, the charge level is mAh-based if a capacity is
    set -- which reads 100% forever without a current sensor -- or a simple
    straight line between the min and max cell voltages otherwise.

See [SmartFuel internals](../contributing/tech/smartfuel.md) for the
details of the algorithm.
