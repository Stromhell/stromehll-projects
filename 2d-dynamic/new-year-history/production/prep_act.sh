#!/bin/bash
# Prep one act after its voice clips exist: timing (wt.py) -> timing.js -> debreath -> hiss clean-up (afftdn) -> rebuild act pages.
# Usage (from 2d-dynamic/): bash mongols-ain-jalut/production/prep_act.sh N
set -e; V=new-year-history; N=$1; D=$V/production/acts/act$N
python3 shared/wt.py $V $N | tail -2
echo "window.TIMING = $(cat $D/timing.json);" > $D/timing.js
rm -f $D/vo.orig.wav; python3 napoleon/production/tools/debreath.py $D | tail -1
ffmpeg -y -loglevel error -i $D/vo.wav -af "highpass=f=70,afftdn=nr=14:nf=-42:tn=1,lowpass=f=12000" -ar 48000 -ac 1 -c:a pcm_s16le $D/vo.clean.wav && mv $D/vo.clean.wav $D/vo.wav
bash $V/production/build_acts.sh; echo "PREP OK act$N"
