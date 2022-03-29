const { colorGenerator } = require('./services/colorGen');

function clientPattern({
  roomSize, clientId, username, gameId,
}) {
  return {
    clientId,
    username,
    color: colorGenerator(roomSize),
    wordIndex: 0,
    gameId: gameId || null,
  };
}

function gamePattern({
  gameId, clientId, roomSize, username,
}) {
  return {
    gameId,
    status: 'waiting', // waiting, playing, finished
    language: 'fr', // fr, en, gb, de
    host: clientId,
    clients: {
      [clientId]: {
        ...clientPattern({
          roomSize, clientId, username, gameId,
        }),
      },
    },
  };
}

module.exports = { clientPattern, gamePattern };
