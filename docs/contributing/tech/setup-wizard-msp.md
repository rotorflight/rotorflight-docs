# Setup Wizard MSP

The MSP commands the Configurator's setup wizard and the Lua suites use to move
servos and mixer inputs on the bench and to wire a motorised tail. They are
part of MSP API 12.10, added in
[rotorflight-firmware#541](https://github.com/rotorflight/rotorflight-firmware/pull/541).

| Command | ID | Purpose |
| --- | --- | --- |
| `MSP_SET_SERVO_OVERRIDE` | 193 | Override one servo, with an optional timeout |
| `MSP_SET_SERVO_OVERRIDE_ALL` | 196 | Override every servo, with an optional timeout |
| `MSP_SET_MIXER_OVERRIDE` | 191 | Override one mixer input, with an optional timeout |
| `MSP2_TAIL_MOTOR_OUTPUT` | `0x5F14` | Read or move the tail pin between SERVO 4 and MOTOR 2 |

All values are little-endian.

## Override timeouts

An override sent with a timeout lapses unless the client sends it again, so a
setup tool that disconnects or crashes can't leave a servo or mixer input held.
An override sent without a timeout stays until it is cleared, as before.

### Payloads

| Command | Persistent | Timed |
| --- | --- | --- |
| `MSP_SET_SERVO_OVERRIDE` | U8 index, S16 value (3 bytes) | U8 index, S16 value, U16 timeout ms (5 bytes) |
| `MSP_SET_MIXER_OVERRIDE` | U8 index, S16 value (3 bytes) | U8 index, S16 value, U16 timeout ms (5 bytes) |
| `MSP_SET_SERVO_OVERRIDE_ALL` | S16 value (2 bytes) | S16 value, U16 timeout ms (4 bytes) |

Any other length is refused with an MSP error, so a stray byte can't turn a
timed override into a persistent one. An index out of range is refused too.

Values:

| Override | Range | Off | Other |
| --- | --- | --- | --- |
| Servo | -2000 to 2000 | 2001 | |
| Mixer input | -2500 to 2500 (1000 = 100 %) | 2501 | 2502 = pass the input through |

### Timing

- The timeout is clamped to **500–30000 ms**. A timeout of 0 is clamped to
  500 ms; it does not mean persistent.
- Each timed command restarts the timeout. To hold an override, send it again
  well inside the timeout.
- When the timeout lapses the override goes back to off.
- A persistent command on the same servo or input cancels its timeout.

### Arming

An active override, timed or not, blocks arming with `OVERRIDE`. Overrides are
not applied while armed.

## MSP2_TAIL_MOTOR_OUTPUT

Many boards come with the tail pin on SERVO 4. A motorised tail needs it on
MOTOR 2, which used to take `resource SERVO 4 NONE` and
`resource MOTOR 2 <pin>` in the CLI. This command reads where the pin is, or
makes that move.

### Request

| Field | Type | Meaning |
| --- | --- | --- |
| action | U8, optional | 0 = read only (also with no payload), 1 = move the tail pin to SERVO 4, 2 = move it to MOTOR 2 |

### Reply

| Field | Type | Meaning |
| --- | --- | --- |
| output | U8 | Where the tail pin is after the action (below) |
| result | U8 | Result of the action (below). Always 0 for a read. |

**output**

| Value | Name | Meaning |
| --- | --- | --- |
| 0 | `SERVO` | The pin is SERVO 4; MOTOR 2 has none. |
| 1 | `MOTOR` | The pin is MOTOR 2; SERVO 4 has none. |
| 2 | `BOTH` | MOTOR 2 has a pin of its own as well as SERVO 4. |
| 3 | `NONE` | Neither has a pin. |

**result**

| Value | Name | Refused because |
| --- | --- | --- |
| 0 | `OK` | Done, or already there. |
| 1 | `ERR_CUSTOM` | The pins were set by hand (`BOTH` or `NONE`), or MOTOR 3 and up have pins and would stop counting with MOTOR 2 empty. Left alone. |
| 2 | `ERR_NO_MAIN_MOTOR` | MOTOR 1 has no pin, so MOTOR 2 would not be used. |
| 3 | `ERR_NO_TIMER` | The pin has no timer to drive an output. |
| 4 | `ERR_TIMER_SHARED` | The pin's timer also drives another servo (moving to MOTOR 2) or another motor (moving to SERVO 4). A timer runs at one rate, so servos and motors can't share it. |
| 5 | `ERR_INVALID` | Unknown action. |
| 6 | `ERR_NO_DMA` | The motor protocol is DShot without bitbang, and the pin's timer has no DMA stream. |
| 7 | `ERR_DMA_IN_USE` | The motor protocol is DShot without bitbang, and the pin's DMA stream is already taken by something else. With burst DShot, a stream already held for the same timer is fine. |
| 8 | `ERR_ARMED` | The FC is armed. Moves are refused in flight; reading still works. |

A client should show its own text for a result it doesn't know.

### Applying the move

The move changes the config in memory only. It takes effect after
`MSP_EEPROM_WRITE` and a reboot, like the CLI `resource` commands. The DMA
checks are advice: the motor protocol can still change before the reboot, and
a motor output that then fails to set up blocks arming (below).

## Motor arming checks

`MOTOR_PROTO` blocks arming for any of three causes. They share one arming
flag bit; CLI `status` prints which applies on a line of its own:

| `status` line | Cause |
| --- | --- |
| `MOTOR_PROTO: motor protocol not set` | No motor protocol is selected, or it isn't supported. |
| `MOTOR_PROTO: motor outputs failed to set up` | The motor outputs failed to start at boot, for example a DShot pin with no free DMA stream. Without this check the FC armed with no motor running. |
| `MOTOR_PROTO: motorised tail but no MOTOR 2` | The tail mode is motorised but MOTOR 2 has no pin, so the tail would never run. Move the tail pin with the command above. |

A client that sees `MOTOR_PROTO` right after moving the tail pin should point
at the tail pin or DMA, not the protocol setting.
