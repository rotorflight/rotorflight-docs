# Technical Reference

Developer documentation for the firmware: how its internals work, and how to
build, customise and debug it. These pages used to live in the firmware
repository's `docs/` folder.

Some of them describe mechanisms Rotorflight inherited from Betaflight and
Cleanflight, and still mention those projects; the concepts still apply.

| Page | About |
| --- | --- |
| [Parameter Groups](parameter-groups.md) | How settings are stored and versioned. |
| [Configuration Format](configuration-format.md) | The structure of the stored configuration. |
| [Atomic Barrier](atomic-barrier.md) | The `ATOMIC_BLOCK` and barrier macros. |
| [Customizing the Build](customizing-the-build.md) | Choosing which features go into a build. |
| [Custom Board Configuration](custom-boards.md) | Defining a board's pins and devices with the CLI. |
| [Blackbox Log Format](blackbox-format.md) | How Blackbox logs are encoded. |
| [Governor Reference](governor.md) | Governor modes, states and every setting in detail. |
| [SmartFuel Internals](smartfuel.md) | The SmartFuel charge estimator in detail. |
| [Tune Advisor Internals](tune-advisor.md) | What the Tune Advisor measures, its advice rules, and exactly which settings it writes. |
| [Hardware Debugging](hardware-debugging.md) | Debugging on the board with a debug probe. |
| [Debugging with VS Code and J-Link](hardware-debugging-vscode-jlink.md) | A VS Code set-up for the above. |
| [Test Coverage](test-coverage.md) | Measuring unit test coverage. |
| [Modeling Cross-Coupling](modeling-cross-coupling.md) | Theory behind cyclic cross-coupling compensation. |

For using the governor, see [Governor](../../setup/governor.md).
