# Mixer

This section will describe the configuration of the mixer and calibrate the rotor blade angles.

note

Before proceeding with setting up the mixer, make sure that [gyro sensor alignment](/docs/configurator/tabs/configuration.md#board-and-sensor-alignment) is correct.

### Main Rotor Settings[​](#main-rotor-settings "Direct link to Main Rotor Settings")

#### Swashplate type[​](#swashplate-type "Direct link to Swashplate type")

Choose the swash type that suits your helicopter.

![Mixer Tab](/assets/images/mixer-main-rotor-settings-880ad842dc90ce7327a264c5b617cbdb.png)

#### Rotor direction[​](#rotor-direction "Direct link to Rotor direction")

Choose the direction of rotation for the main rotor. This is looking down from on the top of the rotor.

#### Elevator control direction[​](#elevator-control-direction "Direct link to Elevator control direction")

With the helicopter servos powered, tilt the heli forward (pitch down). The swash should now pitch up towards the tail of the helicopter. If this is not the case, change the control direction from **\[NORMAL]** to **\[REVERSE]**.

#### Aileron control direction[​](#aileron-control-direction "Direct link to Aileron control direction")

Roll the heli to the right (right Aileron). The swash should pitch towards the left. If this is not the case, change the control direction from **\[NORMAL]** to **\[REVERSE]**.

#### Collective control direction[​](#collective-control-direction "Direct link to Collective control direction")

Push the collective stick forward (Increasing collective). The swash should now rise up towards the rotor head (to increase collective). If the swash goes down change the control direction from **\[NORMAL]** to **\[REVERSE]**.

## Swashplate link trims[​](#swashplate-link-trims "Direct link to Swashplate link trims")

![Mixer Tab](/assets/images/mixer-swashplate-link-trims-c1b640fb1c2173d674bdf743031e5f04.png)

Ideally the swashplate should be set with all 3 Collective servos at 90 deg while the blade angle is at 0 degrees. Some helicopters have fixed length swash links which means in order to get 0 degrees for blade centre the servo arms need to be raised or lowered. Use these link trims to provide that function.

For helicopters with adjustable swash links this should remain at 0 and the links adjusted to get a 0 degree blade angle.

## Main rotor geometry[​](#main-rotor-geometry "Direct link to Main rotor geometry")

![Mixer Tab](/assets/images/mixer-main-rotor-geometry-80740f7ba37d19076d5fcb8a909f46a4.png)

#### Cyclic and collective calibration[​](#cyclic-and-collective-calibration "Direct link to Cyclic and collective calibration")

These settings are used to calibrate the mixer so that the blade angle matches the commanded angle for both the cyclic and collective. See the [calibration procedure](/docs/setup/setup-mixer.md#calibrating-the-mixer) for details.

#### Collective geometry correction[​](#collective-geometry-correction "Direct link to Collective geometry correction")

Adjust until the collective positive and negative deflections are equal.

#### Collective blade pitch limit[​](#collective-blade-pitch-limit "Direct link to Collective blade pitch limit")

* Ideally, one should use this option to set the maximum allowed collective blade pitch. Therefore, if the person wants to change the collective pitch down the line, they should be able to adjust in the "rates" page confidently without worrying about servos binding.

* Practically, for most 3D helicopters, this is set to the maximum collective you will ever need (15-16deg) if the helicopter is physically capable of doing it

#### Cyclic blade pitch limit[​](#cyclic-blade-pitch-limit "Direct link to Cyclic blade pitch limit")

* This is NOT the same as the cyclic calibration on other FBLs (it's NOT the 8 deg cyclic on vbar for example)
* This is designed to let the FBL know how much cyclic travel the helicopter is PHYSICALLY capable of
* Usually adjust it so that around zero collective there is no physical interference anywhere. You might want to temporally increase the I gains (to around 200) on cyclic and move the cyclic stick to find the limits. MAKE SURE TO TURN THEM BACK
* Some 550+ size helicopter might be able to achieve 16+ degree of cyclic pitch, you could set it to the absolutely maximum but it is advised to limit around 16degree since practically it should never hit that much cyclic.

#### Total blade pitch limit[​](#total-blade-pitch-limit "Direct link to Total blade pitch limit")

* This is probably the most difficult limit to understand and setup properly
* To find the total blade pitch limit, make sure the collective blade pitch limit and cyclic blade pitch limit are set up correctly. You might want to use the I-gain trick mentioned above
* Set the collective pitch to max, then move the cyclic. Increase the limit until either there is a physical limit or the fish-eye bearing (the ball) in the center of the swash drops at the max cyclic due to one servo reaching its limit.
* Repeat at lowest collective pitch
* You could also increase cyclic servo travels to gain more total blade pitch. However, nothing should be interfering
* Double check that there's NO binding or interference at ANY combination of collective and cyclic in their whole range.
* Make sure to turn the I-gains back to default in the end if the I-gain trick is used.

#### Swashplate phase angle[​](#swashplate-phase-angle "Direct link to Swashplate phase angle")

Usually set it per manufacture recommendation. One could consider if there's bobbling that could not be resolved from changing the cross coupling gains or it is known that the rotor head design requires a non-zero phase angle.

#### Positive and Negative collective tilt correction[​](#positive-and-negative-collective-tilt-correction "Direct link to Positive and Negative collective tilt correction")

Corrects cyclic to collective interactions.<br /><!-- -->Adjust the Positive collective tilt value until the swash ball remains stationary between mid and full Positive collective. Repeat by adjusting the Negative tilt value from mid to full negative collective.

## Tail Rotor Settings[​](#tail-rotor-settings "Direct link to Tail Rotor Settings")

![Mixer Tab](/assets/images/mixer-tail-rotor-settings-81501a3a65d5402828e2ef9b2c0dcc6a.png)

### Tail rotor type[​](#tail-rotor-type "Direct link to Tail rotor type")

#### Variable Pitch[​](#variable-pitch "Direct link to Variable Pitch")

This is a variable pitch tail controlled by a servo (Servo#4).

#### Motorized[​](#motorized "Direct link to Motorized")

The tail has separate motor(M2) for controlling the yaw.

#### Bidirectional[​](#bidirectional "Direct link to Bidirectional")

Motorized tail operating in bi-directional mode.

### Yaw Control Direction[​](#yaw-control-direction "Direct link to Yaw Control Direction")

With the helicopter tail servo powered, move Rudder stick to the right. The tail slider should move to the inside (toward the tail case). If this is not the case, change the control direction from **\[NORMAL]** to **\[REVERSE]**.

### Center Trim For Tail Rotor \[°][​](#center-trim-for-tail-rotor- "Direct link to Center Trim For Tail Rotor \[°]")

Set tail rotor trim for zero yaw command.
