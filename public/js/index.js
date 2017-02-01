
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

// socket.emit('createMessage',{
//   from : 'Masnad',
//   text : 'Server did you get this?'
// },function(data){
//   console.log(data);
// });;

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from : 'User',
    text : $('[name=message]').val()
  },function(){

  });;
});
