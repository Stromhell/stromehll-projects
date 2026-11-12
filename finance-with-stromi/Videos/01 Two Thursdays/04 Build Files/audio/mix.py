# Two Thursdays: full soundtrack built in code (voice wavs + synth music + synth foley), 48 kHz stereo.
import json, wave, numpy as np
from scipy.signal import lfilter, resample_poly
SR = 48000; FPS = 24
rng = np.random.default_rng(11)
EV = json.load(open('/home/user/work/audio/events.json'))
TM = json.load(open('/home/user/work/voice/timing.json'))
SET = {'S01': 'stage', 'S02': 'stage', 'S03': 'office', 'S04': 'stage', 'S05': 'calendar', 'S07': 'dollar', 'S08': 'kitchen', 'S09': 'receipt', 'S11': 'bank', 'S12': 'pawn', 'S13': 'diner', 'S14': 'kitchen', 'S15': 'stage', 'S17': 'ballot', 'S18': 'cork', 'S19': 'site', 'S20': 'stage', 'S22': 'customs', 'S23': 'stage', 'S24': 'insure', 'S25': 'cubicle', 'S26': 'yacht', 'S27': 'stage', 'S29': 'coaster', 'S30': 'diner', 'S31': 'capitol', 'S32': 'doorstep', 'S33': 'office', 'S34': 'office', 'S35': 'cubicle', 'S37': 'cork', 'S38': 'ship', 'S39': 'rates', 'S41': 'kitchen', 'S42': 'site', 'S43': 'split', 'S44': 'stage', 'S45': 'office'}
# global shot starts (each act's video is round(T*FPS) frames long)
SH = []; off = 0.0; ACT_LEN = []
for a in range(8):
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
AMB = {'stage': 'crowd', 'office': 'office', 'kitchen': 'hum', 'diner': 'diner', 'customs': 'rain', 'doorstep': 'rain', 'ship': 'storm', 'yacht': 'sea', 'capitol': 'wind', 'site': 'wind', 'coaster': 'crowd', 'insure': 'crowd', 'cubicle': 'hum', 'bank': 'room', 'pawn': 'room', 'cork': 'room', 'ballot': 'room', 'calendar': 'room', 'dollar': 'room', 'receipt': 'room', 'rates': 'room', 'split': 'room'}
AG = {'office': 0.5, 'rain': 1.0, 'storm': 1.0, 'sea': 0.7, 'crowd': 0.5, 'diner': 0.7, 'wind': 0.6, 'hum': 0.7, 'room': 0.5}
for s in SH:
    if s['card']: continue
    k = AMB.get(SET.get(s['id']), 'room'); a = amb(k, s['d'] + 0.3); e = np.minimum(1, np.minimum(ts(s['d'] + 0.3), s['d'] + 0.3 - ts(s['d'] + 0.3)) / 0.25)
    put(A, a * e, s['g'] - 0.15, 0.12 * AG[k], 0)
# ---------- voice + duck envelope ----------
duck = np.ones(N)
for s in SH:
    if s['card'] or s['id'] not in TM: continue
    w = wave.open(f"/home/user/work/voice/{s['id']}.wav"); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768; w.close()
    x = resample_poly(x, 2, 1); x = hp(x, 0.012)  # 48k, remove rumble
    put(V, x, s['g'], 1.0)
    for l in TM[s['id']]['lines']:
        i0 = int((s['g'] + l['t0'] - 0.1) * SR); i1 = int((s['g'] + l['t1'] + 0.2) * SR); duck[max(0, i0):i1] = 0.22
duck = lfilter([0.0015], [1, -0.9985], duck) / 1.0
# ---------- music ----------
# mood per shot: (key root midi, scale, bpm, style)
MIN = [0, 2, 3, 5, 7, 8, 10]; MAJ = [0, 2, 4, 5, 7, 9, 11]
MOOD = {}
for s in SH:
    a, i = s['act'], s['id']
    m = {0: ('tense', 45, MIN, 96), 1: ('bouncy', 48, MAJ, 112), 2: ('curious', 50, MIN, 104), 3: ('bouncy', 43, MAJ, 108), 4: ('tense', 45, MIN, 120), 5: ('curious', 50, MIN, 100), 6: ('thought', 45, MIN, 92), 7: ('warm', 48, MAJ, 88)}[a]
    if i in ('S20',): m = ('bouncy', 48, MAJ, 126)
    if i in ('S32', 'S33', 'S34'): m = ('serious', 45, MIN, 70)
    if i in ('S35',): m = ('curious', 50, MAJ, 104)
    if i in ('S43',): m = ('bouncy', 48, MAJ, 112)
    if i in ('S45',): m = ('sparse', 48, MAJ, 70)
    if i == 'S46': m = ('sparse', 48, MAJ, 70)
    MOOD[s['g']] = (s, m)
