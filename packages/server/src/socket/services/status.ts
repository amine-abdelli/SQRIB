import { GameType } from '@sqrib/utils';
import { Socket } from 'socket.io';

/**
 * Emit to the room the current game status
 * @param games Global Games object
 * @param roomID string
 * @param io io
 */
export function emitGameStatus(
  games: Record<string, GameType>,
  roomID: string,
  io: Socket,
) {
  return io.to(roomID).emit('game-status', { status: games[roomID].status });
}
