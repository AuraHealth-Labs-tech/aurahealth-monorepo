#![no_std]

use soroban_sdk::{contractimpl, symbol, Address, Env};

pub struct HealthContract;

#[contractimpl]
impl HealthContract {
    pub fn record_health(env: Env, patient: Address, status: symbol::Symbol, updated_at: symbol::Symbol) {
        let storage = env.storage();
        let key = patient.clone();
        let payload = (status, updated_at);
        storage.persistent().set(&key, &payload);
    }

    pub fn get_health(env: Env, patient: Address) -> Option<(symbol::Symbol, symbol::Symbol)> {
        env.storage().persistent().get(&patient)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Env as TestEnv, Address, Symbol};

    #[test]
    fn test_record_and_query_health() {
        let env = TestEnv::default();
        let contract_id = env.register_contract(None, HealthContract);
        let client = HealthContractClient::new(&env, &contract_id);

        let patient = Address::random(&env);
        let status = Symbol::new(&env, "Stable");
        let updated_at = Symbol::new(&env, "2026-05-16T00:00:00Z");

        client.record_health(&patient, &status, &updated_at);
        let result = client.get_health(&patient).expect("record should exist");

        assert_eq!(result.0, status);
        assert_eq!(result.1, updated_at);
    }
}
