import { log } from '@sqrib/utils';
import { signupService } from '../../services/auth/signup.service';
import { ICreateUserArgs } from '../../repositories';
import { Context } from '../../utils/context.utils';

export async function signup(parent: any, args: ICreateUserArgs, context: Context) {
  log.info({ email: args?.email }, 'Trying to signup');
  const user = await signupService(args, context);
  log.info({ email: args?.email }, 'Signup success');
  return user;
}
