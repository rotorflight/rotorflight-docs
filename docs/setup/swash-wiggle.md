# Swashplate Wiggle

The swashplate can be configured to 'wiggle' as an indication for when you are

* Ready to Arm
* Armed (default is disabled)
* FC Error detected
* FC Fatal Error

## FC is ready to Arm[​](#fc-is-ready-to-arm "Direct link to FC is ready to Arm")

If arming is ready to be enabled and there is no prevention flags active (ready to arm) the swashplate will wiggle as an indication.<br /><!-- -->It can be enabled or disabled from the cli:<br />`set wiggle_enable_ready = ON or OFF (default ON)`<br />`save`

[](/rotorflight-docs/assets/medias/arming-ready-50af317c322ee8557fbbe7459c5ac81b.mp4)

## FC Armed[​](#fc-armed "Direct link to FC Armed")

* This is just a very brief single collective movement indicating the FC has just armed. This is disabled by default.
  <br />
  <!-- -->
  It can be enabled or disabled from the cli:
  <br />
  `set wiggle_enable_armed = ON or OFF (default OFF)`
  <br />
  `save`

## FC Error[​](#fc-error "Direct link to FC Error")

If the flight controller identifies a configuration fault it will do an error movement by cycling collective several times.

* Arm switch is active<br /><!-- -->It can be enabled or disabled from the cli:<br />`set wiggle_enable_error = ON or OFF (default ON)`<br />`save`

  [](/rotorflight-docs/assets/medias/arming-fail-83affead7ef485af4b3686d40307c06f.mp4)

## FC Fatal error[​](#fc-fatal-error "Direct link to FC Fatal error")

The following [**Arm disable flags**](/rotorflight-docs/docs/setup/arming.md#disable-flags-description) will trigger a FC fatal error.<br /><!-- -->It can be enabled or disabled from the cli:<br />`set wiggle_enable_fatal = ON or OFF (default ON)`<br />`save`

* 'NOGYRO'
* 'LOAD'
* 'GOVERNOR'
* 'RPMFILTER'
* 'REBOOT\_REQD'
* 'NO\_ACC\_CAL'
* 'MOTOR\_PROTO'
* 'DSHOT\_BBANG'

The 'amount' (strength) of wiggle and 'speed' (frequency) can be modified by changing the values below.<br />`set wiggle_strength = 50`<br />`set wiggle_frequency = 10`
