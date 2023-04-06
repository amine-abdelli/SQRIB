import {
  Languages,
  TLanguage,
  alphabet, dictionaries, log,
} from '@sqrib/shared';

import { HttpError } from '../utils';
import { generateRandomWordsWithPriority } from '../utils/markov.utils';

export function generateTrainingWordChainService(
  count: number,
  minLength: number,
  maxLength: number,
  level: number,
  language?: TLanguage,
) {
  if (!count || !minLength || !maxLength || !level) { throw new HttpError(400, 'Missing count, or level parameter'); }
  if (level > alphabet.length) { throw new HttpError(400, 'Count must be equal or less than 26'); }
  const allowedLetters = alphabet.slice(0, level);
  log.info('Generating training word chain', { letters: allowedLetters });
  const wordChain = generateRandomWordsWithPriority(
    count,
    minLength,
    maxLength,
    allowedLetters,
    dictionaries[language || Languages.FR],
  );
  log.info('Training word chain generated successfully');
  return wordChain || [];
}
