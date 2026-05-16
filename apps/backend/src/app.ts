import express from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health';

export function createServer() {
  const app = express();
  app.use(cors({ origin: true }));
  app.use(express.json());

  app.get('/healthz', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });

  app.use('/health', healthRouter);

  return app;
}
