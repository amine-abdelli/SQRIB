import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import { log } from '@sqrib/shared';

dotenv.config();

const SQRIB_SERVER_PORT = process.env.SQRIB_SERVER_PORT || 4000;

const app = express();

app.use(cors());

app.use(cookieParser());

app.use((req, res) => {
  res.send('Sqrib server');
});

app.listen(SQRIB_SERVER_PORT, () => log.info(`SQRIB server running on port ${SQRIB_SERVER_PORT}`));
