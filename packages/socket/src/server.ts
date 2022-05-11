import express from 'express';
import http from 'http';
import cors from 'cors';
import { Socket } from 'socket.io';

import {
  GameType, SetType,
} from '@aqac/utils';
import { v4 } from 'uuid';
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
const LEGIT_TOKENS: string[] = [];

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
    io.to(roomID).emit('progression', { game: GAMES[roomID] });
    /**
     * If a user win, the game status change to 'finished'
     * users wordIndexes are set to 0 et and a new set of words is generated.
     * after 5 seconds, the game status change to 'playing' and
     * users are allow to play again
     */
    if (GAMES[roomID]?.wordAmount === wordIndex) {
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
          io.to(roomID).emit('on-win', { game: GAMES[roomID] });
        }
      }, 1000);
    }
  });

  /**
   *  Join or create a room depending on if the room exists or not
   */
  socket.on('join-room', ({ roomID, username, gameParameters }) => {
    // If room exists and user is not already in the room, join it !
    if (Object.keys(GAMES).includes(roomID) && !GAMES[roomID]?.clients[socket.id]) {
      GAMES = Services.joinRoom(GAMES, roomID, username, socket);
      socket.join(roomID);
      io.to(roomID).emit('greet', {
        playerID: socket.id,
        playerName: username,
      });
    // If room doesn't exist, create it !
    } else if (!GAMES[roomID]) {
      const { updatedGameObject, updatedSetObject } = Services
        .createRoom(GAMES, roomID, gameParameters, SETS, username, socket);
      GAMES = updatedGameObject;
      SETS = updatedSetObject;
      socket.join(roomID);
    }
    // Check if the room is in the LEGIT_TOKENS list
    const isLegit = LEGIT_TOKENS.includes(roomID);
    io.to(roomID).emit('join-room', {
      roomID,
      wordSet: SETS[GAMES[roomID]?.setID],
      game: GAMES[roomID],
      isLegit,
    });
  });

  /**
   * Send the list of rooms with their details
   */
  socket.on('room-list', () => {
    const roomList = Services.roomList(GAMES);
    io.emit('room-list', roomList);
  });

  socket.on('generate-room-id', () => {
    const decodedRoomID = v4();
    const buff = Buffer.from(`${decodedRoomID}?create=true`);
    const base64token = buff.toString('base64');
    LEGIT_TOKENS.push(decodedRoomID);
    io.emit('generate-room-id', { roomID: base64token });
  });

  socket.on('is-legit', (payload) => {
    const isLegit = LEGIT_TOKENS.includes(payload.roomID);
    io.emit('is-legit', { isLegit });
  });

  socket.on('start-game', ({ roomID, gameParameters }) => {
    const { updatedGameObject, updatedSetObject } = Services.updateRoomWithNewParameters(
      GAMES,
      roomID,
      gameParameters,
      SETS,
    );
    console.log('updatedGameObject', updatedGameObject);
    GAMES = Services.updateGameStatus(GameStatus.PLAYING, updatedGameObject, roomID);
    GAMES = Services.updatePlayersStatus(GameStatus.PLAYING, GAMES, roomID);
    SETS = updatedSetObject;
    io.to(roomID).emit('start-game', { game: GAMES[roomID] });
  });
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});
