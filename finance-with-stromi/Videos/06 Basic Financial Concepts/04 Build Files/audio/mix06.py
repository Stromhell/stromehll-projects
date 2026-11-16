# Finance with Stromi 06 10 Money Concepts Nobody Explains: full soundtrack (Kokoro voice + Kevin MacLeod music CC BY 4.0 + bigsoundbank SFX + synth foley), 48 kHz stereo.
import json, wave, numpy as np
from scipy.signal import lfilter, resample_poly
SR = 48000; FPS = 24; NACT = 12
rng = np.random.default_rng(12)
EV = json.load(open('/home/user/work/bf/audio/events06.json'))
TM = json.load(open('/home/user/work/bf/voice/timing.json'))
SH = []; off = 0.0; ACT_LEN = []
for a in range(NACT):
    shots = EV[str(a)]['shots']; T = shots[-1]['start'] + shots[-1]['d']; L = round(T * FPS) / FPS
    for s in shots: SH.append(dict(s, g=off + s['start'], act=a))
    ACT_LEN.append(L); off += L
TOTAL = off; N = int(TOTAL * SR) + SR
print('total', round(TOTAL, 2), 's')
V = np.zeros(N); M = np.zeros((N, 2)); X = np.zeros((N, 2)); A = np.zeros((N, 2))
def put(buf, sig, t, g=1.0, pan=0.0):
    i = int(t * SR)
    if i < 0: sig = sig[-i:]; i = 0
    n = min(len(sig), N - i)
    if n <= 0: return
    if buf.ndim == 1: buf[i:i + n] += sig[:n] * g
    else: buf[i:i + n, 0] += sig[:n] * g * (1 - pan) * 0.8; buf[i:i + n, 1] += sig[:n] * g * (1 + pan) * 0.8
def ts(d): return np.arange(int(d * SR)) / SR
def env(n, a=0.005, d=0.3): t = np.arange(n) / SR; return np.minimum(t / a, 1) * np.exp(-t / d)
def noise(d): return rng.standard_normal(int(d * SR))
def lp(x, k): return lfilter([k], [1, k - 1], x)
def hp(x, k): return x - lp(x, k)
NOTE = lambda m: 440 * 2 ** ((m - 69) / 12)
def tone(f, dur, d=0.4, h=(1, .5, .25), a=0.004):
    t = ts(dur); return sum(x * np.sin(2 * np.pi * f * (k + 1) * t) for k, x in enumerate(h)) * env(len(t), a, d)
# ---------- real recordings (bigsoundbank.com, royalty-free; music: Kevin MacLeod incompetech.com CC BY 4.0) ----------
import subprocess, os
_C = {}
def load(path, ch=1):
    k = (path, ch)
    if k not in _C:
        r = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True)
        x = np.frombuffer(r.stdout, np.float32).astype(float); x = x.reshape(-1, ch) if ch > 1 else x
        _C[k] = x / (np.abs(x).max() + 1e-9)
    return _C[k]
SFXD = '/home/user/work/audio/sfx/'
def smp(sid, a=None, d=None, fi=0.01, fo=0.05):
    x = load(SFXD + sid + '.mp3')
    if a is None: nz = np.where(np.abs(x) > 0.05)[0]; a = max(0, nz[0] / SR - 0.01) if len(nz) else 0
    elif a == 'rnd': a = rng.uniform(0, max(0.01, len(x) / SR - (d or 1) - 0.1))
    i0 = int(a * SR); y = x[i0:] if d is None else x[i0:i0 + int(d * SR)]
    if d is not None and len(y) < int(d * SR): y = np.tile(x, int(np.ceil(d * SR / len(x))) + 1)[i0:i0 + int(d * SR)]
    n = len(y); e = np.minimum(1, np.minimum(np.arange(n) / max(1, fi * SR), (n - np.arange(n)) / max(1, fo * SR))); return y * e
