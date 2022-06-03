import {
  Game,
  GameType, generateWordSet,
  groupScoresByLanguageAndHighestScores,
  Languages, log, ScoreType, scoringObjectType, SetType,
} from '@aqac/utils';
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';
import { GameStatus } from '../utils/constants';
import { initNewGameRoom, assignUserToARoom, updateRoom } from '../GameController';

function isMulti(score: ScoreType) {
  return score.type === 'multi';
}
function isSolo(score: ScoreType) {
  return score.type === 'solo';
}

let TIMERS: Record<string, {
  time: number
  interval: ReturnType<typeof setInterval>
}> = {};

export const Services = {
  /**
   *  Remove user from global object
   */
  disconnect: (
    games: Record<string, GameType>,
    LEGIT_TOKENS: string[],
    socket: Socket,
    io: Server,
  ) => {
    for (const aGame of Object.values(games)) {
      if (aGame.clients[socket.id]) {
        // if user is the host, attribute this status to someone else
        if (aGame.clients[socket.id]?.host && Object.values(aGame.clients)?.length > 1) {
          const newHostID = Object.values(aGame.clients)?.[1]?.id;
          if (aGame.clients[newHostID]) {
            aGame.clients[newHostID].host = true;
          }
        }
        delete aGame.clients[socket.id];
        // Remove roomID from legit token
        if (Object.values(aGame.clients)?.length === 0) {
          const indexOfGameInLegitTokensArray = LEGIT_TOKENS.indexOf(aGame.id);
          LEGIT_TOKENS.splice(indexOfGameInLegitTokensArray, 1);
          // eslint-disable-next-line no-param-reassign
          delete games[aGame.id];
          // Clear and delete timer
          delete TIMERS[aGame.id];
        }
        // Update room player list in live when someone leave the room
        if (games[aGame.id]?.clients) {
          io.to(aGame.id).emit('hasBeenDisconnected', { game: games[aGame.id] });
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
    scoringObject: scoringObjectType,
  ) => {
    const updatedGames = {
      ...games,
      [roomID]: {
        ...games[roomID],
        clients: {
          ...games[roomID]?.clients,
          [socket.id]: {
            ...games[roomID]?.clients?.[socket.id],
            ...scoringObject,
            wordIndex,
            // Needed to calculate the progression out of 100
            wordAmount: games[roomID]?.wordAmount,
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
    userId: string | null,
    socket: Socket,
  ) => {
    if (!games[roomID].clients[socket.id]) {
      const updatedGames = assignUserToARoom({
        games, roomID, username, userId, socket,
      });
      return updatedGames;
    }
    return games;
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
    userId: string | null,
    socket: Socket,
  ) => {
    const { language, wordAmount, name } = gameParameters;
    const { updatedGameObject, updatedSetObject } = initNewGameRoom({
      games, roomID, sets, clientID: socket.id, username, userId, language, wordAmount, name,
    });
    return { updatedGameObject, updatedSetObject };
  },
  updateRoomWithNewParameters: (
    games: Record<string, GameType>,
    roomID: string,
    gameParameters: Record<string, number | string | Languages | any>,
    sets: Record<string, SetType>,
  ) => {
    const { language, wordAmount, name } = gameParameters;
    const { updatedGameObject, updatedSetObject } = updateRoom({
      games, roomID, sets, language, wordAmount, name,
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
    io: Socket,
    socket: Socket,
  ) => {
    const updatedGameObject = games;
    const updatedSetObject = sets;
    // Reset players scores to zero
    for (const aClient of Object.values(games[roomID].clients)) {
      updatedGameObject[roomID].clients[aClient.id] = {
        ...updatedGameObject[roomID].clients[aClient.id],
        wordIndex: 0,
        wrongWords: 0,
        correctLetters: 0,
        totalLetters: 0,
        wrongLetters: 0,
        precision: 0,
        points: 0,
        mpm: 0,
      };
      // updatedGameObject[roomID].clients[aClient.id].wordIndex = 0;
    }
    const setID = v4();
    // Create a new set of word
    updatedSetObject[setID] = generateWordSet(games[roomID].language, games[roomID].wordAmount);
    updatedGameObject[roomID].setID = setID;
    // Send new game details to users
    io.to(roomID).emit('on-win', {
      username: games[roomID]?.clients[socket.id]?.username,
      game: games[roomID],
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
      id, language, wordAmount, clients, name,
    }: GameType) => ({
      id,
      name,
      players: games[id] && Object.values(games[id]?.clients).length,
      lang: language,
      wordAmount,
      clients: Object.values(clients).map(({ username }) => username),
    }));
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
  emitRoomList: (io: Socket, games: Record<string, GameType>) => {
    const roomList = Services.roomList(games);
    io.emit('room-list', roomList);
  },
  /**
   * Init and start the timer in the global TIMERS object
   * @param roomID Room ID
   */
  startTimer: (roomID: string) => {
    // Init room timer at 0 by default
    TIMERS = {
      ...TIMERS,
      [roomID]: {
        ...TIMERS[roomID],
        time: 0,
      },
    };
    TIMERS[roomID].interval = setInterval(() => {
      // This check avoid failure if user leave the game
      if (TIMERS[roomID]?.time >= 0) {
        TIMERS[roomID].time += 1;
      }
    }, 1000);
  },
  /**
   * Stop the timer and delete it from the global TIMERS object
   * @param roomID Room ID
   */
  stopTimer: (roomID: string) => {
    clearInterval(TIMERS[roomID].interval);
    delete TIMERS[roomID];
  },
  // Database related actions
  getScoresData: async (db: any) => {
    const scores = await db.findManyScores();
    const games = await db.findManyGames();
    const multiplayerScores = scores.filter(isMulti);
    const scoresInSolo = scores.filter(isSolo);
    const multiplayerGroupedScores = groupScoresByLanguageAndHighestScores(multiplayerScores);
    const scoresInSoloGroupedScores = groupScoresByLanguageAndHighestScores(scoresInSolo);
    return { solo: scoresInSoloGroupedScores, multi: multiplayerGroupedScores, games };
  },
  saveGame: async (db: any, game: GameType, socketId: string, roomID: string) => {
    const { time } = TIMERS[roomID];
    // Create Game
    const gamePayload = await db.createOneGame({
      host: Object.values(game.clients).find(({ host }) => host)?.username,
      name: game.name,
      winner: game.clients[socketId].username,
      language: game.language,
      word_amount: game.wordAmount,
      player_length: Object.keys(game.clients).length,
      timer: time || 0,
    });
    if (!gamePayload) {
      log.error('Game could not be created');
      throw new Error('Game could not be created');
    }

    await Promise.all(Object.values(game.clients)
      // Exclude players that are in staging room and that cannot play
      .filter((aClient) => aClient.status !== 'staging')
      .map(async (aClient) => {
        // Create score
        const score = await db.createOneScore({
          type: Game.MULTI,
          // Normalize score to 1 minute as we're talking about word per minut (mpm/wpm)
          mpm: Math.round(((aClient?.mpm || 0) / time) * 60),
          wrong_words: aClient?.wrongWords,
          correct_letters: aClient?.correctLetters,
          total_letters: aClient?.totalLetters,
          wrong_letters: aClient?.wrongLetters,
          precision: aClient?.precision,
          points: aClient?.points,
          userId: aClient?.userId,
          gameId: gamePayload.id,
          username: aClient?.username,
          language: game?.language,
          timer: time || 0,
        });

        if (!score) {
          log.error('Score could not be created');
          throw new Error('Score could not be created');
        }
        // Create player
        const player = await db.createOnePlayer({
          user_id: aClient?.userId,
          name: aClient?.username,
          game_id: gamePayload.id,
          score_id: score.id,
        });

        if (!player) {
          log.error('Player could not be created');
          throw new Error('Player could not be created');
        }
      }));
    return { message: 'Game created successfully' };
  },
};
