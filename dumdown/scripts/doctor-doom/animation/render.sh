#!/bin/bash
# render.sh act00 ... -> $SCR/out/NAME.mp4 (silent video; audio muxed at mix stage)
cd "$(dirname "$0")"; SCR=${SCR:-/tmp/ddwork}; F=$SCR/frames; mkdir -p $SCR/out $F
for i in "$@"; do
  bash mkpage.sh $i; rm -rf $F/$i; PAGE=page_$i.html node render.cjs $F/$i all ${W:-4} > $F/log_$i.txt 2>&1
  grep -h ERR $F/log_$i.txt | sort | uniq -c | head
  ffmpeg -y -loglevel error -framerate 24 -i $F/$i/f%05d.jpg -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -r 24 $SCR/out/$i.mp4 && rm -rf $F/$i
  echo "$i done $(date +%T)"
done
