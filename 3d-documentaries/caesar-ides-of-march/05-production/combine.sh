#!/bin/bash
# combine acts 0-7 -> /home/user/work/cae_full/caesar_full.mp4 (-14 LUFS)
set -e
A=/home/user/work/cae_acts; O=/home/user/work/cae_full; cd $O; : > list.txt
for i in 0 1 2 3 4 5 6 7; do
  n=$(ffprobe -v error -count_packets -select_streams v:0 -show_entries stream=nb_read_packets -of csv=p=0 $A/act$i.mp4)
  d=$(python3 -c "print(f'{$n/24:.4f}')"); fo=$(python3 -c "print(f'{$n/24-0.06:.4f}')")
  ffmpeg -loglevel error -y -i $A/act$i.mp4 -map 0:v -map 0:a -c:v copy -af "atrim=0:$d,apad,atrim=0:$d,afade=t=in:d=0.03,afade=t=out:st=$fo:d=0.06" -c:a pcm_s16le -ar 48000 a$i.mov
  echo "file 'a$i.mov'" >> list.txt; echo "act $i $d s"
done
ffmpeg -loglevel error -y -f concat -safe 0 -i list.txt -c:v copy -c:a pcm_s16le cat.mov
J=$(ffmpeg -hide_banner -i cat.mov -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p')
g(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -loglevel error -y -i cat.mov -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000" -c:a aac -b:a 192k -movflags +faststart caesar_full.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 caesar_full.mp4
