#!/bin/bash
cd /home/user/work/cc/build
printf "4\n3\n5\n2\n1\n6\n0\n" | xargs -P 4 -I{} sh -c 'node render.js {} /home/user/work/renders/act{}.mp4 > /home/user/work/renders/act{}.log 2>&1'
echo ALLDONE > /home/user/work/renders/ALLDONE
