# Futaba example

Rotorflight Futaba Setup

Instructions for Futaba Initial Radio and Configurator Setup, this is a generic setup using Futaba T26SZ transmitter and SBUS2 receiver with a Rotorflight FC. This example shows a Nexus; however, the process is the same for any Rotorflight controller. Please choose the SBUS port related to your FC

## Wiring[​](#wiring "Direct link to Wiring")

The simplest is to use a male to male servo lead to connect from the ***SBUS*** port on the FBL to the ***SBUS2*** port on your receiver.

![Wiring](/rotorflight-docs/assets/images/wiring-15d592124995712f313f8b368c2c7f93.jpg)

## Configure the FC[​](#configure-the-fc "Direct link to Configure the FC")

Next steps are to configure the fbl to receive the SBUS2 signal.

### Setup UART ports[​](#setup-uart-ports "Direct link to Setup UART ports")

Set the SBUS port to be used for serial rx communication

![SerialRX](/rotorflight-docs/assets/images/serialrx-113fab703935cbbcde93709cc3208d2a.png)

### Setup Receiver[​](#setup-receiver "Direct link to Setup Receiver")

Then visit the receiver page and configure as follows

![ConfiguratorRXPage](/rotorflight-docs/assets/images/configurator-ddd19e3ab42e4acf4980885a9b7857e7.png)

### Setup Radio[​](#setup-radio "Direct link to Setup Radio")

On the `Linkage Menu` -> `System Type` page, make sure you are using a protocol that supports telemetry, like T-FHSS or FASSTest 18ch and that telemetry is enabled. ![RadioTelemetryOn](/rotorflight-docs/assets/images/telemetry-on-0911b699444fbee349c3ac2ede615e0c.jpg)

Once you have activated telemetry, you have to configure the list of sensors in the `Linkage Menu` -> `Sensor` page. The slot assignment and sensor types are important, otherwise your radio won't display the telemetry information correctly. Follow the assignment map and example bellow:

![ConfiguratorSensorsList](/rotorflight-docs/assets/images/sensors-b9c5e42259caaf559b93e83cbe834b6e.png)

![RadioSensorsExamples](/rotorflight-docs/assets/images/sensors-example-d46041b3935a4b9e201b2e72adbfca74.jpg)

Once your sensors are configured correctly, you should be able to customize your telemetry screen to include the data you want. ![ConfiguratorSensorsList](/rotorflight-docs/assets/images/telemetry-display-bb729633cf40c5a0c05e7d3c5d73d304.jpg)
