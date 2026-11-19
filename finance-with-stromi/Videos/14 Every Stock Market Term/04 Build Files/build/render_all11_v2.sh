#!/bin/sh
cd /home/user/work/e11/build
printf '%s\n' 6 4 2 5 0 3 7 8 1 | xargs -P4 -I{} sh -c 'node render11.js {} ../render/act{}_v2.mp4 > ../render/log{}_v2.txt 2>&1; echo act{} done $(date +%H:%M)'
echo ALLDONE
