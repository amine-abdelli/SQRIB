import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:4001';

const socket = io(ENDPOINT, {
  transports: ['websocket'],
  autoConnect: false,
  withCredentials: true,
});

export const SocketContext = createContext<{socket: Socket}>({} as any);

export { socket };
