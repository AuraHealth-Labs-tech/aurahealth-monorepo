#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$PROJECT_DIR"

echo "Building Soroban contract..."
cargo build --release --target wasm32-unknown-unknown

WASM_FILE="target/wasm32-unknown-unknown/release/aurahealth_soroban_contract.wasm"

if [ ! -f "$WASM_FILE" ]; then
  echo "Error: compiled WASM not found at $WASM_FILE" >&2
  exit 1
fi

echo "Contract compiled: $WASM_FILE"

echo "Deployment placeholder:"
echo "  soroban contract deploy --wasm $WASM_FILE --network <network> --signer <signer>"
echo "Update this script with your Soroban deployment configuration."
