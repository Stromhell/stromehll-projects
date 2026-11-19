#!/bin/sh
cd /home/user/w14/build
echo 4 7 6 10 0 5 1 2 3 8 9 11 | tr ' ' '\n' | xargs -P 3 -I{} sh -c 'node render14.js {} /home/user/w14/render/v1/act{}.mp4 > /home/user/w14/render/v1/act{}.log 2>&1; echo "act{} exit $?" >> /home/user/w14/render/v1/done.txt'
