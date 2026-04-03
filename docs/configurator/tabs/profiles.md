# Profiles

info

The purpose of profiles are to store in flight tuning parameters. The aim is usually to have several 'profiles' that you can switch between during flight to change flight performance. Things like different headspeeds, tuning, rescue settings etc can be 'tuned' for the individual flight mode. Please see the [profile switching example](/rotorflight-docs/docs/setup/profile-switching-example.md)

## Main Tuning Parameters[​](#main-tuning-parameters "Direct link to Main Tuning Parameters")

### PID Controller Gains[​](#pid-controller-gains "Direct link to PID Controller Gains")

![Profiles](/rotorflight-docs/assets/images/profiles-pid-controller-gains-e48a5d1612d63c3bc6b6755945b26e29.png)

#### Proportional[​](#proportional "Direct link to Proportional")

The gain factor that is proportional to the rate error. High proportional gain increase response speed of the helicopter. Low proportional gain results in overall slow system response. Too high results in fast oscillation (\~20hz). It also helps reduce the slow oscillation due to high Integral gain.

#### Integral[​](#integral "Direct link to Integral")

The gain factor that is proportional to the accumulated error. Low integral gain results in drift when hovering, and uneven roll or flip rate during continuous roll / flips. It also results in the helicopter not "wanting" to finish maneuvers. Integral too high results in slow oscillation (1-3hz) during cyclic input stops and/or during high disturbance scenarios such as stops of (piro) pitch pumps and tick-tock stops.

#### Derivative[​](#derivative "Direct link to Derivative")

The gain factor proportional to the change of error. It is responsible for "dampening" the overshoot caused by proportional gain. The Derivative gain is particularly sensitive to noise. Ideally, high derivative gain dampens the system too much results in slow response. However, in practice, noise-induced fast oscillation would occur first. Too low results in fast oscillation during stops due to high proportional gain.

#### Feedforward[​](#feedforward "Direct link to Feedforward")

The gain factor proportional to the input. In practice, feedforward gain is used to eliminate I-term windup, which occurs after continuous flips and rolls. If the helicopter does not stop immediately and continue moving in the rolling / flipping direction, feedforward gain needs to be increased. If FF gain is set to be too high, the helicopter may overshoot during such maneuver. Thus it is advised to start tuning from low.

#### Boost[​](#boost "Direct link to Boost")

The setpoint boost - or B-term will increase the stick reaction speed. In case the heli is not reacting fast enough, the reaction can be boosted with this new B-gain on each axis separately. This seems to be in the range of 20..50

