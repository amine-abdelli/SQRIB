import { ROUTES } from '@sqrib/shared';
import AuthRouter from './auth.router';
import SettingsRouter from './settings.router';
import UserRouter from './user.router';
import GameRouter from './game.router';

export default [
  { route: ROUTES.auth, router: AuthRouter },
  { route: ROUTES.user, router: UserRouter },
  { route: ROUTES.settings, router: SettingsRouter },
  { route: ROUTES.game, router: GameRouter },
];
