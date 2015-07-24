var five = require("johnny-five");
var keypress = require("keypress");

keypress(process.stdin);
var board = new five.Board();
board.on("ready",function(){
var led1 = new five.Led(13);
var led2 = new five.Led(12);

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.setRawMode("true");
process.stdin.on("keypress",function(ch,key){
  if (!key)
		return;
	if(key.name == 'a'){
		led1.toggle();
		led2.toggle();
	}else if (key.name == 'b'){
			led1.strobe(100);
			led2.strobe(200);
	}else if (key.name == 'c'){
			led1.strobe(1000);
			led2.strobe(500);
	}else if (key.name == 'd'){
			led1.stop();
			led2.stop();
	
	}if (key.name == 'q'){
		process.exit();
};	
	});
	this.repl.inject ({
		led:led1
 });
});    


