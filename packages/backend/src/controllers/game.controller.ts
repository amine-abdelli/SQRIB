import express, { Request, Response, NextFunction } from 'express';
import { generatePracticeWordChainService, generateTrainingWordChainService } from '../services';

const router = express.Router();
const MIN_WORDS_LENGTH = 3;
const MAX_WORDS_LENGTH = 8;
/**
 * Generate random word chain
 * @route /training
 * @method GET
 */
export function getTrainingWordChain({ body }: Request, res: Response, next: NextFunction) {
  try {
    const wordChain = generateTrainingWordChainService(
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
 * Generate random word chain
 * @route /training
 * @method GET
 */
export function getPracticeWordChain({ body }: Request, res: Response, next: NextFunction) {
  try {
    const wordChain = generatePracticeWordChainService(body.count, body.language);
    res.status(200).json(wordChain);
  } catch (error) {
    next(error);
  }
}

export default router;
