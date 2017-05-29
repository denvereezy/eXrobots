var five = require('johnny-five'),
    http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')(server),
    board = new five.Board();

app.use(express.static('public'));

board.on('ready', function(){
  console.log('board ready');

  var potentiometer = new five.Sensor({
    pin: 'A1',
    freq: 250
  });

  var potentiometer2 = new five.Sensor({
    pin: 'A3',
    freq: 250
  });

  potentiometer.on('data', function(){
    var value_1 = this.value;
    console.log(value_1);
    io.emit('value1', {
        data: value_1
    });
  });

  potentiometer2.on('data', function(){
    var value_2 = this.value;
    console.log(value_2);
    io.emit('value2', {
        data: value_2
    });
  });
});

var port = process.env.port || 8060;
server.listen(port, function(){
  console.log('App running on port ', port);
});
