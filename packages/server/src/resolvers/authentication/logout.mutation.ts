import { Context } from '../../helpers/context';
import { COOKIE_SETTINGS } from "../../helpers/auth.utils";
import { updateOneUserById } from '../../repositories/authentication';

async function logout(parent: any, args: void, context: Context) {
  const id = context?.userId
  context.res.clearCookie('session_id', COOKIE_SETTINGS);
  if (id) {
    await updateOneUserById(
      { id, data: { is_active: false } },
      context.prisma,
    );
  }
  console.info('Logout success');
}

export { logout };
