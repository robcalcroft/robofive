robofive
========

An API for an Arduino using NodeJS &amp; Johnny Five

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

![Device schema](http://i.imgur.com/8YYoN0T.png)
