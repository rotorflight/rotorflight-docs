# CLI Reference

The Rotorflight Command Line Interface (CLI) gives direct access to the flight controller's configuration and diagnostic functions. It is available through the **CLI tab** in Rotorflight Configurator, or via any serial terminal connected to a UART configured for MSP.

## Accessing the CLI[​](#accessing-the-cli "Direct link to Accessing the CLI")

**Via Configurator:** Click the **CLI** tab in the left-hand navigation. The CLI is ready immediately — no special activation is needed.

**Via serial terminal:** Connect to the UART at the configured baud rate (default 115200) and send a `#` character to activate the CLI.

## Basic Usage[​](#basic-usage "Direct link to Basic Usage")

| Key / Command   | Action                                   |
| --------------- | ---------------------------------------- |
| `help`          | List all available commands              |
| `help <search>` | Search commands by name or description   |
| `<Tab>`         | Auto-complete command or argument        |
| `save`          | Save settings to EEPROM and reboot       |
| `exit`          | Exit CLI without saving (or power cycle) |

Lines beginning with `#` are treated as comments and ignored.

***

## Configuration Management[​](#configuration-management "Direct link to Configuration Management")

### `diff`[​](#diff "Direct link to diff")

Lists all settings that differ from the firmware defaults. This is the recommended way to produce a backup because the output is compact and portable.

```
diff [master|profile|rates|hardware|all] {defaults|bare}
```

| Sub-option | Effect                                          |
| ---------- | ----------------------------------------------- |
| *(none)*   | Current PID and rate profile only               |
| `all`      | All profiles                                    |
| `master`   | Global (non-profile) settings                   |
| `profile`  | Current PID profile                             |
| `rates`    | Current rate profile                            |
| `hardware` | Hardware-level settings (pin assignments, etc.) |
| `defaults` | Include values that match defaults              |
| `bare`     | Omit `#` comment headers — useful for scripting |

```
# Recommended backup command
diff all
```

### `dump`[​](#dump "Direct link to dump")

Outputs every setting and its current value. The output is much larger than `diff` but is fully self-contained.

```
dump [master|profile|rates|hardware|all] {defaults|bare}
```

The sub-options are identical to those for `diff`.

### `defaults`[​](#defaults "Direct link to defaults")

Resets all settings back to firmware defaults and reboots.

```
defaults {show} {nosave} {bare} {group_id <id>}
```

| Option          | Effect                                                      |
| --------------- | ----------------------------------------------------------- |
| *(none)*        | Reset to defaults and save/reboot                           |
| `nosave`        | Reset in RAM only — do not save or reboot                   |
| `show`          | Print the custom-defaults block without applying it         |
| `bare`          | Apply firmware defaults, ignoring any custom-defaults block |
| `group_id <id>` | Reset only the parameter group with this ID                 |

### `save`[​](#save "Direct link to save")

Writes the current in-RAM configuration to EEPROM and reboots.

```
save
```

### `batch`[​](#batch "Direct link to batch")

Groups multiple commands so that they are applied atomically. If any command inside the batch fails the batch is rolled back.

```
batch start
<commands>
batch end
```

***

## Profile Management[​](#profile-management "Direct link to Profile Management")

### `profile`[​](#profile "Direct link to profile")

Shows the active PID profile, or switches to a different one. Profiles are zero-indexed (0–2).

```
profile          # show current profile index
profile <index>  # switch to profile 0, 1, or 2
```

### `rateprofile`[​](#rateprofile "Direct link to rateprofile")

Shows the active rate profile, or switches to a different one. Rate profiles are zero-indexed (0–5).

```
rateprofile          # show current rate profile index
rateprofile <index>  # switch to rate profile 0–5
```

***

## Helicopter Configuration Commands[​](#helicopter-configuration-commands "Direct link to Helicopter Configuration Commands")

These commands are specific to Rotorflight helicopter configuration.

### `mixer`[​](#mixer "Direct link to mixer")

Configures the software mixer that routes stabilised flight controller outputs to physical servos and motors.

```
mixer status
mixer reset

mixer input
mixer input reset
mixer input <input> <min> <max> <rate>

mixer limit
mixer limit <input> <min> <max>

mixer rate
mixer rate <input> <rate>

mixer rule
mixer rule reset
mixer rule <index> [set|add|mul] <input> <output> <weight> <offset> [<modes>]
mixer rule <index> del

mixer override
mixer override off
mixer override <value>
mixer override <input> <value>|off
```

**Mixer input names:**

| Name                     | Source                                                    |
| ------------------------ | --------------------------------------------------------- |
| `SR` `SP` `SY` `SC` `ST` | Stabilised Roll / Pitch / Yaw / Collective / Throttle     |
| `CR` `CP` `CY` `CC` `CT` | RC Command Roll / Pitch / Yaw / Collective / Throttle     |
| `RR` `RP` `RY` `RC` `RT` | Raw RC Channel Roll / Pitch / Yaw / Collective / Throttle |
| `AUX1` `AUX2` `AUX3`     | Auxiliary RC channels                                     |
| `CH9`–`CH18`             | RC channels 9–18                                          |

**Mixer output names:** `S1`–`S26` (servos), `M1`–`M4` (motors)

**Mixer rule operations:** `set`, `add`, `mul`

### `servo`[​](#servo "Direct link to servo")

Configures servo parameters and allows real-time override for testing.

```
servo status
servo flags
servo flags <servo> <[+|-]FLAG> ...

servo <servo> <center> <min> <max> <-scale> <+scale> <update_rate> <speed> <flags>

servo override
servo override <value>|off
servo override <servo> <value>|off
```

* `<servo>` is 1-based.
* Center, min, and max are in microseconds (typical: 1500, 1000, 2000).
* `-scale` and `+scale` are percentages (0–200).
* `update_rate` is in Hz.
* `speed` is in µs/second (0 = unlimited).

**Servo flags:**

| Flag  | Effect                                     |
| ----- | ------------------------------------------ |
| `REV` | Reverse servo direction                    |
| `GEO` | Apply geometric (trigonometric) correction |

Use `+FLAG` to set a flag, `-FLAG` to clear it:

```
servo flags 1 +REV -GEO
```

**Override range:** 500–2500 µs; `off` to release override.

### `motor`[​](#motor "Direct link to motor")

Shows motor status and allows real-time throttle override for testing.

danger

Motor override commands spin the motor. **Remove all propellers/blades before use.**

```
motor status

motor override
motor override off
motor override <index> <value>|off
```

* `<index>` is 1-based; use `0` or `all` to set all motors simultaneously.
* `<value>` range: 1000–2000 (standard ESC range).
* `off` releases the override and returns to normal control.

***

## Get / Set Variables[​](#get--set-variables "Direct link to Get / Set Variables")

### `set`[​](#set "Direct link to set")

Changes a configuration variable.

```
set                  # list all variables and current values
set <name>=<value>   # set a specific variable
```

### `get`[​](#get "Direct link to get")

Reads the current value of one or more variables. Partial name matching is supported — `get gov` will show all governor-related variables.

```
get              # list all variables with values and ranges
get <name>       # show a specific variable (partial name match supported)
```

### Parameter reference[​](#parameter-reference "Direct link to Parameter reference")

The table below lists all settable parameters, grouped by function. Parameters marked **\[profile]** are per-PID-profile; those marked **\[rates]** are per-rate-profile. All others are global (master) settings.

Use `get <prefix>` in the CLI to quickly filter a group — for example `get gov_` shows all governor parameters.

***

