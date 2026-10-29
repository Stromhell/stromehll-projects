#!/bin/bash
# Render several acts one after another (each resumable). Skips acts whose final act video exists.
# Usage: render_queue.sh <out dir> <act> [act ...]
OUT=$1; shift
# faster render: lighter anti-aliasing/AO, 3D drawn at 2/3 size and upscaled (text stays full-res). About 2x faster.
export RQ=${RQ:-fast} RS=${RS:-0.667}
for A in "$@"; do
  if [ -f $OUT/act$A.mp4 ]; then echo "act $A already done"; continue; fi
  echo "== act $A $(date -u +%H:%M)"
  bash "$(dirname "$0")/act_pipeline.sh" $A $OUT > $OUT/run$A.log 2>&1 || { echo "act $A stopped"; tail -3 $OUT/run$A.log; exit 1; }
  tail -2 $OUT/run$A.log
done
