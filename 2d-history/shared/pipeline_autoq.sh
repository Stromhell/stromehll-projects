#!/bin/bash
# when an act's narration is complete and its act.html exists, build timing and queue the render (once)
cd /home/user/stromehll-projects/2d-history
while true; do
  . shared/pipeline.conf
  for v in $ACTIVE; do
    for t in $v/production/voice/act*.txt; do
      case $t in *.say.txt) continue;; esac
      n=$(basename $t .txt | sed 's/act//'); a=$v/production/acts/act$n
      [ -f $a/act.html ] || continue; [ -f $a/.queued ] && continue
      need=$(awk 'BEGIN{RS=""}{c++}END{print c}' $t); have=$(ls $v/production/voice/act$n/vo-*.wav 2>/dev/null | wc -l)
      [ "$have" -ge "$need" ] || continue
      python3 shared/wt.py $v $n --check > $a/wt.log 2>&1 && (printf 'window.TIMING='; cat $a/timing.json) > $a/timing.js || continue
      D=$(python3 -c "import json;print(json.load(open('$a/timing.json'))['dur'])"); T=$(python3 -c "d=$D;print(','.join(str(round(d*k/9,1)) for k in range(1,9)))")
      node shared/snap.js $a/act.html /tmp/claude-0/snap_${v}_$n.jpg $T > $a/snap.log 2>&1
      if grep -qiE "error|undefined is not|cannot read" $a/snap.log; then touch $a/.queued; echo "$(date +%H:%M) SNAPFAIL $v $n" >> /tmp/claude-0/rq.log; continue; fi
      echo "$v $n" >> /tmp/claude-0/rq.txt && touch $a/.queued && echo "$(date +%H:%M) queued $v $n" >> /tmp/claude-0/rq.log
    done
  done
  sleep 60
done
