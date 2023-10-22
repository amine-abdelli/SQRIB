import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { log, Session } from '@sqrib/shared';
import { multiplayerListener } from './multiplayer/multiplayer.listener';
import { onPlayerDisconnection } from './utils';

export type IO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export const SESSIONS: Record<string, Session> = {};
export const LEGIT_ROOMID: string[] = [];
export const ROOM_ID_WHITELIST: string[] = [];

export function handleSocketConnection(
  socket: Socket,
  io: IO,
) {
  log.info(`${socket.id} connected !`);
  multiplayerListener(socket, io);
  socket.on('disconnect', () => {
    log.info(`${socket.id} disconnected !`);
    onPlayerDisconnection(socket, io);
  });
}
