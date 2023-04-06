import express, { Request, Response, NextFunction } from 'express';
import { generateTrainingWordChainService } from '../services';

const router = express.Router();
const MIN_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 8;
/**
 * Generate random word chain
 * @route /training
 * @method GET
 */
export async function getTrainingWordChain({ body }: Request, res: Response, next: NextFunction) {
  try {
    const wordChain = generateTrainingWordChainService(
      body.count,
      MIN_WORD_LENGTH,
      MAX_WORD_LENGTH,
      body.alphabetIndex,
      body.language,
    );
    res.status(200).json(wordChain);
  } catch (error) {
    next(error);
  }
}

export default router;
