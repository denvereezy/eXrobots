// $('.cube-switch .switch').click(function() {
//   if ($('.cube-switch').hasClass('active')) {
//     $('.cube-switch').removeClass('active');
//     $('#light-bulb').attr('class', 'off');
//   } else {
//     $('.cube-switch').addClass('active');
//     $('#light-bulb').attr('class', 'on');
//   }
// });

var socket = io();
$(document).ready(function() {
    socket.on('on', function(){
      $('body').toggleClass('night');
    });

    // socket.on('off', function(){
    //   $('#light-bulb').attr('class', 'off');
    // });

    socket.on('brightness', function(data) {
        // $(".night .bulb-top, .night .bulb-bottom").css('opacity', data.brightness);
    });
    socket.on('position', function(data) {
        $(".data").css('height', data.data + 'px');
    });
});