#### Gyro[​](#gyro "Direct link to Gyro")

| Parameter                | Range / Values                               | Description                               |
| ------------------------ | -------------------------------------------- | ----------------------------------------- |
| `gyro_hardware_lpf`      | `NORMAL` `OPTION_1` `OPTION_2`               | Hardware low-pass filter setting          |
| `gyro_rate_sync`         | `OFF` `ON`                                   | Sync gyro sample rate to PID loop         |
| `gyro_calib_duration`    | 50–3000                                      | Gyro calibration duration (ms × 10)       |
| `gyro_calib_noise_limit` | 0–200                                        | Movement threshold that halts calibration |
| `gyro_decimation_hz`     | 0–max                                        | Gyro sample decimation frequency (Hz)     |
| `gyro_lpf1_type`         | `NONE` `PT1` `PT2` `PT3` `BUTTER` `BESSEL` … | First gyro LPF filter type                |
| `gyro_lpf1_static_hz`    | 0–max                                        | First gyro LPF cutoff (Hz)                |
| `gyro_lpf1_dyn_min_hz`   | 0–max                                        | First gyro dynamic LPF minimum (Hz)       |
| `gyro_lpf1_dyn_max_hz`   | 0–max                                        | First gyro dynamic LPF maximum (Hz)       |
| `gyro_lpf2_type`         | (same as lpf1)                               | Second gyro LPF filter type               |
| `gyro_lpf2_static_hz`    | 0–max                                        | Second gyro LPF cutoff (Hz)               |
| `gyro_notch1_hz`         | 0–max                                        | Static notch filter 1 centre (Hz)         |
| `gyro_notch1_cutoff`     | 0–max                                        | Static notch filter 1 cutoff (Hz)         |
| `gyro_notch2_hz`         | 0–max                                        | Static notch filter 2 centre (Hz)         |
| `gyro_notch2_cutoff`     | 0–max                                        | Static notch filter 2 cutoff (Hz)         |
| `gyro_overflow_detect`   | `OFF` `YAW` `ALL`                            | Gyro overflow detection axis              |
| `dyn_notch_count`        | 0–max                                        | Number of dynamic notch filters           |
| `dyn_notch_q`            | 10–100                                       | Dynamic notch Q factor                    |
| `dyn_notch_min_hz`       | 10–200                                       | Dynamic notch minimum frequency (Hz)      |
| `dyn_notch_max_hz`       | 100–500                                      | Dynamic notch maximum frequency (Hz)      |
| `gyro_1_sensor_align`    | `DEFAULT` `CW0` `CW90` `CW180` `CW270` …     | Physical orientation of gyro 1            |
| `gyro_1_align_roll`      | -3600–3600                                   | Custom roll alignment (tenths of degrees) |
| `gyro_1_align_pitch`     | -3600–3600                                   | Custom pitch alignment                    |
| `gyro_1_align_yaw`       | -3600–3600                                   | Custom yaw alignment                      |

***

#### Accelerometer[​](#accelerometer "Direct link to Accelerometer")

| Parameter         | Range / Values                      | Description                                  |
| ----------------- | ----------------------------------- | -------------------------------------------- |
| `acc_hardware`    | `AUTO` `NONE` `ADXL345` `MPU6050` … | Accelerometer selection                      |
| `acc_lpf_hz`      | 0–400                               | Accelerometer LPF cutoff (Hz)                |
| `acc_trim_pitch`  | -300–300                            | Pitch trim offset (centidegrees)             |
| `acc_trim_roll`   | -300–300                            | Roll trim offset (centidegrees)              |
| `acc_calibration` | array\[4]                           | Accelerometer zero offsets + calibrated flag |

***

#### Board Alignment[​](#board-alignment "Direct link to Board Alignment")

| Parameter           | Range / Values | Description                  |
| ------------------- | -------------- | ---------------------------- |
| `align_board_roll`  | -180–360       | Board roll offset (degrees)  |
| `align_board_pitch` | -180–360       | Board pitch offset (degrees) |
| `align_board_yaw`   | -180–360       | Board yaw offset (degrees)   |

***

#### Motor[​](#motor-1 "Direct link to Motor")

| Parameter               | Range / Values                                                            | Description                                             |
| ----------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------- |
| `motor_pwm_protocol`    | `PWM` `ONESHOT125` `DSHOT150` `DSHOT300` `DSHOT600` `CASTLE` `DISABLED` … | ESC signal protocol                                     |
| `motor_pwm_rate`        | 50–8000                                                                   | PWM output rate (Hz) — not used with DShot              |
| `min_throttle`          | 1000–2000                                                                 | Minimum armed throttle command (µs)                     |
| `max_throttle`          | 1000–2000                                                                 | Maximum throttle command (µs)                           |
| `min_command`           | 1000–2000                                                                 | Disarmed/off throttle command (µs)                      |
| `use_unsynced_pwm`      | `OFF` `ON`                                                                | Allow PWM rate independent of loop rate                 |
| `dshot_bidir`           | `OFF` `ON`                                                                | Enable bidirectional DShot (required for RPM telemetry) |
| `dshot_burst`           | `OFF` `ON` `AUTO`                                                         | DShot burst mode                                        |
| `dshot_bitbang`         | `OFF` `ON` `AUTO`                                                         | Use bit-bang DShot implementation                       |
| `motor_poles`           | array\[4]                                                                 | Pole count for each motor (for RPM calculation)         |
| `motor_rpm_lpf`         | array\[4]                                                                 | LPF cutoff for each motor's RPM signal                  |
| `motor_rpm_factor`      | array\[4]                                                                 | RPM correction factor (signed, ×1000)                   |
| `main_rotor_gear_ratio` | array\[2]                                                                 | Main rotor gear ratio as numerator/denominator          |
| `tail_rotor_gear_ratio` | array\[2]                                                                 | Tail rotor gear ratio as numerator/denominator          |

***

#### Mixer (Swash)[​](#mixer-swash "Direct link to Mixer (Swash)")

| Parameter                        | Range / Values                                               | Description                                                   |
| -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| `main_rotor_dir`                 | `CW` `CCW`                                                   | Main rotor rotation direction                                 |
| `tail_rotor_mode`                | `VARIABLE` `MOTORIZED` `BIDIRECTIONAL`                       | Tail rotor type                                               |
| `tail_motor_idle`                | 0–250                                                        | Idle throttle for tail motor (motorised tail)                 |
| `tail_center_trim`               | -1000–1000                                                   | Centre trim for tail servo                                    |
| `swash_type`                     | `NONE` `PASSTHROUGH` `CP120` `CP135` `CP140` `FP90L` `FP90V` | Swashplate geometry                                           |
| `swash_ring`                     | 0–100                                                        | Cyclic ring limit (%)                                         |
| `swash_phase`                    | -1800–1800                                                   | Swash phase angle (tenths of degrees)                         |
| `swash_roll_trim`                | -1000–1000                                                   | Roll trim applied at swash                                    |
| `swash_pitch_trim`               | -1000–1000                                                   | Pitch trim applied at swash                                   |
| `swash_collective_trim`          | -1000–1000                                                   | Collective trim applied at swash                              |
| `swash_pitch_limit`              | 0–3000                                                       | Maximum swash pitch travel                                    |
| `swash_tta_precomp`              | 0–250                                                        | Throttle-to-angle precompensation                             |
| `swash_geo_correction`           | -125–125                                                     | Geometric (sine) correction strength                          |
| `collective_tilt_correction_pos` | -100–100                                                     | Collective-to-pitch coupling correction (positive collective) |
| `collective_tilt_correction_neg` | -100–100                                                     | Collective-to-pitch coupling correction (negative collective) |

