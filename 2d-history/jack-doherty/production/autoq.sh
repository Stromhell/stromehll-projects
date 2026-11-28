#!/bin/bash
# Wait for each act's voice clips, then time + build + render it. Usage: bash autoq.sh 1,2,3,4,5,6
cd "$(dirname "$0")/../.."; V=jack-doherty
TITLES=("Cold open" "Kicked Out for a Living" "The Bodyguard Years" "The McLaren" "Second Chances" "Banned From Golf" "Paid to Disappear")
for n in ${1//,/ }; do
  need=$(python3 -c "print(len([p for p in open('$V/production/voice/act$n.txt').read().split('\n\n') if p.strip()]))")
  until [ "$(ls $V/production/voice/act$n/vo-*.wav 2>/dev/null | wc -l)" -ge "$need" ] && ! pgrep -f "speak.py.*act$n.say" >/dev/null; do sleep 20; done
  sleep 5; a=$V/production/acts/act$n
  python3 shared/wt.py $V $n --check > $a/wt.log 2>&1 || { echo "wt fail $n"; continue; }
  (printf 'window.TIMING='; cat $a/timing.json) > $a/timing.js
  (cd $V/production/acts && (sed "s/JD act N/JD act $n - ${TITLES[$n]}/" head.tmpl; cat act$n/body.js foot.tmpl) > act$n/act.html)
  echo "act$n timed $(tail -1 $a/wt.log)"
  bash shared/render_act.sh $V $n 3 > $a/render.log 2>&1 && echo "act$n rendered" || { echo "render fail $n"; tail -3 $a/render.log; }
done; echo AUTOQ_DONE
