#!/bin/bash
# render acts in order then make a 1 fps contact sheet each. usage: runq.sh 1 2 3
cd /home/user/stromehll-projects/2d-history
for n in "$@"; do bash hackers-2/production/acts/mk.sh $n "act $n" && bash shared/render_act.sh hackers-2 $n 3 && ffmpeg -loglevel error -y -i hackers-2/production/acts/act$n/act$n.mp4 -vf "fps=1,scale=320:180,tile=8x8" -frames:v 1 /tmp/claude-0/sheets/q$n.jpg && echo "SHEET $n"; done