***

#### Governor (Global)[​](#governor-global "Direct link to Governor (Global)")

| Parameter                   | Range / Values                            | Description                                     |
| --------------------------- | ----------------------------------------- | ----------------------------------------------- |
| `gov_mode`                  | `OFF` `LIMIT` `DIRECT` `ELECTRIC` `NITRO` | Governor operating mode                         |
| `gov_throttle_type`         | `NORMAL` `SWITCH` `FUNCTION`              | Throttle input interpretation                   |
| `gov_startup_time`          | 0–600                                     | Motor startup time (tenths of seconds)          |
| `gov_spoolup_time`          | 0–600                                     | Spool-up ramp time (tenths of seconds)          |
| `gov_tracking_time`         | 0–600                                     | Time to reach target headspeed after spoolup    |
| `gov_recovery_time`         | 0–600                                     | Recovery ramp time after a dip                  |
| `gov_spooldown_time`        | 0–600                                     | Spooldown ramp time (tenths of seconds)         |
| `gov_throttle_hold_timeout` | 0–250                                     | Timeout before autorotation mode exits          |
| `gov_autorotation_timeout`  | 0–250                                     | Autorotation entry hold timeout                 |
| `gov_handover_throttle`     | 10–100                                    | Throttle level at which governor takes over (%) |
| `gov_idle_throttle`         | 0–250                                     | Idle throttle in LIMIT mode                     |
| `gov_auto_throttle`         | 0–250                                     | Automatic collective-follow throttle            |
| `gov_bypass_throttle`       | array\[GOV\_CURVE\_POINTS]                | Throttle curve for DIRECT/NITRO mode            |
| `gov_pwr_filter`            | 0–250                                     | Power input filter cutoff                       |
| `gov_rpm_filter`            | 0–250                                     | RPM input filter cutoff                         |
| `gov_tta_filter`            | 0–250                                     | Throttle-to-angle filter cutoff                 |
| `gov_ff_filter`             | 0–250                                     | Feedforward filter cutoff                       |
| `gov_d_filter`              | 0–250                                     | D-term filter cutoff                            |

***

#### Governor (Per-Profile)[​](#governor-per-profile "Direct link to Governor (Per-Profile)")

These are part of the PID profile and differ per profile.

| Parameter                  | Range / Values | Description                                           |
| -------------------------- | -------------- | ----------------------------------------------------- |
| `gov_headspeed`            | 0–50000        | Target headspeed (RPM) **\[profile]**                 |
| `gov_gain`                 | 0–250          | Overall governor gain **\[profile]**                  |
| `gov_p_gain`               | 0–250          | Proportional gain **\[profile]**                      |
| `gov_i_gain`               | 0–250          | Integral gain **\[profile]**                          |
| `gov_d_gain`               | 0–250          | Derivative gain **\[profile]**                        |
| `gov_f_gain`               | 0–250          | Feedforward gain **\[profile]**                       |
| `gov_p_limit`              | 0–100          | P-term output limit (%) **\[profile]**                |
| `gov_i_limit`              | 0–100          | I-term output limit (%) **\[profile]**                |
| `gov_d_limit`              | 0–100          | D-term output limit (%) **\[profile]**                |
| `gov_f_limit`              | 0–100          | Feedforward output limit (%) **\[profile]**           |
| `gov_tta_gain`             | 0–250          | Throttle-to-angle gain **\[profile]**                 |
| `gov_tta_limit`            | 0–250          | TTA output limit **\[profile]**                       |
| `gov_yaw_ff_weight`        | 0–250          | Yaw torque feedforward weight **\[profile]**          |
| `gov_cyclic_ff_weight`     | 0–250          | Cyclic load feedforward weight **\[profile]**         |
| `gov_collective_ff_weight` | 0–250          | Collective load feedforward weight **\[profile]**     |
| `gov_max_throttle`         | 10–100         | Maximum governor output throttle (%) **\[profile]**   |
| `gov_min_throttle`         | 10–100         | Minimum governor output throttle (%) **\[profile]**   |
| `gov_fallback_drop`        | 0–50           | Throttle reduction during RPM fallback **\[profile]** |
| `gov_collective_curve`     | 5–40           | Collective feedforward curve shape **\[profile]**     |
| `gov_dyn_min_throttle`     | 0–100          | Dynamic minimum throttle level **\[profile]**         |
| `gov_use_fallback_precomp` | `OFF` `ON`     | Enable fallback precompensation **\[profile]**        |
| `gov_use_pid_spoolup`      | `OFF` `ON`     | Use PID output during spoolup **\[profile]**          |
| `gov_use_voltage_comp`     | `OFF` `ON`     | Enable battery voltage compensation **\[profile]**    |
| `gov_use_dyn_min_throttle` | `OFF` `ON`     | Enable dynamic minimum throttle **\[profile]**        |

***

#### PID Gains (Per-Profile)[​](#pid-gains-per-profile "Direct link to PID Gains (Per-Profile)")

