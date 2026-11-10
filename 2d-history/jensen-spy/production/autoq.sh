#!/bin/bash
# Wait for each act's voice, then time it, render it and make a 1 fps contact sheet. usage: autoq.sh 1 2 3 ...
cd /home/user/repo/2d-history; V=jensen-spy/production
for n in "$@"; do
  want=$(python3 -c "print(len([p for p in open('$V/voice/act$n.txt').read().split('\n\n') if p.strip()]))")
  until [ "$(ls $V/voice/act$n/vo-*.wav 2>/dev/null | wc -l)" -ge "$want" ] && ! pgrep -f "act$n.say.txt" >/dev/null; do sleep 20; done
  bash $V/prep_act.sh $n "act $n" || { echo "PREPFAIL $n"; continue; }
  bash shared/render_act.sh jensen-spy $n 2 > /tmp/claude-0/r$n.log 2>&1 || { echo "RENDERFAIL $n"; continue; }
  mkdir -p /tmp/claude-0/sheets; ffmpeg -loglevel error -y -i $V/acts/act$n/act$n.mp4 -vf "fps=1,scale=320:180,tile=8x8" /tmp/claude-0/sheets/q${n}_%02d.jpg
  echo "DONE $n $(date -u +%H:%M)"
done
