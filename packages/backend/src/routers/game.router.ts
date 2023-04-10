import express from 'express';
import * as GameController from '../controllers/game.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.get(ENDPOINTS.game.training, GameController.getTrainingWordChain);
router.get(ENDPOINTS.game.practice, GameController.getPracticeWordChain);

export default router;
