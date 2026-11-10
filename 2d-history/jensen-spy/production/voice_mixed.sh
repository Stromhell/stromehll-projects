#!/bin/bash
# Voice every JH act with the default mixed-accent voice (take P). Skips acts already done. Run from repo 2d-history/.
PY=/root/.cache/pushpam-voice/venv/bin/python; KIT=/home/user/vk/pushpam-voice-kit
V=jensen-spy/production/voice
python3 - <<'PYX'
src = open('shared/voice_batch.py').read().split('os.chdir(')[0]; exec(src)
import glob
for p in glob.glob('jensen-spy/production/voice/act*.txt'):
    if p.endswith('.say.txt'): continue
    open(p[:-4] + '.say.txt', 'w').write(respell(open(p).read()).replace(' -- ', ' — '))
PYX
for n in $(seq 0 11); do
  out=$V/act$n; mkdir -p $out
  want=$(python3 -c "print(len([p for p in open('$V/act$n.txt').read().split('\n\n') if p.strip()]))")
  have=$(ls $out/vo-*.wav 2>/dev/null | wc -l)
  [ "$have" -ge "$want" ] && continue
  t0=$(date +%s); $PY $KIT/scripts/speak_mixed.py --file $V/act$n.say.txt --out $out/vo.wav --scenes > $out/speak.log 2>&1
  echo "act$n rc=$? $(( $(date +%s)-t0 ))s clips=$(ls $out/vo-*.wav 2>/dev/null | wc -l)/$want"
done
echo ALLDONE
