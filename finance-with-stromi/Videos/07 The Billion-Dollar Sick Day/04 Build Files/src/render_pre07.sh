#!/bin/bash
# Pre-launch cut (17 Nov): re-render acts 6,7,8 after ch7 rewrite + tense fixes
cd /home/user/work/gt/build; R=/home/user/work/gt/renders
node events07.js && python3 /home/user/work/gt/audio/mix07.py > $R/mix_v3.log 2>&1 &
printf "7 v3\n6 v3\n8 v2\n" | xargs -P 3 -L 1 sh -c 'node render07.js $0 '$R'/act$0_$1.mp4 > '$R'/act$0_$1.log 2>&1'
wait
cd $R; : > list_v4.txt; for i in 0 1 2 3 4 5 6 7 8; do f=$(ls act${i}_v*.mp4 | sort -V | tail -1); echo "file '$R/$f'" >> list_v4.txt; done
ffmpeg -v error -y -i /home/user/work/gt/audio/mix07_v3.wav -af "alimiter=limit=0.6:attack=1:release=60:level=false" /home/user/work/gt/audio/mix07_v3L.wav
ffmpeg -v error -y -f concat -safe 0 -i list_v4.txt -i /home/user/work/gt/audio/mix07_v3L.wav -map 0:v -map 1:a -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 24 -fps_mode cfr -g 48 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$R/Billion-Dollar-Sick-Day-full_v4.mp4"
python3 /mnt/project-files/system/qa/qa_auto.py "$R/Billion-Dollar-Sick-Day-full_v4.mp4" --kind full > $R/qa/full_v4.txt 2>&1 || true
echo DONE > $R/pre.done
