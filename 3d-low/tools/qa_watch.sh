#!/bin/bash
# Watch-check a render the way the project rule asks: /watch (local engine) scene-change frames PLUS
# one frame per second, tiled into 4x4 contact sheets so a Fable 5.1 reviewer can read every sheet.
# Usage: qa_watch.sh VIDEO.mp4 TAG   -> prints sheet paths. Env: QA_DIR (default /tmp/qa), WATCH_PY (watch.py path, optional)
set -e
V=$1; TAG=$2; S=${QA_DIR:-/tmp/qa}; mkdir -p $S/$TAG; rm -f $S/$TAG/*.jpg
# 1) one frame per second
ffmpeg -v error -y -i "$V" -vf "fps=1,scale=480:270,drawtext=text='%{pts\:hms}':x=w-tw-6:y=h-th-6:fontsize=16:fontcolor=yellow:box=1:boxcolor=black@0.6" $S/$TAG/f%04d.jpg
# 2) /watch scene-change frames, when the tool is available
if [ -n "$WATCH_PY" ] && [ -f "$WATCH_PY" ]; then
  out=$(timeout 300 python3 "$WATCH_PY" "$V" --engine local --question "glitches, overlaps, gliding walkers, props through people, text over subtitles, blocky scenes" 2>&1) || true
  wd=$(echo "$out" | grep -oE "/tmp/watch-[a-z0-9_]+" | head -1)
  [ -n "$wd" ] && i=0 && for f in $wd/frames/*.jpg; do i=$((i+1)); ffmpeg -v error -y -i "$f" -vf "scale=480:270,drawtext=text='watch $i':x=6:y=6:fontsize=16:fontcolor=cyan:box=1:boxcolor=black@0.6" $S/$TAG/s$(printf %04d $i).jpg; done 2>/dev/null
fi
# 3) tile 16 per sheet
ls $S/$TAG/*.jpg | split -l 16 - $S/$TAG/list_
n=0; for l in $S/$TAG/list_*; do n=$((n+1)); c=$(wc -l < $l)
  args=$(sed 's/^/-i /' $l | tr '\n' ' ')
  fc=""; for k in $(seq 0 $((c-1))); do fc="$fc[$k]"; done
  lay=""; for k in $(seq 0 $((c-1))); do lay="$lay$(( (k%4)*480 ))_$(( (k/4)*270 ))"; [ $k -lt $((c-1)) ] && lay="$lay|"; done
  if [ $c -gt 1 ]; then ffmpeg -v error -y $args -filter_complex "${fc}xstack=inputs=$c:layout=$lay:fill=black" -frames:v 1 $S/${TAG}_sheet$n.jpg; else cp $(cat $l) $S/${TAG}_sheet$n.jpg; fi
  echo $S/${TAG}_sheet$n.jpg
done
rm -f $S/$TAG/list_*
echo "frames=$(ls $S/$TAG/*.jpg | wc -l) sheets=$n"
