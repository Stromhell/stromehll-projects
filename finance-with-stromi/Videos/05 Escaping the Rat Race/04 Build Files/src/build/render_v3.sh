#!/bin/bash
cd /home/user/work/rr/build
printf "2\n0\n6\n4\n" | xargs -P 4 -I{} sh -c 'node render.js {} /home/user/work/rr/renders/act{}_v3.mp4 > /home/user/work/rr/renders/act{}_v3.log 2>&1'
for i in 0 2 4 6; do python3 /mnt/project-files/system/qa/qa_auto.py /home/user/work/rr/renders/act${i}_v3.mp4 --kind act > /home/user/work/rr/renders/qa/act${i}_v3.txt 2>&1; done
