var five = require('johnny-five'),
    board = new five.Board();

board.on('ready', function(){
  console.log('board ready');

  var potentiometer = new five.Sensor({
    pin: 'A1',
    freq: 250
  });

 var led = new five.Led(6);

 potentiometer.on('data', function(){
   console.log(this.value);
   led.brightness(this.value);
 });
});
