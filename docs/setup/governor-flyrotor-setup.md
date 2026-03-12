# Flyrotor Governor setup

## ESC Configurator[​](#esc-configurator "Direct link to ESC Configurator")

![](/assets/images/flyrotor-1-061d4022e7b68d73d7379e5b4175f06d.png)

The latest FlyRotor ESC Configurator for Windows is available here:<br /><https://github.com/Jiki-Mo/ESC-Configurator/>

As of 11/16/2025, version 1.2.1 is the latest.

Latest FlyRotor ESC Firmware Versions:

* FlyRotor 150a – 1.2.1
* FlyRotor 280a – 1.1.1

FlyRotor ESC’s have one of the fastest updating ESC telemetry systems in the world. This works extremely well combined with Rotorflight’s Blackbox for flight history and troubleshooting.

FlyRotor ESC Telemetry Rate: 100 Hz

![](/assets/images/flyrotor-2-b7d852578ceb0a11c927ddabf091dba8.png)

FlyRotor Hardware Wiring Overview.

* **THR:** Wh/Red/Blk: Electronic throttle cable, which supports PWM input from 20–480 Hz and has default throttle values of 1100–1940 µs.
* **RPM:** Yel/Red/Blk: ESC RPM sensor signal line.
* **NTC:** External temperature sensor port, used to detect ambient or motor temperature.

note

This is an accessory for the ESC and the port does not have polarity. It can be plugged in either way.

![](/assets/images/flyrotor-3-70877f922bf10ac243a32096d2131a2e.png)

* This port is for powering the ESC cooling fan and for ESC telemetry communication.
* **G:** GND, **V:** Fan positive terminal, **T:** Telemetry or programming.

note

The T pin should be wired to a Rotorflight UART TX pin.

* If you are wired to a UART RX pin (e.g. RF007/TLM port) then “Rx/Tx Pin Swap” should be enabled under **Motors → ESC-Motors** tab.
* You also need to enable “one-wire communication half-duplex” to allow bidirectional communication between the FBL and ESC. This is required for Forward Programming from Rotorflight to FlyRotor ESC.

