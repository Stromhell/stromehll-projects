#!/bin/bash
cd "$(dirname "$0")"
enc() { ffmpeg -y -loglevel error -framerate 24 -i $1/f%05d.jpg -i $2 -c:v libx264 -crf 21 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -ac 2 -af loudnorm=I=-16:TP=-1.5:LRA=11 -shortest -movflags +faststart $3; }
for a in "$@"; do
  if [ $a = film ]; then PAGE=page.html node render.cjs frames all 4 > render_film.log 2>&1; enc frames mix.wav acts_v2/film.mp4
  else n=${a#ep}; mx=$(ls $a/mix*.wav | head -1); PAGE=page_$a.html node render.cjs $a/frames all 4 > $a/render2.log 2>&1; enc $a/frames $mx acts_v2/$a.mp4; fi
  echo "$a done $(date +%T)"
done
