import express from 'express';
import http from 'http';
import cors from 'cors';
import { Socket } from 'socket.io';
import dotenv from 'dotenv';

import {
  GameType, log, SetType,
} from '@aqac/utils';
import { v4 } from 'uuid';
import { Database_manager } from '@aqayc/db';
import { Services } from './services/services';
import { GameStatus } from './utils/constants';
import { emitGameStatus } from './utils/status';

dotenv.config();
const db = new Database_manager();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
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
    log.info(`${socket.id} disconnected`);
    GAMES = Services.disconnect(GAMES, LEGIT_TOKENS, socket, io);
    Services.emitRoomList(io, GAMES);
  });

  /**
   * Update user's progression and handle users win
   */
  socket.on('progression', async ({ roomID, wordIndex, scoringObject }) => {
    if (GAMES[roomID]?.status !== 'staging') {
      GAMES = Services.progression(GAMES, roomID, wordIndex, socket, scoringObject);
      io.to(roomID).emit('progression', { game: GAMES[roomID] });
    }
    /**
     * If a user win, the game status change to 'finished'
     * users wordIndexes are set to 0 et and a new set of words is generated.
     * after 5 seconds, the game status change to 'playing' and
     * users are allow to play again
     */
    if (GAMES[roomID]?.wordAmount === wordIndex) {
      const game = await Services.saveGame(db, GAMES[roomID], socket.id, roomID);
      Services.stopTimer(roomID);
      if (game.message) {
        const scores = await Services.getScoresData(db);
        io.emit('get-global-game-data', scores);
      }
      GAMES = Services.updateGameStatus(GameStatus.FINISHED, GAMES, roomID);
      const { updatedSetObject, updatedGameObject } = Services
        .onWin(GAMES, SETS, roomID, io, socket);
      let counter = 6;
      const timer = setInterval(() => {
        counter -= 1;
        io.to(roomID).emit('counter', { counter });
        if (counter === -2) {
          clearInterval(timer);
          SETS = updatedSetObject;
          const transitionalObject = Services
            .updatePlayersStatus(GameStatus.PLAYING, updatedGameObject, roomID);
          GAMES = Services.updateGameStatus(GameStatus.PLAYING, transitionalObject, roomID);
          emitGameStatus(GAMES, roomID, io);
          io.to(roomID).emit('on-win', { game: GAMES[roomID] });
          Services.startTimer(roomID);
          counter = 6;
        }
      }, 1000);
    }
  });

  /**
   *  Join or create a room depending on if the room exists or not
   *  When a use click on create room, an id is generated and stored in
   *  a legit token array. This id is used to redirect the user to the room
   *  with a param 'created' set to true via url. If the param 'created' is
   *  true then we automatically create a room with the id.
   *
   *  Otherwise we join the room.
   *
   *  A check is always made to see if the room id provided is legit to be used to
   *  create or join
   */
  socket.on('join-room', ({
    roomID, username, userId, gameParameters, isCreating,
  }) => {
    const isLegit = LEGIT_TOKENS.includes(roomID);
    // If the room exists, the user is not already in the room and the roomID is legit, join it !
    if (!isCreating && GAMES[roomID] && isLegit && !GAMES[roomID]?.clients[socket.id]) {
      log.info('Trying to join a room', { roomID, username });
      GAMES = Services.joinRoom(GAMES, roomID, username, userId, socket);
      // Join room -> RoomID
      socket.join(roomID);
      io.to(roomID).emit('greet', {
        playerID: socket.id,
        playerName: username,
      });
      // Everytime a user join or create a room, we emit the room list to update the room table
      Services.emitRoomList(io, GAMES);
    // If room doesn't exist and the roomID is legit, create it !
    } else if (isCreating && !GAMES[roomID] && isLegit) {
      log.info('Trying to create a room', { roomID, username });
      const { updatedGameObject, updatedSetObject } = Services
        .createRoom(GAMES, roomID, gameParameters, SETS, username, userId, socket);
      GAMES = updatedGameObject;
      SETS = updatedSetObject;
      socket.join(roomID);
    }
    // Check if the room is in the LEGIT_TOKENS list
    io.to(roomID).emit('join-room', {
      roomID,
      wordSet: SETS[GAMES[roomID]?.setID],
      game: GAMES[roomID],
      isLegit,
    });
    // Everytime a user join or create a room, we emit the room list to update the room table
    Services.emitRoomList(io, GAMES);
  });

  /**
   * Send the list of rooms with their details
   */
  socket.on('room-list', async () => {
    log.info('Requesting room list');
    const roomList = Services.roomList(GAMES);
    io.emit('room-list', roomList);
  });

  /**
   * Generate a room id and store it in the LEGIT_TOKENS array
   * This allow us to check if the user creating a room via its url is
   * legit to perform this action or not. If the roomID is not in the LEGIT_TOKENS array
   * the user won't be allow to join or create a room.
   */
  socket.on('generate-room-id', () => {
    log.info('Generating room id');
    const decodedRoomID = v4();
    const buff = Buffer.from(`${decodedRoomID}?create=true`);
    const base64token = buff.toString('base64');
    LEGIT_TOKENS.push(decodedRoomID);
    io.to(socket.id).emit('generate-room-id', { roomID: base64token });
  });

  /**
   * On click on the 'start' button, the game and players status change to 'playing'
   * and the game start. We also update the new game parameters selected by the creator.
   */
  socket.on('start-game', ({ roomID, gameParameters }) => {
    log.info(`${socket.id} is starting the game`, { roomID });
    const { updatedGameObject, updatedSetObject } = Services.updateRoomWithNewParameters(
      GAMES,
      roomID,
      gameParameters,
      SETS,
    );
    GAMES = Services.updateGameStatus(GameStatus.PLAYING, updatedGameObject, roomID);
    SETS = updatedSetObject;
    // Update game status to the client to close creation room modal
    io.to(roomID).emit('start-game', { game: GAMES[roomID] });

    // 3, 2, 1, GO ! at first start
    let counter = 3;
    const timer = setInterval(() => {
      counter -= 1;
      io.to(roomID).emit('counter', { counter, isFirstCounter: true });
      if (counter === -2) {
        clearInterval(timer);
        GAMES = Services.updatePlayersStatus(GameStatus.PLAYING, GAMES, roomID);
        // Send the updated game to the client with latest game data
        io.to(roomID).emit('start-game', { game: GAMES[roomID] });
        // start timer
        Services.startTimer(roomID);
      }
    }, 1000);
  });

  /**
   * Fetch and format scores related data
   */
  socket.on('get-global-game-data', async () => {
    log.info('Fetching scores data');
    const scores = await Services.getScoresData(db);
    io.emit('get-global-game-data', scores);
  });
});

server.listen(4001, () => {
  log.info('listening on *:4001');
});
