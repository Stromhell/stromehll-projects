# split batches at pauses: DP picks N-1 pauses so each piece's length fits its line's text length; whisper check after
import re, json, subprocess, sys, numpy as np
from scipy.io import wavfile
SR = 48000
def load(f):
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True).stdout
    return np.frombuffer(r, np.int16).astype(np.float32) / 32768
def gaps(x, thr=.012, mind=.18):
    h = 240; e = np.sqrt(np.convolve(x ** 2, np.ones(h) / h, 'same'))[::h]; q = e < thr; out = []; i = 0
    while i < len(q):
        if q[i]:
            j = i
            while j < len(q) and q[j]: j += 1
            if (j - i) * h / SR >= mind and i > 0 and j < len(q): out.append((i * h / SR, j * h / SR))
            i = j
        else: i += 1
    return out
def wlen(l): return len(re.sub(r'[^a-zA-Z0-9]', '', l)) + 6 * len(re.findall(r'[.?!,:]', l))
out = json.load(open('el/lines_all.json')) if len(sys.argv) > 1 else {}
for k in sys.argv[1:]:
    lines = open(f'el/{k}.txt').read().split('\n'); x = load(f'el/{k}.mp3'); D = len(x) / SR; gp = gaps(x); N = len(lines)
    W = np.array([wlen(l) for l in lines], float); 
    # expected piece length incl. its trailing pause
    exp = W / W.sum() * D
    cand = [0.0] + [(a + b) / 2 for a, b in gp] + [D]; glen = [9] + [b - a for a, b in gp] + [9]; M = len(cand)
    INF = 1e18; C = np.full((N + 1, M), INF); P = np.zeros((N + 1, M), int); C[0, 0] = 0
    for i in range(1, N + 1):
        for j in range(1, M):
            for p in range(j):
                if C[i - 1, p] >= INF: continue
                d = cand[j] - cand[p]; c = C[i - 1, p] + (d - exp[i - 1]) ** 2 / max(exp[i - 1], .6) - 2.5 * min(glen[j], 1.5)
                if c < C[i, j]: C[i, j] = c; P[i, j] = p
    j = M - 1; cuts = [j]
    for i in range(N, 0, -1): j = P[i, j]; cuts.append(j)
    cuts = [cand[c] for c in cuts[::-1]]
    for i, l in enumerate(lines):
        seg = x[int(cuts[i] * SR):int(cuts[i + 1] * SR)]; nz = np.where(np.abs(seg) > .02)[0]
        seg = seg[max(0, nz[0] - 900): nz[-1] + 2400] if len(nz) else seg
        f = f'el/lines/{k}_{i:02d}.wav'; wavfile.write(f, SR, (seg * 32767).astype(np.int16)); out[l.strip() + '|' + k] = f
json.dump(out, open('el/lines_all.json', 'w'), indent=0)
