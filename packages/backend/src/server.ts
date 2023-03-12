import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { log } from '@sqrib/shared';
import serveStatic from 'serve-static';
import path from 'path';
import { handleSocketConnection } from './sockets/socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
dotenv.config();
app.use(express.json());
app.use(cors());

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from server' });
});

io.on('connection', (socket: Socket) => handleSocketConnection(socket));

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'development') {
  app.use(serveStatic(`${__dirname}/public`));
  app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

server.listen(PORT, () => {
  log.info(`Sqrib server running on port ${PORT}`);
});
