#!/bin/bash
cd /home/user/work/bo/build
printf "4\n3\n5\n6\n2\n1\n0\n" | xargs -P 4 -I{} sh -c 'node render.js {} /home/user/work/bo/renders/act{}.mp4 > /home/user/work/bo/renders/act{}.log 2>&1'
echo ALLDONE > /home/user/work/bo/renders/ALLDONE
