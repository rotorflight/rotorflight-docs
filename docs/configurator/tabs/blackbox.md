# Blackbox

## What is Blackbox[​](#what-is-blackbox "Direct link to What is Blackbox")

Blackbox is a flight data recording feature in Rotorflight. A Blackbox log contains a lot of data, such as the attitude of the heli, gyro sensor measurements, PID data, RC commands, motor outputs etc. It’s an extremely powerful tool for tuning and troubleshooting the heli.

## Blackbox data can be logged to:[​](#blackbox-data-can-be-logged-to "Direct link to Blackbox data can be logged to:")

* A flash chip on the FC. Logging is fast, but storage is limited, unless you are using a dedicated RF controller(FlyDragon F7 has 128MByte Flash), and copying log files can be slow.
* An SD card on the FC, it's fast and storage is only limited by the capacity of the SD card.
* An external logging device: [OpenLager](/rotorflight-docs/docs/setup/openlager.md). These devices write the log to a micro SD card.

A flash chip or an SD card on the FC are nice, but if your FC doesn't have that you can connect an OpenLager logging device.

![Blackbox Tab](/rotorflight-docs/assets/images/blackbox-main-665333b013a8ce1507b3ba3b4a00834e.png)

## Blackbox Configuration[​](#blackbox-configuration "Direct link to Blackbox Configuration")

![Blackbox Tab](/rotorflight-docs/assets/images/blackbox-config-233b7ce7a8411dddfdcb05c35f322a7e.png)

### Logging Device[​](#logging-device "Direct link to Logging Device")

Here you can select the device type.

* **No Logging**: Disable Logging.
* **Onboard Flash**: Log to the onboard flash chip (if available).
* **SD Card**: Log to the onboard SD Card (if available).
* **Serial Port**: Log to an external logging device (eg. [OpenLager](/rotorflight-docs/docs/setup/openlager.md)).

### Logging Mode[​](#logging-mode "Direct link to Logging Mode")

Select the preferred logging mode.

* **No Logging**: Disable Logging.
* **Normal**: Start logging when both [**ARM**](/rotorflight-docs/docs/setup/arming.md) and [**BLACKBOX**](/rotorflight-docs/docs/configurator/tabs/modes.md#blackbox) switches are active.
* **Armed**: Start logging when [**ARM**](/rotorflight-docs/docs/setup/arming.md) switch is active.
* **Switch**: Start logging when [**BLACKBOX**](/rotorflight-docs/docs/configurator/tabs/modes.md#blackbox) switch is active.

### Logging Rate[​](#logging-rate "Direct link to Logging Rate")

The log data is saved to the logging device with this rate. For logging to an external device, lower speed may be required.

Set it to 2kHz for OpenLager.

### Disarm Grace Period[​](#disarm-grace-period "Direct link to Disarm Grace Period")

Continues to log after disarming for this period. This can be valuable for saving crash data.

### Initial Erase[​](#initial-erase "Direct link to Initial Erase")

If the data storage is full the FC will delete this amount if data on boot so that there is enough room for the next flight. **note** Logging will not begin until this has completed. This may take some extra time with some slower flash chips.

### Rolling Erase[​](#rolling-erase "Direct link to Rolling Erase")

Setting the slider will begin to delete older files when the storage is full so that the current flight data can be recorded.

### Debug Mode[​](#debug-mode "Direct link to Debug Mode")

Choose what *extra* data is being logged, eight extra debug items are added to the Blackbox Log.

note

Under *Blackbox debug mode* you can specify what should be logged. There are a lot of choices, but you can select *GYRO\_SCALED* for PID tuning, *GOVERNOR* for analyzing the governor or *CYCLETIME* if you're interested in CPU time.

### Debug Axis[​](#debug-axis "Direct link to Debug Axis")

Choose which *axis* is being debugged. Applies to some of the debug modes.

## Blackbox Logging Options[​](#blackbox-logging-options "Direct link to Blackbox Logging Options")

![Blackbox Tab](/rotorflight-docs/assets/images/blackbox-options-35b04c2ab4a4e4a9535e0d9e7890af16.png)

Here you activate the parameters that you want to log.

For general use activate the following options `Command` `Setpoint` `Mixer` `PID` `Raw Gyro` `Gyro` `Battery` `RSSI` `RPM` `Motors` `Servos`.

## Onboard dataflash chip[​](#onboard-dataflash-chip "Direct link to Onboard dataflash chip")

![Blackbox Tab](/rotorflight-docs/assets/images/blackbox-save-2df0d9d410326961e527a63d1a5417ec.png)

* **Erase** - Erase Blackbox Data.
* **Save to file** - Download Blackbox Data.

## Mass Storage Mode[​](#mass-storage-mode "Direct link to Mass Storage Mode")

![Blackbox Tab](/rotorflight-docs/assets/images/blackbox-mass-a8df07996a750b8b04fd8e6c87c9074c.png)

# Blackbox Explorer

The log files can be read with the [Rotorflight Blackbox Explorer](https://github.com/rotorflight/rotorflight-blackbox).
