import io, { Socket } from 'socket.io-client';

const ENDPOINT = process.env.SOCKET_URL || '';
const socket = io(ENDPOINT, {
  transports: ['polling'],
  autoConnect: false,
  path: '/socket',
});

const autoConnectSocket = io(ENDPOINT, {
  transports: ['polling'],
  autoConnect: false,
  path: '/socket',
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
