# Remapping Outputs

Rotorflight flight controllers (Radiomaster Nexus, FlyDragon, Flywing,
Matek G474, GooSky, FrSky 007 ...) come with their servo, motor and RPM
outputs already set up. **If you have one of those, skip this page** -- unless
you want to repurpose an output, for example to add a servo.

Betaflight flight controllers are built for multirotors: four or more motor
outputs, no servos. To fly a helicopter, some of those pads have to be
*remapped* -- reassigned to servos, a motor and an RPM input.

## What a helicopter needs

| Function | Typical pin |
| --- | --- |
| **Motor 1** | Main ESC (or the throttle servo on a nitro). |
| **Servos 1-3** | Cyclic servos. |
| **Servo 4** | Tail servo -- or **Motor 2** for a motorised tail. |
| **Frequency input 1** | RPM signal from the ESC or an RPM sensor. |

### Rules for a working layout

The STM32's outputs are driven by hardware *timers*, and a pin can only do
what its timer allows:

- **Servos on the same timer share one update rate.** Put the cyclic
  servos together on one timer. Give a narrow-band tail servo (760 µs,
  560 Hz) a timer of its own.
- **The main motor needs a timer of its own**, not shared with servos.
- **A frequency (RPM) input needs a timer used by nothing else**, and a
  positive timer channel (not `CHxN`). 32-bit timers -- TIM2 and TIM5 -- are
  best. Two frequency inputs can share one timer.
- **Motors and servos must be numbered without gaps**: S1, S2, S3, S4 --
  not S1, S2, S4. The flight controller stops at the first missing output.

## With presets

The [Presets](../configurator/tabs/presets.md) tab has *REMAPPING* presets for
many flight controllers: search for your board's name.

## With the CLI

Otherwise the remapping is a
set of CLI commands that assign pins (`resource`), timers (`timer`) and DMA
(`dma`). The
[Rotorflight remapping spreadsheet](https://docs.google.com/spreadsheets/d/1HyrgZuycS6S4s6TsFGkf90Z2PnO5yLcSx2tpa1-f1Vs/copy)
generates them from your board's Betaflight target:

1. Copy your board's configuration from the Betaflight target repository,
   from the `board_name` line down, into the spreadsheet.
2. Assign motors, servos and the frequency input to pins, choosing timers
   that follow the rules above.
3. Copy the generated commands, paste them into the
   [CLI](../configurator/tabs/cli.md) and type `save`.

For example, to use the LED strip pad (A09, TIM1) as the RPM input:

```
resource LED_STRIP 1 NONE
resource FREQ 1 A09
timer A09 AF1
dma pin A09 0
```

TIM1 then can't be used by any motor or servo.

See [Betaflight FC (DIY)](../hardware/betaflight-diy.md) for more on
choosing and wiring a Betaflight board.

## Adding an extra servo

An extra servo -- retracts, lights, a winch or a camera on a scale
helicopter -- can be driven straight from a spare radio channel.

=== "Bus servo (S.BUS or F.Bus output)"

    With [S.BUS output or F.Bus master](fbus-master.md) set up, bus servos
    S9-S26 can each be set to **Source: RX** on the
    [Servos](../configurator/tabs/servos.md#bus-servo-configuration) tab.
    The servo then passes a receiver channel straight through: S9 follows
    channel 1, S10 channel 2, and so on, so S17-S26 follow channels 9-18
    (which is how they're set by default). No remapping needed.

=== "PWM servo"

    1. Give the servo a pin: assign the next free servo number (e.g. **S5**)
       to a spare pad with `resource SERVO 5
       <pin>` in the CLI. If it shares a timer with another servo, it also
       shares its update rate.
    2. Add a mixer rule that drives it from the radio channel. For AUX3
       driving servo 5, in the CLI:

        ```
        mixer rule 10 set AUX3 S5 1000 0
        save
        ```

        `1000` is 100% weight and `0` is the offset. Use a rule number that
        isn't already used -- `mixer rule` lists them.
    3. Set the servo's centre, limits and rate on the
       [Servos](../configurator/tabs/servos.md) tab.
