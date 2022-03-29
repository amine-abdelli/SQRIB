const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const { v4 } = require('uuid');
const {
  createRoom, roomList, joinRoom, roomListIds,
} = require('./GameController');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
const defaultGameID = 1;
let games = {};

io.on('connection', (socket) => {
  socket.on('testGame', () => {
    joinRoom({
      gameId: defaultGameID,
      clientId: socket.handshake.auth.userID,
      username: socket.handshake.auth.userID,
      games,
    });
    io.emit('testGame', 'You joined the default room');
  });

  socket.on('createGame', (payload) => {
    const { clientId, username } = payload;
    createRoom({ clientId, username, games });
  });

  socket.on('findGames', () => {
    const roomIds = roomListIds(games);
    io.emit('findGames', roomIds);
  });

  socket.on('findOneGame', (gameId) => {
    const game = games[gameId];
    io.emit('findOneGame', game);
  });

  socket.on('startGame', ({ gameId }) => {
    games[gameId] = {
      ...games[gameId],
      status: 'started',
    };
    io.emit('startGame', games[gameId]);
  });
  socket.on('joinRandomGame', () => {
    const gameList = roomList(games);
    for (const aGame of gameList) {
      const roomSize = Object.keys(aGame.clients).length;
      if (roomSize < 5) {
        return io.emit('joinRandomGame', aGame.gameId);
      }
    }
    return io.emit('joinRandomGame', 'No game available');
  });

  socket.on('gameProgression', ({ clientId, wordIndex, gameId }) => {
    games = {
      ...games,
      [gameId]: {
        ...games[gameId],
        clients: {
          ...games[gameId]?.clients,
          [clientId]: {
            ...games[gameId]?.clients[clientId],
            wordIndex,
          },
        },
      },
    };
    io.emit('gameProgression', games[gameId]);
  });

  socket.on('initGame', (clientId) => {
    // Is there any existing room?
    if (Object.keys(games).length) {
      for (const aGameId of Object.keys(games)) {
        // If there is room for a player, join it
        if (Object.keys(games[aGameId].clients).length < 5) {
          joinRoom({
            gameId: aGameId, clientId, username: clientId, games,
          });
          console.log(`${clientId} just entered an existing room ${aGameId}`, {
            game: games[aGameId],
            gameClients: games[aGameId].clients,
          });
          return io.emit('initGame', { gameID: aGameId, game: games[aGameId] });
        }
      }
    }
    const gameID = v4();
    // if not create a room
    createRoom({
      clientId, username: clientId, games, customId: gameID,
    });
    console.log(`${clientId} just created room ${gameID}`, {
      game: games[gameID],
      gameClients: games[gameID].clients,
    });
    return io.emit('initGame', { gameID, game: games[gameID] });
  });

  socket.on('joinGame', (payload) => {
    const { gameId, clientId, username } = payload;
    joinRoom({
      gameId, clientId, username, games,
    });
    io.emit('joinGame', 'yeah boy that\'s all good');
  });

  const users = [];

  for (const [id, sock] of io.of('/').sockets) {
    console.log(id);
    users.push({
      userID: id,
      username: sock.handshake.auth.userID,
    });
  }
  socket.emit('users', users);
  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  });
});

server.listen(4001, () => {
  console.log('listening on *:4001');
});
