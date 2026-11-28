#!/bin/bash
# Script 5 v8 mix. usage: mix_v5.sh RENDER_DIR OUT.mp4
# v4: scenes are joined with cross-dissolves (each scene renders 0.6 s past its end under the next scene's head), so no blank frames.
set -e
R=$1; OUT=$2; P=$(cd "$(dirname "$0")/.." && pwd); VO=$P/vo/vo_track_v4.wav; PLAN=$P/anim_v8/plan.json
# v8: the film is rendered as one continuous video (render_film.js -> $R/video.mp4); no per-scene joins
TOTAL=$(python3 -c "import json;p=json.load(open('$PLAN'));print(round(p[-1]['start']+p[-1]['dur'],2))")
[ -f $R/music.wav ] || python3 $P/audio/music.py $R/music.wav $TOTAL
python3 $P/audio/sfx_v2.py $R $PLAN $R/sfx.wav
ffmpeg -y -loglevel error -i $R/video.mp4 -i $VO -i $R/music.wav -i $R/sfx.wav -filter_complex \
"[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,volume=1.3,asplit=2[vo][sc];\
[2:a]aresample=48000,volume=0.55[mu];[mu][sc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=450[mud];\
[3:a]aresample=48000,volume=0.7[fx];[vo][mud][fx]amix=inputs=3:normalize=0:duration=first,lowpass=f=16000:poles=2,loudnorm=I=-14:TP=-2:LRA=11,aresample=192000,alimiter=limit=0.6:level=false:attack=0.5:release=40,aresample=48000[a]" \
-map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest $OUT
echo mixed $OUT
