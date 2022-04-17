import { generateWordSet, Languages } from '@aqac/utils';
import { Socket } from 'socket.io';
import { v4 } from 'uuid';
import { initNewGameRoom, assignUserToARoom } from '../GameController';
import { GameType, SetType } from '../types/game';

export const Services = {
  /**
   *  Remove user from global object
   */
  disconnect: (games: Record<string, GameType>, socket: Socket, io: any) => {
    for (const aGame of Object.values(games)) {
      if (aGame.clients[socket.id]) {
        delete aGame.clients[socket.id];
        if (Object.values(aGame.clients).length === 0) {
          delete games[aGame.id];
        }
        io.to(aGame.id).emit('on-disconnect', { game: games[aGame.id] });
      }
    }
    return games;
  },
  /**
   * Handle users progression
   */
  progression: (
    games: Record<string, GameType>,
    roomID: string,
    wordIndex: number,
    socket: Socket,
  ) => {
    const updatedGames = {
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
    return updatedGames;
  },
  /**
   * Put user into a game's clients key to join him in
   */
  joinRoom: (
    games: Record<string, GameType>,
    roomID: string,
    username: string,
    socket: Socket,
  ) => {
    const updatedGames = assignUserToARoom({
      roomID, username, games, socket,
    });
    return updatedGames;
  },
  /**
   * Add a new game to the global object
   */
  createRoom: (
    games: Record<string, GameType>,
    roomID: string,
    gameParameters: Record<string, number | string | Languages | any>,
    sets: Record<string, SetType>,
    username: string,
    socket: Socket,
  ) => {
    const { language, wordAmount } = gameParameters;
    const { updatedGameObject, updatedSetObject } = initNewGameRoom({
      games, roomID, sets, clientID: socket.id, username, language, wordAmount,
    });
    return { updatedGameObject, updatedSetObject };
  },
  /**
   * Handle user's win
   */
  onWin: (
    games: Record<string, GameType>,
    sets: Record<string, SetType>,
    roomID: string,
    io: any,
    socket: Socket,
  ) => {
    const updatedGameObject = games;
    const updatedSetObject = sets;
    // Reset scores to zero
    for (const aClient of Object.values(games[roomID].clients)) {
      updatedGameObject[roomID].clients[aClient.id].wordIndex = 0;
    }
    const setID = v4();
    // Create a new set of word
    updatedSetObject[setID] = generateWordSet(games[roomID].language, games[roomID].wordAmount);
    updatedGameObject[roomID].setID = setID;
    // Send new game details to users
    io.to(roomID).emit('on-win', {
      username: games[roomID]?.clients[socket.id].username,
      clients: Object.values(games[roomID].clients),
      wordSet: sets[games[roomID]?.setID],
    });
    io.to(roomID).emit('on-win', games[roomID]?.clients[socket.id].username);
    return { updatedGameObject, updatedSetObject };
  },
};
