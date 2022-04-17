import express from 'express';
import http from 'http';
import cors from 'cors';
import { Socket } from 'socket.io';

import { GameType, SetType } from './types/game';
import { Services } from './services/services';

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
/* Global objects Games & Sets */
let games: Record<string, GameType> = {};
let sets: Record<string, SetType> = {};

io.on('connection', (socket: Socket) => {
  /**
   * Remove user from global object
   */
  socket.on('disconnect', () => {
    games = Services.disconnect(games, socket, io);
  });

  /**
   * Update user's progression and handle users win
   */
  socket.on('progression', ({ roomID, wordIndex }) => {
    games = Services.progression(games, roomID, wordIndex, socket);
    io.to(roomID).emit('progression', { clients: Object.values(games[roomID].clients) });
    // Handle user's win
    if (games[roomID].wordAmount === wordIndex) {
      const { updatedSetObject, updatedGameObject } = Services
        .onWin(games, sets, roomID, io, socket);
      games = updatedGameObject;
      sets = updatedSetObject;
    }
  });

  /**
   *  Join or create a room depending on if the room exists or not
   */
  socket.on('join-room', ({ roomID, username, gameParameters }) => {
    if (Object.keys(games).includes(roomID)) {
      games = Services.joinRoom(games, roomID, username, socket);
      socket.join(roomID);
    } else {
      const { updatedGameObject, updatedSetObject } = Services
        .createRoom(games, roomID, gameParameters, sets, username, socket);
      games = updatedGameObject;
      sets = updatedSetObject;
      socket.join(roomID);
    }
    io.to(roomID).emit('join-room', {
      roomID,
      wordSet: sets[games[roomID]?.setID],
    });
    io.to(roomID).emit('greet', {
      playerName: username,
    });
  });

  /**
   * Send the list of rooms with their details
   */
  socket.on('room-list', () => {
    const roomList = Services.roomList(games);
    io.emit('room-list', roomList);
  });
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});
