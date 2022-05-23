import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-errors';
import { log } from '@aqac/utils';
import { createSettings } from '../../repositories/settings/createSettings';
import { COOKIE_SETTINGS, formatEmail, createToken } from '../../utils/auth.utils';
import { Context } from '../../utils/context.utils';
import { createOneUser, ICreateUserArgs } from '../../repositories';

export async function signupService(args: ICreateUserArgs, context: Context) {
  try {
    const password = await bcrypt.hash(args?.password, 10);
    const user = await createOneUser({
      email: formatEmail(args?.email),
      password,
      nickname: args?.nickname,
    });

    const settings = await createSettings(user?.id);
    if (!settings) {
      log.error('Settings could not be created', { settings });
      throw new AuthenticationError('Settings could not be created');
    }
    const token = createToken(user);
    context.res.cookie('session_id', token, COOKIE_SETTINGS);
    return {
      user,
    };
  } catch (error) {
    log.error('Error while signing up', { error });
    throw new AuthenticationError('Error while signing up', { error });
  }
}
