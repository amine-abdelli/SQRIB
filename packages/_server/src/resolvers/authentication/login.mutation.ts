import { log } from '@sqrib/utils';
import { loginService } from '../../services/auth/login.service';
import { Context } from '../../utils/context.utils';

interface LoginArgs {
  email: string,
  password: string,
}

async function login(parent: any, { email, password }: LoginArgs, context: Context) {
  log.info({ email }, 'Trying to authenticate');
  const user = await loginService(email, password, context);
  log.info({ email }, 'Authentication success');
  return user;
}

export { login };
