const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// configuring socket io
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

// here the new message is shown to the user
  socket.emit('newMessage',{
    from : 'Admin',
    text : 'Welcome to chat app',
    createdAt : new Date().getTime()
  });
// here the message tells the other user that someone joined
  socket.broadcast.emit('newMessage',{
    from : 'Admin',
    text : 'new user joined',
    createdAt : new Date().getTime()
  });

// this part recives
//the create message from client and sends off a new message
  socket.on('createMessage', (message)=>{
    console.log('createMessage', message);
    io.emit('newMessage',{
      from : message.from,
      text : message.text,
      createdAt : new Date().getTime()
    });
  });

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
