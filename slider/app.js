var http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    five = require('johnny-five'),
    board = new five.Board(),
    io = require('socket.io')(server);

// Render static pages i.e index.html
app.use(express.static('public'));
//Set the board ready
board.on('ready', function() {
  console.log('board ready');
  //Create new led and controll it from pin 5 on your Arduino
  var led = new five.Led(5);
  // From socket.io, on connection event logout that there is connection
  io.sockets.on('connection', (socket) => {
    console.log('connection made');
    //Get the value from the slider and console log it and pass it to brightness method
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
