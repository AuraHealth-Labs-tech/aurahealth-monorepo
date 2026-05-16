# Soroban Contract

This package contains the AuraHealth Soroban smart contract and deployment helper.

## Local work

```bash
pnpm --filter aurahealth-soroban-contract run build
pnpm --filter aurahealth-soroban-contract run test
```

## Deploying

1. Ensure you have a Soroban CLI installed.
2. Update `scripts/deploy-contract.sh` with your network and signer settings.
3. Run:

```bash
pnpm --filter aurahealth-soroban-contract run deploy
```
