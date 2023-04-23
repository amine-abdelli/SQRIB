import io, { Socket } from 'socket.io-client';
import { BACKEND_URL } from './config-global';

const socket = io(BACKEND_URL, {
  transports: ['websocket'],
  autoConnect: true,
});

function socketConnect(socketRef: Socket) {
  socketRef.connect();
}
function socketDisconnect(socketRef: Socket) {
  socketRef.disconnect();
}
export {
  socketConnect,
  socket,
  socketDisconnect,
};
