#!/bin/bash
# 2D pipeline watchdog. Keeps narration, the auto-queue and the render queue alive, catches stuck jobs,
# and frees disk before it fills. Every action is one line in /tmp/claude-0/watchdog.log
# (format "HH:MM WATCHDOG <video|all> <what happened>"), which the thread relays to the Control Room cards.
# Start once per machine boot:  nohup bash 2d-history/shared/watchdog.sh >/dev/null 2>&1 &
R=/home/user/stromehll-projects/2d-history; T=/tmp/claude-0; mkdir -p $T; cd $R
CONF=shared/pipeline.conf   # SLOTS (2 in production) + ACTIVE + QUEUE (approved, waiting); the watchdog promotes from QUEUE when a slot frees
VOICE_STALL_MIN=60; RENDER_STALL_MIN=15; DISK_MIN_GB=12
LOG=$T/watchdog.log; log(){ echo "$(date +%H:%M) WATCHDOG $1" >> $LOG; }
[ -f $T/watchdog.pid ] && kill -0 $(cat $T/watchdog.pid) 2>/dev/null && { echo "already running"; exit 0; }
echo $$ > $T/watchdog.pid; log "all watchdog started"
alive(){ pgrep -f "$1" >/dev/null; }
mins_since(){ [ -e "$1" ] || { echo 9999; return; }; echo $(( ( $(date +%s) - $(stat -c %Y "$1") ) / 60 )); }
voice_pending(){ for v in $*; do for t in $v/production/voice/act*.txt; do case $t in *.say.txt) continue;; esac; [ -f "$t" ] || continue
  need=$(awk 'BEGIN{RS=""}{c++}END{print c}' $t); have=$(ls ${t%.txt}/vo-*.wav 2>/dev/null | wc -l); [ "$have" -lt "$need" ] && { echo "$v $(basename $t .txt)"; return; }; done; done; }
start_voice(){ nohup python3 shared/voice_batch.py $* >> $T/voice_prod1.log 2>&1 & }
# a video is finished (rendered, waiting on Pushpam) when every act that has a script also has its MP4
finished(){ local v=$1 t n; ls $v/production/voice/act*.txt >/dev/null 2>&1 || return 1; for t in $v/production/voice/act*.txt; do case $t in *.say.txt) continue;; esac; n=$(basename $t .txt | sed s/act//); [ -s $v/production/acts/act$n/act$n.mp4 ] || return 1; done; return 0; }
while true; do
  # 1. disk: clear throwaway frames of acts whose MP4 exists (Pushpam OK 30 Oct), never the one rendering now
  free=$(df --output=avail -BG / | tail -1 | tr -dc 0-9)
  if [ "$free" -lt $DISK_MIN_GB ]; then cur=$(tail -1 $T/rq.log 2>/dev/null | awk '/ start /{print $3"/production/acts/act"$4}')
    n=0; for f in */production/acts/act*/frames; do [ -d "$f" ] || continue; d=${f%/frames}; [ "$d" = "$cur" ] && continue; ls $d/act*.mp4 >/dev/null 2>&1 && { rm -rf "$f"; n=$((n+1)); }; done
    now=$(df --output=avail -BG / | tail -1 | tr -dc 0-9)
    [ $n -gt 0 ] && log "all disk low (${free}G free): cleared $n old render frame folders, now ${now}G free"
    if [ "$now" -lt 6 ] && [ $(mins_since $T/watchdog.disklow) -ge 60 ]; then touch $T/watchdog.disklow; log "all DISK NEARLY FULL (${now}G free) and nothing safe to clear: needs Pushpam's OK to delete more"; fi; fi
  # 2. the queue loops
  alive pipeline_rq.sh || alive /tmp/claude-0/rq.sh || { nohup bash shared/pipeline_rq.sh >/dev/null 2>&1 & log "all render queue was down, restarted"; }
  alive pipeline_autoq.sh || alive /tmp/claude-0/autoq.sh || { nohup bash shared/pipeline_autoq.sh >/dev/null 2>&1 & log "all auto-queue was down, restarted"; }
  # 3. slots (Pushpam 30 Oct 17:47: 2 x 2D in production at once). When an ACTIVE video is fully rendered
  #    (waiting on Pushpam) it leaves ACTIVE; the next QUEUE video moves up only while fewer than SLOTS remain.
  . $CONF; SLOTS=${SLOTS:-2}
  for v in $ACTIVE; do if finished $v; then
    ACTIVE=$(echo " $ACTIVE " | sed "s/ $v / /;s/^ *//;s/ *$//"); echo "$v" >> $T/pipeline_review.txt; msg="$v is fully rendered and waiting on review"
    set -- $QUEUE; nx=$1
    if [ -n "$nx" ] && [ $(echo $ACTIVE | wc -w) -lt $SLOTS ]; then shift; ACTIVE="$ACTIVE $nx"; ACTIVE=${ACTIVE# }; QUEUE="$*"; log "$nx AUTOSTART: $msg, so $nx moved into production (act pages next)"
    else log "$v done: $msg; slot not refilled (${SLOTS} x 2D cap)"; fi
    printf '# 2D production slots. The watchdog reads this every minute and rewrites it when it promotes a video.\n# SLOTS = how many 2D videos are in production at once. ACTIVE = in production. QUEUE = approved, waiting, in start order.\nSLOTS=%s\nACTIVE="%s"\nQUEUE="%s"\n' "$SLOTS" "$ACTIVE" "$QUEUE" > $CONF
  fi; done
  # 4. narration: ACTIVE first; when ACTIVE has nothing left, pre-record the next QUEUE video so voice never sits idle
  p=$(voice_pending $ACTIVE); pv=$ACTIVE
  [ -z "$p" ] && { p=$(voice_pending $QUEUE); pv=$(echo $QUEUE | cut -d' ' -f1); }
  if [ -n "$p" ]; then
    if ! alive voice_batch.py; then start_voice $pv; log "${p%% *} narration started for $p (nothing was recording)"
    elif [ $(mins_since $T/voice_prod1.log) -ge $VOICE_STALL_MIN ]; then kill $(pgrep -f voice_batch.py) $(pgrep -f pushpam-voice/scripts/speak.py) 2>/dev/null; sleep 3; start_voice $pv; log "${p%% *} narration stuck ${VOICE_STALL_MIN}+ min on $p, killed and restarted"; fi
  fi
  # 5. render stuck: frames not moving for RENDER_STALL_MIN while render.js runs -> kill it and requeue the act
  L=$(tail -1 $T/rq.log 2>/dev/null)
  if echo "$L" | grep -q " start " && alive shared/render.js; then set -- $L; d=$3/production/acts/act$4
    if [ $(mins_since $d/frames) -ge $RENDER_STALL_MIN ] && [ $(mins_since $T/r_$3_$4.log) -ge $RENDER_STALL_MIN ]; then
      pkill -f "render.js $d/act.html"; echo "$3 $4" >> $T/rq.txt; log "$3 act $4 render stuck ${RENDER_STALL_MIN}+ min, killed and requeued"; fi; fi
  # 6. failed render: requeue once
  grep -E " done .* rc=[1-9]" $T/rq.log 2>/dev/null | while read -r tm _ v a rc; do k="$tm $v $a"; grep -qxF "$k" $T/watchdog.retried 2>/dev/null && continue
    echo "$k" >> $T/watchdog.retried; echo "$v $a" >> $T/rq.txt; log "$v act $a render failed ($rc), requeued once"; done
  sleep 60
done
