var five = require('johnny-five'),
    board = new five.Board(),
    ping, led;

board.on('ready', function() {
    ping = new five.Proximity(7);
    led = new five.Led(11);
    ping.on("data", function() {
        led.brightness(this.cm);
    });
    ping.on("change", function() {
        console.log("The obstruction has moved.");
    });
});
