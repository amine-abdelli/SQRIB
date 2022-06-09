import io, { Socket } from 'socket.io-client';

const ENDPOINT = process.env.SOCKET_URL || '';
const socket = io(ENDPOINT, {
  transports: ['websocket'],
  autoConnect: false,
});

const autoConnectSocket = io(ENDPOINT, {
  transports: ['websocket'],
  autoConnect: false,
});

function socketConnect(socketRef: Socket) {
  socketRef.connect();
}
function socketDisconnect(socketRef: Socket) {
  socketRef.connect();
}
export {
  socketConnect, socket, autoConnectSocket, socketDisconnect,
};
