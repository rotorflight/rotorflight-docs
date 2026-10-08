# Installing the Lua Suite

## 1. Download[​](#1-download "Direct link to 1. Download")

Download the suite from the [releases page](https://github.com/rotorflight/rotorflight-lua-ethos-suite/releases) (see also [Download - Ethos Tx Lua](/docs/download/ethos-Lua.md)). Each release has one zip per language, for example `rotorflight-lua-ethos-suite-2.3.0-en.zip` for English. Pick the release that matches your firmware version.

## 2. Put it on the radio[​](#2-put-it-on-the-radio "Direct link to 2. Put it on the radio")

Use either way:

* **Ethos Suite:** connect the radio by USB, open *Lua Development Tools*, choose *Install Lua Scripts*, and select the zip.
* **By hand:** connect the radio by USB as a drive, unzip the download, and copy the `rfsuite` folder into the `scripts` folder on the radio. Replace the old `rfsuite` folder if there is one.

Then unplug the radio and restart it.

## 3. Turn on the background task for your model[​](#3-turn-on-the-background-task-for-your-model "Direct link to 3. Turn on the background task for your model")

The suite does its work in a background task that each model has to turn on. On the radio, open the **Model** menu, go to page 3, and open **Lua**. Turn **Rotorflight \[Background]** on.

![Model menu, Lua page, with the Rotorflight background task turned on](/assets/images/model-lua-task-572da5bd3898e4e1a8ccc34165328437.png)

Until it is on, every tile in the app shows *Background task not running* when you press it. See also [Ethos Background Task Notification](/docs/setup/radio-setup/radio-setup-ethos/ethos-background-task-notification.md).

## 4. Check telemetry[​](#4-check-telemetry "Direct link to 4. Check telemetry")

The app talks to the flight controller over telemetry, so the radio needs a working link to the receiver:

1. In the **Model** menu, **RF system**, make sure the RF module you fly with is turned on.
2. Power up the model, then open **Model** → **Telemetry** and discover sensors if the list is empty.

If the suite reports missing sensors, see [Ethos Missing Sensors](/docs/setup/radio-setup/radio-setup-ethos/ethos-suite-missing-sensors.md). For the flight controller side, see [Receiver: Telemetry Sensors](/docs/configurator/tabs/receiver.md).

## 5. Open the app[​](#5-open-the-app "Direct link to 5. Open the app")

Press **SYS** on the radio and go to the second page. The **Rotorflight** tile opens the app.

![System menu, page 2, with the Rotorflight tile](/assets/images/sys-menu-tile-2da1d73f5debfaeacf1bb331ec7efe4c.png)

With the model powered and connected, every tile in the app can be opened. Without a connection, only **Logs** and **Settings** work: everything else needs the flight controller. Continue with [Using the app](/docs/setup/radio-setup/radio-setup-ethos/lua-suite/using-the-app.md).

## Updating[​](#updating "Direct link to Updating")

Install a new release the same way. Your app settings (under **Settings**) are kept in a separate folder, `scripts/rfsuite.user`, so replacing the `rfsuite` folder does not lose them.
