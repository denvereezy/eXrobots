var five = require('johnny-five'),
  http = require('http'),
  express = require('express'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io')(server),
  potentiometer,
  potentiometer2,
  button,
  board = new five.Board();

app.use(express.static('public'));

board.on('ready', function() {
  button = new five.Button({
    board: board,
    pin: 7,
    holdtime: 1000,
    invert: false // Default: "false".  Set to "true" if button is Active-Low
  });

  potentiometer = new five.Sensor({
    pin: 'A2',
    freq: 250
  });

  potentiometer2 = new five.Sensor({
    pin: 'A3',
    freq: 250
  });

  potentiometer.on('data', function() {
    var brightness = this.value;
    io.emit('brightness', {
      brightness: brightness
    });
  });

  potentiometer2.on('data', function() {
    var position = this.value;
    io.emit('position', {
      position: position
    });
  });

  button.on('press', function() {
    io.emit('on');
  });

  button.on('hold', function() {
    io.emit('off');
  });
});

var port = process.env.port || 8060;
server.listen(port, function() {
  console.log('App running on port ', port);
});
