# Matek G474Heli

![Matek G474HELI](/rotorflight-docs/assets/images/matek-g474-6ee4a56052ce7a151c2a3064406b2147.png)

Specifications

### Hardware Specifications：[​](#hardware-specifications "Direct link to Hardware Specifications：")

MCU: STM32G474CE<br /><!-- -->IMU: ICM42688-P<br /><!-- -->Black Box: W25N01G (128MB)<br /><!-- -->Baro: SPL06 (I2C2）<br /><!-- -->LED: LED\_STRIP port<br /><!-- -->Beeper: Buzzer output<br /><!-- -->USB: Type-C<br /><!-- -->UARTS: UART1, UART2，UART3<br /><!-- -->I2C: I2C1<br /><!-- -->ADC: Battery measurement VBat 2-6s (5.4-30v) Servo Pins: CH1-CH4<br /><!-- -->Motor Pins: M1, M2<br /><!-- -->RPM Inputs: RPM Frequency input<br /><!-- -->Onboard BEC: 5 or 7.2v selectable (disable using bridge if using external BEC)<br /><!-- -->Dimensions: 38mm x 26mm x 13mm<br /><!-- -->Weight: 15g

### Rotorflight Target[​](#rotorflight-target "Direct link to Rotorflight Target")

When updating Rotorflight firmware. Please use the MATEKG474HELI target.

![Matek G474Heli Target](/rotorflight-docs/assets/images/g474-target-66d10567a28b3492d5ce025e81735eb6.png)

### Wiring[​](#wiring "Direct link to Wiring")

![Wiring Diagram](/rotorflight-docs/assets/images/g474-wiring-bc40e48b2da022a88838bea287ec5b97.jpg)

### UART ports[​](#uart-ports "Direct link to UART ports")

![UARTS](/rotorflight-docs/assets/images/mt-uarts-94be99f37528279566a1d4e5c025e168.png)

![UARTS](/rotorflight-docs/assets/images/mt-ports-fba5f20a070078014ca4793ae7879158.png)

### Onboard BEC[​](#onboard-bec "Direct link to Onboard BEC")

The Matek G474Heli contains a 5A-8A peak, Variable voltage (5v or 7.2v) BEC to supply the servos. The BEC will supply 5v by default and 7.2 v when the solder bridge is connected. THis is powered by the VBat connection.

caution

If using an external BEC the internal BEC MUST be disabled via the \[Vx Off] solder bridge.

![BEC](/rotorflight-docs/assets/images/mt-bec-aae2120379facd3839f1133dbdeda8ee.png)

### Manuals[​](#manuals "Direct link to Manuals")

Detail specifications and documentation available at the Matek website.<br />[Matek G474-HELI website](https://www.mateksys.com/?portfolio=g474-heli)
