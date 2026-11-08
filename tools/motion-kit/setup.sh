#!/usr/bin/env bash
# setup.sh - load the 8 Nov 2026 tool kit into this session (safe to re-run, ~1-2 min first time).
#   bash /mnt/project-files/tools/motion-kit/setup.sh            # MotionMaxx + Shotcraft skills (+ Headroom if --headroom)
#   bash /mnt/project-files/tools/motion-kit/setup.sh --headroom # also install Headroom (448 MB, only when you need hc)
# Repos are pinned to the commits that were read and checked on 8 Nov 2026. Nothing goes to project storage.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SK="$HOME/.claude/skills"; CACHE="$HOME/.cache/motion-kit"; mkdir -p "$SK" "$CACHE"
MM_COMMIT=8c8ec0f2a6f6c9a0da15cd24f7b1298ab298368c   # Tejashmakwana/motionmaxxing
HR_VERSION=0.43.1                                     # headroom-ai on PyPI
export CHROME_PATH=/opt/pw-browsers/chromium

# MotionMaxx skill (clone pinned commit, run its own installer in copy mode, media left out)
if [ ! -f "$SK/motionmaxxing/SKILL.md" ]; then
  rm -rf "$CACHE/motionmaxxing"
  git clone -q --filter=blob:none https://github.com/Tejashmakwana/motionmaxxing.git "$CACHE/motionmaxxing"
  git -C "$CACHE/motionmaxxing" checkout -q "$MM_COMMIT"
  bash "$CACHE/motionmaxxing/install.sh" --copy --force --dir "$SK/motionmaxxing" | tail -2
fi
echo "[ok] motionmaxxing skill -> $SK/motionmaxxing (CHROME_PATH=$CHROME_PATH)"

# Shotcraft skill (copy already in shared folder since 31 Oct, same upstream SKILL.md)
[ -f "$SK/video-shotcraft/SKILL.md" ] || cp -r /mnt/project-files/tools/skills/video-shotcraft "$SK/"
echo "[ok] video-shotcraft skill -> $SK/video-shotcraft"

# Headroom (optional, big): compress JSON/log output before reading it
if [ "${1:-}" = "--headroom" ]; then
  if [ ! -x "$CACHE/hr/bin/python" ] || ! "$CACHE/hr/bin/python" -c 'import headroom' 2>/dev/null; then
    python3 -m venv "$CACHE/hr" && "$CACHE/hr/bin/pip" install -q "headroom-ai==$HR_VERSION"
  fi
  mkdir -p "$HOME/.local/bin"
  cat > "$HOME/.local/bin/hc" <<EOS
#!/bin/sh
# hc: pipe big tool output through Headroom (offline, no telemetry). Saved tokens report on stderr.
HEADROOM_OFFLINE=1 HEADROOM_BEACON=off HEADROOM_TELEMETRY=off DO_NOT_TRACK=1 exec "$CACHE/hr/bin/python" -I "$HERE/hc.py"
EOS
  chmod +x "$HOME/.local/bin/hc"; echo "[ok] headroom $HR_VERSION -> hc command (e.g. some_cmd | hc)"
fi
echo "Skills load in the NEXT session, or read them now: $SK/motionmaxxing/SKILL.md"
