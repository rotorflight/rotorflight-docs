# Example setup - Servo tail

The following doc will give and overview for how to setup a servo tailed helicopter using Rotorflight. The purpose is just as a generic guide to outline the steps to take when setting up a helicopter of this type.

This example will use:

**Helicopter**<br /><!-- -->Helicopter: OMP M4 Controller: Radiomaster Nexus<br /><!-- -->Receiver: ELRS<br /><!-- -->ESC: OMPHobby 65A<br /><!-- -->Servos: OMPHOBBY

**Features**

* Telemetry: Yes
* ESC telemetry: Yes
* RPM Measurement: ESC RPM signal
* RPM Filtering: yes
* Governor: Yes

## Update Firmware[​](#update-firmware "Direct link to Update Firmware")

Update the Flight Controller firmware to the current release. Follow the description on the [**Flashing the firmware**](/docs/setup/flashing-the-firmware.md) page.

## Setup Receiver[​](#setup-receiver "Direct link to Setup Receiver")

Choose where you want to connect your receiver. Any of the UARTS or SBUS port are suitable depending on your receiver and personal preference. In this example we are using ELRS and will connect to the Port(A) which is default ELRS port.

![Example 1](/assets/images/example-1-2-d0a586a6b08a5470a3e60cf7159be03c.png)

caution

Double check your wires between receiver and flight controller before powering on. Some ELRS receiver manufacturers use a different pin arrangement and connecting to your Flight controller will damage the receiver.

### Receiver - serial ports[​](#receiver---serial-ports "Direct link to Receiver - serial ports")

Open the [configuration tab](/docs/configurator/tabs/configuration.md) and set the serial port **Port (A)** to **Serial\_RX**.<br />**Save and Reboot**.

![Example 1](/assets/images/example-1-3-71baf96f6da8f95c516f35a44ba3db23.png)

### Receiver - Rx protocol[​](#receiver----rx-protocol "Direct link to Receiver -  Rx protocol")

Open the [Receiver tab](/docs/configurator/tabs/receiver.md). Set the receiver protocol to TBS CRSF (ELRS) and the channel order to ELRS (AECR1T).<br />**Save and Reboot**.

![Example 1](/assets/images/example-1-4-a80ded2ffec53c3a090a59d4f32c293b.png)

### Receiver - Check[​](#receiver---check "Direct link to Receiver - Check")

Your Receiver should now be connected and operating correctly.

[](/assets/medias/example-1-5-208d36a8d4622446d1b4949867ff0b57.mp4)

### Receiver - Update firmware[​](#receiver---update-firmware "Direct link to Receiver - Update firmware")

If you wish to update your firmware for your ELRS receiver you can now connect using ExpressLRS Configurator using the **Betaflight Passthrough** method.

note

You will need to disconnect and close the Rotorflight Configurator and power cycle the receiver before updating your Receiver

### Receiver - Enable telemetry[​](#receiver---enable-telemetry "Direct link to Receiver - Enable telemetry")

Enable telemetry back to your transmitter

![Example 1](data:image/png;base64,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)

## Enable ARM mode[​](#enable-arm-mode "Direct link to Enable ARM mode")

Arming is an important step for Rotorflight. See the [**Arming setup**](/docs/setup/arming.md) page for more details.

## Gyro setup[​](#gyro-setup "Direct link to Gyro setup")

The gyro can be put into the helicopter in many different ways. We now have to set the gyro alignment so that the gyro knows what direction it is pointing in.

### Gyro - alignment[​](#gyro---alignment "Direct link to Gyro - alignment")

Check and confirm on the [configuration tab](/docs/configurator/tabs/configuration.md) that while moving your helicopter (gyro installed) that the model in the configurator moves in the same direction.

![Example 1](/assets/images/example-1-7-1e0be2e9a633cfdae483eeeafb83861f.png)

### Gyro - Calibrate accelerometer[​](#gyro---calibrate-accelerometer "Direct link to Gyro - Calibrate accelerometer")

