import { randomSetService } from '../../services/sets/randomSet.service';
import { loginService } from '../../services/auth/login.service';
import { Context } from '../../utils/context';

interface LoginArgs {
  email: string,
  password: string,
}

async function login(parent: any, { email, password }: LoginArgs, context: Context) {
  try {
    console.log('Trying to authenticate', { email });
    console.log('OUAIS OUAIS', await randomSetService());
    const user = await loginService(email, password, context);
    console.info('Authentication success', { email });
    return user;
  } catch (e: any) {
    console.error('Authentication error', { email, error: e.message });
    throw e;
  }
}

export { login };