# ---------- foley ----------
def whoosh(d=0.55): n = int(d * SR); e = np.sin(np.pi * np.linspace(0, 1, n)) ** 2; return lp(noise(d), 0.07) * e * 1.6
def pop(): t = ts(0.12); f = 900 * np.exp(-t * 18) + 500; return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.002, 0.05) * 0.8 + lp(noise(0.12), 0.4) * env(len(t), 0.001, 0.01) * 0.4
def thud(f0=90, d=0.5): t = ts(d); f = f0 * np.exp(-t * 10) + 40; return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.001, 0.15) * 1.4 + lp(noise(d), 0.3) * env(len(t), 0.001, 0.02) * 0.8
def clink(): f = rng.uniform(2600, 4200); t = ts(0.25); return (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.76 * t)) * env(len(t), 0.0005, 0.05) * 0.35
def bell(f=523, d=2.5): t = ts(d); return sum(a * np.sin(2 * np.pi * f * r * t) for r, a in [(1, 1), (2.4, .6), (4.1, .4), (5.4, .25)]) * env(len(t), 0.001, 0.7) * 0.5
def ding(): return bell(1568, 1.2) * 0.6
def paper(d=0.3): n = int(d * SR); return lp(noise(d), 0.5) * np.abs(np.sin(np.linspace(0, 25, n))) * env(n, 0.01, 0.12) * 0.6
def flip(): return paper(0.18) * 0.8
def click(): t = ts(0.04); return lp(noise(0.04), 0.6) * env(len(t), 0.0005, 0.004) * 1.2
def creak(d=1.0): t = ts(d); f = 180 + 40 * np.sin(2 * np.pi * 1.3 * t); s = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.3; return lp(s, 0.2) * np.minimum(1, np.minimum(t, d - t) / 0.1) * 0.5
def buzz(d=0.33): t = ts(d); return np.sign(np.sin(2 * np.pi * 180 * t)) * (0.5 + 0.5 * np.sin(2 * np.pi * 24 * t)) * np.minimum(1, np.minimum(t, d - t) / 0.01) * 0.12
def thunder(): d = 3.5; t = ts(d); return lp(noise(d), 0.01) * (np.exp(-t / 1.2) * np.minimum(t / 0.05, 1)) * 9
def clack(): t = ts(0.06); return lp(noise(0.06), 0.5) * env(len(t), 0.0005, 0.008) + np.sin(2 * np.pi * 300 * t) * env(len(t), 0.0005, 0.01) * 0.4
def snip(): t = ts(0.12); return hp(noise(0.12), 0.3) * env(len(t), 0.001, 0.02) * 0.8
def cheer(d): t = ts(d); return lp(noise(d), 0.12) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.7 * t)) * np.minimum(1, np.minimum(t, d - t) / 0.6) * 1.2
def gull(): t = ts(0.5); f = 1400 - 600 * t; return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.02, 0.15) * 0.15
def tick(): t = ts(0.03); return np.sin(2 * np.pi * 2500 * t) * env(len(t), 0.0005, 0.004) * 0.4
def register():
    d = np.concatenate([np.zeros(int(0.12 * SR)), ding()]); d[:int(0.2 * SR)] += thud(200, 0.2) * 0.4; return d
# ---------- ambience beds by set ----------
def amb(kind, d):
    REAL = {'rain': ('0740', 1.0), 'storm': ('0740', 3.0), 'sea': ('1046', 0.7), 'crowd': ('3515', 0.8), 'wind': ('0595', 0.3), 'office': ('0502', 0.3)}
    if kind in REAL: sid, g = REAL[kind]; return smp(sid, 'rnd', d, 0.2, 0.2) * g * 2.5
    if kind == 'diner': return smp('1193', 'rnd', d, 0.2, 0.2) * 1.2 + smp('3515', 'rnd', d, 0.2, 0.2) * 1.0
    return amb_synth(kind, d)
def amb_synth(kind, d):
    t = ts(d); n = len(t); f = lambda k, g: lp(rng.standard_normal(n), k) * g
    if kind in ('rain',): return hp(rng.standard_normal(n), 0.5) * 0.06 + f(0.02, 0.6)
    if kind == 'sea': return f(0.01, 1.0) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.15 * t))
    if kind == 'storm': return hp(rng.standard_normal(n), 0.5) * 0.08 + f(0.008, 1.6) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.2 * t))
    if kind == 'diner': return f(0.05, 0.25) * (0.7 + 0.3 * np.sin(2 * np.pi * 0.4 * t))
    if kind == 'hum': return np.sin(2 * np.pi * 60 * t) * 0.02 + np.sin(2 * np.pi * 120 * t) * 0.012 + f(0.02, 0.15)
    if kind == 'wind': return f(0.006, 1.2) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.11 * t))
    if kind == 'crowd': return f(0.08, 0.3) * (0.7 + 0.3 * np.sin(2 * np.pi * 0.3 * t))
    return f(0.015, 0.25)
