#!/bin/bash
# Join a 2D video's act MP4s (act0..actN in order) into one full video.
# Video: stream copy. Audio: each act decoded, trimmed/padded to its exact video length (sample-accurate, no drift),
# short fades at act edges (no dropouts), joined, two-pass loudnorm to -14 LUFS / -1.5 dBTP, stereo, encoded once.
# Usage: combine_full.sh VIDEO_DIR   ->  VIDEO_DIR/production/full/<video>_full.mp4
set -e; V=${1%/}; N=$(basename $V); D=$V/production/full; W=$D/tmp; mkdir -p $W; L=$D/list.txt; A=$W/alist.txt; : > $L; : > $A; i=0
for f in $(ls $V/production/acts/act*/act*.mp4 | sort -V); do
  echo "file '$(realpath $f)'" >> $L
  fr=$(ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 $f); dur=$(python3 -c "print($fr/30)")
  ffmpeg -y -loglevel error -i $f -vn -af "aresample=48000,apad,atrim=0:$dur,afade=t=in:d=0.06,afade=t=out:st=$(python3 -c "print(max(0,$dur-0.2))"):d=0.2" -ac 1 -c:a pcm_s16le $W/a$i.wav
  echo "file '$(realpath $W/a$i.wav)'" >> $A; echo "act $i: $fr frames = ${dur}s"; i=$((i+1)); done
ffmpeg -y -loglevel error -f concat -safe 0 -i $L -an -c copy $W/v.mp4
ffmpeg -y -loglevel error -f concat -safe 0 -i $A -af 'pan=stereo|c0=c0|c1=c0' -c:a pcm_s16le $W/a.wav
J=$(ffmpeg -hide_banner -i $W/a.wav -af loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -loglevel error -i $W/v.mp4 -i $W/a.wav -map 0:v -map 1:a -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=7:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,alimiter=limit=0.84:level=false,aresample=48000" -c:a aac -b:a 192k -shortest -movflags +faststart $D/${N}_full.part.mp4
ffmpeg -v error -i $D/${N}_full.part.mp4 -f null - && mv $D/${N}_full.part.mp4 $D/${N}_full.mp4 && rm -rf $W
ffprobe -v error -show_entries format=duration -of csv=p=0 $D/${N}_full.mp4
ffmpeg -hide_banner -i $D/${N}_full.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary | grep -E "I:|Peak:"
