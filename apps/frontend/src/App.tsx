import { useEffect, useState } from 'react';
import { HealthRecord, healthStatusOptions } from '@aurahealth/shared';
import { fetchHealthRecords, submitHealthRecord } from './services/api';

function App() {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [patientId, setPatientId] = useState('patient-01');
  const [status, setStatus] = useState(healthStatusOptions[0] ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    setLoading(true);
    try {
      const response = await fetchHealthRecords();
      setRecords(response);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await submitHealthRecord({ patientId, status, updatedAt: new Date().toISOString() });
      await loadRecords();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>AuraHealth Portal</h1>
        <p>Internal health management portal for Soroban contract integration.</p>
      </header>

      <main>
        <section className="panel">
          <h2>Health record submission</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Patient ID
              <input value={patientId} onChange={(event) => setPatientId(event.target.value)} required />
            </label>
            <label>
              Status
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                {healthStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={loading}>
              Submit record
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Recent health records</h2>
          {loading ? (
            <p>Loading records...</p>
          ) : (
            <div className="records-grid">
              {records.length ? (
                records.map((record) => (
                  <article key={record.patientId} className="record-card">
                    <strong>{record.patientId}</strong>
                    <span>{record.status}</span>
                    <time>{new Date(record.updatedAt).toLocaleString()}</time>
                  </article>
                ))
              ) : (
                <p>No records available.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
