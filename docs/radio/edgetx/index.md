# EdgeTX

There are two Rotorflight Lua packages for EdgeTX radios:

| | **RFSuite for EdgeTX** | **Classic Lua scripts** |
| --- | --- | --- |
| Radios | Colour-screen radios on **EdgeTX 2.11+** (e.g. TX16S, TX15, Boxer, T15, TX12 colour) | Any OpenTX 2.3.12+ / EdgeTX 2.5+ radio, including black-and-white |
| Link | **CRSF** only -- ExpressLRS or Crossfire | S.Port, F.Port or CRSF |
| Interface | Touch, LVGL | Menu pages |
| Dashboard | Theme-able dashboard widget | Third-party widgets |
| Page | [Using RFSuite](lua-suite.md) | [Classic Lua Scripts](classic-scripts.md) |

If your radio and link support it, use **RFSuite**.

## Installing RFSuite

=== "Updater (recommended)"

    1. Download the [RFSuite Updater](https://github.com/rotorflight/rotorflight-lua-edgetx-suite-updater/releases)
       for Windows, macOS or Linux.
    2. Connect the radio by USB and choose **USB Storage (SD)** on the radio.
    3. Run the updater, choose the release track and language, and click
       **Install / Update**. Your settings and custom themes are kept.
    4. Eject the drive and unplug.

=== "Manually"

    1. Download `rfsuite-radio-install-v<version>_<language>.zip` from the
       [RFSuite releases](https://github.com/rotorflight/rotorflight-lua-edgetx-suite/releases).
    2. Copy its `SCRIPTS`, `WIDGETS`, `SOUNDS` and `TEMPLATES` folders to the
       root of the radio's SD card -- over USB storage, or with the card in a
       computer.

    To update, unpack a newer archive over the old one. Your settings live
    in `/SCRIPTS/TOOLS/rfsuite.user/`, which the archive doesn't touch.

You'll then find **RFSuite** in the radio's **Tools** menu, the
**RFSuite** and **RFSuite Service** widgets in the widget list, and a
**Rotorflight** model template in the radio's new-model dialog.

!!! note "RFSuite is newer"
    RFSuite for EdgeTX is still in development snapshots (0.x). The
    classic scripts follow the main Rotorflight releases.

Then set up the radio model: [Radio Setup](radio-setup.md).

## Reference

RFSuite's own documentation covers every page, the dashboard and
troubleshooting in detail:
[RFSuite for EdgeTX docs](https://rotorflight.github.io/rotorflight-lua-edgetx-suite/).
