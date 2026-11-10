# Estimated timing.js for an act (until the real voice timing exists): 2.6 words/s, 0.55 s gap, 0.6 s lead.
import sys, json, re
n = int(sys.argv[1]); paras = [p.strip() for p in open(f'voice/act{n}.txt').read().split('\n\n') if p.strip()]
t = .6; shots = []; words = []
for i, p in enumerate(paras):
    ws = p.split(); s = t
    for w in ws: d = .2 + .035 * len(w); words.append({'w': re.sub(r"[^\w'$%.-]", '', w), 's': round(t, 2), 'e': round(t + d, 2)}); t += d + .05
    shots.append({'i': i, 'start': round(s - .3, 2) if i else 0, 'end': round(t + .55, 2), 'vo_start': round(s, 2), 'vo_end': round(t, 2), 'text': p}); t += .55
for i in range(len(shots) - 1): shots[i]['end'] = shots[i + 1]['start']
T = {'dur': round(t, 2), 'shots': shots, 'words': words, 'estimated': True}
import os; os.makedirs(f'acts/act{n}', exist_ok=True)
open(f'acts/act{n}/timing.js', 'w').write('window.TIMING=' + json.dumps(T))
print(n, len(shots), T['dur'])
