# Failsafe

![Failsafe Tab](/rotorflight-docs/assets/images/failsafe-main-655e9cdcc857b699eae1ab5452f4012e.png)

In the event of receiver failsafe the flight controller can be configured to set the commands to a predetermined position.

The flight channels (Aileron, Elevator, Throttle, Rudder, Collective) can be AUTOMATIC or HOLD, (Default is AUTO)

The auxiliary channels can be Hold or Set, (Default is HOLD).

note

AUTOMATIC - Flight channels are set to safe values (low throttle, mid position for yaw/pitch/roll).<br /><!-- -->HOLD - Channel holds the last value.<br /><!-- -->SET - Channel is set to a specific configured value.
