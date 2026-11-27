#!/bin/bash
# WN: wait for each act's voice, time it, render it, remix (louder VO). usage: autoq.sh 0 1 2 ...
cd /home/user/stromehll-projects/2d-history; V=whatnot/production
for n in "$@"; do
  want=$(python3 -c "print(len([p for p in open('$V/voice/act$n.txt').read().split('\n\n') if p.strip()]))")
  until [ "$(ls $V/voice/act$n/vo-*.wav 2>/dev/null | wc -l)" -ge "$want" ] && ! pgrep -f "act$n.say.txt" >/dev/null; do sleep 20; done
  [ -f $V/acts/act$n/timing.json ] && grep -q estimated $V/acts/act$n/timing.js || [ -f $V/acts/act$n/timing.json ] || { bash $V/prep_act.sh $n "act $n" || { echo "PREPFAIL $n"; continue; }; }
  grep -q estimated $V/acts/act$n/timing.js && { bash $V/prep_act.sh $n "act $n" || { echo "PREPFAIL $n"; continue; }; }
  bash shared/render_act.sh whatnot $n 3 > /tmp/claude-0/r$n.log 2>&1 || { echo "RENDERFAIL $n"; continue; }
  python3 $V/remix2.py $n > /tmp/claude-0/rm$n.log 2>&1 || echo "REMIXFAIL $n"
  echo "DONE $n $(date -u +%H:%M)"
done
