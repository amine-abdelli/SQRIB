import bcrypt from 'bcryptjs';
import { COOKIE_SETTINGS, formatEmail, createToken } from '../../utils/auth.utils';
import { Context } from '../../utils/context.utils';
import { createOneUser, ICreateUserArgs } from '../../repositories';

export async function signupService(args: ICreateUserArgs, context: Context) {
  const password = await bcrypt.hash(args?.password, 10);
  const user = await createOneUser({ email: formatEmail(args?.email), password });
  const token = createToken(user);
  context.res.cookie('session_id', token, COOKIE_SETTINGS);
  return {
    user,
  };
}
