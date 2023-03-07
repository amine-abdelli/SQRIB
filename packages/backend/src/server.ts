import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { log } from '@sqrib/shared';
import { handleSocketConnection } from './sockets/socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
dotenv.config();
app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server' });
});

io.on('connection', handleSocketConnection);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  log.info(`Sqrib server running on port ${PORT}`);
});
