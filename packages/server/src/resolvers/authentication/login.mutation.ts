import { loginService } from '../../services/auth/login.service';
import { Context } from '../../utils/context.utils';

interface LoginArgs {
  email: string,
  password: string,
}

async function login(parent: any, { email, password }: LoginArgs, context: Context) {
  try {
    console.log('Trying to authenticate', { email });
    const user = await loginService(email, password, context);
    console.info('Authentication success', { email });
    return user;
  } catch (e: any) {
    console.error('Authentication error', { email, error: e.message });
    throw e;
  }
}

export { login };
