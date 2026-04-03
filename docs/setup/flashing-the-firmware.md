# Flashing the firmware

## Install Rotorflight Configurator[​](#install-rotorflight-configurator "Direct link to Install Rotorflight Configurator")

Start by downloading and installing the latest [Rotorflight Configurator release](https://github.com/rotorflight/rotorflight-configurator/releases).

This walk-through uses Windows, but it should also work on Linux or MacOS.

## Install Drivers[​](#install-drivers "Direct link to Install Drivers")

On Windows, download and install the [STM32 Virtual COM Port Driver](https://www.st.com/en/development-tools/stsw-stm32102.html).

Driver issues

If there are issues connecting to the flight controller please download the [ImpulseRC Driver Fixer](https://github.com/ImpulseRC/ImpulseRC_Driver_Fixer).

![DriverFixer](data:image/png;base64,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)

## Flash Firmware to FC[​](#flash-firmware-to-fc "Direct link to Flash Firmware to FC")

Connect the FC to your computer with an USB data cable. Now you are ready to install the Rotorflight firmware to your FC. There are five different versions of the firmware, each version targeting a specific microprocessor: F405, F411, F7X2, F745, and H743. Your FC must use one of those processors. Besides firmware, each FC has it's own configuration. The configuration specifies the FC board, e.g. what pads are used for what.

### Step 1.[​](#step-1 "Direct link to Step 1.")

Open the Rotorflight configurator and click on **Update Firmware**.

* Choose **All release and Snapshots** from the dropdown. **Note:** ***Snapshots are for development and testing purposes. They may contain bugs!! We recommend using snapshot firmware with care and to assist the project with testing. Choose "Releases" if you would rather use the latest stable firmware***
* Select the Target you identified in Step 1. You can also click on the "detect" button to auto detect the target.
* Select Full chip Erase, this will remove all previous configurations.
* Click on **Load firmware\[online]**

![Flashing](/rotorflight-docs/assets/images/flash-2-bf2f672d6137f8a4f989168d041728fc.png)

### Step 2.[​](#step-2 "Direct link to Step 2.")

* Check and confirm the target board is correct.
* Click on **Flash Firmware**.

![Flashing](/rotorflight-docs/assets/images/flash-3-3caa3b107fac9ebe864eff4b77ec1b40.png)

### Step 3.[​](#step-3 "Direct link to Step 3.")

* When the programming is successful click on **Connect**.

![Flashing](/rotorflight-docs/assets/images/flash-4-453cd5acf97707f4ac440eff700bb103.png)

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### 'Initiating reboot to bootloader' hangs[​](#initiating-reboot-to-bootloader-hangs "Direct link to 'Initiating reboot to bootloader' hangs")

If you're on Windows and it hangs while displaying *Initiating reboot to bootloader*, you'll need to install the proper driver for the *STM32 BOOTLOADER* device.

* Make sure the device *STM32 BOOTLOADER* is installed and showing up in the *Device Manager*, either under *Other Devices* or under *Universal Serial Bus devices*. Select *View > Show Hidden Devices* in order to see all installed devices.
  <!-- -->
  * You might need to uninstall all *STM Device in DFU Mode* devices under *Universal Serial Bus Controllers* before Windows will install the *STM32 BOOTLOADER* device. Make sure to check *Delete the driver software for this device*.
* In the Configurator, go to the *CLI* tab and type `dfu`. This puts the FC in Device Firmware Update mode.
* Download and start [Zadig](https://zadig.akeo.ie/), select *Options > List all Devices*, select *STM32 BOOTLOADER* and change the driver to WinUSB. *Flash firmware* should now work.

![Flashing](/rotorflight-docs/assets/images/flash-5-43a28b0686f5586a51813c07c9e1c5cf.png)

### Error 'Rebooting device to bootloader: FAILED'[​](#error-rebooting-device-to-bootloader-failed "Direct link to Error 'Rebooting device to bootloader: FAILED'")

If you receive the error *Rebooting device to bootloader: FAILED* then you will need to manually place the FC into bootloader mode. Do this by holding down the *BOOT* button while connecting it to your computer.

### Help... that didn't work. Its bricked\![​](#help-that-didnt-work-its-bricked "Direct link to Help... that didn't work. Its bricked!")

Ok, so after rebooting you are no longer able to connect to the FC via USB. This can happen if your configuration file is not correct (USB becomes unallocated) or if you have loaded the incorrect firmware for the processor type. Don't worry: the bootloader can't be bricked, it's in ROM. You can always reload the firmware via the DFU (device firmware update) mode. Most flight controllers have a 'boot' button or pins which are used to enter DFU mode. Generally you can just enter DFU mode by pushing the button or bridging the boot pins as you plug the USB in (while the Rotorflight Configurator is open).

![Flashing](/rotorflight-docs/assets/images/flash-6-f79c1ecd3d32d2f3a685f85382bdd2ec.png)

Rotorflight Configurator will display *DFU - STM32 BOOTLOADER* at the top of the page after a successful DFU connection. Click on the *Update Firmware* and follow the steps above to re-flash the firmware as required.

![Flashing](/rotorflight-docs/assets/images/flash-7-46fd2492aec928e0d09d64f5891c8504.png)

If you still having problem connecting, install the [Impulse-RC Driver Fixer](https://impulserc.com/pages/downloads).
