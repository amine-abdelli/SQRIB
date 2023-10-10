/* eslint-disable max-len */
import { Socket } from 'socket.io';
import { SocketPreGameEventsEnum } from '@sqrib/shared';
import {
  checkSessionIdValidity,
  createSession, getPlayersInRoom, getRoomInfo, getSessions, joinSession, startSession,
} from './preGame.handler';
import { IO } from '../socket';

const preGameEventsMap: Record<Partial<SocketPreGameEventsEnum>, (socket: Socket, io: IO, data?: any, _data?: any, __data?: any) => void> = {
  [SocketPreGameEventsEnum.CREATE_SESSION]: createSession,
  [SocketPreGameEventsEnum.JOIN_SESSION]: joinSession,
  [SocketPreGameEventsEnum.GET_SESSIONS]: getSessions,
  [SocketPreGameEventsEnum.GET_PLAYERS]: getPlayersInRoom,
  [SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY]: checkSessionIdValidity,
  [SocketPreGameEventsEnum.GET_ROOM_INFO]: getRoomInfo,
  [SocketPreGameEventsEnum.START_SESSION]: startSession,
};

export function multiplayerListener(socket: Socket, io: IO) {
  Object.keys(preGameEventsMap).forEach((event) => {
    const eventName = event as SocketPreGameEventsEnum;
    socket.on(event, (data, _data, __data) => preGameEventsMap[eventName](socket, io, data, _data, __data));
  });
}
