/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
const { v4 } = require('uuid');

const { gamePattern, clientPattern } = require('./pattern');

function createRoom({
  clientId, username, games, customId,
}) {
  const gameId = customId || v4();
  games[gameId] = {
    ...gamePattern({
      gameId,
      clientId,
      roomSize: Object.keys(games).length || 0,
      username,
    }),
  };
  return games;
}

function roomList(games) {
  return Object.values(games);
}

function roomListIds(games) {
  return Object.keys(games);
}

function joinRoom({
  gameId, clientId, username, games,
}) {
  const game = games[gameId];
  if (!game) {
    throw new Error('Game not found');
  }
  game.clients[clientId] = {
    ...clientPattern({
      roomSize: Object.keys(game.clients).length,
      clientId,
      username,
      gameId,
    }),
  };
  return game;
}

module.exports = {
  createRoom, joinRoom, roomList, roomListIds,
};
