#!/bin/sh
cd /home/user/work/e10/build
node render10.js 4 ../render/seg4_v3.mp4 1491 1956 > ../render/logseg4c.txt 2>&1
ffmpeg -v error -y -i ../render/act4_v2.mp4 -i ../render/seg4_v3.mp4 -filter_complex "[0:v]trim=end_frame=1491,setpts=PTS-STARTPTS[a];[0:v]trim=start_frame=1956,setpts=PTS-STARTPTS[c];[a][1:v][c]concat=n=3:v=1[v]" -map "[v]" -c:v libx264 -preset veryfast -crf 16 -pix_fmt yuv420p -r 24 ../render/act4_v3.mp4
python3 /mnt/project-files/system/qa/qa_auto.py ../render/act4_v3.mp4 --kind act > ../render/qa/act4_v3.txt 2>&1; echo act4 v3 $(grep -c "| FAIL" ../render/qa/act4_v3.txt) FAIL
