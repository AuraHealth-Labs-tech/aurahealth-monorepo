import axios from 'axios';
import { HealthRecord } from '@aurahealth/shared';

export interface SorobanClientConfig {
  rpcUrl: string;
  contractId: string;
}

export function createSorobanClient() {
  return new SorobanClient({
    rpcUrl: process.env.SOROBAN_RPC_URL ?? '',
    contractId: process.env.SOROBAN_CONTRACT_ID ?? '',
  });
}

export class SorobanClient {
  constructor(private config: SorobanClientConfig) {}

  async fetchHealthRecords(): Promise<HealthRecord[]> {
    if (!this.config.rpcUrl || !this.config.contractId) {
      return [];
    }

    // Placeholder for Soroban RPC query logic.
    const response = await axios.post(this.config.rpcUrl, {
      method: 'contract-events',
      params: [this.config.contractId],
    });

    return response.data?.records ?? [];
  }

  async submitHealthRecord(record: HealthRecord): Promise<void> {
    if (!this.config.rpcUrl || !this.config.contractId) {
      throw new Error('Soroban client not configured');
    }

    await axios.post(this.config.rpcUrl, {
      method: 'sendTransaction',
      params: [
        {
          contract: this.config.contractId,
          function: 'record_health',
          args: [record.patientId, record.status, record.updatedAt],
        },
      ],
    });
  }
}
