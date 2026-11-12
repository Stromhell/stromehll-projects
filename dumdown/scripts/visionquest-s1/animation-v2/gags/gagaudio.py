# Build each cutaway gag's audio (local Piper voices + code SFX + code music) and its timeline JSON for the renderer.
import numpy as np, os, sys, json, subprocess, hashlib
from scipy.io import wavfile
from scipy.signal import resample
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import gagsfx as X
from gagsfx import SR, T, N, bp, lp, hp, ex, at, blank, saw, sine, sq, mtof, bell, rev, P
from gags_data import V, G
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, 'out'); os.makedirs(OUT, exist_ok=True)
SFXD = [os.path.join(HERE, 'sfx'), '/mnt/project-files/2d-dynamic/shared/sfx']
OPEN = 0.9; FPS = 24
def load(p):
    sr, x = wavfile.read(p); x = x.astype(float); x = x.mean(1) if x.ndim > 1 else x; x /= 32768 if np.abs(x).max() > 2 else 1
    return x if sr == SR else resample(x, int(len(x) * SR / sr))
def sfx(name):
    for d in SFXD:
        p = os.path.join(d, name + '.wav')
        if os.path.exists(p): return load(p)
    raise SystemExit('missing sfx ' + name)
FX = {'': 'anull', 'deep': 'rubberband=pitch=0.88', 'up': 'rubberband=pitch=1.1', 'down': 'rubberband=pitch=0.9', 'chip': 'rubberband=pitch=1.55:tempo=1.08',
      'robot': "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75,flanger=delay=2:depth=2,aecho=0.8:0.6:12:0.3",
      'radio': 'highpass=f=320,lowpass=f=3200,acrusher=bits=10:mix=0.3,volume=1.4', 'trailer': 'rubberband=pitch=0.8,aecho=0.8:0.7:60|120:0.35|0.2',
      'old': 'highpass=f=450,lowpass=f=2800,acrusher=bits=8:mix=0.4,volume=1.5'}
def voice(who, text):
    spk, ls, fx = V[who]; ls = round(ls * .9, 3); raw = X.tts(spk, text, ls); h = hashlib.md5(f'{spk}{ls}{text}{fx}'.encode()).hexdigest()[:16]; f = os.path.join(X.CACHE, h + '_fx.wav')
    if not os.path.exists(f):
        src = f + '.src.wav'; wavfile.write(src, SR, (raw / (np.abs(raw).max() or 1) * .8 * 32767).astype(np.int16))
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-af', FX[fx] + ',aresample=48000', '-ac', '1', f], check=True); os.remove(src)
    x = load(f); nz = np.where(np.abs(x) > .01)[0]; x = x[max(0, nz[0] - 600): nz[-1] + 1200] if len(nz) else x
    return x / (np.sqrt(np.mean(x ** 2)) or 1) * .12
# ---------------- music ----------------
def ks(f, d, damp=.996):
    n = int(SR * d); p = max(2, int(SR / f)); buf = N(p / SR + 1e-9)[:p] * .5; out = np.zeros(n)
    for i in range(n): out[i] = buf[i % p]; buf[i % p] = damp * .5 * (buf[i % p] + buf[(i + 1) % p])
    return out
_KS = {}
def pluck(m, d, damp=.996):
    k = (m, round(d, 2), damp)
    if k not in _KS: _KS[k] = ks(mtof(m), d, damp)
    return _KS[k]