SET = {}
for k_, ids in {'room': 'B01 B02 B03 B06 B09 B18 B23 B32 B50 B51 B52', 'wind': 'B07 B08 B38 B39 B40', 'office': 'B11 B12 B30 B31', 'crowd': 'B13 B22', 'hum': 'B14 B16 B17 B27 B36 B41 B46 B47 B48', 'store': 'B20 B21', 'party': 'B25 B26 B28', 'sea': 'B34 B35', 'desert': 'B43 B44'}.items():
    for i_ in ids.split(): SET[i_] = k_
AG = {'party': 0.5, 'desert': 0.6, 'store': 0.55, 'office': 0.5, 'rain': 1.0, 'storm': 1.0, 'sea': 0.7, 'crowd': 0.5, 'diner': 0.6, 'wind': 0.6, 'hum': 0.7, 'room': 0.5}
def amb(kind, d):
    REAL = {'sea': ('1046', 0.7), 'crowd': ('3515', 0.8), 'wind': ('0595', 0.3), 'office': ('0502', 0.3)}
    if kind in REAL: sid, g = REAL[kind]; return smp(sid, 'rnd', d, 0.2, 0.2) * g * 2.5
    if kind == 'store': return smp('3515', 'rnd', d, 0.2, 0.2) * 0.9 + smp('0502', 'rnd', d, 0.2, 0.2) * 0.4
    if kind == 'diner': return smp('1193', 'rnd', d, 0.2, 0.2) * 1.0
    if kind == 'party': return smp('3515', 'rnd', d, 0.2, 0.2) * 0.8
    if kind == 'desert': return smp('0595', 'rnd', d, 0.2, 0.2) * 0.6
    return amb_synth(kind, d)
for s in SH:
    if s['card'] is not False: continue
    k = SET.get(s['id'], 'room'); a = amb(k, s['d'] + 0.3); e = np.minimum(1, np.minimum(ts(s['d'] + 0.3), s['d'] + 0.3 - ts(s['d'] + 0.3)) / 0.25)
    put(A, a * e, s['g'] - 0.15, 0.12 * AG[k], 0)
