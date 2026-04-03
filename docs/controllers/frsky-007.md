# FrSky Vantac RF007

![FrSky Vantac RF007](/rotorflight-docs/assets/images/007-overview-f73de3e72dc38f7e5eaaf5cc85756a60.png)

Specifications

### Hardware Specifications[​](#hardware-specifications "Direct link to Hardware Specifications")

* Flight Controller Firmware: Rotorflight 2.x

* Dimension: 43.5×31.2×13.7mm

* Weight: 25.2g

* Receiver Options:

  <!-- -->

  * RF007 ARCHER+: Built-In 2.4G Archer Plus RS Receiver
  * RF007 TWIN: Built-In Dual 2.4G TW R6 Receiver

* Operating Voltage Range: 5-16V

* Operating Current (FC Only): 125mA\@5V

* Voltage Measurement Range via AIN (External device): 0-80V

* RxUG Port: For Upgrading Internal RX Firmware (In case of OTA upgrade failure. **Note:** When powering this RxUG port, do not introduce additional power input from other ports to ensure the safe operation of the connected devices.

* MCU: STM32F722RET6

* Gyroscope (IMU): ICM-42688P

* Barometer: SPL06-001

* Blackbox Flash: 128MB

* Servo Ports: Servo 1, Servo 2, Servo 3, Tail

* ESC Ports: ESC (Throttle), RPM (Sensor), TLM (ESC Telemetry or other functions)

* Other Ports: AUX and SBUS Out/In

* Expansion Ports: Port A, C, and RxUG

### Features[​](#features "Direct link to Features")

* Runs Rotorflight 2.x Helicopter Control Software
* Built-In FrSky FBUS-Capable Receiver (TW or AP Protocol)
* Robust CNC Aluminum Case, Functional Heatsink for MCU
* STM32F722 Microcontroller for Power and Flexibility
* Precision Barometer, 3-Axis Gyroscope and 3-Axis Accelerometer
* 128MB Blackbox Function for Tuning/Troubleshooting
* 9 Primary Main Header Pins for Flexibility and Power Distribution

### Rotorflight Target[​](#rotorflight-target "Direct link to Rotorflight Target")

When updating Rotorflight firmware. Please use the VANTAC\_RF007.

![FrSky Vantac RF007](/rotorflight-docs/assets/images/007-target-cf0c478bc5bb7dc6edb4105921d8c6a0.png)

### Wiring[​](#wiring "Direct link to Wiring")

![FrSky Vantac RF007 ports](/rotorflight-docs/assets/images/007-ports-4fb51a271e961d9f1c3f400b30b2231e.png)

### UART ports[​](#uart-ports "Direct link to UART ports")

All the UARTS on the Vantac 007 are labeled to match each port. Just enter the function you wish to use for each port such as SerialRx (receiver), ESC Telemetry, blackbox, GPS etc.

![Frsky UARTS](/rotorflight-docs/assets/images/007-uarts-4b0e19584414211aca708c467a3867f9.png)

# Pin mappings

Label | Pin | Default function -- | -- | -- RPM | A02 | RX2 TLM | A03 | TX2 AUX | B06 | TX1 SBUS out | B07 | RX1 Port A | A00/A01 | TX4/RX4 Port C | B10/B11 | TX3/RX3

### Manuals[​](#manuals "Direct link to Manuals")

[FrSky RF007 Manual](https://www.frsky-rc.com/wp-content/uploads/Downloads/Amanual/VANTAC%20RF007%20Manual.pdf)
