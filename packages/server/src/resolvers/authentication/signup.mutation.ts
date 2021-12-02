import { signupService } from '../../services/auth/signup.service';
import { ICreateUserArgs } from '../../repositories';
import { Context } from '../../utils/context';

export async function signup(parent: any, args: ICreateUserArgs, context: Context) {
  console.log('Trying to signup', { email: args?.email });
  const user = await signupService(args, context);
  console.log('Signup success', { email: args?.email });
  return user;
}