This provides a rapid short term increase in your command. This parameter is used in conjunction with the time [B-Cutoff](/rotorflight-docs/docs/configurator/tabs/profiles.md#b-term-cut-off).

## Advanced Settings[​](#advanced-settings "Direct link to Advanced Settings")

### PID Controller Settings[​](#pid-controller-settings "Direct link to PID Controller Settings")

![Profiles](/rotorflight-docs/assets/images/profiles-pid-controller-settings-5ffb300380e6f943d4cd109012ec02a6.png)

#### Error Rotation[​](#error-rotation "Direct link to Error Rotation")

If turned on, the I-term can transfer between pitch and roll axis during pirouetting. Increase the performance of overall piro related maneuvers. This is sometimes referred to as piro compensation.

#### Ground Error Decay[​](#ground-error-decay "Direct link to Ground Error Decay")

A safety feature. This is to prevent the helicopter from tilting during takeoff.

#### I-term Relax Type[​](#i-term-relax-type "Direct link to I-term Relax Type")

The axis that I-term relax is applied to. Generally this is Roll, Pitch and Yaw (RPY)

#### I-term Relax Cutoff Points[​](#i-term-relax-cutoff-points "Direct link to I-term Relax Cutoff Points")

The I-term relax corresponds to the speed of control input for a given axis. When the control input exceed a certain speed, I-term would stop charging. This partially solved the slow overshoot at cyclic input stops due to I-gain charging at fast stick input. The cutoff value corresponds to the input FREQUENCY. A lower value gives more I-term relax, and a higher value provides less I-term relax. It is advised to start high and decrease until bounce back disappears.

#### Error Limits[​](#error-limits "Direct link to Error Limits")

The limit of how much I-term can be charged. During normal flights, it would not reach this limit. (More info needed)

### Offset Limit/Gain[​](#offset-limitgain "Direct link to Offset Limit/Gain")

The offset gains are used for the [High Speed Integral](/rotorflight-docs/docs/Tuning/High-Speed-Integral.md) feature.

![Profiles](data:image/png;base64,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)

#### Offset Limits[​](#offset-limits "Direct link to Offset Limits")

This is a hard limit for the offset angle in the PID loop. The absolute offset and thus the O-term will never go above these limits.

#### Offset Gains[​](#offset-gains "Direct link to Offset Gains")

Gain for offset term,(Integral for high speed flight).

## Main Rotor Settings[​](#main-rotor-settings "Direct link to Main Rotor Settings")

![Profiles](/rotorflight-docs/assets/images/profiles-main-rotor-settings-7908365250b88ab370fbec2adc8bc412.png)

### Collective To Pitch Feedforward Gain[​](#collective-to-pitch-feedforward-gain "Direct link to Collective To Pitch Feedforward Gain")

The pre-compensation for pitch axis when collective is high. Since there is drag-induced pitching motion (there is more drag on the tail thus the helicopter would want to have nose-up tendency when climbing), increasing this gain would compensate that. High gain push the nose down during climb ups. However, it is also advised to select a relatively low value to be conservative.

### Cyclic Cross Coupling[​](#cyclic-cross-coupling "Direct link to Cyclic Cross Coupling")

Cyclic cross coupling compensation removes the aileron wobble when only elevator is applied.

#### Cross-Coupling Gain[​](#cross-coupling-gain "Direct link to Cross-Coupling Gain")

Amount of compensation applied for Pitch-to-Roll decoupling.

#### Cross-Coupling Ratio[​](#cross-coupling-ratio "Direct link to Cross-Coupling Ratio")

Amount of Roll-to-Pitch compensation needed, vs. Pitch-to-Roll.

#### Cross-Coupling Cutoff Frequency[​](#cross-coupling-cutoff-frequency "Direct link to Cross-Coupling Cutoff Frequency")

Frequency limit for the compensation, higher value will make the compensation action faster.

## Tail Rotor Settings[​](#tail-rotor-settings "Direct link to Tail Rotor Settings")

![Profiles](/rotorflight-docs/assets/images/profiles-tail-rotor-settings-8340df6c7c4112b40becf71bbcd3699e.png)

#### CW/CCW Stop Gain[​](#cwccw-stop-gain "Direct link to CW/CCW Stop Gain")

The increase of yaw (what) gain during stops. Higher gain results in crisper stops. Too high may cause fast oscillations.

#### Cyclic Feedforward Gain[​](#cyclic-feedforward-gain "Direct link to Cyclic Feedforward Gain")

Since cyclic input creates more torque on the main rotor, this gain aims to pre-compensate the tail motion due to cyclic inputs. a high cyclic value results CW motion on tail when starting pitching/rolling, a low value results CCW motion. (for CW main rotor)

#### Yaw Precomp cutoff[​](#yaw-precomp-cutoff "Direct link to Yaw Precomp cutoff")

Frequency limit for all Yaw precompensation values.

#### Collective Feedforward Gain[​](#collective-feedforward-gain "Direct link to Collective Feedforward Gain")

The pre-compensation due to the increase of collective pitch. It is advised to tune it based on the immediate response after a the beginning of a climb up. Higher gain results in CW response, lower gain results in CCW response. It is advised to use a lower value since it may affect tail performance during other maneuvers.

#### Collective Impulse Feedforward Gain[​](#collective-impulse-feedforward-gain "Direct link to Collective Impulse Feedforward Gain")

The pre-compensation due to the sudden change of collective. Ideally it is designed to clean up any tail movement in small pitch pumps, however, the compensation is generally overcompensating. Thus it is suggested to turn it off for now.

#### Collective Impulse Feedforward Decay Time[​](#collective-impulse-feedforward-decay-time "Direct link to Collective Impulse Feedforward Decay Time")

Decay time for collective impulse feedforward mixed into yaw.

#### Inertia Precomp Gain[​](#inertia-precomp-gain "Direct link to Inertia Precomp Gain")

The strength of the main rotors inertia. Larger values result in more Precomp being applied to the yaw control.

#### Inertia Precomp[​](#inertia-precomp "Direct link to Inertia Precomp")

Cutoff frequency for the inertia Precomp. Larger values result in a more rapid application of the precomp.

## PID Controller Bandwidth[​](#pid-controller-bandwidth "Direct link to PID Controller Bandwidth")

![Profiles](/rotorflight-docs/assets/images/profiles-pid-controller-bandwidth-ebaf3e547102c6beeca38ffe11f489bf.png)

#### Row/Pitch/Yaw Bandwidth[​](#rowpitchyaw-bandwidth "Direct link to Row/Pitch/Yaw Bandwidth")

An extra low pass filter for each axis. It is specifically designed to preserve a weaker filter on the yaw axis to increase tail performance. High value corresponding to weaker filter. Too high may cause wobbles. Too low may cause delay and even instability in the control loop.

#### Row/Pitch/Yaw D-term cutoff[​](#rowpitchyaw-d-term-cutoff "Direct link to Row/Pitch/Yaw D-term cutoff")

An extra first order low pass filter just for the D-gain to further reduce the sensitivity to noise. A high value decreases the effectiveness but may potentially increase the D-gain performance. A low value increase the filter effect but may hinder D-term effectiveness. It is advised to keep it around 20Hz to prevent oscillation.

#### B-Term Cut-off[​](#b-term-cut-off "Direct link to B-Term Cut-off")

This is controlling how "quick" or "twitchy" the boost is. This works exactly the same as D-cutoff, but on setpoint. It is safe to start with the same cutoffs as used with D. Usually in the range of 10..20. This is used in conjunction with [Boost](/rotorflight-docs/docs/configurator/tabs/profiles.md#boost) or [B-gain](/rotorflight-docs/docs/configurator/tabs/profiles.md#boost)

## Auto Leveling Settings[​](#auto-leveling-settings "Direct link to Auto Leveling Settings")

![Profiles](/rotorflight-docs/assets/images/profiles-auto-leveling-settings-224b7eb5de21a1f3d16d5464aed9b162.png)

#### Acro Trainer gain[​](#acro-trainer-gain "Direct link to Acro Trainer gain")

This determines how aggressively the heli tilt back to the maximum angle (if exceeded) while in *TRAINER* mode.

#### Acro Trainer angle limit[​](#acro-trainer-angle-limit "Direct link to Acro Trainer angle limit")

This determines the maximum angle the heli can tilt to while in *TRAINER* mode.

#### Angle Mode leveling gain[​](#angle-mode-leveling-gain "Direct link to Angle Mode leveling gain")

This determines how aggressively the heli tilt back to level while in *ANGLE* mode.

#### Angle Mode maximum angle[​](#angle-mode-maximum-angle "Direct link to Angle Mode maximum angle")

This determines the maximum angle the heli can tilt to while in *ANGLE* mode.

#### Horizon Mode leveling gain[​](#horizon-mode-leveling-gain "Direct link to Horizon Mode leveling gain")

This determines how aggressively the heli tilt back to level while in *HORIZON* mode.

## Rescue Settings[​](#rescue-settings "Direct link to Rescue Settings")

![Profiles](/rotorflight-docs/assets/images/profiles-rescue-79718b08efa3c1b64c040e820ac5873a.png)

### Enable Rescue[​](#enable-rescue "Direct link to Enable Rescue")

Enable or disable the rescue mode.

#### Flip to upright[​](#flip-to-upright "Direct link to Flip to upright")

Activate flip to upright option when the heli is inverted.

#### Pull-up Collective[​](#pull-up-collective "Direct link to Pull-up Collective")

Values 0.0-100. This is to be set to a level where the helicopter rapidly gains height.

#### Pull-up Time[​](#pull-up-time "Direct link to Pull-up Time")

How long pull up collective should be applied. This is usually about 0.3 to 0.5s

#### Climb Collective[​](#climb-collective "Direct link to Climb Collective")

Values 0.0-100. This is to be set to a level where the helicopter gains height.

#### Climb Time[​](#climb-time "Direct link to Climb Time")

How long Climb collective should be applied. This is usually about 0.5 to 1.5s

#### Hover Collective[​](#hover-collective "Direct link to Hover Collective")

Increase this value until the heli hovers at a stable altitude

#### Flip Fail Time[​](#flip-fail-time "Direct link to Flip Fail Time")

This is a safety feature. If there is a mechanical issue preventing the helicopter from completing the flip during this time the rescue mode will exit

#### Exit Time[​](#exit-time "Direct link to Exit Time")

This slows the transition from rescue back to normal mode. This is helpful if you have rescued from inverted where your collective may be in the opposite direction. This prevents it from rapidly pitching down.

#### Leveling Gain[​](#leveling-gain "Direct link to Leveling Gain")

How strong the helicopter will level. Too low and the helicopter will be sluggish to level. Too high and it will wobble/vibrate.

#### Flip-to-Upright Gain[​](#flip-to-upright-gain "Direct link to Flip-to-Upright Gain")

How strong the helicopter will flip to upright.

#### Max Leveling Rate[​](#max-leveling-rate "Direct link to Max Leveling Rate")

Used to control how fast the helicopter levels. Set this to a value that is achievable by your helicopter. Larger slower helicopters may need this reduced.

#### Max Leveling Acceleration[​](#max-leveling-acceleration "Direct link to Max Leveling Acceleration")

Limit how fast the controller tries to accelerate the helicopter to level or flip. Larger slower helicopters may need this reduced.

## Copy Profile[​](#copy-profile "Direct link to Copy Profile")

You can use the *Copy profile* button at the upper right corner to copy the values of the current profile to another one.
