import { Socket } from 'socket.io';

export function messageTest(message: string, socket: Socket) {
  socket.emit('response', 'Socket server in good shape !');
  console.log('Received message : ', message);
}
