use aurahealth_soroban_contract::HealthContractClient;
use soroban_sdk::{testutils::Env as TestEnv, Address, Symbol};

#[test]
fn integration_record_and_query_health() {
  let env = TestEnv::default();
  let contract_id = env.register_contract(None, aurahealth_soroban_contract::HealthContract);
  let client = HealthContractClient::new(&env, &contract_id);

  let patient = Address::random(&env);
  let status = Symbol::new(&env, "Stable");
  let updated_at = Symbol::new(&env, "2026-05-16T00:00:00Z");

  client.record_health(&patient, &status, &updated_at);
  let result = client.get_health(&patient).expect("expected stored health record");

  assert_eq!(result.0, status);
  assert_eq!(result.1, updated_at);
}
