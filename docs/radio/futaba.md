# Futaba

Futaba receivers connect over **S.BUS2** or plain **S.BUS**, depending on
the receiver model. Use S.BUS2 if your receiver has an S.BUS2 port -- it
carries both control and telemetry on one wire. Receivers without S.BUS2
use S.BUS, which carries control only (no telemetry).

## Wiring

=== "S.BUS2"

    Connect the receiver's **S.BUS2** port to the flight controller's
    receiver port **TX** pin with a servo lead.

=== "S.BUS"

    Connect the receiver's **S.BUS** port to the flight controller's
    receiver port (often labelled *SBUS*) **RX** pin with a servo lead.

## Flight controller

1. [Configuration](../configurator/tabs/configuration.md#serial-ports) tab:
   set the port to **Serial Rx**. Save and reboot.
2. [Receiver](../configurator/tabs/receiver.md) tab, then save and reboot:

    === "S.BUS2"

        Protocol **Futaba S.BUS2**, *Inverted* **off**, *Half-Duplex*
        **on**, channel preset **Futaba / Hitec**, and telemetry
        **enabled**.

    === "S.BUS"

        Protocol **Futaba S.BUS**, *Inverted* **off**, *Half-Duplex*
        **off**, channel preset **Futaba / Hitec**.

!!! note
    Leave *Inverted* **off** for Futaba receivers. S.BUS is an inverted
    signal and the flight controller already allows for that -- the
    *Inverted* switch is only for receivers that output a non-inverted
    S.BUS signal.

## Radio

1. **Linkage Menu → System Type**: pick a protocol that matches your
   receiver. For S.BUS2 telemetry, use one with telemetry, such as T-FHSS
   or FASSTest 18CH, with telemetry on. Make sure the receiver itself is
   set to output S.BUS2 or S.BUS to match the flight controller.
2. **Linkage Menu → Sensor** (S.BUS2 only): register the sensors in these
   slots. The slot numbers and sensor types must match exactly, or the
   readings come out wrong.

| Slot | Sensor type | Carries |
| :-: | --- | --- |
| 1 | Voltage | Battery voltage and average cell voltage |
| 3 | Current (SBS-01C) | Current, mAh used, voltage |
| 6 | RPM | Headspeed |
| 7 | Temperature (SBS-01T) | Flight controller temperature |
| 8 | Kontronik ESC | ESC telemetry: voltage, current, mAh, RPM, temperatures, BEC current, throttle |

Then add the values you want to your telemetry screen.
