import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import { updateLevel } from '../../repositories/didacticiel/updateLevel.repository';
import { IUpdateLevel } from '../../resolvers/didacticiel/updateLevel.mutation';
import { Context } from '../../utils/context.utils';

export async function updateLevelService(args: IUpdateLevel, context: Context) {
  try {
    console.log('Trying to update the level', { user_id: context.userId, level: args.level });
    if (!context.userId) throw new AuthenticationError('User must be logged in to update your level');
    const updatedLevel = await updateLevel({ ...args, id: context?.userId }, context.prisma);
    if (!updatedLevel) throw new ApolloError('Level could not be updated');
    console.log('Level updated successfully !', { user_id: context.userId, level: args.level });
    return updatedLevel;
  } catch (error) {
    throw new ApolloError('Error while updating the level', `Level: ${args.level}`, { error });
  }
}
