# Rotorflight Tool API

The Rotorflight API is available through the *RF Tool* widget and enables developers to create a custom Rotorflight widget that can interact with the flight controller. RF Tool does this by exposing the global `rf2` table to other EdgeTX Lua widgets.

RF Stats is an example project that uses the Rotorflight Tool API. RF Stats uses this API to register itself with RF Tool, listen for connection and arming state changes, and retrieve flight-controller data through Rotorflight MSP API modules.

RF Stats does not talk directly to the telemetry protocol. Instead, it delegates script loading, MSP request queueing, and callback dispatching to RF Tool and the shared RF2 Lua runtime.

## Summary[​](#summary "Direct link to Summary")

RF Stats uses the RF Tool API in four important ways:

1. `rf2.registerWidget(widget)` registers the widget for RF Tool state events.
2. `widget.onStateChanged(widget, newState)` receives connection and arming state changes.
3. `rf2.useApi("mspFlightStats").read(...)` retrieves flight stats asynchronously through the RF2 MSP queue.
4. `rf2.executeScript("F/formatSeconds")` loads a shared helper used to format flight time.

Together, these let RF Stats remain a small display widget while RF Tool owns initialization, state tracking, script loading, and MSP communication.

## API Availability[​](#api-availability "Direct link to API Availability")

RF Tool initializes the global `rf2` table from:

```
/SCRIPTS/RF2/rf2.lua
```

After initialization, RF Tool adds widget-facing API entries:

```
rf2.registerWidget = registerWidget
rf2.rfToolApiVersion = 1.00
```

A companion widget should check that `rf2` exists before using the API:

```
if rf2 and not widget.isRegistered then
    rf2.registerWidget(widget)
    widget.isRegistered = true
end
```

## rf2.registerWidget(widget)[​](#rf2registerwidgetwidget "Direct link to rf2.registerWidget(widget)")

Registers another widget with RF Tool so RF Tool can send it model state changes.

### Signature[​](#signature "Direct link to Signature")

```
rf2.registerWidget(widget)
```

### Parameters[​](#parameters "Direct link to Parameters")

| Parameter | Type  | Description                                                     |
| --------- | ----- | --------------------------------------------------------------- |
| `widget`  | table | The widget instance returned by the widget's `create` function. |

### Behavior[​](#behavior "Direct link to Behavior")

RF Tool stores the widget in an internal list:

```
local rfWidgets = {}

local function registerWidget(widget)
    table.insert(rfWidgets, widget)
end
```

Once registered, the widget may receive calls to `widget:onStateChanged(newState)` whenever RF Tool detects a relevant model state transition.

RF Stats registers itself from both `background` and `refresh` paths by calling `background` from `refresh`. This ensures the widget registers whether it is currently visible or running in the background.

```
w.background = function(widget)
    if rf2 and not widget.isRegistered then
        rf2.registerWidget(widget)
        widget.isRegistered = true
    end
end
```

Registration should be done once per widget instance. RF Stats uses `widget.isRegistered` as a guard to avoid duplicate registrations.

## widget.onStateChanged(widget, newState)[​](#widgetonstatechangedwidget-newstate "Direct link to widget.onStateChanged(widget, newState)")

This is not a method on `rf2`; it is a callback method that a registered widget may provide. RF Tool calls it after `rf2.registerWidget(widget)` has been used.

### Signature[​](#signature-1 "Direct link to Signature")

```
widget.onStateChanged(widget, newState)
```

### Parameters[​](#parameters-1 "Direct link to Parameters")

| Parameter  | Type   | Description                     |
| ---------- | ------ | ------------------------------- |
| `widget`   | table  | The registered widget instance. |
| `newState` | string | The new RF Tool state.          |

### Possible States[​](#possible-states "Direct link to Possible States")

| State            | Meaning                                                           | RF Stats behavior               |
| ---------------- | ----------------------------------------------------------------- | ------------------------------- |
| `"connected"`    | RF Tool has initialized communication with the flight controller. | Reads flight stats through MSP. |
| `"disarmed"`     | The model is connected and no longer armed.                       | Reads flight stats again.       |
| `"disconnected"` | RF Tool lost the active connection.                               | Clears displayed stats.         |
| `"armed"`        | The model is armed.                                               | Ignored by RF Stats.            |

Example from RF Stats:

```
w.onStateChanged = function(widget, newState)
    if newState == "connected" or newState == "disarmed" then
        rf2.useApi("mspFlightStats").read(onReceivedFlightStats, "unused example callback parameter")
    elseif newState == "disconnected" then
        totalFlights = nil
        totalFlightTime = nil
    end
end
```

### ARM Sensor Requirement[​](#arm-sensor-requirement "Direct link to ARM Sensor Requirement")

RF Tool derives `"armed"` and `"disarmed"` transitions from the `ARM` sensor:

```
local armState = getValue("ARM")
```

In the simulator, RF Tool uses `ANT` instead.

If the `ARM` sensor is missing, RF Tool can still publish connection-related states, but arming state changes may not be available.

## rf2.useApi(apiName)[​](#rf2useapiapiname "Direct link to rf2.useApi(apiName)")

Loads an MSP API module from the RF2 script tree and returns the module table.

### Signature[​](#signature-2 "Direct link to Signature")

