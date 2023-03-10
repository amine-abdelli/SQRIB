import io, { Socket } from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const socket = io(ENDPOINT, {
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
