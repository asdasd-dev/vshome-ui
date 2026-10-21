#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
npm ci --no-audit --no-fund
npm test
npm run typecheck
npm run build
npm run showcase:build
