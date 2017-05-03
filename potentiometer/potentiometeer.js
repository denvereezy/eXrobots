var five = require('johnny-five'),
    http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')(server),,
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

  var led = new five.Led(11);

  potentiometer.on('data', function(){
    var list = this.value;
    console.log(list);
    led.brightness(list);
    io.emit('value', {
        data: list
    });
  });

  potentiometer2.on('data', function(){
    var list = this.value;
    console.log(list);
    led.brightness(list);
    io.emit('value1', {
        data: list
    });
  });
});

var port = process.env.port || 8060;
server.listen(port, function(){
  console.log('App running on port ', port);
});
