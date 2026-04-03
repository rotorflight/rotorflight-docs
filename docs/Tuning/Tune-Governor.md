# Tune the Governor

note

If using the governor you must first enable the [RPM Measurement](/rotorflight-docs/docs/setup/rpm-measurement.md) and configure the [Governor](/rotorflight-docs/docs/setup/governor.md)

Our goal here is to have a more or less constant headspeed, without any motor oscillations. Ideally the feedforward term should do most of the work, while the P-term is only used for quick corrections. The I-term should maintain the headspeed over time.

But beware: a well tuned governor might generate too much torque for the tail to counteract. If that's the case, you might want to decrease torque by detuning the governor a bit, or reducing the collective range, for example. Alternatively you could try to increase tail authority by using different (bigger) tail rotor blades, or a higher tail rotor speed, for example.

## Preparation[​](#preparation "Direct link to Preparation")

* If you're using TTA, disable it by setting *TTA gain* to 0 on the *Profiles* tab. You can enable it again once you're done tuning the governor.
* Set *Blackbox debug mode* to *Governor* and *Blackbox logging rate* to *1kHz* on the *Blackbox* tab.
* Start with governor *P-gain* and *I-gain* really low, e.g. 10 for P and 20 for I. Spool up might now take a bit longer.

## Tuning steps[​](#tuning-steps "Direct link to Tuning steps")

When you're using the [Rotorflight Lua scripts](/rotorflight-docs/docs/setup/lua-scripts.md), you can change all gain values on the field. My routine is to make logs of 3 or 4 different values around the default value for one specific gain. Example: the governor F-gain has a default value of 15, so try 10, 15, 20 and 25. Start with 10, do some pitch pumps (give it full collective for a short period of time) and disarm. Change the value to 15 and save, arm, do some pitch pumps, and so on. The result will be one log file with 4 partial logs, which you can select with the dropdown in the upper-right corner of the Blackbox Explorer. Then look in the Blackbox Explorer to see what gain value works best. If you think you might need higher or lower values for a specific gain, make a new log with adjusted values.

Try increments of 10 for the F-gain, increments of 25 for the I-gain and increments of 10 for the P-gain.

### 1. Tune the F-gain[​](#1-tune-the-f-gain "Direct link to 1. Tune the F-gain")

The F-gain determines the feedforward term, together with cyclic and collective precompensation. As stated, the better the F-gain is tuned, the less the PID-loop has to correct. Here's an example where the F-gain is too low, since the headspeed drops quite a bit when doing pitch pumps.

![f-gain too low](/rotorflight-docs/assets/images/gov-f-gain-too-low-eedc6cacd93d560fce9ad34e288c874f.png)

If the F-gain is too high, the headspeed will be temporarily too high.

![f-gain too high](/rotorflight-docs/assets/images/gov-f-gain-too-high-06f6413f243a7d7f13c67ff8b0eda391.png)

### 2. Tune I-gain[​](#2-tune-i-gain "Direct link to 2. Tune I-gain")

After you have found and set the best value for F-gain you can increase the I-gain until it starts playing up, then reduce it with 1/3. Here you can see an I-gain value which is too high, since there are some slow oscillations during and/or after the pitch pump.

![i-gain too high](/rotorflight-docs/assets/images/gov-i-gain-too-high-48ddc97721353f494a76ec48653f61e0.png)

### 3. Tune P-gain[​](#3-tune-p-gain "Direct link to 3. Tune P-gain")

After setting the optimal value for I-gain start increasing the P-gain till there are slight oscillations, then reduce it with 1/3. Here is an example of a P-gain that is clearly too high and introduces fast oscillations.

![p-gain too high](/rotorflight-docs/assets/images/gov-p-gain-too-high-6d366d1c9ad63068b6a5f2000dba6d33.png)

### 4. Tune D-gain[​](#4-tune-d-gain "Direct link to 4. Tune D-gain")

Unless you're flying a 500+ heli you probably won't need D, since there's hardly any momentum in the rotor.

## The result[​](#the-result "Direct link to The result")

This is the result of tuning a Scorpion HKII-2208 3600KV motor in a Gaui X2.

![Result](/rotorflight-docs/assets/images/gov-result-graph-c9effeac87d21537524157a41006b285.png)

And these are the gain values found for this heli:

![Result](/rotorflight-docs/assets/images/gov-result-b9be2510b8dea1fb9b81139139aa3c9c.png)
