# Upgrade Notes

What changes between major Rotorflight versions, and what you have to set up
again after upgrading. The full technical change list is in the firmware's
[Changes.md](https://github.com/rotorflight/rotorflight-firmware/blob/release/4.6.0/Changes.md).

## Upgrade procedure

1. Update the Configurator first.
2. [Back up](backup-and-restore.md) your configuration with `diff all` and
   save it to a file.
3. [Flash](flashing-the-firmware.md) the new firmware with **Full chip
   erase**.
4. Restore the backup, then go through the list for your version below.
5. Update the Lua suite on your radio to the same version.
6. Check the controls, servo directions, governor and failsafe before
   flying -- blades off for anything that spins the motor.

## 2.2 to 2.3 (firmware 4.6.0)

**Set up again after restoring:**

- **Governor.** The governor was rewritten. Governor modes are now `OFF`,
  `LIMIT`, `DIRECT`, `ELECTRIC` and `NITRO`, with new throttle types and
  ramp settings. Old governor settings don't map across -- go through the
  [Governor](../setup/governor.md) setup again.
- **Rates.** The default rate type is now `ROTORFLIGHT` (maximum rate,
  expo and shape). Backups restore your old rate type, but the
  `cyclic_ring` setting now means a percentage of the maximum rate; check it
  on the [Rates](../configurator/tabs/rates.md) tab.
- **Throttle range.** `rc_arm_throttle` is gone, and the minimum and
  maximum throttle are now worked out from the receiver's stick travel
  (`rc_min_throttle`/`rc_max_throttle` default to 0 = automatic). Check the
  throttle reads 0% and 100% on the [Receiver](../configurator/tabs/receiver.md)
  tab.
- **Motor pole count** now defaults to 0, which turns off RPM measurement
  until you enter the correct number. A `diff all` from 2.2 doesn't
  contain the old default of 8 -- if you relied on it, set it again on the
  [Motors](../configurator/tabs/motors.md) tab.
- **Battery.** Capacity, cell count and cell voltages are now kept per
  battery profile (six of them). An old backup only fills in profile 1.
- **PID loop on F4/F7.** The gyro rate on F4 and F7 boards dropped from 8 kHz
  to 4 kHz. Because the PID loop is a divider of the gyro rate, it halves too
  -- check the PID loop frequency on the
  [Configuration](../configurator/tabs/configuration.md) tab.

**Changed behaviour and defaults:**

- **SmartFuel** is a new battery charge estimate that never jumps back up
  in flight. See [SmartFuel](../setup/smartfuel.md).
- **Servo or mixer override** now blocks arming (`OVERRIDE` arming flag).
- Motor override switches off by itself if the Configurator stops sending
  it for a second.
- Blackbox now logs only while armed, with rolling erase and governor data
  on, by default.
- Rescue does a flip to upright by default (`rescue_flip = ON`), and
  arming is refused while rescue is active.
- The default stick deadband is 5, and the default battery alert is at 35%.
- **PID mode 4** is available for testing new controller features. PID
  mode 3 stays the default and is unchanged.
- New: **IBUS2** receivers, **FBUS master** output, ESC telemetry to
  Spektrum radios, forward programming for ZTW and OMP ESCs.

## 2.1 to 2.2 (firmware 4.5.0)

**Set up again after restoring:**

- **RPM filter** -- redo it on the [Gyro](../configurator/tabs/gyro.md) tab.
- **Telemetry sensors** are now configured the same way for every protocol
  -- reselect them on the [Receiver](../configurator/tabs/receiver.md) tab.
- **Gyro rate** was reduced on some boards, so check the PID loop and
  Blackbox logging rates.
- **PID modes 1 and 2** were removed; profiles using them must be tuned
  again in PID mode 3.
- **D-term mode** `ERROR` was removed (it's always `GYRO` now); retune D
  on profiles that used it.
- **Yaw collective impulse** was removed.

Renamed: `crsf_telemetry_sensors` → `telemetry_sensors`,
`crsf_telemetry_interval` → `telemetry_interval`. The individual
`telemetry_enable_*` switches, `pid_dterm_mode`, the `*_decay_*_curve`
settings and the `*_error_cutoff` settings were removed.
