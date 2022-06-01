import { authGuard } from '../utils';
import { signup } from './authentication/signup.mutation';
import { login } from './authentication/login.mutation';
import { logout } from './authentication/logout.mutation';
import { deleteUser } from './authentication/deleteUser.mutation';
import { addScoring } from './scoring/addScoring.mutation';
import { createOneSet } from './didacticiel/createOneSet.mutation';
import { updateLevel } from './didacticiel/updateLevel.mutation';
import { createAllSets } from './didacticiel/createAllSets.mutation';
import { updateSettings } from './settings/updateSettings.mutation';
import { updateNickname } from './settings/updateNickname.mutation';
import { updatePassword } from './authentication/updatePassword.mutation';
import { addGameDetails } from './game/addGameDetails.mutation';

export default {
  signup,
  login,
  logout: authGuard(logout),
  deleteUser: authGuard(deleteUser),
  addScoring: authGuard(addScoring),
  createOneSet,
  updateLevel: authGuard(updateLevel),
  createAllSets,
  updateSettings: authGuard(updateSettings),
  updateNickname: authGuard(updateNickname),
  updatePassword: authGuard(updatePassword),
  addGameDetails,
};
