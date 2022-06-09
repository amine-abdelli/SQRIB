import { AuthenticationError } from 'apollo-server-errors';
import { log } from '@aqac/utils';
import { Context } from '../../utils/context.utils';
import { deleteOneUserById } from '../../repositories/auth';
import { formatEmail, authenticateUser } from '../../utils/auth.utils';

export async function deleteUserService(email: string, password: string, context: Context) {
  try {
    const { id } = await authenticateUser({
      email: formatEmail(email),
      password,
    }, context);
    if (!id) {
      log.error('User not found');
      throw new AuthenticationError('User not found');
    }
    await deleteOneUserById({ id }, context.prisma);
  } catch (error) {
    log.error('Error while deleting user', { error });
    throw new AuthenticationError('Error while deleting user', { error });
  }
}