With the flight controller installed in your Helicopter open the [setup tab](/docs/configurator/tabs/setup.md) and click on the [calibrate accelerometer](/docs/configurator/tabs/setup.md#calibrate-accelerometer)

![Example 1](/assets/images/example-1-8-ab09c07aec135bad240d4ced4187fd05.png)

## Servo Setup[​](#servo-setup "Direct link to Servo Setup")

The purpose of this step is to [**setup and calibrate servos**](/docs/setup/setup-servos.md). On the M4 the servos are setup in the [CCPM 120 degree](/docs/configurator/tabs/servos.md#ccpm) arrangement so the servos need to be plugged in as shown below.

![Example 1]()

## Mixer Setup[​](#mixer-setup "Direct link to Mixer Setup")

The purpose of this step is to [**setup and calibrate the mixer**](/docs/setup/setup-mixer.md).

## Motor and ESC Setup[​](#motor-and-esc-setup "Direct link to Motor and ESC Setup")

**ESC Throttle Protocol** - The OMPHobby 65A ESC uses a PWM protocol.<br />**ESC telemetry Protocol** - Set this to OMPHobby to match the ESC.<br />**RPM Sensor** - The nexus has an RPM input. The Yellow RPM signal wire from the ESC is plugged into this port. Enabling this toggle enables the RPM so it can be used for the [**Governor**](/docs/configurator/tabs/governor.md) and [**RPM Filtering**](/docs/setup/rpm-filters.md)<br />**Main Rotor Gear Ratio** - The M4 is a direct drive Helicopter so is set to `1 / 1`<br />**Tail Rotor Gear Ratio** - Counting the teeth on the M4 gears is `22 / 99`<br />**Main Motor Pole count** - The M4 motor has 42 poles `42`

note

If your helicopter has a two stage gear train, please [**follow this guide**](/docs/setup/two-stage-gear-train-ratios.md)

![Example 1](/assets/images/example-1-9-9bd5c6541730a09092f5427d7f46fa1b.png)

**Governor Mode** - Set this to "Mode 1". This will control the Headspeed and provide slow spoolup.<br /><!-- -->See the [**Governor setup**](/docs/configurator/tabs/governor.md) for details and examples.

![Example 1](/assets/images/example-1-10-9d2ee6e5d5d45f0b38a6ceec29752013.png)

## Test motor and Telemetry[​](#test-motor-and-telemetry "Direct link to Test motor and Telemetry")

Now you can check and confirm your motor runs.

caution

This step MUST be done with blades off!!

Enable the motor override and slowly raise the motor override signal. The Motor should begin to spool up and RPM and other ESC telemetry should be displayed.

![Example 1](/assets/images/example-1-11-979bb5e8fc2ea59948c5e9288c434e95.png)

## Power setup[​](#power-setup "Direct link to Power setup")

Since we now have ESC telemetry working we can enable ESC Telemetry as the Voltage and current source.\\

![Example 1](/assets/images/example-1-14-824ee2cd94aaff84ee9d76587ceae11f.png)

## ELRS custom telemetry[​](#elrs-custom-telemetry "Direct link to ELRS custom telemetry")

Since Rotorflight v2.1 ELRS will need to use the custom telemetry Lua. The Crossfire protocol is very limited for our helicopters so this is required to get the full range of telemetry that we may wish to see.<br /><!-- -->See the [**ELRS Custom Telemetry**](/docs/setup/elrs-custom-telemetry.md) on how to set it up.

## RPM Filters[​](#rpm-filters "Direct link to RPM Filters")

From the Gyro tab enable the RPM filters and accept the default.

![Example 1](/assets/images/example-1-12-1f908843cef7d4e9f132ca08336d9ada.png)

## Rates[​](#rates "Direct link to Rates")

Review and modify your Rates to taste.

![Example 1](/assets/images/example-1-13-32a87ba74f2820dbd799a83f01507fbd.png)

## Pre-flight test[​](#pre-flight-test "Direct link to Pre-flight test")

Check and confirm all your controls are functioning. Pay particular attention to:

* When connected to the configurator the model moves in the same way as the real helicopter (tilt forward/backward, sideways and yaw).
* Tx stick forward, helicopter swash pitched down
