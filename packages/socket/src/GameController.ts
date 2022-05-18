import {
  GameType, generateWordSet, Languages, SetType,
} from '@aqac/utils';
import { v4 } from 'uuid';

import { colorGenerator } from './services/colorGen';
import { GameStatus } from './utils/constants';

interface CreateRoomArgs {
  games: Record<string, GameType>;
  roomID: string;
  sets: Record<string, SetType>;
  clientID: string;
  username: string;
  language: Languages;
  wordAmount: number;
  name: string;
}

interface updateRoomArgs {
  games: Record<string, GameType>;
  roomID: string;
  sets: Record<string, SetType>;
  language: Languages;
  wordAmount: number;
  name: string;
}

function initNewGameRoom({
  games, sets, roomID, clientID, username, language = Languages.FR, wordAmount = 60, name,
}: CreateRoomArgs) {
  let updatedGameObject = games;
  const updatedSetObject = sets;
  const setID = v4();
  updatedSetObject[setID] = generateWordSet(language, wordAmount);
  updatedGameObject = {
    ...games,
    [roomID]: {
      id: roomID,
      language,
      wordAmount,
      setID,
      // Dodgy hot fix :'(
      name: name?.replace('undefined', username) || '',
      status: GameStatus.STAGING,
      clients: {
        [clientID]: {
          id: clientID,
          username,
          wordIndex: 0,
          color: colorGenerator(),
          status: GameStatus.PLAYING,
          host: true,
          wordAmount,
        },
      },
    },
  };

  return { updatedGameObject, updatedSetObject };
}

function updateRoom({
  games, sets, roomID, language = Languages.FR, wordAmount = 60, name,
}: updateRoomArgs) {
  let updatedGameObject = games;
  const updatedSetObject = sets;
  const setID = v4();
  updatedSetObject[setID] = generateWordSet(language, wordAmount);
  updatedGameObject = {
    ...games,
    [roomID]: {
      ...games[roomID],
      language,
      wordAmount,
      setID,
      name,
    },
  };
  return { updatedGameObject, updatedSetObject };
}

function assignUserToARoom({
  roomID, username, games, socket,
}: any) {
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
          status: GameStatus.STAGING,
          host: false,
        },
      },
    },
  };
  return updatedGames;
}

export {
  initNewGameRoom, assignUserToARoom, updateRoom,
};
