#!/bin/bash
# render queue: each line "video act" in /tmp/claude-0/rq.txt, processed in order
cd /home/user/stromehll-projects/2d-history
while true; do
  L=$(head -1 /tmp/claude-0/rq.txt 2>/dev/null); [ -z "$L" ] && { sleep 20; continue; }
  sed -i 1d /tmp/claude-0/rq.txt; set -- $L
  echo "$(date +%H:%M) start $1 $2" >> /tmp/claude-0/rq.log
  t0=$(date +%s); bash shared/render_act.sh $1 $2 3 > /tmp/claude-0/r_$1_$2.log 2>&1; rc=$?
  m=$1/production/acts/act$2/act$2.mp4; if [ $rc -eq 0 ] && ! { [ -s $m ] && [ $(stat -c %Y $m) -ge $t0 ]; }; then rc=99; fi
  echo "$(date +%H:%M) done $1 $2 rc=$rc" >> /tmp/claude-0/rq.log
done
