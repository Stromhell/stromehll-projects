#!/bin/bash
# Exits (waking the 3D thread) when every act file of a film exists and no render chain/queue is running,
# or after ~110 min so the thread re-arms it. Usage: wait_ready.sh WORKDIR NACTS
W=${1:-/home/user/work/3dlow_acts}; N=${2:-10}; end=$(( $(date +%s) + 6600 ))
while [ $(date +%s) -lt $end ]; do
  ok=1; for ((a=0; a<N; a++)); do [ -f $W/act$a.mp4 ] || ok=0; done
  if [ $ok = 1 ] && ! pgrep -f "act_pipeline.sh|chain.sh" >/dev/null; then echo "READY all $N acts rendered"; exit 0; fi
  sleep 60
done
echo "not ready yet: $(ls $W/act?.mp4 2>/dev/null | wc -l)/$N acts"
