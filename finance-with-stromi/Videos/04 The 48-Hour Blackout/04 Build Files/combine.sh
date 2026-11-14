#!/bin/sh
set -e
R=/home/user/work/bo/renders
cd $R
: > list.txt; for i in 0 1 2 3 4 5 6; do echo "file '$R/act$i.mp4'" >> list.txt; done
ffmpeg -v error -y -f concat -safe 0 -i list.txt -i /home/user/work/bo/audio/bo_mix.wav -map 0:v -map 1:a -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$R/The-48-Hour-Blackout-full.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/The-48-Hour-Blackout-full.mp4" --kind full > $R/qa/full.txt 2>&1 || true
echo COMBINED > $R/COMBINED
