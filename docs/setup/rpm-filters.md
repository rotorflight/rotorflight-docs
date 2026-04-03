# RPM Filters

## Introduction[​](#introduction "Direct link to Introduction")

RPM filters clean up the gyro signals by filtering out vibrations that are coming from the rotating parts in a helicopter: the main rotor, tail rotor and motor(s).

The difference between an unfiltered and filtered signal is significant. Here's an example of filtered and unfiltered gyro signals:

![Gyro signals](/rotorflight-docs/assets/images/rpm-unfiltered-20b6697aa790a2143f27566f94663ca7.png)

RPM filtered gyro signals enable you to tune the helicopter better, for example by being able to use higher gains.

The RPM filters require real time motor speed information to be available to the flight controller. This can be obtained with a [Frequency Sensor](/rotorflight-docs/docs/setup/rpm-measurement.md#frequency-sensor) or by using [Bidirectional DSHOT](/rotorflight-docs/docs/setup/rpm-measurement.md#bi-directional-dshot).

Once the FC knows the motor speed, it can calculate the main and tail rotor speeds. For this it needs to know the *Main Rotor Gear Ratio* and the *Tail Rotor Gear Ratio*, which you can specify in the *Motors* tab.

For example, here are the ratios for my Gaui X3.

![Gear ratios](/rotorflight-docs/assets/images/motors-gear-ratios-e78d5d9f7edfdfa808e39ec7459b55d8.png)

note

Direct drive motors have a ratio of 1:1.

In order to use RPM filters, proceed to the *Gyro* tab, and enable the filters as shown below.

## Basic RPM Filters Settings[​](#basic-rpm-filters-settings "Direct link to Basic RPM Filters Settings")

These settings should be ok for a first flight.

![RPM Filters](/rotorflight-docs/assets/images/rpm-filters-set-1-1ed77e515775eb8c4c0f469c416f7a9c.png)

![RPM Filters](/rotorflight-docs/assets/images/rpm-filters-set-2-e7ed76de18502bfa21152b083b9a00c9.png)

Filters introduce latency. More filters mean more latency. So try to keep the number of filters low.

Double filters provide heavier filtering than single filters, but are also slower. They are sometimes needed on the 1st and/or 2nd harmonic.

tip

The Q factor defines how wide the filter is:

* Lower Q values make the filter wider
* Higher Q values make the filter smaller

Wider filters are slower than narrow filters, so try to make the filters as small as possible without it being ineffective.

## Filter Tuning[​](#filter-tuning "Direct link to Filter Tuning")

Make a blackbox log of a short flight with constant headspeed. Scroll to the point where the heli has spooled up and is hovering. Mark that point with the `I` key. Scroll near the end and mark that with the `O` key. Now bring up the *Analyzer Display* and enlarge it. It might look like:

![Missing filters](/rotorflight-docs/assets/images/rpm-filters-missing-636f4c3a9a935c4644dea41490fb2cae.png)

This log was made with only a double fundamental filter. As you can see there's some noise around 144Hz. Since the headspeed is 4200 RPM, that must be near the second harmonic (4200/60 = 70\*2 = 140Hz). Also note that the gyro signal in the background is also a bit noisy.

Now let's add some single filters for the 2nd (140Hz) and 3rd (210Hz) harmonic. Suddenly the log looks a lot cleaner:

![Added filters](/rotorflight-docs/assets/images/rpm-filters-added-e59278055fba570a444e245705faac94.png)
