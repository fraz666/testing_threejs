import { Server } from 'socket.io';
import http from 'node:http';
import redisClient from './redis';
import { createAdapter } from '@socket.io/redis-streams-adapter';

const createSocketServer = (httpServer: http.Server) => new Server(httpServer, {
  adapter: createAdapter(redisClient, { streamName: 'three-gay' }),
});

export default createSocketServer;