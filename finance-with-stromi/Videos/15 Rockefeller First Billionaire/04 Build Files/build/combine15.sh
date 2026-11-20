#!/bin/sh
# usage: combine15.sh VER act0file ... act11file (paths relative to /home/user/w15/render)
set -e
R=/home/user/w15/render; A=/home/user/w15/audio; V=$1; shift
cd $R; mkdir -p qa
: > list_$V.txt; for f in "$@"; do echo "file '$R/$f'" >> list_$V.txt; done
ffmpeg -v error -y -f concat -safe 0 -i list_$V.txt -i $A/mix15_v1.wav -map 0:v -map 1:a -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 256k -ar 48000 -movflags +faststart -shortest "$R/15-Rockefeller-full_$V.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/15-Rockefeller-full_$V.mp4" --kind full > $R/qa/full_$V.txt 2>&1 || true
echo combined
