/* eslint-disable max-len */
import { Socket } from 'socket.io';
import { SocketCommonEventsEnum, SocketInGameEventsEnum, SocketPreGameEventsEnum } from '@sqrib/shared';
import {
  checkSessionIdValidity,
  createSession, getPlayersInRoom, getSessionInfo, getSessions, joinSession, leaveSession, startSession,
} from './preGame.handler';
import { IO } from '../socket';
import { emitSessionProgression, updatePlayerProgress } from './inGame.handler';
import { launchTimer, clearTimer } from './common.handler';

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

const inGameEventsMap: Partial<Record<SocketInGameEventsEnum, (socket: Socket, io: IO, data?: any, _data?: any, __data?: any) => void>> = {
  [SocketInGameEventsEnum.SESSION_PROGRESSION]: emitSessionProgression,
  [SocketInGameEventsEnum.UPDATE_PLAYER_PROGRESS]: updatePlayerProgress,
};

const CommonEventsMap: Record<Partial<SocketCommonEventsEnum>, (socket: Socket, io: IO, data?: any, _data?: any, __data?: any) => void> = {
  [SocketCommonEventsEnum.LAUNCH_TIMER]: launchTimer,
  [SocketCommonEventsEnum.STOP_TIMER]: clearTimer,
};

export function multiplayerListener(socket: Socket, io: IO) {
  Object.keys(preGameEventsMap).forEach((event) => {
    const eventName = event as SocketPreGameEventsEnum;
    socket.on(event, (data, _data, __data) => preGameEventsMap[eventName](socket, io, data, _data, __data));
  });
  Object.keys(inGameEventsMap).forEach((event) => {
    const eventName = event as SocketInGameEventsEnum;
    const handler = inGameEventsMap[eventName];
    if (handler) socket.on(event, (data, _data, __data) => handler(socket, io, data, _data, __data));
  });
  Object.keys(CommonEventsMap).forEach((event) => {
    const eventName = event as SocketCommonEventsEnum;
    socket.on(event, (data, _data, __data) => CommonEventsMap[eventName](socket, io, data, _data, __data));
  });
}
