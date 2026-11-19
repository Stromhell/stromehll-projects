#!/bin/sh
set -e
R=/home/user/w12/render; A=/home/user/w12/audio; V=v3
while pgrep -f "render12.js 4" >/dev/null; do sleep 20; done
cd $R
ffmpeg -v error -y -i act4_v1.mp4 -i p4_D24.mp4 -filter_complex "[0:v]trim=end_frame=66,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[0:v]trim=start_frame=664,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0[o]" -map "[o]" -c:v libx264 -preset veryfast -crf 16 -pix_fmt yuv420p -r 24 act4_v2.mp4
: > list_$V.txt; for f in act0_v2 act1_v1 act2_v2 act3_v1 act4_v2 act5_v1 act6_v1 act7_v2 act8_v1; do echo "file '$R/$f.mp4'" >> list_$V.txt; done
[ -f $A/mix12_v1L.wav ] && [ $(stat -c%s $A/mix12_v1L.wav) -gt 100000000 ] || ffmpeg -v error -y -i $A/mix12_v1.wav -af "alimiter=limit=0.63:attack=1:release=60:level=false" $A/mix12_v1L.wav
ffmpeg -v error -y -f concat -safe 0 -i list_$V.txt -i $A/mix12_v1L.wav -map 0:v -map 1:a -vf "curves=all='0/0 0.06/0.10 0.2/0.29 0.5/0.6 1/1',scale=1920:1080:flags=lanczos" -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 256k -ar 48000 -movflags +faststart -shortest "$R/12-US-Debt-full_$V.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/12-US-Debt-full_$V.mp4" --kind full > $R/qa/full_$V.txt 2>&1 || true
echo pipeline done
