#!/bin/bash
# When an act's narration is fully recorded and its page was built on placeholder timing ("fake":true),
# rebuild the real timing with wt.py and mark the act READY so the pipeline renders it. Runs every 60 s.
# After a machine restart:  cd /home/user/w2d && setsid nohup bash shared/autoready_dd.sh >/dev/null 2>&1 &
W=/home/user/w2d; S=$W/.state; cd $W
exec 8>$S/autoready.lock; flock -n 8 || exit 0
log(){ echo "$(date -u +%H:%M) AUTOREADY $*" >> $S/events.log; }
while true; do
  for v in $(cat $S/voice_queue 2>/dev/null); do
    for d in $v/production/acts/act*/; do a=$(basename $d); n=${a#act}
      [ -f $d/act.html ] || continue; [ -f $d/READY ] && continue; grep -q '"fake": true' $d/timing.js 2>/dev/null || continue
      t=$v/production/voice/act$n.txt; [ -f $t ] || continue
      need=$(python3 -c "print(len([p for p in open('$t').read().split(chr(10)*2) if p.strip()]))"); have=$(ls $v/production/voice/act$n/vo-*.wav 2>/dev/null | wc -l)
      [ $have -ge $need ] || continue
      if python3 shared/wt.py $v $n >> /tmp/claude-0/autoready.log 2>&1 && [ -s $d/timing.json ] && { echo "window.TIMING = $(cat $d/timing.json);" > $d/timing.js; ! grep -q '"fake": true' $d/timing.js; }; then touch $d/READY; log "$v act $n: real timing built, READY"; else log "$v act $n: wt.py failed"; fi
    done
  done
  sleep 60
done
