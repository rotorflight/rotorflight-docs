# Tuning process

## Collective to Pitch Compensation

!!! info "Collective to Pitch Compensation"
    === "Purpose"
        The tail boom is long and has mass. On a rapid collective change the tail will lag behind the movement of the helicopter resulting in the nose pitching up with rapid positive collective and pitching down with high negative collective. Collective to Pitch Compensations mixes in some pitch control as collective is applied to heep the helicopter level throughout. When this is tuned well the PID control loop does not have to work very hard to keep the helicopter level.

        **Note:** It is good to tune this early in your tuning process while you helicopter is on defaults. During this time the control loop is probably slow and it will be easier to see the tail lag.

    === "Parameter"
        <div style={{textAlign: 'center'}}>
        <img src="./img/collective-pitch.png" alt="Collective to Pitch" width="100%" />
        </div>

    === "Beginner"
        This is not a requirement as at low collective throws and headspeeds the control loop works fine. Just use default.

    === "Intermediate"
        1. From a hover give full collective. Watch for the tail dropping.
        2. If the tail lags. Increase the Collective to Pitch Compensation value.
        3. If the tail pitches up there is too much. Reduce the Collective to Pitch Compensation value.

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>




## Cyclic cross coupling

!!! info "Cyclic cross coupling"
    === "Purpose"
        Cyclic cross coupling happens mainly due to the pitch axis inputs. When the pitch command is given, due to the high moment of inertia of the helicopter in the pitch axis, the frame would "lag" behind the rotor disks. This difference in position creates a torque on the rotor blade and thus transfer to the roll axis due to gyroscopic precession. More details can be found on the [**Cyclic Cross Coupling** page](../tuning/Cyclic-Cross-Coupling)

        **Note:** It is good to tune this early in your tuning process while you helicopter is on defaults. During this time the control loop is probably slow and it will be easier to see the unwanted rotations.

    === "Parameter"
        <div style={{textAlign: 'center'}}>
        <img src="./img/cross-coupling.png" alt="Cyclic Cross Coupling" width="100%" />
        </div>

    === "Beginner"
        1. during hover, shake the elevator stick forward and backwards.
        * Observe a tilt in the roll axis
        * and a significant drift in the yaw axis
        2. Increase Cyclic cross coupling until

    === "Intermediate"
        1. During tick-tocs
        * Watch for the center of the main rotor rotating during stops
        2. If the helicopter rolls during this movement increase the Cyclic cross coupling.

        **Need test for CCC Ratio**\*

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>




## Tune Cyclic P

!!! info "Tune Cyclic P"
    === "Purpose"
        Proportional (P). Proportional control is fast and reacts immediately on the difference between your command and the movement of the helicopter (error). Generally we want P to be as high as possible so that our control is fast.

        **note:** if Proportional is set too high it will cause rapid oscillations. If this occurs we need to reduce it until the oscillations stop.

    === "Parameter"
        <div style={{textAlign: 'center'}}>
        <img src="./img/cyclic-p.png" alt="Cyclic P" width="100%" />
        </div>

    === "Beginner"
        1. Increase P on each axis until the helicopter begins to vibrate or wobble when you conduct an aggressive move.
        * Transition from forwards to backwards as hard as you are confident. Watch the boom and helicopter body for shuddering/wobbling.
        * Transition side to side as hard as you are confident. Watch the boom and helicopter body for shuddering/wobbling.
        * Bump skids on the ground etc.
        2. When vibrations are seen, reduce your P value until it is removed.

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>

    === "Intermediate"
        1. Perform a fast tick-tocs
        * Watch the boom and skids for shuddering/wobbling.
        2. If no wobbling then increase P.
        3. When vibrations are seen, reduce your P value or if the vibrations are low move on to the next step and increase D.

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>




## Tune Cyclic D

