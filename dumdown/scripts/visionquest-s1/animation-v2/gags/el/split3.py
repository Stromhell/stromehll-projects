# split batches: speech regions between pauses -> whisper each region -> DP groups consecutive regions into lines by text match
import re, json, subprocess, sys, numpy as np, difflib
from scipy.io import wavfile
from faster_whisper import WhisperModel
sys.path.insert(0, 'el'); from split2 import load, gaps, SR
m = WhisperModel('base.en', device='cpu', compute_type='int8')
NUM = {'200': 'two hundred', '100': 'one hundred', '1939': 'nineteen thirty nine', '3': 'three', '5': 'five', '6': 'six', '9': 'nine', '1': 'one', '2': 'two'}
def norm(s):
    s = s.lower().replace('-', ' ').replace('%', ' percent')
    s = re.sub(r'\d+', lambda q: ' ' + NUM.get(q.group(), q.group()) + ' ', s)
    return re.sub(r'[^a-z ]', '', s).split()
def sim(a, b): return difflib.SequenceMatcher(None, a, b, autojunk=False).ratio() * (len(a) + len(b)) / 2 if a or b else 0
out = json.load(open('el/lines_all.json'))
for k in sys.argv[1:]:
    lines = open(f'el/{k}.txt').read().split('\n'); x = load(f'el/{k}.mp3'); D = len(x) / SR; gp = gaps(x, mind=.15)
    bnd = [0.0] + [(a + b) / 2 for a, b in gp] + [D]; R = len(bnd) - 1
    txt = []
    for r in range(R):
        seg = x[int(bnd[r] * SR):int(bnd[r + 1] * SR)][::3].copy()
        txt.append(norm(' '.join(s.text for s in m.transcribe(np.pad(seg, 4000), language='en', beam_size=5)[0])))
    L = [norm(l) for l in lines]; N = len(L); NEG = -1e9
    S = np.full((N + 1, R + 1), NEG); P = np.zeros((N + 1, R + 1), int); S[0, 0] = 0
    for i in range(1, N + 1):
        for j in range(1, R + 1):
            for p in range(max(0, j - 12), j):
                if S[i - 1, p] <= NEG / 2: continue
                c = S[i - 1, p] + sim(L[i - 1], sum(txt[p:j], []))
                if c > S[i, j]: S[i, j] = c; P[i, j] = p
    j = R; cuts = [R]
    for i in range(N, 0, -1): j = P[i, j]; cuts.append(j)
    cuts = cuts[::-1]
    for i, l in enumerate(lines):
        a, b = bnd[cuts[i]], bnd[cuts[i + 1]]; seg = x[int(a * SR):int(b * SR)]; nz = np.where(np.abs(seg) > .02)[0]
        seg = seg[max(0, nz[0] - 900): nz[-1] + 2400] if len(nz) else seg
        f = f'el/lines/{k}_{i:02d}.wav'; wavfile.write(f, SR, (seg * 32767).astype(np.int16)); out[l.strip() + '|' + k] = f
        got = sum(txt[cuts[i]:cuts[i + 1]], []); sc = difflib.SequenceMatcher(None, L[i], got).ratio()
        print('BAD' if sc < .6 else 'ok', round(sc, 2), k, i, round(b - a, 2), '|', l[:45], '=>', ' '.join(got)[:50], flush=True)
    json.dump(out, open('el/lines_all.json', 'w'), indent=0)
