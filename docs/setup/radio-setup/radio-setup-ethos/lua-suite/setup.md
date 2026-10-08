# Setup

**Setup** covers how the helicopter is built and wired: the board and radio, the sensors, the mixer and servos, and power, motors and the governor. Each section links to the page that explains the settings.

![The Setup menu, top half](/assets/images/setup-menu-d96d04017dcb3f4df997271cf0270493.png)

![The Setup menu, scrolled down to Mixer \&amp; Servos and Power \&amp; Motors](/assets/images/setup-menu-2-15ee80ac21d30ee36368cd44c05cac1d.png)

## Board & Radio[​](#board--radio "Direct link to Board & Radio")

### Configuration[​](#configuration "Direct link to Configuration")

The craft name, PID loop speed, and the features the board runs: GPS, LED strip and CMS.

![Configuration page](/assets/images/configuration-3dfef2127ee5cbb31e9f320fad21342e.png)

See [Configuration](/docs/configurator/tabs/configuration.md).

### Ports[​](#ports "Direct link to Ports")

What each UART is used for, and its speed.

![Ports page](/assets/images/ports-2c55791bfd4acbbe2626354815ea6161.png)

### Radio Config[​](#radio-config "Direct link to Radio Config")

Stick deflection and centre, the throttle range, and the yaw and cyclic deadbands.

![Radio Config page](/assets/images/radio_config-c05c461eea0b89dc6724f58d79d4345d.png)

See [Receiver](/docs/configurator/tabs/receiver.md).

### Telemetry[​](#telemetry "Direct link to Telemetry")

The telemetry sensors the flight controller sends, grouped by kind. Open a group to turn sensors on or off. **Tool** selects the default sensors.

![Telemetry page](/assets/images/telemetry-be37d5504a59d5adba5d4d2ee4f1f512.png)

See [Receiver: Telemetry Sensors](/docs/configurator/tabs/receiver.md).

### Controls[​](#controls "Direct link to Controls")

A menu of its own:

![Controls menu](/assets/images/controls_menu-4fd69e6c4397eec17b0182a0f7bf0172.png)

| Page        | What it is for                                                                                    | More                                                  |
| ----------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Modes       | Switch ranges for each mode. Pick a mode, then add or change its ranges.                          | [Modes](/docs/configurator/tabs/modes.md)             |
| Adjustments | In-flight adjustments from a switch or knob.                                                      | [Adjustments](/docs/configurator/tabs/adjustments.md) |
| Failsafe    | What each channel does when the signal is lost.                                                   | [Failsafe](/docs/configurator/tabs/failsafe.md)       |
| Beepers     | Which events sound the beeper, and the ESC beacon.                                                | [Beepers](/docs/configurator/tabs/beepers.md)         |
| Blackbox    | The logging device, rate and fields, and the log memory's status. **Tool** on *Status* erases it. | [Blackbox](/docs/configurator/tabs/blackbox.md)       |
| Stats       | Flight count, and last and total flight time.                                                     |                                                       |

![Modes page](/assets/images/modes-6686b5de870b623fbbacc30299df90bb.png)

## Sensors[​](#sensors "Direct link to Sensors")

### Accelerometer[​](#accelerometer "Direct link to Accelerometer")

Accelerometer trim for roll and pitch. **Tool** calibrates the accelerometer: keep the model level and still while it does.

![Accelerometer page](/assets/images/accelerometer-155b519837a2d2979a300fc5db3eac51.png)

### Alignment[​](#alignment "Direct link to Alignment")

How the board is mounted, with a live 3D view of the helicopter that follows the board as you move it. **Tool** turns the view so the tail faces you.

![Alignment page](/assets/images/alignment-6304dd628735955b193ecc2a812f6ba5.png)

See [Configuration](/docs/configurator/tabs/configuration.md).

## Mixer & Servos[​](#mixer--servos "Direct link to Mixer & Servos")

### Mixer[​](#mixer "Direct link to Mixer")

The swashplate and tail mixer, in four pages:

![Mixer menu](/assets/images/mixer_menu-f2887ea50b3d4d7fafd254f15be87a82.png)

