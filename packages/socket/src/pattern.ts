import { colorGenerator } from './services/colorGen';
import { GameStatus } from './utils/constants';

interface ClientPatternArgs {
  roomSize: number;
  clientID: string;
  username: string;
  wordIndex?: number;
}

function clientPattern({
  clientID, username, wordIndex,
}: ClientPatternArgs) {
  return {
    id: clientID,
    username,
    color: colorGenerator(),
    wordIndex: wordIndex || 0,
    wordAmount: 0,
    status: GameStatus.WAITING,
  };
}

interface GamePatternArgs extends ClientPatternArgs {
  gameID: string
}

function gamePattern({
  gameID, clientID, roomSize, username,
}: GamePatternArgs) {
  return {
    gameID,
    status: GameStatus.WAITING, // waiting, playing, finished
    language: 'fr', // fr, en, gb, de
    host: clientID,
    clients: {
      [clientID]: {
        ...clientPattern({
          roomSize, clientID, username,
        }),
      },
    },
  };
}

export { clientPattern, gamePattern };
