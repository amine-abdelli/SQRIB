import express from 'express';
import * as GameController from '../controllers/game.controller';
import { ENDPOINTS } from '../routes';

const router = express.Router();

router.get(ENDPOINTS.game.games, GameController.getManyGames);

export default router;
