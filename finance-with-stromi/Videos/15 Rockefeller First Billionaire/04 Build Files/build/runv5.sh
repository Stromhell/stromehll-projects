#!/bin/bash
cd /home/user/w15/build
mkdir -p /home/user/w15/render/v5
echo 5 3 9 6 2 7 10 11 0 8 4 | tr ' ' '\n' | xargs -P 3 -I{} sh -c 'node render15.js {} /home/user/w15/render/v5/act{}.mp4 > /home/user/w15/render/v5/act{}.log 2>&1; echo "act{} exit $?" >> /home/user/w15/render/v5/done.txt'
