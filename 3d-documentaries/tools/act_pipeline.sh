#!/bin/bash
# Render one act with its voice-over. Resumable: each shot is its own clip, finished clips are skipped.
# Usage: act_pipeline.sh <act> [out dir]   env: MOD=tb3 (shot module prefix), FPS=24
set -e
A=$1; OUT=${2:-/home/user/work/tb_acts}; MOD=${MOD:-tb3}; FPS=${FPS:-24}; VO=/home/user/work/tb_vo/act$A
J="/mnt/project-files/3d/thunderbolt/TB - Script v1 shots.json"
ENG=/home/user/stromehll-projects/3d-documentaries/engine
mkdir -p $OUT/shots
# 1) timing: each shot lasts its VO clip + 0.35 s lead-in + 0.45 s tail
python3 - "$VO" "$OUT/act$A.timing.json" <<'E'
import sys, json, subprocess
vo, out = sys.argv[1:3]; ids = open(vo + '/ids.txt').read().split(); t = {}
for i, s in enumerate(ids):
    d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{vo}/vo-{i+1:02d}.wav']))
    t[s] = {'dur': round(d + .8, 3), 'a': .35, 'b': round(.35 + d, 3), 'vo': d}
json.dump(t, open(out, 'w'), indent=1)
E
# 2) picture, shot by shot
: > $OUT/act$A.list
for S in $(cat $VO/ids.txt); do
  C=$OUT/shots/$S.mp4
  if [ ! -s $C ]; then
    (cd $ENG && node render.js video "$J" shots/${MOD}_act$A.js $C.tmp.mp4 $S --fps $FPS --crf 21 --timing $OUT/act$A.timing.json)
    mv $C.tmp.mp4 $C
  fi
  echo "file '$C'" >> $OUT/act$A.list
done
ffmpeg -y -loglevel error -f concat -safe 0 -i $OUT/act$A.list -c copy $OUT/act$A.picture.mp4
# 3) voice track laid out on the timeline
python3 - "$VO" "$OUT/act$A.timing.json" "$OUT/act$A.vo.wav" <<'E'
import sys, json, subprocess
vo, tj, out = sys.argv[1:4]; t = json.load(open(tj)); ids = open(vo + '/ids.txt').read().split()
ins, flt, pos = [], [], 0.0
for i, s in enumerate(ids):
    ins += ['-i', f'{vo}/vo-{i+1:02d}.wav']; ms = int((pos + t[s]['a']) * 1000); flt.append(f'[{i}:a]aresample=48000,adelay={ms}|{ms}[v{i}]'); pos += t[s]['dur']
f = ';'.join(flt) + ';' + ''.join(f'[v{i}]' for i in range(len(ids))) + f'amix=inputs={len(ids)}:normalize=0,apad=whole_dur={pos}[o]'
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', f, '-map', '[o]', '-ac', '2', out])
E
# 4) sound design: a per-shot ambience (cabin hum, airport, cockpit, room tone, paper) plus a soft whoosh on each cut,
#    all ducked under the VO. Shot types come from the shot module's comment-free map below (default: room tone).
python3 - "$VO" "$OUT/act$A.timing.json" "$OUT/act$A.bed.wav" <<'E'
import sys, json, subprocess
vo, tj, out = sys.argv[1:4]; t = json.load(open(tj)); ids = open(vo + '/ids.txt').read().split()
kind = {'cabin': 'brown:a=0.6,lowpass=f=320,highpass=f=40,volume=0.16', 'air': 'pink:a=0.5,lowpass=f=1400,highpass=f=120,volume=0.05',
        'deck': 'brown:a=0.6,lowpass=f=500,highpass=f=60,volume=0.12', 'room': 'pink:a=0.4,lowpass=f=900,volume=0.03',
        'map': 'brown:a=0.5,lowpass=f=160,volume=0.06', 'paper': 'white:a=0.3,lowpass=f=3000,volume=0.015'}
def k(s):
    m = json.load(open(tj.replace('.timing.json', '.sfx.json'))) if __import__('os').path.exists(tj.replace('.timing.json', '.sfx.json')) else {}
    return m.get(s, 'room')
ins, flt = [], []
for i, s in enumerate(ids):
    d = t[s]['dur']; ins += ['-f', 'lavfi', '-t', str(d), '-i', f"anoisesrc=c={kind[k(s)].split(',')[0]}:d={d}"]
    flt.append(f'[{i}:a]{",".join(kind[k(s)].split(",")[1:])},aformat=sample_rates=48000:channel_layouts=stereo,afade=t=in:d=0.25,afade=t=out:st={max(0, d - .25)}:d=0.25[b{i}]')
n = len(ids); pos = 0.0; wh = []
for i, s in enumerate(ids[1:], 1):
    pos += t[ids[i - 1]]['dur']; ms = max(0, int((pos - .35) * 1000))
    ins += ['-f', 'lavfi', '-t', '0.7', '-i', 'anoisesrc=c=pink:a=0.6:d=0.7']
    flt.append(f'[{n + len(wh)}:a]aformat=sample_rates=48000:channel_layouts=stereo,bandpass=f=900:w=1400,volume=0.18,afade=t=in:d=0.35,afade=t=out:st=0.35:d=0.35,adelay={ms}|{ms}[w{len(wh)}]'); wh.append(i)
f = ';'.join(flt) + ';' + ''.join(f'[b{i}]' for i in range(n)) + f'concat=n={n}:v=0:a=1[bed]'
if wh: f += ';[bed]' + ''.join(f'[w{j}]' for j in range(len(wh))) + f'amix=inputs={len(wh) + 1}:normalize=0:duration=first[o]'
else: f += ';[bed]anull[o]'
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', f, '-map', '[o]', out])
E
ffmpeg -y -loglevel error -i $OUT/act$A.picture.mp4 -i $OUT/act$A.vo.wav -i $OUT/act$A.bed.wav \
  -filter_complex "[1:a]asplit[v][v2];[2:a]volume=2.5[bd];[bd][v]sidechaincompress=threshold=0.03:ratio=6:release=400[duck];[duck][v2]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest $OUT/act$A.mp4
echo "act $A done $(date -u +%H:%M)" >> $OUT/progress.txt
