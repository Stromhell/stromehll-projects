#!/bin/bash
cd "$(dirname "$0")"
for i in "$@"; do
  PAGE=page_gag$i.html node render.cjs gframes/g$i all 4 > /dev/null 2>gframes_err_$i.txt
  ffmpeg -y -loglevel error -framerate 24 -i gframes/g$i/f%05d.jpg -i ../gags/out/gag$i.wav -c:v libx264 -crf 21 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -ac 2 -af loudnorm=I=-16:TP=-1.5:LRA=11 -shortest -movflags +faststart ../gags/out/gag$i.mp4
  echo "gag $i done $(date +%T)"
done