![](data:image/png;base64,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eActlkRf/fYiMu73cnjbJp4N9haz18u5lSpnOxGP5FBe66S+NJP43j3UnTQ2HCsXxc+XU/dZDMkbq/zPjRQcMcDOEqqOupmT7Du35Vnx9P6/SlwB643Y+TrOEzD/yTLqa6vI/2FAXb+DeTy77Qje+9dSst1J/bYcHJYWaorzKRvp7m+jUPP7dryWOBxD7nw2SqM5tusRsLC+uiif9Ieg5eBW1q8rIfCG02X/vAPXlzGkF1VRX1vFllQrDbtdXNENTzOHz9jJKvU9H7MehKaaLeTsHOFN5Sqv0bAlOWQut9Hp3Erh0T7fa+KlV3FhJ/3p/lsBr8Q+OwL3B/XsGWEXIiIiX2d3nawjrC+4ADAeer2X2fJuDxeD6NILx77gGx/8GwR5PGEPP/LtKy4HJk+ZYiwSuQnFs7mqgHh3NWuzK0f3JYV/jnIrqH/kDGXj8UWhI7A9WUpFuoUjz/wNBVrsLiIiN6nWu7/PR9FLg/p28/GS8+A0/m5hBJNG2aWXf99L9a8Pcnfr3jEFrHNnzw78fENGSES+nhp4fpcL77yVZAczSiIjSCH3+/P58mg1hQojIiJyE4v906+5s+NIUNOcxkvJ73rY+NbnfHb+6n3q8fbx7G8+DyqMGGmERORmF4IREhERERnUPWsRH851cHbyyIsCvmoRplt4Yt7tJMVMZkGkiemmMHq8fbzn9uI8dY6df+hixomDWD95J6hAFThCokAicrNTIBEREZkQumct4tOZ99EbcSfnTdPpC5s4k5nC+i4T7u0hovdjIt3vYQ1yAXs/BRIREREREQkZrSEREREREZEJQYFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCRoFERERERERCJuzhR77dZyycPGWKsUhERERERMZR96xFfDrzPnoj7uS8aTp9YRNn7CCs7zLh3h4iej8m0v0e1k/eJazvihgxaufOnh34WYFERERERCSEumct4sO5Ds5OthirQibCdAtPzLudpJjJLIg0Md0URo+3j/fcXpynzrHzD13MOHEQ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gxpJGE91p85z2Vg4Bs72c1hOvw9BbGUcAgl0bq/kcIcZ++P5xANEp1CyLh5TYyX5ZfUU/HI/nbNXU5gbD6xkWayFzuOvU2fc0FXFk/sPq4k7XU/Rc3uoeaka16R4sopSrhiZ+UqtWU9exmri+xezz1tJduky5njbaTrkK+p8s51O8wLi55oGR0Iox3XSROxDCzB3t1PnX+x/uNsNZhsLVsQCVuyp+RQ/OswdvKIWk/X0SuIA28IUNv/IjuWLJg5tNzYUERERkVCK+vQYk89/ZiwOqV+d+E8+Pz/2MIF/utau413M+uRdwoIIWuMSSMBFwV4XnqjFZGQ9QOrTadhxUfWSf63G0RLK3uzC5lhP3jMrsVu6aN53zdUfQ8TnZuKI6mLfLwt93wbfsYPiGhcsTCM34Ja4X7kpMcQnZ7Jlm3+9R+l6HJYWaoo3UXzM3+bYIdrdJkymVlxlgw/d88dWTFNMuD88NLAWprO4nN0nzCzLLaO+1ne734bietoGHwaA5/gR3IsyKa91Ul2USfykJmqKNwysQxERERGRieOuk3WE9QUXAMZDr/cyW97t4WIQXXrh2Bd844N/gyCPJ+zhR759RYyZPGWKsUgmsNwKJ4+eKecHG8a+BkdEREREQqP17u/zUfTSoL7dfLzkPDiNv1sYwaRRdunl3/dS/euD3N26d0wB69zZswM/j9MIiYiIiIiIXE3sn37NnR1HgprmNF5KftfDxrc+57PzV+9Tj7ePZ3/zeVBhxEiBREREREQkRGL/9Gvu+2AHU865jVUh89oHX/JwTRebG77gN53n+cLrCyc93j4aus5T8M4X/NW/nODtPf+Hu1v3XFcYQVO2vh40ZUtERETkz1/3rEV8OvM+eiPu5LxpOn1hE2fsIKzvMuHeHiJ6PybS/R7WIBew9wucsqVAIiIiIiIiXymtIRERERERkQlBgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgUREREREREJGgURERERERELmikASZiwQEREREREZJ1cEkj7g8qVLxmIREREREZHrZswaVwQSgEsKJCIiIiIiMg6MWWPEQHLp4kVjsYiIiIiISNAuXbw4ukACcOHCBS54vVcMqYiIiIiIiIzF5UuXuOD1cuHCBWMV/x8GKT/nGX1nbQAAAABJRU5ErkJggg==)

* This USB port is the communication port between the ESC and the computer, and it supports USB 2.0 and C-to-C cables. This is required when using the FlyRotor Configurator app to make settings changes or firmware updates.

![](/assets/images/flyrotor-5-33b5a4106025be6a35487680b36a8a1b.png)

## FlyRotor ESC Configurator – Order of Operations[​](#flyrotor-esc-configurator--order-of-operations "Direct link to FlyRotor ESC Configurator – Order of Operations")

note

As of FlyRotor Configurator v1.2.1, the application will automatically read ESC parameters upon successful connection. Prior to v1.2.1, you needed to manually click “Read Parameters” after a successful connection.

![](/assets/images/flyrotor-6-c97da5332876bc52043918213d32cc63.png)

1. Scan Ports
2. Connect to ESC
3. Read Parameters (if using app < 1.2.0)
4. Make changes in setup tabs
5. Write Setup
6. Done!

## FlyRotor ESC Configurator – Basic Setup[​](#flyrotor-esc-configurator--basic-setup "Direct link to FlyRotor ESC Configurator – Basic Setup")

