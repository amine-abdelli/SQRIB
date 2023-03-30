import { log } from '@sqrib/shared';
import { Socket } from 'socket.io';
import { testController } from './test';

export function handleSocketConnection(socket: Socket) {
  log.info(`${socket.id} connected !`);
  testController(socket);
  socket.on('disconnect', () => log.info(`${socket.id} disconnected !`));
}
