import { AuthenticationError } from 'apollo-server-errors';
import { Context } from '../../utils/context';
import { deleteOneUserById } from '../../repositories/auth';
import { formatEmail, authenticateUser } from '../../utils/auth.utils';

export async function deleteUserService(email: string, password: string, context: Context) {
  const { id } = await authenticateUser({
    email: formatEmail(email),
    password,
  }, context);
  if (!id) throw new AuthenticationError('User not found');
  await deleteOneUserById({ id }, context.prisma);
}
