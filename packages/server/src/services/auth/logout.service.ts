import { AuthenticationError } from 'apollo-server-errors';
import { updateOneUserById } from '../../repositories/auth';
import { COOKIE_SETTINGS } from '../../utils/auth.utils';
import { Context } from '../../utils/context.utils';

export async function logoutService(context: Context) {
  try {
    const id = context?.userId;
    context.res.clearCookie('session_id', COOKIE_SETTINGS);
    if (id) {
      await updateOneUserById(
        { id, data: { is_active: false } },
        context.prisma,
      );
    }
  } catch (error) {
    throw new AuthenticationError('Error while logging out', { error });
  }
}
