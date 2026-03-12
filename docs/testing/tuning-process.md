# Tuning process

## Collective to Pitch Compensation[​](#collective-to-pitch-compensation "Direct link to Collective to Pitch Compensation")

Collective to Pitch Compensation

* Purpose
* Parameter
* Beginner
* Intermediate

The tail boom is long and has mass. On a rapid collective change the tail will lag behind the movement of the helicopter resulting in the nose pitching up with rapid positive collective and pitching down with high negative collective. Collective to Pitch Compensations mixes in some pitch control as collective is applied to heep the helicopter level throughout. When this is tuned well the PID control loop does not have to work very hard to keep the helicopter level.

**Note:** It is good to tune this early in your tuning process while you helicopter is on defaults. During this time the control loop is probably slow and it will be easier to see the tail lag.

![Collective to Pitch](data:image/png;base64,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)

This is not a requirement as at low collective throws and headspeeds the control loop works fine. Just use default.

1. From a hover give full collective. Watch for the tail dropping.
2. If the tail lags. Increase the Collective to Pitch Compensation value.
3. If the tail pitches up there is too much. Reduce the Collective to Pitch Compensation value.

Video to go here

## Cyclic cross coupling[​](#cyclic-cross-coupling "Direct link to Cyclic cross coupling")

Cyclic cross coupling

* Purpose
* Parameter
* Beginner
* Intermediate

Cyclic cross coupling happens mainly due to the pitch axis inputs. When the pitch command is given, due to the high moment of inertia of the helicopter in the pitch axis, the frame would "lag" behind the rotor disks. This difference in position creates a torque on the rotor blade and thus transfer to the roll axis due to gyroscopic precession. More details can be found on the [**Cyclic Cross Coupling** page](/docs/testing/Cyclic-Cross-Coupling)

**Note:** It is good to tune this early in your tuning process while you helicopter is on defaults. During this time the control loop is probably slow and it will be easier to see the unwanted rotations.

![Cyclic Cross Coupling](/assets/images/cross-coupling-25d22578a7ba3a24859e8cc1bb5ba1e7.png)

1. during hover, shake the elevator stick forward and backwards.

   <!-- -->

   * Observe a tilt in the roll axis
   * and a significant drift in the yaw axis

2. Increase Cyclic cross coupling until

1) During tick-tocs
   <!-- -->
   * Watch for the center of the main rotor rotating during stops
2) If the helicopter rolls during this movement increase the Cyclic cross coupling.

**Need test for CCC Ratio**\*

Video to go here

## Tune Cyclic P[​](#tune-cyclic-p "Direct link to Tune Cyclic P")

Tune Cyclic P

* Purpose
* Parameter
* Beginner
* Intermediate

Proportional (P). Proportional control is fast and reacts immediately on the difference between your command and the movement of the helicopter (error). Generally we want P to be as high as possible so that our control is fast.

**note:** if Proportional is set too high it will cause rapid oscillations. If this occurs we need to reduce it until the oscillations stop.

![Cyclic P](/assets/images/cyclic-p-28cc6c730de1542cb65794ea7c61adb3.png)

1. Increase P on each axis until the helicopter begins to vibrate or wobble when you conduct an aggressive move.

   <!-- -->

   * Transition from forwards to backwards as hard as you are confident. Watch the boom and helicopter body for shuddering/wobbling.
   * Transition side to side as hard as you are confident. Watch the boom and helicopter body for shuddering/wobbling.
   * Bump skids on the ground etc.

2. When vibrations are seen, reduce your P value until it is removed.

Video to go here

1. Perform a fast tick-tocs
   <!-- -->
   * Watch the boom and skids for shuddering/wobbling.
2. If no wobbling then increase P.
3. When vibrations are seen, reduce your P value or if the vibrations are low move on to the next step and increase D.

Video to go here

## Tune Cyclic D[​](#tune-cyclic-d "Direct link to Tune Cyclic D")

Tune Cyclic D

* Purpose
* Parameter
* Beginner
* Intermediate

