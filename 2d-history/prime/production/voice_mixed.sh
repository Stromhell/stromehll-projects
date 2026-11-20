#!/bin/bash
# Voice every JH act with the default mixed-accent voice (take P). Skips acts already done. Run from repo 2d-history/.
PY=/root/.cache/pushpam-voice/venv/bin/python; KIT=/home/user/vk/pushpam-voice-kit
V=prime/production/voice
python3 - <<'PYX'
src = open('shared/voice_batch.py').read().split('os.chdir(')[0]; exec(src)
import glob, re
for p in glob.glob('prime/production/voice/act*.txt'):
    if p.endswith('.say.txt'): continue
    t = open(p).read()
    for a, b in [(r"\bKSI\b", 'K S I'), (r"Más Plus", 'Mass Plus'), (r"\bPokémon\b", 'Poe-kay-mon'), (r"\bRefresco\b", 'Ruh-fresco'), (r"\bUFC\b", 'U F C'), (r"\bLA\b", 'L A'), (r"\bPBD\b", 'P B D'), (r"\bFDA\b", 'F D A'), (r"\bSchumer\b", 'Shoomer'), (r"\bAldi\b", 'Al-dee'), (r"under-18s", 'under-eighteens'), (r"eighteen plus", 'eighteen-plus')]:
        t = re.sub(a, b, t)
    open(p[:-4] + '.say.txt', 'w').write(respell(t).replace(' -- ', ' — '))
PYX
for n in $(seq 0 8); do
  out=$V/act$n; mkdir -p $out
  want=$(python3 -c "print(len([p for p in open('$V/act$n.txt').read().split('\n\n') if p.strip()]))")
  have=$(ls $out/vo-*.wav 2>/dev/null | wc -l)
  [ "$have" -ge "$want" ] && continue
  t0=$(date +%s); $PY $KIT/scripts/speak_mixed.py --file $V/act$n.say.txt --out $out/vo.wav --scenes > $out/speak.log 2>&1
  echo "act$n rc=$? $(( $(date +%s)-t0 ))s clips=$(ls $out/vo-*.wav 2>/dev/null | wc -l)/$want"
done
echo ALLDONE
