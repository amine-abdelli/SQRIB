import { GameType } from '../constants';

/**
 * Sort winners by their scores
 * @param game Current game
 * @returns the winner's stats
 */
export function createPodium(game: GameType) {
  const gameObj = Object.values(game?.clients).sort((a, b) => {
    if (b.mpm === a.mpm) {
      return b.precision - a.precision;
    }
    return b.mpm - a.mpm;
  });
  return { podium: gameObj };
}
