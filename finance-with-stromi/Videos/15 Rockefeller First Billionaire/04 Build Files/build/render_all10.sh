#!/bin/sh
cd /home/user/work/e10/build
printf '%s\n' 1 3 5 6 0 2 4 7 | xargs -P4 -I{} sh -c 'node render10.js {} ../render/act{}_v1.mp4 > ../render/log{}.txt 2>&1; echo act{} done $(date +%H:%M)'
echo ALLDONE
