const { Server } = require('socket.io');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origins: ['*'],
  },
});

io.on('connection', (socket) => {
  console.log('Conectado', socket.id);
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});

module.exports = io;
