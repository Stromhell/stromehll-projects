# Facts shorts watchdog: keeps a batch's background jobs alive so nothing stalls silently.
# usage: (setsid nohup bash tools/watchdog.sh BATCH_DIR >/dev/null 2>&1 &)
# Every 60 s it:
#  - restarts voice generation if a short still has no vo.wav/words.json and no voice job is running
#  - kills and restarts the voice job if its speak.log has not moved for 25 min
#  - renders ids listed in BATCH/render_queue.txt (one per line) one at a time, restarting a render
#    whose log has not moved for 15 min, and retrying a failed render once
#  - clears throwaway bundles (remotion/build*, remotion/tb) when free disk is under 12 GB
#  - exits once every short is voiced and the render queue is empty
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
      log "voice job not running, starting it"
      (setsid nohup bash $F/tools/voice_all.sh $B >> $B/voice_all.log 2>&1 & echo $! > /tmp/facts-voice.pid)
    else
      cur=$(ls -t $B/*/speak.log 2>/dev/null | head -1)
      if [ -n "$cur" ] && [ $(age $cur) -gt 1500 ]; then
        log "voice log $cur silent 25 min, restarting voice job"
        pkill -TERM -s $vpid 2>/dev/null; kill $vpid 2>/dev/null; rm -f /tmp/facts-voice.pid
      fi
    fi
  fi
  # render queue
  rpid=$(cat /tmp/facts-render.pid 2>/dev/null)
  if [ -n "$rpid" ] && kill -0 $rpid 2>/dev/null; then
    id=$(cat /tmp/facts-render.id); rl=$F/remotion/out/$id-render.log
    if [ $(age $rl) -gt 900 ]; then log "render $id stuck 15 min, killing"; pkill -TERM -s $rpid 2>/dev/null; kill $rpid 2>/dev/null; fi
  elif [ -s "$Q" ]; then
    id=$(head -1 $Q)
    if [ -n "$rpid" ]; then  # a render just finished
      if grep -q "out/$id-1080p.mp4" $F/remotion/out/$id-render.log 2>/dev/null; then
        log "rendered $id"; sed -i 1d $Q; rm -f /tmp/facts-render.pid; continue
      fi
      tries[$id]=$(( ${tries[$id]:-0} + 1 ))
      if [ ${tries[$id]} -ge 2 ]; then log "render $id FAILED twice, dropped from queue"; sed -i 1d $Q; rm -f /tmp/facts-render.pid; continue; fi
      log "render $id failed, retrying once"
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
