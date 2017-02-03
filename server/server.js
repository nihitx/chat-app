const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
//Es6 destructuring
const {generateMessage , generateLocationMessage} = require('./utils/message');
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
  socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));
// here the message tells the other user that someone joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

// this part recives
//the create message from client and sends off a new message
  socket.on('createMessage', (message, callback)=>{
    console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('Yes got it');
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude , coords.longitude));
  });

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
