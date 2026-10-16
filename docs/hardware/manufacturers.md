# For Manufacturers

The Rotorflight team works with manufacturers on flight controllers for
Rotorflight, and welcomes new designs. Get in touch on the
[Rotorflight Discord](https://discord.gg/FyfMF4RwSA) or at
admin@rotorflight.org.

## Reference designs

To be fully supported, a Rotorflight flight controller should follow one of
the **reference designs**. They fix the parts that matter to the software --
the STM32 pin, timer and DMA allocation, and a minimum feature set -- and
leave size, form factor and connectors to you. Features marked *optional*
can be left out; everything else must be there.

Following a reference design means your board gets the full Configurator
experience -- labelled ports, presets -- without special
handling.

| Design | Used by |
| --- | --- |
| [F7A](https://github.com/rotorflight/rotorflight-ref-design/blob/master/Reference-Design-F7A.md) | Radiomaster Nexus |
| [F7B](https://github.com/rotorflight/rotorflight-ref-design/blob/master/Reference-Design-F7B.md) | FrSky VANTAC RF007 |
| [F7C](https://github.com/rotorflight/rotorflight-ref-design/blob/master/Reference-Design-F7C.md) | Radiomaster Nexus X / XR |

Start with the general
[FC design requirements](https://github.com/rotorflight/rotorflight-ref-design/blob/master/FC-Design-Requirements.md),
which build on Betaflight's
[manufacturer design guidelines](https://github.com/betaflight/betaflight/blob/master/docs/Manufacturer%20Design%20Guidelines.md).
Everything is in the
[rotorflight-ref-design](https://github.com/rotorflight/rotorflight-ref-design)
repository.

## Board configurations

Board configurations live in the
[rotorflight-targets](https://github.com/rotorflight/rotorflight-targets)
repository, and are offered by the Configurator's firmware flasher.

## Testing

The team can help test a new design -- electrically, with different
receivers and ESCs, and in flight with experienced pilots.
