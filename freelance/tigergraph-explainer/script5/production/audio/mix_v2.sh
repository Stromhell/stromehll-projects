#!/bin/bash
# Script 5 v2 mix. usage: mix_v2.sh RENDER_DIR OUT.mp4 [VO.wav]   (scNN.mp4 + scNN.cues.json in RENDER_DIR)
set -e
R=$1; OUT=$2; P=$(cd "$(dirname "$0")/.." && pwd); VO=${3:-$P/vo/vo_track_af_heart.wav}
(cd $R && for i in $(seq -w 1 14); do echo "file 'sc$i.mp4'"; done > list.txt && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy video.mp4)
[ -f $R/music.wav ] || python3 $P/audio/music.py $R/music.wav 180
python3 $P/audio/sfx_v2.py $R $P/anim_v2/plan.json $R/sfx.wav
ffmpeg -y -loglevel error -i $R/video.mp4 -i $VO -i $R/music.wav -i $R/sfx.wav -filter_complex \
"[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,volume=1.3,asplit=2[vo][sc];\
[2:a]aresample=48000,volume=0.6[mu];[mu][sc]sidechaincompress=threshold=0.03:ratio=6:attack=30:release=400[mud];\
[3:a]aresample=48000,volume=0.75[fx];[vo][mud][fx]amix=inputs=3:normalize=0:duration=first,lowpass=f=16000:poles=2,loudnorm=I=-14:TP=-2:LRA=11,aresample=192000,alimiter=limit=0.6:level=false:attack=0.5:release=40,aresample=48000[a]" \
-map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest $OUT
echo mixed $OUT
