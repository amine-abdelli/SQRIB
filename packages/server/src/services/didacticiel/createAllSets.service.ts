/* eslint-disable no-await-in-loop */
import { alphabet, markovChainGenerator } from '@aqac/utils';
import { ApolloError } from 'apollo-server-errors';
import { createAllSets } from '../../repositories/didacticiel/createAllSets.repository';
import { Context } from '../../utils/context.utils';

export async function createAllSetsService(context: Context) {
  for (let i = 5; i < alphabet.length; i += 1) {
    const wordSet = markovChainGenerator(i);
    console.log('markov wordSet', wordSet);
    const newSet = await createAllSets({
      letter: alphabet[i],
      level: i,
      wordSet,
    }, context.prisma);

    if (!newSet) throw new ApolloError('Error creating new set');
  }
  return { message: 'All sets created successfully' };
}
