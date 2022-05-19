import { log } from '@aqac/utils';
import { loginService } from '../../services/auth/login.service';
import { Context } from '../../utils/context.utils';

interface LoginArgs {
  email: string,
  password: string,
}

async function login(parent: any, { email, password }: LoginArgs, context: Context) {
  log.info('Trying to authenticate', { email });
  const user = await loginService(email, password, context);
  log.info('Authentication success', { email });
  return user;
}

export { login };
