import { colorGenerator } from './services/colorGen';

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
    status: 'waiting', // waiting, playing, finished
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
