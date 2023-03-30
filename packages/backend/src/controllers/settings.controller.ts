import { Request, Response } from 'express';

const express = require('express');

const router = express.Router();

/**
 * Update user settings
 * @route /update
 * @method PUT
 */
export async function updateUserSettings(req: Request, res: Response) {
  res.json({ res: 'update' });
}

export default router;
