#!/bin/bash
# Render one act with its voice-over: timing -> video -> mix.  Usage: act_pipeline.sh <act> [out dir]
set -e
A=$1; OUT=${2:-/home/user/work/tb_acts}; VO=/home/user/work/tb_vo/act$A
J="/mnt/project-files/3d/thunderbolt/TB - Script v1 shots.json"
ENG=/home/user/stromehll-projects/3d-documentaries/engine
mkdir -p $OUT
# 1) timing: each shot lasts its VO clip + 0.35 s lead-in + 0.45 s tail
python3 - "$VO" "$OUT/act$A.timing.json" <<'E'
import sys, json, subprocess
vo, out = sys.argv[1:3]; ids = open(vo + '/ids.txt').read().split(); t = {}
for i, s in enumerate(ids):
    d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{vo}/vo-{i+1:02d}.wav']))
    t[s] = {'dur': round(d + .8, 3), 'a': .35, 'b': round(.35 + d, 3), 'vo': d}
json.dump(t, open(out, 'w'), indent=1)
E
# 2) picture
cd $ENG && node render.js video "$J" shots/tb_act$A.js $OUT/act$A.picture.mp4 $A --fps 30 --crf 23 --timing $OUT/act$A.timing.json
# 3) voice track laid out on the timeline + a quiet tension bed under it, VO on top
python3 - "$VO" "$OUT/act$A.timing.json" "$OUT/act$A.vo.wav" <<'E'
import sys, json, subprocess
vo, tj, out = sys.argv[1:4]; t = json.load(open(tj)); ids = open(vo + '/ids.txt').read().split()
ins, flt, pos = [], [], 0.0
for i, s in enumerate(ids):
    ins += ['-i', f'{vo}/vo-{i+1:02d}.wav']; ms = int((pos + t[s]['a']) * 1000); flt.append(f'[{i}:a]aresample=48000,adelay={ms}|{ms}[v{i}]'); pos += t[s]['dur']
f = ';'.join(flt) + ';' + ''.join(f'[v{i}]' for i in range(len(ids))) + f'amix=inputs={len(ids)}:normalize=0,apad=whole_dur={pos}[o]'
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', f, '-map', '[o]', '-ac', '2', out])
E
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $OUT/act$A.picture.mp4)
ffmpeg -y -loglevel error -i $OUT/act$A.picture.mp4 -i $OUT/act$A.vo.wav \
  -f lavfi -t $D -i "anoisesrc=c=brown:a=0.5,lowpass=f=220,volume=0.05" \
  -filter_complex "[2:a]aformat=channel_layouts=stereo[bed];[bed][1:a]sidechaincompress=threshold=0.03:ratio=8:release=400[duck];[duck][1:a]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest $OUT/act$A.mp4
echo "act $A done $(date -u +%H:%M)" >> $OUT/progress.txt
