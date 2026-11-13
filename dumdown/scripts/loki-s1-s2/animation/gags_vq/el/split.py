# split each ElevenLabs batch mp3 into per-line wavs using whisper word timings
import re, json, subprocess, sys, numpy as np
from faster_whisper import WhisperModel
from scipy.io import wavfile
m = WhisperModel('base.en', device='cpu', compute_type='int8')
def norm(w): return re.sub(r"[^a-z0-9]", '', w.lower())
def load(f):
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-f', 's16le', '-ac', '1', '-ar', '48000', '-'], capture_output=True).stdout
    return np.frombuffer(r, np.int16).astype(np.float32) / 32768
out = {}
for k in sys.argv[1:]:
    lines = open(f'el/{k}.txt').read().split('\n'); x = load(f'el/{k}.mp3'); SR = 48000
    segs, _ = m.transcribe(x[::3].copy(), language='en', word_timestamps=True)
    W = [(norm(w.word), w.start, w.end) for s in segs for w in s.words]; W = [w for w in W if w[0]]
    # target word counts per line (numbers may transcribe differently -> use char-proportional alignment via DP on cumulative chars)
    tl = [norm(t) for l in lines for t in l.split() if norm(t)]
    lid = [i for i, l in enumerate(lines) for t in l.split() if norm(t)]
    # DP align whisper words to text tokens (edit distance), then line boundaries
    import difflib
    sm = difflib.SequenceMatcher(None, [w[0] for w in W], tl, autojunk=False)
    tok_t = [None] * len(tl)
    for a, b, n in sm.get_matching_blocks():
        for j in range(n): tok_t[b + j] = (W[a + j][1], W[a + j][2])
    bounds = []
    for i in range(len(lines)):
        ts = [tok_t[j] for j in range(len(tl)) if lid[j] == i and tok_t[j]]
        bounds.append((min(t[0] for t in ts), max(t[1] for t in ts)) if ts else None)
    # fill missing by neighbours
    for i, bd in enumerate(bounds):
        if bd is None:
            a = bounds[i - 1][1] if i and bounds[i - 1] else 0
            b = next((bounds[j][0] for j in range(i + 1, len(bounds)) if bounds[j]), len(x) / SR)
            bounds[i] = (a + .05, b - .05); print('  fill', k, i, lines[i])
    # cut at the quietest point in the gap between consecutive lines
    env = np.convolve(np.abs(x), np.ones(480) / 480, 'same')
    cuts = [0]
    for i in range(len(lines) - 1):
        a, b = int(bounds[i][1] * SR), int(bounds[i + 1][0] * SR)
        if b <= a: c = (a + b) // 2
        else: c = a + int(np.argmin(env[a:b]))
        cuts.append(c)
    cuts.append(len(x))
    for i, l in enumerate(lines):
        seg = x[cuts[i]:cuts[i + 1]]; nz = np.where(np.abs(seg) > .02)[0]
        seg = seg[max(0, nz[0] - 900): nz[-1] + 2400] if len(nz) else seg
        f = f'el/lines/{k}_{i:02d}.wav'; wavfile.write(f, SR, (seg * 32767).astype(np.int16))
        out[l.strip() + '|' + k] = f; print(k, i, round(len(seg) / SR, 2), l[:60])
json.dump(out, open(f'el/lines_{"_".join(sys.argv[1:]) if len(sys.argv)==2 else "all"}.json', 'w'), indent=0)
