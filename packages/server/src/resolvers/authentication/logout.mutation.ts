import { logoutService } from '../../services/auth/logout.service';
import { Context } from '../../utils/context';

async function logout(parent: any, args: void, context: Context) {
  console.log('Trying to logout');
  await logoutService(context);
  console.info('Logout success');
}

export { logout };
