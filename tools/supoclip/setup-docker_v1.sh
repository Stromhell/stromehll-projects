#!/usr/bin/env bash
# setup.sh - SupoClip (long video -> vertical 9:16 clips with face crop + word captions), self-hosted in this cloud session.
#   bash /mnt/project-files/tools/supoclip/setup.sh          # clone pinned commit, write .env, build + start Docker stack
#   bash /mnt/project-files/tools/supoclip/setup.sh --stop   # stop the stack
# Safe to re-run. Code lives in ~/.cache/supoclip (session-local, nothing written to project storage).
# Keys: transcription uses local Whisper (free). Clip SELECTION needs one LLM key, read from env or
#   /mnt/project-files/tools/supoclip/keys.env (NOT created by default; only add a key Pushpam approved).
# License: SupoClip Noncommercial 1.1 -> OK for Pushpam's own channels; NOT for client/freelance work.
set -euo pipefail
COMMIT=dab704b1704e99e53f293e99a04989f242fd7799   # FujiwaraChoki/supoclip, read + checked 20 Nov 2026
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="$HOME/.cache/supoclip"
docker ps >/dev/null 2>&1 || { (dockerd >/tmp/dockerd.log 2>&1 &); for i in $(seq 1 20); do docker ps >/dev/null 2>&1 && break; sleep 1; done; }
if [ "${1:-}" = "--stop" ]; then cd "$DIR" && docker compose down; exit 0; fi
if [ ! -d "$DIR/.git" ]; then
  git clone -q --filter=blob:none https://github.com/FujiwaraChoki/supoclip.git "$DIR"
  git -C "$DIR" checkout -q "$COMMIT"
fi
cd "$DIR"
if [ ! -f .env ]; then
  cp .env.example .env
  rnd() { python3 -c 'import secrets;print(secrets.token_hex(24))'; }
  sed -i "s/^TRANSCRIPTION_PROVIDER=.*/TRANSCRIPTION_PROVIDER=whisper/; s/^WHISPER_MODEL_SIZE=.*/WHISPER_MODEL_SIZE=small/; \
    s/^BETTER_AUTH_SECRET=.*/BETTER_AUTH_SECRET=$(rnd)/; s/^BACKEND_AUTH_SECRET=.*/BACKEND_AUTH_SECRET=$(rnd)/; \
    s/^APP_SETTINGS_ENCRYPTION_KEY=.*/APP_SETTINGS_ENCRYPTION_KEY=$(rnd)/" .env
fi
# Optional approved keys (LLM=..., GOOGLE_API_KEY=... etc.) override the template
[ -f "$HERE/keys.env" ] && cat "$HERE/keys.env" >> .env
docker compose up -d --build 2>&1 | tail -5
echo "[ok] SupoClip: web http://localhost:3107  API http://localhost:8000/docs  (code: $DIR)"
grep -qE '^(OPENAI|GOOGLE|ANTHROPIC|OPENROUTER)_API_KEY=.+' .env || echo "[warn] no LLM key set: clip selection will fail until Pushpam approves one (see README.md)"
