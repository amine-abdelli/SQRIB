import { log } from '@sqrib/utils';
import { signupService } from '../../services/auth/signup.service';
import { ICreateUserArgs } from '../../repositories';
import { Context } from '../../utils/context.utils';

export async function signup(parent: any, args: ICreateUserArgs, context: Context) {
  log.info('Trying to signup', { email: args?.email });
  const user = await signupService(args, context);
  log.info('Signup success', { email: args?.email });
  return user;
}
