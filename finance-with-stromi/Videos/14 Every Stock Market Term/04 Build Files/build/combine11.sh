#!/bin/sh
# usage: combine11.sh VER act0file ... act8file
set -e
R=/home/user/work/e11/render; A=/home/user/work/e11/audio; V=$1; shift
cd $R
: > list_$V.txt; for f in "$@"; do echo "file '$R/$f'" >> list_$V.txt; done
ffmpeg -v error -y -i $A/mix11_v1.wav -af "alimiter=limit=0.63:attack=1:release=60:level=false" $A/mix11_v1L.wav
ffmpeg -v error -y -f concat -safe 0 -i list_$V.txt -i $A/mix11_v1L.wav -map 0:v -map 1:a -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 256k -ar 48000 -movflags +faststart -shortest "$R/11-Retire-in-10-Years-full_$V.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/11-Retire-in-10-Years-full_$V.mp4" --kind full > $R/qa/full_$V.txt 2>&1 || true
echo combined
