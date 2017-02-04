
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
  });

socket.on('disconnect', function(){
  console.log('Disconnected');
});

//ricieves the newMessage and shows all the users
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

// socket.emit('createMessage',{
//   from : 'Masnad',
//   text : 'Server did you get this?'
// },function(data){
//   console.log(data);
// });;

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from : 'User',
    text : messageTextbox.val()
  },function(){
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
// function to get geo location
locationButton.on('click',function(e){
  if(!navigator.geolocation){
    return alert('Geolocation not supported');
  }
  // method to disable button and change button text
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    // remove button disabled even if geo location method fails
    locationButton.removeAttr('disabled').text('Send location');
    // error handler
    alert('Unable to fetch location');
  });
});
