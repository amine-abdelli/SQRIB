import { updateOneUserById } from '../../repositories/auth';
import { Context } from '../../utils/context';
import {
  createToken, COOKIE_SETTINGS, formatEmail, authenticateUser,
} from '../../utils/auth.utils';

export async function loginService(email: string, password: string, context: Context) {
  const user = await authenticateUser({
    email: formatEmail(email),
    password,
  }, context);

  const token = createToken(user);
  context.res.cookie('session_id', token, COOKIE_SETTINGS);
  await updateOneUserById(
    { id: user.id, data: { last_activity: new Date(), is_active: true } },
    context.prisma,
  );
  return {
    user,
  };
}
