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

function handlePlayerLeave(socket: Socket, io: IO, roomId: string) {
  const currentSession = SESSIONS[roomId];

  // TODO: Set this block in a function
  if (currentSession?.players?.[socket.id]) {
    // if user is the host, attribute this status to someone else
    if (currentSession.players[socket.id]?.isHost
      && Object.values(currentSession.players)?.length > 1) {
      const newHostID = Object.values(currentSession.players)?.[1]?.id;
      if (currentSession.players[newHostID]) {
        currentSession.players[newHostID].isHost = true;
        sendRoomNotification(io, currentSession.id, `${currentSession.players[newHostID].username} is the new host`);
      }
    }
    delete currentSession.players[socket.id];
    socket.leave(roomId);

    // Remove roomID from legit token
    if (Object.values(currentSession.players)?.length === 0) {
      const indexOfGameInLegitTokensArray = ROOM_ID_WHITELIST.indexOf(currentSession.id);
      ROOM_ID_WHITELIST.splice(indexOfGameInLegitTokensArray, 1);
      delete SESSIONS[currentSession.id];
      // Clear and delete timer
      // delete TIMERS[currentSession.id];
    }

    getSessions(socket, io);
    getPlayersInRoom(socket, io, currentSession.id);
  }
}

export function onPlayerDisconnection(
  socket: Socket,
  io: IO,
) {
  for (const aSession of Object.values(SESSIONS)) {
    handlePlayerLeave(socket, io, aSession.id);
  }
}
