import { GameType } from '@aqac/utils';

/**
 * Emit to the room the current game status
 * @param games Global Games object
 * @param roomID string
 * @param io io
 */
export function emitGameStatus(games: Record<string, GameType>, roomID: string, io: any) {
  return io.to(roomID).emit('game-status', { status: games[roomID].status });
}