# ---------- voice + duck envelope ----------
duck = np.ones(N)
for s in SH:
    if s['card'] is not False or s['id'] not in TM or not TM[s['id']]['lines']: continue
    w = wave.open(f"/home/user/work/bf/voice2/{s['id']}.wav"); sr0 = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768; w.close()
    x = resample_poly(x, SR // 8000, sr0 // 8000) if sr0 != SR else x; x = hp(x, 0.012)
    put(V, x, s['g'], 1.0)
    for l in TM[s['id']]['lines']:
        i0 = int((s['g'] + l['t0'] - 0.1) * SR); i1 = int((s['g'] + l['t1'] + 0.2) * SR); duck[max(0, i0):i1] = 0.22
duck = lfilter([0.0015], [1, -0.9985], duck)
# ---------- music: one Kevin MacLeod track per mood, continuing where it stopped; card stings ----------
TRK = {'tense': 'Hidden Agenda', 'bouncy': 'Sneaky Snitch', 'curious': 'Investigations', 'thought': 'Thinking Music', 'warm': 'Carefree', 'serious': 'Dark Times', 'sparse': 'Gymnopedie No 1', 'party': 'Fluffing a Duck', 'diner': 'Cool Vibes', 'hep': 'Hep Cats', 'wall': 'Wallpaper', 'elev': 'Local Forecast - Elevator'}
MOODS = [('warm', 'B01 B02 B03'), ('curious', 'B06 B07'), ('bouncy', 'B08'), ('thought', 'B09'), ('curious', 'B11 B12'), ('tense', 'B13'), ('warm', 'B14'),
         ('thought', 'B16'), ('tense', 'B17'), ('warm', 'B18'), ('bouncy', 'B20 B21'), ('hep', 'B22'), ('thought', 'B23'), ('party', 'B25'), ('serious', 'B26 B27'), ('warm', 'B28'),
         ('curious', 'B30 B31'), ('bouncy', 'B32'), ('wall', 'B34 B35'), ('thought', 'B36'), ('warm', 'B38 B39'), ('bouncy', 'B40'), ('tense', 'B41'), ('diner', 'B43 B44'),
         ('thought', 'B46 B47'), ('wall', 'B48'), ('warm', 'B50 B51'), ('sparse', 'B52')]
MO = {i: m for m, ids in MOODS for i in ids.split()}
MO = {i: m for m, ids in MOODS for i in ids.split()}
runs = []
for s in SH:
    if s['card'] is not False and True:
        r0 = 45  # chapter card sting: rising piano + whoosh
        for k, mm in enumerate([r0 + 24, r0 + 28, r0 + 31, r0 + 36]): put(M, tone(NOTE(mm), 1.6, 0.6, (1, .45, .2, .08)), s['g'] + 0.15 + k * 0.18, 0.16, (k - 1.5) * 0.2)
        put(X, smp('1796', None, 1.1), s['g'] - 0.4, 0.6); continue
    st = MO[s['id']]
    if runs and runs[-1][0] == st and abs(runs[-1][2] - s['g']) < 0.05: runs[-1][2] = s['g'] + s['d']
    else: runs.append([st, s['g'], s['g'] + s['d']])
pos = {}
for st, g0, g1 in runs:
    x = load('/home/user/work/audio/mus/' + TRK[st] + '.mp3', 2); d = g1 - g0 + 1.0; o = pos.get(st, 0.0)
    n = int(d * SR); i0 = int(o * SR) % len(x); y = np.concatenate([x[i0:], x, x])[:n]
    pos[st] = (o + d) % (len(x) / SR)
    e = np.minimum(1, np.minimum(np.arange(n) / SR / 1.0, (n - np.arange(n)) / SR / 1.0))[:, None]
    i = max(0, int((g0 - 0.5) * SR)); m = min(n, N - i); M[i:i + m] += (y * e)[:m] * 0.5
# ---------- cuts + motion-graphics / tag pops ----------
for s in SH[1:]: put(X, whoosh(0.5), s['g'] - 0.3, 0.35)
aoff = [sum(ACT_LEN[:a]) for a in range(NACT)]
for a in range(NACT):
    for tt in EV[str(a)]['pops']: put(X, pop(), aoff[a] + tt + 0.1, 0.35, rng.uniform(-0.3, 0.3))
# ---------- per-shot foley ----------
G = {s['id']: s for s in SH}
def at(i, lt, sig, g=1.0, pan=0.0): put(X, sig, G[i]['g'] + lt, g, pan)
def coins(i, t0, t1, rate):  # real coin pours, layered for density
    d = t1 - t0
    if d <= 0: return
    for k in range(1 + int(rate > 11)): at(i, t0, smp(('0194', '0193')[k], 'rnd', d, 0.05, 0.3), 0.5 + rate / 30, (-0.3, 0.4)[k])
# real-recording replacements for the synth foley
ding = lambda: smp('2531', None, 1.6) * 0.8
bell = lambda f=660, d=3.0: smp('1927', None, min(d, 4.0)) * 0.9
gull = lambda: smp('2573', 'rnd', 2.0, 0.1, 0.4) * 0.8
thunder = lambda: smp('3115', 'rnd', 3.5, 0.02, 0.8) * 1.2
paper = lambda d=0.3: smp('1250', 'rnd', max(0.25, d), 0.01, 0.08) * 0.9
flip = lambda: smp('1250', 'rnd', 0.3, 0.01, 0.08) * 0.8
def ticks(i, t0, t1, g=0.6): at(i, t0, smp('2816', 'rnd', t1 - t0, 0.05, 0.1), g)
_ST = {}
def step_hits(sid):  # cut single footsteps out of a real recording by onset
    if sid not in _ST:
        x = load(SFXD + sid + '.mp3'); e = np.convolve(np.abs(x), np.ones(240) / 240, 'same'); th = e.max() * 0.25; on = []
        i = 0
        while i < len(e):
            if e[i] > th: on.append(i); i += int(0.3 * SR)
            else: i += 48
        _ST[sid] = [x[max(0, o - 240): o + int(0.22 * SR)] * np.minimum(1, (int(0.22 * SR) + 240 - np.arange(len(x[max(0, o - 240): o + int(0.22 * SR)]))) / 2400) for o in on]
    return _ST[sid]
def steps(i, t0, t1, g=0.5, every=0.75, sid='0514'):  # one real footstep per stride, timed to the walk cycle
    h = step_hits(sid)
    for k, t in enumerate(np.arange(t0, t1, every)): at(i, t + rng.uniform(-0.02, 0.02), h[rng.integers(len(h))], g * rng.uniform(0.8, 1.0), (-0.15, 0.15)[k % 2])
def keys(i, t0, t1, g=0.5): at(i, t0, smp('0229', 'rnd', t1 - t0, 0.05, 0.1), g)

def L(i, who, n=0):
    l = [x for x in TM.get(i, {}).get('lines', []) if x['who'] == who]; return l[n] if len(l) > n else None
D = lambda i: G[i]['d']
def clinks(i, t0, t1, n): [at(i, t, clink(), 0.7, rng.uniform(-0.3, 0.3)) for t in np.linspace(t0, t1, n)]
# ---------- per-shot foley (video 03) ----------
def reg_beep(): t = ts(0.12); return np.sin(2 * np.pi * 1800 * t) * env(len(t), 0.002, 0.08) * 0.5
def tap_ok(): return np.concatenate([reg_beep(), np.zeros(int(0.06 * SR)), reg_beep()])
def roll(d): t = ts(d); return lp(noise(d), 0.05) * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * t)) * np.minimum(1, (d - t) / 0.2) * 0.8
def engine(d): t = ts(d); return lp(np.sign(np.sin(2 * np.pi * 38 * t)) * 0.4 + noise(d) * 0.2, 0.08) * np.minimum(1, np.minimum(t, d - t) / 0.3)
def sputter(): d = 2.0; t = ts(d); return engine(d) * (np.sin(2 * np.pi * 3 * t) > 0) * np.exp(-t * 0.8)
def stamp(): return thud(120, 0.4) * 1.2
def saw_s(): n = int(0.12 * SR); return hp(noise(0.12), 0.4) * env(n, 0.005, 0.05)
def TM_(i, q):
    for l in TM.get(i, {}).get('lines', []):
        tx = l['text'].lower()
        if q.lower() in tx: return l['t0'] + (l['t1'] - l['t0']) * tx.index(q.lower()) / len(tx)
    print('foley anchor miss', i, q); return 0.5

