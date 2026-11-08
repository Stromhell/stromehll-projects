#!/usr/bin/env bash
# One-time setup for the pushpam-voice skill: a private Python 3.11 env with Chatterbox (CPU).
set -euo pipefail

ENV="${MY_VOICE_HOME:-$HOME/.cache/pushpam-voice}/venv"
if [ -x "$ENV/bin/python" ] && "$ENV/bin/python" -c "import chatterbox" 2>/dev/null; then
  echo "pushpam-voice: already set up at $ENV"
  exit 0
fi

if ! command -v uv >/dev/null 2>&1; then
  echo "pushpam-voice: installing uv"
  python3 -m pip install -q --user uv || pip install -q uv
  export PATH="$HOME/.local/bin:$PATH"
fi

echo "pushpam-voice: creating Python 3.11 environment"
uv venv -q -p 3.11 "$ENV"

# Use NVIDIA GPU builds of PyTorch if a GPU is present, else the small CPU builds.
EXTRA=(--extra-index-url https://download.pytorch.org/whl/cpu)
if command -v nvidia-smi >/dev/null 2>&1; then EXTRA=(); fi

echo "pushpam-voice: installing Chatterbox (a few minutes the first time)"
VIRTUAL_ENV="$ENV" uv pip install -q --index-strategy unsafe-best-match "${EXTRA[@]}" \
  chatterbox-tts "setuptools<81"

"$ENV/bin/python" -c "import chatterbox; print('pushpam-voice: ready')"
