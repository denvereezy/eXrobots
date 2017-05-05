var five = require('johnny-five'),
  http = require('http'),
  express = require('express'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io')(server),
  board = new five.Board();

app.use(express.static('public'));

board.on('ready', function() {
  console.log('board ready');

  var light = new five.Light("A0");
  io.sockets.on('connection', function(socket) {
    light.on("change", function() {
      socket.emit('opacity', {value: this.level});
      console.log(this.level);
    });
  });
});

var port = process.env.port || 8080;
server.listen(port, function() {
  console.log('App running on port ', port);
});
