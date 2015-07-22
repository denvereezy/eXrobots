var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {

//Define LED
																																												
var led = new five.Led(13).strobe(1000);

/*this.repl.inject({ //allows you to control your led on the terminal
      led: myLed 

  // try "on", "off", "toggle", "strobe", "stop" (stops strobing)
});*/
});
