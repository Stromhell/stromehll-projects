#!/usr/bin/env bash
# Finance with Stormi ONLY Zernio helper. Uses this channel's own key, never Stormi's or DumDown's.
# Usage: bash zernio.sh GET /accounts   |   bash zernio.sh POST /posts body.json
set -euo pipefail
set -a; . /mnt/project-files/finance-with-stormi/.secrets/zernio.env; set +a
M=${1:-GET}; P=${2:-/accounts}; B=${3:-}
if [ -n "$B" ]; then
  curl -sS -X "$M" "https://zernio.com/api/v1$P" -H "Authorization: Bearer $ZERNIO_API_KEY" -H 'Content-Type: application/json' --data @"$B"
else
  curl -sS -X "$M" "https://zernio.com/api/v1$P" -H "Authorization: Bearer $ZERNIO_API_KEY"
fi
