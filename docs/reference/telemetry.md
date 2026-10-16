# Telemetry Sensors

Rotorflight sends its data to your radio as telemetry sensors: battery,
ESC, headspeed, governor state, profiles, attitude, GPS and more. Choose
which on the [Receiver](../configurator/tabs/receiver.md#telemetry-sensors)
tab, or with the `telemetry_sensors` setting.

## Protocols

| Protocol | How sensors are sent | Notes |
| --- | --- | --- |
| **FrSky S.Port / F.Port / F.Bus** | Each sensor has an S.Port application ID (below). | The selected sensors are sent in turn. |
| **CRSF / ExpressLRS -- Custom** | Rotorflight's own frames, each sensor with a custom ID (below). Up to 40 sensors. | Needs a decoder on the radio -- see [ELRS Custom Telemetry](../setup/elrs-custom-telemetry.md). |
| **CRSF / ExpressLRS -- Native** | Standard CRSF frames: flight mode, battery, attitude, altitude, GPS, and (2.3+) RPM and temperature. | Works on any CRSF radio, but carries far less. |
| **FrSky Hub (D-series)** | Fixed set of hub sensors. | Legacy. |
| **FlySky iBUS / iBUS2** | iBUS sensor slots. | |
| **Futaba SBUS2** | Fixed slots -- see [Futaba](../radio/futaba.md). | |
| **Jeti EX Bus** | Sensors appear on the radio automatically. | |
| **Graupner HoTT, Spektrum SRXL / SRXL2, Ghost, MAVLink, LTM** | Protocol-specific sets. | |

## Sensor IDs

The **ID** is what goes in `telemetry_sensors`. A sensor can only be sent
over a protocol for which it has an ID in the table.

--8<-- "telemetry-sensors.md"

Sensors 110-117 are slots for forwarding FrSky sensors connected to the
flight controller -- see [FBUS Master](../setup/fbus-master.md).
