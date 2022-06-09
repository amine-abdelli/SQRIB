import {
  GameType, generateWordSet, Languages, SetType,
} from '@aqac/utils';
import { v4 } from 'uuid';
import { colorGenerator } from './services/colorGen';
import { GameStatus } from './utils/constants';

function roomMocks(SETS: Record<string, SetType>, GAMES: Record<string, GameType>) {
  const updatedSetObject = SETS;
  const language = Languages.FR;
  const wordAmount = 60;
  const roomID = 'roomOne';
  const setID = v4();
  updatedSetObject[setID] = generateWordSet(language, wordAmount);
  return {
    ...GAMES,
    [roomID]: {
      id: roomID,
      language,
      wordAmount,
      name: 'roomOne',
      setID,
      status: GameStatus.PLAYING,
      clients: {
        ...GAMES[roomID]?.clients,
        fdkjmjlsdfmsdkf: {
          id: 'narstonerz',
          username: 'narstonerz',
          wordIndex: 0,
          color: colorGenerator(),
          status: GameStatus.PLAYING,
          host: true,
          wordAmount,
        },
        psmldndbfjhksdlf: {
          id: 'nbthebutcher',
          username: 'nbthebutcher',
          wordIndex: 0,
          color: colorGenerator(),
          status: GameStatus.PLAYING,
          host: true,
          wordAmount,
        },
      },
    },
    dsqkldqsdqs: {
      id: 'dsqkldqsdqs',
      language,
      wordAmount,
      setID,
      status: 'playing',
      name: 'roomTwo',
      clients: {
        fdkjmjlsdfmsdkf: {
          id: 'Michel',
          username: 'Michel',
          wordIndex: 0,
          color: colorGenerator(),
          status: GameStatus.PLAYING,
          host: true,
          wordAmount,
        },
        psmldndbfjhksdlf: {
          id: 'neuneu',
          username: 'neuneu',
          wordIndex: 0,
          color: colorGenerator(),
          status: GameStatus.PLAYING,
          host: true,
          wordAmount,
        },
      },
    },
  };
}

export { roomMocks };
