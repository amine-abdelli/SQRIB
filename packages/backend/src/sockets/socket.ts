import { notificationController } from './notification/notification.controller';

// Define a controller function
export function handleSocketConnection(socket: any) {
  console.log('A new user just connected !');
  notificationController(socket);
  socket.on('disconnect', () => console.log('user disconnected'));
}