| Parameter                      | Range / Values   | Description                                                     |
| ------------------------------ | ---------------- | --------------------------------------------------------------- |
| `pid_mode`                     | 0–9              | PID controller mode **\[profile]**                              |
| `pitch_p_gain`                 | 0–2000           | Pitch P gain **\[profile]**                                     |
| `pitch_i_gain`                 | 0–2000           | Pitch I gain **\[profile]**                                     |
| `pitch_d_gain`                 | 0–2000           | Pitch D gain **\[profile]**                                     |
| `pitch_f_gain`                 | 0–2000           | Pitch feedforward gain **\[profile]**                           |
| `pitch_b_gain`                 | 0–2000           | Pitch B-term (boost) gain **\[profile]**                        |
| `pitch_o_gain`                 | 0–2000           | Pitch offset gain **\[profile]**                                |
| `roll_p_gain`                  | 0–2000           | Roll P gain **\[profile]**                                      |
| `roll_i_gain`                  | 0–2000           | Roll I gain **\[profile]**                                      |
| `roll_d_gain`                  | 0–2000           | Roll D gain **\[profile]**                                      |
| `roll_f_gain`                  | 0–2000           | Roll feedforward gain **\[profile]**                            |
| `roll_b_gain`                  | 0–2000           | Roll B-term (boost) gain **\[profile]**                         |
| `roll_o_gain`                  | 0–2000           | Roll offset gain **\[profile]**                                 |
| `yaw_p_gain`                   | 0–2000           | Yaw P gain **\[profile]**                                       |
| `yaw_i_gain`                   | 0–2000           | Yaw I gain **\[profile]**                                       |
| `yaw_d_gain`                   | 0–2000           | Yaw D gain **\[profile]**                                       |
| `yaw_f_gain`                   | 0–2000           | Yaw feedforward gain **\[profile]**                             |
| `yaw_b_gain`                   | 0–2000           | Yaw B-term (boost) gain **\[profile]**                          |
| `pitch_d_cutoff`               | 0–250            | Pitch D-term filter cutoff **\[profile]**                       |
| `pitch_b_cutoff`               | 0–250            | Pitch B-term filter cutoff **\[profile]**                       |
| `pitch_gyro_cutoff`            | 0–250            | Pitch gyro pre-filter cutoff **\[profile]**                     |
| `roll_d_cutoff`                | 0–250            | Roll D-term filter cutoff **\[profile]**                        |
| `roll_b_cutoff`                | 0–250            | Roll B-term filter cutoff **\[profile]**                        |
| `roll_gyro_cutoff`             | 0–250            | Roll gyro pre-filter cutoff **\[profile]**                      |
| `yaw_d_cutoff`                 | 0–250            | Yaw D-term filter cutoff **\[profile]**                         |
| `yaw_b_cutoff`                 | 0–250            | Yaw B-term filter cutoff **\[profile]**                         |
| `yaw_gyro_cutoff`              | 0–250            | Yaw gyro pre-filter cutoff **\[profile]**                       |
| `yaw_cw_stop_gain`             | 25–250           | Stop gain for clockwise yaw rotation **\[profile]**             |
| `yaw_ccw_stop_gain`            | 25–250           | Stop gain for counter-clockwise yaw rotation **\[profile]**     |
| `yaw_precomp_cutoff`           | 0–250            | Yaw precompensation filter cutoff **\[profile]**                |
| `yaw_cyclic_ff_gain`           | 0–250            | Yaw cyclic feedforward gain **\[profile]**                      |
| `yaw_collective_ff_gain`       | 0–250            | Yaw collective feedforward gain **\[profile]**                  |
| `yaw_inertia_precomp_gain`     | 0–250            | Yaw inertia precompensation gain **\[profile]**                 |
| `yaw_inertia_precomp_cutoff`   | 0–250            | Yaw inertia precompensation cutoff **\[profile]**               |
| `pitch_collective_ff_gain`     | 0–250            | Pitch collective feedforward gain **\[profile]**                |
| `cyclic_cross_coupling_gain`   | 0–250            | Cyclic cross-coupling compensation gain **\[profile]**          |
| `cyclic_cross_coupling_ratio`  | 0–200            | Roll-to-pitch coupling ratio **\[profile]**                     |
| `cyclic_cross_coupling_cutoff` | 1–250            | Cross-coupling filter cutoff **\[profile]**                     |
| `error_limit`                  | array\[3]        | Max error accumulation per axis (Roll/Pitch/Yaw) **\[profile]** |
| `offset_limit`                 | array\[2]        | Max offset per axis (Roll/Pitch) **\[profile]**                 |
| `error_decay_time_ground`      | 0–250            | I-term decay speed on the ground **\[profile]**                 |
| `error_decay_time_cyclic`      | 0–250            | I-term decay speed in air (cyclic) **\[profile]**               |
| `error_decay_time_yaw`         | 0–250            | I-term decay speed in air (yaw) **\[profile]**                  |
| `error_decay_limit_cyclic`     | 0–250            | I-term decay lower limit (cyclic) **\[profile]**                |
| `error_decay_limit_yaw`        | 0–250            | I-term decay lower limit (yaw) **\[profile]**                   |
| `iterm_relax_type`             | `OFF` `RP` `RPY` | I-term relax axis selection **\[profile]**                      |
| `iterm_relax_level`            | array\[3]        | I-term relax level per axis **\[profile]**                      |
| `iterm_relax_cutoff`           | array\[3]        | I-term relax filter cutoff per axis **\[profile]**              |
| `offset_flood_relax_level`     | 10–250           | Offset flood relaxation level **\[profile]**                    |
| `offset_flood_relax_cutoff`    | 1–100            | Offset flood relaxation filter cutoff **\[profile]**            |
| `pid_process_denom`            | 1–16             | PID loop denominator (divides gyro rate)                        |
| `filter_process_denom`         | 0–16             | Filter task denominator                                         |

***

#### Rescue Mode (Per-Profile)[​](#rescue-mode-per-profile "Direct link to Rescue Mode (Per-Profile)")

| Parameter                   | Range / Values           | Description                                               |
| --------------------------- | ------------------------ | --------------------------------------------------------- |
| `rescue_mode`               | `OFF` `CLIMB` `ALT_HOLD` | Rescue mode type **\[profile]**                           |
| `rescue_flip`               | `OFF` `ON`               | Enable auto-flip during rescue **\[profile]**             |
| `rescue_flip_gain`          | 5–250                    | Flip authority gain **\[profile]**                        |
| `rescue_level_gain`         | 5–250                    | Levelling authority gain **\[profile]**                   |
| `rescue_pull_up_time`       | 0–250                    | Pull-up phase duration (tenths of seconds) **\[profile]** |
| `rescue_climb_time`         | 0–250                    | Climb phase duration **\[profile]**                       |
| `rescue_flip_time`          | 0–250                    | Flip phase duration **\[profile]**                        |
| `rescue_exit_time`          | 0–250                    | Exit/handback phase duration **\[profile]**               |
| `rescue_pull_up_collective` | 0–1000                   | Collective during pull-up **\[profile]**                  |
| `rescue_climb_collective`   | 0–1000                   | Collective during climb **\[profile]**                    |
| `rescue_hover_collective`   | 0–1000                   | Collective at hover **\[profile]**                        |
| `rescue_hover_altitude`     | 0–10000                  | Target hover altitude (cm) **\[profile]**                 |
| `rescue_alt_p_gain`         | 0–10000                  | Altitude hold P gain **\[profile]**                       |
| `rescue_alt_i_gain`         | 0–10000                  | Altitude hold I gain **\[profile]**                       |
| `rescue_alt_d_gain`         | 0–10000                  | Altitude hold D gain **\[profile]**                       |
| `rescue_max_sp_rate`        | 1–1000                   | Max setpoint rate during rescue **\[profile]**            |
| `rescue_max_sp_accel`       | 1–10000                  | Max setpoint acceleration during rescue **\[profile]**    |
| `rescue_max_collective`     | 1–1000                   | Max collective during rescue **\[profile]**               |

***

#### Stability Modes (Per-Profile)[​](#stability-modes-per-profile "Direct link to Stability Modes (Per-Profile)")

| Parameter                  | Range / Values | Description                                               |
| -------------------------- | -------------- | --------------------------------------------------------- |
| `angle_level_strength`     | 0–200          | Self-level authority in Angle mode **\[profile]**         |
| `angle_level_limit`        | 10–90          | Max tilt in Angle mode (degrees) **\[profile]**           |
| `horizon_level_strength`   | 0–200          | Self-level authority in Horizon mode **\[profile]**       |
| `horizon_transition`       | 0–200          | Stick range over which Horizon transitions **\[profile]** |
| `horizon_tilt_effect`      | 0–250          | Tilt suppression in Horizon mode **\[profile]**           |
| `horizon_tilt_expert_mode` | `OFF` `ON`     | Expert tilt calculation mode **\[profile]**               |

***

#### Rate Profile[​](#rate-profile "Direct link to Rate Profile")

