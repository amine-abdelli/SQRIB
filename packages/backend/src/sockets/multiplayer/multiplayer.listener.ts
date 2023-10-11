/* eslint-disable max-len */
import { Socket } from 'socket.io';
import { SocketPreGameEventsEnum } from '@sqrib/shared';
import {
  checkSessionIdValidity,
  createSession, getPlayersInRoom, getSessionInfo, getSessions, joinSession, leaveSession, startSession,
} from './preGame.handler';
import { IO } from '../socket';

const preGameEventsMap: Record<Partial<SocketPreGameEventsEnum>, (socket: Socket, io: IO, data?: any, _data?: any, __data?: any) => void> = {
  [SocketPreGameEventsEnum.CREATE_SESSION]: createSession,
  [SocketPreGameEventsEnum.JOIN_SESSION]: joinSession,
  [SocketPreGameEventsEnum.GET_SESSION_LIST]: getSessions,
  [SocketPreGameEventsEnum.GET_PLAYERS]: getPlayersInRoom,
  [SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY]: checkSessionIdValidity,
  [SocketPreGameEventsEnum.GET_SESSION_INFO]: getSessionInfo,
  [SocketPreGameEventsEnum.START_SESSION]: startSession,
  [SocketPreGameEventsEnum.LEAVE_SESSION]: leaveSession,
};

export function multiplayerListener(socket: Socket, io: IO) {
  Object.keys(preGameEventsMap).forEach((event) => {
    const eventName = event as SocketPreGameEventsEnum;
    socket.on(event, (data, _data, __data) => preGameEventsMap[eventName](socket, io, data, _data, __data));
  });
}
