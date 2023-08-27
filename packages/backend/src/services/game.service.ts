import {
  Languages, SaveTrainingScoringRequestBody,
  ScoreRequestBody,
  SessionRequestBody,
  TLanguages, alphabet, dictionaries, log,
} from '@sqrib/shared';
import { Request } from 'express';
import {
  createScore, createSession, deleteSession, getUserByIdRepository,
} from '../repositories';
import { generateWordSet } from '../utils/words.utils';
import { HttpError, calculateDuration } from '../utils';
import { generateRandomWordsWithPriority } from '../utils/markov.utils';

// Validation util
function saveTrainingScoringValidator(session: SessionRequestBody, score: ScoreRequestBody) {
  if (!session.language || (session.word_count === undefined && session.count_down === undefined)
    || !session.type || !session.mode || score.accuracy === undefined
    || score.wpm === undefined || score.points === undefined
    || !score.start_time || !score.end_time || score.typed_words === undefined) {
    throw new HttpError(400, 'Missing mandatory fields in request body');
  }
}

export function generateLearningWordChainService(
  count: number,
  minLength: number,
  maxLength: number,
  level: number,
  language?: TLanguages,
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

export function generateTrainingWordChainService(count: number, language: TLanguages) {
  const allowedLanguages = [Languages.FR, Languages.EN, Languages.DE, Languages.ES];
  if (!allowedLanguages.includes(language)) {
    throw new HttpError(400, `"${language}" is not a valid language`);
  }
  if (!count || !language) { throw new HttpError(400, 'Missing count or language parameter'); }
  log.info('Generating Training word chain', { count, language });
  const wordChain = generateWordSet((language || Languages.FR), count);
  log.info('Training word chain generated successfully');
  return wordChain || [];
}

export async function saveTrainingScoringService(req: Request) {
  const requestBody: SaveTrainingScoringRequestBody = req.body;
  const { userId } = req;
  log.info('[learning] Saving score', { user: userId });
  if (!userId) { throw new HttpError(401, 'Unauthorized'); }
  const user = await getUserByIdRepository(userId || '');
  if (!user) { throw new HttpError(404, 'User not found'); }
  const { session, score } = requestBody;
  if (!session || !score) { throw new HttpError(400, 'Missing session or score'); }
  saveTrainingScoringValidator(session, score);
  const preparedSessionBody = {
    ...session,
    created_by: userId,
    word_set_id: session.word_set_id || '',
    total_duration: calculateDuration(score.start_time, score.end_time),
  };
  const createdSession = await createSession(preparedSessionBody);
  if (!session) throw new HttpError(500, 'Could not create session');
  const preparedScoreBody = {
    ...score,
    user_id: userId,
    session_id: createdSession.id,
    xp: 0,
  };
  const createdScore = await createScore(preparedScoreBody);
  if (!createdScore) {
    await deleteSession(createdSession.id);
    throw new HttpError(500, 'Could not create score');
  }
  log.info('[learning] Score saved successfully', { user: userId });
  return createdScore;
}
