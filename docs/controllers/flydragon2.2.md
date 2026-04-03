# Flydragon V2.2

![Flydragon v2.2](/rotorflight-docs/assets/images/flydragon2-2-e8de7bc86901aa8597ec7be63deebf49.png)

Specifications

### Hardware Specifications：[​](#hardware-specifications "Direct link to Hardware Specifications：")

MCU: STM32F722RET6<br /><!-- -->IMU: BMI270<br /><!-- -->Black Box: W25N01G (128MB)<br /><!-- -->Baro: SPL06 (I2C2） LED: WS2812<br /><!-- -->Beeper: 5V Active Buzzer<br /><!-- -->USB: Type-C<br /><!-- -->UARTS: UART2，UART3，UART5<br /><!-- -->I2C: I2C1<br /><!-- -->ADC: ADC1 (12S)<br /><!-- -->Servo Pins: CH1-CH4<br /><!-- -->RPM Inputs: RPM\_E (ESC RPM Wire)，RPM\_S (External RPM Sensor)<br /><!-- -->Internal Receiver: ELRS Diversity Receiver 2.4G (UART1)<br /><!-- -->External Receiver: CRSF, S.BUS, F.PORT, GHOST, SUMD, SUMH, IBUS, XBUS, XBUS/RJ01, EXBUS, PPM, MSP, DSM (Needs 3.3V step down BEC module)<br /><!-- -->BEC Voltage: 5-15V<br /><!-- -->5V Power Output: 5V-1.5A<br /><!-- -->Dimensions: 45mm x 27mm x 14.5mm<br /><!-- -->Weight: 27g

### Receiver specifications:[​](#receiver-specifications "Direct link to Receiver specifications:")

MCU：ESP8285<br /><!-- -->RF：SX1280<br /><!-- -->LAN/PA：SE2431L<br /><!-- -->Active crystal oscillator：TCXO 52MHz<br /><!-- -->Antenna：2 sticks ipex1 200mm 2.4GHz<br /><!-- -->RF frequency：2.4GHz (2400-2480GHz)<br /><!-- -->Transmit power：100mW (MAX)<br /><!-- -->Maximum accepted refresh rate：500HZ/F1000HZ<br /><!-- -->Firmware version：v3.3.2<br /><!-- -->Firmware target：FlyDragonRC 2.4 GHz / FD R24D 2.4GHz RX

### Rotorflight Target[​](#rotorflight-target "Direct link to Rotorflight Target")

When updating Rotorflight firmware. Please use the FLYDRAGONF722\_V2\_2 target.

![Flydragon V2.2 Target](/rotorflight-docs/assets/images/fd-target-77c9f45ba05d16ad6928c274094dcf60.png)

### Motorised Tail[​](#motorised-tail "Direct link to Motorised Tail")

To use the Flydragon with a motorised tail the Servo 4 needs to be remapped to Motor 2. This can be done in the CLI using the following command (just copy and past this into the CLI then push \[ENTER]).

`resource SERVO 4 none`<br />`resource MOTOR 2 C09`<br />`save`

![Flydragon V2.2 Target](/rotorflight-docs/assets/images/fd-motorised-a5c6b50fdb28ff6b04bd45f79ca4deb5.png)

### Wiring[​](#wiring "Direct link to Wiring")

![Wiring Diagram v2.2](/rotorflight-docs/assets/images/wiring-diagram-v2-59bd2947b0d8a4230d387211d5e9e8f2.png)

caution

WARNING: The RPM-S Port is powered via the internal 5V supply which is also powered during USB connection. If you have any power supplies connected or inappropriate loads you are likely to damage your board. DO NOT plug in your ESCs BEC wire into here, many BECs act like a deadshort if you attempt to backfeed them and you WILL blow out the 5V supply on your board when you connect USB if you do this. Power to the rest of the ports is all common power you can connect whatever to.

### UART ports[​](#uart-ports "Direct link to UART ports")

* UART 1 - Internal ELRS Receiver - (disable as shown below if not used)
* UART 2 - SBUS or FPORT connector
* UART 3 - Rx and Tx on Extension port
* UART 5 - Rx and Tx on GPS port (can also be used for the Receiver)

![Save](/rotorflight-docs/assets/images/fd-uarts-f3356456985d36f42573eb5b2a2e0f8b.png)

## Remapping[​](#remapping "Direct link to Remapping")

Several of the ports can be remapped for other purposes.

### Use RPM-E for Motor 1 RPM (default)[​](#use-rpm-e-for-motor-1-rpm-default "Direct link to Use RPM-E for Motor 1 RPM (default)")

`resource FREQ 1 A01`<br />`save`

### Use RPM-S for Motor 1 RPM[​](#use-rpm-s-for-motor-1-rpm "Direct link to Use RPM-S for Motor 1 RPM")

`resource FREQ 1 A15`<br />`save`

### Use both RPM-E and RPM-S[​](#use-both-rpm-e-and-rpm-s "Direct link to Use both RPM-E and RPM-S")

* RPM-E port for Motor 1
* RPM-S port for Motor 2

`resource FREQ 1 A01`<br />`resource FREQ 2 A15`<br />`save`

### remap SBUS to SERVO 5[​](#remap-sbus-to-servo-5 "Direct link to remap SBUS to SERVO 5")

`resource SERIAL_RX 2 none`<br />`resource SERVO 5 A03`<br />`timer A03 AF3`<br />`mixer input CH10 -1000 1000 1000`<br />`mixer rule 10 set CH10 S5 1000 0`<br />`save`

### remap F.PORT to SERVO 5[​](#remap-fport-to-servo-5 "Direct link to remap F.PORT to SERVO 5")

`resource SERIAL_TX 2 none`<br />`resource SERVO 5 A02`<br />`timer A02 AF3`<br />`mixer input CH10 -1000 1000 1000`<br />`mixer rule 10 set CH10 S5 1000 0`<br />`save`

## Can I use a receiver other than ELRS?[​](#can-i-use-a-receiver-other-than-elrs "Direct link to Can I use a receiver other than ELRS?")

External receivers can be connected to the SBUS, FPORT or any of the Extension UART ports (UART 3 or 5). If not using the inbuilt ELRS receiver it should be disabled.

### How to Enable/Disable the Internal Receiver:[​](#how-to-enabledisable-the-internal-receiver "Direct link to How to Enable/Disable the Internal Receiver:")

* The internal receiver is default turned on. When using external receivers, we need to turn it off. Connect the Flydragon F722 V2 to the Rotorflight Configurator. Go to CLI (command line) page:

* Command to **DISABLE** the receiver:<br />`set pinio_config = 1,1,1,1`

![disable](/rotorflight-docs/assets/images/disable-55f0e7ed8a7757cc7b2a5663153bc422.png)

* Command to **ENABLE** the receiver:
  <br />
  `set pinio_config = 129,1,1,1`

![Enable](/rotorflight-docs/assets/images/enable-c045a227745f04ea36605ea6203acf3c.png)

## Manuals[​](#manuals "Direct link to Manuals")

[Flydragon V2.2 Flight Controller Manual](/rotorflight-docs/assets/files/FlyDragonF722_v2.2_FBL_Specfications-a045a52879ba2029bf54fbf1df4126e6.pdf)<br />[Flydragon V2 Flight Controller Manual](/rotorflight-docs/assets/files/FlyDragonF722_v2_FBL_Specfications-a50f529de8b1256997df1f7a31a5d2bb.pdf)<br />[Flydragon V2 internal ELRS Manual](/rotorflight-docs/assets/files/FlyDragonF722_v2_ELRS_Receiver_Manual-2965cd18738e4b3158659a527723e436.pdf)
