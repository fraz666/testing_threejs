import express from 'express';
import { createServer } from 'node:http';
import gameServer from '../utils/socket';
import { AppRequest } from '../utils/custom-types';

const app = express();
const httpServer = createServer(app);
const gs = gameServer(httpServer);

app.use(express.json());

// req.gameServer accessibile con cast tramite AppRequest
app.use('gameServer', (req, res, next) => {
  (req as AppRequest).gameServer = gs;
  next();
});

app.get('/', async (req, res) => {
  const { gameServer } = req as AppRequest;

  res.sendFile(__dirname + '/index.html');
});



export default httpServer;