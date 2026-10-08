# Flight Tuning

**Flight Tuning** holds the settings you change most at the field: PIDs, rates, the governor and the rotor settings. The pages are the same settings as the Configurator's, so each section below links to the page that explains them.

![The Flight Tuning menu](/assets/images/flight-tuning-menu-d85cf14a76331443a9cdf5aa7f45e913.png)

The menu scrolls: below **Advanced** there is a further row with **Rescue** and **Rate Options**.

![The Flight Tuning menu, scrolled down](/assets/images/flight-tuning-menu-2-d85cf14a76331443a9cdf5aa7f45e913.png)

Most of these pages belong to a PID or rate profile, shown in the title as *PIDs #1* and so on. To work on another profile, switch to it (from the radio, or with [Select Profile](/docs/setup/radio-setup/radio-setup-ethos/lua-suite/tools-and-logs.md#select-profile)) and the page follows.

## PIDs[​](#pids "Direct link to PIDs")

P, I, D, F, O and B for roll, pitch and yaw.

![PIDs page](/assets/images/pids-6c5e15a32107602c0a43920fa11979b0.png)

See [Profiles](/docs/configurator/tabs/profiles.md).

## Rates[​](#rates "Direct link to Rates")

RC Rate, Rate and RC Expo for roll, pitch, yaw and collective, for the active rate profile. The column headings follow the rate type chosen under [Rate Options → Rate Table](#rate-options).

![Rates page](/assets/images/rates-185b7925dc5f816dcc80e398df0d0298.png)

See [Rates](/docs/configurator/tabs/rates.md).

## Tune Advisor[​](#tune-advisor "Direct link to Tune Advisor")

Unlike the other pages, the Tune Advisor is the radio's own. While you fly in rate mode, the flight controller measures how the model answers the sticks, and each time you disarm the radio stores that flight's results. Pick an axis to see how it responds and stops, and what the advisor suggests changing and why. **Tool** clears the data it has collected.

![Tune Advisor page](/assets/images/tune_advisor-4877e2df71dd5dea525dc2572057cff0.png)

## Governor[​](#governor "Direct link to Governor")

The governor's per-profile settings, in two pages: **General** (head speed, throttle limits, fallback drop and gains) and **Behaviour** (precomp, spoolup, voltage compensation and dynamic minimum throttle). The governor's mode and timing are under [Setup → Governor](/docs/setup/radio-setup/radio-setup-ethos/lua-suite/setup.md#governor).

![Governor, General page](/assets/images/governor_general-cfcbeff3f8021ef3859958fb48ee5308.png)

See [Governor](/docs/configurator/tabs/governor.md) and [Tune Governor](/docs/Tuning/Tune-Governor.md).

## Filters[​](#filters "Direct link to Filters")

The gyro lowpass filters (type, cutoff, and dynamic range) and the notch filters. The page scrolls.

![Filters page](/assets/images/filters-972a846046cc8a6906161b6c6cad8267.png)

See [First Flight Filter Tuning](/docs/Tuning/First-Flight-Filter-Tuning.md).

## PID Controller[​](#pid-controller "Direct link to PID Controller")

How the PID loop handles error: ground and in-flight error decay, error limits, HSI offset limit and I-term relax. The page scrolls.

![PID Controller page](/assets/images/pid_controller-15e167c8668ff36901f28620c9a3e72a.png)

See [Profiles](/docs/configurator/tabs/profiles.md).

## PID Bandwidth[​](#pid-bandwidth "Direct link to PID Bandwidth")

Cutoff frequencies for the gyro, D-term and B-term, per axis.

![PID Bandwidth page](/assets/images/pid_bandwidth-1c93d33fa0527baaabbd9c33d92122d0.png)

## Autolevel[​](#autolevel "Direct link to Autolevel")

Gain and maximum angle for Acro Trainer and Angle mode, and the Horizon mode gain.

![Autolevel page](/assets/images/autolevel-476348329bdf712d6ad78bcb78477c50.png)

See [Modes](/docs/configurator/tabs/modes.md).

## Main Rotor[​](#main-rotor "Direct link to Main Rotor")

Collective pitch compensation and cyclic cross coupling.

![Main Rotor page](/assets/images/main_rotor-03ccef67d607bf1e046567d40e93b1e7.png)

See [Cyclic Cross Coupling](/docs/Tuning/Cyclic-Cross-Coupling.md).

## Tail Rotor[​](#tail-rotor "Direct link to Tail Rotor")

Yaw stop gains, precomp, inertia precomp and tail torque assist.

![Tail Rotor page](/assets/images/tail_rotor-95ba10f3a6a700807dcef568e1129bea.png)

See [Motorised Tail and TTA](/docs/Tuning/Motorised-Tail-and-TTA.md).

## Rescue[​](#rescue "Direct link to Rescue")

Rescue mode: whether it flips to upright, and the pull-up, climb, hover and flip stages. The page scrolls.

![Rescue page](/assets/images/rescue-44ee1d89e49cdb01593846406b736a39.png)

See [Rescue Mode Settings](/docs/Tuning/Rescue-mode-settings.md).

## Rate Options[​](#rate-options "Direct link to Rate Options")

A menu of three pages: **Advanced** (response time, acceleration limit, setpoint boost and dynamic ceiling gain per axis), **Cyclic Behav.** (cyclic ring and polarity) and **Rate Table** (the rate type the Rates page uses).

![Rate Options menu](/assets/images/rates_advanced_menu-4172e4634e6d37a163ef3174090e3eff.png)

![Rate Options, Advanced page](/assets/images/rates_advanced-68b37fbf04ea2989299773738a0cf6aa.png)

See [Rates](/docs/configurator/tabs/rates.md).
