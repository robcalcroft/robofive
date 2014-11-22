///////////////////////////
// name: robofive server //
// author: Rob Calcroft  //
///////////////////////////

var express = require('express'),
	app     = express(),
	five    = require("johnny-five"),
	board   = new five.Board(),
	items   = {};

app.use(express.static(__dirname + '/'));

var server = require('http').Server(app);
server.listen(80)
var io = require('socket.io')(server);

board.on('ready', function() {

	/**
	 * Create LEDS object
	 * @type {Object}
	 */
	items.leds = {
		red: new five.Led({
			pin: 13
		}),
		green: new five.Led({
			pin: 12
		}),
		blue: new five.Led({
			pin: 8
		}),
		yellow:new five.Led({
			pin: 7
		})
	}
	/**
	 * Create Piezo object
	 * @type {five}
	 */
	items.piezo = new five.Piezo(3);
	/**
	 * Allow the user to turn on all of the leds at once
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/led/all/:state',function(req, res) {
		for(var led in items.leds) {
			if(req.params.state === 'on') {
				items.leds[led].on();
			} else if(req.params.state === 'off') {
				items.leds[led].off();
			}
		}
		res.json({
			success:1
		})
	})
	/**
	 * Allow the user to turn the led off and on
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/led/:colour/:state', function(req, res) {
		var colour = req.params.colour || red;
		if(req.params.state === 'on') {
			items.leds[colour].on();
			res.json({
				success: 1,
				colour: colour
			})
		} else if(req.params.state === 'off') {
			items.leds[colour].off();
			res.json({
				success: 1,
				colour: colour
			})
		}
	})
	/**
	 * Make the piezo play merry christmas
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/piezo/play/merry-xmas', function(req, res) {
		  items.piezo.play({
		    song: [
		    	["G4", 1/4],
		    	["C4", 1/4],
		    	["C4", 1/4],
		    	["D4", 1/4],
		    	["C4", 1/4],
		    	["B4", 1/4],
		    	["A4", 1/4],
		    	["A4", 1/4],
		    	["A4", 1/4],
		    	[null, 1 / 2]
		    	["D4", 1/4],
		    	["D4", 1/4],
		    	["E4", 1/4],
		    	["D4", 1/4],
		    	["C4", 1/4],
		    	["B4", 1/4],
		    	["G4", 1/4],
		    	["G4", 1/4],
		    	[null, 1 / 2],
		    	["E4", 1/4],
		    	["E4", 1/4],
		    	["F4", 1/4],
		    	["E4", 1/4],
		    	["D4", 1/4],
		    	["C4", 1/4],
		    	["A4", 1/4],
		    	["G4", 1/4],
		    	["G4", 1/4],
		    	[null, 1 / 2],
		    	["A4", 1/4],
		    	["D4", 1/4],
		    	["B4", 1/4],
		    	["C4", 1/4],
		    ],
		    tempo: 60
		  });
		  res.json({
		  	success: 1
		  })
	})
	/**
	 * Make the piezo play a song :)
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/piezo/play/song', function(req, res) {
	  items.piezo.play({
	    song: [
	      ["C4", 1 / 4],
	      ["D4", 1 / 4],
	      ["F4", 1 / 4],
	      ["D4", 1 / 4],
	      ["A4", 1 / 4],
	      [null, 1 / 4],
	      ["A4", 1],
	      ["G4", 1],
	      [null, 1 / 2],
	      ["C4", 1 / 4],
	      ["D4", 1 / 4],
	      ["F4", 1 / 4],
	      ["D4", 1 / 4],
	      ["G4", 1 / 4],
	      [null, 1 / 4],
	      ["G4", 1],
	      ["F4", 1],
	      [null, 1 / 2]
	    ],
	    tempo: 60
	  });
	  res.json({
	  	success: 1
	  })
	})

	io.on('connection', function (socket) {
	  socket.on('blink', function (data) {
		if(typeof data.fade !== "undefined"){
			items.piezo.frequency(data.fade, 100);
		}
	  });
	});
})