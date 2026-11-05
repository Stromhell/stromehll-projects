#!/bin/bash
# Records narration for every video listed in .state/voice_queue (one folder name per line).
# voice_batch.py skips acts already recorded, so a restart picks up where it stopped.
W=/home/user/w2d; S=$W/.state; cd $W
for v in $(cat $S/voice_queue 2>/dev/null); do
  [ -f $S/voice_$v ] && continue
  python3 shared/voice_batch.py $v >> /tmp/claude-0/voice_dd.log 2>&1
  ok=1; for t in $v/production/voice/act*.txt; do case $t in *.say.txt) continue;; esac
    n=$(python3 -c "print(len([p for p in open('$t').read().split(chr(10)*2) if p.strip()]))"); have=$(ls ${t%.txt}/vo-*.wav 2>/dev/null | wc -l)
    [ $have -ge $n ] || ok=0; done
  [ $ok = 1 ] && { touch $S/voice_$v; echo "$(date -u +%H:%M) DONE voice_$v" >> $S/events.log; }
done
