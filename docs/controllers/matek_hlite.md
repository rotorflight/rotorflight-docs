# Matek G474-HLite

![Matek G474HELI](/rotorflight-docs/assets/images/matek-g474-hlite-8cda0b6f5d5511fa67b4003895036780.png)

Specifications

### Hardware Specifications：[​](#hardware-specifications "Direct link to Hardware Specifications：")

MCU: STM32G474CE<br /><!-- -->IMU: ICM42688-P<br /><!-- -->Black Box: W25N01G (128MB)<br /><!-- -->Baro: SPL06 (I2C2）<br /><!-- -->LED: LED\_STRIP port<br /><!-- -->Beeper: Buzzer output<br /><!-- -->USB: Type-C<br /><!-- -->UARTS: UART1, UART2 (Rx Only)，UART3, UART4<br /><!-- -->ADC: Battery measurement VBat 2-6s (5.4-30v) Servo Pins: CH1-CH4<br /><!-- -->Motor Pins: M1 Voltage range Vx: 4.5V\~14V<br /><!-- -->RPM Inputs: RPM Frequency input<br /><!-- -->Dimensions: 30mm x 23mm x 13mm<br /><!-- -->Weight: 9g

### Rotorflight Target[​](#rotorflight-target "Direct link to Rotorflight Target")

When updating Rotorflight firmware. Please use the MATEKG474HELI target.

![Matek G474Heli Target](/rotorflight-docs/assets/images/g474-target-66d10567a28b3492d5ce025e81735eb6.png)

### Motorised Tail[​](#motorised-tail "Direct link to Motorised Tail")

The H-Lite FC is configured with 4 servos and 1 motor. If you wish to use this board for a motorised tail it can be added in the CLI using the following command (just copy and past this into the CLI then push \[ENTER]).

`resource SERVO 4 none`<br />`resource motor 2 A06`<br />`save`

![Matek Motorised Tail](/rotorflight-docs/assets/images/mt-motorised-eafff3a6ae9dec873830956b6fba47d5.png)

### Wiring[​](#wiring "Direct link to Wiring")

![Wiring Diagram](/rotorflight-docs/assets/images/g474-hlite_wiring-4eb7a911b255a59179b503a775585a9d.jpg)

### UART ports[​](#uart-ports "Direct link to UART ports")

![UARTS](/rotorflight-docs/assets/images/mt-uarts-94be99f37528279566a1d4e5c025e168.png)

![UARTS](/rotorflight-docs/assets/images/mt-hl-ports-bfd33c6e4363dd49a400bfae70fc29f2.png)

### Manuals[​](#manuals "Direct link to Manuals")

Detail specifications and documentation available at the Matek website.<br />[Matek G474-HLite website](https://www.mateksys.com/?portfolio=g474-hlite)