* Change ESC Mode to **RF Gyro Governor** when using Rotorflight Mode1 Governor.
* FlyRotor ESC uses the concept of **electrical angle**, which differs from the “advance angle/motor timing” of other ESCs. The default automatic mode is geared towards high performance.
* If you want a smoother ride, or to fine-tune the motor to its optimal drive state (for non-standard motors), you can select a suitable fixed electrical angle value, which supports 1–10 degrees.
* If the motor temperature is high during flight, please increase this value.
* It is recommended to use the automatic mode, which will dynamically adjust the electrical angle value based on the current speed of the motor and the temperature value of the ESC.

![](/assets/images/flyrotor-7-476a0732603160ef7f64cc4f7b9a4917.png)

* For **RF Gyro Governor** or **Linear Throttle** ESC modes: the **Starting Torque** setting can be lowered if experiencing a tail whip/kick symptom upon motor spool-up.
* The default value is 5. If the starting force is too high, it is recommended to decrease this value to 2 and retest.

![](/assets/images/flyrotor-8-4ecd03be71a4a361fa1437d104f99da3.png)

## FlyRotor ESC Configurator – Advanced Setup[​](#flyrotor-esc-configurator--advanced-setup "Direct link to FlyRotor ESC Configurator – Advanced Setup")

* Gov P/I only apply when using the FlyRotor internal governor.
* **Drive Frequency** should be left at 16 kHz for helicopters with 40, 42, 45, 47, 50 pole brushless outrunner motors.
* **Motor ERPM Max** is required for **RF Gyro Governor** or **FlyRotor Governor** ESC modes.
* The Voltage/KV/Poles settings must be entered to calculate this value.
* You must use the **Speed Calculator** to determine if your target RPM is feasible and/or throttle value % is sufficient for governor functions.
* Recommended throttle is 75–85% with 15–25% reserved for governor authority.

![](/assets/images/flyrotor-9-f6882427362264c0ea9d690ea20407c6.png)

## FlyRotor ESC Configurator – Other[​](#flyrotor-esc-configurator--other "Direct link to FlyRotor ESC Configurator – Other")

* Choose **RF FLYROTOR** when integrating with Rotorflight for ESC telemetry protocol.

![](/assets/images/flyrotor-10-f0dc39870743ca80326f40b2a1333c26.png)

“TBS – CRSF” telemetry protocol was added for the following use cases:

* Using an ELRS receiver to fly a helicopter where the flight controller is not Rotorflight.
* Using an ELRS receiver to fly a fixed-wing aircraft or other model aircraft.

![](/assets/images/flyrotor-11-0be9f4ae57cf2fe8bea7c50fbbb0454d.png)

## FlyRotor ESC Configurator – Logging[​](#flyrotor-esc-configurator--logging "Direct link to FlyRotor ESC Configurator – Logging")

* Shows logging values from previous ESC flights as well as alarms or events that may be of interest.

![](/assets/images/flyrotor-12-72f24ea181c5ce957b0001ae3172621c.png)

## FlyRotor ESC Configurator – Settings/Update[​](#flyrotor-esc-configurator--settingsupdate "Direct link to FlyRotor ESC Configurator – Settings/Update")

* Use this tab to check for ESC firmware and Configurator version updates.

![](/assets/images/flyrotor-13-2cb1e5d96a0a51b030d6b3a68ce4b4cf.png)

## Calibrating FlyRotor throttle endpoints using Rotorflight – Motor Override[​](#calibrating-flyrotor-throttle-endpoints-using-rotorflight--motor-override "Direct link to Calibrating FlyRotor throttle endpoints using Rotorflight – Motor Override")

* The default PWM throttle values for FlyRotor ESCs are:

  <!-- -->

  * 0%: 1100 µs
  * 100%: 1940 µs

![](/assets/images/flyrotor-14-7021735822de6592b56fd493b48737e5.png)

* You should update these values in the Rotorflight **Motors** tab for 0% and 100% throttle PWM values to match FlyRotor defaults (1100/1940 µs).

![](/assets/images/flyrotor-15-5345eb9fbac1233a7a345e26d8e9ea19.png)

Note: This procedure is required only if you need to teach the FlyRotor ESC new throttle endpoints.

