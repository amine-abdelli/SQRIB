import { MultiplayerSocketEventsListenerEnum } from '@sqrib/shared';
import { Socket } from 'socket.io';

export function sendMessageOne(socket: Socket, data: any) {
  console.log('FROM MESSAGE ONE :', data);
  socket.emit(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, 'This is message one !');
}
