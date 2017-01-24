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

  socket.emit('newMessage',{
    from : 'Mom',
    text : 'come back home, Mom'
  });

  socket.on('createMessage', (newEmail)=>{
    console.log(newEmail);
  });

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
