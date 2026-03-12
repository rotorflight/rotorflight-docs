# Adding an extra servo

## Add an extra servo controlled by an AUX channel.[​](#add-an-extra-servo-controlled-by-an-aux-channel "Direct link to Add an extra servo controlled by an AUX channel.")

note

Sometimes we may wish to add an extra servo to our helicopter to be controlled by our Tx for something like retracts on a scale machine or a camera etc. This can be done using the remapping spreadsheet. In the example below we will add Servo 5 to be controlled by the AUX 3 channel.

**Step 1:** Assign the servo to your chosen pin. In the pic below we have assigned Servo 5 to Serial Rx 2.

![Adding Servo](/assets/images/remapping-servo-1-44ea0e54c2a85eba885811d15d93c38c.png)

**Step 2:** Assign the timer to your new servo. This timer cannot clash with motors, frequency or LED\_STRIP. They can be assigned to the same timer as one of your other servos; however, it then will need to be set to the same frequency (e.g. if one is set to 333Hz they will both need to be set to 333Hz). If it can be assigned to a totally different timer then you can assign whatever frequency you like.

![Adding Servo](/assets/images/remapping-servo-timer-f89810dc3ab28ebb49b3afbcfd04cddb.png)

**Step 3:** In the 'Advanced' section assign your AUX channel to servo 5 and then select and copy the mixer config displayed.

![Adding Servo](/assets/images/remapping-servo-mixer-36b484595746284c36686737d8f04dba.png)

**Step 4:** Open the configurator and go to the CLI page. Paste the config from the mixer into the command line and click \[ENTER]. Type save and click \[ENTER].

![Adding Servo](/assets/images/remapping-servo-cli-1f4e0ca3cf391148b7c5a28306cfd988.png)
