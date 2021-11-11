import { createOneUser, ICreateUserArgs } from "../../repositories";
import bcrypt from 'bcryptjs';
import { COOKIE_SETTINGS, createToken, formatEmail } from "../../helpers/auth.utils";
import { Context } from '../../helpers/context';

export async function signup (parent: any, args: ICreateUserArgs, context: Context) {
  console.log('Trying to signup', { email: args?.email });
  const password = await bcrypt.hash(args?.password, 10);
  const user = await createOneUser({ email: formatEmail(args?.email), password });
  const token = createToken(user);
  context.res.cookie('session_id', token, COOKIE_SETTINGS);
  console.log('Signup success',  args?.email );
  return { 
    user
  };
}