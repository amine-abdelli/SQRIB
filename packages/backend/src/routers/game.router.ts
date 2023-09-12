import express from 'express';
import { ENDPOINTS } from '@sqrib/shared';
import { withAuth } from '../middlewares/auth.middleware';
import * as GameController from '../controllers/game.controller';

const router = express.Router();

router.get(ENDPOINTS.game.training, GameController.getTrainingWordChain);
router.get(ENDPOINTS.game.learning, GameController.getLearningWordChain);
router.post(ENDPOINTS.game.save_scoring, ...withAuth(GameController.saveTrainingScoring));

export default router;
