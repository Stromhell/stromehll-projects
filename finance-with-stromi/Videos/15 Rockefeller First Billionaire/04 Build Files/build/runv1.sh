#!/bin/bash
cd /home/user/w15/build
echo 5 9 0 3 10 6 7 8 11 1 2 4 | tr ' ' '\n' | xargs -P 3 -I{} sh -c 'node render15.js {} /home/user/w15/render/v1/act{}.mp4 > /home/user/w15/render/v1/act{}.log 2>&1; echo "act{} exit $?" >> /home/user/w15/render/v1/done.txt'
