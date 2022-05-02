import {
  GameType, generateWordSet, Languages, SetType,
} from '@aqac/utils';
import { Socket } from 'socket.io';
import { v4 } from 'uuid';
import { GameStatus } from '../utils/constants';
import { initNewGameRoom, assignUserToARoom } from '../GameController';

export const Services = {
  /**
   *  Remove user from global object
   */
  disconnect: (games: Record<string, GameType>, socket: Socket, io: any) => {
    for (const aGame of Object.values(games)) {
      if (aGame.clients[socket.id]) {
        delete aGame.clients[socket.id];
        if (Object.values(aGame.clients).length === 0) {
          // eslint-disable-next-line no-param-reassign
          delete games[aGame.id];
        }
        // Update room player list in live when someone leave the room
        if (games[aGame.id]?.clients) {
          io.to(aGame.id).emit('hasBeenDisconnected', { clients: Object.values(games[aGame.id]?.clients) });
        }
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
            ...games[roomID]?.clients?.[socket.id], // ! This break everything :'()
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
    // Reset players scores to zero
    for (const aClient of Object.values(games[roomID].clients)) {
      updatedGameObject[roomID].clients[aClient.id].wordIndex = 0;
    }
    const setID = v4();
    // Create a new set of word
    updatedSetObject[setID] = generateWordSet(games[roomID].language, games[roomID].wordAmount);
    updatedGameObject[roomID].setID = setID;
    // Send new game details to users
    io.to(roomID).emit('on-win', {
      username: games[roomID]?.clients[socket.id]?.username,
      clients: Object.values(games[roomID].clients),
      wordSet: sets[games[roomID]?.setID],
      status: games[roomID]?.status,
    });
    return { updatedGameObject, updatedSetObject };
  },
  /**
    * Send the list of rooms with their details
   */
  roomList: (games: Record<string, GameType>) => {
    const roomList = Object.values(games).map(({
      id, language, wordAmount, clients,
    }: GameType) => (
      {
        name: id,
        players: Object.values(games[id].clients).length,
        lang: language,
        wordAmount,
        clients: Object.values(clients).map(({ username }) => username),
      }
    ));
    return roomList;
  },
  updateGameStatus: (
    status: GameStatus,
    games: Record<string, GameType>,
    roomID: string,
  ) => {
    /**
     * Mettre le joueur en waiting par défault.
     * Si le joueur arrive dans la partie et que la partie est en cours, maintenir son status
     * en waiting.
     * Tant que le joueur est en status waiting, il ne peut pas participer à la partie.
     * Dans le scoring seuls les joueurs en status playing sont pris en compte.
     * Quand une partie arrive en status finished, tous les joueurs sont en status waiting.
     * Après un compteur de 4 secondes, passer tous les joueurs en playing
     */
    const updatedGames = {
      ...games,
      [roomID]: {
        ...games[roomID],
        status,
        clients: games[roomID]?.clients,
      },
    };
    return updatedGames;
  },
  updatePlayersStatus: (status: GameStatus, games: Record<string, GameType>, roomID: string) => {
    const newGameObject: Record<string, GameType> = games;
    for (const aClient of Object.values(games[roomID]?.clients)) {
      if (aClient.status) {
        newGameObject[roomID].clients[aClient.id].status = status || GameStatus.PLAYING;
      }
    }
    return newGameObject;
  },
};
