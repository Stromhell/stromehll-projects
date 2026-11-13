# The Frozen Market: full soundtrack (Kokoro voice + Kevin MacLeod music CC BY 4.0 + bigsoundbank SFX + synth foley), 48 kHz stereo.
import json, wave, numpy as np
from scipy.signal import lfilter, resample_poly
SR = 48000; FPS = 24; NACT = 6
rng = np.random.default_rng(12)
EV = json.load(open('/home/user/work/audio/events.json'))
TM = json.load(open('/home/user/work/voice/timing.json'))
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
SET = {'S01': 'diner', 'S02': 'diner', 'S14': 'diner', 'S29': 'diner', 'S52': 'diner', 'S03': 'room', 'S04': 'wind', 'S06': 'wind', 'S07': 'wind', 'S19': 'wind', 'S51': 'wind', 'S08': 'hum',
       'S10': 'crowd', 'S11': 'room', 'S12': 'room', 'S13': 'room', 'S16': 'hum', 'S17': 'hum', 'S18': 'hum', 'S21': 'hum', 'S22': 'wind', 'S23': 'office', 'S24': 'wind', 'S26': 'wind', 'S27': 'room', 'S28': 'wind',
       'S30': 'wind', 'S32': 'hum', 'S33': 'office', 'S34': 'sea', 'S35': 'room', 'S36': 'room', 'S38': 'crowd', 'S39': 'room', 'S41': 'room', 'S42': 'room', 'S43': 'wind', 'S44': 'room', 'S46': 'wind', 'S47': 'room', 'S48': 'wind', 'S50': 'room'}
AG = {'office': 0.5, 'rain': 1.0, 'storm': 1.0, 'sea': 0.7, 'crowd': 0.5, 'diner': 0.6, 'wind': 0.6, 'hum': 0.7, 'room': 0.5}
def amb(kind, d):
    REAL = {'sea': ('1046', 0.7), 'crowd': ('3515', 0.8), 'wind': ('0595', 0.3), 'office': ('0502', 0.3)}
    if kind in REAL: sid, g = REAL[kind]; return smp(sid, 'rnd', d, 0.2, 0.2) * g * 2.5
    if kind == 'diner': return smp('1193', 'rnd', d, 0.2, 0.2) * 1.0
    return amb_synth(kind, d)
for s in SH:
    if s['card'] is not False: continue
    k = SET.get(s['id'], 'room'); a = amb(k, s['d'] + 0.3); e = np.minimum(1, np.minimum(ts(s['d'] + 0.3), s['d'] + 0.3 - ts(s['d'] + 0.3)) / 0.25)
    put(A, a * e, s['g'] - 0.15, 0.12 * AG[k], 0)
