import { Socket } from 'socket.io';
import { getMessageEvent } from './notification.events';

export const notificationController = (socket: Socket) => {
  socket.on('message', getMessageEvent);
};
