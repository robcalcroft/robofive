robofive
========

An experimental project using Jonny-five (a Javascript framework for Arduinos)
The project contains a small NodeJS server which creates API routes to control actions on the Arduino. Also included is a basic webpage to demonstrate the functionality in a webpage however see below for a list of the routes used.

###Install
1. Use the pictured schema (below) to build your Arduino board.
2. Download the [Arduino IDE](http://arduino.cc/en/main/software)
3. Plug in your Arduino or Arduino compatible microcontroller via USB
4. Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
5. Click the "Upload" button.
6. Clone the repo into a folder `git clone https://github.com/robcalcroft/robofive.git` 
6. run `[sudo] npm install`
7. `node robofive.js` to start the server.
8. Visit `localhost:3000` to view the web interface. Only mobile browsers will be able to use the web socket functionality

###API Routes
| Route        | Action           | Example |
| ------------- |---------------|------------|
| **/led/:colour/:state**| Turns on or off an led colour of your choice |`http://localhost/led/red/on`
| **/led/all/:state** |Turns on or off all of the leds in the array|`http://localhost/all/off`
| **/piezo/play/merry-xmas** | Plays a butchered merry christmas song through the buzzer|n/a

###Arduino Schema
![Device schema](http://i.imgur.com/8YYoN0T.png)
