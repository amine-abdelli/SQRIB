/* eslint-disable no-await-in-loop */
import { alphabet, log, markovChainGenerator } from '@aqac/utils';
import { ApolloError } from 'apollo-server-errors';
import { createAllSets } from '../../repositories/didacticiel/createAllSets.repository';
import { Context } from '../../utils/context.utils';

export async function createAllSetsService(context: Context) {
  for (let i = 5; i < alphabet.length; i += 1) {
    const wordSet = markovChainGenerator(i);
    const newSet = await createAllSets({
      letter: alphabet[i],
      level: i,
      wordSet,
    }, context.prisma);

    if (!newSet) {
      log.error('Could not create new set', { newSet });
      throw new ApolloError('Could not create new set');
    }
  }
  return { message: 'All sets created successfully' };
}
