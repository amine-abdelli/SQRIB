import express, { Request, Response, NextFunction } from 'express';
import { TrainingGamesRequestBody } from '@sqrib/shared';
import { generateTrainingWordChainService, generateLearningWordChainService, saveSoloScoringService } from '../services';

const router = express.Router();
const MIN_WORDS_LENGTH = 3;
const MAX_WORDS_LENGTH = 8;

/**
 * Generate random word chain
 * @route /training
 * @method GET
 */
export function getTrainingWordChain({ query }: Request, res: Response, next: NextFunction) {
  try {
    const { count, language } = query as unknown as TrainingGamesRequestBody;
    const wordChain = generateTrainingWordChainService(count, language);
    res.status(200).json(wordChain);
  } catch (error) {
    next(error);
  }
}

/**
 * Generate random word chain
 * @route /learning
 * @method GET
 */
export function getLearningWordChain({ body }: Request, res: Response, next: NextFunction) {
  try {
    const wordChain = generateLearningWordChainService(
      body.count,
      MIN_WORDS_LENGTH,
      MAX_WORDS_LENGTH,
      body.alphabetIndex,
      body.language,
    );
    res.status(200).json(wordChain);
  } catch (error) {
    next(error);
  }
}

/**
 * Save solo scoring
 * @route /save-solo-scoring
 * @method POST
 */
export async function saveSoloScoring({ body }: Request, res: Response, next: NextFunction) {
  try {
    console.log('huhuhuhu');
    await saveSoloScoringService(body);
    res.status(200).json({ message: 'Scores saved' });
  } catch (error) {
    next(error);
  }
}
export default router;
