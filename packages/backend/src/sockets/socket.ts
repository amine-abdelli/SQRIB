import { log } from '@sqrib/shared';
import { Socket } from 'socket.io';
import { multiplayerListener } from './multiplayer/multiplayer.listener';

export function handleSocketConnection(socket: Socket) {
  log.info(`${socket.id} connected !`);
  multiplayerListener(socket);
  socket.on('disconnect', () => log.info(`${socket.id} disconnected !`));
}
