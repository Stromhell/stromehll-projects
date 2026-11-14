# Finance with Stromi 04 The 48-Hour Blackout: full soundtrack (Kokoro voice + Kevin MacLeod music CC BY 4.0 + bigsoundbank SFX + synth foley), 48 kHz stereo.
import json, wave, numpy as np
from scipy.signal import lfilter, resample_poly
SR = 48000; FPS = 24; NACT = 7
rng = np.random.default_rng(12)
EV = json.load(open('/home/user/work/bo/audio/events.json'))
TM = json.load(open('/home/user/work/bo/voice/timing.json'))
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
for k_, ids in {'room': 'S03 S07 S10 S20 S23 S28 S29 S30 S35 S38 S40 S41 S46 S47 S49 S53 S54 S56 S57 S58',
               'crowd': 'S01 S02 S04 S17 S18 S21 S22 S60 S61 S62', 'office': 'S06 S11 S12 S14 S15 S43 S44 S45 S48 S59',
               'hum': 'S08 S13 S19 S25 S26 S27 S32 S33 S34 S39', 'wind': 'S36 S51 S52'}.items():
    for i_ in ids.split(): SET[i_] = k_
AG = {'store': 0.55, 'office': 0.5, 'rain': 1.0, 'storm': 1.0, 'sea': 0.7, 'crowd': 0.5, 'diner': 0.6, 'wind': 0.6, 'hum': 0.7, 'room': 0.5}
def amb(kind, d):
    REAL = {'sea': ('1046', 0.7), 'crowd': ('3515', 0.8), 'wind': ('0595', 0.3), 'office': ('0502', 0.3)}
    if kind in REAL: sid, g = REAL[kind]; return smp(sid, 'rnd', d, 0.2, 0.2) * g * 2.5
    if kind == 'store': return smp('3515', 'rnd', d, 0.2, 0.2) * 0.9 + smp('0502', 'rnd', d, 0.2, 0.2) * 0.4
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
    w = wave.open(f"/home/user/work/bo/voice/{s['id']}.wav"); sr0 = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768; w.close()
    x = resample_poly(x, SR // 8000, sr0 // 8000) if sr0 != SR else x; x = hp(x, 0.012)
    put(V, x, s['g'], 1.0)
    for l in TM[s['id']]['lines']:
        i0 = int((s['g'] + l['t0'] - 0.1) * SR); i1 = int((s['g'] + l['t1'] + 0.2) * SR); duck[max(0, i0):i1] = 0.22
duck = lfilter([0.0015], [1, -0.9985], duck)
# ---------- music: one Kevin MacLeod track per mood, continuing where it stopped; card stings ----------
TRK = {'tense': 'Hidden Agenda', 'bouncy': 'Sneaky Snitch', 'curious': 'Investigations', 'thought': 'Thinking Music', 'warm': 'Carefree', 'serious': 'Dark Times', 'sparse': 'Gymnopedie No 1', 'party': 'Fluffing a Duck', 'diner': 'Cool Vibes', 'hep': 'Hep Cats', 'wall': 'Wallpaper', 'elev': 'Local Forecast - Elevator'}
MOODS = [('tense', 'S01 S02 S03 S04'), ('bouncy', 'S06 S07 S08'), ('curious', 'S10 S11 S12'), ('hep', 'S13 S14 S15'), ('tense', 'S17 S18 S19'), ('thought', 'S20 S21 S22'),
         ('curious', 'S23 S25 S26 S27'), ('serious', 'S28 S29 S30'), ('bouncy', 'S32 S33 S34'), ('thought', 'S35 S36'), ('tense', 'S38 S39 S40 S41'), ('elev', 'S43 S44 S45'),
         ('curious', 'S46 S47 S48 S49'), ('warm', 'S51 S52 S53 S54'), ('thought', 'S56 S57 S58'), ('warm', 'S59 S60'), ('sparse', 'S61 S62 S99')]
MO = {i: m for m, ids in MOODS for i in ids.split()}
runs = []
for s in SH:
    if s['card'] is not False and s['id'] != 'S99':
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
def errbuzz(): return np.concatenate([buzz(0.18), np.zeros(int(0.08 * SR)), buzz(0.18)]) * 2.5
def powerdown(): t = ts(0.8); f = 600 * np.exp(-t * 3) + 60; return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.005, 0.4) * 0.4
def flaps(i, t0, t1, g=0.6): ticks(i, t0, t1, g); [at(i, t, clack(), 0.35, rng.uniform(-0.4, 0.4)) for t in np.arange(t0, t1, 0.11)]
def Lt(i, who, n=0, k='t0'): l = L(i, who, n); return l[k] if l else 0.5
# cold open
flaps('S01', 3.0, D('S01') - 3.5); at('S01', TM_('S01', 'stopped every plane'), thud(70, 0.6), 0.8); at('S01', 0.5, ding(), 0.25)
steps('S02', max(0.2, Lt('S02', 'JIMMY') - 2.4), Lt('S02', 'JIMMY') - 0.1, 0.5, 0.42); at('S02', TM_('S02', 'first thing'), thud(110, 0.3), 0.5)
for k in range(12): at('S03', 2.0 + k * 0.25, pop(), 0.35, rng.uniform(-0.4, 0.4))
at('S04', 0.3, whoosh(1.2), 0.5); flaps('S04', 0.6, 2.4, 0.4)
# act 1
n_ = TM_('S06', 'nina,'); steps('S06', n_ - 1.2, n_ + 1.6, 0.45, 0.42); keys('S06', n_ + 2.0, n_ + 6.0, 0.35); at('S06', TM_('S06', 'inbox'), ding(), 0.3)
at('S07', TM_('S07', 'rings'), clink(), 0.9); at('S07', TM_('S07', 'rings') + 0.2, clink(), 0.7); at('S07', TM_('S07', 'wedding'), bell(), 0.25)
at('S08', TM_('S08', 'clocks in'), tap_ok(), 0.8); at('S08', TM_('S08', 'three people'), thud(120, 0.3), 0.5)
for k in range(18): at('S10', 1.0 + k * (D('S10') - 3) / 18, pop(), 0.3, rng.uniform(-0.5, 0.5))
keys('S11', 0.2, 2.0, 0.45); at('S11', 1.0, errbuzz(), 0.5); at('S11', Lt('S11', 'WENDELL', 2) + 0.3, thud(90, 0.4), 0.6)
keys('S12', 0.3, 3.0, 0.3); at('S12', TM_('S12', 'spinning circle'), bleep(3), 0.5)
at('S13', TM_('S13', 'pipes bigger'), creak(1.2), 0.7); t_ = TM_('S13', 'joint burst'); at('S13', t_, thud(80, 0.4), 0.8); at('S13', t_ + 0.05, spray(2.5), 0.7)
ticks('S14', 0.2, Lt('S14', 'NINA') - 0.3, 0.8)
t_ = Lt('S14', 'DOT'); at('S14', t_ + 0.2, np.concatenate([buzz(0.3)] * 1 + [np.zeros(int(0.1 * SR))]) * 2, 0.6); [at('S14', t_ + 0.6 + k * 0.4, bleep(1, 0.1, 900), 0.4) for k in range(4)]
keys('S15', 0.3, 2.5, 0.35); at('S15', TM_('S15', 'real dollars'), clink(), 0.6)
# act 2
t_ = TM_('S17', 'ground stop'); at('S17', t_ - 0.6, ding(), 0.5); flaps('S17', t_, t_ + 2.4, 0.6); at('S17', TM_('S17', 'no departures'), thud(70, 0.5), 0.6)
at('S18', 0.4, errbuzz(), 0.3); at('S18', TM_('S18', 'pretzel') if TM_('S18', 'pretzel') != 0.5 else 2.0, pop(), 0.4)
for k in range(10): at('S19', 0.5 + k * 0.6, bleep(2, 0.08, 1500 + 200 * (k % 3)), 0.25, rng.uniform(-0.5, 0.5))
at('S19', TM_('S19', 'patchy'), buzz(0.6) * 2, 0.5); at('S19', TM_('S19', 'gaps'), buzz(0.6) * 2, 0.5)
for k in range(10): at('S20', TM_('S20', 'landed') - 1 + k * 0.15, pop(), 0.3, rng.uniform(-0.4, 0.4))
flaps('S21', 0.5, 2.5, 0.5); at('S21', TM_('S21', 'four thousand'), thud(90, 0.4), 0.6); at('S21', TM_('S21', 'ten thousand'), thud(90, 0.4), 0.5)
at('S22', 0.5, paper(0.3), 0.4)
for q in ('september', 'january'): at('S23', TM_('S23', q), thud(150, 0.25), 0.6)
at('S23', TM_('S23', 'much longer'), pop(), 0.5)
at('S25', TM_('S25', 'fiber'), click(), 0.8); t_ = TM_('S25', 'flooding')
for k in range(16): at('S25', t_ + k * 0.18, bleep(1, 0.05, 1800 + 300 * (k % 4)), 0.35, rng.uniform(-0.5, 0.5))
at('S26', Lt('S26', 'WENDELL', 0, 't1'), click(), 1.0); t_ = Lt('S26', 'ROUTER', 1)
for k in range(24): at('S26', t_ + k * 0.14, bleep(1, 0.05, 1600 + 250 * (k % 5)), 0.4, rng.uniform(-0.6, 0.6))
for k in range(8): at('S26', t_ + 1.5 + k * 0.3, snip(), 0.5, rng.uniform(-0.4, 0.4))
at('S27', TM_('S27', 'switched off'), click(), 0.9); at('S27', TM_('S27', 'switched off') + 0.1, powerdown(), 0.7)
at('S28', TM_('S28', 'iphone'), pop(), 0.5); at('S28', TM_('S28', 'september'), paper(0.5), 0.6)
t_ = Lt('S29', 'GUS', 2); at('S29', t_ - 0.3, flip(), 0.9); at('S29', 0.4, thud(140, 0.3) * 1.2, 0.6)
t_ = TM_('S30', 'fifty billion'); coins('S30', t_ - 0.2, t_ + 3.0, 14); at('S30', TM_('S30', 'somebody receives'), clink(), 0.8)
# act 3
steps('S32', 0.3, 2.6, 0.45, 0.45); at('S32', TM_('S32', 'workday starts') + 0.5, errbuzz(), 0.7)
at('S33', TM_('S33', 'clock in'), errbuzz(), 0.4); at('S33', TM_('S33', 'health insurance'), thud(110, 0.3), 0.4)
at('S34', Lt('S34', 'DOT', 2), creak(0.9), 0.6)
at('S35', 0.5, paper(0.5), 0.6); at('S35', TM_('S35', 'read that again'), thud(120, 0.3), 0.6)
at('S36', 0.8, thud(60, 0.5), 0.6); ticks('S36', TM_('S36', 'half hour'), TM_('S36', 'half hour') + 2, 0.4)
at('S38', TM_('S38', 'cyberattack'), whoosh(0.6), 0.5); at('S38', TM_('S38', 'nefarious'), thud(140, 0.3) * 1.2, 0.7)
at('S39', 0.6, click(), 1.0); at('S39', 0.65, thud(200, 0.2), 0.4); keys('S39', 0.2, 0.6, 0.6); steps('S39', 0.0, 1.4, 0.5, 0.4)
for q in ('white house', 'microsoft said', 'workday'): at('S40', TM_('S40', q), stamp(), 0.6)
for q in ('microsoft:', 'copper-to-fiber', 'backups'): at('S41', TM_('S41', q), pop(), 0.6)
at('S41', TM_('S41', 'complexity'), thud(70, 0.6), 0.7)
# act 4 (market)
ticks('S43', TM_('S43', 'closes at four'), Lt('S43', 'GUS'), 0.7); at('S43', Lt('S43', 'GUS', 1) - 0.3, bell(), 0.9)
for q in ('united', 'jetblue and', 'american', 'delta'): at('S44', TM_('S44', q), pop(), 0.5)
at('S45', TM_('S45', 'flat'), thud(130, 0.3), 0.5)
at('S46', 0.4, paper(0.5), 0.5); at('S46', TM_('S46', 'eleven percent'), whoosh(0.6), 0.5); at('S46', TM_('S46', 'higher than'), ding(), 0.35)
at('S47', TM_('S47', 'punish'), thud(100, 0.4), 0.6)
at('S48', 0.4, bell(), 0.6); [at('S48', TM_('S48', q), pop(), 0.5) for q in ('airlines,', 'workday,', 'paid to fix')]
steps('S49', 0.3, 3.0, 0.45, 0.45); at('S49', TM_('S49', 'sales pitch'), register(), 0.6)
# act 5
t_ = TM_('S51', 'drops a boot'); at('S51', t_ + 0.9, thud(60, 0.5), 0.6); at('S51', t_ + 0.95, spray(1.5), 0.6)
at('S52', TM_('S52', 'single point'), thud(70, 0.6), 0.7); at('S52', TM_('S52', 'one boot'), whoosh(0.7), 0.5)
at('S53', TM_('S53', 'five hundred'), pop(), 0.5); at('S54', TM_('S54', 'panic'), pop(), 0.5)
for i_ in ('S56', 'S57', 'S58'): at(i_, 0.3, paper(0.5), 0.6); at(i_, 0.8, thud(150, 0.25), 0.4)
keys('S59', 0.3, 2.5, 0.4); at('S59', TM_('S59', 'email is back'), ding(), 0.5); at('S59', TM_('S59', 'every hour'), errbuzz(), 0.3)
at('S60', 0.1, creak(1.0), 0.7); steps('S60', 0.4, 2.0, 0.6, 0.3); at('S60', D('S60') - 2.5, cheer(2.5), 0.4)
flaps('S61', 2.0, D('S61') - 3.0, 0.5)
at('S62', 0.5, ding(), 0.4)

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
M *= 0.5 / max(1e-9, np.abs(M).max()); M *= (duck[:, None] * 0.95); out += M; del M
X *= 0.45 / max(1e-9, np.abs(X).max()); out += X; del X
A *= 0.22 / max(1e-9, np.abs(A).max()); A *= (0.6 + 0.4 * duck[:, None]); out += A; del A; gc.collect()
out = out[:int(TOTAL * SR)]
fade = int(2.5 * SR); out[-fade:] *= np.linspace(1, 0, fade)[:, None]
lufs = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - lufs) / 20)  # YouTube target
out = np.ascontiguousarray(pb.Pedalboard([pb.Limiter(-1.0, 80)])(np.ascontiguousarray(out.T), SR).T)
l2 = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - l2) / 20)
out /= max(1.0, np.abs(out).max() / 0.89)
print('LUFS before', round(lufs, 1), 'peak', round(float(np.abs(out).max()), 3))
w = wave.open('/home/user/work/bo/audio/bo_mix.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes()); w.close()
json.dump({'act_len': ACT_LEN, 'total': TOTAL}, open('/home/user/work/bo/audio/acts.json', 'w'))
print('ok', ACT_LEN)
