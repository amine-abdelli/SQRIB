import { Context } from '../../helpers/context';
import { authenticateUser, COOKIE_SETTINGS, createToken, formatEmail } from '../../helpers/auth.utils';
import { updateOneUserById } from '../../repositories/authentication';

interface LoginArgs {
  email: string,
  password: string,
}

async function login(parent: any, { email, password }: LoginArgs, context: Context) {
  try {
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
    console.info('Authentication success', { email });
    return {
      user,
    };
  } catch (e) {
    (e);
    throw e;
  }
}

export { login };