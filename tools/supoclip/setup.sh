#!/usr/bin/env bash
# setup.sh (v2, 20 Nov 2026) - SupoClip: long video -> vertical 9:16 clips (AI picks moments, face crop, word captions, hook title).
# Runs NATIVELY in the cloud session (Docker builds can't reach the proxy; old attempt kept as setup-docker_v1.sh).
#   bash /mnt/project-files/tools/supoclip/setup.sh          # install (~3 min first time) + start Postgres, Redis, API :8000, worker
#   bash /mnt/project-files/tools/supoclip/setup.sh --stop   # stop API + worker
# Then: bash /mnt/project-files/tools/supoclip/clip.sh VIDEO.mp4 [short|medium|long|auto] [highlights|series|topic|recap|trailer]
# Transcription = local Whisper (free). Clip SELECTION needs one LLM key in /mnt/project-files/tools/supoclip/keys.env
#   (not created; add only a key Pushpam approved, e.g.  LLM=google-gla:gemini-3-flash-preview  +  GOOGLE_API_KEY=...).
# License: SupoClip Noncommercial 1.1 -> OK for Pushpam's own channels; NOT for client/freelance work.
set -euo pipefail
COMMIT=dab704b1704e99e53f293e99a04989f242fd7799   # FujiwaraChoki/supoclip, read + checked 20 Nov 2026
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="$HOME/.cache/supoclip"; LOG="$DIR/logs"
if [ "${1:-}" = "--stop" ]; then pkill -f 'uvicorn src.main:app' || true; pkill -f 'src.workers.run_workers' || true; echo stopped; exit 0; fi
export SSL_CERT_FILE=/root/.ccr/ca-bundle.crt UV_NATIVE_TLS=1
if [ ! -d "$DIR/.git" ]; then
  git clone -q --filter=blob:none https://github.com/FujiwaraChoki/supoclip.git "$DIR"
  git -C "$DIR" checkout -q "$COMMIT"
fi
mkdir -p "$LOG"; cd "$DIR"
if [ ! -f .env ]; then
  cp .env.example .env
  rnd() { python3 -c 'import secrets;print(secrets.token_hex(24))'; }
  sed -i "s/^TRANSCRIPTION_PROVIDER=.*/TRANSCRIPTION_PROVIDER=whisper/; s/^WHISPER_MODEL_SIZE=.*/WHISPER_MODEL_SIZE=small/; \
    s/^BETTER_AUTH_SECRET=.*/BETTER_AUTH_SECRET=$(rnd)/; s/^BACKEND_AUTH_SECRET=.*/BACKEND_AUTH_SECRET=$(rnd)/; \
    s/^APP_SETTINGS_ENCRYPTION_KEY=.*/APP_SETTINGS_ENCRYPTION_KEY=$(rnd)/" .env
fi
[ -x backend/.venv/bin/uvicorn ] || (cd backend && uv sync --frozen --extra cpu -q)
# Postgres + Redis (local services in the container)
service postgresql start >/dev/null 2>&1 || true
redis-cli ping >/dev/null 2>&1 || redis-server --daemonize yes >/dev/null
for i in $(seq 1 15); do su postgres -c "psql -tAc 'select 1'" >/dev/null 2>&1 && break; sleep 1; done
if ! su postgres -c "psql -tAc \"select 1 from pg_database where datname='supoclip'\"" | grep -q 1; then
  su postgres -c "psql -qc \"CREATE USER supoclip WITH PASSWORD 'supoclip_password' SUPERUSER;\"" || true
  su postgres -c "createdb -O supoclip supoclip"
  PGPASSWORD=supoclip_password psql -h localhost -U supoclip supoclip -q -f init.sql >/dev/null
fi
# Local API key for the pipeline user (no web sign-up needed)
if [ ! -f .local_api_key ]; then
  KEY=sk_local_$(python3 -c 'import secrets;print(secrets.token_hex(16))'); H=$(printf %s "$KEY" | sha256sum | cut -d' ' -f1)
  PGPASSWORD=supoclip_password psql -h localhost -U supoclip supoclip -qc "INSERT INTO users(id,name,email,\"emailVerified\") VALUES ('local-pipeline','Pipeline','pipeline@localhost',true) ON CONFLICT DO NOTHING; INSERT INTO api_keys(user_id,name,key_hash,key_prefix) VALUES ('local-pipeline','pipeline','$H','${KEY:0:12}');"
  echo "$KEY" > .local_api_key
fi
# Env for API + worker
cd backend; set -a; . ../.env; [ -f "$HERE/keys.env" ] && . "$HERE/keys.env"; set +a
export DATABASE_URL=postgresql+asyncpg://supoclip:supoclip_password@localhost:5432/supoclip REDIS_HOST=localhost REDIS_PASSWORD= PYTHONPATH="$PWD"
if ! pgrep -f 'uvicorn src.main:app' >/dev/null; then setsid nohup .venv/bin/uvicorn src.main:app --host 127.0.0.1 --port 8000 >"$LOG/api.log" 2>&1 </dev/null & fi
if ! pgrep -f 'src.workers.run_workers' >/dev/null; then setsid nohup .venv/bin/python -m src.workers.run_workers >"$LOG/worker.log" 2>&1 </dev/null & fi
for i in $(seq 1 30); do curl -sf -o /dev/null http://localhost:8000/docs && break; sleep 1; done
echo "[ok] SupoClip API http://localhost:8000/docs  key in $DIR/.local_api_key  logs $LOG"
[ -n "${OPENAI_API_KEY:-}${GOOGLE_API_KEY:-}${ANTHROPIC_API_KEY:-}${OPENROUTER_API_KEY:-}" ] || echo "[warn] no LLM key: transcription works, clip selection fails until Pushpam approves a key (keys.env)"
