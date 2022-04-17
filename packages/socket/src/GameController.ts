import {
  GameType, generateWordSet, Languages, SetType,
} from '@aqac/utils';
import { v4 } from 'uuid';

import { colorGenerator } from './services/colorGen';
import { status } from './status.enum';

interface CreateRoomArgs {
  games: Record<string, GameType>;
  roomID: string;
  sets: Record<string, SetType>;
  clientID: string;
  username: string;
  language: Languages;
  wordAmount: number;
}

function initNewGameRoom({
  games, sets, roomID, clientID, username, language = Languages.FR, wordAmount = 60,
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
      status: status.WAITING,
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
        },
      },
    },
  };
  return updatedGames;
}

export {
  initNewGameRoom, assignUserToARoom,
};
