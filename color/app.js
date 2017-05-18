var five = require('johnny-five'),
  board = new five.Board(),
  http = require('http'),
  express = require('express'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io')(server),
  state = 0,
  duty = 255,
  maxPhotoValue = 0,
  maxHue = [],
  timer,
  idle;

app.use(express.static('public'));

board.on('ready', function() {
  var red = new five.LED(9),
    blue = new five.LED(10),
    green = new five.LED(11),
    LEDs = [red, green, blue];

  var photo = new five.Sensor({pin: "A0", freq: 200});

  photo.on('read', function(err, data) {
    if (err) {
      return console.log("error: %s", err);
    }

  });

  function stepColor() { //start cycling through the colors
    stateCheck();
    colorCheck(); //check what color the object is
    LEDs[state].brightness(duty);
    LEDs[(state + 1) % 3].brightness(255 - duty);
  };

  function stateCheck() {
    if (--duty > 0) {
      return false;
    }
    duty = 255;
    if (++state == 3) {
      io.sockets.on('connection', (socket) => {
        console.log('connection made');
        // done with scan
        state = 0;
        console.log("%s", rgbToHex(maxHue));
        var value = rgbToHex(maxHue);
        socket.emit('color', {value: value});
      });
    return true;
  };
};
  setInterval(stepColor, 10)

  function colorCheck() {
    if (photo.value > maxPhotoValue) {
      maxPhotoValue = photo.value;
      maxHue = [red.value, green.value, blue.value];
    }
  };

  function componentToHex(c) {
    if (c == null) {
      return;
    }
    var hex = c.toString(16);
    return hex.length == 1
      ? "0" + hex
      : hex;
  };

  function rgbToHex(vals) {

    return [
      "#",
      componentToHex(vals[0]),
      componentToHex(vals[1]),
      componentToHex(vals[2])
    ].join('');
  };
});

var port = process.env.port || 8060;
server.listen(port, function() {
  console.log('App running on port ', port);
});
