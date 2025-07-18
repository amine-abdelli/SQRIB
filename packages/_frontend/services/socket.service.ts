import io, { Socket } from 'socket.io-client';

const ENDPOINT = process.env.SOCKET_URL || 'http://localhost:4000';
const socket = io(ENDPOINT, {
  transports: ['websocket'],
  autoConnect: false,
});

function socketConnect(socketRef: Socket) {
  socketRef.connect();
}
function socketDisconnect(socketRef: Socket) {
  socketRef.disconnect();
}
export {
  socketConnect, socket, socketDisconnect,
};
