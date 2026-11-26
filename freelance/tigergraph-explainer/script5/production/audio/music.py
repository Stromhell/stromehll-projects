"""Original synthesized music bed for Script 5 (no samples, no third-party audio -> no copyright issues).
Tech-explainer feel: warm detuned pads, plucked arpeggio, soft sub kick + shaker; sections follow the story:
0-15 intro (pads only), 15-24 crack (drop to sub + riser), 24-60 groove, 60-100 tension (minor), 100-166 drive, 166-180 resolve.
usage: python3 music.py OUT.wav [total_seconds]"""
import numpy as np, soundfile as sf, sys
SR = 44100
T = float(sys.argv[2]) if len(sys.argv) > 2 else 180.0
N = int(T * SR)
BPM = 100; beat = 60 / BPM
rng = np.random.default_rng(7)
out = np.zeros((N, 2), np.float32)

def note(m): return 440 * 2 ** ((m - 69) / 12)
def env(n, a, r):
    e = np.ones(n, np.float32); a, r = int(a * SR), int(r * SR)
    if a: e[:a] = np.linspace(0, 1, a)
    if r: e[-r:] *= np.linspace(1, 0, r)
    return e
def lowpass(x, cut):
    a = np.exp(-2 * np.pi * cut / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def add(sig, t0, pan=0.0, gain=1.0):
    i = int(t0 * SR); j = min(N, i + len(sig))
    if j <= i: return
    s = sig[:j - i] * gain
    out[i:j, 0] += s * (1 - pan) * .7071 * 1.414 / 2 * 2 ** .5
    out[i:j, 1] += s * (1 + pan) * .7071 * 1.414 / 2 * 2 ** .5

def pad(chord, dur, bright=900):
    n = int(dur * SR); t = np.arange(n) / SR; x = np.zeros(n, np.float32)
    for m in chord:
        for d in (-0.08, 0.0, 0.07):
            f = note(m) * 2 ** (d / 12)
            x += (2 * ((t * f) % 1) - 1).astype(np.float32)
    x /= len(chord) * 3
    # cheap one-pole lowpass via FFT-free method: block filter (vectorized approximation)
    k = int(SR / bright); x = np.convolve(x, np.ones(k) / k, mode="same").astype(np.float32)
    return x * env(n, 1.2, 1.2)

def pluck(m, dur=.45):
    n = int(dur * SR); t = np.arange(n) / SR; f = note(m)
    x = (np.sin(2 * np.pi * f * t) + .35 * np.sin(4 * np.pi * f * t) + .12 * np.sin(6 * np.pi * f * t)) * np.exp(-t * 7)
    return (x * env(n, .003, .05)).astype(np.float32)

def kick():
    n = int(.35 * SR); t = np.arange(n) / SR
    f = 50 + 90 * np.exp(-t * 30)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)).astype(np.float32)

def shaker():
    n = int(.08 * SR); x = rng.standard_normal(n).astype(np.float32)
    x = np.diff(np.concatenate([[0], x])).astype(np.float32)
    return x * np.exp(-np.arange(n) / SR * 60).astype(np.float32)

def sub(m, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * note(m) * t) * env(n, .02, .2)).astype(np.float32)

# progression (C major / A minor world), 2 bars per chord
MAJ = [[48, 55, 64, 67], [45, 52, 60, 67], [41, 48, 57, 64], [43, 50, 59, 62]]     # C  Am  F  G
MIN = [[45, 52, 60, 64], [41, 48, 57, 60], [48, 55, 60, 64], [43, 50, 55, 59]]     # Am F  C  G
bar = 4 * beat
def section(t):
    if t < 15: return "intro"
    if t < 24: return "crack"
    if t < 60: return "groove"
    if t < 100: return "tension"
    if t < 166: return "drive"
    return "resolve"

t, ci = 0.0, 0
while t < T:
    sec = section(t)
    prog = MIN if sec in ("tension",) else MAJ
    ch = prog[ci % 4]
    d = 2 * bar
    if sec != "crack":
        add(pad(ch, d + 1.0, 700 if sec in ("intro", "resolve") else 1100), t, -.2, .20)
        add(pad([m + 12 for m in ch[1:]], d + 1.0, 1500), t, .25, .07)
    if sec in ("groove", "tension", "drive") or (sec == "intro" and t > 6):
        arp = [ch[1] + 12, ch[2] + 12, ch[3] + 12, ch[2] + 24]
        steps = int(d / (beat / 2))
        for k in range(steps):
            g = .16 if sec != "intro" else .08
            add(pluck(arp[k % 4]), t + k * beat / 2, .35 if k % 2 else -.35, g)
    if sec in ("groove", "drive", "tension"):
        for b in range(int(d / beat)):
            add(kick(), t + b * beat, 0, .38 if sec == "drive" else .30)
            add(shaker(), t + b * beat + beat / 2, .3, .08)
            if sec == "drive": add(shaker(), t + b * beat + beat * .75, -.3, .05)
        add(sub(ch[0] - 12, d), t, 0, .18)
    if sec == "crack":
        add(sub(33, d), t, 0, .22)
    t += d; ci += 1

# riser into the groove (22-24 s) and into the drive (98-100 s)
for t0 in (21.5, 97.5):
    n = int(2.5 * SR); x = rng.standard_normal(n).astype(np.float32)
    x = np.convolve(x, np.ones(6) / 6, mode="same").astype(np.float32) * np.linspace(0, 1, n) ** 2
    add(x, t0, 0, .10)

# master: fade in/out, gentle limiter, normalise to -20 LUFS-ish peak 0.5
out[: int(2 * SR)] *= np.linspace(0, 1, int(2 * SR))[:, None]
out[-int(4 * SR):] *= np.linspace(1, 0, int(4 * SR))[:, None]
out = np.tanh(out * 1.3) / np.tanh(1.3)
out *= 0.5 / max(1e-6, np.abs(out).max())
sf.write(sys.argv[1], out, SR)
print("music", T, "s")
