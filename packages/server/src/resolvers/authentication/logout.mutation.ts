import { log } from '@sqrib/utils';
import { logoutService } from '../../services/auth/logout.service';
import { Context } from '../../utils/context.utils';

async function logout(parent: any, args: void, context: Context) {
  log.info({ userId: context.userId }, 'Trying to logout');
  await logoutService(context);
  log.info({ userId: context.userId }, 'Logout success');
}

export { logout };
