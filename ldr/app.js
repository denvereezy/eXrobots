var five = require("johnny-five"),
  board, photoresistor, led;

board = new five.Board();

board.on("ready", function() {
  led = new five.Led(11);

  photoresistor = new five.Sensor({
    pin: "A2",
    freq: 250
  });

  photoresistor.on("data", function() {
    console.log(this.value);
    led.brightness(this.value);
  });
});
