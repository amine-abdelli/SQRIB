import express from 'express';
import * as GameController from '../controllers/game.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.get(ENDPOINTS.game.training, GameController.getTrainingWordChain);
router.get(ENDPOINTS.game.learning, GameController.getLearningWordChain);
router.post(ENDPOINTS.game.saveSoloScoring, GameController.saveTrainingScore);

export default router;
