#!/bin/bash
# render_gags.sh 01 02 ... -> gags/out/gagNN.mp4 (frames in scratch)
cd "$(dirname "$0")"; F=/tmp/dp2work/gframes
for i in "$@"; do
  rm -rf $F/g$i; PAGE=page_gag$i.html node render.cjs $F/g$i all 2 > /dev/null 2>$F/err_$i.txt
  ffmpeg -y -loglevel error -framerate 24 -i $F/g$i/f%05d.jpg -i gags/out/gag$i.wav -vf scale=1920:1080 -c:v libx264 -crf 18 -pix_fmt yuv420p -r 24 -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest gags/out/gag$i.mp4 && rm -rf $F/g$i
  echo "gag $i done $(date +%T)"
done