| Parameter                | Range / Values                                                         | Description                                   |
| ------------------------ | ---------------------------------------------------------------------- | --------------------------------------------- |
| `rateprofile_name`       | string                                                                 | Rate profile label **\[rates]**               |
| `rates_type`             | `NONE` `BETAFLIGHT` `RACEFLIGHT` `KISS` `ACTUAL` `QUICK` `ROTORFLIGHT` | Rate algorithm **\[rates]**                   |
| `roll_rc_rate`           | 1–255                                                                  | Roll RC rate **\[rates]**                     |
| `pitch_rc_rate`          | 1–255                                                                  | Pitch RC rate **\[rates]**                    |
| `yaw_rc_rate`            | 1–255                                                                  | Yaw RC rate **\[rates]**                      |
| `collective_rc_rate`     | 1–255                                                                  | Collective RC rate **\[rates]**               |
| `roll_expo`              | 0–100                                                                  | Roll expo **\[rates]**                        |
| `pitch_expo`             | 0–100                                                                  | Pitch expo **\[rates]**                       |
| `yaw_expo`               | 0–100                                                                  | Yaw expo **\[rates]**                         |
| `collective_expo`        | 0–100                                                                  | Collective expo **\[rates]**                  |
| `roll_srate`             | 0–255                                                                  | Roll super-rate **\[rates]**                  |
| `pitch_srate`            | 0–255                                                                  | Pitch super-rate **\[rates]**                 |
| `yaw_srate`              | 0–255                                                                  | Yaw super-rate **\[rates]**                   |
| `collective_srate`       | 0–255                                                                  | Collective super-rate **\[rates]**            |
| `roll_accel_limit`       | 0–50000                                                                | Roll acceleration limit (deg/s²) **\[rates]** |
| `pitch_accel_limit`      | 0–50000                                                                | Pitch acceleration limit **\[rates]**         |
| `yaw_accel_limit`        | 0–50000                                                                | Yaw acceleration limit **\[rates]**           |
| `collective_accel_limit` | 0–50000                                                                | Collective acceleration limit **\[rates]**    |
| `roll_response`          | 0–250                                                                  | Roll response time filter **\[rates]**        |
| `pitch_response`         | 0–250                                                                  | Pitch response time filter **\[rates]**       |
| `yaw_response`           | 0–250                                                                  | Yaw response time filter **\[rates]**         |
| `collective_response`    | 0–250                                                                  | Collective response time filter **\[rates]**  |
| `cyclic_ring`            | 0–250                                                                  | Cyclic ring limit **\[rates]**                |
| `roll_level_expo`        | 0–100                                                                  | Roll level-mode expo **\[rates]**             |
| `pitch_level_expo`       | 0–100                                                                  | Pitch level-mode expo **\[rates]**            |
| `setpoint_boost_gain`    | array\[4]                                                              | Setpoint boost gain per axis **\[rates]**     |
| `setpoint_boost_cutoff`  | array\[4]                                                              | Setpoint boost cutoff per axis **\[rates]**   |

***

#### RC Controls[​](#rc-controls "Direct link to RC Controls")

| Parameter         | Range / Values | Description                       |
| ----------------- | -------------- | --------------------------------- |
| `rc_center`       | 1200–1700      | RC channel centre value (µs)      |
| `rc_deflection`   | 250–750        | RC channel half-deflection (µs)   |
| `rc_min_throttle` | 0–2100         | RC throttle minimum (µs)          |
| `rc_max_throttle` | 0–2100         | RC throttle maximum (µs)          |
| `rc_smoothness`   | 0–250          | RC input smoothing strength       |
| `rc_threshold`    | array\[4]      | Dead-zone threshold per axis      |
| `deadband`        | 0–100          | Cyclic stick deadband (µs)        |
| `yaw_deadband`    | 0–100          | Yaw stick deadband (µs)           |
| `rx_pulse_min`    | 750–2250       | Minimum valid RC pulse width (µs) |
| `rx_pulse_max`    | 750–2250       | Maximum valid RC pulse width (µs) |

***

#### Receiver[​](#receiver "Direct link to Receiver")

| Parameter                   | Range / Values                               | Description                              |
| --------------------------- | -------------------------------------------- | ---------------------------------------- |
| `serialrx_provider`         | `SBUS` `CRSF` `FBUS` `IBUS` `SRXL2` `GHST` … | Serial RX protocol                       |
| `serialrx_inverted`         | `OFF` `ON`                                   | Invert serial RX signal                  |
| `serialrx_halfduplex`       | `OFF` `ON`                                   | Use half-duplex UART                     |
| `rssi_channel`              | 0–18                                         | AUX channel carrying RSSI (0 = disabled) |
| `rssi_scale`                | 1–255                                        | RSSI scale factor                        |
| `rssi_offset`               | -100–100                                     | RSSI offset                              |
| `rssi_invert`               | `OFF` `ON`                                   | Invert RSSI value                        |
| `sbus_baud_fast`            | `OFF` `ON`                                   | Use 200 kbps SBUS instead of 100 kbps    |
| `crsf_use_rx_snr`           | `OFF` `ON`                                   | Use SNR for RSSI in CRSF                 |
| `crsf_telemetry_mode`       | `NATIVE` `CUSTOM`                            | CRSF telemetry mode                      |
| `crsf_telemetry_link_rate`  | 0–50000                                      | Custom CRSF telemetry link rate          |
| `crsf_telemetry_link_ratio` | 0–50000                                      | Custom CRSF telemetry link ratio         |

***

#### Failsafe[​](#failsafe "Direct link to Failsafe")

| Parameter                     | Range / Values                  | Description                                              |
| ----------------------------- | ------------------------------- | -------------------------------------------------------- |
| `failsafe_delay`              | 1–200                           | Time before Stage 1 activates (tenths of seconds)        |
| `failsafe_off_delay`          | 0–200                           | Time before Stage 2 activates after Stage 1              |
| `failsafe_throttle`           | 900–2100                        | Throttle value during failsafe (µs)                      |
| `failsafe_switch_mode`        | `STAGE1` `KILL` `STAGE2`        | Behaviour when failsafe switch is used                   |
| `failsafe_throttle_low_delay` | 0–300                           | Delay before allowing throttle-low arming after failsafe |
| `failsafe_procedure`          | `AUTO-LAND` `DROP` `GPS-RESCUE` | Failsafe procedure                                       |
| `failsafe_recovery_delay`     | 0–200                           | Hold time after signal returns before exit (tenths of s) |
| `failsafe_stick_threshold`    | 0–50                            | Stick movement threshold to confirm recovery             |

***

#### Battery & Voltage[​](#battery--voltage "Direct link to Battery & Voltage")

| Parameter                                         | Range / Values     | Description                                      |
| ------------------------------------------------- | ------------------ | ------------------------------------------------ |
| `battery_cell_count`                              | 0–24               | Manual cell count override (0 = auto-detect)     |
| `vbat_max_cell_voltage`                           | 100–500            | Maximum cell voltage (centivolts)                |
| `vbat_full_cell_voltage`                          | 100–500            | Full cell voltage                                |
| `vbat_min_cell_voltage`                           | 100–500            | Minimum cell voltage (cutoff warning)            |
| `vbat_warning_cell_voltage`                       | 100–500            | Warning cell voltage                             |
| `vbat_hysteresis`                                 | 0–250              | Voltage alarm hysteresis                         |
| `vbat_detect_cell_voltage`                        | 0–2000             | Voltage below which battery is considered absent |
| `vbat_scale`                                      | 1–4095             | ADC voltage divider scale                        |
| `vbat_divider`                                    | 1–255              | ADC voltage divider value                        |
| `vbat_multiplier`                                 | 1–255              | ADC voltage multiplier                           |
| `vbat_cutoff`                                     | 0–250              | ADC reading cutoff filter                        |
| `vbec_scale` / `vbec_divider` / `vbec_multiplier` | —                  | BEC voltage ADC calibration                      |
| `vbus_scale` / `vbus_divider` / `vbus_multiplier` | —                  | Bus voltage ADC calibration                      |
| `vext_scale` / `vext_divider` / `vext_multiplier` | —                  | External voltage ADC calibration                 |
| `ibata_scale`                                     | -16000–16000       | Battery current sensor scale                     |
| `ibata_offset`                                    | -32000–32000       | Battery current sensor offset                    |
| `current_meter`                                   | `NONE` `ADC` `ESC` | Current sensor source                            |
| `battery_meter`                                   | `NONE` `ADC` `ESC` | Voltage sensor source                            |
| `bat_capacity`                                    | array              | Battery capacity per profile (mAh)               |
| `vbat_lpf_hz`                                     | 0–255              | Voltage LPF cutoff (Hz)                          |
| `ibat_lpf_hz`                                     | 0–255              | Current LPF cutoff (Hz)                          |
| `use_vbat_alerts`                                 | `OFF` `ON`         | Enable voltage alerts                            |
| `use_cbat_alerts`                                 | `OFF` `ON`         | Enable capacity alerts                           |
| `cbat_alert_percent`                              | 0–100              | Capacity remaining alert threshold (%)           |
| `vbat_cutoff_percent`                             | 0–100              | Cutoff warning at this % of cells                |

