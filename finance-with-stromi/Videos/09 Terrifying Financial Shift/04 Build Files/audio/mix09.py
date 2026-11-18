# Finance with Stromi 08 The Rubber Band (09): full soundtrack (Kokoro voice + Kevin MacLeod music CC BY 4.0 + bigsoundbank SFX + synth foley), 48 kHz stereo.
import json, wave, numpy as np
from scipy.signal import lfilter, resample_poly
SR = 48000; FPS = 24; NACT = 8
rng = np.random.default_rng(12)
EV = json.load(open('/home/user/work/e9/audio/events09.json'))
TM = json.load(open('/home/user/work/e9/voice/timing.json'))
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
SFXD = '/home/user/work/e9/audio/sfx/'
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
def amb_synth(kind, d):
    t = ts(d); n = len(t); f = lambda k, g: lp(rng.standard_normal(n), k) * g
    if kind == 'hum': return np.sin(2 * np.pi * 60 * t) * 0.02 + np.sin(2 * np.pi * 120 * t) * 0.012 + f(0.02, 0.15)
    return f(0.015, 0.25)
def amb(kind, d):
    if kind == 'diner': return smp('1193', 'rnd', d, 0.2, 0.2) * 1.0 + smp('3515', 'rnd', d, 0.2, 0.2) * 0.35
    if kind == 'porch': return smp('0595', 'rnd', d, 0.2, 0.2) * 0.5
    if kind == 'office': return smp('0502', 'rnd', d, 0.2, 0.2) * 0.8
    if kind == 'crowd': return smp('3515', 'rnd', d, 0.2, 0.2) * 0.8
    if kind == 'town': return smp('0595', 'rnd', d, 0.2, 0.2) * 0.4 + smp('3515', 'rnd', d, 0.2, 0.2) * 0.25
    return amb_synth(kind, d)
import sys; sys.path.insert(0, '/home/user/work/e9'); import shots09
AMB = {'kitchen9': 'porch', 'tokyo9': 'town', 'band9': 'hum', 'wall9': 'office', 'margin9': 'hum', 'capitol9': 'crowd', 'vault9': 'hum'}
SET = {x['id']: AMB.get(x.get('set'), 'room') for x in shots09.SHOTS}
AG = {'diner': 0.6, 'room': 0.5, 'porch': 0.6, 'hum': 0.7, 'crowd': 0.5, 'office': 0.5, 'town': 0.6}
for s in SH:
    if s['card'] is not False: continue
    k = SET.get(s['id'], 'room'); a = amb(k, s['d'] + 0.3); e = np.minimum(1, np.minimum(ts(s['d'] + 0.3), s['d'] + 0.3 - ts(s['d'] + 0.3)) / 0.25)
    put(A, a * e, s['g'] - 0.15, 0.12 * AG[k], 0)
