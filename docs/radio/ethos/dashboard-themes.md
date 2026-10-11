# Dashboard Themes

The RFSuite dashboard widget comes with several themes. A theme decides what the dashboard shows and how it
looks. Each theme has three layouts: **preflight** before you arm, **inflight** while you fly, and **postflight**
after you land. The dashboard switches between them by itself.

## Choosing a theme

Open **Settings → Dashboard → Themes** in RFSuite.

- Pick one theme for all three phases, or turn off **Use same theme** and pick a different one for each phase.
- With the heli connected, you can also set a theme for that model only. It replaces the global choice for that
  model.
- Themes with **Own settings** in the table have options of their own, such as gauge ranges, under **Settings →
  Dashboard → Settings**.

| Theme | Own settings | Screen |
| --- | --- | --- |
| [Default](#default) | Yes | Any |
| [AERC](#aerc) | Yes | Any |
| [AERC Nitro](#aerc-nitro) | Yes | Any |
| [Basic Timer](#basic-timer) |  | Any |
| [Bastion](#bastion) | Yes | 784 × 294 or larger |
| [Claude](#claude) | Yes | Any |
| [DanielRC](#danielrc) |  | Any |
| [Gismo](#gismo) | Yes | Any |
| [HeliHUD](#helihud) |  | Any |
| [Kevd](#kevd) | Yes | 784 × 294 or larger |
| [KSE4](#kse4) |  | Any |
| [KSE5](#kse5) | Yes | Any |
| [RF Status](#rf-status) | Yes | Any |
| [RT-RC](#rt-rc) | Yes | Any |
| [RT-RC Nitro](#rt-rc-nitro) | Yes | Any |
| [SRB-RC](#srb-rc) | Yes | Any |

## Default { #default }

A large voltage arc beside the flight time and link quality. Before the flight it also shows the model image,
profiles, flight count and Blackbox use.

=== "Preflight"

    ![Default preflight](img/themes/default-preflight.png){ width="560" }

=== "Inflight"

    ![Default inflight](img/themes/default-inflight.png){ width="560" }

=== "Postflight"

    ![Default postflight](img/themes/default-postflight.png){ width="560" }

## AERC { #aerc }

Arcs for throttle, headspeed and ESC temperature, each with its maximum, under the flight time and a fuel bar
with pack voltage and mAh used.

=== "Preflight"

    ![AERC preflight](img/themes/aerc-preflight.png){ width="560" }

=== "Inflight"

    ![AERC inflight](img/themes/aerc-inflight.png){ width="560" }

=== "Postflight"

    ![AERC postflight](img/themes/aerc-postflight.png){ width="560" }

## AERC Nitro { #aerc-nitro }

For nitro helis: headspeed and throttle arcs either side of a segmented BEC voltage bar, with the flight time
on top.

=== "Preflight"

    ![AERC Nitro preflight](img/themes/aerc-nitro-preflight.png){ width="560" }

=== "Inflight"

    ![AERC Nitro inflight](img/themes/aerc-nitro-inflight.png){ width="560" }

=== "Postflight"

    ![AERC Nitro postflight](img/themes/aerc-nitro-postflight.png){ width="560" }

## Basic Timer { #basic-timer }

A large flight timer, with the profiles, flight count and link quality below it.

=== "Preflight"

    ![Basic Timer preflight](img/themes/basic-timer-preflight.png){ width="560" }

=== "Inflight"

    ![Basic Timer inflight](img/themes/basic-timer-inflight.png){ width="560" }

=== "Postflight"

    ![Basic Timer postflight](img/themes/basic-timer-postflight.png){ width="560" }

## Bastion { #bastion }

A dense instrument panel: a central headspeed dial with ESC temperature, throttle, fuel, current, BEC voltage
and link around it. After the flight it flags anything that went out of range.

Needs a dashboard area of at least 784 × 294 pixels, so it is hidden on smaller radios such as the X18.

=== "Preflight"

    ![Bastion preflight](img/themes/bastion-preflight.png){ width="560" }

=== "Inflight"

    ![Bastion inflight](img/themes/bastion-inflight.png){ width="560" }

=== "Postflight"

    ![Bastion postflight](img/themes/bastion-postflight.png){ width="560" }

## Claude { #claude }

A voltage arc, a large fuel ring and a headspeed dial, with the timer and governor state.

=== "Preflight"

    ![Claude preflight](img/themes/claude-preflight.png){ width="560" }

=== "Inflight"

    ![Claude inflight](img/themes/claude-inflight.png){ width="560" }

=== "Postflight"

    ![Claude postflight](img/themes/claude-postflight.png){ width="560" }

## DanielRC { #danielrc }

A text panel in three groups (power, headspeed and status) with the governor state and flight time.

=== "Preflight"

    ![DanielRC preflight](img/themes/danielrc-preflight.png){ width="560" }

=== "Inflight"

    ![DanielRC inflight](img/themes/danielrc-inflight.png){ width="560" }

=== "Postflight"

    ![DanielRC postflight](img/themes/danielrc-postflight.png){ width="560" }

## Gismo { #gismo }

A large battery graphic between headspeed and timer on one side, and cell and pack voltage on the other.

=== "Preflight"

    ![Gismo preflight](img/themes/gismo-preflight.png){ width="560" }

=== "Inflight"

    ![Gismo inflight](img/themes/gismo-inflight.png){ width="560" }

=== "Postflight"

    ![Gismo postflight](img/themes/gismo-postflight.png){ width="560" }

## HeliHUD { #helihud }

A head-up display: a headspeed dial between two gauges, with cell voltage, current, ESC temperature, tail RPM,
timer and link below. After the flight it shows a flight report.

=== "Preflight"

    ![HeliHUD preflight](img/themes/helihud-preflight.png){ width="560" }

=== "Inflight"

    ![HeliHUD inflight](img/themes/helihud-inflight.png){ width="560" }

=== "Postflight"

    ![HeliHUD postflight](img/themes/helihud-postflight.png){ width="560" }

## Kevd { #kevd }

Arcs for ESC temperature, headspeed and throttle with their maximums, beside a column with the timer, fuel and
governor state.

Needs a dashboard area of at least 784 × 294 pixels, so it is hidden on smaller radios such as the X18.

=== "Preflight"

    ![Kevd preflight](img/themes/kevd-preflight.png){ width="560" }

=== "Inflight"

    ![Kevd inflight](img/themes/kevd-inflight.png){ width="560" }

=== "Postflight"

    ![Kevd postflight](img/themes/kevd-postflight.png){ width="560" }

## KSE4 { #kse4 }

A tile dashboard after Kyle Stacy's KSE4: a large headspeed tile beside the timer, a strip of current,
voltage, ESC temperature and throttle, and a full-width fuel bar. It takes its colours from the radio's Ethos
theme.

=== "Preflight"

    ![KSE4 preflight](img/themes/kse4-preflight.png){ width="560" }

=== "Inflight"

    ![KSE4 inflight](img/themes/kse4-inflight.png){ width="560" }

=== "Postflight"

    ![KSE4 postflight](img/themes/kse4-postflight.png){ width="560" }

## KSE5 { #kse5 }

A ring dashboard after Kyle Stacy's KSE5: rings for fuel, headspeed, current and ESC temperature, with the
governor, voltages and mAh used in tiles below. Its settings set the full scale of each ring. It takes its
colours from the radio's Ethos theme.

=== "Preflight"

    ![KSE5 preflight](img/themes/kse5-preflight.png){ width="560" }

=== "Inflight"

    ![KSE5 inflight](img/themes/kse5-inflight.png){ width="560" }

=== "Postflight"

    ![KSE5 postflight](img/themes/kse5-postflight.png){ width="560" }

## RF Status { #rf-status }

Voltage and fuel arcs above the governor state, link quality, headspeed and timer.

=== "Preflight"

    ![RF Status preflight](img/themes/rf-status-preflight.png){ width="560" }

=== "Inflight"

    ![RF Status inflight](img/themes/rf-status-inflight.png){ width="560" }

=== "Postflight"

    ![RF Status postflight](img/themes/rf-status-postflight.png){ width="560" }

## RT-RC { #rt-rc }

Pack voltage and fuel arcs above the governor state, link quality, headspeed and timer. Before the flight it
adds the model image, profiles, flight count and Blackbox use.

=== "Preflight"

    ![RT-RC preflight](img/themes/rt-rc-preflight.png){ width="560" }

=== "Inflight"

    ![RT-RC inflight](img/themes/rt-rc-inflight.png){ width="560" }

=== "Postflight"

    ![RT-RC postflight](img/themes/rt-rc-postflight.png){ width="560" }

## RT-RC Nitro { #rt-rc-nitro }

RT-RC for nitro helis: BEC voltage and throttle arcs in place of pack voltage and fuel.

=== "Preflight"

    ![RT-RC Nitro preflight](img/themes/rt-rc-nitro-preflight.png){ width="560" }

=== "Inflight"

    ![RT-RC Nitro inflight](img/themes/rt-rc-nitro-inflight.png){ width="560" }

=== "Postflight"

    ![RT-RC Nitro postflight](img/themes/rt-rc-nitro-postflight.png){ width="560" }

## SRB-RC { #srb-rc }

A grid of tiles: governor state, BEC voltage, link, headspeed, profiles, ESC temperature, current and timer
above a full-width flight battery bar.

=== "Preflight"

    ![SRB-RC preflight](img/themes/srb-rc-preflight.png){ width="560" }

=== "Inflight"

    ![SRB-RC inflight](img/themes/srb-rc-inflight.png){ width="560" }

=== "Postflight"

    ![SRB-RC postflight](img/themes/srb-rc-postflight.png){ width="560" }

The screenshots come from the Ethos simulator, so the values are examples. Some postflight screens
use sample flight figures.