***

#### Arming[​](#arming "Direct link to Arming")

| Parameter               | Range / Values | Description                                                          |
| ----------------------- | -------------- | -------------------------------------------------------------------- |
| `auto_disarm_delay`     | 0–60           | Auto-disarm after this many seconds on the ground (0 = off)          |
| `gyro_cal_on_first_arm` | `OFF` `ON`     | Calibrate gyro on first arm                                          |
| `pwr_on_arm_grace`      | 0–30           | Seconds after power-on in which arming is allowed without gyro check |
| `enable_stick_arming`   | `OFF` `ON`     | Enable stick-based arm/disarm                                        |
| `enable_stick_commands` | `OFF` `ON`     | Enable stick-combo commands                                          |
| `wiggle_strength`       | 0–100          | Swash wiggle amplitude (%)                                           |
| `wiggle_frequency`      | 2–50           | Swash wiggle frequency (Hz)                                          |
| `wiggle_enable_ready`   | `OFF` `ON`     | Wiggle when ready to arm                                             |
| `wiggle_enable_armed`   | `OFF` `ON`     | Wiggle on arm                                                        |
| `wiggle_enable_error`   | `OFF` `ON`     | Wiggle on arming error                                               |
| `wiggle_enable_fatal`   | `OFF` `ON`     | Wiggle on fatal error                                                |

***

#### RPM Filter[​](#rpm-filter "Direct link to RPM Filter")

| Parameter                     | Range / Values | Description                        |
| ----------------------------- | -------------- | ---------------------------------- |
| `gyro_rpm_notch_preset`       | 0–3            | RPM filter preset (0 = custom)     |
| `gyro_rpm_notch_min_hz`       | 1–100          | Minimum notch frequency (Hz)       |
| `gyro_rpm_notch_source_pitch` | array          | RPM source for each pitch notch    |
| `gyro_rpm_notch_center_pitch` | array          | Centre offset for each pitch notch |
| `gyro_rpm_notch_q_pitch`      | array          | Q factor for each pitch notch      |
| `gyro_rpm_notch_source_roll`  | array          | RPM source for each roll notch     |
| `gyro_rpm_notch_center_roll`  | array          | Centre offset for each roll notch  |
| `gyro_rpm_notch_q_roll`       | array          | Q factor for each roll notch       |
| `gyro_rpm_notch_source_yaw`   | array          | RPM source for each yaw notch      |
| `gyro_rpm_notch_center_yaw`   | array          | Centre offset for each yaw notch   |
| `gyro_rpm_notch_q_yaw`        | array          | Q factor for each yaw notch        |

***

#### ESC Sensor[​](#esc-sensor "Direct link to ESC Sensor")

| Parameter                           | Range / Values                                                                                                                                     | Description                        |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `esc_sensor_protocol`               | `OFF` `BLHELI32` `HOBBYWINGV4` `HOBBYWINGV5` `SCORPION` `KONTRONIK` `OMPHOBBY` `ZTW` `APD` `OPENYGE` `FLYROTOR` `GRAUPNER` `XDFLY` `FBUS` `RECORD` | ESC telemetry protocol             |
| `esc_sensor_halfduplex`             | `OFF` `ON`                                                                                                                                         | Half-duplex UART mode              |
| `esc_sensor_update_hz`              | 4–500                                                                                                                                              | Polling rate (Hz)                  |
| `esc_sensor_current_offset`         | 0–16000                                                                                                                                            | Current zero offset                |
| `esc_sensor_filter_cutoff`          | 0–250                                                                                                                                              | Output LPF cutoff                  |
| `esc_sensor_voltage_correction`     | -100–125                                                                                                                                           | Voltage scaling correction (%)     |
| `esc_sensor_current_correction`     | -100–125                                                                                                                                           | Current scaling correction (%)     |
| `esc_sensor_consumption_correction` | -100–125                                                                                                                                           | Consumption scaling correction (%) |

***

#### Blackbox[​](#blackbox "Direct link to Blackbox")

| Parameter               | Range / Values                      | Description                              |
| ----------------------- | ----------------------------------- | ---------------------------------------- |
| `blackbox_mode`         | `OFF` `NORMAL` `ARMED` `SWITCH`     | When to record                           |
| `blackbox_device`       | `NONE` `SPIFLASH` `SDCARD` `SERIAL` | Storage device                           |
| `blackbox_rate_denom`   | 1–8000                              | Logging rate denominator (1 = full rate) |
| `blackbox_grace_period` | 0–60                                | Seconds to log after disarm              |
| `blackbox_log_command`  | `OFF` `ON`                          | Log RC commands                          |
| `blackbox_log_setpoint` | `OFF` `ON`                          | Log setpoints                            |
| `blackbox_log_mixer`    | `OFF` `ON`                          | Log mixer outputs                        |
| `blackbox_log_pid`      | `OFF` `ON`                          | Log PID terms                            |
| `blackbox_log_gyro`     | `OFF` `ON`                          | Log filtered gyro                        |
| `blackbox_log_gyro_raw` | `OFF` `ON`                          | Log raw gyro                             |
| `blackbox_log_attitude` | `OFF` `ON`                          | Log attitude (roll/pitch/yaw angles)     |
| `blackbox_log_motors`   | `OFF` `ON`                          | Log motor outputs                        |
| `blackbox_log_servos`   | `OFF` `ON`                          | Log servo outputs                        |
| `blackbox_log_rpm`      | `OFF` `ON`                          | Log RPM data                             |
| `blackbox_log_battery`  | `OFF` `ON`                          | Log battery voltage and current          |
| `blackbox_log_governor` | `OFF` `ON`                          | Log governor state                       |
| `blackbox_log_esc`      | `OFF` `ON`                          | Log ESC telemetry                        |
| `blackbox_log_rssi`     | `OFF` `ON`                          | Log RSSI                                 |

***

#### Telemetry[​](#telemetry "Direct link to Telemetry")

| Parameter             | Range / Values      | Description                           |
| --------------------- | ------------------- | ------------------------------------- |
| `tlm_inverted`        | `OFF` `ON`          | Invert telemetry signal               |
| `tlm_halfduplex`      | `OFF` `ON`          | Half-duplex telemetry UART            |
| `report_cell_voltage` | `OFF` `ON`          | Report per-cell voltage via telemetry |
| `smartfuel`           | `OFF` `ON`          | Enable SmartFuel telemetry            |
| `smartfuel_source`    | `CURRENT` `VOLTAGE` | SmartFuel fuel-level source           |
| `telemetry_sensors`   | array               | Sensor IDs to include in telemetry    |
| `telemetry_interval`  | array               | Interval per sensor slot (ms)         |

***

#### FBUS Master / SBUS Output[​](#fbus-master--sbus-output "Direct link to FBUS Master / SBUS Output")

