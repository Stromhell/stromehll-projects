#!/bin/bash
cd /home/user/w14/build
echo 4 6 7 1 10 11 | tr ' ' '\n' | xargs -P 3 -I{} sh -c 'node render14.js {} /home/user/w14/render/v2/act{}.mp4 > /home/user/w14/render/v2/act{}.log 2>&1; echo "act{} exit $?" >> /home/user/w14/render/v2/done.txt'
