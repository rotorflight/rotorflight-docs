# ELRS Custom Telemetry

ELRS Version

There is a bug in ELRS prior to 3.5.5 that can lead to loss of control.<br />***We recommend upgrading your ELRS to 3.5.5 or higher.***

If you are using earlier versions we would recommend NOT to use third party widgets that are using MSP in flight AND.

* Use Hybrid Switch Mode,
* Use Telem Ratio 1:2 or 1:4

## Why Custom Telemetry[​](#why-custom-telemetry "Direct link to Why Custom Telemetry")

The ELRS (**which uses the Crossfire protocol**) has a limited array of parameters that can be transferred. Many of these values are not very applicable to a helicopter (as opposed to drones). Other values such as headspeed (quite important for our helicopters) are not available. In Rotorflight 2.0 returning some of our more important parameters back to the Tx was achieved by ELRS Telemetry Reuse however, this was also limited.

Custom telemetry has been implemented for ELRS in Rotorflight 2.1. This allows many more sensors that was previously not possible with CRSF. Currently there are over 100 sensors to choose from, and a maximum of 40 sensors can be used in total. With the ELRS configurable telemetry ratio, the sensors can be updated up to 20 times per second.

***Note: ‘Telemetry Reuse’ (from Rotorflight 2) has been removed as it is no longer required***

### 1. Enable CRSF custom telemetry[​](#1-enable-crsf-custom-telemetry "Direct link to 1. Enable CRSF custom telemetry")

To set up ELRS custom telemetry:

* Enable telemetry (This enables telemetry for all receiver types)

* CRSF Custom Telemetry (This enables the ELRS custom)
  <br />
  <!-- -->
  This is located under the Receiver tab in Rotorflight Configurator.

* Set the Telemetry rate. We recommend 1000

* Set the Telemetry ratio. Generally this can be between **4 and 16**

  * Note Please read the warning at the top of page. Update to ELRS 3.5.5
  * Start with 4. If you get 'telemetry lost' then increase as required.

![Telemetry Tab](/rotorflight-docs/assets/images/telemetry-1-5ec2afbe359ee09004f630516c27bea6.png)

### 2. Choose Sensors[​](#2-choose-sensors "Direct link to 2. Choose Sensors")

Next, select the sensors you want enabled. Open each group (battery, voltage current, temperature etc). Enable each parameter you wish to be visible on your transmitter.

![Telemetry Tab](/rotorflight-docs/assets/images/telemetry-3-b2d960f11bb98da796eb7663133fd1f8.png)

Please choose to suit your Radio - EdgeTX or ETHOS

* Choose Tx
* EdgeTX
* ETHOS

Rotorflight has great support for both EdgeTX and Ethos. Please choose your radio.

## EdgeTX[​](#edgetx "Direct link to EdgeTX")

![EdgeTX](/rotorflight-docs/assets/images/edgetx-logo-4a31de63bb29c6ec264fc50a3a50bab5.png)

### 3. Set ELRS Packet rate[​](#3-set-elrs-packet-rate "Direct link to 3. Set ELRS Packet rate")

Set ‘Telemetry Rate’ to match the ‘Packet Rate’ you’ve set for ELRS (500 in the example below). Then set ‘Telemetry Ratio’ to match the ‘Telem Ratio’ you’ve set in ELRS (4 in the example below). The screenshot below is from Express LRS Lua script’s main screen

![Telemetry Tab](/rotorflight-docs/assets/images/telemetry-2-5430935db080600fd592b0b17403e568.png)

### 4. Download telemetry Lua Script[​](#4-download-telemetry-lua-script "Direct link to 4. Download telemetry Lua Script")

NOTE! Lua script is required for Custom Telemetry Custom telemetry requires the radio to run a telemetry Lua script in the background. You need to install all the Lua scripts coming with the release, and then enable rf2tlm.lua as a ‘Custom Script’ in your EdgeTx model. The steps below explain how to to this and discover the newly added sensors on your EdgeTx radio.

