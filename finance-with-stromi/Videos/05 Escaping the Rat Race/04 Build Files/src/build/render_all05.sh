#!/bin/bash
cd /home/user/work/rr/build; mkdir -p /home/user/work/rr/renders
printf "5\n7\n1\n3\n2\n4\n0\n6\n" | xargs -P 4 -I{} sh -c 'node render.js {} /home/user/work/rr/renders/act{}.mp4 > /home/user/work/rr/renders/act{}.log 2>&1'
echo ALLDONE > /home/user/work/rr/renders/ALLDONE
