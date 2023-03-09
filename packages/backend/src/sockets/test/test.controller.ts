import { Socket } from 'socket.io';
import { messageTest } from './test.events';

export const testController = (socket: Socket) => {
  socket.on('message', (message) => messageTest(message, socket));
};
