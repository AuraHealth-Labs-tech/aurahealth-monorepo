export type HealthRecord = {
  patientId: string;
  status: string;
  updatedAt: string;
};

export const healthStatusOptions = [
  'Stable',
  'Critical',
  'Needs Attention',
  'Recovering'
];

export function healthRecordFromApi(record: HealthRecord): HealthRecord {
  return {
    patientId: record.patientId,
    status: record.status,
    updatedAt: record.updatedAt,
  };
}