# ---------- voice + duck envelope ----------
duck = np.ones(N)
for s in SH:
    if s['card'] is not False or s['id'] not in TM or not TM[s['id']]['lines']: continue
    w = wave.open(f"/home/user/work/e9/voice/{s['id']}.wav"); sr0 = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768; w.close()
    x = resample_poly(x, SR // 8000, sr0 // 8000) if sr0 != SR else x; x = hp(x, 0.012)
    put(V, x, s['g'], 1.0)
    for l in TM[s['id']]['lines']:
        i0 = int((s['g'] + l['t0'] - 0.1) * SR); i1 = int((s['g'] + l['t1'] + 0.2) * SR); duck[max(0, i0):i1] = 0.22
duck = lfilter([0.0015], [1, -0.9985], duck)
# ---------- music: one Kevin MacLeod track per mood, continuing where it stopped; card stings ----------
TRK = {'tense': 'Hidden Agenda', 'bouncy': 'Sneaky Snitch', 'curious': 'Investigations', 'thought': 'Thinking Music', 'warm': 'Carefree', 'serious': 'Dark Times', 'sparse': 'Gymnopedie No 1', 'diner': 'Cool Vibes', 'hep': 'Hep Cats', 'wall': 'Wallpaper', 'party': 'Fluffing a Duck'}
MOODS = [('curious', 'Y01'), ('tense', 'Y02'), ('serious', 'Y03'), ('hep', 'Y06'), ('thought', 'Y07'), ('bouncy', 'Y08'), ('curious', 'Y09'), ('tense', 'Y10'),
         ('bouncy', 'Y12'), ('thought', 'Y13'), ('tense', 'Y14'), ('serious', 'Y15'), ('curious', 'Y17'), ('tense', 'Y18'), ('serious', 'Y19'), ('tense', 'Y20'), ('warm', 'Y21'),
         ('hep', 'Y23'), ('thought', 'Y24'), ('curious', 'Y25'), ('tense', 'Y26'), ('serious', 'Y27'), ('serious', 'Y29'), ('thought', 'Y30'), ('warm', 'Y31'), ('tense', 'Y32'),
         ('curious', 'Y34'), ('bouncy', 'Y35'), ('serious', 'Y36'), ('warm', 'Y38'), ('party', 'Y39'), ('sparse', 'Y40')]
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
    x = load('/home/user/work/e9/audio/mus/' + TRK[st] + '.mp3', 2); d = g1 - g0 + 1.0; o = pos.get(st, 0.0)
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
# ---------- per-shot foley (video 08) ----------
def notif(): return np.concatenate([tone(NOTE(76), 0.12, 0.08), tone(NOTE(83), 0.3, 0.2)]) * 0.2
def sad_tb(): return np.concatenate([tone(NOTE(m), 0.45, 0.35, (1, .6, .3)) for m in (55, 54, 53)] + [tone(NOTE(52), 1.2, 0.8, (1, .6, .3))]) * 0.3
def ring(): t = ts(1.6); r = (np.sin(2 * np.pi * 440 * t) + np.sin(2 * np.pi * 480 * t)) * (np.sin(2 * np.pi * 20 * t) > 0) * (t % 0.8 < 0.55); return lp(r, 0.5) * np.minimum(1, (1.6 - t) / 0.05) * 0.25
def doorbell(): return smp('2531', None, 1.6) * 0.8
fl = lambda i, t0, d=1.2, g=0.5: flaps(i, t0, t0 + d, g)
gs = lambda i, t: min(max(0.2, t), D(i) - 0.3)
A_ = lambda i, q: gs(i, TM_(i, q))
def stretch(i, t0, t1, g=0.3): [at(i, t, creak(0.8), g, rng.uniform(-0.3, 0.3)) for t in np.arange(t0, max(t0 + 0.1, t1 - 0.6), 1.1)]
def snapband(i, t): at(i, t - 0.15, whoosh(0.4), 0.6); at(i, t, thud(110, 0.5), 0.8); at(i, t + 0.02, clack(), 0.6)
def topples(i, t0, n=4, gap=0.18): [at(i, t0 + k * gap, clack(), 0.5, (k - 1.5) * 0.25) for k in range(n)]
# act 0
at('Y01', 0.8, notif(), 0.3); ticks('Y01', 0.3, 3.0, 0.35); at('Y01', 3.2, sad_tb(), 0.35); at('Y01', 6.15, clink(), 0.8); at('Y01', 6.55, thud(300, 0.2), 0.4); at('Y01', G2('Y01', 'NORA') - 0.2, notif(), 0.2)
fl('Y02', 1.0, max(0.5, TM_('Y02', 'twelve point four') - 1.0)); at('Y02', A_('Y02', 'twelve point four'), thud(70, 0.7), 0.7); at('Y02', A_('Y02', 'twelve point four') + 0.1, cheer(1.2), 0.18)
stretch('Y03', 0.4, TM_('Y03', 'snapped back')); snapband('Y03', A_('Y03', 'snapped back')); topples('Y03', A_('Y03', 'snapped back') + 0.15); stretch('Y03', A_('Y03', 'stretched again'), A_('Y03', 'stretched again') + 1.6, 0.25)
# act 1
steps('Y06', G2('Y06', 'HANA') - 2.5, G2('Y06', 'HANA') - 0.3, 0.3, 0.4); at('Y06', 1.0, smp('1927', None, 2.0), 0.15)
stretch('Y07', 0.3, 2.4, 0.35); [at('Y07', 0.3 + k * 0.9, thud(160, 0.15), 0.3) for k in range(3)]
steps('Y08', 0.4, TM_('Y08', 'swaps it') - 0.3, 0.35, 0.45); at('Y08', A_('Y08', 'swaps it'), register(), 0.4); steps('Y08', A_('Y08', 'buys american'), A_('Y08', 'buys american') + 2.4, 0.35, 0.45); at('Y08', A_('Y08', 'carry trade'), ding(), 0.3)
stretch('Y09', 0.5, G2('Y09', 'DOT'), 0.25); at('Y09', G2('Y09', 'GUS', 1) + 0.1, snip(), 0.4)
at('Y10', A_('Y10', 'the day the yen jumps'), bleep(4, 0.1, 1500), 0.4); at('Y10', A_('Y10', 'the day the yen jumps') + 0.6, buzz(0.5), 0.5)
# act 2
coins('Y12', A_('Y12', 'ten to one'), A_('Y12', 'ten to one') + 2.0, 10); at('Y12', G2('Y12', 'CHET') + 0.2, ding(), 0.25)
for q in ('rises five', 'works the same way', 'ten percent drop'): [at('Y13', A_('Y13', q) + k * 0.12, snip(), 0.3) for k in range(4)]
at('Y13', A_('Y13', 'ten percent drop') + 0.3, powerdown(), 0.5)
at('Y14', 0.2, creak(1.0), 0.45); steps('Y14', 0.8, G2('Y14', 'BRICK') - 0.2, 0.4, 0.55); at('Y14', G2('Y14', 'BRICK') - 0.1, thud(90, 0.4), 0.4)
at('Y15', 0.4, bell(), 0.3); [at('Y15', 2.0 + k * 1.6, paper(0.3), 0.4, rng.uniform(-0.3, 0.3)) for k in range(6) if 2.0 + k * 1.6 < D('Y15') - 0.5]; ticks('Y15', A_('Y15', 'selling pushes'), D('Y15') - 0.5, 0.3)
# act 3
at('Y17', A_('Y17', 'quarter of one percent'), click(), 0.8); stretch('Y17', A_('Y17', 'quarter of one percent') - 1.5, A_('Y17', 'quarter of one percent'), 0.3); at('Y17', G2('Y17', 'KENJI', 1) - 0.1, thud(140, 0.2), 0.3)
keys('Y18', 0.5, 2.5, 0.3); fl('Y18', A_('Y18', 'traders suddenly'), 1.4); at('Y18', A_('Y18', 'traders suddenly') + 0.3, bleep(3, 0.1, 1300), 0.3)
stretch('Y19', 0.3, TM_('Y19', 'the band snapped'), 0.35); snapband('Y19', A_('Y19', 'the band snapped')); topples('Y19', A_('Y19', 'the yen shot up'), 8, 0.35); at('Y19', A_('Y19', 'the band snapped') + 0.3, thunder(), 0.35)
fl('Y20', 0.5, 1.4); at('Y20', G2('Y20', 'KENJI') - 0.2, flutter(1.5), 0.6)
at('Y21', A_('Y21', 'the twist') + 1.6, notif(), 0.35); at('Y21', G2('Y21', 'NORA') + 0.1, cheer(1.0), 0.12)
# act 4
stretch('Y23', 1.0, G2('Y23', 'CHET') - 1.5, 0.3); topples('Y23', 0.5, 4, 0.4)
at('Y24', A_('Y24', 'expensive fuel'), engine(2.5), 0.2); ticks('Y24', A_('Y24', 'expensive fuel'), A_('Y24', 'expensive fuel') + 2.5, 0.3)
at('Y25', 1.5, roll(3.5), 0.35); at('Y25', 2.7, roll(3.5), 0.3); at('Y25', 0.6, paper(0.5), 0.3); at('Y25', A_('Y25', 'in may alone'), stamp(), 0.45)
at('Y26', 0.5, ring(), 0.4); at('Y26', 2.4, ring(), 0.35); steps('Y26', G2('Y26', 'CHET') - 2.2, G2('Y26', 'CHET') - 0.2, 0.4, 0.55)
stretch('Y27', 0.5, D('Y27') - 0.5, 0.25)
# act 5
ticks('Y29', 0.2, D('Y29') - 0.4, 0.4); at('Y29', G2('Y29', 'PIP') - 0.2, squeak(), 0.4)
[at('Y30', A_('Y30', 'about double') + k * 0.12, snip(), 0.3) for k in range(4)]; at('Y30', A_('Y30', 'ten-year'), bleep(2, 0.12, 900), 0.3)
at('Y31', 3.0, roll(max(1, G2('Y31', 'HANA') - 3.0)), 0.3); steps('Y31', 3.0, G2('Y31', 'HANA'), 0.3, 0.5)
at('Y32', 0.5, paper(0.6), 0.5); at('Y32', 1.6, flip(), 0.4); at('Y32', G2('Y32', 'NORA') - 0.3, notif(), 0.2)
# act 6
clinks('Y34', A_('Y34', 'gold made up') - 2, A_('Y34', 'gold made up') + 2, 10); at('Y34', A_('Y34', 'in a twenty twenty-six survey') + 0.5, ding(), 0.25)
clinks('Y35', 0.5, 2.5, 6); steps('Y35', 0.2, G2('Y35', 'CHET') - 0.2, 0.35, 0.5)
[at('Y36', 1 + k * 1.2, ding(), 0.25, (k - 1) * 0.4) for k in range(3)]
# act 7
for q in ('one.', 'two.', 'three.', 'four.', 'and five'): at('Y38', A_('Y38', q) + 0.1, paper(0.35), 0.45)
at('Y39', 1.0, tap_ok(), 0.35); at('Y39', 1.3, notif(), 0.3)
stretch('Y40', 0.5, A_('Y40', 'stretched again') + 1, 0.25); at('Y40', G2('Y40', 'EVERYONE') + 0.1, thud(90, 0.4), 0.45); at('Y40', G2('Y40', 'EVERYONE') + 0.05, whoosh(0.5), 0.4)
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
w = wave.open('/home/user/work/e9/audio/mix09_v1.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes()); w.close()
json.dump({'act_len': ACT_LEN, 'total': TOTAL}, open('/home/user/work/e9/audio/acts09.json', 'w'))
print('ok', ACT_LEN)
