#!/bin/sh
# Pushpam 18 Nov feedback: Wren hand clipping table (S01,S09,S21,S22), bigger plan note + label maker moved (S40). Acts -> _v3
cd /home/user/work/e10/build
printf '%s\n' "3 1846 3040 v2" "1 1989 2423 v2" "0 0 491 v2" "7 72 922 v2" | xargs -P4 -I{} sh -c 'set -- {}; node render10.js $1 ../render/seg$1_v3.mp4 $2 $3 > ../render/logseg$1d.txt 2>&1;
 if [ $2 -eq 0 ]; then F="[1:v][0:v]trim=start_frame=$3,setpts=PTS-STARTPTS[c];"; F="[0:v]trim=start_frame=$3,setpts=PTS-STARTPTS[c];[1:v][c]concat=n=2:v=1[v]"; else F="[0:v]trim=end_frame=$2,setpts=PTS-STARTPTS[a];[0:v]trim=start_frame=$3,setpts=PTS-STARTPTS[c];[a][1:v][c]concat=n=3:v=1[v]"; fi;
 ffmpeg -v error -y -i ../render/act$1_$4.mp4 -i ../render/seg$1_v3.mp4 -filter_complex "$F" -map "[v]" -c:v libx264 -preset veryfast -crf 16 -pix_fmt yuv420p -r 24 ../render/act$1_v3.mp4;
 python3 /mnt/project-files/system/qa/qa_auto.py ../render/act$1_v3.mp4 --kind act > ../render/qa/act$1_v3.txt 2>&1; echo act$1 v3 $(grep -c "| FAIL" ../render/qa/act$1_v3.txt) FAIL $(date +%H:%M)'
echo ALLDONE
