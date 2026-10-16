<p align="center">
  <img src="assets/rf_icon.png" alt="Rotorflight" width="120">
</p>

# Rotorflight

**Rotorflight** is open-source flight control software for single-rotor RC
helicopters. It started as a fork of Betaflight and has since grown a full set
of helicopter-specific features: a swashplate mixer with geometry correction,
an integrated motor governor for electric and nitro, RPM-based filtering, tail
precompensation, rescue and stability modes, and much more.

Rotorflight is helicopter-only. It does not support multirotors or fixed-wing
aircraft -- for planes, see its sister project
[WingFlight](https://doc.wingflight.org).

## The Rotorflight suite

| Component | What it does |
| --- | --- |
| **Firmware** | Runs on the flight controller. Flashed from the Configurator. |
| **[Configurator](configurator/index.md)** | Flashes, configures and tunes the flight controller. Runs as a desktop app or in the browser at [cfg.rotorflight.org](https://cfg.rotorflight.org). |
| **Blackbox Explorer** | Reviews flight logs recorded by the flight controller. |
| **[Lua suites](radio/index.md)** | Configure and tune at the field from an FrSky Ethos or EdgeTX radio, with dashboards, telemetry callouts and ESC programming. |

## Where to start

- **New to Rotorflight?** Start with [Getting Started](getting-started/index.md),
  which goes from a bare flight controller to a first connection.
- **Building a helicopter?** The [Setup Guides](setup/index.md) walk through
  servos, swashplate, ESC, governor and RPM filters in the order you need them.
- **Looking for a setting?** The [Configurator](configurator/index.md) section
  covers every tab, field by field.
- **Setting up your radio?** See [Radio & Lua](radio/index.md).
- **Tuning?** See [Tuning](tuning/index.md).
- **Choosing hardware?** See the supported [flight controllers](hardware/index.md).
- **Looking for CLI parameters or telemetry sensor IDs?** See
  [Reference](reference/index.md).

!!! info "Which version do these docs cover?"
    These pages cover **Rotorflight 2.3**, the current stable release. Docs
    for the upcoming 2.4 release are in the version menu at the top. See the
    [Upgrade Notes](getting-started/upgrade-notes.md) for what changed
    between versions.

## Getting help

Join the [Rotorflight Discord](https://discord.gg/FyfMF4RwSA) for setup help,
tuning advice and project discussion. Bugs and feature requests go to the
issue tracker of the relevant repository on
[GitHub](https://github.com/rotorflight).
