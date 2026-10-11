# FBUS Master

Rotorflight can be the *master* of a FrSky **F.Bus** or **S.Port** bus. The
flight controller then polls FrSky sensors connected to it -- voltage,
current, GPS, vario, RPM, ESC -- and forwards their readings to your radio
with the rest of its telemetry. On F.Bus, it can also drive F.Bus servos.

<iframe width="100%" style="aspect-ratio: 16/9" src="https://www.youtube.com/embed/WHM7ZVK7rfk" title="FBus Master" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## F.Bus or S.Port?

| | F.Bus master | S.Port master |
| --- | --- | --- |
| For | Newer FrSky F.Bus devices | Older S.Port sensors |
| Speed | 460800 baud | 57600 baud |
| Drives servos | Yes -- 16 channels at up to 500 Hz | No |
| UART function | **F.BUS** | **S.PORT Master** |

Both can run at once on separate UARTs.

## Supported sensors

FLVSS cell voltage, FAS current/voltage, FrSky GPS, VARIO2, RPM and
temperature sensors, SBEC, and FrSky ESCs. Up to 32 sensors per bus.

## F.Bus master

1. On the [Configuration](../configurator/tabs/configuration.md#serial-ports)
   tab, set a UART to **F.BUS**. Save and reboot.
2. Connect the UART's **TX** pad to the F.Bus signal wire of your sensors
   and servos. F.Bus is one wire, both ways, and inverted (the default).
3. Power everything up. The flight controller looks for sensors for the
   first 5 seconds.
4. Check in the [CLI](../configurator/tabs/cli.md):

    ```
    fbus_sensors
    ```

    lists every sensor found, with its physical ID.

5. Run a sensor discovery on your radio; the new sensors appear.

### F.Bus servos

F.Bus servos are **bus servos** S9-S26, set up in the *Bus Servo
Configuration* table on the [Servos](../configurator/tabs/servos.md#bus-servo-configuration)
tab. Each can follow the mixer (e.g. for the swashplate) or pass a receiver
channel straight through. FrSky XACT servos can be programmed over the same
wire with the [XACT Servo Programming](../configurator/tabs/xact-servo.md)
tab. For the full wiring, programming and bench checks of a swashplate and
tail set, see [FrSky Servos](frsky-servos.md).

### Settings

| Setting | Default | |
| --- | --- | --- |
| `fbus_master_frame_rate` | 500 Hz | Servo/channel output rate (25-550). |
| `fbus_master_telemetry_rate` | 200 Hz | Sensor polling rate. |
| `fbus_master_discovery_ms` | 5000 | How long to look for sensors at start-up. Raise it if sensors are missed. |
| `fbus_master_inverted` | ON | Leave on for FrSky hardware. |
| `fbus_master_pinswap` | OFF | Use the RX pin instead of TX. |
| `fbus_master_forwarded_sensors` | none (all slots `255`) | Up to 8 physical IDs to forward to the radio; `255` for unused slots. |

## S.Port master

1. Set a UART to **S.PORT Master**. Save and reboot.
2. Connect the sensors' S.Port wire. The defaults -- inverted, pin swap on --
   suit most FrSky sensors; if nothing is found, toggle `sport_master_pinswap`.
3. Check with `fbus_sensors`, as above.

## Troubleshooting

| Problem | Try |
| --- | --- |
| `fbus_sensors` shows nothing | Check the wiring and which pin you used; toggle pin swap. |
| Sensors found but not on the radio | Re-run sensor discovery on the radio. Check telemetry is on, and that `fbus_master_forwarded_sensors` includes them. |
| Sensors come and go | Raise `fbus_master_discovery_ms` and lower `fbus_master_telemetry_rate`. |

`fbus_sensors clear` empties the list and starts discovery again.

To use FrSky sensors as the battery meter, choose **FBUS** as the voltage
or current source on the [Power](../configurator/tabs/power.md#meters) tab.