def spray(d=1.5): return smp('0740', 'rnd', d, 0.02, 0.4) * 1.5
def bleep(n, gap=0.12, f=1200):
    t = ts(0.07); b = np.sin(2 * np.pi * f * t) * env(len(t), 0.002, 0.04) * 0.4; return np.concatenate([np.concatenate([b, np.zeros(int(gap * SR))]) for _ in range(n)])
def errbuzz(): return lp(np.concatenate([buzz(0.18), np.zeros(int(0.08 * SR)), buzz(0.18)]), 0.15) * 3.0
def powerdown(): t = ts(0.8); f = 600 * np.exp(-t * 3) + 60; return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.005, 0.4) * 0.4
def flaps(i, t0, t1, g=0.6): ticks(i, t0, t1, g); [at(i, t, clack(), 0.35, rng.uniform(-0.4, 0.4)) for t in np.arange(t0, t1, 0.11)]
def Lt(i, who, n=0, k='t0'): l = L(i, who, n); return l[k] if l else 0.5

def water(d, g=1.0): t = ts(d); return (hp(noise(d), 0.35) * 0.25 + lp(noise(d), 0.08) * 0.8) * np.minimum(1, np.minimum(t, d - t) / 0.3) * g
def gurgle(d): t = ts(d); return lp(noise(d), 0.03) * (0.5 + 0.5 * np.sin(2 * np.pi * 5 * t) ** 2) * np.minimum(1, np.minimum(t, d - t) / 0.3) * 1.5
def sweep(d): t = ts(d); return hp(noise(d), 0.25) * (0.3 + 0.7 * np.abs(np.sin(2 * np.pi * 0.48 * t))) * 0.35
def squeak(): t = ts(0.25); f = 1800 + 400 * np.sin(2 * np.pi * 9 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.01, 0.12) * 0.12
def rattle(d): t = ts(d); return lp(noise(d), 0.25) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 6 * t))) * 0.35
def flutter(d): t = ts(d); return hp(noise(d), 0.2) * (0.4 + 0.6 * np.abs(np.sin(2 * np.pi * 7 * t))) * np.minimum(1, (d - t) / 0.3) * 0.5
G2 = lambda i, w, n=0, k='t0': Lt(i, w, n, k)
# ---------- per-shot foley (video 06) ----------
def notif(): return np.concatenate([tone(NOTE(76), 0.12, 0.08), tone(NOTE(83), 0.3, 0.2)]) * 0.2
def chime(): return np.concatenate([tone(NOTE(84), 0.2, 0.15), tone(NOTE(79), 0.5, 0.3)]) * 0.25
def honk(): t = ts(0.35); f = 330 + 60 * np.sin(2 * np.pi * 7 * t); s_ = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.5; return lp(s_, 0.25) * env(len(t), 0.01, 0.2) * 0.5
def splash(): return smp('1046', 'rnd', 1.2, 0.02, 0.6) * 1.2
def sad_tb(): return np.concatenate([tone(NOTE(m), 0.45, 0.35, (1, .6, .3)) for m in (55, 54, 53)] + [tone(NOTE(52), 1.2, 0.8, (1, .6, .3))]) * 0.3
at('B01', 0.2, smp('2816', 'rnd', 6.0, 0.3, 0.5), 0.35); steps('B01', 0.8, 3.0, 0.4, 0.45); at('B01', TM_('B01', 'two thousand dollars'), paper(0.4), 0.6)
at('B02', 0.4, notif(), 0.6); at('B02', TM_('B02', 'thirty-one'), sad_tb(), 0.5)
for k in range(10): at('B03', TM_('B03', 'sit down') - 6 + k * 0.45 if TM_('B03', 'sit down') > 6 else 2 + k * 0.45, flip(), 0.4, rng.uniform(-0.3, 0.3))
at('B03', 0.4, clink(), 0.4)
for q_ in ('social security', 'medicare', 'federal income', 'state'): at('B06', TM_('B06', q_), thud(240, 0.15), 0.4); at('B06', TM_('B06', q_) + 0.05, paper(0.25), 0.4)
at('B07', TM_('B07', 'roads'), engine(4.0), 0.25); at('B07', TM_('B07', 'firefighters'), honk(), 0.4); at('B07', TM_('B07', 'firefighters') + 0.5, engine(3.0), 0.3)
at('B08', 0.2, engine(2.0), 0.15); at('B08', G2('B08', 'THEO') + 0.2, thud(70, 0.5), 0.5)
at('B09', G2('B09', 'NANA') - 0.2, chime(), 0.4); at('B09', 0.5, flip(), 0.5)
steps('B11', 0.3, 3.6, 0.45, 0.45); at('B11', TM_('B11', 'not what happens'), paper(0.4), 0.5); at('B11', TM_('B11', 'not what happens') + 0.6, whoosh(1.2), 0.4)
at('B11', 0.2, smp('2531', None, 1.6), 0.25)
coins('B12', TM_('B12', 'lends most'), TM_('B12', 'lends most') + 1.5, 6); at('B12', G2('B12', 'WENDELL') - 0.4, engine(1.6), 0.4); at('B12', G2('B12', 'THEO') + 0.1, thud(140, 0.3), 0.3)
at('B13', 0.3, smp('3515', 'rnd', D('B13') - 1, 0.5, 0.8), 0.45); at('B13', TM_('B13', 'closed the next'), stamp(), 0.5)
at('B14', TM_('B14', 'insured'), bell(), 0.35); at('B14', 0.4, creak(1.5), 0.4); at('B14', G2('B14', 'THEO', 1), chime(), 0.4)
at('B16', TM_('B16', 'simple interest'), flip(), 0.5); at('B16', TM_('B16', 'compound'), stamp(), 0.5)
for k in range(14): at('B17', TM_('B17', 'only pays') + k * 0.35, paper(0.2), 0.35, rng.uniform(-0.3, 0.3))
at('B17', G2('B17', 'GUS', 1) + 0.3, sad_tb(), 0.4)
for k in range(6): at('B18', TM_('B18', 'seven percent') + 0.6 + k * 0.7, clink(), 0.6 + k * 0.05)
coins('B18', TM_('B18', 'seven percent') + 4.2, TM_('B18', 'seven percent') + 6, 10)
at('B20', 0.3, smp('1417', None, 0.3), 0.5); at('B20', G2('B20', 'DOT', 1) + 0.3, smp('1417', None, 0.3), 0.5); at('B20', 1.2, paper(0.5), 0.5)
for k in range(4): at('B21', 2 + k * 2.5, smp('1417', None, 0.3), 0.35)
at('B21', D('B21') - 4, register(), 0.4)
at('B22', G2('B22', 'MABEL'), stamp(), 0.4); at('B22', G2('B22', 'MABEL') + 2.5, smp('2363', None, 3.0), 0.3); at('B22', 0.2, smp('3515', 'rnd', 5, 0.3, 1), 0.3)
at('B23', G2('B23', 'NANA') + 0.3, clink(), 0.5); at('B23', 0.3, creak(1.0), 0.3)
at('B25', 0.2, smp('3515', 'rnd', D('B25') - 0.5, 0.3, 0.5), 0.5); [at('B25', t, clink(), 0.5, rng.uniform(-0.4, 0.4)) for t in np.arange(1.0, D('B25') - 1, 1.3)]
at('B26', 0.1, powerdown(), 0.6); at('B26', G2('B26', 'N') + 0.5, sad_tb(), 0.35)
at('B27', TM_('B27', 'two quarters'), snip(), 0.4); at('B27', TM_('B27', 'two quarters') + 1.5, stamp(), 0.5); at('B27', TM_('B27', 'december'), paper(0.4), 0.5)
at('B28', 0.5, smp('2573', 'rnd', 2.0, 0.1, 0.4), 0.2); at('B28', TM_('B28', 'ended'), chime(), 0.4)
at('B30', G2('B30', 'MABEL'), smp('0229', 'rnd', 1.2, 0.05, 0.1), 0.4); at('B30', G2('B30', 'MABEL', 1), creak(0.8), 0.3)
for q_ in ('payment history', 'amounts owed', 'length', 'new credit', 'mix'): at('B31', TM_('B31', q_), pop(), 0.5)
at('B32', 0.3, clink(), 0.4); at('B32', G2('B32', 'NANA', 1) + 0.6, chime(), 0.3)
at('B34', 0.2, smp('2573', 'rnd', 2.0, 0.1, 0.4), 0.5); at('B34', TM_('B34', 'agree'), thud(60, 0.8), 0.5)
at('B35', 0.3, splash(), 0.6); at('B35', G2('B35', 'DOT', 2) - 0.2, chime(), 0.3)
at('B36', TM_('B36', 'nineteen seventy-one'), stamp(), 0.6); at('B36', TM_('B36', 'gold'), bell(), 0.25)
at('B38', 0.3, smp('2573', 'rnd', 2.0, 0.1, 0.4), 0.2); at('B38', TM_('B38', 'investing'), thud(90, 0.4), 0.4)
for q_ in ('stocks', 'bonds', 'funds'): at('B39', TM_('B39', q_), thud(200, 0.2), 0.4)
at('B39', G2('B39', 'PIP'), roll(2.0), 0.4)
at('B40', G2('B40', 'PIP'), smp('2816', 'rnd', 2.5, 0.1, 0.3), 0.4)
at('B41', 0.3, smp('2816', 'rnd', D('B41') - 1, 0.3, 0.5), 0.15); at('B41', TM_('B41', 'never starting'), thud(70, 0.6), 0.5)
at('B43', 0.2, smp('0595', 'rnd', 4.0, 0.5, 0.8), 0.4); steps('B43', 0.5, max(1, G2('B43', 'WENDELL') - 0.6), 0.35, 0.6); at('B43', G2('B43', 'DOT', 1) + 0.6, register(), 0.4)
for q_ in ('surgeon', 'brands'): at('B44', TM_('B44', q_), pop(), 0.5)
at('B46', 0.2, smp('2816', 'rnd', D('B46') - 0.5, 0.3, 0.5), 0.5); at('B46', 0.5, bell(), 0.2)
at('B47', 0.2, smp('2816', 'rnd', D('B47') - 0.5, 0.3, 0.5), 0.45); coins('B47', TM_('B47', 'two hundred and eighty'), TM_('B47', 'two hundred and eighty') + 1.5, 10)
at('B48', 0.2, smp('2816', 'rnd', D('B48') - 0.5, 0.3, 0.5), 0.45); at('B48', TM_('B48', 'flips'), whoosh(0.8), 0.5)
for k in range(10): at('B50', 1.0 + k * 0.5, flip(), 0.35, rng.uniform(-0.3, 0.3))
at('B51', 0.4, tap_ok(), 0.5); at('B51', G2('B51', 'NANA', 1), clink(), 0.4)
at('B52', 0.6, paper(0.5), 0.5); at('B52', G2('B52', 'THEO') , thud(160, 0.3), 0.3); at('B52', D('B52') - 6.5, chime(), 0.35)
# ---------- mix ----------
# voice polish (pedalboard, free): gentle EQ + compression on everything; a small room on character lines so they sit in the scene
import pedalboard as pb, pyloudnorm as pyln
import gc
f32 = np.float32
V = V.astype(f32); M = M.astype(f32); X = X.astype(f32); A = A.astype(f32); duck = duck.astype(f32); gc.collect()
cm = np.zeros(N, f32)
for s in SH:
    if s['card'] is not False or s['id'] not in TM: continue
    for l in TM[s['id']]['lines']:
        if l['who'] != 'N': cm[int((s['g'] + l['t0']) * SR):int((s['g'] + l['t1'] + 0.4) * SR)] = 1
