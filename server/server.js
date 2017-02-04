const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
//Es6 destructuring
const {generateMessage , generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// configuring socket io
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    // removing user from other rooms if he was dere before
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // here the new message is shown to the user
      socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));
    // here the message tells the other user that someone joined
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
    callback();
  });


// this part recives
//the create message from client and sends off a new message
  socket.on('createMessage', (message, callback)=>{
    console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude , coords.longitude));
  });

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
