#!/bin/bash
# 2D dynamic pipeline. Every step leaves a marker in .state/ when done, so a restart
# (by the watchdog, or after a machine reboot) skips finished work and carries on.
W=/home/user/w2d; M=/mnt/project-files/2d-dynamic; S=$W/.state; L=/tmp/claude-0/pipeline_dd.log
mkdir -p $S; cd $W
log(){ echo "$(date -u +%H:%M) $*" | tee -a $S/events.log; }
back(){ for t in 1 2 3 4 5; do mkdir -p "$(dirname $M/$1)" 2>/dev/null; cp "$W/$1" "$M/$1" && return 0; sleep 20; done; log "COPYFAIL $1"; }
step(){ [ -f $S/$1 ] && return 0; n=$1; shift; if "$@"; then touch $S/$n; log "DONE $n"; else log "FAIL $n"; return 1; fi; }
render(){ for try in 1 2 3; do cd $W && bash shared/render_act.sh $1 $2 6 && { back $1/production/acts/act$2/act$2.mp4; return 0; }; log "retry $1 act$2 ($try)"; sleep 10; done; return 1; }
combine(){ mkdir -p $1/final && python3 shared/combine.py $1 $1/final/$2.mp4 && back $1/final/$2.mp4 && back $1/final/$2_chapters.json; }
reels(){ v=$1; shift; for id in "$@"; do ls $v/reels/out/*_Reel_$(printf %02d $id).mp4 >/dev/null 2>&1 && continue
  python3 shared/reels/build_reel_dd.py $v $id 2>&1 | grep -E "REEL|Error|Traceback" | while read l; do log "$l"; done; done
  python3 shared/reels/thumb_dd.py $v "$@" | tail -1; for t in 1 2 3 4 5; do mkdir -p $M/$v/reels/out && cp $v/reels/out/* $M/$v/reels/out/ && return 0; sleep 20; done; return 1; }

step es1_reels reels spain-1-al-andalus 3 4 5 8 9 10 11 12 13 14 15
step es2_combine combine spain-2-empire Spain2_Empire_FULL
step es2_reels reels spain-2-empire $(seq 1 15)
for a in 2 3 4 5 6; do step es3_act$a render spain-3-civil-war $a; done
ls $S/es2_combine $S/es1_reels $S/es2_reels $S/es3_act{2,3,4,5,6} >/dev/null 2>&1 && { touch $S/ALL_DONE; log "PIPELINE ALL DONE"; }
