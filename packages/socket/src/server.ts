import express from 'express';
import http from 'http';
import cors from 'cors';
import { Socket } from 'socket.io';

import { GameType, SetType } from '@aqac/utils';
import { Services } from './services/services';
import { GameStatus } from './utils/constants';
import { emitGameStatus } from './utils/status';

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
/* Global Games & Sets objects */
let GAMES: Record<string, GameType> = {};
let SETS: Record<string, SetType> = {};

io.on('connection', (socket: Socket) => {
  /**
   * Remove user from global object
   */
  socket.on('disconnect', () => {
    GAMES = Services.disconnect(GAMES, socket, io);
  });

  /**
   * Update user's progression and handle users win
   */
  socket.on('progression', ({ roomID, wordIndex }) => {
    GAMES = Services.progression(GAMES, roomID, wordIndex, socket);
    io.to(roomID).emit('progression', { clients: Object.values(GAMES[roomID].clients), gameStatus: GAMES[roomID].status });
    /**
     * If a user win, the game status change to 'finished'
     * users wordIndexes are set to 0 et and a new set of words is generated.
     * after 5 seconds, the game status change to 'playing' and
     * users are allow to play again
     */
    if (GAMES[roomID].wordAmount === wordIndex) {
      GAMES = Services.updateGameStatus(GameStatus.FINISHED, GAMES, roomID);
      const { updatedSetObject, updatedGameObject } = Services
        .onWin(GAMES, SETS, roomID, io, socket);
      let counter = 6;
      const t = setInterval(() => {
        counter -= 1;
        io.to(roomID).emit('counter', { counter });
        if (counter === -2) {
          clearInterval(t);
          SETS = updatedSetObject;
          const transitionalObject = Services
            .updatePlayersStatus(GameStatus.PLAYING, updatedGameObject, roomID);
          GAMES = Services.updateGameStatus(GameStatus.PLAYING, transitionalObject, roomID);
          emitGameStatus(GAMES, roomID, io);
          io.to(roomID).emit('on-win', { clients: Object.values(GAMES[roomID].clients) });
        }
      }, 1000);
    }
  });

  /**
   *  Join or create a room depending on if the room exists or not
   */
  socket.on('join-room', ({ roomID, username, gameParameters }) => {
    if (Object.keys(GAMES).includes(roomID)) {
      GAMES = Services.joinRoom(GAMES, roomID, username, socket);
      socket.join(roomID);
    } else {
      const { updatedGameObject, updatedSetObject } = Services
        .createRoom(GAMES, roomID, gameParameters, SETS, username, socket);
      GAMES = updatedGameObject;
      SETS = updatedSetObject;
      socket.join(roomID);
    }
    io.to(roomID).emit('join-room', {
      roomID,
      wordSet: SETS[GAMES[roomID]?.setID],
    });
    io.to(roomID).emit('greet', {
      playerName: username,
    });
  });

  /**
   * Send the list of rooms with their details
   */
  socket.on('room-list', () => {
    const roomList = Services.roomList(GAMES);
    io.emit('room-list', roomList);
  });
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});
