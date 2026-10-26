# Flashing the Firmware

Firmware is flashed from the Configurator's **Firmware Flasher**, opened with
the **Update Firmware** button at the top right. You can flash with nothing
connected, or after connecting to a board that is already running Rotorflight
or Betaflight.

![Firmware Flasher with the board and version pickers at the top](../assets/images/configurator/firmware-flasher.png)

## How Rotorflight firmware is built

Rotorflight uses *unified targets*: there is one firmware file per processor
family (STM32 F4, F7, G4 and H7), and a small *board configuration* that
tells the firmware which pins drive the servos, motors, UARTs and sensors on
your particular board. The Configurator combines the two when it flashes, so
you only ever pick your **board** -- the right firmware comes with it.

## Flashing

The flasher is a single page.

1. **Back up** your configuration first -- see
   [Backup & Restore](backup-and-restore.md). Flashing does not keep a copy
   for you.
2. Pick your board in **Choose a Board**, or connect to the flight controller
   and click **Detect** to read it from the board. Detection needs a normal
   serial connection, not DFU.
3. Pick a version in **Choose a Firmware version**. **Releases** shows
   release builds; switch the build type to see development builds.
4. Click **Load Firmware [Online]** to fetch it, or **Load Firmware [Local]**
   to use a `.hex` file you already have.
5. Tick **Full chip erase** if needed (below), then click **Flash
   Firmware**. The progress bar at the bottom shows the flash.
6. When it finishes, connect and restore your backup from the
   [CLI](../configurator/tabs/cli.md) tab.

!!! warning "Updates can reset your configuration"
    When a new firmware finds settings it cannot read, it discards them and
    starts from defaults. Between major versions some settings also change
    meaning. Always take a backup, and read the
    [Upgrade Notes](upgrade-notes.md) before restoring an older backup onto a
    new major version.

!!! tip "When to use Full chip erase"
    Use it when moving a board from Betaflight to Rotorflight, when moving
    between major Rotorflight versions, and whenever the Configurator
    recommends it (for example if the board name stored on the board is
    wrong). It does no harm if you have a backup to restore.

## DFU mode

All supported flight controllers can be flashed through the STM32's built-in
DFU (Device Firmware Upgrade) bootloader. The Configurator normally reboots
the board into DFU for you. If that fails, enter DFU by hand:

1. Unplug the board.
2. Hold the **BOOT** button (or bridge the boot pads) while you plug in USB.
3. Pick **DFU** in the port list at the top right.
4. Choose your board manually, load the firmware and flash.

A DFU connection is enough to flash, but board detection needs a normal
serial connection.

The STM32 bootloader lives in ROM, so a flight controller cannot be
"bricked" by a bad flash -- you can always get back to DFU with the BOOT
button. **Exit DFU Mode** at the top right restarts a board that is sitting in
DFU.

## USB drivers

macOS, Linux, Android and the web Configurator need no extra drivers. On
Windows with the desktop app:

- For the normal serial connection, install the
  [STM32 Virtual COM Port driver](https://www.st.com/en/development-tools/stsw-stm32102.html)
  if the board doesn't show up as a COM port.
- For DFU, the *STM32 BOOTLOADER* device needs the **WinUSB** driver. Put the
  board in DFU, run [Zadig](https://zadig.akeo.ie/), choose *Options > List
  All Devices*, select *STM32 BOOTLOADER* and install **WinUSB**.
- The [ImpulseRC Driver Fixer](https://github.com/ImpulseRC/ImpulseRC_Driver_Fixer/releases/tag/v1_forever) fixes
  most driver problems in one step.

## Troubleshooting

**Stuck at "Initiating reboot to bootloader", or "Rebooting device to
bootloader: FAILED".**
The board didn't come back in DFU, or Windows has no driver for it. Enter
DFU by hand (above) and check the DFU driver.

**The board no longer connects over USB after flashing.**
Usually the wrong board was selected, so USB isn't where the firmware
expects it. Enter DFU with the BOOT button, enable **Full chip erase** and
flash again with the correct board.

**My board isn't in the list.**
Check the [Hardware](../hardware/index.md) pages. Betaflight boards that
aren't listed can often run Rotorflight with a custom board configuration --
see [Betaflight FC (DIY)](../hardware/betaflight-diy.md).
