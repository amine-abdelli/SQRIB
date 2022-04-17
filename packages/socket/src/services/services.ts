import { Languages } from '@aqac/utils';
import { Socket } from 'socket.io';
import { createRoom } from '../GameController';
import { GameType, SetType } from '../types/game';
import { colorGenerator } from './colorGen';

export const Services = {
  //
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
  //
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
  //
  joinRoom: (
    games: Record<string, GameType>,
    roomID: string,
    username: string,
    socket: Socket,
  ) => {
    const updatedGames = {
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
    return updatedGames;
  },
  createRoom: (
    games: Record<string, GameType>,
    roomID: string,
    gameParameters: Record<string, number | string | Languages | any>,
    sets: Record<string, SetType>,
    username: string,
    socket: Socket,
  ) => {
    const { language, wordAmount } = gameParameters;
    const { games: newGames, sets: newSets } = createRoom({
      games, roomID, sets, clientID: socket.id, username, language, wordAmount,
    });
    console.dir(newGames[roomID], { depth: null });
    return { newGames, newSets };
  },
};
