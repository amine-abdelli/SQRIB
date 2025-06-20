// import { Game, GameType } from '../constants';
// import { ScoreType } from '../type';

import { Game, GameType, scoringObjectType } from '../constants';

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

// Check if a score is from a multiplayer game
export function isMulti(score: scoringObjectType | any) {
  return score.type === Game.MULTI;
}

// Check if a score is from a solo game
export function isSolo(score: any | any) {
  return score.type === Game.SOLO;
}
