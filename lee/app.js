var http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    five = require('johnny-five'),
    board = new five.Board(),
    io = require('socket.io')(server);

app.use(express.static('public'));

board.on('ready', function() {
  console.log('board ready');

  var led = new five.Led(13);

  io.sockets.on('connection', (socket) => {
    console.log('connection made');

    socket.on('brightness', function(data) {
      console.log(data.value);
      led.brightness(data.value);
    });
  });
});

var port = process.env.port || 8060;
server.listen(port, function() {
  console.log('App running on port ', port);
});
