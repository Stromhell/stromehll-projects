#!/usr/bin/env bash
# setup.sh (v1, 22 Nov 2026) - 3D Animator skill (three.js films rendered frame by frame in headless Chrome, no Blender).
# Source: Pushpam's Drive zip 3d-animator.zip (17 Nov). Kit patched for cloud: kit/render.mjs adds --no-sandbox +
# software GPU (SwiftShader) when running as root on Linux; original kept as kit/render_original_v1.mjs.
#   bash /mnt/project-files/tools/3d-animator/setup.sh [PROJECT_DIR]
# -> installs the skill to ~/.claude/skills/3d-animator and, if PROJECT_DIR given, copies the kit there + npm install.
# Cloud speed (4 CPU, no GPU): still ~10 s, preview (--n=4) ~3.3 s/frame (6 s film = 10 min), final --n=48 ~12x slower.
# Voice/SFX: do NOT use the ElevenLabs option (credits are for long-video thumbnails only); use Kokoro / free SFX.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
mkdir -p "$HOME/.claude/skills/3d-animator" && cp -r "$HERE/SKILL.md" "$HERE/references" "$HERE/kit" "$HOME/.claude/skills/3d-animator/"
echo "[ok] skill -> ~/.claude/skills/3d-animator"
if [ -n "${1:-}" ]; then
  mkdir -p "$1" && cp -r "$HERE/kit/." "$1/" && rm -f "$1/render_original_v1.mjs" && cd "$1"
  PUPPETEER_SKIP_DOWNLOAD=1 npm install --silent
  echo "[ok] kit in $1. Render with: CHROME_PATH=$(ls -d /opt/pw-browsers/chromium-*/chrome-linux64/chrome | head -1) npm run stills|preview|final"
fi
