#!/bin/sh
# re-render fixed shot ranges as segments, then splice into act*_v2.mp4 (v1 kept)
cd /home/user/work/e10/build
printf '%s\n' "2 494 1871" "4 659 1492" "3 1118 1775" "5 1208 1676" "1 2422 2931" "0 844 1197" | xargs -P4 -I{} sh -c 'set -- {}; node render10.js $1 ../render/seg$1_v2.mp4 $2 $3 > ../render/logseg$1.txt 2>&1;
 ffmpeg -v error -y -i ../render/act$1_v1.mp4 -i ../render/seg$1_v2.mp4 -filter_complex "[0:v]trim=end_frame=$2,setpts=PTS-STARTPTS[a];[0:v]trim=start_frame=$3,setpts=PTS-STARTPTS[c];[a][1:v][c]concat=n=3:v=1[v]" -map "[v]" -c:v libx264 -preset veryfast -crf 16 -pix_fmt yuv420p -r 24 ../render/act$1_v2.mp4;
 python3 /mnt/project-files/system/qa/qa_auto.py ../render/act$1_v2.mp4 --kind act > ../render/qa/act$1_v2.txt 2>&1; echo act$1 v2 $(grep -c "| FAIL" ../render/qa/act$1_v2.txt) FAIL $(date +%H:%M)'
echo ALLDONE
