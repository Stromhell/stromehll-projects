#!/bin/sh
set -e
R=/home/user/work/rr/renders
cd $R
: > list_v4.txt; for i in 0 1 2 3 4 5 6 7; do case $i in 0|2|4|6) f=act${i}_v3.mp4;; *) f=act${i}_v2.mp4;; esac; echo "file '$R/$f'" >> list_v4.txt; done
ffmpeg -v error -y -i /home/user/work/rr/audio/rr_mix_v4.wav -af "alimiter=limit=0.6:attack=1:release=60:level=false" /home/user/work/rr/audio/rr_mix_v4L.wav
ffmpeg -v error -y -f concat -safe 0 -i list_v4.txt -i /home/user/work/rr/audio/rr_mix_v4L.wav -map 0:v -map 1:a -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$R/Escaping-the-Rat-Race-full_v4.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/Escaping-the-Rat-Race-full_v4.mp4" --kind full > $R/qa/full_v4.txt 2>&1 || true
