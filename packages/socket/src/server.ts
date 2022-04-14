import express from 'express';
import http from 'http';

import cors from 'cors';

import { Socket } from 'socket.io';

import { v4 } from 'uuid';
import { generateWordSet } from '@aqac/utils';
import { GameType, SetType } from './types/game';

import { createRoom } from './GameController';
import { colorGenerator } from './services/colorGen';

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

let games: Record<string, GameType> = {};
let sets: Record<string, SetType> = {};

io.on('connection', (socket: Socket) => {
  socket.on('init', () => {
    io.emit('init', socket.id);
  });

  socket.on('disconnect', () => {
    for (const aGame of Object.values(games)) {
      if (aGame.clients[socket.id]) {
        delete aGame.clients[socket.id];
        if (Object.values(aGame.clients).length === 0) {
          delete games[aGame.id];
        }
        io.to(aGame.id).emit('on-disconnect', { game: games[aGame.id] });
      }
    }
  });

  socket.on('progression', ({ roomID, wordIndex }) => {
    games = {
      ...games,
      [roomID]: {
        ...games[roomID],
        clients: {
          ...games[roomID]?.clients,
          [socket.id]: {
            ...games[roomID]?.clients[socket.id],
            wordIndex,
            // Needed to calculate the progression out of 100
            wordAmount: games[roomID].wordAmount,
          },
        },
      },
    };
    io.to(roomID).emit('progression', { clients: Object.values(games[roomID].clients) });
  });

  socket.on('join-room', ({ roomID, username, gameParameters }) => {
    if (Object.keys(games).includes(roomID)) {
      games = {
        ...games,
        [roomID]: {
          ...games[roomID],
          clients: {
            ...games[roomID]?.clients,
            [socket.id]: {
              id: socket.id,
              username,
              wordIndex: 0,
              color: colorGenerator(),
            },
          },
        },
      };
      socket.join(roomID);
    } else {
      const { language, wordAmount } = gameParameters;
      const { games: newGames, sets: newSets } = createRoom({
        games, roomID, sets, clientID: socket.id, username, language, wordAmount,
      });
      games = newGames;
      sets = newSets;
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

  socket.on('on-win', ({ username, roomID }) => {
    for (const aClient of Object.values(games[roomID].clients)) {
      games[roomID].clients[aClient.id].wordIndex = 0;
    }
    const setID = v4();
    sets[setID] = generateWordSet(games[roomID].language, games[roomID].wordAmount);
    games[roomID].setID = setID;
    io.to(roomID).emit('on-win', {
      username,
      clients: Object.values(games[roomID].clients),
      wordSet: sets[games[roomID]?.setID],
    });
  });

  socket.on('room-list', () => {
    const roomList = Object.values(games).map(({
      id, language, wordAmount, clients,
    }: GameType) => (
      {
        name: id,
        players: Object.values(games[id].clients).length,
        lang: language,
        wordAmount,
        clients: Object.values(clients).map(({ username }) => username),
      }
    ));
    io.emit('room-list', roomList);
  });
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});
