import express, { Request, Response, NextFunction } from 'express';
import { generateTrainingWordChainService } from '../services';

const router = express.Router();

/**
 * Generate random word chain
 * @route /training
 * @method GET
 */
export async function getTrainingWordChain({ body }: Request, res: Response, next: NextFunction) {
  try {
    const wordChain = generateTrainingWordChainService(
      body.count,
      3,
      8,
      body.alphabetIndex,
      body.language,
    );
    res.status(200).json(wordChain);
  } catch (error) {
    next(error);
  }
}

export default router;
