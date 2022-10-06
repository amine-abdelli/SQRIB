import { ApolloError } from 'apollo-server-errors';
import { log, markovChainGenerator } from '@sqrib/utils';
import { createOneSet } from '../../repositories/didacticiel/createOneSet.repository';
import { Context } from '../../utils/context.utils';

export interface ICreateOneSet {
  letter: string
  level: number
}

export async function createOneSetService(args: ICreateOneSet, context: Context) {
  try {
    const wordSet = [];
    do {
      const generatedChain = markovChainGenerator(args.level + 1);
      wordSet.push(...generatedChain);
    } while (wordSet.length < 1000);

    const set = await createOneSet({
      letter: args.letter,
      level: args.level,
      word_set: args.letter !== 'j'
        ? wordSet.filter((word) => !word.includes('j')).flat()
        : wordSet.flat(),
    }, context.prisma);
    if (!set) {
      log.error('Set could not be created');
      throw new ApolloError('Set could not be created !');
    }
    return set;
  } catch (error) {
    log.error('Error while creating word of set for letter', args.letter, { error });
    throw new ApolloError('Error while creating word of set for letter', args.letter, { error });
  }
}