| Parameter                       | Range / Values | Description                            |
| ------------------------------- | -------------- | -------------------------------------- |
| `fbus_master_frame_rate`        | 25–550         | FBUS master output rate (Hz)           |
| `fbus_master_pinswap`           | `OFF` `ON`     | Swap TX/RX pins                        |
| `fbus_master_inverted`          | `OFF` `ON`     | Invert FBUS output                     |
| `fbus_master_telemetry_rate`    | min–max        | Telemetry polling rate (Hz)            |
| `fbus_master_discovery_ms`      | min–max        | Sensor discovery window (ms)           |
| `fbus_master_forwarded_sensors` | array          | Sensor IDs to forward                  |
| `sbus_out_frame_rate`           | 25–250         | SBUS output frame rate (Hz)            |
| `sbus_out_pinswap`              | `OFF` `ON`     | Swap TX/RX pins                        |
| `sbus_out_inverted`             | `OFF` `ON`     | Invert SBUS output                     |
| `sport_master_pinswap`          | `OFF` `ON`     | Swap TX/RX pins on S.Port master       |
| `sport_master_inverted`         | `OFF` `ON`     | Invert S.Port master signal            |
| `bus_servo_source_type`         | array          | Source type for each bus servo channel |

***

#### Pilot / Model Info[​](#pilot--model-info "Direct link to Pilot / Model Info")

| Parameter                                   | Range / Values          | Description                             |
| ------------------------------------------- | ----------------------- | --------------------------------------- |
| `name`                                      | string                  | Craft name (shown in OSD and telemetry) |
| `display_name`                              | string                  | Display name                            |
| `model_id`                                  | 0–99                    | Model slot number                       |
| `model_param1_type` … `model_param3_type`   | `NONE` `TIMER1` … `GV9` | Type of custom model parameter          |
| `model_param1_value` … `model_param3_value` | any int16               | Value of custom model parameter         |
| `model_set_name`                            | `OFF` `ON`              | Broadcast model name in telemetry       |
| `model_tell_capacity`                       | `OFF` `ON`              | Broadcast battery capacity in telemetry |

***

#### System[​](#system "Direct link to System")

| Parameter                 | Range / Values         | Description                                            |
| ------------------------- | ---------------------- | ------------------------------------------------------ |
| `debug_mode`              | (see `get debug_mode`) | Debug variable output slot selection                   |
| `debug_axis`              | 0–255                  | Axis selection for debug output                        |
| `task_statistics`         | `OFF` `ON`             | Track per-task timing statistics                       |
| `scheduler_relax_rx`      | 0–500                  | RX task determinism relaxation                         |
| `scheduler_relax_osd`     | 0–500                  | OSD task determinism relaxation                        |
| `serial_update_rate_hz`   | 100–2000               | Serial port update rate                                |
| `reboot_character`        | 48–126                 | ASCII character that triggers CLI entry on serial port |
| `imu_dcm_kp`              | 0–32000                | DCM complementary filter proportional gain             |
| `imu_dcm_ki`              | 0–32000                | DCM complementary filter integral gain                 |
| `timezone_offset_minutes` | -840–840               | UTC offset for RTC clock                               |

***

## System Information[​](#system-information "Direct link to System Information")

### `status`[​](#status "Direct link to status")

Displays a snapshot of the flight controller state: MCU type, clock speed, stack usage, EEPROM usage, detected sensors, active features, and armed/disarmed status.

```
status
```

### `version`[​](#version "Direct link to version")

Prints firmware version, build date, and target name.

```
version
```

### `tasks`[​](#tasks "Direct link to tasks")

Prints the scheduler task list with timing statistics (execution time, max, average, interval).

```
tasks
```

### `mcu_id`[​](#mcu_id "Direct link to mcu_id")

Prints the unique hardware ID of the microcontroller.

```
mcu_id
```

### `setpoint_info`[​](#setpoint_info "Direct link to setpoint_info")

Shows the current operational parameters of the setpoint smoothing filters.

```
setpoint_info
```

***

## Receiver & RC[​](#receiver--rc "Direct link to Receiver & RC")

### `aux`[​](#aux "Direct link to aux")

Configures flight mode activation ranges on auxiliary RC channels.

```
aux <index> <mode> <aux> <start> <end> <logic>
```

* `<aux>` is 0-based (AUX1 = 0).
* `<start>` and `<end>` are channel values in µs (900–2100).
* `<logic>`: 0 = normal, 1 = AND with previous range.

### `rxfail`[​](#rxfail "Direct link to rxfail")

Shows or sets per-channel failsafe behaviour.

```
rxfail                           # show all channel failsafe settings
rxfail <channel> <mode> [value]  # set failsafe for a channel
```

Modes: `a` (auto), `h` (hold), `s` (set to value).

### `map`[​](#map "Direct link to map")

Shows or sets the RC channel input mapping.

```
map           # show current mapping
map <AETR>    # set mapping (A=aileron/roll, E=elevator/pitch, T=throttle, R=rudder/yaw)
```

***

## Feature Management[​](#feature-management "Direct link to Feature Management")

### `feature`[​](#feature "Direct link to feature")

Enables or disables firmware features.

```
feature list         # list all features and their state
feature <name>       # enable a feature
feature -<name>      # disable a feature
```

Available features include: `RX_PPM`, `RX_SERIAL`, `SOFTSERIAL`, `GPS`, `RANGEFINDER`, `TELEMETRY`, `RX_PARALLEL_PWM`, `RX_MSP`, `RSSI_ADC`, `LED_STRIP`, `DASHBOARD`, `OSD`, `CMS`, `RX_SPI`, `GOVERNOR`, `ESC_SENSOR`, `FREQ_SENSOR`, `DYN_NOTCH`, `RPM_FILTER`.

***

## Hardware Configuration[​](#hardware-configuration "Direct link to Hardware Configuration")

### `resource`[​](#resource "Direct link to resource")

Shows or reassigns pin/peripheral resources.

```
resource                              # list all assigned resources
resource show [all]                   # detailed resource listing
resource <name> <index> <pin>|none    # assign a resource to a pin
```

Pin format: `A01`, `B04`, `C13`, etc.

### `timer`[​](#timer "Direct link to timer")

Shows or reassigns timer channels.

```
timer                                         # list configured timers
timer list                                    # list all timers
timer show                                    # show timer assignments
timer <pin> list                              # list options for a pin
timer <pin> [af<n>|none]                      # assign alternate function
```

### `dma`[​](#dma "Direct link to dma")

Shows or reassigns DMA streams/channels (on targets that support DMA remapping).

```
dma show
dma list
dma <device> <index> list
dma <device> <index> [<option>|none]
```

### `serial`[​](#serial "Direct link to serial")

Shows or configures serial port functions, baud rates, and modes.

```
serial    # list all serial port configurations
serial <identifier> <function> <mspBaud> <gpsBaud> <teleBaud> <blackboxBaud>
```

***

## ESC Programming[​](#esc-programming "Direct link to ESC Programming")

### `dshotprog`[​](#dshotprog "Direct link to dshotprog")

Sends DShot ESC commands.

```
dshotprog <index> <command>+
```

`<index>` selects the motor (1-based); `<command>` is a DShot command number.

### `dshot_telemetry_info`[​](#dshot_telemetry_info "Direct link to dshot_telemetry_info")

Displays DShot telemetry statistics (if DShot telemetry is enabled).

```
dshot_telemetry_info
```

### `beacon`[​](#beacon "Direct link to beacon")

Enables or disables the DShot beacon for specific arming conditions.