!!! info "Tune Cyclic D"
    === "Purpose"
        **Purpose:** Derivative (D) is used to dampen oscillations. The ratio between the P and D also controls your stick feel. The higher the D gain is the more 'robotic' the feel.\
        increase the D until we get the desired stick feel OR until we see high frequency vibrations (we have gone too far).
        **Caution:** Derivative is very susceptible to noise. Make sure your filters are enabled and working before increasing D.

    === "Parameter"
        <div style={{textAlign: 'center'}}>
        <img src="./img/cyclic-d.png" alt="Cyclic D" width="100%" />
        </div>

    === "Beginner"
        1. Increase D gain.

        As the D increases stick response damping

        on each axis until the helicopter begins to vibrate or wobble when you conduct an aggressive move.

        * Transition from forwards to backwards as hard as you are confident. Watch the boom and helicopter body for shuddering/wobbling.
        * Transition side to side as hard as you are confident. Watch the boom and helicopter body for shuddering/wobbling.
        * Bump skids on the ground etc.

        2.

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>

    === "Intermediate"
        1. Fly xyz movement.
        * Watch for ??
        * If 'a' then increase Derivative until?

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>




## Tune Cyclic I

!!! info "Tune Cyclic I"
    === "Purpose"
        **Purpose:** Integral (I)

    === "Parameter"
        <div style={{textAlign: 'center'}}>
        <img src="./img/cyclic-i.png" alt="Cyclic I" width="100%" />
        </div>

    === "Beginner"
        1. Fly xyz movement.
        * Watch for ??
        * If 'a' then increase Derivative until?

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>

    === "Intermediate"
        1. Perform pirouetting long pitch pumps (piro pogo).
        * On piro stop Watch for the If the heli does not stop clean and has a large shake, it is either I-gain being too high or P-gain being too low.

        Usually it is possible to use the same I-gain on pitch and roll axis.

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>




## Tune Cyclic FF

!!! info "Tune Cyclic FF"
    === "Purpose"
        **Purpose:** Feed-Forward (FF)

    === "Parameter"
        <div style={{textAlign: 'center'}}>
        <img src="./img/cyclic-ff.png" alt="Cyclic FF" width="100%" />
        </div>

    === "Beginner"
        1.

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>

    === "Intermediate"
        1. Do continuous flips, rolls.
        2. Stop the flip/roll and observe the stopping behavior.
        * If the heli does not stop cleanly and kept moving a little bit, increase the FF gain on its corresponding axis
        * If the heli stops but bounces back, decrease the FF gain on the corresponding axis

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>




## Tune Cyclic Boost

!!! info "Tune Cyclic Boost"
    === "Purpose"
        **Purpose:** Boost (B)

    === "Parameter"
        <div style={{textAlign: 'center'}}>
        <img src="./img/cyclic-b.png" alt="Cyclic FF" width="100%" />
        </div>

    === "Method"
        * increased incrementally on each axis match how sharp the response you want. Usually only pitch needs a significant B-gain.
        * Too high on B-gain results in unwanted oscillations at stops.




## Tune iTerm Relax

!!! info "iTerm Relax"
    === "Purpose"
        **Purpose:** iTerm Relax -

    === "Parameter"
        <div style={{textAlign: 'center'}}>
        <img src="./img/iterm-relax.png" alt="Cyclic FF" width="100%" />
        </div>

    === "Beginner"
        This is not a requirement as at low collective throws and headspeeds the control loop works fine. Just use default.

    === "Intermediate"
        1. Fly xyz movement.
        * Watch for ??
        * If 'a' then increase Derivative until?

        <div style={{textAlign: 'center', fontWeight: "bold"}}>
        Video to go here
        </div>




## Yaw Tuning

!!! warning "Slop and sticky linkages"
    If your helicopter wags continuously with varying PID values then there is a good change there is a mechanical issue. Hysteresis due to slop in the linkage or sticky jerky movement of the pitch slider cannot be tuned out with the controller. Review your linkage, sliders and servo if continuous wagging is encountered. Generally a helicopter using the default PID values the tail will be sluggish and wander. It should not 'Wag'.


