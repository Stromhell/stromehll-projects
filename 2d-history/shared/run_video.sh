#!/bin/bash
# Voice (pushpam-voice), time, denoise and render every act of a 2D video.  Usage: bash shared/run_video.sh VIDEO_DIR
cd "$(dirname "$0")/.."; V=${1:-ww2-part1}
python3 shared/voice_batch.py $V || exit 1
for n in $(ls -d $V/production/acts/act* | grep -o "[0-9]*$" | sort -n); do a=$V/production/acts/act$n
  python3 shared/wt.py $V $n --check > $a/wt.log 2>&1 || { echo "wt fail $n"; cat $a/wt.log | tail -3; continue; }
  (printf 'window.TIMING='; cat $a/timing.json) > $a/timing.js
  mv $a/vo.wav $a/vo_raw.wav
  ffmpeg -y -loglevel error -i $a/vo_raw.wav -af "arnndn=m=/tmp/claude-0/rnn/sh.rnnn,afftdn=nr=14:nf=-50:tn=1,lowpass=f=11000,atrim=start_sample=1680,asetpts=PTS-STARTPTS,apad=pad_len=1680" -ar 48000 -ac 1 $a/vo.wav
  echo "act$n voiced: $(tail -2 $a/wt.log | tr '\n' ' ')"
  bash shared/render_act.sh $V $n 4 > $a/render.log 2>&1 && echo "act$n rendered" || { echo "render fail $n"; tail -3 $a/render.log; }
done
echo ALLDONE
