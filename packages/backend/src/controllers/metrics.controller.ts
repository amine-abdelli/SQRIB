import express, { Request, Response, NextFunction } from 'express';
import { getGlobalMetricsService } from '../services';

const router = express.Router();

/**
 * Get global metrics controller
 * @route /login
 * @method GET
 */
export async function getGlobalMetrics(req: Request, res: Response, next: NextFunction) {
  try {
    const globalMetrics = await getGlobalMetricsService();
    res.status(200).json(globalMetrics);
  } catch (error) {
    next(error);
  }
}

export default router;
