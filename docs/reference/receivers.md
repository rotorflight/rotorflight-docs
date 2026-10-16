# Receivers

The [Receiver](../configurator/tabs/receiver.md) tab page covers set-up.
This page is the reference: protocol names for the CLI, Spektrum binding,
RSSI and signal-loss settings.

## Serial receiver protocols

Set with `serialrx_provider`, on a UART with the Serial RX function.

| `serialrx_provider` | Protocol | Telemetry on the same wire |
| --- | --- | :-: |
| `CRSF` | TBS Crossfire, ExpressLRS | Yes |
| `SBUS` | Futaba S.BUS (inverted) | -- |
| `SBUS2` | Futaba S.BUS2 | Yes |
| `FPORT` / `FPORT2` | FrSky F.Port / F.Port 2 | Yes |
| `FBUS` | FrSky F.Bus | Yes |
| `SPEK1024` / `SPEK2048` | Spektrum DSM2 / DSMX satellites | -- |
| `SRXL` | Spektrum SRXL (and Multiplex) | Yes |
| `SRXL2` | Spektrum SRXL2 | Yes |
| `GHST` | ImmersionRC Ghost | Yes |
| `SUMD` / `SUMH` | Graupner HoTT | -- |
| `IBUS` | FlySky iBUS | -- |
| `IBUS2` | FlySky iBUS2 | Yes |
| `JETIEXBUS` | Jeti EX Bus | Yes |
| `XB-A` / `XB-B` / `XB-B-RJ01` | JR XBUS Mode A / Mode B / RJ01 | -- |

The signal options are `serialrx_inverted`, `serialrx_halfduplex` and
`serialrx_pinswap` -- see [Serial Ports](serial-ports.md#pin-swap-inversion-and-half-duplex).

Some protocol options:

| Setting | |
| --- | --- |
| `sbus_baud_fast` | Fast (200 kbaud) SBUS, for receivers that support it. |
| `srxl2_unit_id` | SRXL2 unit ID. |
| `srxl2_baud_fast` | Fast SRXL2 baud rate. |
| `crsf_use_negotiated_baud` | Let CRSF/ELRS negotiate a higher baud rate. |
| `crsf_telemetry_mode` | `NATIVE` or `CUSTOM` -- see [ELRS Custom Telemetry](../setup/elrs-custom-telemetry.md). |
| `crsf_telemetry_link_rate` / `crsf_telemetry_link_ratio` | ELRS packet rate and telemetry ratio, for custom telemetry. |

## Spektrum receiver settings

The receiver table from the old documentation lists these remote receivers.
The UART pin is on the **flight controller**; connect ground as well as
power and signal. Check the receiver's supply voltage before connecting it:
the older 3.3 V satellites must not be powered from a 5 V receiver port.

| Receiver | Modulation | Supply voltage | FC UART pin | Receiver protocol | Telemetry |
| --- | --- | --- | --- | --- | --- |
| SPM9545 | DSM2 | 3.3 V | RX | DSM/2048* | No |
| SPM4645 | DSM2 | 3.3 V | RX | DSM/2048* | No |
| SPM4645 | DSMX | 3.3 V | RX | DSM/2048 | No |
| SPM4648 | DSM2 | 3.3 V | RX | DSM/2048* | No |
| SPM4648 | DSMX | 3.3 V | RX | DSM/2048 | No |
| SPM4649T | DSMX | 5 V (4–8.4 V) | TX | DSM/SRXL | Yes |
| SPM9745 | DSMX | 3.3 V | RX | DSM/2048 | No |
| SPM9746 | DSMX | 3.3 V | RX | DSM/2048 | No |
| SPM4650(C) | DSMX | 5 V (3.3–8.4 V) | TX | DSM/SRXL2 | Yes |
| SPM4651T | DSMX | 5 V (3.3–8.4 V) | TX | DSM/SRXL2 | Yes |
| SPM9747 | DSMX | 5 V (3.3–8.4 V) | TX | DSM/SRXL2 | Yes (Fly-By) |

\* Choose **DSM/1024** when bound in DSM2 at 22 ms (bind code **3**).
The CLI equivalents of DSM/1024, DSM/2048, DSM/SRXL and DSM/SRXL2 are
`SPEK1024`, `SPEK2048`, `SRXL` and `SRXL2`, respectively.

### Connection settings

- Enable **Serial Rx** on the UART connected to the receiver, then select
  the protocol from the table on the [Receiver](../configurator/tabs/receiver.md) tab.
- Leave **Inverted Serial Signaling** off.
- SRXL/SRXL2 use one-wire bidirectional communication; the firmware handles
  half-duplex for these protocols.
- With the signal on the FC's **TX** pin, leave **Pin Swap** off. To use
  an **RX** pin instead for SRXL/SRXL2, enable **Pin Swap** on a flight
  controller that supports it; see [Serial Ports](serial-ports.md#pin-swap-inversion-and-half-duplex).

## Spektrum binding

**SRXL2** receivers bind from the Configurator: **Bind Receiver** on the
Receiver tab, or `bind_rx` in the CLI. A receiver with a bind button can
also be put into bind mode using its own instructions. Then start binding
on the transmitter.

**Satellites** bind through the flight controller, which sends the bind
pulses at power-up:

1. Set `spektrum_sat_bind` to the code for your satellite and save:

    | Value | Mode |
    | :-: | --- |
    | 3 | DSM2 1024-bit, 22 ms |
    | 5 | DSM2 2048-bit, 11 ms |
    | 7 | DSMX 1024-bit, 22 ms |
    | 8 | DSMX 2048-bit, 22 ms |
    | 9 | DSMX 2048-bit, 11 ms |

    For example, for DSMX 2048 at 11 ms:

    ```text
    set spektrum_sat_bind = 9
    save
    ```

2. Power cycle the flight controller. The satellite blinks, ready to bind;
   bind it from the transmitter.
3. With `spektrum_sat_bind_autoreset = ON` (the default) the setting resets
   to 0 after binding.

The satellite must be powered from a pin the flight controller can switch
at power-up (the board's DSM port does this).

## RSSI

| Source | Set up with |
| --- | --- |
| From the receiver protocol | Automatic for CRSF, F.Port, F.Bus, SRXL2, Ghost and others -- choose **AUTO** on the Receiver tab. |
| From a channel | `rssi_channel` -- a receiver channel that carries RSSI. |
| From an analogue input | The `RSSI_ADC` feature and the board's RSSI pad. |
| From frame errors | `rssi_src_frame_errors = ON` -- estimated from SBUS frame loss. |

`rssi_scale`, `rssi_offset` and `rssi_invert` adjust a channel or ADC
reading to 0-100%.

## Signal loss

A channel value outside `rx_pulse_min` .. `rx_pulse_max` (default 885 -
2115 µs) counts as invalid. What happens then is set on the
[Failsafe](../configurator/tabs/failsafe.md) tab; the per-channel fallback
values are the `rxfail` command:

```
rxfail <channel> <a|h|s> [value]
```

`a` = auto (centre, throttle low), `h` = hold the last value,
`s` = set the given value in µs.
