# Mix an act: VO + SFX cues + ambience beds, SFX ducked under VO, normalized to -16 LUFS.
# Usage: python3 mix.py vo.wav cues.json out.wav [--music bed.wav --music-db -24]
# cues.json: {"dur": seconds, "cues": [{"t", "name", "gain"}], "beds": [{"start", "end", "name", "gain"}]}
import numpy as np, json, sys, os, subprocess, argparse
from scipy.io import wavfile
from scipy.signal import resample_poly
SR = 48000
LIB = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sfx')
ap = argparse.ArgumentParser(); ap.add_argument('vo'); ap.add_argument('cues'); ap.add_argument('out')
ap.add_argument('--sfx-db', type=float, default=-11); ap.add_argument('--bed-db', type=float, default=-26)
ap.add_argument('--duck-db', type=float, default=-9); ap.add_argument('--music'); ap.add_argument('--music-db', type=float, default=-24)
a = ap.parse_args()
def load(p):
    sr, x = wavfile.read(p); x = x.astype(np.float32)
    if x.ndim > 1: x = x.mean(1)
    x /= 32768 if np.max(np.abs(x)) > 2 else 1
    if sr != SR: g = np.gcd(sr, SR); x = resample_poly(x, SR // g, sr // g)
    return x
C = json.load(open(a.cues)); vo = load(a.vo)
n = max(len(vo), int(C.get('dur', 0) * SR)) + SR
VO = np.zeros(n); VO[:len(vo)] = vo
sfx = np.zeros(n); beds = np.zeros(n); cache = {}
def get(name):
    if name not in cache:
        p = os.path.join(LIB, name + '.wav'); cache[name] = load(p) if os.path.exists(p) else None
        if cache[name] is None: print('missing sfx', name)
    return cache[name]
for c in C.get('cues', []):
    x = get(c['name']); s = int(c['t'] * SR)
    if x is None or s >= n: continue
    m = min(len(x), n - s); sfx[s:s + m] += x[:m] * c.get('gain', 1)
for b in C.get('beds', []):
    x = get(b['name'])
    if x is None: continue
    s, e = int(b['start'] * SR), min(n, int(b['end'] * SR)); L = e - s
    if L <= 0: continue
    rep = np.tile(x, L // len(x) + 1)[:L]; f = min(L // 2, int(SR * .8))
    ramp = np.ones(L); ramp[:f] = np.linspace(0, 1, f); ramp[-f:] = np.linspace(1, 0, f); beds[s:e] += rep * ramp * b.get('gain', 1)
# VO envelope for ducking (smoothed RMS, 10 ms frames)
fr = SR // 100; k = n // fr; rms = np.sqrt((VO[:k * fr].reshape(k, fr) ** 2).mean(1) + 1e-12)
act = (rms > .02).astype(float); w = 25; act = np.convolve(act, np.ones(w) / w, 'same'); act = np.clip(act * 1.5, 0, 1)
duck = 10 ** (a.duck_db * act / 20); g = np.repeat(duck, fr); g = np.pad(g, (0, n - len(g)), constant_values=1)
db = lambda d: 10 ** (d / 20)
mix = VO + sfx * g * db(a.sfx_db) + beds * g * db(a.bed_db)
if a.music:
    mu = load(a.music); mu = np.tile(mu, n // len(mu) + 1)[:n]; mix += mu * db(a.music_db) * g ** .5
mix = mix[:int((len(vo) / SR + .3) * SR) if not C.get('dur') else int(C['dur'] * SR)]
tmp = a.out + '.raw.wav'; wavfile.write(tmp, SR, (np.clip(mix / max(1, np.max(np.abs(mix))) * .95, -1, 1) * 32767).astype(np.int16))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', a.out], check=True); os.remove(tmp)
print('mixed', a.out, f'{len(mix) / SR:.2f}s')