PROG = {'tense': [0, 5, 3, 4], 'curious': [0, 3, 5, 4], 'bouncy': [0, 3, 4, 0], 'thought': [0, 5, 2, 4], 'warm': [0, 5, 3, 4], 'serious': [0, 5, 3, 4], 'sparse': [0, 3, 4, 0]}
def chord(root, sc, deg): return [root + sc[(deg + k) % 7] + 12 * ((deg + k) // 7) for k in (0, 2, 4)]
def pluck(f, d=0.35, br=0.6): t = ts(d); return (np.sin(2 * np.pi * f * t) + br * 0.5 * np.sin(2 * np.pi * 2 * f * t) + br * 0.2 * np.sin(2 * np.pi * 3 * f * t)) * env(len(t), 0.003, d * 0.35)
def pad(fs, d): t = ts(d); s = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2.003 * t) for f in fs); return s * np.clip(np.minimum(t / 0.8, (d - t) / 0.8), 0, 1)
def hat(): t = ts(0.05); return hp(noise(0.05), 0.7) * env(len(t), 0.0005, 0.01) * 0.25
segs = sorted(MOOD.items())
for gi, (g, (s, (style, root, sc, bpm))) in enumerate(segs):
    d = s['d']; beat = 60 / bpm; bar = beat * 4; prog = PROG[style]; nb = int(np.ceil(d / beat)) + 1
    if s['card']:  # chapter card sting: rising piano + whoosh
        for k, mm in enumerate([root + 24, root + 28, root + 31, root + 36]): put(M, tone(NOTE(mm), 1.6, 0.6, (1, .45, .2, .08)), g + 0.15 + k * 0.18, 0.16, (k - 1.5) * 0.2)
        put(X, smp('1796', None, 1.1), g - 0.4, 0.6); continue
# real music beds: one Kevin MacLeod track per style, continuing where that style last stopped; 1 s crossfades
TRK = {'tense': 'Hidden Agenda', 'bouncy': 'Sneaky Snitch', 'curious': 'Investigations', 'thought': 'Thinking Music', 'warm': 'Carefree', 'serious': 'Dark Times', 'sparse': 'Gymnopedie No 1', 'crash': 'Impact Lento', 'party': 'Fluffing a Duck', 'elev': 'Local Forecast - Elevator'}
runs = []
for g, (s, m) in segs:
    if s['card']: continue
    st = m[0]
    if s['id'] in ('S23', 'S24', 'S25', 'S26', 'S27'): st = 'crash'
    if s['id'] == 'S20': st = 'party'
    if s['id'] == 'S43': st = 'elev'
    if runs and runs[-1][0] == st and abs(runs[-1][2] - g) < 0.05: runs[-1][2] = g + s['d']
    else: runs.append([st, g, g + s['d']])
pos = {}
for st, g0, g1 in runs:
    x = load('/home/user/work/audio/mus/' + TRK[st] + '.mp3', 2); d = g1 - g0 + 1.0; o = pos.get(st, 0.0)
    n = int(d * SR); i0 = int(o * SR) % len(x); y = np.concatenate([x[i0:], x, x])[:n]
    pos[st] = (o + d) % (len(x) / SR)
    e = np.minimum(1, np.minimum(np.arange(n) / SR / 1.0, (n - np.arange(n)) / SR / 1.0))[:, None]
    i = int((g0 - 0.5) * SR); i = max(0, i); m = min(n, N - i); M[i:i + m] += (y * e)[:m] * 0.5
