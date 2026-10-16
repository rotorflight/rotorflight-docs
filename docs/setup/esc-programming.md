# ESC Forward Programming

Forward programming lets you change your ESC's settings through the flight
controller -- from your radio with the Lua suite -- instead of a programming
card or the manufacturer's software.

It works with Hobbywing Platinum V5, Scorpion Tribunus, YGE, FlyRotor, XDFly,
OMP and ZTW ESCs, over the ESC telemetry wire used in both directions.

## Telemetry-wire ESCs

Forward programming works over the [ESC telemetry](esc-telemetry.md)
connection, but the wire has to carry data both ways.

1. Set up [ESC telemetry](esc-telemetry.md) for your ESC first.
2. On the [Motors](../configurator/tabs/motors.md#esc-telemetry) tab, turn
   on **Half-Duplex**. The UART then sends and receives on one pin.
3. Half-duplex uses the UART's **TX** pin. Either:
    - wire the ESC telemetry lead to a free UART **TX** pad, with **Pin
      Swap** off; or
    - keep it on a UART **RX** pad -- for example the *SBUS*, *DSM* or *TLM*
      port on a Rotorflight flight controller -- and turn **Pin Swap** on
      (F7, G4 and H7 flight controllers only).
4. Save, then power the flight controller and ESC up together.

## Programming

=== "Ethos"

    In the Rotorflight Lua suite, open **Setup → ESC & Motors → ESC
    Prog.** and pick
    your ESC. The settings are grouped into pages such as Basic, Advanced
    and Other. See [Rotorflight Lua Suite](../radio/ethos/lua-suite.md).

=== "EdgeTX"

    In RFSuite, open the ESC tools page and pick your ESC. See
    [EdgeTX Lua Suite](../radio/edgetx/lua-suite.md).

Some ESCs need a power cycle before new settings take effect.

!!! danger
    Changing ESC settings can start the motor. Blades off.
