# Hardware

Rotorflight runs on purpose-built helicopter flight controllers, and on most
Betaflight flight controllers with STM32 F4, F7, G4 or H7 processors.

## Rotorflight flight controllers

These are made for Rotorflight: servo and ESC headers, an RPM input and
labelled ports, all set up out of the box. Choose the **Board** name below
when [flashing](../getting-started/flashing-the-firmware.md).

| Flight controller | Board | MCU | Built-in receiver |
| --- | --- | --- | --- |
| [Radiomaster Nexus](radiomaster-nexus.md) | `NEXUS_F7` | F722 | -- |
| [Radiomaster Nexus X](radiomaster-nexus.md#nexus-x-and-nexus-xr) | `NEXUS_X` | F722 | -- |
| [Radiomaster Nexus XR](radiomaster-nexus.md#nexus-x-and-nexus-xr) | `NEXUS_XR` | F722 | ExpressLRS |
| [FrSky VANTAC RF007](frsky-007.md) | `VANTAC_RF007` | F722 | FrSky Archer+ or TW |
| [FlyDragon F722 V2.2](flydragon-f722.md) | `FLYDRAGON_V2_2` | F722 | ExpressLRS |
| [FlyDragon PRO](flydragon-f722.md#flydragon-pro) | `FLYDRAGON_PRO42688` / `FLYDRAGON_PRO6000` | F722 | ExpressLRS |
| [Flywing HELI405](flywing-heli-f405.md) | `FLYWING_HELI405` (servo tail), `FLYWING_HELI405M` (motorised tail) | F405 | -- |
| [GooSky F701-ELRS](goosky-f701.md) | `GOOSKY_F701` | F722 | ExpressLRS |
| [GooSky F4 Mini](goosky-f4mini.md) | `GOOSKY_F4MINI` | F405 | -- |
| [Matek G474-HELI / G474-HLITE](matek-g474.md) | `MATEKG474HELI` | G474 | -- |

Older FlyDragon versions (`FLYDRAGON_V1`, `FLYDRAGON_V2`) are also
supported.

!!! tip "Repurposing outputs"
    Every one of these can be remapped -- for a motorised tail, an extra
    servo, an LED strip -- with the [Remap FC](../configurator/tabs/remap-fc.md)
    tab (2.4) or the CLI snippets on each board's page.

## Betaflight flight controllers

Most Betaflight flight controllers work, but they're built for multirotors:
their outputs must be [remapped](../setup/remapping.md) for servos, and
you'll be soldering. See [Betaflight FC (DIY)](betaflight-diy.md).

Look for:

- an F4, F7, G4 or H7 processor (F7 / H7 preferred: more UARTs, and
  inversion for SBUS and F.Port);
- enough outputs for 4 servos and 1-2 motors, plus a pad for the RPM input;
- a blackbox flash chip;
- a gyro that copes with helicopter vibration -- soft-mount boards with
  sensitive gyros such as the MPU-6500.

Boards with a built-in **SPI** receiver (rather than a UART receiver) are
generally not usable.

## DIY projects

See [DIY Projects](diy-projects.md) for flight controller conversions,
output remapping, a Castle telemetry adapter, LED lighting and external
Blackbox logging.

## Making a flight controller?

See [For Manufacturers](manufacturers.md).
