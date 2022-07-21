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

  socket.on('StartMonitoring', (msg) => {
    console.log('Iniciando Monitoramento', msg);
  });

  socket.emit('RunningMonitoring', (msg) => {
    console.log('Teste', msg);
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});

module.exports = io;
