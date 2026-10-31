#!/bin/bash
# Join a 2D video's act MP4s (act0..actN in order) into one full video, loudness-normalised to -14 LUFS / -1.5 dBTP (two-pass).
# Usage: combine_full.sh VIDEO_DIR   ->  VIDEO_DIR/production/full/<video>_full.mp4
set -e; V=${1%/}; D=$V/production/full; mkdir -p $D; L=$D/list.txt; : > $L
for f in $(ls $V/production/acts/act*/act*.mp4 | sort -V); do echo "file '$(realpath $f)'" >> $L; done
cat $L
ffmpeg -y -loglevel error -f concat -safe 0 -i $L -c copy $D/joined.mp4
J=$(ffmpeg -hide_banner -i $D/joined.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -loglevel error -i $D/joined.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=7:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,alimiter=limit=0.84:level=false" -ar 48000 -c:a aac -b:a 192k -movflags +faststart $D/$(basename $V)_full.part.mp4
ffmpeg -v error -i $D/$(basename $V)_full.part.mp4 -f null - && mv $D/$(basename $V)_full.part.mp4 $D/$(basename $V)_full.mp4 && rm -f $D/joined.mp4
ffmpeg -hide_banner -i $D/$(basename $V)_full.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary | grep -E "I:|Peak:"
