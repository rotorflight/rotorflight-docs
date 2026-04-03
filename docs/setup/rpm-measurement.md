# RPM Measurement

In order to use the Governor or RPM filters (and why wouldn't you!!) you must measure the RPM. There are two options for this:

* **RPM sensor**
* **Bi-directional D-shot**

info

RPM can sometimes also be read via ESC telemetry. However, this is at a refresh frequency that is **too slow to be used for filtering of governing**.

caution

RPM filtering is used to remove frequencies related to the rotating components. This allows a much higher tune; HOWEVER!! If the helicopter is flown in an OverSpeed condition the rotation of the one way bearing means that the RPM measurement will not be correct. If the helicopter is tuned too critically this could mean the helicopter could become out of tune resulting in unwanted oscillations.

note

* RPM Sensor
* Bi-directional D-shot

## Frequency Sensor[​](#frequency-sensor "Direct link to Frequency Sensor")

Typically it is used when the RPM is not available via ESC telemetry. Only BLHeli\_32, some BLHeli\_S and APD F3 ESCs support Dshot/KISS telemetry, so this feature is needed with a wide range of traditional ESCs.

The RPM signal is used in multiple places in the FC, e.g. in the PID control, the governor and the RPM-filter. If these features are not needed, then there is no need for the frequency sensor either.

An electrical frequency signal is provided by some ESCs, e.g. Hobbywing with the "yellow" wire. Or it can come from an RPM sensor, which is converting the motor three-phase voltages into a frequency signal - e.g. Hobbywing RPM sensor. Please refer to your ESC's or sensor's manuals how to connect them correctly.

Note about the Hobbywing RPM sensor: it's safest to power it with 3.3V, as the input voltage of the sensor is also the output voltage of the RPM signal it generates. All inputs on a STM32 MCU tolerate 3.3V, and some will also accept 5V. But if you're using a 8.4V BEC to power the sensor, you'll likely damage the MCU.

Up to two frequency sensors are supported, for acquiring motor #1 and motor #2 speed.

If both Frequency Sensor and telemetry RPM signals are available, the Frequency Sensor has precedence.

### Connection[​](#connection "Direct link to Connection")

Plug the ESC RPM wire (often yellow wire) or separate RPM sensor (Hobbywing RPM etc) into the FC RPM input.

![Frequency input](/rotorflight-docs/assets/images/frequency-connection-d2f0270e40e73c9547ea2acbfeac515b.png)

### Configuration[​](#configuration "Direct link to Configuration")

Then the frequency sensor can be turned ON with the feature flag located on the [***Motors***](/rotorflight-docs/docs/configurator/tabs/motors.md#pwm-protocol) tab.

![frequency\_2](/rotorflight-docs/assets/images/frequency_2-6a55dfd504f87303dd3ad4054ddcf8e3.png)

## Bi-directional DSHOT[​](#bi-directional-dshot "Direct link to Bi-directional DSHOT")

Several features of Rotorflight require telemetry data for the motor speed such as the Governor and RPM Filtering. One method for the FC to get this motor speed is via Bidirectional DSHOT. Bidirectional DSHOT is an ESC protocol which enables communications in both directions between the FC and the ESC. The speed command can be sent by the FC to the ESC and the ESC responds by sending the current motor eRPM (electrical RPM).

From the **Motors** tab in Rotorflight Configurator select an DSHOT ESC protocol (Recommended DSHOT300) and enable Bidirectional DSHOT. This requires ESC firmware that supports Bidirectional DSHOT.

### Supported ESC Firmware[​](#supported-esc-firmware "Direct link to Supported ESC Firmware")

* Escape\_32
* BLHeli\_32
* AM32
* BLHeli\_S
* Bluejay

#### Escape\_32[​](#escape_32 "Direct link to Escape_32")

Escape\_32 is a new ESC firmware project. Which supports Bidirectional DSHOT, see [Escape\_32 Wiki](https://github.com/neoxic/ESCape32/wiki).

***Firmware for 32-bit BLDC motor electronic speed controllers that aims for simplicity. It is designed to deliver smooth and efficient motor drive, fast transitions from a complete stop to full throttle, robust direction reversals, and maximum hardware support.***

[**Escape\_32 Wiki**](https://github.com/neoxic/ESCape32/wiki)

#### BLHeli\_32[​](#blheli_32 "Direct link to BLHeli_32")

**As of 2024 BLHeli\_32 is no longer being manufactured**<br /><!-- -->The Blheli\_32 configurator may no longer work with these ESCs. We no longer recommend these ESCs.

Bidirectional DSHOT is fully supported from firmware version 32.7.0 onward. ESCs with earlier firmware will have to be updated before speed telemetry will operate.

## More information[​](#more-information "Direct link to More information")

More details on Bidirectional DSHOT and RPM filtering at [Betaflight](https://betaflight.com/docs/wiki/guides/current/DSHOT-RPM-Filtering).

![Filter](/rotorflight-docs/assets/images/ESC_logo-728f9c40300a695afcf07ad34aa83288.png)

[**ESC Configurator**](https://esc-configurator.com/)

#### BLHeli\_S[​](#blheli_s "Direct link to BLHeli_S")

BLHeli\_S ESCs **do not support Bidirectional DSHOT**. In order to access this functionality with a BLheli\_S ESC, the firmware must be upgraded to Bluejay using the ESC Configurator.

![Filter](/rotorflight-docs/assets/images/ESC_logo-728f9c40300a695afcf07ad34aa83288.png)

[**ESC Configurator**](https://esc-configurator.com/)

#### Bluejay[​](#bluejay "Direct link to Bluejay")

Bluejay is an open source firmware for BLheli\_S ESCs which supports Bidirectional DSHOT, see [BlueJay](https://github.com/mathiasvr/bluejay). This firmware has been used successfully for several Rotorflight builds. Bluejay is capable of flashing individual settings to each ESC (tail and main) which is important when using an all in one (AIO) board. Bluejay v0.15 and later also supports disabling *damped light* (regenerative breaking), a must if your helicopter doesn't have a one way bearing. For example, a K110 will yaw/spin rapidly on throttle hold if *damped light* is enabled. Please follow the [Blheli\_S to Bluejay](/rotorflight-docs/docs/setup/blheli_s-to-bluejay.md) walkthrough.

![Filter](/rotorflight-docs/assets/images/bluejay_logo-3272ddcf195ab7d55e45ba00400f0e22.png)

[**ESC Configurator**](https://esc-configurator.com/)