1. Remove main and tail blades from the helicopter (*safety first*).
2. Connect RF gyro to computer, start the Rotorflight Configurator, and go to the **Motors** tab.
3. Enable **Motor Override** and set to 100%.
4. Connect battery to FlyRotor ESC and wait for multiple beep tones to confirm.
5. Lower throttle to 0% in Motor Override and wait for beep confirmation.
6. Disable Motor Override.

![](/assets/images/flyrotor-16-e5b7c592eb36e3c5a358a771a3b2ee23.png)

## FlyRotor ESC – Motor temperature sensor feature overview[​](#flyrotor-esc--motor-temperature-sensor-feature-overview "Direct link to FlyRotor ESC – Motor temperature sensor feature overview")

* Within the FlyRotor Configurator, you must **Enable** Motor Temperature Sensor (default is **Disabled**).

![](/assets/images/flyrotor-17-96fee9241abc2e6d13ad17fb740f86f3.png)

* You should adjust the Motor Temperature Limit between 90–125 °C. When this limit is reached, the ESC will limit throttle output to 50% to prevent overheating.
* Note: Most copper motor wire insulation will start to burn at around 150 °C.

![](/assets/images/flyrotor-18-2c4a2c98bd7138adc1fc4f812dceb462.png)

* The optimal location for the temperature sensor is depicted below.

![](/assets/images/flyrotor-19-1b29eb46d27dccae1c8f873082bd9fb3.png)

* Use a high-temperature, thermally conductive adhesive to secure the thermistor and prevent it from moving during flight. For example, **Kafuter K-5204K**.

![](/assets/images/flyrotor-20-0b3560f1357fe3dd877d7280ba9300de.png)

Example picture: Motor temp sensor installed in Goosky RS5 helicopter.

![](/assets/images/flyrotor-21-04081f9036c78506b0c9f71256b16363.png)

## FlyRotor ESC – Battery capacity limit feature overview[​](#flyrotor-esc--battery-capacity-limit-feature-overview "Direct link to FlyRotor ESC – Battery capacity limit feature overview")

* This feature is intended for setups without telemetry support.
* When the ESC reaches the programmed capacity limit, it automatically reduces throttle output to 50% as a safety measure to protect the battery.
* This feature is activated when a non-zero value is entered in **Capacity Limit**.

![](/assets/images/flyrotor-22-87ec621a55cabc2170bf4c4b12e7bb60.png)

These settings were taken from a 700-class RC helicopter and are provided as an example. You may need to adjust them to suit your specific setup.

## Rotorflight Profile – PIDs[​](#rotorflight-profile--pids "Direct link to Rotorflight Profile – PIDs")

![](/assets/images/flyrotor-23-4c92abd5e5428ade45149a7109f1fb33.png)

## Rotorflight Profile – Tail rotor settings[​](#rotorflight-profile--tail-rotor-settings "Direct link to Rotorflight Profile – Tail rotor settings")

![](/assets/images/flyrotor-24-b9eb44f20f67aa2ceab85304fb380351.png)

## Rotorflight Profile – Governor settings[​](#rotorflight-profile--governor-settings "Direct link to Rotorflight Profile – Governor settings")

* If the RF Gov PID Master Gain or P-gain is too high, the head speed will oscillate or surge.
* If the P-gain is too low, the system will bog or droop under load.

![](/assets/images/flyrotor-25-8b840f41c4cd897e39f1c200828c13c4.png)

## Rotorflight Motor tab – Governor features[​](#rotorflight-motor-tab--governor-features "Direct link to Rotorflight Motor tab – Governor features")

* Change the **Governor Handover Throttle** from 20% to 10%.

![](/assets/images/flyrotor-26-9e2548905ed81a58ef7cc7821416020e.png)

## Rotorflight – Receiver – Telemetry sensors[​](#rotorflight--receiver--telemetry-sensors "Direct link to Rotorflight – Receiver – Telemetry sensors")

* For FlyRotor 155A / 280A ESCs (150A is not supported), a thermistor is provided to directly measure the motor temperature.
* You need to enable **ESC Temp 2** to pass this to the radio telemetry link.
* The radio-side telemetry item will show as **BecT**.

![](/assets/images/flyrotor-27-2322aff9168d00cfb86418cb955ff596.png)