| Page     | What it is for                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Swash    | Swash type, rotor direction, and the aileron, elevator and collective directions.                                                     |
| Geometry | Cyclic and collective calibration, geometry correction, and the pitch limits. **Tool** turns swash setup mode on, to level the swash. |
| Tail     | Tail mode, yaw direction, tail idle and centre offset, and yaw trim and calibration.                                                  |
| Trims    | Roll, pitch, collective and yaw trims. **Tool** turns mixer override on while you set them.                                           |

![Mixer, Geometry page](/assets/images/mixer_geometry-65341c607e4bed9d499e026edb5ad8e4.png)

See [Mixer](/docs/configurator/tabs/mixer.md) and [Setup Mixer](/docs/setup/setup-mixer.md).

### Servos[​](#servos "Direct link to Servos")

**PWM Output** lists the servos; select one to set its centre, limits and direction. **BUS Output** is for bus servos and is greyed out unless the model has them. **Tool** turns servo override on, so a servo moves to its centre as you change it.

![Servos, PWM Output](/assets/images/servos_pwm-44df5a963ac0a8f202d45632f06ec985.png)

See [Servos](/docs/configurator/tabs/servos.md).

## Power & Motors[​](#power--motors "Direct link to Power & Motors")

### Power[​](#power "Direct link to Power")

| Page      | What it is for                                             |
| --------- | ---------------------------------------------------------- |
| Battery   | Battery profiles: capacity and cell voltages.              |
| Alerts    | Flight time alarm and the BEC and receiver voltage alerts. |
| Sources   | Where voltage and current are measured.                    |
| SmartFuel | How fuel (charge left) is worked out.                      |

![Power, Battery page](/assets/images/power_battery-633f57eb630ec8385f6e0abd64222afe.png)

See [Power](/docs/configurator/tabs/power.md).

### ESC & Motors[​](#esc--motors "Direct link to ESC & Motors")

![ESC \&amp; Motors menu](/assets/images/esc_motors_menu-94c4b174fb066438987ccb671e128449.png)

| Page           | What it is for                                                                                     | More                                                              |
| -------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Motor Override | Run the motor from the radio, for testing. Take the blades off and secure the helicopter first.    |                                                                   |
| Throttle       | Throttle protocol, update rate and PWM endpoints.                                                  | [Motors](/docs/configurator/tabs/motors.md)                       |
| Telemetry      | ESC telemetry protocol and corrections.                                                            | [ESC Telemetry](/docs/setup/esc-telemetry.md)                     |
| RPM            | Where RPM comes from, the main and tail motor gear ratios and the pole count.                      | [RPM Measurement](/docs/setup/rpm-measurement.md)                 |
| ESC Prog.      | Change your ESC's own settings from the radio, through the flight controller. Pick the ESC's make. | [ESC Forward Programming](/docs/setup/esc-forward-programming.md) |

![Motor Override page](/assets/images/motor_override-bdd12a200d1bc1d342127fd521a28cb2.png)

![ESC Prog. menu](/assets/images/esc_forward_menu-b752acf16d430edce706f1a3a91bb4ae.png)

Each ESC page shows the ESC it found, then its settings in groups:

![ESC Prog., Hobbywing V5](/assets/images/esc_forward_hw5-d66696a105c3bec90b2ce42618fa00e9.png)

### Governor[​](#governor "Direct link to Governor")

The governor's mode and timing, in four pages. Its per-profile settings (head speed and gains) are under [Flight Tuning → Governor](/docs/setup/radio-setup/radio-setup-ethos/lua-suite/flight-tuning.md#governor).

![Governor menu](/assets/images/setup_governor_menu-8b57c72768629084d31044093486bf3d.png)

| Page         | What it is for                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| General      | Governor mode, throttle type, idle and auto throttle, handover throttle and the throttle hold timeout. |
| Ramp Time    | Startup, spoolup, spooldown, tracking and recovery times.                                              |
| Filters      | Head speed and voltage filter cutoffs, TTA and precomp bandwidth, and the D-term cutoff.               |
| Bypass Curve | The throttle curve used when the governor is bypassed.                                                 |

![Governor, General page](/assets/images/setup_governor_general-fbd19c79af36f66a7a6154312003f935.png)

![Governor Bypass Curve page](/assets/images/setup_governor_curves-2f8ef95caeab7661164a9c33ac958723.png)

See [Governor](/docs/configurator/tabs/governor.md).