cm = lfilter([0.002], [1, -0.998], cm).astype(f32)
dry = pb.Pedalboard([pb.HighpassFilter(75), pb.LowShelfFilter(160, 1.5), pb.PeakFilter(3200, 1.5, 0.9), pb.Compressor(-22, 2.5, 8, 120)])(V[None, :], SR)[0]
del V; gc.collect()
wet = pb.Pedalboard([pb.Reverb(room_size=0.18, damping=0.6, wet_level=0.12, dry_level=0.9, width=0.0)])(dry[None, :], SR)[0]
Vn = dry * (1 - cm) + wet * cm; del dry, wet, cm; gc.collect()
Vn *= 0.9 / max(1e-9, np.abs(Vn).max())
out = np.repeat((Vn * 0.95)[:, None], 2, 1); del Vn
M *= 0.42 / max(1e-9, np.abs(M).max()); M *= (duck[:, None] * 0.95); out += M; del M
X *= 0.30 / max(1e-9, np.abs(X).max()); X *= (0.4 + 0.6 * duck[:, None]); out += X; del X
A *= 0.14 / max(1e-9, np.abs(A).max()); A *= (0.3 + 0.7 * duck[:, None]); out += A; del A; gc.collect()
out = out[:int(TOTAL * SR)]
fade = int(2.5 * SR); out[-fade:] *= np.linspace(1, 0, fade)[:, None]
lufs = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - lufs) / 20)  # YouTube target
out = np.ascontiguousarray(pb.Pedalboard([pb.Limiter(-1.0, 80)])(np.ascontiguousarray(out.T), SR).T)
l2 = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - l2) / 20)
out /= max(1.0, np.abs(out).max() / 0.89)
print('LUFS before', round(lufs, 1), 'peak', round(float(np.abs(out).max()), 3))
w = wave.open('/home/user/work/bf/audio/mix06_v1.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes()); w.close()
json.dump({'act_len': ACT_LEN, 'total': TOTAL}, open('/home/user/work/bf/audio/acts06.json', 'w'))
print('ok', ACT_LEN)