```
local api = rf2.useApi(apiName)
```

### Parameters[​](#parameters-2 "Direct link to Parameters")

| Parameter | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| `apiName` | string | Name of an MSP API module under `/SCRIPTS/RF2/MSP/`, without `.lua`. |

### Return Value[​](#return-value "Direct link to Return Value")

A Lua table returned by the requested MSP API module.

RF Stats uses:

```
rf2.useApi("mspFlightStats")
```

This loads:

```
/SCRIPTS/RF2/MSP/mspFlightStats.lua
```

## rf2.useApi("mspFlightStats").read(callback, callbackParam, config)[​](#rf2useapimspflightstatsreadcallback-callbackparam-config "Direct link to rf2.useApi(\"mspFlightStats\").read(callback, callbackParam, config)")

Queues an MSP request for flight statistics.

### Signature[​](#signature-3 "Direct link to Signature")

```
rf2.useApi("mspFlightStats").read(callback, callbackParam, config)
```

### Parameters[​](#parameters-3 "Direct link to Parameters")

| Parameter       | Type     | Required | Description                                                      |
| --------------- | -------- | -------- | ---------------------------------------------------------------- |
| `callback`      | function | No       | Called when the MSP response is processed.                       |
| `callbackParam` | any      | No       | Passed back to the callback as its first argument.               |
| `config`        | table    | No       | Optional existing stats table. If omitted, defaults are created. |

### Callback Signature[​](#callback-signature "Direct link to Callback Signature")

```
callback(callbackParam, stats)
```

RF Stats defines:

```
local function onReceivedFlightStats(callbackParam, stats)
    totalFlights = tostring(stats.stats_total_flights.value)
    totalFlightTime = rf2.executeScript("F/formatSeconds")(stats.stats_total_time_s.value)
end
```

### Returned Stats Fields[​](#returned-stats-fields "Direct link to Returned Stats Fields")

`mspFlightStats.read()` passes a `stats` table to the callback. The table contains these fields:

| Field                          | Description                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| `stats_total_flights.value`    | Total number of recorded flights.                                |
| `stats_total_time_s.value`     | Total recorded flight time in seconds.                           |
| `stats_total_dist_m.value`     | Total recorded flight distance in meters.                        |
| `stats_min_armed_time_s.value` | Minimum armed time used for flight-stat tracking.                |
| `statsEnabled.value`           | Calculated field. `1` when stats are enabled, `0` when disabled. |

RF Stats currently uses only:

```
stats.stats_total_flights.value
stats.stats_total_time_s.value
```

### MSP Queueing[​](#msp-queueing "Direct link to MSP Queueing")

The `read()` method does not return the stats immediately. It creates an MSP message and adds it to `rf2.mspQueue`:

```
rf2.mspQueue:add(message)
```

RF Tool keeps the queue moving from its UI/background task, so companion widgets should usually use the MSP API modules instead of directly managing `rf2.mspQueue`.

## rf2.executeScript(scriptName, ...)[​](#rf2executescriptscriptname- "Direct link to rf2.executeScript(scriptName, ...)")

Loads and executes an RF2 Lua script.

### Signature[​](#signature-4 "Direct link to Signature")

```
local result = rf2.executeScript(scriptName, ...)
```

### Parameters[​](#parameters-4 "Direct link to Parameters")

| Parameter    | Type   | Description                                                                |
| ------------ | ------ | -------------------------------------------------------------------------- |
| `scriptName` | string | Script path relative to `/SCRIPTS/RF2/`. The `.lua` extension is optional. |
| `...`        | any    | Optional arguments passed to the loaded script.                            |

### Behavior[​](#behavior-1 "Direct link to Behavior")

`rf2.executeScript()` resolves the path through `rf2.loadScript()`, loads the script, and immediately calls it.

RF Stats uses it to load a formatter:

```
rf2.executeScript("F/formatSeconds")(stats.stats_total_time_s.value)
```

This loads:

```
/SCRIPTS/RF2/F/formatSeconds.lua
```

The loaded script returns a function, which RF Stats immediately calls with the total flight time in seconds.

## Typical Companion Widget Flow[​](#typical-companion-widget-flow "Direct link to Typical Companion Widget Flow")

A widget using the same RF Tool API pattern as RF Stats usually follows this sequence:

```
local zone, options = ...

local w = {
    zone = zone,
    options = options
}

w.background = function(widget)
    if rf2 and not widget.isRegistered then
        rf2.registerWidget(widget)
        widget.isRegistered = true
    end
end

w.refresh = function(widget, event, touchState)
    w.background(widget)
end

w.onStateChanged = function(widget, newState)
    if newState == "connected" or newState == "disarmed" then
        rf2.useApi("mspFlightStats").read(function(_, stats)
            -- Use stats here.
        end)
    elseif newState == "disconnected" then
        -- Clear cached values here.
    end
end

return w
```

## API Version[​](#api-version "Direct link to API Version")

RF Tool currently exposes:

```
rf2.rfToolApiVersion = 1.00
```

RF Stats does not currently check this value, but third-party widgets can use it to guard compatibility before relying on RF Tool widget APIs.

Example:

```
if rf2 and rf2.rfToolApiVersion and rf2.rfToolApiVersion >= 1.00 then
    rf2.registerWidget(widget)
end
```
