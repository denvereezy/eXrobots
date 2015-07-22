var five = require("johnny-five");
var keypress = require('keypress');

keypress(process.stdin);

var board = new five.Board();

board.on("ready", function() {

//Define LED
var led = new five.Led(13);
var myLed = new five.Led(12).strobe(50);

 process.stdin.resume(); 
 process.stdin.setEncoding('utf8'); 
 process.stdin.setRawMode(true); 

  process.stdin.on('keypress', function (ch, key) {
    
    if ( !key ) return;
//Using keypress to control the led
if (key.name == "d"){
	led.toggle();//manual switching on/off of led
}if(key.name == "e"){
	led.strobe(100);//automatic switching on/off of led for a given time 
}if (key.name == "s"){
	led.stop();// stops the led
}else if (key.name == "f"){
	led.off();// turns off the led
}
});

this.repl.inject({ //allows you to control your led on the terminal
      led: myLed 

  // try "on", "off", "toggle", "strobe", "stop" (stops strobing)
});
});