[**Download the latest Lua script HERE**](https://github.com/rotorflight/rotorflight-lua-scripts/releases)

![Telemetry Tab](/rotorflight-docs/assets/images/telemetry-4-83b9a3e13e7b5a444c16ddbc2912bfad.png)

### 5. Add Lua to SD card[​](#5-add-lua-to-sd-card "Direct link to 5. Add Lua to SD card")

2. Copy the ‘Script’ folder from the zip file into your EdgeTx radio’s SD card (root directory). There will be a Scripts folder already in your SD card. You can safely overwrite any existing files. (Note: As with any upgrades, ensure you have already backed up your SD card in case anything goes wrong) Contents of the zip file:

![Telemetry Tab](/rotorflight-docs/assets/images/telemetry-5-18931fb2f051b80ab6c163f89fca9b31.png)

Contents of your SD card should look something like this:<br />![Telemetry Tab](/rotorflight-docs/assets/images/telemetry-6-83edba50c2d03f072e3bca8c3d64ed2f.png)

### 6. Enable Background Scripts on Tx[​](#6-enable-background-scripts-on-tx "Direct link to 6. Enable Background Scripts on Tx")

![Background script](data:image/png;base64,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)

![Background script](/rotorflight-docs/assets/images/lua-bg-script-setup-2-d5d262de10a98a3b31956395b49672a6.png)

### 7. Discover telemetry[​](#7-discover-telemetry "Direct link to 7. Discover telemetry")

* Power off your Flight Controller.
* On your EdgeTx radio, navigate to Model settings -> Telemetry page and **Delete All** sensors that you may have previously discovered. Then **Discover New** sensors
* NOW power up your helicopter for sensors to be discovered

***Important: If your sensors are not in the correct order it means the FC was already powered prior to "Discover new". Make sure the FC is powered up only after "Discovery new" is active***

![Telemetry Tab](/rotorflight-docs/assets/images/telemetry-9-31e440493060160ecb3dd82ee054808b.png)

## ETHOS[​](#ethos "Direct link to ETHOS")

![ETHOS](/rotorflight-docs/assets/images/ethos-logo-d565893f83fdd83bfa36d6df15aad088.png)

### 3. Open Rotorflight on Tx[​](#3-open-rotorflight-on-tx "Direct link to 3. Open Rotorflight on Tx")

![Telemetry Tab](/rotorflight-docs/assets/images/telem-ethos-1-b9b9d1c4e4b557d337b087bc16f43f0d.png)

### 4. Configure the external module[​](#4-configure-the-external-module "Direct link to 4. Configure the external module")

Chose ELRS protocol on your external module

![Telemetry Tab](/rotorflight-docs/assets/images/telem-ethos-2-865a8f3eda7238d885ee6c02a915a033.png)

### 5. Setup Tx[​](#5-setup-tx "Direct link to 5. Setup Tx")

Set the Packet rate and telemetry ratio to match what has been configured in the Flight controller in step 1.

![Telemetry Tab](/rotorflight-docs/assets/images/telem-ethos-3-dca90953c15048113bec1c882b592193.png)

### 6. Enable RF custom Lua[​](#6-enable-rf-custom-lua "Direct link to 6. Enable RF custom Lua")

Exit the Tx screen and navigate to the Lua icon. Select and enable the Rotorflight background task.

![Telemetry Tab](/rotorflight-docs/assets/images/telem-ethos-4-62395fcdea9fa027d70a03d31abcaeb8.png)

![Telemetry Tab](/rotorflight-docs/assets/images/telem-ethos-5-d2292883ff91523711a410848f95f0bc.png)

### 7. Telemetry[​](#7-telemetry "Direct link to 7. Telemetry")

Navigate to the telemetry page

![Telemetry Tab](/rotorflight-docs/assets/images/telem-ethos-6-2f421eae3db241d963d00169659eb9c1.png)

### 8. Sensors[​](#8-sensors "Direct link to 8. Sensors")

Discover new sensors.

![Telemetry Tab](/rotorflight-docs/assets/images/telem-ethos-7-83c8c0a06ddc689b58d815ed11796ee3.png)
