# v6 voice check (L32/L39): whisper-small.en transcribes every gag line + narrator paragraph; flags garbled/robotic takes
# (word error rate on non-name words > .3), odd speaking rate, and reports how each name was heard.  Run with /root/.venvs/hf/bin/python
import os, sys, json, re, hashlib, glob, numpy as np, soundfile as sf
sys.path.insert(0, '/tmp/wf/anim/gags'); from gags_data_wf import V, G; from names_wf import NAMES
from transformers import pipeline
asr = pipeline('automatic-speech-recognition', model='openai/whisper-small.en', device='cpu')
NM = set(w.lower().strip("'") for a, _ in NAMES for w in re.findall(r"[A-Za-z']+", a))
NUM = {'0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '50': 'fifty'}
INTJ = {'ahh': 'ah', 'shhhh': 'shh', 'shh': 'shh', 'hairdryer': 'hair dryer'}
norm = lambda t: [w for w in ' '.join(INTJ.get(x, NUM.get(x, x)) for x in re.findall(r"[a-z0-9']+", t.lower().replace('-', ' '))).split() if w.strip("'") not in NM]
def wer(r, h):
    r, h = norm(r), norm(h); d = list(range(len(h) + 1))
    for i in range(1, len(r) + 1):
        p, d[0] = d[0], i
        for j in range(1, len(h) + 1): p, d[j] = d[j], min(d[j] + 1, d[j - 1] + 1, p + (r[i - 1] != h[j - 1]))
    return d[len(h)] / max(1, len(r))
def hear(f):
    x, sr = sf.read(f); x = x.mean(1) if x.ndim > 1 else x
    if sr != 16000: import numpy as _n; x = _n.interp(_n.linspace(0, len(x) - 1, int(len(x) * 16000 / sr)), _n.arange(len(x)), x).astype("float32")
    return asr({'raw': x.astype(np.float32), 'sampling_rate': 16000})['text'].strip(), len(x) / 16000
rows = []; CB = '/tmp/wfwork/gagvo'
for g in G:
    for it in g['items']:
        if it[0] in V:
            ex_, rf = V[it[0]][0], V[it[0]][4]; h = hashlib.md5(f'{ex_}|{rf}|{it[1]}'.encode()).hexdigest()[:16]; f = f'{CB}/{h}.wav'
            if not os.path.exists(f): rows.append(('GAG %d' % g['id'], it[0], it[1], 'MISSING', 1, 0)); continue
            t, d = hear(f); rows.append(('GAG %d' % g['id'], it[0], it[1], t, wer(it[1], t), len(it[1].split()) / max(.3, d)))
if '--narr' in sys.argv:
    for j in sorted(glob.glob('/tmp/wfwork/vo/act*.json')):
        J = json.load(open(j)); a = os.path.basename(j)[:-5]
        for k, ch in enumerate(J.get('chunks', [])):
            txt = ' '.join(c[2] for c in ch); t, d = hear(f'/tmp/wfwork/vo/{a}/p{k:02d}.wav'); rows.append((a, 'NARR p%02d' % k, txt, t, wer(txt, t), len(txt.split()) / max(.3, d)))
bad = [r for r in rows if r[4] > .3 or not (1.4 < r[5] < 4.6 or len(r[2].split()) < 3)]
L = ['# voicecheck v6', '', f'{len(bad)} flagged of {len(rows)} lines (WER on non-name words > 0.3, or speaking rate outside 1.4-4.6 words/s)', '', '| where | who | script | heard | WER | w/s | flag |', '|---|---|---|---|---|---|---|']
L += [f'| {r[0]} | {r[1]} | {r[2][:90]} | {r[3][:90]} | {r[4]:.2f} | {r[5]:.1f} | {"FLAG" if r in bad else ""} |' for r in rows]
open('/tmp/wfwork/voicecheck.md', 'w').write('\n'.join(L)); print('\n'.join(L[:3])); json.dump([list(r) for r in bad], open('/tmp/wfwork/voicecheck_bad.json', 'w'))
