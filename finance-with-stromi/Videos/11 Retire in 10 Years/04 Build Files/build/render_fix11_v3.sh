#!/bin/sh
cd /home/user/work/e11/build
printf '%s\n' 6 0 | xargs -P2 -I{} sh -c 'node render11.js {} ../render/act{}_v3.mp4 > ../render/log{}_v3.txt 2>&1; echo act{} done $(date +%H:%M)'
echo ALLDONE
