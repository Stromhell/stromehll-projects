#!/bin/bash
# Watchdog for the 2D dynamic pipeline. Runs every 60 s:
#  - restarts pipeline_dd.sh if it is not running and not finished
#  - kills a render whose frames stop growing for 15 min (the pipeline retries it)
#  - clears leftover frame folders when free disk drops under 12 GB
# After a machine restart, start it again with:  setsid nohup bash shared/watchdog_dd.sh >/dev/null 2>&1 &
W=/home/user/w2d; S=$W/.state; mkdir -p $S
log(){ echo "$(date -u +%H:%M) WATCHDOG $*" >> $S/events.log; }
exec 9>$S/watchdog.lock; flock -n 9 || exit 0
log "started"
while true; do
  date -u +%s > $S/watchdog.alive
  if [ ! -f $S/ALL_DONE ] && ! pgrep -x -f "bash $W/shared/pipeline_dd.sh" >/dev/null; then
    log "pipeline not running, (re)starting"; (cd $W && setsid nohup bash $W/shared/pipeline_dd.sh >> /tmp/claude-0/pipeline_dd.log 2>&1 &)
  fi
  if ! pgrep -x -f "bash $W/shared/voice_dd.sh" >/dev/null; then
    for v in $(cat $S/voice_queue 2>/dev/null); do [ -f $S/voice_$v ] || { log "voice for $v not running, (re)starting"; (cd $W && setsid nohup bash $W/shared/voice_dd.sh >/dev/null 2>&1 &); break; }; done
  fi
  F=$(ls -dt /tmp/claude-0/frames/*/act* 2>/dev/null | head -1)
  if [ -n "$F" ] && pgrep -f "shared/render.js" >/dev/null; then
    n=$(ls "$F" | wc -l); if [ "$n" = "$(cat $S/lastn 2>/dev/null)" ]; then
      c=$(( $(cat $S/stall 2>/dev/null || echo 0) + 1 )); echo $c > $S/stall
      [ $c -ge 15 ] && { log "render stalled at $n frames in $F, killing it"; pkill -f "shared/render.js"; echo 0 > $S/stall; }
    else echo 0 > $S/stall; fi; echo $n > $S/lastn
  fi
  free=$(df --output=avail -BG /home/user | tail -1 | tr -dc 0-9)
  if [ "$free" -lt 12 ]; then for d in /tmp/claude-0/frames/*/act*; do pgrep -f "$d" >/dev/null || { rm -rf "$d"; log "low disk ($free GB), cleared $d"; }; done; fi
  sleep 60
done
