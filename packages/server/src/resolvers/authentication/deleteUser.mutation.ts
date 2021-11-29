import { deleteOneUserById } from '../../repositories/authentication';
import { authenticateUser, formatEmail } from '../../helpers/auth.utils';
import { Context } from '../../helpers/context';

export interface deleteUserArgs {
  email: string,
  password: string,
}
async function deleteUser(parent: any, { email, password }: deleteUserArgs, context: Context) {
  try {
    console.info('Trying to delete a user', { email });
    const { id } = await authenticateUser({
      email: formatEmail(email),
      password,
    }, context);
    await deleteOneUserById({ id }, context.prisma);
    console.log('User deletion successful', { email });
    return {
      message: `${email} has been succesfully deleted`,
    };
  } catch (e) {
    console.error('Error deleting user', { email, error: e });
    throw e;
  }
}

export { deleteUser };
