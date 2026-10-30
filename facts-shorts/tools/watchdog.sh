# Facts shorts watchdog: keeps a batch's background jobs alive so nothing stalls silently.
# usage: (setsid nohup bash tools/watchdog.sh BATCH_DIR >/dev/null 2>&1 &)
# Every 60 s it:
#  - restarts voice generation if a short still has no vo.wav/words.json and no voice job is running
#  - kills and restarts the voice job if its speak.log has not moved for 25 min
#  - renders ids listed in BATCH/render_queue.txt (one per line) one at a time, restarting a render
#    whose log has not moved for 15 min, and retrying a failed render once
#  - clears throwaway bundles (remotion/build*, remotion/tb) when free disk is under 12 GB
#  - chains steps so nothing waits: a freshly voiced short with a line in BATCH/keys.txt gets its timings
#    (tools/tim.sh), and a finished render gets its watch-skill QA sheet (BATCH/qa/ID.png)
#  - log lines start with an event word (voiced, timed, rendered, qa, restart, FAILED) so a Monitor can wake Claude
#  - exits once every short is voiced, timed, rendered and QA'd and the render queue is empty
# Every action goes to BATCH/watchdog.log; pid in /tmp/facts-watchdog.pid.
F=$(cd "$(dirname "$0")/.." && pwd); B=$(cd "$1" && pwd); L=$B/watchdog.log; Q=$B/render_queue.txt
echo $$ > /tmp/facts-watchdog.pid
log() { echo "$(date -u +%H:%M:%S) $*" >> $L; }
age() { [ -e "$1" ] && echo $(( $(date +%s) - $(stat -c %Y "$1") )) || echo 0; }
log "watchdog start for $B"
declare -A tries
while true; do
  # disk
  free=$(df -BG --output=avail "$F" | tail -1 | tr -dc 0-9)
  if [ "${free:-99}" -lt 12 ]; then
    log "disk low (${free} GB free): clearing remotion/build* and remotion/tb"
    rm -rf $F/remotion/build $F/remotion/tb
  fi
  # voice
  need=0; for d in $B/*/; do [ -f $d/script.txt ] && { [ -s $d/vo.wav ] && [ -s $d/words.json ] || need=1; }; done
  vpid=$(cat /tmp/facts-voice.pid 2>/dev/null)
  if [ $need = 1 ]; then
    if [ -z "$vpid" ] || ! kill -0 $vpid 2>/dev/null; then
      log "restart voice job (not running)"
      (setsid nohup bash $F/tools/voice_all.sh $B >> $B/voice_all.log 2>&1 & echo $! > /tmp/facts-voice.pid)
    else
      cur=$(ls -t $B/*/speak.log 2>/dev/null | head -1)
      if [ -n "$cur" ] && [ $(age $cur) -gt 1500 ]; then
        log "restart voice job (log $cur silent 25 min)"
        pkill -TERM -s $vpid 2>/dev/null; kill $vpid 2>/dev/null; rm -f /tmp/facts-voice.pid
      fi
    fi
  fi
  # chain: timings for voiced shorts
  for d in $B/*/; do
    id=$(basename $d); [ -s $d/words.json ] || continue
    [ -f $d/.voiced ] || { touch $d/.voiced; log "voiced $id"; }
    if [ ! -f $d/.timed ] && grep -q "^$id " $B/keys.txt 2>/dev/null; then
      if out=$(bash $F/tools/tim.sh $B $id 2>&1) && ! echo "$out" | grep -q "not found"; then touch $d/.timed; log "timed $id"
      else [ -f $d/.timefail ] || { touch $d/.timefail; log "FAILED timing $id: $out"; }; fi
    fi
  done
  # chain: QA sheet for every finished render that has none yet
  mkdir -p $B/qa
  for d in $B/*/; do
    id=$(basename $d); mp=$F/remotion/out/$id-1080p.mp4
    [ -s $mp ] && [ "$(cat /tmp/facts-render.id 2>/dev/null)" != "$id" -o ! -f /tmp/facts-render.pid ] || continue
    if [ ! -f $B/qa/$id.png ] || [ $mp -nt $B/qa/$id.png ]; then
      bash $F/tools/watchqa.sh $mp $B/qa/$id.png >/dev/null 2>&1 && log "qa sheet ready $id" || log "FAILED qa $id"
    fi
  done
  # render queue
  rpid=$(cat /tmp/facts-render.pid 2>/dev/null)
  if [ -n "$rpid" ] && kill -0 $rpid 2>/dev/null; then
    id=$(cat /tmp/facts-render.id); rl=$F/remotion/out/$id-render.log
    if [ $(age $rl) -gt 900 ]; then log "restart render $id (stuck 15 min)"; pkill -TERM -s $rpid 2>/dev/null; kill $rpid 2>/dev/null; fi
  elif [ -s "$Q" ]; then
    id=$(head -1 $Q)
    if [ -n "$rpid" ]; then  # a render just finished
      if grep -q "out/$id-1080p.mp4" $F/remotion/out/$id-render.log 2>/dev/null; then
        log "rendered $id"; sed -i 1d $Q; rm -f /tmp/facts-render.pid; continue
      fi
      tries[$id]=$(( ${tries[$id]:-0} + 1 ))
      if [ ${tries[$id]} -ge 2 ]; then log "FAILED render $id twice, dropped from queue"; sed -i 1d $Q; rm -f /tmp/facts-render.pid; continue; fi
      log "restart render $id (failed, retrying once)"
    fi
    c=S$(echo $id | tr -d '-'); echo $id > /tmp/facts-render.id
    (cd $F/remotion && setsid nohup bash render.sh $c $id >/dev/null 2>&1 & echo $! > /tmp/facts-render.pid)
    log "render $id started"
  else
    rm -f /tmp/facts-render.pid
    [ $need = 0 ] && { log "all voiced, render queue empty: watchdog exit"; rm -f /tmp/facts-watchdog.pid; exit 0; }
  fi
  sleep 60
done
