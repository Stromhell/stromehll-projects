# Compose a light, curious background loop in code (no external service).
# Plucked strings (Karplus-Strong) + soft bass + brushed shaker. Usage: python3 mkmusic.py out.wav SECONDS [BPM] [SEED]
import sys, numpy as np, wave
SR = 48000
out, secs = sys.argv[1], float(sys.argv[2]); bpm = float(sys.argv[3]) if len(sys.argv) > 3 else 104
rng = np.random.default_rng(int(sys.argv[4]) if len(sys.argv) > 4 else 7)
beat = 60 / bpm; N = int(secs * SR); mix = np.zeros(N)
TR = (int(sys.argv[4]) if len(sys.argv) > 4 else 0) % 5 - 2
def f(m): return 440 * 2 ** ((m + TR - 69) / 12)
def pluck(freq, dur, amp, bright=0.5):
    n = int(dur * SR); p = max(2, int(SR / freq)); buf = rng.uniform(-1, 1, p); y = np.zeros(n)
    for i in range(n):
        y[i] = buf[i % p]; nxt = buf[(i + 1) % p]
        buf[i % p] = 0.996 * (bright * buf[i % p] + (1 - bright) * nxt) if True else 0
    env = np.minimum(1, np.arange(n) / (0.003 * SR)); return amp * y * env
def soft(freq, dur, amp):
    t = np.arange(int(dur * SR)) / SR
    return amp * (np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(4 * np.pi * freq * t)) * np.exp(-t * 3.2) * np.minimum(1, t / 0.01)
def add(sig, t):
    i = int(t * SR); j = min(N, i + len(sig))
    if i < N: mix[i:j] += sig[: j - i]
# C - Am - F - G, two bars each chord loop of 4 bars (4 beats)
chords = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]
bass = [36, 33, 29, 31]
mel = [72, 74, 76, 79, 76, 74, 72, 69, 72, 74, 76, 74, 72, 69, 67, 69]
t = 0.0; bar = 0
while t < secs:
    c = chords[bar % 4]
    for b in range(4):
        tb = t + b * beat
        add(soft(f(bass[bar % 4]), beat * 0.9, 0.22 if b in (0, 2) else 0.12), tb)
        for k, m in enumerate(c):  # strum
            add(pluck(f(m), beat * 1.2, 0.10, 0.5), tb + k * 0.012 + (beat / 2 if b % 2 else 0))
        sh = rng.normal(0, 1, int(0.06 * SR)) * np.exp(-np.arange(int(0.06 * SR)) / (0.012 * SR))
        add(0.025 * np.diff(sh, prepend=0), tb + beat / 2)
    if bar >= 1:  # little melody from bar 2
        for k in range(4):
            m = mel[(bar * 4 + k) % len(mel)]
            if rng.random() < 0.8: add(pluck(f(m), beat * 0.9, 0.09, 0.35), t + k * beat + (0.5 * beat if k % 2 else 0))
    t += 4 * beat; bar += 1
# gentle fade in/out, normalise to -14 dBFS-ish peak -3
fade = int(0.8 * SR); mix[:fade] *= np.linspace(0, 1, fade); mix[-fade * 2:] *= np.linspace(1, 0, fade * 2)
mix = np.tanh(mix * 1.2); mix /= np.abs(mix).max() / 0.7
st = np.stack([mix, np.roll(mix, int(0.011 * SR))], 1)
w = wave.open(out, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype('<i2').tobytes()); w.close()
print('music', out, secs)
