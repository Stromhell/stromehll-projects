#!/bin/bash
# Voice timing + denoise + page build for one act.  Usage: bash prep_act.sh N "Act title"   (run from repo 2d-history/)
cd "$(dirname "$0")/../.."; V=russia-war; n=$1; a=$V/production/acts/act$n
python3 shared/wt.py $V $n --check > $a/wt.log 2>&1 || { echo "wt fail $n"; tail -3 $a/wt.log; exit 1; }
(printf 'window.TIMING='; cat $a/timing.json) > $a/timing.js
mv $a/vo.wav $a/vo_raw.wav
ffmpeg -y -loglevel error -i $a/vo_raw.wav -af "arnndn=m=/tmp/claude-0/rnn/sh.rnnn,afftdn=nr=14:nf=-50:tn=1,lowpass=f=11000,atrim=start_sample=1680,asetpts=PTS-STARTPTS,apad=pad_len=1680" -ar 48000 -ac 1 $a/vo.wav
bash $V/production/acts/mk.sh $n "$2"; tail -2 $a/wt.log
