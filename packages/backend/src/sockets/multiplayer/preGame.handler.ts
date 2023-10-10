import {
  PlayerSubscribe, PlayerOrSessionStatus, SocketPreGameEventsEnum,
  SessionOptions, SocketChoreEventsEnum, GetSessionInfo,
} from '@sqrib/shared';
import { Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { SESSIONS, ROOM_ID_WHITELIST, IO } from '../socket';
import { basePlayer, toRoomList } from '../mapper';
import { isRoomIdValid, sendRoomNotification } from '../utils';

export function getSessions(_: Socket, io: IO) {
  const roomList = toRoomList(SESSIONS);
  // Update room list
  io.emit(SocketPreGameEventsEnum.GET_SESSIONS, { sessions: roomList });
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

export function getRoomInfo(_: Socket, io: IO, roomId: string) {
  const session = SESSIONS[roomId];
  const roomInfo: GetSessionInfo = { options: session.options, status: session.status };
  io.to(roomId).emit(SocketPreGameEventsEnum.GET_ROOM_INFO, roomInfo);
}

export function startSession(socket: Socket, io: IO, roomId: string) {
  SESSIONS[roomId].status = PlayerOrSessionStatus.PLAYING;
  io.to(roomId).emit(SocketPreGameEventsEnum.START_SESSION);
  getSessions(socket, io);
  getPlayersInRoom(socket, io, roomId);
  sendRoomNotification(io, roomId, 'The game has started');
}
