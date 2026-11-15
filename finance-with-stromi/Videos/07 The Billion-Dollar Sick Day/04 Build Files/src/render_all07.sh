#!/bin/bash
cd /home/user/work/gt/build; mkdir -p /home/user/work/gt/renders; rm -f /home/user/work/gt/renders/ALLDONE
printf "6\n8\n1\n3\n2\n4\n0\n5\n7\n" | xargs -P 4 -I{} sh -c 'node render07.js {} /home/user/work/gt/renders/act{}_v1.mp4 > /home/user/work/gt/renders/act{}.log 2>&1'
echo ALLDONE > /home/user/work/gt/renders/ALLDONE
