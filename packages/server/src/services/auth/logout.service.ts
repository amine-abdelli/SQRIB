import { updateOneUserById } from '../../repositories/auth';
import { COOKIE_SETTINGS } from '../../utils/auth.utils';
import { Context } from '../../utils/context';

export async function logoutService(context: Context) {
  const id = context?.userId;
  context.res.clearCookie('session_id', COOKIE_SETTINGS);
  if (id) {
    await updateOneUserById(
      { id, data: { is_active: false } },
      context.prisma,
    );
  }
}
