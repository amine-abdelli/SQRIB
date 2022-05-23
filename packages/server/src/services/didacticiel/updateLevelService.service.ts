import { log } from '@aqac/utils';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import { updateOneUserById } from '../../repositories';
import { IUpdateLevel } from '../../resolvers/didacticiel/updateLevel.mutation';
import { Context } from '../../utils/context.utils';

export async function updateLevelService(args: IUpdateLevel, context: Context) {
  try {
    log.info('Trying to update the level', { user_id: context.userId, level: args.level });
    if (!context.userId) throw new AuthenticationError('User must be logged-in to update your level');
    const updatedLevel = await updateOneUserById({
      data: { didacticiel_level: args.level },
      id: context?.userId,
    }, context.prisma);
    if (!updatedLevel) {
      log.error('Level could not be updated');
      throw new ApolloError('Level could not be updated');
    }
    log.info('Level updated successfully !', { user_id: context.userId, level: args.level });
    return updatedLevel;
  } catch (error) {
    throw new ApolloError('Error while updating the level', `Level: ${args.level}`, { error });
  }
}
