# Local underscore for an act (free, no AI credits): strings pad, low cello line, guitar-like plucks,
# soft frame-drum pulses on tension sections, all through a synthetic hall reverb.
# Spanish colour: the Andalusian cadence (Am G F E) in Phrygian mode; moods change the voicing and pulse.
# Usage: python3 score.py out.wav --dur 49.2 --moods "0:tension,20:sad,38:hope" [--seed 3] [--bpm 66]
import numpy as np, argparse
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, sosfilt
SR = 48000
ap = argparse.ArgumentParser(); ap.add_argument('out'); ap.add_argument('--dur', type=float, required=True)
ap.add_argument('--moods', default='0:tension'); ap.add_argument('--seed', type=int, default=1); ap.add_argument('--bpm', type=float, default=66)
a = ap.parse_args(); rng = np.random.default_rng(a.seed)
N = int((a.dur + 3) * SR); t = np.arange(N) / SR
segs = sorted((float(s.split(':')[0]), s.split(':')[1]) for s in a.moods.split(','))
def mood_at(x):
    m = segs[0][1]
    for s, mm in segs:
        if x >= s: m = mm
    return m
# progressions (semitones from A3 = 220 Hz): chord roots + quality
PROG = {
  'tension': [(0, 'm'), (-2, 'M'), (-4, 'M'), (-5, 'M')],      # Am G F E  (Andalusian cadence)
  'sad':     [(0, 'm'), (-4, 'M'), (-9, 'M'), (-5, 'M')],      # Am F C E
  'hope':    [(-4, 'M'), (-9, 'M'), (-2, 'M'), (0, 'm')],      # F C G Am
  'epic':    [(0, 'm'), (-4, 'M'), (-2, 'M'), (-5, 'M')],      # Am F G E
  'calm':    [(-9, 'M'), (-2, 'M'), (0, 'm'), (-4, 'M')],      # C G Am F
}
beat = 60 / a.bpm; bar = beat * 4; chordlen = bar * 2
hz = lambda semi: 220 * 2 ** (semi / 12)
def chord(root, q):
    third = 3 if q == 'm' else 4
    return [root - 12, root, root + third, root + 7, root + 12]
pad = np.zeros(N); bass = np.zeros(N); pl = np.zeros(N); dr = np.zeros(N)
def env(L, att, rel):
    e = np.ones(L); A = min(L, int(att * SR)); R = min(L - A, int(rel * SR))
    e[:A] = np.linspace(0, 1, A) ** 1.5; e[L - R:] *= np.linspace(1, 0, R) ** 1.5; return e
def saw(f, L, ph=0):
    x = (np.arange(L) / SR * f + ph) % 1; return 2 * x - 1
k = 0; ts = 0.0
while ts < a.dur + 2:
    m = mood_at(ts); P = PROG.get(m, PROG['tension']); root, q = P[k % len(P)]
    s = int(ts * SR); L = min(N - s, int((chordlen + 1.5) * SR))
    if L <= 0: break
    e = env(L, 1.2 if m != 'epic' else .5, 1.6)
    # string pad: three detuned saws per note, gentle vibrato
    for i, semi in enumerate(chord(root, q)[1:]):
        f = hz(semi); vib = 1 + .003 * np.sin(2 * np.pi * 5.2 * np.arange(L) / SR + i)
        for d in (-.004, 0, .005):
            ph = np.cumsum(f * (1 + d) * vib) / SR; pad[s:s + L] += (2 * (ph % 1) - 1) * e * .08
    # cello line: root an octave down, sine + soft saw
    fb = hz(root - 12); ph = np.cumsum(np.full(L, fb)) / SR
    bass[s:s + L] += (np.sin(2 * np.pi * ph) * .5 + (2 * (ph % 1) - 1) * .12) * e * (.5 if m in ('sad', 'calm') else .7)
    # guitar-like plucks: arpeggio in eighths (tension/epic) or quarters (sad/calm/hope)
    step = beat / 2 if m in ('tension', 'epic') else beat
    notes = chord(root, q)[1:] + [chord(root, q)[2] + 12]
    for j in range(int(chordlen / step)):
        ps = s + int(j * step * SR); PL = min(N - ps, int(1.6 * SR))
        if PL <= 0: break
        f = hz(notes[(j * 3 + k) % len(notes)] + 12); tt = np.arange(PL) / SR
        tone = sum(np.sin(2 * np.pi * f * h * tt) / h ** 1.3 * np.exp(-tt * (3 + h * 1.6)) for h in range(1, 6))
        pl[ps:ps + PL] += tone * (.22 if j % 2 == 0 else .15) * (.6 + .4 * rng.random())
    # frame drum pulses on beats 1 and 3 (tension), every beat (epic)
    if m in ('tension', 'epic'):
        for j in range(int(chordlen / beat)):
            if m == 'tension' and j % 2: continue
            ps = s + int(j * beat * SR); DL = min(N - ps, int(.6 * SR))
            if DL <= 0: break
            tt = np.arange(DL) / SR; f0 = 70 * np.exp(-tt * 6) + 48
            dr[ps:ps + DL] += np.sin(2 * np.pi * np.cumsum(f0) / SR) * np.exp(-tt * 7) * (.9 if j % 4 == 0 else .55)
    ts += chordlen; k += 1
lp = lambda x, fc: sosfilt(butter(2, fc / (SR / 2), 'low', output='sos'), x)
hpf = lambda x, fc: sosfilt(butter(2, fc / (SR / 2), 'high', output='sos'), x)
dry = lp(pad, 2200) * .9 + lp(bass, 600) + hpf(lp(pl, 4000), 120) * .8 + lp(dr, 400) * .9
# synthetic hall: decaying filtered noise, 2.8 s
IL = int(2.8 * SR); ir = rng.standard_normal(IL) * np.exp(-np.arange(IL) / SR * 2.4); ir = lp(ir, 5000); ir /= np.sqrt(np.sum(ir ** 2))
wet = fftconvolve(dry, ir)[:N] * .45
mix = dry * .75 + wet
fade = int(2 * SR); mix[:int(.8 * SR)] *= np.linspace(0, 1, int(.8 * SR)); end = int(a.dur * SR); mix[end - fade:end] *= np.linspace(1, 0, fade); mix[end:] = 0
mix = mix[:end]; mix /= np.max(np.abs(mix)) + 1e-9
wavfile.write(a.out, SR, (mix * .89 * 32767).astype(np.int16)); print('score', a.out, f'{a.dur:.1f}s', a.moods)
