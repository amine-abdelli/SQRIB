import { AuthenticationError } from 'apollo-server-errors';
import { oneUserById, updateOneUserById } from '../../repositories/auth';
import { Context } from '../../utils/context.utils';

export async function selfService(context: Context) {
  if (!context.userId) throw new AuthenticationError('User not found');
  const user = await oneUserById({ id: context?.userId }, context.prisma);
  await updateOneUserById({ id: context.userId!, data: { is_active: true } }, context.prisma);
  return user;
}
