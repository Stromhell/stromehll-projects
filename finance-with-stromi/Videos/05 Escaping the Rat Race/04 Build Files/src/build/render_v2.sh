#!/bin/bash
cd /home/user/work/rr/build
printf "7\n5\n2\n1\n3\n4\n6\n" | xargs -P 4 -I{} sh -c 'node render.js {} /home/user/work/rr/renders/act{}_v2.mp4 > /home/user/work/rr/renders/act{}_v2.log 2>&1'
for i in 1 2 3 4 5 6 7; do python3 /mnt/project-files/system/qa/qa_auto.py /home/user/work/rr/renders/act${i}_v2.mp4 --kind act > /home/user/work/rr/renders/qa/act${i}_v2.txt 2>&1; done
echo DONE > /home/user/work/rr/renders/V2DONE
