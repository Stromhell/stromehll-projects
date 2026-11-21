#!/bin/bash
# sample.sh NN [step] : render every step-th frame of act NN at half res and build /tmp/si/qa/aNN.jpg
N=$1; S=${2:-40}; cd /tmp/si/anim; cp acts_si/act$N.js acts/act$N.js 2>/dev/null
bash mkpage.sh $N >/dev/null || exit 1
NF=$(python3 -c "import json;d=json.load(open('/tmp/siwork/vo/act$N.json'));print(int((sum(d['durs'])+d['gap']*len(d['durs'])+1.5)*24))")
rm -rf /tmp/si/qa/a$N; PAGE=page_act$N.html node render.cjs /tmp/si/qa/a$N "$(seq -s, 10 $S $NF)" 2 2>&1 | grep -iE "error|fail" | head -5
/tmp/si/qa/sheet.sh /tmp/si/qa/a$N /tmp/si/qa/a$N.jpg 5
