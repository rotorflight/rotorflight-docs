# Jeti example

Rotorflight Jeti Setup

Instructions for Jeti Initial Radio and Configurator Setup, this is a generic setup using a Frsky transmitter with a jeti exbus receiver with a Rotorflight FC. This example shows a Nexus; however, the process is the same for any Rotorflight controller. Please choose the SBUS port related to your FC.

## Wiring[​](#wiring "Direct link to Wiring")

The simplest is to use a male to male servo lead to connect from the ***SBUS*** port on the FBL to the ***E1*** port on your receiver.

![Wiring](/rotorflight-docs/assets/images/rx-wiring-59eacf58256ad059d14559ad3ffb89a3.png)

## Transmitter Setup[​](#transmitter-setup "Direct link to Transmitter Setup")

Once your receiver has been bound to the radio; visit the device explorer page.

![DeviceExplorer](/rotorflight-docs/assets/images/rc-dv-explorer-9801775d40ca0bcc890f937289c6ce71.png)

### Select Receiver type[​](#select-receiver-type "Direct link to Select Receiver type")

Select the receiver

![SelectRX](/rotorflight-docs/assets/images/rx-select-rx-0778cae6a8f6de0846374686d1c172c3.png)

### Set alternate pin[​](#set-alternate-pin "Direct link to Set alternate pin")

Select the alternative pin configuration

![AltPin](/rotorflight-docs/assets/images/rx-alt-pin-c49cf86d4a463548cafbeb35641e6d6d.png)

### Select ExBus pin[​](#select-exbus-pin "Direct link to Select ExBus pin")

* Set the pin to use the ExBus protocol

![Protocol](/rotorflight-docs/assets/images/rx-set-protocol-275b3d7abbc4d7251a957a5e5ae7812c.png)

## Configure the FC[​](#configure-the-fc "Direct link to Configure the FC")

Next steps are to configure the fbl to receive the Exbus signal.

### Setup UART ports[​](#setup-uart-ports "Direct link to Setup UART ports")

Set the SBUS port to be used for serial rx communication

![SerialRX](/rotorflight-docs/assets/images/serialrx-113fab703935cbbcde93709cc3208d2a.png)

### Setup Receiver[​](#setup-receiver "Direct link to Setup Receiver")

Then visit the receiver page and configure as follows

![ConfiguratorRXPage](/rotorflight-docs/assets/images/receiver-9d664d1cd9b522493da76173942bec8a.png)

### Check sensors[​](#check-sensors "Direct link to Check sensors")

You should now have a control link and telemetry with all the sensors available on your radio.

![ConfiguratorSensorsList](/rotorflight-docs/assets/images/sensors-list-7cb2fe1f92e35d84ba916a835b0bb825.png)
