import { AuthenticationError } from 'apollo-server-errors';
import { oneUserById, updateOneUserById } from '../../repositories/auth';
import { Context } from '../../utils/context.utils';

export async function selfService(context: Context) {
  try {
    if (!context.userId) throw new AuthenticationError('User not found');
    const user = await oneUserById({ id: context?.userId }, context.prisma);
    if (!user) throw new AuthenticationError('User not found');
    await updateOneUserById({ id: context.userId!, data: { is_active: true } }, context.prisma);
    return user;
  } catch (error) {
    throw new AuthenticationError('Error while fetching user', { error });
  }
}
