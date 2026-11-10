#!/bin/bash
# Voice timing + page build for one act.  Usage: bash prep_act.sh N "Act title"   (run from anywhere)
# The take P voice kit already denoises and masters each clip, so no second denoise pass here.
cd "$(dirname "$0")/../.."; V=jensen-spy; n=$1; a=$V/production/acts/act$n
python3 shared/wt.py $V $n --check > $a/wt.log 2>&1 || { echo "wt fail $n"; tail -3 $a/wt.log; exit 1; }
(printf 'window.TIMING='; cat $a/timing.json) > $a/timing.js
bash $V/production/acts/mk.sh $n "$2"; tail -2 $a/wt.log
