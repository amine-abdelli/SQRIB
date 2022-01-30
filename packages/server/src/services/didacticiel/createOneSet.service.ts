import { ApolloError } from 'apollo-server-errors';
import { markovChainGenerator } from '@aqac/utils';
import { createOneSet } from '../../repositories/didacticiel/createOneSet.repository';
import { Context } from '../../utils/context.utils';
import { ICreateOneSet } from '../../resolvers/didacticiel/createOneSet.mutation';

export async function createOneSetService(args: ICreateOneSet, context: Context) {
  try {
    const wordSet = [];
    do {
      const generatedChain = markovChainGenerator(args.level);
      wordSet.push(...generatedChain);
    } while (wordSet.length < 1000);

    const set = await createOneSet({
      letter: args.letter,
      level: args.level,
      wordSet: wordSet.flat(),
    }, context.prisma);
    if (!set) {
      throw new ApolloError('Set could not be created !');
    }
    console.log('Word of set created successfully for letter', args.letter);
    return set;
  } catch (error) {
    console.log('Error while creating word of set for letter', args.letter, { error });
    throw new ApolloError('Error while creating word of set for letter', args.letter, { error });
  }
}
