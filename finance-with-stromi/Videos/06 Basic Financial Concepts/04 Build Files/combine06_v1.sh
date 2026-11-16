#!/bin/sh
set -e
R=/home/user/work/bf/render
cd $R
: > list_v1.txt; for i in 0 1 2 3 4 5 6 7 8 9 10 11; do case $i in 1) f=act1_v3.mp4;; 3) f=act3_v3.mp4;; 5|6|8) f=act${i}_v2.mp4;; *) f=act${i}.mp4;; esac; echo "file '$R/$f'" >> list_v1.txt; done
ffmpeg -v error -y -i /home/user/work/bf/audio/mix06_v1.wav -af "alimiter=limit=0.6:attack=1:release=60:level=false" /home/user/work/bf/audio/mix06_v1L.wav
ffmpeg -v error -y -f concat -safe 0 -i list_v1.txt -i /home/user/work/bf/audio/mix06_v1L.wav -map 0:v -map 1:a -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$R/06-Basic-Financial-Concepts-full_v1.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/06-Basic-Financial-Concepts-full_v1.mp4" --kind full > $R/qa/full_v1.txt 2>&1 || true
echo combined
