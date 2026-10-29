# Extra SFX for the war/history videos (hooves, bows, drums, horse). Usage: python3 mksfx_war.py shared/sfx
import numpy as np, os, sys
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
SR = 48000; rng = np.random.default_rng(11)
def t(d): return np.arange(int(round(SR * d))) / SR
def noise(d): return rng.standard_normal(int(round(SR * d)))
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def norm(x, peak=.9): m = np.max(np.abs(x)) or 1; return x / m * peak
def fade(x, a=.01, b=.05):
    n = len(x); x = x.copy(); ia, ib = int(SR * a), int(SR * b); x[:ia] *= np.linspace(0, 1, ia); x[n - ib:] *= np.linspace(1, 0, ib); return x
def reverb(x, rt=.8, mix=.25):
    n = int(SR * rt); ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 7, n)); w = np.convolve(x, ir)[:len(x) + n]; w = w / (np.max(np.abs(w)) or 1) * np.max(np.abs(x))
    y = np.concatenate([x, np.zeros(n)]); w = np.pad(w, (0, max(0, len(y) - len(w))))[:len(y)]; return y * (1 - mix) + w * mix
def loop(x, xf=1.0):
    n = int(round(SR * xf)); y = x[:-n].copy(); y[:n] = y[:n] * np.linspace(0, 1, n) + x[-n:] * np.linspace(1, 0, n); return y
def clop(f=1.0):
    d = .09; x = bp(noise(d), 300 * f, 2500 * f) * np.exp(-t(d) * 60) + np.sin(2 * np.pi * 110 * f * t(d)) * np.exp(-t(d) * 45) * .8; return x
L = {}; D = 12
def hooves(beat, pattern, jitter, many=1):
    x = lp(noise(D), 200) * .15
    for m in range(many):
        off = rng.uniform(0, beat)
        for k in range(int(D / beat) + 1):
            for p in pattern:
                s = int(SR * (off + k * beat + p + rng.uniform(-jitter, jitter)))
                c = clop(rng.uniform(.8, 1.2)) * rng.uniform(.5, 1)
                if 0 <= s < len(x) - len(c): x[s:s + len(c)] += c
    return x
L['gallop_loop'] = norm(loop(hooves(.42, [0, .07, .16, .23], .006)), .6)
L['cavalry_loop'] = norm(loop(lp(hooves(.4, [0, .07, .16, .23], .02, many=7), 2500) + lp(noise(D), 150) * .6), .6)
L['walk_hooves_loop'] = norm(loop(hooves(.9, [0, .45], .02)), .5)
d = .5; tt = t(d); L['bowstring'] = norm(np.sin(2 * np.pi * (180 - 60 * tt) * tt) * np.exp(-tt * 14) + hp(noise(d), 2000) * np.exp(-tt * 60) * .5, .8)
d = .6; tt = t(d); L['arrow'] = fade(norm(bp(noise(d), 1500, 6000) * np.sin(np.pi * tt / d) ** 4, .6))
d = .4; tt = t(d); L['arrow_hit'] = norm(bp(noise(d), 300, 3000) * np.exp(-tt * 40) + np.sin(2 * np.pi * 220 * tt) * np.exp(-tt * 25) * .6, .8)
d = 1.8; tt = t(d); x = np.sin(2 * np.pi * (48 + 40 * np.exp(-tt * 12)) * tt) * np.exp(-tt * 3.5) + lp(noise(d), 400) * np.exp(-tt * 18) * .5; L['drum'] = norm(reverb(x, 1.4, .35), .9)
x = np.zeros(int(SR * D))
for k in range(int(D / .55)):
    s = int(SR * k * .55); a = 1 if k % 4 == 0 else .55; d = .8; tt = t(d); h = (np.sin(2 * np.pi * (60 + 30 * np.exp(-tt * 15)) * tt) * np.exp(-tt * 5) + lp(noise(d), 300) * np.exp(-tt * 20) * .4) * a
    if s + len(h) < len(x): x[s:s + len(h)] += h
L['war_drums_loop'] = norm(loop(x), .55)
d = 1.3; tt = t(d); f0 = 520 + 260 * np.sin(np.pi * tt / d) - 300 * tt; vib = np.sin(2 * np.pi * 22 * tt) * 40
ph = 2 * np.cumsum(np.pi * (f0 + vib)) / SR; x = (np.sin(ph) + .5 * np.sin(2 * ph) + .3 * np.sin(3 * ph)) * np.sin(np.pi * tt / d) ** .6 * (1 - tt / d * .5)
L['neigh'] = fade(norm(reverb(bp(x + bp(noise(d), 800, 3000) * .15, 300, 4000), .5, .2), .7))
d = .9; tt = t(d); x = sum(np.sin(2 * np.pi * f * tt) * np.exp(-tt * k) for f, k in ((1800, 6), (2650, 7), (3900, 9), (5200, 12))) + hp(noise(d), 3000) * np.exp(-tt * 50)
L['sword_clash'] = norm(x, .7)
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
for k, v in L.items(): wavfile.write(os.path.join(out, k + '.wav'), SR, (np.clip(v, -1, 1) * 32767).astype(np.int16))
print(len(L), 'sfx:', ' '.join(sorted(L)))
