#!/bin/sh
# usage: combine10.sh VER act0file ... act7file
set -e
R=/home/user/work/e10/render; V=$1; shift
cd $R
: > list_$V.txt; for f in "$@"; do echo "file '$R/$f'" >> list_$V.txt; done
ffmpeg -v error -y -i /home/user/work/e10/audio/mix10_v1.wav -af "alimiter=limit=0.6:attack=1:release=60:level=false" /home/user/work/e10/audio/mix10_v1L.wav
ffmpeg -v error -y -f concat -safe 0 -i list_$V.txt -i /home/user/work/e10/audio/mix10_v1L.wav -map 0:v -map 1:a -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$R/10-Saving-Into-Investing-full_$V.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/10-Saving-Into-Investing-full_$V.mp4" --kind full > $R/qa/full_$V.txt 2>&1 || true
echo combined
