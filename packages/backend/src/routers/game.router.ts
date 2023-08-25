import express from 'express';
import { withAuth } from '../middlewares/auth.middleware';
import * as GameController from '../controllers/game.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.get(ENDPOINTS.game.training, GameController.getTrainingWordChain);
router.get(ENDPOINTS.game.learning, GameController.getLearningWordChain);
router.post(ENDPOINTS.game.save_scoring, ...withAuth(GameController.saveLearningScoring));

export default router;
