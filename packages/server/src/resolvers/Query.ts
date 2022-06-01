import { authGuard } from '../utils';
import { self } from './authentication/self.query';
import { findScores, findGameData } from './scoring';
import { findOneSet } from './didacticiel/findOneSet.query';

export default {
  self: authGuard(self),
  findScores: authGuard(findScores),
  findGameData,
  findOneSet,
};
