var five = require("johnny-five"),
    board, motion;
var myBoard, myLed;
board = new five.Board();

board.on("ready", function() {

    // Create a new `motion` hardware instance.
    motion = new five.IR.Motion(7);
    myLed1 = new five.Led(13);


    // "calibrated" occurs once, at the beginning of a session,
    motion.on("calibrated", function(err, ts) {
        console.log("calibrated", ts);
    });

    // "motionstart" events are fired when the "calibrated"
    // when motion has started green led(myLed2) turns on
    motion.on("motionstart", function(err, ts) {
        console.log("motionstart", ts);
        myLed1.on();

    });

    // "motionstart" events are fired following a "motionstart event
    // when no movement has occurred  red led(myLed2) turns on
    motion.on("motionend", function(err, ts) {
        console.log("motionend", ts);
        myLed1.off();

    });
});
