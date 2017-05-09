var io = io();
$('#power').val('off');
// Get the "brightness" value from the slider to the backend
function getValue(val) {
  var buttonState = $('#power').val();
  if (buttonState === 'off') {
    $('#msg').html('switch on led first');
  } else {
    $('#msg').html('');
    io.emit('brightness', {value: val});
  }
};

$('#power').click(function(e) {
  if ($('#power').val() === 'off') {

    $('#power').val('on');
    io.emit('power', {value: 'on'});
    $('#power').css('background', 'green');

  } else {

    $('#power').val('off');
    io.emit('power', {value: 'off'});
    $('#power').css('background', 'red');

  }
  e.preventDefault();
});
