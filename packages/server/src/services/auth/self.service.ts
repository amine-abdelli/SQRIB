import { log } from '@aqac/utils';
import { AuthenticationError } from 'apollo-server-errors';
import { oneUserById, updateOneUserById } from '../../repositories/auth';
import { Context } from '../../utils/context.utils';

export async function selfService(context: Context) {
  try {
    if (!context.userId) throw new AuthenticationError('User not found');
    const user = await oneUserById({ id: context?.userId });
    if (!user) {
      log.error('User not found');
      throw new AuthenticationError('User not found');
    }
    await updateOneUserById({
      id: context.userId!,
      data: { last_activity: new Date().toISOString() },
    }, context.prisma);
    return user;
  } catch (error) {
    log.error('Error while fetching user', { error });
    throw new AuthenticationError('Error while fetching user', { error });
  }
}
