# FrSky Ethos Missing Sensors

Ethos Missing Sensors

This guide will help with the error shown below: This error is shown where the Ethos Suite LUA is not receiving a sensor(s) from the FBL it requires to operate.

![Ethos](/assets/images/ethos-missing-1-1c856d98914403647d37193e04d0b4f3.jpg)

Press the \[SYS] key and scroll to the Rotorflight LUA, enter the LUA

![Ethos](/assets/images/ethos-missing-2-0bebd1feeeec73834045b2a7f652a5de.jpg)

Scroll to the sensors tab and enter.

![Ethos](/assets/images/ethos-missing-3-fdf9b5cc0a4685976cd0fd2e28e9cb64.jpg)

An image similar to this will appear showing a missing sensor or sensors.

![Ethos](/assets/images/ethos-missing-4-6b9e080ee8fea0f6a7e66212a2043d05.jpg)

Highlight and press the \* icon at the top

![Ethos](/assets/images/ethos-missing-5-0c86b05eb92ffd523efd5edc0c1fc857.jpg)

The flight controller will restart after the changes are applied.

![Ethos](/assets/images/ethos-missing-6-383f58fe42b7c4e1599c0cab60db039a.jpg)

NOTE: If the \* option is not available you will be required to upgrade your Rotorflight firmware to at least RC1 or add the sensors manually in the receiver \ telemetry options, delete all and re-discover sensors.

You can as a short cut, if so desired, enter this in the cli then enter save.

set telemetry\_sensors = 3,5,6,15,18,23,52,60,90,91,93,95,96,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0

Again, delete and re-discover sensors

NOTE: At this point its good practice to re-start the radio to remove any cache values previously stored.
