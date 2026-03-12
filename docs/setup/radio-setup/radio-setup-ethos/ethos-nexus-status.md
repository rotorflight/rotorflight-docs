# FrSky Ethos RFStatus LUA Script

Installation As part of the RFSuite installation detailed above the RFStatus Widget is installed in the background and is ready for configuration.

Before proceeding please ensure the Heli, RX and Rotorflight FBL are powered on and connected to your Ethos transmitter, At this point please ensure you have the full list of Telemetry sensors showing in the Model\Telemetry screen.

\##-- PLEASE REMOVE THE BLADES --

Ethos Screen Setup From the main screen press the DISP button and a screen similar to this will be shown.

![Ethos](/assets/images/ethos-status-1-e69f177f961080ce0ccce4845a7aee7c.jpg)

Press the + symbol to add another screen, scroll down and select the full screen icon as shown.

![Ethos](/assets/images/ethos-status-2-6f03f33e925846004bf388c9b17d707d.jpg)

Select Change Widget, scroll thru the list and select Rotorflight Status

![Ethos](/assets/images/ethos-status-4-0afd89047d69257f8e79b91b8dfdae1f.jpg)

The following screen is shown, select Configure

![Ethos](/assets/images/ethos-status-5-f6d41b9638d68baf87cf2ebd7c52e5d6.jpg)

The following screen is the main configuration options for the Rotorflight Status widget

![Ethos](/assets/images/ethos-status-6-a78a5cfffcbd70a0a8e2becacd3d42e8.jpg)

TRIGGERS

![Ethos](/assets/images/ethos-status-7-ae0992d05ed0d0eff4a9936deb31cf41.jpg)

The ARM and IDLE-UP switch positions MUST be entered as per your Rotorflight configurator setup, in this example SE is ARM (Motor) and SD is IDLE-UP or Throttle Enable. Delay before active is the time taken for your motor to reach idle-up RPM. Current measurements will be started after this timeout.

TIMER CONFIGURATION

![Ethos](/assets/images/ethos-status-8-1bb56f5f954af110343cd8fb10986979.jpg)

This is a count UP timer and will alarm at the set point, you can disable if using another Ethos timer.

BATTERY CONFIGURATION

![Ethos](/assets/images/ethos-status-9-fba01e9c1e468d06088d6b80fed87761.jpg)

Enter your Battery \ Voltage settings and preferences, the 'Play alert on' can be configured for your preference.

SWITCH ANNOUNCEMENTS

![Ethos](/assets/images/ethos-status-10-0390393535755891e504b07f21ba125e.jpg)

This section allows you to have the status widget play announcements depending on your TX switch positions.

TELEMETRY ANNOUNCEMENTS

![Ethos](/assets/images/ethos-status-11-7d815a93fd40ce6c6e80259d30efc219.jpg)

Similar to the above, allows the status widget to play various Telemetry announcements depending on your TX switch positions, this could include, for example, using the rear panel SJ momentary switch to announce Fuel and/or Voltage.

GOVERNOR ANNOUNCEMENTS

![Ethos](/assets/images/ethos-status-12-c85769d94a69def9eb8df4412e8ebdcf.jpg)

Similar to the above but recommended to enable as per your preferences.These are primarily intended for use when using the Rotorflight Governor - If using an External ESC governor you will receive basic announcements of ARMED, DISARMED, ACTIVE and THROTTLE OFF.

CUSTOMISE DISPLAY

![Ethos](/assets/images/ethos-status-13-cafa465f0aaeb556194978cc0faf4287.jpg)

This is the main widget display which has 6 pre-defined boxes each of which can display a range of items for your layout preference.

![Ethos](/assets/images/ethos-status-14-aa62273208516fd6d9db81ab11c39599.jpg)

The additional display options allow the widget to display the min\max of the sensors as well as colours to indicate status or low battery. You also have the option to add additional sensors from Telemetry and choose these to display in the main screen.

![Ethos](/assets/images/ethos-status-15-e4b3a9da05a5e60168ae080862a019f8.jpg)

ADVANCED OPTIONS

![Ethos](/assets/images/ethos-status-16-5b8af1b5ae9be05023ddc7876822e398.jpg)

This is where you select Rotorflight Internal or an External governor for the widget, as well as any temp conversion from Centigrade to Fahrenheit.

The Voltage section allows you to choose how sensitive the low voltage alarms will be depending on the voltage sag whilst in flight.The sag compensation is a time delay before the alarms are announced.

Gimbal monitor effectively monitors your stick positions based on the drop down selection, and alerts if the given value is met. Normally disabled.

The Headspeed option allows you to set the announcement which will tell you when the headspeed has changed, 10% default, useful to monitor if the Governor is maintaining the requested headspeed during fast 3D manoeuvres. Could point to Governor PID tuning.

Calculate fuel locally can be used in the event your ESC does not send a current measurement.
