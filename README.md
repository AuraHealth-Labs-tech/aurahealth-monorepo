# aurahealth-monorepo

A modern monorepo for AuraHealth featuring:

- `apps/frontend`: React-based internal web portal
- `apps/backend`: TypeScript API server and Soroban contract gateway
- `contracts/soroban-contract`: Rust Soroban smart contract for health records
- `packages/shared`: shared TypeScript types and utilities
- Turborepo orchestration with `turbo`, `pnpm`, and workspace configuration

## Getting started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run the development stack:

   ```bash
   pnpm dev
   ```

3. Build all packages:

   ```bash
   pnpm build
   ```

## Project layout

- `apps/frontend`: internal portal UI
- `apps/backend`: API server that can connect to a Soroban contract gateway
- `contracts/soroban-contract`: Rust contract with storage and query endpoints
- `packages/shared`: shared types, models, and configuration helpers