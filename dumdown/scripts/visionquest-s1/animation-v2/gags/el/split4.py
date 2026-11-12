# split batches: speech regions between pauses -> whisper each region -> DP groups consecutive regions into lines by text match
import re, json, subprocess, sys, numpy as np, difflib
from scipy.io import wavfile
from faster_whisper import WhisperModel
sys.path.insert(0, 'el'); from split2 import load, gaps, SR
m = WhisperModel('base.en', device='cpu', compute_type='int8')
NUM = {'200': 'two hundred', '100': 'one hundred', '1939': 'nineteen thirty nine', '3': 'three', '5': 'five', '6': 'six', '9': 'nine', '1': 'one', '2': 'two'}
def norm(s):
    s = s.lower().replace('bathtub', 'bath tub').replace('teabag', 'tea bag').replace('our', 'or').replace('ise', 'ize').replace('-', ' ').replace('%', ' percent')
    s = re.sub(r'\d+', lambda q: ' ' + NUM.get(q.group(), q.group()) + ' ', s)
    return re.sub(r'[^a-z ]', '', s).split()
def sim(a, b): return difflib.SequenceMatcher(None, a, b, autojunk=False).ratio() * (len(a) + len(b)) / 2 if a or b else 0
out = json.load(open('el/lines_all.json'))
for k in sys.argv[1:]:
    lines = open(f'el/{k}.txt').read().split('\n'); x = load(f'el/{k}.mp3'); D = len(x) / SR; gp = gaps(x, mind=.15)
    bnd = [0.0] + [(a + b) / 2 for a, b in gp] + [D]; R = len(bnd) - 1
    U = []  # word units (normwords, start, end) in file time
    for r in range(R):
        seg = x[int(bnd[r] * SR):int(bnd[r + 1] * SR)][::3].copy(); off = bnd[r] - 4000 / 16000
        for s_ in m.transcribe(np.pad(seg, 4000), language='en', beam_size=5, word_timestamps=True)[0]:
            for w in s_.words:
                nw = norm(w.word)
                if nw: U.append((nw, max(bnd[r], w.start + off), min(bnd[r + 1], w.end + off)))
    txt = [u[0] for u in U]; R = len(U)
    env = np.sqrt(np.convolve(x ** 2, np.ones(480) / 480, 'same'))
    GP = gaps(x, mind=.08)
    def cutat(e, st):
        mid = (e + st) / 2; near = [g for g in GP if abs((g[0] + g[1]) / 2 - mid) < .7]
        if near: g = min(near, key=lambda g: abs((g[0] + g[1]) / 2 - mid) - .5 * (g[1] - g[0])); return (g[0] + g[1]) / 2
        lo, hi = int(min(e, st) * SR), int(max(e, st) * SR) + 1
        if hi - lo < 4800: lo, hi = lo - 2400, hi + 2400
        lo, hi = max(0, lo), min(len(x) - 1, hi)
        return (lo + int(np.argmin(env[lo:hi]))) / SR
    L = [norm(l) for l in lines]; N = len(L); NEG = -1e9
    S = np.full((N + 1, R + 1), NEG); P = np.zeros((N + 1, R + 1), int); S[0, 0] = 0
    for i in range(1, N + 1):
        for j in range(1, R + 1):
            for p in range(max(0, j - 40), j):
                if S[i - 1, p] <= NEG / 2: continue
                c = S[i - 1, p] + sim(L[i - 1], sum(txt[p:j], []))
                if c > S[i, j]: S[i, j] = c; P[i, j] = p
    j = R; cuts = [R]
    for i in range(N, 0, -1): j = P[i, j]; cuts.append(j)
    cuts = cuts[::-1]
    for i, l in enumerate(lines):
        a = 0 if i == 0 else cutat(U[cuts[i] - 1][2], U[cuts[i]][1]); b = D if i == N - 1 else cutat(U[cuts[i + 1] - 1][2], U[cuts[i + 1]][1]); seg = x[int(a * SR):int(b * SR)]; nz = np.where(np.abs(seg) > .02)[0]
        seg = seg[max(0, nz[0] - 900): nz[-1] + 2400] if len(nz) else seg
        f = f'el/lines/{k}_{i:02d}.wav'; wavfile.write(f, SR, (seg * 32767).astype(np.int16)); out[l.strip() + '|' + k] = f
        got = sum(txt[cuts[i]:cuts[i + 1]], []); sc = difflib.SequenceMatcher(None, L[i], got).ratio()
        print('BAD' if sc < .6 else 'ok', round(sc, 2), k, i, round(b - a, 2), '|', l[:45], '=>', ' '.join(got)[:50], flush=True)
    json.dump(out, open('el/lines_all.json', 'w'), indent=0)
