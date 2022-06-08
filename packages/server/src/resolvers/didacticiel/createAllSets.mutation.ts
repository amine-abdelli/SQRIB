import { alphabet, log } from '@aqac/utils';
import { ApolloError } from 'apollo-server-errors';
import { createOneSetService } from '../../services/didacticiel/createOneSet.service';
import { Context } from '../../utils/context.utils';

export async function createAllSets(parent: any, args: any, context: Context) {
  log.info('Trying to create a new set');
  for (let index = 3; index < alphabet.length; index += 1) {
    const letter = alphabet[index];
    log.info(`Level ${index}: Creating set for letter ${letter}`);
    // eslint-disable-next-line no-await-in-loop
    const { wordSet } = await createOneSetService({ letter, level: index }, context);
    if (!wordSet) {
      log.error(`Could not create word set for letter "${letter}"`);
      throw new ApolloError(`Could not create word set for letter "${letter}"`);
    }
    log.info(`Level ${index}: Set "${letter}" created successfully, another ${alphabet.length - 1 - index} to go`);
  }
  log.info('Sets created successfully !');
  return { message: 'Sets created successfully !' };
}
