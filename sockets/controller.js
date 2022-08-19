const { v4: uuid } = require('uuid');

const socketController = (socket) => {
  console.log('Client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });

  socket.on('send-message', (payload) => {
    payload.id = uuid();
    socket.broadcast.emit('recieve-message', payload);
  });
};

module.exports = {
  socketController
};