# ---------- voice + duck envelope ----------
duck = np.ones(N)
for s in SH:
    if s['card'] is not False or s['id'] not in TM: continue
    w = wave.open(f"/home/user/work/voice/{s['id']}.wav"); sr0 = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768; w.close()
    x = resample_poly(x, SR // 8000, sr0 // 8000) if sr0 != SR else x; x = hp(x, 0.012)
    put(V, x, s['g'], 1.0)
    for l in TM[s['id']]['lines']:
        i0 = int((s['g'] + l['t0'] - 0.1) * SR); i1 = int((s['g'] + l['t1'] + 0.2) * SR); duck[max(0, i0):i1] = 0.22
duck = lfilter([0.0015], [1, -0.9985], duck)
# ---------- music: one Kevin MacLeod track per mood, continuing where it stopped; card stings ----------
TRK = {'tense': 'Hidden Agenda', 'bouncy': 'Sneaky Snitch', 'curious': 'Investigations', 'thought': 'Thinking Music', 'warm': 'Carefree', 'serious': 'Dark Times', 'sparse': 'Gymnopedie No 1', 'party': 'Fluffing a Duck', 'diner': 'Cool Vibes', 'hep': 'Hep Cats', 'wall': 'Wallpaper'}
MOODS = [('tense', 'S01 S02 S03 S04'), ('thought', 'S06 S07 S08'), ('bouncy', 'S10 S11 S12 S13 S14'), ('warm', 'S16 S17 S18 S19'), ('hep', 'S21 S22 S23 S24'), ('curious', 'S26 S27 S28 S29'), ('party', 'S30'),
         ('serious', 'S32 S33 S34 S35 S36'), ('tense', 'S38 S39'), ('party', 'S41'), ('sparse', 'S42 S43 S44'), ('thought', 'S46 S47 S48'), ('wall', 'S50'), ('warm', 'S51 S52 S53')]
MO = {i: m for m, ids in MOODS for i in ids.split()}
runs = []
for s in SH:
    if s['card'] is not False and s['id'] != 'S53':
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
# diner
for i in ('S01', 'S02', 'S14', 'S29', 'S52'): ticks(i, 0, D(i), 0.25)
at('S01', 0.3, buzz(0.5), 0.5)
at('S02', 2.2, paper(0.5), 0.6); steps('S02', 0.2, 2.6, 0.45, 0.45)
for t in np.arange(4, 9, 0.7): at('S14', t, paper(0.12), 0.35)
at('S29', 7.5, thud(70, 0.8), 1.1); at('S29', 7.55, ding(), 0.5)
at('S52', 0.6, paper(0.4), 0.6); at('S52', 0.9, ding(), 0.4)
# intro
at('S03', 0.5, paper(0.6), 0.6); at('S03', D('S03') * 0.45, flip(), 0.7)
for t in (0.8, 1.6, 2.4): at('S04', t, click(), 0.9)
clinks('S08', 1.0, D('S08') - 1, 8)
# act 1
w = L('S10', 'WENDELL')
if w: [at('S10', w['t0'] + k * max(0.6, (w['t1'] - w['t0']) / 4), thud(200, 0.15), 0.5) for k in range(4)]
steps('S10', max(0, (w['t0'] if w else 3) - 2.4), (w['t0'] if w else 3) - 0.2, 0.45, 0.42)
for k in range(41): at('S11', 3 + k * 0.146, click(), 0.35, rng.uniform(-0.4, 0.4))
at('S12', 0.4, click(), 0.8); at('S12', 0.45, paper(0.3), 0.5)
for k in range(4): at('S13', k * D('S13') / 4 + 0.2, click(), 0.7); at('S13', k * D('S13') / 4 + 0.25, paper(0.25), 0.4)
l = L('S17', 'LINDA', 1)
if l: at('S17', l['t1'] - 0.2, paper(0.4), 0.7)
for t in (0.3, 1.0, 1.6): at('S18', t, clink(), 0.6)
# act 2
g = L('S21', 'GUS', 1)
if g: at('S21', g['t1'] - 0.2, click(), 0.9)
ticks('S21', 0, D('S21'), 0.3)
at('S23', 1.5, paper(1.0), 0.6); at('S23', D('S23') * 0.55, thud(120, 0.4), 1.0)
at('S26', 1.0, paper(0.4), 0.5)
for t in np.array([0.32, 0.36, 0.55, 0.66, 0.76, 0.8]) * D('S27'): at('S27', t, pop(), 0.6)
at('S28', 0, lp(noise(D('S28')), 0.01) * 3.0, 0.5)
at('S30', 0, hp(noise(D('S30')), 0.6) * 0.08, 0.6)
# act 3
at('S32', 1, lp(noise(D('S32') - 2), 0.02) * 2.0, 0.5)
for t in (0.2, 2.0): at('S33', t, paper(0.4), 0.5)
for t in (2.0, 7.5, 12.0): at('S34', t, gull(), 0.6, -0.4)
for t in np.array([0.05, 0.2, 0.35]) * D('S39'): at('S39', t + 0.2, thud(160, 0.35), 0.9)
at('S39', D('S39') * 0.62, creak(0.8), 0.8); at('S39', D('S39') * 0.62, snip(), 1.0)
at('S38', 0.2, smp('3515', 'rnd', 4.0, 0.3, 1.5), 0.5)
for k in range(10): at('S38', 0.3 + k * 0.4, flip(), 0.35)
# act 4
steps('S41', 0.5, D('S41') - 0.5, 0.35, 0.5)
for k in range(8): at('S42', 1 + k * 0.75, click(), 0.4)
ticks('S44', 0, D('S44') * 0.55, 0.7)
at('S44', D('S44') * 0.55, thud(90, 0.4), 0.6)
for t in (D('S46') * 0.12, D('S46') * 0.72): at('S46', t, creak(0.6), 0.9); at('S46', t, snip(), 1.0)
l = L('S47', 'LINDA'); b = (l['t0'] - 3.5) if l else D('S47') * 0.3
at('S47', b, thud(70, 0.8), 1.2); steps('S47', b + 0.1, b + 3.2, 0.7, 0.16, '0376')
for t in (0.3, D('S48') * 0.15): at('S48', t, creak(0.6), 0.9); at('S48', t, snip(), 1.0)
# act 5
for k in range(4): at('S50', np.array([0.12, 0.36, 0.6, 0.76])[k] * D('S50'), click(), 0.8); at('S50', np.array([0.12, 0.36, 0.6, 0.76])[k] * D('S50'), paper(0.3), 0.5)
# ---------- mix ----------
# voice polish (pedalboard, free): gentle EQ + compression on everything; a small room on character lines so they sit in the scene
import pedalboard as pb, pyloudnorm as pyln
cm = np.zeros(N)
for s in SH:
    if s['card'] is not False or s['id'] not in TM: continue
    for l in TM[s['id']]['lines']:
        if l['who'] != 'N': cm[int((s['g'] + l['t0']) * SR):int((s['g'] + l['t1'] + 0.4) * SR)] = 1
cm = lfilter([0.002], [1, -0.998], cm)
dry = pb.Pedalboard([pb.HighpassFilter(75), pb.LowShelfFilter(160, 1.5), pb.PeakFilter(3200, 1.5, 0.9), pb.Compressor(-22, 2.5, 8, 120)])(V.astype(np.float32)[None, :], SR)[0]
wet = pb.Pedalboard([pb.Reverb(room_size=0.18, damping=0.6, wet_level=0.12, dry_level=0.9, width=0.0)])(dry[None, :], SR)[0]
V = dry * (1 - cm) + wet * cm
Vn = V / max(1e-9, np.abs(V).max()) * 0.9
mus = M / max(1e-9, np.abs(M).max()) * 0.5
out = np.zeros((N, 2))
out += Vn[:, None] * 0.95
out += mus * (duck[:, None] * 0.95)
out += X / max(1e-9, np.abs(X).max()) * 0.45
out += A / max(1e-9, np.abs(A).max()) * 0.22 * (0.6 + 0.4 * duck[:, None])
def db(x): return round(20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-9), 1)
sp = duck < 0.5; mu = mus * (duck[:, None] * 0.95); xx = X / max(1e-9, np.abs(X).max()) * 0.45; aa = A / max(1e-9, np.abs(A).max()) * 0.22 * (0.6 + 0.4 * duck[:, None])
print('during speech  voice', db(Vn[sp] * 0.95), 'music', db(mu[sp]), 'sfx', db(xx[sp]), 'amb', db(aa[sp]))
print('no speech      music', db(mu[~sp]), 'sfx', db(xx[~sp]), 'amb', db(aa[~sp]))
for k in []:
    ii = [s for s in SH if not s['card'] and AMB.get(SET.get(s['id']), 'room') == k]
    if ii: s0 = ii[0]; print(' amb', k, db(aa[int(s0['g'] * SR):int((s0['g'] + s0['d']) * SR)]))
out = out[:int(TOTAL * SR)]
fade = int(2.5 * SR); out[-fade:] *= np.linspace(1, 0, fade)[:, None]
lufs = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - lufs) / 20)  # YouTube target
out = pb.Pedalboard([pb.Limiter(-1.0, 80)])(out.T.astype(np.float32), SR).T.astype(float)
l2 = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - l2) / 20)
out /= max(1.0, np.abs(out).max() / 0.89)
print('LUFS before', round(lufs, 1), 'peak', round(float(np.abs(out).max()), 3))
w = wave.open('/home/user/work/audio/frozen_market_mix.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes()); w.close()
json.dump({'act_len': ACT_LEN, 'total': TOTAL}, open('/home/user/work/audio/acts.json', 'w'))
print('ok', ACT_LEN)
