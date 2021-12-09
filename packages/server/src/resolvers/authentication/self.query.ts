import { selfService } from '../../services/auth/self.service';
import { Context } from '../../utils/context.utils';

async function self(
  parent: any,
  args: void,
  ctx: Context,
) {
  console.log('Trying to fetch self data !');
  const user = await selfService(ctx);
  return user;
}

export { self };
