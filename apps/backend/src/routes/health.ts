import { Router } from 'express';
import { HealthRecord } from '@aurahealth/shared';
import { createSorobanClient } from '../services/sorobanClient';

const router = Router();
const sorobanClient = createSorobanClient();

let inMemoryRecords: HealthRecord[] = [];

router.get('/', async (_req, res) => {
  try {
    const records = await sorobanClient.fetchHealthRecords();
    res.json(records.length ? records : inMemoryRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health records' });
  }
});

router.post('/', async (req, res) => {
  const body = req.body as HealthRecord;

  if (!body?.patientId || !body?.status) {
    res.status(400).json({ error: 'patientId and status are required' });
    return;
  }

  const record: HealthRecord = {
    patientId: body.patientId,
    status: body.status,
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  try {
    await sorobanClient.submitHealthRecord(record);
    inMemoryRecords = [record, ...inMemoryRecords].slice(0, 50);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit health record' });
  }
});

export { router as healthRouter };
