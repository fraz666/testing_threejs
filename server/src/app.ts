import express from 'express';
import { createServer } from 'node:http';
import createSocketServer from '../utils/socket';
import { AppRequest } from '../utils/custom-types';

const app = express();
const httpServer = createServer(app);
const io = createSocketServer(httpServer);

app.use((req, res, next) => {
  (req as AppRequest).io = io;
  return next();
});

io.on('connection', (socket) => {
  io.emit('chat response', 'Daje roma daje');
  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.disconnect();
  });
  socket.on('chat message', (msg) => {
    io.emit('chat response', msg);
  });
});

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



export default httpServer;