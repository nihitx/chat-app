
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
  });

socket.on('disconnect', function(){
  console.log('Disconnected');
});

//ricieves the newMessage and shows all the users
socket.on('newMessage', function(message){
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = $('<li></li>');
  var a  = $('<a target="_blank"> My current location </a>');
  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
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
