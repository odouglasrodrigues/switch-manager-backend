const { Server } = require('socket.io');
const http = require('http');
const { exec } = require('child_process');
const path = require('path');
const app = require('./app');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origins: ['*'],
  },
});

io.on('connection', (socket) => {
  console.log('Conectado', socket.id);

  socket.on('StartMonitoring', (msg) => {
    const local = path.resolve('src/methods/TransceiverMonitoring.py');
    const cmd = `python3 ${local} ${msg.ip} ${msg.user} ${msg.pass} ${msg.port} ${msg.interface} ${socket.id} ${msg.tempo}`;
    exec(cmd);
  });

  socket.on('RunningMonitoring', (msg) => {
    console.log({ msg, PySioID: socket.id });
    socket.to(msg.id).emit('RunningMonitoring', { msg, PySioID: socket.id });
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});

module.exports = io;
