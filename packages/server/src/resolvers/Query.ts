import { authGuard } from '../utils';
import { self } from './authentication/self.query';
import { findScores } from './scoring/findScores.query';
import { findOneSet } from './didacticiel/findOneSet.query';

export default {
  self: authGuard(self),
  findScores: authGuard(findScores),
  findOneSet,
};
