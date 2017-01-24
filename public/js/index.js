
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
    socket.emit('createMessage',{
      from: 'Masnad',
      text: 'Coming home 10 mins'
    });
  });

socket.on('newMessage', function(email){
    console.log(email, email);
});

socket.on('disconnect', function(){
  console.log('Disconnected');
});
