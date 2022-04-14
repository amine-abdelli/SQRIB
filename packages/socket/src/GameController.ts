/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { generateWordSet, Languages } from '@aqac/utils';
import { v4 } from 'uuid';

// import { clientPattern } from './pattern';
import { colorGenerator } from './services/colorGen';
import { GameType, SetType } from './types/game';

interface CreateRoomArgs {
  games: Record<string, GameType>;
  roomID: string;
  sets: Record<string, SetType>;
  clientID: string;
  username: string;
  language: Languages;
  wordAmount: number;
}

function createRoom({
  games, sets, roomID, clientID, username, language = Languages.FR, wordAmount = 60,
}: CreateRoomArgs) {
  const setID = v4();
  sets[setID] = generateWordSet(language, wordAmount);
  games = {
    ...games,
    [roomID]: {
      id: roomID,
      language,
      wordAmount,
      setID,
      clients: {
        ...games[roomID]?.clients,
        [clientID]: {
          id: clientID,
          username,
          wordIndex: 0,
          color: colorGenerator(),
        },
      },
    },
  };
  return { games, sets };
}

// function joinRoom({
//   gameId, clientId, username, games,
// }: any) {
//   const game = games[gameId];
//   if (!game) {
//     throw new Error('Game not found');
//   }
//   game.clients[clientId] = {
//     ...clientPattern({
//       roomSize: Object.keys(game.clients).length,
//       clientId,
//       username,
//       gameId,
//     }),
//   };
//   return game;
// }

export {
  createRoom,
};
