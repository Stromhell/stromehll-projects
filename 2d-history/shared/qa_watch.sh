#!/bin/bash
# usage: qa.sh VIDEO.mp4 TAG -> runs /watch (local engine), tiles its frames into 4x4 sheets, prints sheet paths
S=${QA_DIR:-/tmp/qa}; mkdir -p $S; W=${WATCH_PY:-$S/cv/.claude/skills/watch/scripts/watch.py}
out=$(timeout 300 python3 $W "$1" --engine local --question "glitches, overlaps, floating props, gliding walkers, labels over subtitles or faces, blocky scenes" 2>&1)
wd=$(echo "$out" | grep -oE "/tmp/watch-[a-z0-9_]+" | head -1)
n=$(ls $wd/frames/*.jpg | wc -l); rm -f $S/qa_$2_*.jpg
ls $wd/frames/*.jpg | split -l 16 - $S/qa_list_$2_
i=0; for l in $S/qa_list_$2_*; do i=$((i+1)); ffmpeg -v error -y $(sed 's/^/-i /' $l | tr '\n' ' ') -filter_complex "$(c=$(wc -l <$l); for k in $(seq 0 $((c-1))); do printf "[$k]scale=480:270,drawtext=text='%s':x=4:y=4:fontsize=18:fontcolor=yellow:box=1:boxcolor=black[v$k];" "$(basename $(sed -n "$((k+1))p" $l) .jpg)"; done; for k in $(seq 0 $((c-1))); do printf "[v$k]"; done; printf "xstack=inputs=$c:layout="; for k in $(seq 0 $((c-1))); do printf "%s" "$(( (k%4)*480 ))_$(( (k/4)*270 ))"; [ $k -lt $((c-1)) ] && printf "|"; done)" -frames:v 1 $S/qa_$2_$i.jpg 2>&1 | tail -1; echo $S/qa_$2_$i.jpg; done
rm -f $S/qa_list_$2_*; echo "frames=$n watchdir=$wd"
