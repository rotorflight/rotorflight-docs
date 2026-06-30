---
sidebar_position: 102
---

# FBus & S.Port Master

Rotorflight can act as a bus master on either the FrSky **FBus** or **S.Port** protocol. Both modes let the FC poll external FrSky sensors — voltage, current, GPS, RPM and more — collecting their telemetry and forwarding it through the main radio link. The two protocols use different wiring and speeds but work the same way from a user perspective.

The video below covers FBus Master setup in practice:

<iframe width="100%" style={{aspectRatio: "16/9"}} src="https://www.youtube.com/embed/WHM7ZVK7rfk" title="FBus Master" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />

## Which one should I use?

| | FBus Master | S.Port Master |
|---|---|---|
| **Protocol** | FBus (newer FrSky) | S.Port / SmartPort (older FrSky) |
| **Baud rate** | 460800 | 57600 |
| **Wiring** | Single wire (TX pin) | Single wire (TX or RX depending on pinswap) |
| **Also outputs channels** | Yes — 16 channels at up to 500 Hz | No |
| **Config options** | Frame rate, telemetry rate, discovery time, forwarded sensors | Inverted, pin swap |
| **Use when** | You have newer FrSky FBus sensors | You have older S.Port sensors |

Use **FBus Master** for newer FrSky hardware. Use **S.Port Master** if your sensors only support the older S.Port protocol.

## Supported Sensors

The same sensor types are supported by both modes:

* **FLVSS** — LiPo cell voltage sensor
* **FAS-150S** — current and voltage sensor
* **FrSky GPS** — position, altitude, speed
* **VARIO2** — variometer
* **RPM sensor**
* **SBEC** — BEC voltage
* **FrSky ESC sensor**

Up to 32 sensors per source can be tracked (64 combined if both modes are active simultaneously).

## Requirements

* A spare **UART** with both TX and RX pins accessible for each bus master you want to use
* FrSky sensor(s) that support the matching protocol (FBus or S.Port)

***

## FBus Master Setup

### Step 1 — Assign the UART

In the **Ports** tab, set the desired UART function to **FBus Out**. Save and reboot.

### Step 2 — Wire the sensor

Connect the **TX pin** of the chosen UART to the sensor's FBus signal wire. FBus is a single-wire bidirectional bus. The signal is inverted by default, which is correct for standard FrSky FBus hardware.

:::note
If your sensor does not respond, try enabling **Pin Swap** (`fbus_master_pinswap = ON`) so the RX pin is used for the bus instead. Some FC layouts route the pins differently.
:::

### Step 3 — Verify sensor discovery

After powering up with sensors connected, FBus Master scans the bus for sensors during a **5-second discovery window**. Open the CLI and run:

```
fbus_sensors
```

This lists every sensor physical ID found. Check that your sensors appear.

### Step 4 — Confirm telemetry on the radio

Once sensors are discovered, their values should appear in your radio's telemetry sensor list. Trigger a sensor scan on your transmitter if needed.

### FBus Master Parameters

| Parameter | Default | Range | Description |
|---|---|---|---|
| `fbus_master_frame_rate` | 500 Hz | 25–550 | Channel output frame rate |
| `fbus_master_telemetry_rate` | 200 Hz | 25–550 | Sensor polling rate |
| `fbus_master_discovery_ms` | 5000 ms | 100–10000 | Sensor discovery window at startup |
| `fbus_master_inverted` | ON | ON/OFF | Inverted signal — leave ON for standard FBus hardware |
| `fbus_master_pinswap` | OFF | ON/OFF | Swap TX/RX pins if your wiring requires it |
| `fbus_master_forwarded_sensors` | (all) | 8 IDs | Physical IDs of sensors to forward to the radio |

#### Adjusting the discovery window

If sensors are not being found reliably, extend the discovery window:

```
set fbus_master_discovery_ms = 10000
save
```

#### Limiting forwarded sensors

By default all discovered sensors are forwarded. To restrict which ones reach the radio:

```
set fbus_master_forwarded_sensors = 0x10, 0x22, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
save
```

Unused slots should be set to `0xFF`.

***

## S.Port Master Setup

### Step 1 — Assign the UART

In the **Ports** tab, set the desired UART function to **S.PORT Master**. Save and reboot.

### Step 2 — Wire the sensor

S.Port is a single-wire bidirectional bus at 57600 baud. Connect the sensor's S.Port wire to the UART. The default settings (inverted ON, pin swap ON) suit most FrSky S.Port sensors — if your sensor does not respond, try toggling pin swap.

### Step 3 — Verify and confirm

The same process as FBus Master applies. Run `fbus_sensors` in the CLI to confirm sensors are discovered, then check the radio sensor list.

### S.Port Master Parameters

| Parameter | Default | Description |
|---|---|---|
| `sport_master_inverted` | ON | Inverted signal — matches standard S.Port hardware |
| `sport_master_pinswap` | ON | Swap TX/RX pins — enabled by default for S.Port |

S.Port Master has a fixed 5-second discovery window and a fixed polling interval; these are not user-configurable.

***

## Inspecting Discovered Sensors

Both FBus Master and S.Port Master report into the same sensor cache. To see everything found:

```
fbus_sensors
```

Sensors are listed with their physical ID and source (FBUS or SPORT). To clear the cache and force re-discovery:

```
fbus_sensors clear
```

***

## Troubleshooting

**No sensors appear after `fbus_sensors`**
Check wiring. For FBus Master, confirm the sensor is connected to the TX pin. Try toggling `pinswap` if sensors still do not appear.

**Sensors found but not showing on the radio**
Trigger a sensor rescan on your transmitter. For CRSF/ELRS, ensure telemetry is enabled on the link. Check that `fbus_master_forwarded_sensors` IDs match what `fbus_sensors` reports.

**Sensors appear intermittently (FBus)**
Increase `fbus_master_discovery_ms` and reduce `fbus_master_telemetry_rate` to give the bus more time between polls.

**Both modes active at once**
FBus Master and S.Port Master can run simultaneously on separate UARTs, sharing the same sensor cache. Sensors discovered via either protocol are available to the FC and forwarded together.
