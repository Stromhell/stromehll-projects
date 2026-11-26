"""Script 5 v2 SFX: placed from the cue lists each animated scene exports (window.CUES -> RENDER/scNN.cues.json),
so every sound sits on the frame where its object moves. All sounds synthesized in code (no samples).
usage: python3 sfx_v2.py RENDER_DIR PLAN.json OUT.wav"""
import json, sys, os, numpy as np, soundfile as sf
SR = 44100
R, PLAN, OUT = sys.argv[1], json.load(open(sys.argv[2])), sys.argv[3]
T = sum(p["dur"] for p in PLAN) + 1
N = int(T * SR); out = np.zeros((N, 2), np.float32); rng = np.random.default_rng(5)
def add(x, t, pan=0.0, g=1.0):
    i = max(0, int(t * SR)); j = min(N, i + len(x))
    if j > i: out[i:j, 0] += x[:j-i] * g * (1 - pan) ; out[i:j, 1] += x[:j-i] * g * (1 + pan)
def sm(x, k): return np.convolve(x, np.ones(k) / k, mode="same").astype(np.float32)
def env(n, a=.005, d=6): t = np.arange(n) / SR; return (np.minimum(1, t / a) * np.exp(-t * d)).astype(np.float32)
def whoosh(d=.55):
    n = int(d * SR); x = rng.standard_normal(n).astype(np.float32); p = np.linspace(0, 1, n)
    return ((sm(x, 6) * p + sm(x, 40) * (1 - p)) * np.sin(np.pi * p) ** 2).astype(np.float32)
def tone(f, d, dec, fm=0):
    n = int(d * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t * (1 + fm * np.exp(-t * 60))) * env(n, .002, dec)).astype(np.float32)
def thump(d=.6):
    n = int(d * SR); t = np.arange(n) / SR; f = 45 + 120 * np.exp(-t * 25)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6)).astype(np.float32)
def mx(*xs):
    y = np.zeros(max(len(x) for x in xs), np.float32)
    for x in xs: y[:len(x)] += x
    return y
def tink(): return tone(rng.uniform(2500, 5500), .25, 30) * .6
def crack():
    n = int(.9 * SR); x = rng.standard_normal(n).astype(np.float32) * np.exp(-np.arange(n) / SR * 7).astype(np.float32) * .6
    for _ in range(40):
        i = rng.integers(0, n - 4000); t_ = tone(rng.uniform(2500, 6000), 4001 / SR, 60)[:4000]; x[i:i+len(t_)] += t_ * .3
    return mx(x, thump(.9) * .8)
def chime(fs=(1047, 1319, 1568)):
    n = int(1.6 * SR); x = np.zeros(n, np.float32)
    for k, f in enumerate(fs): o = int(k * .07 * SR); t_ = tone(f, (n - o + 2) / SR, 3.2)[: n - o]; x[o:o + len(t_)] += t_ * .3
    return x
def riser(d=1.4):
    n = int(d * SR); t = np.arange(n) / SR; f = 200 + 1400 * (t / d) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / d) ** 2 * .4 + sm(rng.standard_normal(n).astype(np.float32), 5) * (t / d) ** 3 * .3).astype(np.float32)
def shimmer():
    n = int(1.2 * SR); x = np.zeros(n, np.float32)
    for k in range(8): o = int(k * .05 * SR); t_ = tone(2000 + k * 260, (n - o + 2) / SR, 5)[: n - o]; x[o:o + len(t_)] += t_ * .12
    return x
def lock(): return np.concatenate([tone(900, .04, 80, 1), tone(420, .14, 30, 2)]) + 0
def alarm():
    x = np.concatenate([tone(880, .18, 4) + tone(1320, .18, 4) * .5, np.zeros(int(.06 * SR), np.float32)] * 2); return x * .6
S = {"whoosh": lambda: whoosh(.55) * .8, "whoosh_s": lambda: whoosh(.35) * .5, "pop": lambda: tone(rng.uniform(700, 1100), .1, 45, 2),
     "tick": lambda: tone(2600, .03, 120), "tick2": lambda: mx(tone(1900, .06, 70, 1), tone(3800, .03, 140) * .4), "thump": thump, "crack": crack,
     "tink": tink, "step": lambda: tone(170, .09, 50),
     "riser": riser, "shimmer": shimmer, "chime": chime, "chime1": lambda: tone(1568, .6, 6) * .5, "lock": lock, "clack": lambda: mx(lock() * .8, thump(.3) * .4),
     "click": lambda: mx(tone(3000, .02, 200), tone(600, .05, 80)), "meh": lambda: tone(260, .35, 6) * .6, "whomp": lambda: mx(thump(.7) * .8, whoosh(.4) * .3), "alarm": alarm}
n = 0
for p in PLAN:
    f = os.path.join(R, f"sc{p['n']:02d}.cues.json")
    if not os.path.exists(f): continue
    for c in json.load(open(f)):
        if c["t"] < -0.5 or c["t"] > p["dur"] + .5: continue
        add(S[c["s"]](), p["start"] + c["t"], max(-.8, min(.8, c.get("pan", 0))), c.get("g", 1) * .35); n += 1
out /= max(1e-6, np.abs(out).max()) / .7
sf.write(OUT, out, SR); print(n, "cues ->", OUT)
