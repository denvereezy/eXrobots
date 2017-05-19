var io = io();

io.on('color', function(data){
  $('body').css('background', data.value);
});
