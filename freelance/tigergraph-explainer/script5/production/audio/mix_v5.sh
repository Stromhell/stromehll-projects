#!/bin/bash
# Script 5 v5 mix. usage: mix_v5.sh RENDER_DIR OUT.mp4
# v4: scenes are joined with cross-dissolves (each scene renders 0.6 s past its end under the next scene's head), so no blank frames.
set -e
R=$1; OUT=$2; P=$(cd "$(dirname "$0")/.." && pwd); VO=$P/vo/vo_track_v4.wav; PLAN=$P/anim_v5/plan.json
ARGS=$(python3 - "$PLAN" "$R" <<'PY'
import json, sys
plan = json.load(open(sys.argv[1])); R = sys.argv[2]
ins = " ".join(f"-i {R}/sc{p['n']:02d}.mp4" for p in plan)
f, prev = [], "[0:v]"
for i, p in enumerate(plan[1:], 1):
    d = plan[i - 1]["tail"]; out = f"[x{i}]" if i < len(plan) - 1 else "[v]"
    f.append(f"{prev}[{i}:v]xfade=transition=fade:duration={d}:offset={p['start']:.3f}{out}"); prev = out
print(ins + " ||| " + ";".join(f))
PY
)
IN=${ARGS%% ||| *}; FG=${ARGS##* ||| }
ffmpeg -y -loglevel error $IN -filter_complex "$FG" -map "[v]" -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 30 $R/video.mp4
TOTAL=$(python3 -c "import json;p=json.load(open('$PLAN'));print(round(p[-1]['start']+p[-1]['dur'],2))")
[ -f $R/music.wav ] || python3 $P/audio/music.py $R/music.wav $TOTAL
python3 $P/audio/sfx_v2.py $R $PLAN $R/sfx.wav
ffmpeg -y -loglevel error -i $R/video.mp4 -i $VO -i $R/music.wav -i $R/sfx.wav -filter_complex \
"[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,volume=1.3,asplit=2[vo][sc];\
[2:a]aresample=48000,volume=0.55[mu];[mu][sc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=450[mud];\
[3:a]aresample=48000,volume=0.7[fx];[vo][mud][fx]amix=inputs=3:normalize=0:duration=first,lowpass=f=16000:poles=2,loudnorm=I=-14:TP=-2:LRA=11,aresample=192000,alimiter=limit=0.6:level=false:attack=0.5:release=40,aresample=48000[a]" \
-map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest $OUT
echo mixed $OUT
