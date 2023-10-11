import {
  PlayerSubscribe, PlayerOrSessionStatus, SocketPreGameEventsEnum,
  SessionOptions, SocketChoreEventsEnum, Session,
} from '@sqrib/shared';
import { Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { SESSIONS, ROOM_ID_WHITELIST, IO } from '../socket';
import { basePlayer, toRoomList } from '../mapper';
import { isRoomIdValid, sendRoomNotification } from '../utils';

export function getSessions(_: Socket, io: IO) {
  const roomList = toRoomList(SESSIONS);
  // Update room list
  io.emit(SocketPreGameEventsEnum.GET_SESSION_LIST, { sessions: roomList });
}

export function createSession(
  socket: Socket,
  io: IO,
  data: PlayerSubscribe,
  sessionOptions: SessionOptions,
) {
  // Generate roomId
  const roomId = uuid();
  // Store it in whitelist
  ROOM_ID_WHITELIST.push(roomId);
  socket.join(roomId);
  // create session
  SESSIONS[roomId] = {
    id: roomId,
    status: PlayerOrSessionStatus.STAGING,
    options: {
      language: sessionOptions?.language,
      mode: sessionOptions?.mode,
      name: sessionOptions?.name,
      word_set_id: sessionOptions?.word_set_id,
      wordCount: sessionOptions?.wordCount,
      time: sessionOptions?.time,
    },
    players: {
      [socket.id]: {
        id: socket.id,
        username: data?.username,
        color: data?.color,
        avatar: data?.avatar,
        isAuthenticated: data.isAuthenticated,
        status: PlayerOrSessionStatus.STAGING,
        isHost: true,
        ...basePlayer,
      },
    },
  };

  // Send roomId to the client
  socket.emit(SocketPreGameEventsEnum.CREATE_SESSION, { roomId });
  // Update room list
  return getSessions(socket, io);
}

export function checkSessionIdValidity(socket: Socket, _: IO, roomId: string) {
  socket.emit(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, {
    isValid: isRoomIdValid(roomId),
  });
}

export function getPlayersInRoom(_: Socket, io: IO, roomId: string) {
  // eslint-disable-next-line prefer-destructuring
  const players = SESSIONS[roomId]?.players ?? {};
  io.to(roomId).emit(SocketPreGameEventsEnum.GET_PLAYERS, {
    players: Object.values(players),
  });
}

export function joinSession(socket: Socket, io: IO, roomId: string, data: PlayerSubscribe) {
  if (!isRoomIdValid(roomId)) {
    return socket.emit(SocketChoreEventsEnum.ERROR, { message: 'Room not found' });
  }
  socket.join(roomId);
  SESSIONS[roomId] = {
    ...SESSIONS[roomId],
    players: {
      ...SESSIONS[roomId]?.players,
      [socket.id]: {
        id: socket.id,
        username: data.username,
        isHost: false,
        color: data.color,
        avatar: data.avatar,
        isAuthenticated: data.isAuthenticated,
        status: PlayerOrSessionStatus.STAGING,
        ...basePlayer,
      },
    },
  };
  getPlayersInRoom(socket, io, roomId);
  getSessions(socket, io);
  sendRoomNotification(io, roomId, `${data.username} has joined the room`);
  return socket.emit(SocketPreGameEventsEnum.JOIN_SESSION);
}

export function getSessionInfo(socket: Socket, _: IO, sessionId: string) {
  const session = SESSIONS[sessionId];
  const sessionInfo: Session = session;
  socket.emit(SocketPreGameEventsEnum.GET_SESSION_INFO, sessionInfo);
}

export function startSession(socket: Socket, io: IO, roomId: string) {
  SESSIONS[roomId].status = PlayerOrSessionStatus.PLAYING;
  io.to(roomId).emit(SocketPreGameEventsEnum.START_SESSION);
  getSessions(socket, io);
  getPlayersInRoom(socket, io, roomId);
  sendRoomNotification(io, roomId, 'The game has started');
}

export function leaveSession(socket: Socket, io: IO, roomId: string) {
  const currentSession = SESSIONS[roomId];

  // TODO: Set this block in a function
  if (currentSession?.players?.[socket.id]) {
    // if user is the host, attribute this status to someone else
    if (currentSession.players[socket.id]?.isHost
      && Object.values(currentSession.players)?.length > 1) {
      const newHostID = Object.values(currentSession.players)?.[1]?.id;
      if (currentSession.players[newHostID]) {
        currentSession.players[newHostID].isHost = true;
        sendRoomNotification(io, currentSession.id, `${currentSession.players[newHostID].username} is the new host`);
      }
    }
    delete currentSession.players[socket.id];
    socket.leave(roomId);

    // Remove roomID from legit token
    if (Object.values(currentSession.players)?.length === 0) {
      const indexOfGameInLegitTokensArray = ROOM_ID_WHITELIST.indexOf(currentSession.id);
      ROOM_ID_WHITELIST.splice(indexOfGameInLegitTokensArray, 1);
      delete SESSIONS[currentSession.id];
      // Clear and delete timer
      // delete TIMERS[currentSession.id];
    }
    // Update room player list in live when someone leave the room
    if (SESSIONS[currentSession.id]?.players) {
      getSessions(socket, io);
      getPlayersInRoom(socket, io, currentSession.id);
    }
  }
  // TODO: END - Set this block in a function

  getSessions(socket, io);
  getPlayersInRoom(socket, io, roomId);
  sendRoomNotification(io, roomId, 'A user has left the room');
}
