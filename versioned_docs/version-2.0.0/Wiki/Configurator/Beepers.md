---
sidebar_position: 150
---

# Beepers tab

If required the Beeper function can be enabled on UART pin, the example below can be copied and pasted into the CLI section then type save and enter. This example has the Beeper on UART(B) RX pin

resource SERIAL\_RX 6 NONE

resource BEEPER 1 C06

The Beeper required MUST be 5v and buffered to protect the UART output.

If the Beeper remains a constant tone on powerup enter this into the cli

set beeper\_inversion = ON, then type save and exit

These have been tested and working, you may find these or similar local to your location.

[Beeper1](https://www.aliexpress.com/item/1005004267414201.html?spm=a2g0o.order_list.order_list_main.64.739a1802Yex7Yd)

[Beeper2](https://www.aliexpress.com/item/1005001963381520.html?spm=a2g0o.order_list.order_list_main.70.739a1802Yex7Yd)

Under the Beepers tab in the Rotorflight configurator you can select the required alerts

![Step 1](./img/beeper-3.png)