```
beacon list
beacon [<-><name>]
```

### `escprog`[​](#escprog "Direct link to escprog")

Passes through serial data to an ESC for programming (BLHeli/BLHeli\_32/Kira configurator).

```
escprog <mode> <index>
```

Modes: `sk` (SimonK), `bl` (BLHeli), `ki` (Kira), `cc` (Castle Creations).

***

## FBUS / S.Port[​](#fbus--sport "Direct link to FBUS / S.Port")

### `fbus_sensors`[​](#fbus_sensors "Direct link to fbus_sensors")

Shows all sensor IDs observed on the FBUS/S.Port bus. Useful for diagnosing sensor connections.

```
fbus_sensors         # show detected sensors
fbus_sensors clear   # clear the sensor list
```

***

## Serial Passthrough[​](#serial-passthrough "Direct link to Serial Passthrough")

### `serialpassthrough`[​](#serialpassthrough "Direct link to serialpassthrough")

Bridges a hardware UART directly to the USB VCP (or another UART). Used for ESC passthrough programming when the ESC is connected to a UART on the FC.

```
serialpassthrough <id1> [<baud1>] [<mode1>] [none|<dtr pinio>|reset] [<id2>] [<baud2>] [<mode2>]
```

* `<id>` is the serial port identifier number.
* `<mode>` is a combination of `rx`, `tx` characters (e.g. `rxtx`).
* DTR pinio: a PINIO number used to assert DTR for BLHeli passthrough.

***

## Adjustment Functions[​](#adjustment-functions "Direct link to Adjustment Functions")

### `adjfunc`[​](#adjfunc "Direct link to adjfunc")

Configures an inflight adjustment mapping — a range on an AUX channel that trims or switches a parameter.

```
adjfunc <index> <func> <enable_ch> <ena_start> <ena_end> <adj_ch> <dec_start> <dec_end> <inc_start> <inc_end> <step> <min> <max>
```

| Parameter               | Description                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| `index`                 | Slot number (0-based)                                                  |
| `func`                  | Adjustment function ID                                                 |
| `enable_ch`             | AUX channel that gates this adjustment (0-based; 0xFF = always active) |
| `ena_start` / `ena_end` | Channel value range (µs) that enables this slot                        |
| `adj_ch`                | AUX channel that provides the increment/decrement signal               |
| `dec_start` / `dec_end` | Channel value range that decrements the value                          |
| `inc_start` / `inc_end` | Channel value range that increments the value                          |
| `step`                  | Amount to change per activation                                        |
| `min` / `max`           | Clamping limits for the adjusted parameter                             |

***

## LED Strip & Colours[​](#led-strip--colours "Direct link to LED Strip & Colours")

These commands are only available when `LED_STRIP` is enabled.

### `led`[​](#led "Direct link to led")

Configures individual LED positions and functions.

```
led
led <index> <x,y:function:color:direction>
```

### `color`[​](#color "Direct link to color")

Configures the colour palette used by LED strip animations.

```
color
color <index> <hue,saturation,value>
```

### `mode_color`[​](#mode_color "Direct link to mode_color")

Sets the colours used for each flight mode in LED strip status mode.

```
mode_color
mode_color <mode> <direction> <colorIndex>
```

***

## VTX Control[​](#vtx-control "Direct link to VTX Control")

### `vtx`[​](#vtx "Direct link to vtx")

Configures VTX band/channel/power switching on AUX channel ranges.

```
vtx
vtx <index> <aux_channel> <vtx_band> <vtx_channel> <vtx_power> <start_range> <end_range>
```

### `vtx_info`[​](#vtx_info "Direct link to vtx_info")

Dumps the current VTX power table.

```
vtx_info
```

### `vtxtable`[​](#vtxtable "Direct link to vtxtable")

Configures the VTX frequency table.

```
vtxtable <band> <bandname> <bandletter> [FACTORY|CUSTOM] <freq> ...
```

***

## GPS[​](#gps "Direct link to GPS")

### `gpspassthrough`[​](#gpspassthrough "Direct link to gpspassthrough")

Connects the GPS UART directly to the USB VCP for direct communication with the GPS module.

```
gpspassthrough
```

***

## Board Information[​](#board-information "Direct link to Board Information")

### `board_name`[​](#board_name "Direct link to board_name")

Gets or sets the board model name stored in firmware.

```
board_name
board_name <name>
```

### `board_design`[​](#board_design "Direct link to board_design")

Gets or sets the board design identifier.

```
board_design
board_design <name>
```

### `manufacturer_id`[​](#manufacturer_id "Direct link to manufacturer_id")

Gets or sets the manufacturer ID.

```
manufacturer_id
manufacturer_id <id>
```

### `signature`[​](#signature "Direct link to signature")

Gets or sets the board type signature.

```
signature
signature <hex-signature>
```

***

## Reboot / DFU[​](#reboot--dfu "Direct link to Reboot / DFU")

### `bl`[​](#bl "Direct link to bl")

Reboots into the bootloader.

```
bl        # reboot into ROM bootloader
bl rom    # explicitly select ROM bootloader
bl flash  # select flash-based bootloader (if present)
```

### `dfu`[​](#dfu "Direct link to dfu")

Reboots into DFU mode (STM32 USB DFU) for firmware flashing.

```
dfu
```

### `msc`[​](#msc "Direct link to msc")

Switches the flight controller into USB Mass Storage mode so the SD card appears as a drive.

```
msc                         # enter MSC mode
msc <timezone_offset_min>   # enter MSC mode with RTC timezone offset
```

***

## Flash Memory[​](#flash-memory "Direct link to Flash Memory")

These commands are available when onboard flash memory (Blackbox storage) is present.

### `flash_info`[​](#flash_info "Direct link to flash_info")

Shows the flash chip type, size, and used/free space.

```
flash_info
```

### `flash_erase`[​](#flash_erase "Direct link to flash_erase")

Erases the entire flash chip (clears all Blackbox logs).

```
flash_erase
```

***

## Gyro Diagnostics[​](#gyro-diagnostics "Direct link to Gyro Diagnostics")

### `gyroregisters`[​](#gyroregisters "Direct link to gyroregisters")

Dumps the raw register contents of the gyro IC. Useful for diagnosing hardware issues.

```
gyroregisters
```

***

## SD Card[​](#sd-card "Direct link to SD Card")

### `sd_info`[​](#sd_info "Direct link to sd_info")

Shows SD card type, capacity, and filesystem state.

```
sd_info
```

***

## Examples[​](#examples "Direct link to Examples")

### Backup your configuration[​](#backup-your-configuration "Direct link to Backup your configuration")

```
diff all
```

Click **Save to File** in Configurator to store the output.

### Restore from a backup[​](#restore-from-a-backup "Direct link to Restore from a backup")

Open the backup file using **Load from File** in Configurator, then click **Execute**. Once complete:

```
save
```

### Test a servo without flying[​](#test-a-servo-without-flying "Direct link to Test a servo without flying")

```
servo override 1 1200    # push servo 1 to 1200 µs
servo override 1 1800    # push servo 1 to 1800 µs
servo override off       # release all servo overrides
```

### Check what mixer rules are active[​](#check-what-mixer-rules-are-active "Direct link to Check what mixer rules are active")

```
mixer rule
```

### Enable RPM filtering[​](#enable-rpm-filtering "Direct link to Enable RPM filtering")

```
feature RPM_FILTER
save
```

### Switch profile and confirm[​](#switch-profile-and-confirm "Direct link to Switch profile and confirm")

```
profile 1
profile
```
