#!/bin/bash
cd /home/user/w14/build
until [ "$(wc -l < /home/user/w14/render/v2/done.txt 2>/dev/null || echo 0)" -ge 3 ]; do sleep 20; done
echo 5 2 9 3 8 | tr ' ' '\n' | xargs -P 2 -I{} sh -c 'node render14.js {} /home/user/w14/render/v2/act{}.mp4 > /home/user/w14/render/v2/act{}.log 2>&1; echo "act{} exit $?" >> /home/user/w14/render/v2/done.txt'