**Purpose:** Derivative (D) is used to dampen oscillations. The ratio between the P and D also controls your stick feel. The higher the D gain is the more 'robotic' the feel.<br /><!-- -->increase the D until we get the desired stick feel OR until we see high frequency vibrations (we have gone too far). **Caution:** Derivative is very susceptible to noise. Make sure your filters are enabled and working before increasing D.

![Cyclic D](/assets/images/cyclic-d-19aca3d4fb17043283764a688422cf0b.png)

1. Increase D gain.

As the D increases stick response damping

on each axis until the helicopter begins to vibrate or wobble when you conduct an aggressive move.

* Transition from forwards to backwards as hard as you are confident. Watch the boom and helicopter body for shuddering/wobbling.
* Transition side to side as hard as you are confident. Watch the boom and helicopter body for shuddering/wobbling.
* Bump skids on the ground etc.

2.

Video to go here

1. Fly xyz movement.

   <!-- -->

   * Watch for ??
   * If 'a' then increase Derivative until?

Video to go here

## Tune Cyclic I[​](#tune-cyclic-i "Direct link to Tune Cyclic I")

Tune Cyclic I

* Purpose
* Parameter
* Beginner
* Intermediate

**Purpose:** Integral (I)

![Cyclic I](/assets/images/cyclic-i-6464512622cae0086b85479665822738.png)

1. Fly xyz movement.

   <!-- -->

   * Watch for ??
   * If 'a' then increase Derivative until?

Video to go here

1. Perform pirouetting long pitch pumps (piro pogo).
   <!-- -->
   * On piro stop Watch for the If the heli does not stop clean and has a large shake, it is either I-gain being too high or P-gain being too low.

Usually it is possible to use the same I-gain on pitch and roll axis.

Video to go here

## Tune Cyclic FF[​](#tune-cyclic-ff "Direct link to Tune Cyclic FF")

Tune Cyclic FF

* Purpose
* Parameter
* Beginner
* Intermediate

**Purpose:** Feed-Forward (FF)

![Cyclic FF](/assets/images/cyclic-ff-a8a30e8abbddb209ec789012986ee850.png)

1.

Video to go here

1. Do continuous flips, rolls.

2. Stop the flip/roll and observe the stopping behavior.

   <!-- -->

   * If the heli does not stop cleanly and kept moving a little bit, increase the FF gain on its corresponding axis
   * If the heli stops but bounces back, decrease the FF gain on the corresponding axis

Video to go here

## Tune Cyclic Boost[​](#tune-cyclic-boost "Direct link to Tune Cyclic Boost")

Tune Cyclic Boost

* Purpose
* Parameter
* Method

**Purpose:** Boost (B)

![Cyclic FF](/assets/images/cyclic-b-e9a62d65dddf16360c5a71fde98d7ce7.png)

* increased incrementally on each axis match how sharp the response you want. Usually only pitch needs a significant B-gain.
* Too high on B-gain results in unwanted oscillations at stops.

## Tune iTerm Relax[​](#tune-iterm-relax "Direct link to Tune iTerm Relax")

iTerm Relax

* Purpose
* Parameter
* Beginner
* Intermediate

**Purpose:** iTerm Relax -

![Cyclic FF](/assets/images/iterm-relax-a0b78e163ab65885c8b06be838b028bc.png)

This is not a requirement as at low collective throws and headspeeds the control loop works fine. Just use default.

1. Fly xyz movement.

   <!-- -->

   * Watch for ??
   * If 'a' then increase Derivative until?

Video to go here

## Yaw Tuning[​](#yaw-tuning "Direct link to Yaw Tuning")

Slop and sticky linkages

If your helicopter wags continuously with varying PID values then there is a good change there is a mechanical issue. Hysterisis due to slop in the linkage or sticky jerky movement of the pitch slider cannot be tuned out with the controller. Review your linkage, sliders and servo if continuous wagging is encountered. Generally a helicopter using the default PID values the tail will be sluggish and wander. It should not 'Wag'.
