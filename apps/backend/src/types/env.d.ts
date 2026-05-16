declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    SOROBAN_RPC_URL?: string;
    SOROBAN_CONTRACT_ID?: string;
  }
}
