import { Socket } from 'socket.io';
import { MultiplayerSocketEventsListenerEnum } from '@sqrib/shared';
import { sendMessageOne } from './multiplayer.handler';

const eventsMap: Record<Partial<MultiplayerSocketEventsListenerEnum>, (socket: Socket, data: any
) => void> = {
  [MultiplayerSocketEventsListenerEnum.MESSAGE_ONE]: sendMessageOne,
};

export function multiplayerListener(socket: Socket) {
  Object.keys(eventsMap).forEach((event) => {
    const eventName = event as MultiplayerSocketEventsListenerEnum;
    socket.on(event, (data) => eventsMap[eventName](socket, data));
  });
}
