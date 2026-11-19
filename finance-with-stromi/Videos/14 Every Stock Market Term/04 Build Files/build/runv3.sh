#!/bin/bash
cd /home/user/w14/build
while [ $(wc -l < /home/user/w14/render/v2/done.txt) -lt 10 ]; do sleep 20; done
echo 4 6 7 1 10 | tr ' ' '\n' | xargs -P 3 -I{} sh -c 'node render14.js {} /home/user/w14/render/v3/act{}.mp4 > /home/user/w14/render/v3/act{}.log 2>&1; echo "act{} exit $?" >> /home/user/w14/render/v3/done.txt'
