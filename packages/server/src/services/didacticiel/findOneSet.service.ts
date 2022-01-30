import { ApolloError } from 'apollo-server-errors';
import { Context } from '../../utils/context.utils';
import { findOneSet } from '../../repositories/didacticiel/findOneSet.repository';
import { IFindOneSet } from '../../resolvers/didacticiel/findOneSet.query';

export async function findOneSetService(args: IFindOneSet, context: Context) {
  try {
    const wordSet = await findOneSet(args, context.prisma);
    return wordSet;
  } catch (error) {
    throw new ApolloError('Error while fetching word set');
  }
}
