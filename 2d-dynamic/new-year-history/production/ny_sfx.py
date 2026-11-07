# Comic SFX for the New Year video, code-made (no credits): record scratch, boing, ding, party horn, sad trombone, beep, rooster, meow, crickets, yawn-ish hum.
import numpy as np, os, sys
from scipy.io import wavfile
SR = 44100; rng = np.random.default_rng(7)
t = lambda d: np.arange(int(SR * d)) / SR
def norm(x, p=.7): return x / (np.max(np.abs(x)) + 1e-9) * p
def env(x, a=.005, r=.1):
    n = len(x); e = np.ones(n); na = max(1, int(a * SR)); nr = max(1, int(r * SR)); e[:na] = np.linspace(0, 1, na); e[-nr:] = np.linspace(1, 0, nr); return x * e
def saw(f, tt): return 2 * ((f * tt) % 1) - 1
L = {}
tt = t(.45); f = 900 * np.exp(-tt * 6) + 200; L['scratch'] = norm(env(rng.normal(0, 1, len(tt)) * (np.sin(2 * np.pi * np.cumsum(f) / SR * 3) > 0) + .3 * np.sin(2 * np.pi * np.cumsum(f) / SR), .002, .05), .6)
tt = t(.5); f = 180 + 260 * np.exp(-tt * 5) * (1 + .5 * np.sin(2 * np.pi * 14 * tt)); L['boing'] = norm(env(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 4), .002, .1), .6)
tt = t(1.2); L['ding'] = norm(sum(np.sin(2 * np.pi * 1320 * k * tt) * np.exp(-tt * (3 + k)) / k for k in (1, 2.76, 5.4)), .6)
tt = t(.9); f = 330 + 30 * np.sin(2 * np.pi * 6 * tt); L['party_horn'] = norm(env(np.tanh(3 * saw(np.cumsum(f) / SR / tt.clip(1e-4) , tt)) if False else np.tanh(3 * (2 * ((np.cumsum(f) / SR) % 1) - 1)), .03, .15), .5)
segs = []
for fr, d in ((392, .35), (370, .35), (349, .35), (330, 1.0)):
    tt = t(d); ph = np.cumsum(fr * (1 + .02 * np.sin(2 * np.pi * 5 * tt))) / SR; segs.append(env(np.tanh(2 * (2 * (ph % 1) - 1)) * .6, .02, .08))
L['trombone'] = norm(np.concatenate(segs), .5)
tt = t(.18); L['beep'] = norm(env(np.sin(2 * np.pi * 1000 * tt), .002, .02), .5)
tt = t(.5); L['beep_long'] = norm(env(np.sin(2 * np.pi * 1500 * tt), .002, .1), .55)
tt = t(1.3); f = np.interp(tt, [0, .2, .4, .9, 1.3], [500, 900, 800, 1000, 600]); L['rooster'] = norm(env(np.tanh(2 * np.sin(2 * np.pi * np.cumsum(f) / SR)) * (1 + .3 * np.sin(2 * np.pi * 30 * tt)), .03, .2), .45)
tt = t(.7); f = np.interp(tt, [0, .25, .7], [500, 800, 450]); L['meow'] = norm(env(np.sin(2 * np.pi * np.cumsum(f) / SR) + .3 * np.sin(4 * np.pi * np.cumsum(f) / SR), .05, .2), .45)
tt = t(4); x = np.zeros(len(tt))
for k in range(18): s = int(rng.uniform(0, 3.6) * SR); n = int(.12 * SR); x[s:s + n] += np.sin(2 * np.pi * 4200 * t(.12)) * (np.sin(2 * np.pi * 40 * t(.12)) > 0)
L['crickets'] = norm(x, .3)
tt = t(1.2); f = np.interp(tt, [0, .4, 1.2], [180, 260, 140]); L['yawn'] = norm(env(np.sin(2 * np.pi * np.cumsum(f) / SR) * (.6 + .4 * np.sin(2 * np.pi * 3 * tt)), .1, .4), .4)
tt = t(.6); L['rewind'] = norm(env(rng.normal(0, 1, len(tt)) * np.sin(2 * np.pi * np.cumsum(300 + 2000 * tt) / SR), .01, .05), .4)
out = sys.argv[1]
for k, v in L.items(): wavfile.write(os.path.join(out, k + '.wav'), SR, (np.clip(v, -1, 1) * 32767).astype(np.int16))
print(len(L), 'sfx')
