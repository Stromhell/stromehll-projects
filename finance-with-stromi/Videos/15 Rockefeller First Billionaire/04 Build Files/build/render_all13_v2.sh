#!/bin/sh
cd /home/user/w13/build
printf '%s\n' 1 2 4 5 3 0 6 7 | xargs -P4 -I{} sh -c 'node render13.js {} ../renders/act{}_v2.mp4 > ../renders/log{}_v2.txt 2>&1; echo act{} done $(date +%H:%M)'
echo ALLDONE
