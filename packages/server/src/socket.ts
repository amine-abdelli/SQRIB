import { Server } from 'socket.io';

export default (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  return io;
};
