# Serial Ports

Each UART on the flight controller does one job -- receiver, ESC telemetry,
GPS, Blackbox logger and so on. Set them on the
[Configuration](../configurator/tabs/configuration.md#serial-ports) tab;
this page covers the details and the CLI.

## Rules

- Each function can be on one port only. Telemetry functions can't share
  a port with other telemetry functions.
- At most 3 ports can run MSP, and one port must always be available for
  MSP/CLI (USB counts).
- Turn on the matching feature for some functions -- e.g. GPS.
- If the configuration is invalid, the serial settings reset to defaults.

CRSF, ExpressLRS, F.Port, F.Bus, SRXL2, iBUS2, EX Bus and Ghost receivers
carry telemetry over the receiver link itself, so they don't need a separate
telemetry port.

## The `serial` command

```
serial <port> <function> <msp baud> <gps baud> <telemetry baud> <blackbox baud>
```

`diff` shows your current port settings as `serial` lines. For example
`serial 3 64 115200 57600 0 115200` sets UART4 to Serial Rx.

### Port identifiers

| Port | ID |
| --- | :-: |
| UART1 ... UART10 | 0 ... 9 |
| USB (VCP) | 20 |
| SoftSerial 1, 2 | 30, 31 |
| LPUART1 | 40 |

### Functions

The function is a bit mask; ports with combined functions add the values.

| Function | Value | Configurator name |
| --- | --: | --- |
| None | 0 | Disabled |
| MSP | 1 | MSP |
| GPS | 2 | GPS |
| FrSky Hub telemetry | 4 | Telemetry: FrSky Hub |
| HoTT telemetry | 8 | Telemetry: Graupner HoTT |
| LTM telemetry | 16 | Telemetry: LTM |
| SmartPort telemetry | 32 | Telemetry: FrSky SmartPort |
| Serial RX | 64 | Serial Rx |
| Blackbox | 128 | Blackbox Logging |
| MAVLink telemetry | 512 | Telemetry: MAVLink |
| ESC sensor | 1024 | ESC Telemetry |
| VTX SmartAudio | 2048 | |
| iBUS telemetry | 4096 | Telemetry: FlySky iBUS |
| VTX Tramp | 8192 | |
| RunCam device | 16384 | |
| Benewake LIDAR | 32768 | |
| FrSky OSD | 65536 | |
| SBUS output | 262144 | S.BUS Output |
| F.Bus master | 524288 | F.BUS |
| S.Port master | 1048576 | S.PORT Master |

### Baud rates

| Use | Rates |
| --- | --- |
| MSP | 9600, 19200, 38400, 57600, **115200**, 230400, 250000, 500000, 1000000 |
| GPS | 9600, 19200, 38400, 57600, 115200 (auto-baud available) |
| Telemetry | AUTO, 9600 ... 115200 -- most telemetry protocols ignore this |
| Blackbox | 19200 ... 2000000, 2470000 -- use 2000000 for [OpenLager](../setup/openlager.md) |

Receiver protocols and most telemetry set their own speed.

## Pin swap, inversion and half-duplex

Several functions have their own signalling settings, for when the wiring
needs it:

| Function | Settings |
| --- | --- |
| Receiver | `serialrx_inverted`, `serialrx_halfduplex`, `serialrx_pinswap` |
| Telemetry | `tlm_inverted`, `tlm_halfduplex`, `tlm_pinswap` |
| ESC telemetry | `esc_sensor_halfduplex`, `esc_sensor_pinswap` |
| F.Bus master | `fbus_master_inverted`, `fbus_master_pinswap` |
| S.Port master | `sport_master_inverted`, `sport_master_pinswap` |

Inversion and pin swap need an F7, G4 or H7 processor.

## Serial passthrough

`serialpassthrough` connects USB straight through to a device on a UART --
for configuring or flashing a GPS, receiver or other peripheral with its own
software.

```
serialpassthrough <port id> [baud] [mode] [DTR pinio] [port2 id] [port2 baud] [port2 mode]
```

For example `serialpassthrough 2 115200` connects USB to UART3 at
115200 baud. Disconnect the Rotorflight Configurator first, then open the
device's software. **Power cycle the flight controller** to leave
passthrough.

With a second port given, two UARTs are connected to each other instead of
to USB.

`gpspassthrough` is a shortcut for the GPS port.
