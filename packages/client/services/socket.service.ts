import io, { Socket } from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:4001';
const socket = io(ENDPOINT, {
  transports: ['websocket'],
  autoConnect: false,
  auth: {
    username: '',
  },
  query: {
    'my-key': 'my-value',
  },
});

function socketConnect(socketRef: Socket) {
  socketRef.connect();
}
function socketDisconnect(socketRef: Socket) {
  socketRef.connect();
}
export { socketConnect, socket, socketDisconnect };
