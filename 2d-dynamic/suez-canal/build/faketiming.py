import sys, json, re
vd, a = sys.argv[1], int(sys.argv[2])
paras = [p.strip() for p in open(f'{vd}/production/voice/act{a}.txt').read().split('\n\n') if p.strip()]
t = 0; shots = []; words = []
for i, p in enumerate(paras, 1):
    st = t; vs = t + .6; ws = p.split(); dur = len(ws) / 2.6
    for k, w in enumerate(ws): words.append(dict(w=re.sub(r"[^\w'-]", '', w), s=vs + k / 2.6, e=vs + (k + .8) / 2.6))
    ve = vs + dur; t = ve + .55; shots.append(dict(i=i, start=st, vo_start=vs, vo_end=ve, text=p, end=t))
import os; os.makedirs(f'{vd}/production/acts/act{a}', exist_ok=True)
open(f'{vd}/production/acts/act{a}/timing.js', 'w').write('window.TIMING = ' + json.dumps(dict(dur=t, shots=shots, words=words, fake=True)) + ';\n')
print(a, round(t, 1), len(shots))
