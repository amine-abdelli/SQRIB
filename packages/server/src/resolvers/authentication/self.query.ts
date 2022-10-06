import { log } from '@sqrib/utils';
import { AuthenticationError } from 'apollo-server-errors';
import { selfService } from '../../services/auth/self.service';
import { Context } from '../../utils/context.utils';

async function self(
  parent: any,
  args: void,
  ctx: Context,
) {
  log.info('Trying to fetch self data !');
  const user = await selfService(ctx);
  if (!user) {
    log.error('User not found');
    throw new AuthenticationError('User not found');
  }
  return user;
}

export { self };
