#!/bin/bash
# render_acts.sh 00 01 ... -> $SCR/acts/actNN.mp4 (frames in scratch, mixed audio from $SCR/mix)
cd "$(dirname "$0")"; SCR=${SCR:-/tmp/dp2work}; F=$SCR/aframes; mkdir -p $SCR/acts $F
for i in "$@"; do
  bash mkpage.sh $i; rm -rf $F/a$i; PAGE=page_act$i.html node render.cjs $F/a$i all 4 > /dev/null 2>$F/err_$i.txt
  ffmpeg -y -loglevel error -framerate 24 -i $F/a$i/f%05d.jpg -i $SCR/mix/act$i.wav -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -r 24 -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest $SCR/acts/act$i.mp4 && rm -rf $F/a$i
  echo "act $i done $(date +%T)"
done
