#!/bin/sh
set -e
R=/home/user/work/rr/renders
cd $R

: > list.txt; for i in 0 1 2 3 4 5 6 7; do f=act$i.mp4; [ $i -gt 0 ] && f=act${i}_v2.mp4; echo "file '$R/$f'" >> list.txt; done
ffmpeg -v error -y -f concat -safe 0 -i list.txt -i /home/user/work/rr/audio/rr_mix_v2.wav -map 0:v -map 1:a -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$R/Escaping-the-Rat-Race-full_v2.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/Escaping-the-Rat-Race-full_v2.mp4" --kind full > $R/qa/full_v2.txt 2>&1 || true
echo COMBINED > $R/COMBINED
