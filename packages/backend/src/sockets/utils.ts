import { Socket } from 'socket.io';

import { SocketChoreEventsEnum } from '@sqrib/shared';
import { IO, ROOM_ID_WHITELIST, SESSIONS } from './socket';
import { getPlayersInRoom, getSessions } from './multiplayer/preGame.handler';

export function isRoomIdValid(roomId: string): boolean {
  return ROOM_ID_WHITELIST.includes(roomId);
}

export function sendRoomNotification(io: IO, sessionId: string, message: string) {
  return io.to(sessionId).emit(SocketChoreEventsEnum.PLAYER_NOTIFICATION, { message });
}

export function sendUserNotification(io: IO, userId: string, message: string) {
  return io.to(userId).emit(SocketChoreEventsEnum.PLAYER_NOTIFICATION, { message });
}

export function onPlayerDisconnection(
  socket: Socket,
  io: IO,
) {
  for (const aSession of Object.values(SESSIONS)) {
    if (aSession?.players?.[socket.id]) {
      // if user is the host, attribute this status to someone else
      if (aSession.players[socket.id]?.isHost && Object.values(aSession.players)?.length > 1) {
        const newHostID = Object.values(aSession.players)?.[1]?.id;
        if (aSession.players[newHostID]) {
          aSession.players[newHostID].isHost = true;
          sendRoomNotification(io, aSession.id, `${aSession.players[newHostID].username} is the new host`);
        }
      }
      delete aSession.players[socket.id];
      // Remove roomID from legit token
      if (Object.values(aSession.players)?.length === 0) {
        const indexOfGameInLegitTokensArray = ROOM_ID_WHITELIST.indexOf(aSession.id);
        ROOM_ID_WHITELIST.splice(indexOfGameInLegitTokensArray, 1);
        // eslint-disable-next-line no-param-reassign
        delete SESSIONS[aSession.id];
        // Clear and delete timer
        // delete TIMERS[aSession.id];
      }
      // Update room player list in live when someone leave the room
      if (SESSIONS[aSession.id]?.players) {
        getSessions(socket, io);
        getPlayersInRoom(socket, io, aSession.id);
      }
    }
  }
}
