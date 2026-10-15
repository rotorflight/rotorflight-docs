# Other Radios

Any radio whose receiver speaks a protocol Rotorflight supports can fly a
Rotorflight helicopter -- see the protocol list on the
[Receiver](../configurator/tabs/receiver.md#protocol) tab:

| Radio system | Use |
| --- | --- |
| [Spektrum](../reference/receivers.md#spektrum-receiver-settings) | SRXL2 receivers (telemetry, binding from the Configurator), or DSM satellites |
| FlySky | iBUS, or iBUS2 for control and telemetry |
| Graupner HoTT | SUMD, plus HoTT telemetry on a separate port |
| JR | XBUS |
| ImmersionRC Ghost | GHOST |
| Any ExpressLRS or Crossfire module | CRSF |

Set up the radio as in [Radio & Lua](index.md#what-every-radio-needs):
separate collective and throttle channels, a throttle hold, an arm switch,
and no mixing or trims on the cyclic and tail.

Got a setup guide for a radio that isn't covered here? See
[Editing the Docs](../contributing/editing-the-docs.md) -- contributions are
welcome.
