import { HealthRecord } from '@aurahealth/shared';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export async function fetchHealthRecords(): Promise<HealthRecord[]> {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) {
    throw new Error('Failed to fetch health records');
  }
  return response.json();
}

export async function submitHealthRecord(record: HealthRecord): Promise<void> {
  const response = await fetch(`${API_BASE}/health`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error('Failed to submit health record');
  }
}
