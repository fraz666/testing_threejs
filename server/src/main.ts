import { User } from './user';
import * as express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const SOCKET_PORT = 3000;

const main = () => {
  const app = express.default();
  const users: User[] = [];

  app.get('/', (_req, res) => {
    res.send({ uptime: process.uptime() });
  });

  const server = createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    const connectionId = socket.id;
    console.log('user connected', socket.id);

    socket.emit('create-players', users);

    const user = new User(connectionId);
    users.push(user);

    socket.on('disconnect', (e) => {
      console.log('disconnect');
      socket.broadcast.emit('player-leave', socket.id);
      removeUser(socket.id, users);
    });


    socket.on('update-position', (position: { x: number, y: number, z: number }) => {
      const user = users.find(x => x.getSocketId() === socket.id);
      if (user) {
        user.setPosition(position.x, position.y, position.z);
      }
      socket.broadcast.emit('update-players-position', users);
    });

    loop(socket);


    socket.broadcast.emit('player-joined', user);
  });

  server.listen(SOCKET_PORT, () => {
    console.log('Running at localhost:' + SOCKET_PORT);
  });





};

const loop = (socket: Socket) => {
  socket.emit('request-upload-position');
  setTimeout(() => {
    loop(socket);
  });
};

const removeUser = (socketId: string, users: User[]) => {
  const index = users.findIndex(x => x.getSocketId() === socketId);
  if (index > -1) {
    users.splice(index, 1);
  }
};


main();