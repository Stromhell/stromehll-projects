#!/bin/bash
# join acts 0-6: video stream-copied, audio per act trimmed to the picture length, then 2-pass loudnorm to -14 LUFS
set -e; cd /home/user/work/xmas/acts; mkdir -p full; : > full/v.list; ins=(); f=""
for A in 0 1 2 3 4 5 6; do
  n=$(ffprobe -v error -count_packets -select_streams v:0 -show_entries stream=nb_read_packets -of csv=p=0 act$A.mp4); d=$(python3 -c "print($n/24)")
  echo "file '$PWD/act$A.picture.mp4'" >> full/v.list
  ffmpeg -y -loglevel error -i act$A.mp4 -vn -af "atrim=0:$d,afade=t=in:d=0.05,afade=t=out:st=$(python3 -c "print($d-0.08)"):d=0.08,apad=whole_dur=$d" -ar 48000 -ac 2 full/a$A.wav
  ins+=(-i full/a$A.wav)
done
ffmpeg -y -loglevel error -f concat -safe 0 -i full/v.list -c copy full/v.mp4
ffmpeg -y -loglevel error "${ins[@]}" -filter_complex "concat=n=7:v=0:a=1[a]" -map "[a]" full/a.wav
J=$(ffmpeg -i full/a.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -loglevel error -i full/a.wav -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true" -ar 48000 full/an.wav
ffmpeg -y -loglevel error -i full/v.mp4 -i full/an.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart full/XM_FULL.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 full/XM_FULL.mp4
