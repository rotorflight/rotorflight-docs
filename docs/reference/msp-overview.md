# MSP Overview

MSP (MultiWii Serial Protocol) is the binary protocol that the Configurator,
the Lua suites and other tools use to talk to the flight controller --
over USB, a UART, or tunnelled through the receiver's telemetry link (S.Port,
F.Port, F.Bus, CRSF).

## API versions

Each release reports an **MSP API version**. Tools use it to decide which
messages and fields to expect, and refuse firmware they don't know.

| Rotorflight | Firmware | MSP API |
| --- | --- | --- |
| 2.0 | 4.3.0 | 12.6 |
| 2.1 | 4.4.0 | 12.7 |
| 2.2 | 4.5.0 | 12.8 |
| 2.3 | 4.6.0 | 12.9 |

This is why the Configurator, Lua suites and firmware should all be from the
same release. A Configurator that doesn't recognise the firmware's API
opens in CLI-only mode.

## Changes between versions

New fields are added at the end of a message, so older clients still read
the beginning correctly. New features usually get new commands; firmware
that lacks a command answers it as unsupported, which is how a tool can tell.
Rotorflight-specific commands use MSPv2 command IDs in the `0x4000`
range -- for example SmartFuel configuration (`0x4000`/`0x4001`).

The per-release MSP changes are listed in the firmware's
[Changes.md](https://github.com/rotorflight/rotorflight-firmware/blob/release/4.6.0/Changes.md).
The definitive reference is the source:
[`src/main/msp/`](https://github.com/rotorflight/rotorflight-firmware/tree/master/src/main/msp).

## For tool authors

- Use MSPv2 framing where you can; it carries 16-bit command IDs and a
  CRC8.
- Check the API version first (`MSP_API_VERSION`) and gate fields on it.
- Over telemetry links, MSP is slow and shares bandwidth with telemetry --
  batch reads, and avoid polling in flight. The Lua suites stop
  configuration traffic while the helicopter is armed.
- The Configurator's **Virtual FC** answers MSP like a real flight
  controller, which is handy for testing a tool without hardware.
