import { authGuard } from '../utils';
import { self } from './authentication';
import { findScores, findGameData } from './scoring';
import { fetchUserGamingDetails } from './game';
import { findOneSet } from './didacticiel';

export default {
  self: authGuard(self),
  findScores: authGuard(findScores),
  fetchUserGamingDetails,
  findGameData,
  findOneSet,
};
