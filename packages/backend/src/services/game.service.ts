import {
  ISaveScoring,
  Languages,
  alphabet, dictionaries, log,
} from '@sqrib/shared';

import { saveSoloScoringRepository } from '../repositories';
import { generateWordSet } from '../utils/words.utils';
import { HttpError } from '../utils';
import { generateRandomWordsWithPriority } from '../utils/markov.utils';

export function generateTrainingWordChainService(
  count: number,
  minLength: number,
  maxLength: number,
  level: number,
  language?: Languages,
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

export function generatePracticeWordChainService(count: number, language: Languages) {
  const allowedLanguages = ['fr', 'en', 'de', 'es'];
  if (!allowedLanguages.includes(language)) {
    throw new HttpError(400, `"${language}" is not a valid language`);
  }
  if (!count) { throw new HttpError(400, 'Missing count or language parameter'); }
  log.info('Generating practice word chain', { count, language });
  const wordChain = generateWordSet((language || Languages.FR), count);
  log.info('Practice word chain generated successfully');
  return wordChain || [];
}

export async function saveSoloScoringService({ game, score }: ISaveScoring) {
  log.info('Saving solo scoring');
  const savedGame = await saveSoloScoringRepository({ game, score });
  log.info('Score saved successfully');
  return savedGame;
}
