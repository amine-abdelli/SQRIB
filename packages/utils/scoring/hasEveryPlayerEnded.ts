import { GameType, GameStatus } from '../constants';

/**
 * Check if every players has reached the end of the game
 * @param game GameType
 * @returns true if every player has reached the end of the game
 */
export function hasEveryPlayerEnded(game: GameType) {
  const players = Object.values(game?.clients)
    .filter((p) => p.status === GameStatus.PLAYING);
  return players.every((p) => p.wordIndex === game.wordAmount);
}
