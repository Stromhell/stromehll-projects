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
    # retry once if the render dies (watchdog kills stalled renders); never keep a partial file
    for try in 1 2; do
      (cd $ENG && node render.js video "$J" shots/${MOD}_act$A.js $C.tmp.mp4 $S --fps $FPS --crf 21 --timing $OUT/act$A.timing.json) && { mv $C.tmp.mp4 $C; break; }
      echo "shot $S render failed (try $try)"; rm -f $C.tmp.mp4
    done
    [ -s $C ] || { echo "shot $S failed twice, stopping act $A"; exit 1; }
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
# 4) sound: music bed + placed sound effects + per-shot room tone, all ducked under the VO (tools/sound_mix.py).
#    Cue sheet: $OUT/act$A.cues.json
python3 $(dirname $0)/sound_mix.py $VO/ids.txt $OUT/act$A.timing.json $OUT/act$A.vo.wav $OUT/act$A.cues.json $OUT/act$A.mix.wav
ffmpeg -y -loglevel error -i $OUT/act$A.picture.mp4 -i $OUT/act$A.mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest $OUT/act$A.mp4
# 5) damage check: the whole act must decode cleanly, else rebuild it from the shot files once
chk() { [ -s $OUT/act$A.mp4 ] && [ -z "$(ffmpeg -v error -i $OUT/act$A.mp4 -f null - 2>&1 | head -3)" ]; }
if ! chk; then echo "act $A failed damage check, rebuilding"; rm -f $OUT/act$A.mp4
  ffmpeg -y -loglevel error -f concat -safe 0 -i $OUT/act$A.list -c copy $OUT/act$A.picture.mp4
  ffmpeg -y -loglevel error -i $OUT/act$A.picture.mp4 -i $OUT/act$A.mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest $OUT/act$A.mp4
  chk || { echo "act $A still damaged"; mv $OUT/act$A.mp4 $OUT/act$A.damaged.mp4; exit 1; }; fi
echo "act $A done $(date -u +%H:%M)" >> $OUT/progress.txt
