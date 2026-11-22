#!/bin/bash
# Re-render acts after fixes: render_act -> remix_g6 -> qa_auto. usage: rerender.sh 0 1 2
cd /home/user/repo/2d-history; V=gta6-story/production
for n in "$@"; do
  mv $V/acts/act$n/act${n}_dry.mp4 /tmp/claude-0/g6_old_dry$n.mp4 2>/dev/null
  bash shared/render_act.sh gta6-story $n 2 > /tmp/claude-0/g6rr$n.log 2>&1 || { echo "RENDERFAIL $n"; continue; }
  python3 $V/remix_g6.py $n > /tmp/claude-0/g6rrm$n.log 2>&1 || echo "REMIXFAIL $n"
  rm -rf $V/acts/act$n/act${n}_qa; python3 /mnt/project-files/system/qa/qa_auto.py $V/acts/act$n/act$n.mp4 --kind act > $V/qa/act$n-auto-r2.txt 2>&1
  echo "RR $n $(date -u +%H:%M)"
done
