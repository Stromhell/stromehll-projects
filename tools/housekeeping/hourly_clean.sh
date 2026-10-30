#!/usr/bin/env bash
# Hourly housekeeping for the video pipeline: clear rebuildable caches,
# compress old logs, refresh the Graphify code map.
#
# Narrow, allow-listed scope. It only ever:
#   - removes __pycache__ folders inside the pipeline project folder (rebuilt on next run)
#   - removes this machine's pip download cache (re-downloaded on demand)
#   - gzips *.log files older than 1 hour inside the pipeline project folder
#   - rebuilds the Graphify map
# It never deletes renders, media, uploads, scripts, memory, or anything in /tmp.
#
# Usage: tools/housekeeping/hourly_clean.sh [--dry-run]
set -uo pipefail
DRY=0; [ "${1:-}" = "--dry-run" ] && DRY=1
TOOLS="$(cd "$(dirname "$0")/.." && pwd)"
SHARED="${SHARED_DIR:-/mnt/project-files}"
LOG="$SHARED/housekeeping/hourly-clean.log"
removed=0; zipped=0

# 1. Python bytecode caches in the pipeline folder
while IFS= read -r d; do
    if [ $DRY = 1 ]; then echo "would remove: $d"; else rm -rf -- "$d"; fi
    removed=$((removed + 1))
done < <(find "$SHARED/" -path "$SHARED/uploads" -prune -o -type d -name __pycache__ -print 2>/dev/null)

# 2. pip download cache on this machine
if [ -d "$HOME/.cache/pip" ]; then
    if [ $DRY = 1 ]; then echo "would remove: $HOME/.cache/pip"; else rm -rf -- "$HOME/.cache/pip"; fi
    removed=$((removed + 1))
fi

# 3. Compress pipeline logs older than 1 hour (kept, just smaller)
while IFS= read -r f; do
    if [ $DRY = 1 ]; then echo "would gzip: $f"; else gzip -f -- "$f"; fi
    zipped=$((zipped + 1))
done < <(find "$SHARED/" -path "$SHARED/uploads" -prune -o -type f -name '*.log' \
    ! -name 'hourly-clean.log' -mmin +60 -size +1k -print 2>/dev/null)

# 4. Refresh the Graphify code map so threads query a current, compact map
[ $DRY = 0 ] && bash "$TOOLS/graphify/gq" rebuild >/dev/null 2>&1

msg="$(date -u +%FT%TZ) removed=$removed gzipped=$zipped dry=$DRY"
echo "$msg"
[ $DRY = 0 ] && mkdir -p "$(dirname "$LOG")" && echo "$msg" >> "$LOG"
exit 0