# ---------- cuts + tag pops ----------
for s in SH[1:]: put(X, whoosh(0.5), s['g'] - 0.3, 0.35)
aoff = [sum(ACT_LEN[:a]) for a in range(8)]
for a in range(8):
    for tg in EV[str(a)]['tags']: put(X, pop(), aoff[a] + tg['t'] + 0.1, 0.35, rng.uniform(-0.3, 0.3))
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
coins('S01', 1.3, G['S01']['d'], 10); coins('S02', 0, G['S02']['d'], 18)
for t in np.arange(1.0, 7.0, 0.666): at('S03', t, buzz(), 1.0, 0.3)
steps('S03', 0.6, 4.4, 0.45, 0.73)
at('S04', G['S04']['d'] - 3.4, thud(70, 0.8), 1.0); at('S05', 0.6, flip(), 1); at('S05', 2.0, paper(0.5), 0.8)
for t in (1.5, 1.8, 2.1): at('S07', t, snip(), 0.9)
at('S09', 0.4, paper(1.2), 0.6)
for k in range(9): at('S11', 6 + k * 0.45, flip(), 0.5)
at('S12', 0.4, ding(), 0.5); at('S13', 1.0, thud(300, 0.2), 0.3); at('S14', 2.0, buzz(0.2), 0.4)
l = [x for x in TM['S17']['lines'] if x['who'] == 'GUS']; t0 = l[0]['t0'] if l else 0; t1 = l[0]['t1'] if l else 2
for n in range(8): at('S17', (t0 - 1) + n * ((t1 - t0 + 1) / 8) + 0.05, thud(110, 0.35), 0.8); at('S17', (t0 - 1) + n * ((t1 - t0 + 1) / 8) + 0.07, paper(0.15), 0.5)
for t in (0.3, 6, 11, 16.5): at('S18', t, thud(400, 0.12), 0.5)
at('S20', 0.8, smp('2363', None, min(7.0, G['S20']['d'] - 1.0), 0.05, 1.5), 0.7); at('S20', 1.0, thud(60, 0.6), 0.6)
ticks('S23', 0, 9, 0.9)
steps('S22', 0.3, 5.0, 0.4, 0.8); steps('S24', 0.2, 3.4, 0.5, 0.5, '0376')
coins('S23', 10, G['S23']['d'], 12)
at('S24', 0.5, creak(G['S24']['d'] - 2), 0.3)
keys('S25', TM['S25']['lines'][-1]['t0'], TM['S25']['lines'][-1]['t0'] + 4, 0.6); at('S25', 0.4, smp('0023', None, 1.5), 0.5)
for t in (2.0, 7.5, 12.0): at('S26', t, gull(), 0.7, -0.4)
at('S27', 0.0, bell(660, 3.0), 0.8); at('S27', G['S27']['d'] - 7.6, thud(80, 0.7), 1.0); coins('S27', 0, G['S27']['d'], 14)
at('S29', 0, smp('1456', 'rnd', G['S29']['d'], 0.3, 0.5), 0.8)
at('S29', G['S29']['d'] - 6, whoosh(2.5), 0.8)
at('S30', 13.6, ding(), 0.6)
at('S31', 4, creak(G['S31']['d'] - 4), 0.5)
for t in (12.0, 18.5, 23.5): at('S32', t, thud(250, 0.15), 0.4); at('S32', t + 0.01, smp('0670', 'rnd', 0.5, 0.01, 0.1), 0.8)
ticks('S33', 0, G['S33']['d'], 0.45)
at('S34', 1.6, paper(0.4), 0.7); at('S34', 2.8, click(), 0.8)
for t in (0.2, 4.6, 11.8, 20.2, 25.1, 26.6, 30.8): at('S37', t, thud(500, 0.08), 0.6)
for t in (0.0, 3.7, 5.3, 7.4): at('S38', t, thunder(), 0.5)
at('S38', 0.5, creak(6), 0.4); at('S39', 0.5, creak(4.5), 0.3)
at('S41', 0.5, paper(0.4), 0.5); at('S43', 0.4, smp('1417', None, 0.3), 0.6); at('S43', 0.55, smp('0193', 'rnd', 1.2, 0.02, 0.3), 0.5)
coins('S44', 0, G['S44']['d'], 6)
for t in (10.4, 13.4, 15.4, 17.1): at('S44', t, whoosh(0.6), 0.6)
at('S45', G['S45']['d'] - 1.6, click(), 1.0)
# ---------- mix ----------
# voice polish (pedalboard, free): gentle EQ + compression on everything; a small room on character lines so they sit in the scene
import pedalboard as pb, pyloudnorm as pyln
cm = np.zeros(N)
for s in SH:
    if s['card'] or s['id'] not in TM: continue
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
for k in ['crowd', 'office', 'rain', 'storm', 'sea', 'wind', 'diner', 'hum', 'room']:
    ii = [s for s in SH if not s['card'] and AMB.get(SET.get(s['id']), 'room') == k]
    if ii: s0 = ii[0]; print(' amb', k, db(aa[int(s0['g'] * SR):int((s0['g'] + s0['d']) * SR)]))
out = out[:int(TOTAL * SR)]
fade = int(2.5 * SR); out[-fade:] *= np.linspace(1, 0, fade)[:, None]
lufs = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - lufs) / 20)  # YouTube target
out = pb.Pedalboard([pb.Limiter(-1.0, 80)])(out.T.astype(np.float32), SR).T.astype(float)
out /= max(1.0, np.abs(out).max() / 0.95)
print('LUFS before', round(lufs, 1), 'peak', round(float(np.abs(out).max()), 3))
w = wave.open('/home/user/work/audio/two_thursdays_mix.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes()); w.close()
json.dump({'act_len': ACT_LEN, 'total': TOTAL}, open('/home/user/work/audio/acts.json', 'w'))
print('ok', ACT_LEN)
