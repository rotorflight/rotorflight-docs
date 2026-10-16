# Profile Switching

Rotorflight has six PID profiles and six rate profiles. Switching profiles
from your radio lets you fly different tunes -- and, with the governor,
different headspeeds -- on one helicopter. It's like "banks" on other
flybarless systems.

A common setup: a 3-position flight mode switch selects both a headspeed
and a profile, so each headspeed has a tune made for it.

## On the radio

Put a 3-position switch on a spare channel, sending about 1000 / 1500 /
2000 µs. Here it's channel 9, which Rotorflight calls **AUX 4** (channels
1-5 are roll, pitch, yaw, collective and throttle).

Check on the [Receiver](../configurator/tabs/receiver.md) tab that the
switch moves the AUX 4 bar through three positions.

## In the Configurator

On the [Adjustments](../configurator/tabs/adjustments.md) tab:

1. **Add Adjustment** → **Profile Selection** (the PID profile).
2. Type **Mapped**.
3. **Enable Channel** AUX 4, and stretch its range across the whole channel
   so it's always on.
4. **Value Channel** AUX 4, also across the whole range.
5. **Value** 1 to 3.
6. **Save**.

Switch up, middle and down now select profiles 1, 2 and 3. Watch the
active profile change on the [Profiles](../configurator/tabs/profiles.md)
tab as you flick the switch.

To switch **rates** with the same switch, add a second adjustment the same
way with **Rate Profile Selection**.

## Headspeeds per profile

With the governor, each profile has its own **Full Headspeed** (on the
Profiles tab), so the same switch also changes headspeed -- the throttle
channel can stay at 100%. See [Governor Setup](governor-setup.md#3-throttle-on-the-radio).

!!! tip "Copy, then tweak"
    Set up profile 1 first, then use **Copy profile** on the Profiles tab
    to copy it to profiles 2 and 3, and change only what should differ.

## Other ways to switch

- The **Lua suite** on your radio can switch profiles.
- **Battery Profile Selection** works the same way, for helicopters that
  fly packs of different capacity. See [Power](../configurator/tabs/power.md#battery).
- **Stick commands**, with `enable_stick_commands = ON` and disarmed:
  collective low + yaw left + roll left / pitch forward / roll right selects PID
  profile 1 / 2 / 3.
