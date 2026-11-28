#!/bin/bash
# v9 resumable render: 12 s chunks with 4x sub-frame motion blur, each kept as its own file so a restart only loses one chunk.
# usage: bash render_chunks.sh WORKDIR   -> WORKDIR/video.mp4 (+ cues)
H=$(cd "$(dirname "$0")" && pwd); W=$1; mkdir -p $W/chunks; T=163.3; C=12; i=0
: > $W/list.txt
while python3 -c "import sys;sys.exit(0 if $i*$C < $T else 1)"; do
  a=$((i*C)); b=$(python3 -c "print(min($T,($i+1)*$C))"); f=$W/chunks/c$(printf %02d $i).mp4
  if [ ! -s $f ]; then rm -rf /tmp/v9chunk; node $H/render_film.js /tmp/v9chunk --sub 4 --from $a --to $b > $W/chunk.log 2>&1 && cp /tmp/v9chunk/video.mp4 $f.tmp && mv $f.tmp $f && cp -n /tmp/v9chunk/*.cues.json $W/ 2>/dev/null; echo "chunk $i done $(date +%H:%M:%S)"; fi
  [ -s $f ] || { echo "chunk $i FAILED"; tail -5 $W/chunk.log; exit 1; }
  echo "file '$f'" >> $W/list.txt; i=$((i+1))
done
ffmpeg -y -loglevel error -f concat -safe 0 -i $W/list.txt -c copy $W/video.mp4 && echo ALL DONE