def ep(m, d): f = mtof(m); return (sine(f, d) + .3 * sine(f * 2, d) + .12 * sine(f * 3.01, d)) * ex(d, 2.5) * np.minimum(1, T(d) * 200)
def pad(m, d): f = mtof(m); s = saw(f, d) + saw(f * 1.007, d); e = np.minimum(1, T(d) * 3) * np.minimum(1, (d - T(d)) * 3); return lp(s, 1200) * e * .5
def brass(m, d): f = mtof(m); s = saw(f, d) + saw(f * 1.004, d); e = np.minimum(1, T(d) * 40) * np.minimum(1, (d - T(d)) * 15); k = ex(d, 6)[:len(s)]; return (lp(s, 2400) * k + lp(s, 800) * (1 - k)) * e * .5
def organ(m, d): f = mtof(m); return sum(sine(f * k, d) / k for k in (1, 2, 3, 4)) * np.minimum(1, T(d) * 30) * np.minimum(1, (d - T(d)) * 10) * .4
def bass(m, d): f = mtof(m); return lp(saw(f, d), 500) * ex(d, 3) * np.minimum(1, T(d) * 300) * .8
def kick(): d = .3; return sine(50 + 90 * ex(d, 25), d) * ex(d, 10)
def snr(): d = .2; return bp(N(d), 1500, 6000) * ex(d, 20) * .5 + sine(200, d) * ex(d, 30) * .3
def hat(): d = .05; return hp(N(d), 7000) * ex(d, 60) * .25
def brush(): d = .18; return bp(N(d), 2000, 8000) * np.sin(np.pi * np.linspace(0, 1, int(SR * d))) * .15
CH = {'maj': [0, 4, 7, 11], 'min': [0, 3, 7, 10], 'dom': [0, 4, 7, 10], 'm': [0, 3, 7], 'M': [0, 4, 7]}
STY = {
 'hold':        dict(bpm=104, prog=[(60, 'maj'), (57, 'min'), (62, 'min'), (55, 'dom')], inst=ep, mel=bell, drums='', filt=(300, 3400), mel_oct=12),
 'lounge':      dict(bpm=92, prog=[(62, 'min'), (55, 'dom'), (60, 'maj'), (57, 'min')], inst=ep, mel=ep, drums='brush', walk=True),
 'infomercial': dict(bpm=128, prog=[(60, 'M'), (65, 'M'), (67, 'M'), (65, 'M')], inst=brass, mel=None, drums='four', stab=True),
 'gameshow':    dict(bpm=124, prog=[(62, 'M'), (67, 'M'), (64, 'm'), (69, 'M')], inst=brass, mel=ep, drums='four', stab=True),
 'harp':        dict(bpm=72, prog=[(65, 'maj'), (70, 'maj'), (62, 'min'), (60, 'dom')], inst=pad, mel=None, drums='', arp=True),
 'nature':      dict(bpm=66, prog=[(62, 'M'), (67, 'M'), (59, 'm'), (69, 'M')], inst=pad, mel=None, drums='', arp=True),
 'court':       dict(bpm=76, prog=[(57, 'm'), (53, 'M'), (55, 'M'), (52, 'M')], inst=None, mel=None, drums='', pizz=True),
 'runway':      dict(bpm=120, prog=[(57, 'm'), (57, 'm'), (53, 'M'), (55, 'M')], inst=pad, mel=None, drums='four', pizz=True),
 'sitcom':      dict(bpm=112, prog=[(60, 'M'), (65, 'M'), (60, 'M'), (67, 'dom')], inst=ep, mel=None, drums='back', walk=True),
 'tension':     dict(bpm=96, prog=[(57, 'm'), (57, 'm'), (58, 'M'), (56, 'M')], inst=pad, mel=None, drums='', pizz=True),
 'newsreel':    dict(bpm=116, prog=[(60, 'M'), (67, 'dom'), (60, 'M'), (65, 'M')], inst=brass, mel=None, drums='march', filt=(400, 3000), stab=True),
 'soap':        dict(bpm=60, prog=[(57, 'min'), (53, 'maj'), (52, 'dom'), (57, 'min')], inst=organ, mel=None, drums=''),
 'weather':     dict(bpm=100, prog=[(65, 'maj'), (67, 'min'), (64, 'min'), (69, 'min')], inst=ep, mel=ep, drums='brush', walk=True),
}
def music(style, dur, seed=1):
    if style == 'none' or style not in STY: return blank(dur)
    s = STY[style]; rr = np.random.default_rng(seed); beat = 60 / s['bpm']; bar = beat * 4; out = blank(dur + 3); t = 0; ci = 0
    while t < dur:
        root, q = s['prog'][ci % len(s['prog'])]; notes = [root + i for i in CH[q]]
        if s.get('inst') and not s.get('stab'):
            for m in notes: at(out, s['inst'](m - 12 if s['inst'] is pad else m, bar * (1.02 if s['inst'] is pad else .95)) * .35, t)
        if s.get('stab'):
            for b in [0, 1.5, 2.5] if style != 'newsreel' else [0, 1, 2, 3]:
                for m in notes[:3]: at(out, s['inst'](m, beat * .45) * .4, t + b * beat)
        if s.get('arp'):
            for k in range(8): at(out, pluck(notes[k % len(notes)] + 12 * (k // 4), beat * 2, .997) * .5, t + k * beat / 2)
        if s.get('pizz'):
            for k in range(8): at(out, pluck(notes[(k * 2) % len(notes)] - 12, beat * .5, .99) * .7, t + k * beat / 2)
        bl = [0, 2] if not s.get('walk') else [0, 1, 2, 3]
        for k, b in enumerate(bl): at(out, bass((notes[[0, 2, 1, 2][k % 4]] if s.get('walk') else root) - 24, beat * (2 if not s.get('walk') else 1)), t + b * beat)
        if s.get('mel'):
            for k in range(4):
                if rr.random() < .7: m = notes[int(rr.integers(len(notes)))] + s.get('mel_oct', 12); at(out, (s['mel'](mtof(m), beat * 1.5, 5) if s['mel'] is bell else s['mel'](m, beat)) * .22, t + k * beat)
        dr = s['drums']
        for k in range(8):
            tt = t + k * beat / 2
            if dr == 'four': (at(out, kick() * .8, tt) if k % 2 == 0 else None); at(out, hat(), tt + (beat / 4 if k % 2 else 0)); (at(out, snr() * .6, tt) if k in (2, 6) else None)
            if dr == 'back': (at(out, kick() * .7, tt) if k in (0, 3, 5) else None); (at(out, snr() * .7, tt) if k in (2, 6) else None); at(out, hat() * .8, tt)
            if dr == 'brush': at(out, brush(), tt); (at(out, kick() * .4, tt) if k in (0, 5) else None)
            if dr == 'march': at(out, snr() * .5, tt); (at(out, snr() * .5, tt + beat / 4) if k % 2 else None); (at(out, kick() * .7, tt) if k % 2 == 0 else None)
        t += bar; ci += 1
    out = out[:len(T(dur))]
    if s.get('filt'): out = bp(out, *s['filt'])
    out /= np.sqrt(np.mean(out ** 2)) or 1; e = np.minimum(1, T(dur) * 2) * np.minimum(1, (dur - T(dur)) * 2.5); return out * e
# ---------------- build ----------------
def levels(x, t0):
    hop = SR // FPS; r = [float(np.sqrt(np.mean(x[i:i + hop] ** 2))) for i in range(0, len(x), hop)]; m = max(r) or 1
    return [0 if v < m * .18 else (1 if v < m * .55 else 2) for v in r]
def build(g):
    t = OPEN; ev = {'speech': [], 'sfx': [], 'slam': [], 'laugh': []}; V_ = []; SF = []
    for it in g['items']:
        k = it[0]
        if k == 'wait': t += it[1]
        elif k == 'sfx': x = sfx(it[1]); SF.append((t, x * 10 ** (it[2] / 20))); ev['sfx'].append({'t': round(t, 3), 'n': it[1], 'd': round(len(x) / SR, 2)})
        elif k == 'slam': ev['slam'].append({'t': round(t, 3), 'txt': it[1], 'd': it[2]})
        elif k == 'laugh': x = sfx('laugh_' + it[1]); SF.append((t + .05, x * .55)); ev['laugh'].append({'t': round(t, 3), 'k': it[1], 'd': round(len(x) / SR, 2)})
        else:
            x = voice(k, it[1]); V_.append((t, x)); d = len(x) / SR; ev['speech'].append({'who': k, 't0': round(t, 3), 't1': round(t + d, 3), 'lv': levels(x, t)}); t += d + .14
    dur = round(t + .35, 3)
    mixv = blank(dur + 4); [at(mixv, x, tt) for tt, x in V_]
    mixs = blank(dur + 4); [at(mixs, x * .3, tt) for tt, x in SF]
    at(mixs, sfx('scratch') * .35, 0.0); at(mixs, sfx('whoosh') * .25, .12); at(mixs, sfx('whoosh') * .25, dur - .45)
    mus = blank(dur + 4); mm = music(g['music'], dur - OPEN + .2, g['id']); at(mus, mm * .03, OPEN - .1)
    mix = (mixv + mixs + mus)[:int(SR * dur)]; mix = mix / (np.abs(mix).max() or 1) * .89
    wavfile.write(os.path.join(OUT, f'gag{g["id"]:02d}.wav'), SR, (mix * 32767).astype(np.int16))
    meta = {'id': g['id'], 'at': g['at'], 'title': g['title'], 'set': g['set'], 'dur': dur, **ev}
    json.dump(meta, open(os.path.join(OUT, f'gag{g["id"]:02d}.json'), 'w')); return meta
if __name__ == '__main__':
    ids = [int(a) for a in sys.argv[1:]] or [g['id'] for g in G]; tot = 0
    for g in G:
        if g['id'] in ids: m = build(g); tot += m['dur']; print(g['id'], g['set'], m['dur'], flush=True)
    print('total', round(tot, 1))
