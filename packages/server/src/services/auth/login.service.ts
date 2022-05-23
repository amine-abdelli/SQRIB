import { AuthenticationError } from 'apollo-server-errors';
import { log } from '@aqac/utils';
import { updateOneUserById } from '../../repositories/auth';
import { Context } from '../../utils/context.utils';
import {
  createToken, COOKIE_SETTINGS, formatEmail, authenticateUser,
} from '../../utils/auth.utils';

export async function loginService(email: string, password: string, context: Context) {
  try {
    const user = await authenticateUser({
      email: formatEmail(email),
      password,
    }, context);
    const token = createToken(user);
    context.res.cookie('session_id', token, COOKIE_SETTINGS);
    await updateOneUserById({
      id: user.id,
      data: {
        last_activity: new Date().toISOString(), is_active: true,
      },
    }, context.prisma);
    return {
      user,
    };
  } catch (error) {
    log.error('Error while logging in', { error });
    throw new AuthenticationError('Error while logging in', { error });
  }
}
