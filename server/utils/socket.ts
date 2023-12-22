import { Server, RedisPresence } from "colyseus";
import http from 'node:http';

const gameServer = (httpServer: http.Server) => new Server({
  server: httpServer,
  presence: new RedisPresence(process.env.REDIS_URL),
  devMode: process.env.NODE_ENV !== 'production'
});

export default gameServer;