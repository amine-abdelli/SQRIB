import express from 'express';
import { ENDPOINTS } from '@sqrib/shared';
import * as MetricsController from '../controllers/metrics.controller';

const router = express.Router();

router.get(ENDPOINTS.metrics.get_global_metrics, MetricsController.getGlobalMetrics);

export default router;
