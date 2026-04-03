# Governor setup

There are several options for configuring the Governor.

Governor Options

* Option 1
* Option 2

### Single profile - Multiple throttle settings[​](#single-profile---multiple-throttle-settings "Direct link to Single profile - Multiple throttle settings")

Configuring a single profile with **Full Headspeed** set to the Maximum desired headspeed.

![Governor Setup](/assets/images/governor-setup-1-e925e2e705cf2cc41521793684733e0a.png)

Transmitter throttle settings are configured to Separate throttle positions for each desired headspeed.

**Example:** If we configure a 2500RPM **Full headspeed**

On the transmitter set the required headspeeds.

* Throttle Hold = 0%
* Idle up 1 = 70% = 2500 \* 0.7 = 1750 RPM headspeed
* Idle up 2 = 90% = 2500 \* 0.9 = 2250 RPM headspeed
* Idle up 3 = 100% = 2500 RPM Headspeed

This Method is easier to configure and simplifies the tuning as there is only one profile to change. You will have to tune so that it is suitable for each of the headspeed.

## Multiple Profiles - Single throttle setting[​](#multiple-profiles---single-throttle-setting "Direct link to Multiple Profiles - Single throttle setting")

In this option we set each profile with a separate Full headspeed. We use the Adjustments to switch between each profile. Our Transmitter throttle setting remains at 100% unless throttle hold is activated.

#### Set transmitter Headspeeds[​](#set-transmitter-headspeeds "Direct link to Set transmitter Headspeeds")

On the transmitter set the required headspeeds.

* Throttle Hold ON = 0%
* Throttle hold OFF = 100%

Our Idle up switch (headspeed switch) is just a 3 position switch assigned to an AUX channel. This channel is used for the profile switching below (e.g. AUX4).

#### Enable Profile Switching[​](#enable-profile-switching "Direct link to Enable Profile Switching")

This example switches between Profiles 1-3<br /><!-- -->More details can be found in the [**Profile Switching Example**](/docs/setup/profile-switching-example.md)

![Governor Setup](/assets/images/governor-setup-3-0f85f1291e59ae0e14412d5f61e49117.png)

#### Set profile Full Headspeed[​](#set-profile-full-headspeed "Direct link to Set profile Full Headspeed")

For each of the profiles set a separate **Full Headspeed**

![Governor Setup](/assets/images/governor-setup-2-939893dcd18f7c63f6cf4bbe00fbd0a6.png)
