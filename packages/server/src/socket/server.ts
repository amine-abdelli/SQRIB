import {
  GameType, hasEveryPlayerEnded, log, SetType,
  GameStatus,
} from '@sqrib/utils';
import { Socket } from 'socket.io';
import { v4 } from 'uuid';
import { Services } from './services/services';
import { emitGameStatus } from './services/status';

export function initializeSocket(io: Socket) {
  /* Global Games & Sets objects */
  let GAMES: Record<string, GameType> = {};
  let SETS: Record<string, SetType> = {};
  const LEGIT_TOKENS: string[] = [];
  io.on('connection', (socket: Socket) => {
    /**
     * Remove user from global object
     */
    socket.on('disconnect', () => {
      try {
        log.info(`${socket.id} disconnected`);
        GAMES = Services.disconnect(GAMES, LEGIT_TOKENS, socket, io);
        Services.emitRoomList(io, GAMES);
      } catch (err) {
        log.error({ error: err }, 'Socket: An error occured while disconnecting');
      }
    });

    /**
     * Update user's progression and handle users win
     */
    socket.on('progression', async ({ roomID, wordIndex, scoringObject }) => {
      try {
        if (GAMES[roomID]?.status !== GameStatus.STAGING) {
          GAMES = Services.progression(GAMES, roomID, wordIndex, socket, scoringObject);
          io.to(roomID).emit('progression', { game: GAMES[roomID] });
        }
        /**
       * If every player has ended the game, timer stops and the game status change to 'finished'.
       * Users wordIndexes are set back to 0 et and a new set of words is generated.
       * after 5 seconds, the game status change to 'playing' and
       * users are allow to play again
       */
        if (hasEveryPlayerEnded(GAMES[roomID]) && GAMES[roomID]?.status === GameStatus.PLAYING) {
          const savedGame = await Services.saveGame(GAMES[roomID], roomID);
          Services.stopTimer(roomID);

          if (savedGame.message) {
            const scores = await Services.getScoresData();
            io.emit('get-global-game-data', scores);
          }
          GAMES = Services.updateGameStatus(GameStatus.FINISHED, GAMES, roomID);

          const { updatedSetObject, updatedGameObject } = Services
            .onWin(GAMES, SETS, roomID, io);

          let counter = 6;
          const timer = setInterval(() => {
            counter -= 1;
            io.to(roomID).emit('counter', { counter });
            if (counter === -2) {
              clearInterval(timer);
              SETS = updatedSetObject;
              const transitionalObject = Services
                .updatePlayersStatus(GameStatus.PLAYING, updatedGameObject, roomID);
              GAMES = Services.updateGameStatus(GameStatus.PLAYING, transitionalObject, roomID);
              emitGameStatus(GAMES, roomID, io);
              io.to(roomID).emit('on-win', { game: GAMES[roomID] });
              Services.startTimer(roomID, io);
              counter = 6;
            }
          }, 1000);
        }
      } catch (err) {
        log.error({ error: err }, 'An error occured in game progression');
      }
    });

    /**
     *  Join or create a room depending on if the room exists or not
     *  When a use click on create room, an id is generated and stored in
     *  a legit token array. This id is used to redirect the user to the room
     *  with a param 'created' set to true via url. If the param 'created' is
     *  true then we automatically create a room with the id.
     *
     *  Otherwise we join the room.
     *
     *  A check is always made to see if the room id provided is legit to be used to
     *  create or join
     */
    socket.on('join-room', ({
      roomID, username, userId, gameParameters, isCreating,
    }) => {
      try {
        const isLegit = LEGIT_TOKENS.includes(roomID);
        // eslint-disable-next-line max-len
        // If the room exists, the user is not already in the room and the roomID is legit, join it !
        if (!isCreating && GAMES[roomID] && isLegit && !GAMES[roomID]?.clients[socket.id]) {
          log.info('Trying to join a room', { roomID, username });
          GAMES = Services.joinRoom(GAMES, roomID, username, userId, socket);
          // Join room -> RoomID
          socket.join(roomID);
          io.to(roomID).emit('greet', {
            playerID: socket.id,
            playerName: username,
          });
          // Everytime a user join or create a room, we emit the room list to update the room table
          Services.emitRoomList(io, GAMES);
          // If room doesn't exist and the roomID is legit, create it !
        } else if (isCreating && !GAMES[roomID] && isLegit) {
          log.info('Trying to create a room', { roomID, username });
          const { updatedGameObject, updatedSetObject } = Services
            .createRoom(GAMES, roomID, gameParameters, SETS, username, userId, socket);
          GAMES = updatedGameObject;
          SETS = updatedSetObject;
          socket.join(roomID);
        }

        // Send current game data to the room
        io.to(roomID).emit('join-room', {
          roomID,
          wordSet: SETS[GAMES[roomID]?.setID],
          game: GAMES[roomID],
          isLegit,
        });
        // Everytime a user join or create a room, we emit the room list to update the room table
        Services.emitRoomList(io, GAMES);
      } catch (err) {
        log.error({ error: err }, 'An error occured while joining the room');
      }
    });

    /**
     * Send the list of rooms with their details
     */
    socket.on('room-list', async () => {
      try {
        log.info('Requesting room list');
        const roomList = Services.roomList(GAMES);
        io.emit('room-list', roomList);
      } catch (err) {
        log.error({ error: err }, 'An error occured while querying the room list');
      }
    });

    /**
     * Generate a room id and store it in the LEGIT_TOKENS array
     * This allow us to check if the user creating a room via its url is
     * legit to perform this action or not. If the roomID is not in the LEGIT_TOKENS array
     * the user won't be allow to join or create a room.
     */
    socket.on('generate-room-id', () => {
      try {
        log.info('Generating room id');
        const decodedRoomID = v4();
        const buff = Buffer.from(`${decodedRoomID}?create=true`);
        const base64token = buff.toString('base64');
        LEGIT_TOKENS.push(decodedRoomID);
        io.to(socket.id).emit('generate-room-id', { roomID: base64token });
      } catch (err) {
        log.error({ error: err }, 'An error occured while generating a room id');
      }
    });

    /**
     * On click on the 'start' button, the game and players status change to 'playing'
     * and the game start. We also update the new game parameters selected by the creator.
     */
    socket.on('start-game', ({ roomID, gameParameters }) => {
      try {
        log.info(`${socket.id} is starting the game`, { roomID });
        const { updatedGameObject, updatedSetObject } = Services.updateRoomWithNewParameters(
          GAMES,
          roomID,
          gameParameters,
          SETS,
        );
        GAMES = Services.updateGameStatus(GameStatus.PLAYING, updatedGameObject, roomID);
        SETS = updatedSetObject;

        // Update words stack with new parameters
        io.to(roomID).emit('join-room', {
          roomID,
          wordSet: SETS[GAMES[roomID]?.setID],
          game: GAMES[roomID],
        });

        // Update game status to the client to close creation room modal
        io.to(roomID).emit('start-game', { game: GAMES[roomID] });

        // 3, 2, 1, GO ! at first start
        let counter = 4;
        const timer = setInterval(() => {
          counter -= 1;
          io.to(roomID).emit('counter', { counter, isFirstCounter: true });
          if (counter === -2) {
            clearInterval(timer);
            GAMES = Services.updatePlayersStatus(GameStatus.PLAYING, GAMES, roomID);
            // Send the updated game to the client with latest game data
            io.to(roomID).emit('start-game', { game: GAMES[roomID] });
            // start timer
            Services.startTimer(roomID, io);
          }
        }, 1000);
      } catch (err) {
        log.error({ error: err }, 'An error occured trying to start a game');
      }
    });

    /**
     * Fetch and format scores related data
     */
    socket.on('get-global-game-data', async () => {
      try {
        log.info('Fetching scores data');
        const scores = await Services.getScoresData();
        io.emit('get-global-game-data', scores);
      } catch (err) {
        log.error({ error: err }, 'An error occured while fetching global game data');
      }
    });
    /**
     * Update leader board on save
     */
    socket.on('update-leader-board', async () => {
      try {
        const scores = await Services.getScoresData();
        io.emit('get-global-game-data', scores);
      } catch (err) {
        log.error({ error: err }, 'An error occured while updating the leaderboard');
      }
    });
  });
}
