#!/usr/bin/env bash
# One-time setup of the /watch skill in a cloud session of this repo.
# Local engine only, no API keys, no cloud transcription.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
S="$ROOT/.claude/skills/watch/scripts"
command -v ffmpeg >/dev/null || { echo "ffmpeg missing"; exit 1; }
command -v yt-dlp >/dev/null || pip install -q yt-dlp
python3 "$S/setup.py" --engine local
python3 "$S/setup.py" --backend none --detail balanced
echo "watch ready. Try: python3 $S/watch.py <video-or-url> --engine local"
