# XDfly Upgrade Notes

Upgrade notes for the XDFly Esc range

RF 2.2.x - XDfly Upgrade Notes Sunday, April 6, 2025 8:44 AM

## XDfly Forward Programming / Telemetry[​](#xdfly-forward-programming--telemetry "Direct link to XDfly Forward Programming / Telemetry")

### Install the XDFly app[​](#install-the-xdfly-app "Direct link to Install the XDFly app")

Connect the XDfly Bluetooth module, and install the XDfly app from either Google Play, Apple Store.

**Minimum XDfly Version (updated 4/6/25)**

|       | model | FW Version |
| ----- | ----- | ---------- |
| XDfly | 35a   | B1.1       |
| XDfly | 65a   | B2.1       |
| XDfly | 85a   | B2.1       |
| XDfly | 125a  | B1.4       |
| XDfly | 155a  | B1.7       |
| XDfly | 195a  | B1.1       |
| XDfly | 300a  | B2.1       |

### Update the ESC Firmware[​](#update-the-esc-firmware "Direct link to Update the ESC Firmware")

Xdfly App Firmware Update Procedure

1. Click Bluetooth Icon in Upper Right Corner

![](/assets/images/xdfly-1-0de5032673e2899e1e744fc08b636679.png)

* Make sure Bluetooth module is plugged into 4 pin serial port on XDfly ESC, AND throttle/BEC lines are disconnected from FC.

* The XDfly BT module will appear as "BLE-XXXX" then click "Connect"

![](/assets/images/xdfly-2-769c3abe549847038f64d72d1f0f0723.png)

* Once connected, the BT module name will appear above XDfly logo, and the BT icon will show a red ring indicating it is connected properly.

![](/assets/images/xdfly-3-391c4cd5c6c2cb4c09e9a80a04a9f45f.png)

* At the bottom of the screen tap check for updates. Once completed you will see new version highlighted in blue. Click the Update button on the far right of the blue icon.

* Wait for the update to complete 100%, and power cycle the ESC.

info

You will have to reconfigure your ESC settings like BEC voltage, Governor Type, etc.

![](/assets/images/xdfly-4-709e9c3a69a54c1d1f48f97328b002e5.png)

* On the XDfly ESC there is a 4 pin port (on the rear, or side of ESC) where the bluetooth module and esc fan are plugged into. But there are two specific pins used for various telemetry options, RX or TX.

info

Note: For Rotorflight 2.2.x releases, you will want to use the "RX" port on XDfly ESC for bidirectional support. Previously for Rotorflight 2.1.x, you would use XDfly "TX" port for "ZTW" telemetry protocol Open Rotorflight Configurator 2.2.x, goto the motors tab, and select "XDfly" ESC telemetry

![](/assets/images/xdfly-5-42aa6d8d5ad3523c815fa44cbf111171.png)

### Configure Rotorflight[​](#configure-rotorflight "Direct link to Configure Rotorflight")

Open Rotorflight Configurator 2.2.x, goto the motors tab, and select "XDfly" ESC telemetry protocol.

![](/assets/images/xdfly-6-e5517bab824155bfd482b271ab67271e.png)

* For F7 FCs (RM Nexus, FlyDragon F722, FrSky RF007) Enable one-wire (half-duplex) communications to enable bidirectional support required.

* You will need to use TX PIN on FC, if using a 3 pin servo header, then RX/TX pin swap should be enabled as well. For F4 FC's (Flywing Heli405, Betaflight Boards), an external converter would be required and these options are not enabled. Updating RF Suite LUA to 2.2.x

* Download latest RF Suite LUA 2.2.x zip file Delete existing /scripts/rfsuite folder on ETHOS radio first Finally, copy the extracted zip /rfsuite folder into /scripts folder RF Suite 2.2.x ESC Tools Usage

* Tap RF Suite Icon

![](/assets/images/xdfly-7-adebd80cd56a127fa20d594b505e5bc2.png)

* Tap ESC Tools Icon

![](/assets/images/xdfly-8-c65bdc23b81661e60f5996252cdec137.png)

* Tap XDfly Icon

![](/assets/images/xdfly-9-f01a0b9cc33bf62df435dd4d45c99e98.png)

* If everything is setup properly, the ESC will connect, and show the ESC hardware and firmware version.

info

Note: If it shows "UNKNOWN" recheck the physical connections, and RF configurations are correct.

![](/assets/images/xdfly-10-e3993d989b953723f3acd3e434b117b6.png)

* XDfly Basic Parameters

![](/assets/images/xdfly-11-9f042ea88ce3ef129d63ccdc3c22b084.png)

* Tap XDfly Advanced

![](/assets/images/xdfly-12-80e73a5e68fb20a119635802aa8b3b6c.png)

* XDfly Advanced Parameters

![](/assets/images/xdfly-13-6a4b69ab56116289bded569f41fe8f54.png)

* Tap XDfly Governor

![](/assets/images/xdfly-14-c60e363f52f5f668c700328a928062a7.png)

* XDfly Governor Parameters

![](/assets/images/xdfly-15-ac5f016731eaa680ceedefa007c3d646.png)
