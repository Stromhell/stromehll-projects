#!/bin/bash
# 3D render watchdog. Every 60 s: if a render's output has not grown for 15 min, kill that
# render.js so the resumable pipeline retries the shot; if the acts queue died while acts
# are still missing, restart it; clean throwaway frame dirs when free disk < 8 GB. Logs to watchdog.log.
W=${1:-/home/user/work/3dlow_acts}; T=/home/user/stromehll-projects/3d-low/tools; L=$W/watchdog.log; ACTS=${ACTS:-0 1 2 3 4 5 6 7}
log() { echo "$(date -u +%FT%TZ) $*" >> $L; }
log "watchdog start"
while true; do
  for f in $W/shots/*.tmp.mp4; do [ -f "$f" ] || continue
    # newest of the video and its per-frame progress file; x264 holds ~40 frames before writing, so slow shots look idle
    m=$(stat -c %Y "$f"); [ -f "$f.progress.json" ] && m=$(( $(stat -c %Y "$f.progress.json") > m ? $(stat -c %Y "$f.progress.json") : m ))
    age=$(( $(date +%s) - m ))
    if [ $age -gt 1800 ]; then s=$(basename "$f" .mp4.tmp.mp4); pid=$(pgrep -f "render.js.* $s( |$)" | head -1)
      if [ -n "$pid" ]; then log "shot $s stalled ${age}s, killing render $pid"; kill $pid; fi; fi
  done
  missing=""; for a in $ACTS; do [ -f $W/act$a.mp4 ] || missing="$missing $a"; done
  if [ -n "$missing" ] && ! pgrep -f "render_queue.sh" >/dev/null; then
    log "queue not running, restarting for:$missing"; nohup bash $T/render_queue.sh $W$missing >> $W/queue.log 2>&1 &
  fi
  free=$(df -BG --output=avail $W | tail -1 | tr -dc 0-9)
  if [ "${free:-99}" -lt 8 ]; then log "disk low ${free}G, clearing frame dirs"; find $W -maxdepth 3 -type d -name 'frames*' -mmin +30 -exec rm -rf {} + 2>/dev/null; fi
  sleep 60
done
