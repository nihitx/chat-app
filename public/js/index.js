
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
});

socket.emit('createMessage',{
  from : 'Masnad',
  text : 'Server did you get this?'
},function(data){
  console.log(data);
});;
