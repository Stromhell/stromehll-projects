#!/usr/bin/env python3
"""Greatest Estate Developer episode build (22 Nov 2026; adapted from Black Clover build_bc3.py for WEBTOON vertical panels).
script -> per-line Kokoro VO (em_santa 1.1, es) -> shots json for mangacut_v5 -> mix.py.
Usage: GED_EP=1 python3 build_ged.py [--vo]
Panels: /tmp/claude-0/ged/pan<EP>/pNNN.jpg (Tools/webtooncut/webtoon_panels.py). Script lines: PANEL[@t|m|b|0.x] | opts | text."""
import json, os, sys, hashlib
import numpy as np, soundfile as sf
from PIL import Image
EP = int(os.environ.get('GED_EP', '1'))
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.dirname(HERE)
PAN = os.environ.get('GED_PAN', f'/tmp/claude-0/ged/pan{EP}')
BR = '/mnt/project-files/manga-comics-channel/00 Channel/Branding'
SCRIPT = os.environ.get('GED_SCRIPT', f'script_ged{EP}_es_v1.txt'); TAG = SCRIPT.replace('script_', '').replace('.txt', '')
VO = os.path.join(V, '05 Production/voice_es'); os.makedirs(VO, exist_ok=True)
GAP = 0.22; ASPECT = float(os.environ.get("GED_ASPECT", "0.9"))  # window w/h inside tall webtoon panels
vo_name = lambda t: 'l_' + hashlib.md5(t.encode()).hexdigest()[:10] + '.wav'

rows, sec = [], None
for ln in open(os.path.join(HERE, SCRIPT)):
    ln = ln.rstrip('\n')
    if not ln or ln.startswith('#'): continue
    if ln.startswith('@'): sec = ln[1:].strip(); continue
    pn, opts, text = [x.strip() for x in ln.split('|', 2)]
    o = {}
    for t in opts.split():
        k, _, v = t.partition('='); o[k] = v.replace('_', ' ') if k == 'stamp' else (v or True)
    anc = None
    if '@' in pn: pn, anc = pn.split('@')
    rows.append(dict(sec=sec, pn=pn, anc=anc, o=o, text=text))

if '--vo' in sys.argv:
    from kokoro_onnx import Kokoro
    k = Kokoro('/tmp/claude-0/kok/kokoro-v1.0.onnx', '/tmp/claude-0/kok/voices-v1.0.bin')
    for r in rows:
        f = os.path.join(VO, vo_name(r['text']))
        if os.path.exists(f) and '--force' not in sys.argv: continue
        au, sr = k.create(r['text'], voice='em_santa', speed=1.1, lang='es'); sf.write(f, au, sr)

def window(path, anc):
    """Normalised crop [x,y,w,h] of a ~ASPECT window inside a tall panel, placed on the busiest rows of the chosen third."""
    im = Image.open(path).convert('L'); W, H = im.size
    wh = int(W / ASPECT)
    if H <= wh * 1.15: return None
    a = np.asarray(im, dtype=np.float32)
    edge = np.abs(np.diff(a, axis=1)).mean(axis=1); edge = np.append(edge, 0)
    cs = np.concatenate([[0], np.cumsum(edge)])
    starts = np.arange(0, H - wh + 1, 8); score = cs[starts + wh] - cs[starts]
    if anc in ('t', 'm', 'b'):
        lo, hi = {'t': (0, 0.42), 'm': (0.29, 0.71), 'b': (0.58, 1.0)}[anc]
        c = (starts + wh / 2) / H; okk = (c >= lo) & (c <= hi)
        if okk.any(): score = np.where(okk, score, -1)
    elif anc is not None:
        y = int(float(anc) * (H - wh)); return [0, y / H, 1, wh / H]
    y = int(starts[int(np.argmax(score))])
    return [0, y / H, 1, wh / H]

parts, shots, md, chapters, t_now, sr = [], [], [], [], 0.0, 24000
last_sec = None
for i, r in enumerate(rows):
    au, sr = sf.read(os.path.join(VO, vo_name(r['text'])))
    fl = int(sr * 0.015); au = au.copy(); au[:fl] *= np.linspace(0, 1, fl); au[-fl:] *= np.linspace(1, 0, fl)  # no clicks / dead stops
    parts += [au, np.zeros(int(sr * GAP))]; dur = round(len(au) / sr + GAP, 3)
    hop = sr // 30; nfr = int(round(dur * 30)); x = np.concatenate([au, np.zeros(int(sr * GAP) + hop)])
    env = np.array([np.sqrt(np.mean(x[k * hop:(k + 1) * hop] ** 2)) for k in range(nfr)])
    env = env / max(np.percentile(env, 95), 1e-6); env = np.clip(env, 0, 1)
    env = np.convolve(env, np.ones(4) / 4, mode='same'); env = [round(float(v), 2) for v in env]
    if r['sec'] != last_sec: chapters.append((t_now, r['sec'])); last_sec = r['sec']
    o = r['o']; sh = {'env': env, 'dur': dur, 'bg': {'black': 'aura:#2a2350'}.get(o.get('bg', 'paper'), o.get('bg', 'paper')), 'move': o.get('move', 'in')}
    if r['pn'].startswith('ai:'):
        sh['img'] = os.path.join(V, '03 Frames/art', r['pn'][3:]); sh['fit'] = 'auto'; sh['margin'] = 0.9; vis = r['pn']
    else:
        p = os.path.join(PAN, r['pn'] + '.jpg'); sh['img'] = p; vis = r['pn'] + ('@' + r['anc'] if r['anc'] else '')
        c = window(p, r['anc'])
        if c: sh['crop'] = c
        sh['fit'] = 'auto'; sh['margin'] = 0.94
    if o.get('punch'): sh['punch'] = True
    if 'gif' in o: sh['gif'] = {'file': f'gifs/ged{EP}-{o["gif"]}.mp4', 'pos': o.get('gpos', 'br'), 'scale': 0.3, 'at': 0.25, 'tilt': -4 if i % 2 else 4}
    if 'stamp' in o: sh['stamp'] = {'text': o['stamp'], 'at': 0.3, 'wash': False, 'color': '#ffd23d'}
    sh['sfx'] = 'hit' if o.get('punch') else ('pop' if 'gif' in o or 'stamp' in o else ('whoosh_soft' if i % 3 == 0 else None))
    if dur > 4.6 and 'gif' not in sh and 'stamp' not in sh and not r['pn'].startswith('ai:'):
        a1 = dict(sh); a1['dur'] = round(dur * 0.5, 3); b1 = dict(sh); b1['dur'] = round(dur - a1['dur'], 3)
        c = sh.get('crop', [0, 0, 1, 1]); zx = 0.7
        h1 = int(round(a1['dur'] * 30)); a1['env'] = env[:h1]; b1['env'] = env[h1:]
        _im = Image.open(sh['img']).convert('L'); _W, _H = _im.size; best = None
        for fx in (0.2, 0.5, 0.8):
            for fy in (0.1, 0.5, 0.9):  # zoom window with the least white (speech bubbles / empty gutters) so the zoom lands on art, not text
                cc = [c[0] + c[2] * (1 - zx) * fx, c[1] + c[3] * (1 - zx) * fy, c[2] * zx, c[3] * zx]
                a_ = np.asarray(_im.crop((int(cc[0] * _W), int(cc[1] * _H), int((cc[0] + cc[2]) * _W), int((cc[1] + cc[3]) * _H))), dtype=np.float32)
                sc_ = (a_ > 235).mean() - 0.1 * abs(fx - 0.5)
                if best is None or sc_ < best[0]: best = (sc_, cc)
        b1['crop'] = best[1]
        b1['move'] = 'left' if i % 2 else 'right'; b1['sfx'] = 'whoosh_soft'; b1.pop('punch', None)
        shots += [a1, b1]
    else:
        shots.append(sh)
    t_now += dur
    md.append(f'{i + 1}. {r["text"]}  \n   _[{vis}, bg {sh["bg"]}{", gif " + o["gif"] if "gif" in o else ""}{", stamp " + o["stamp"] if "stamp" in o else ""}]_')
shots.append({'dur': 5.0, 'bg': 'halftone:#e3262e', 'img': f'{BR}/01 Drafts v2/ska_logo_1024.png', 'fit': 'height', 'margin': 0.55, 'move': 'in', 'amount': 0.04})
sf.write(os.path.join(VO, f'vo_full_{TAG}.wav'), np.concatenate(parts), sr)
json.dump({'assets': os.path.join(V, '03 Frames'), 'watermark': f'{BR}/01 Drafts v1/ska_watermark_600.png', 'shots': shots}, open(os.path.join(HERE, f'shots_{TAG}.json'), 'w'), indent=1)
words = sum(len(r['text'].split()) for r in rows); total = sum(s['dur'] for s in shots)
fmt = lambda s: f'{int(s // 60)}:{int(s % 60):02d}'
open(os.path.join(V, '01 Script', f'GED{EP}_chapters_ES_v1.txt'), 'w').write('\n'.join(f'{fmt(t)} {n}' for t, n in chapters) + '\n')
open(os.path.join(V, '01 Script', f'GED{EP}_script_ES_v1.md'), 'w').write(
    f'# The Greatest Estate Developer Episodio {EP}: Stormi Knows Anime script v1 (ES)\n\n{len(rows)} lines, {words} words, {total / 60:.1f} min incl. 5 s end screen. Voice Kokoro em_santa 1.1.\n\n' + '\n'.join(md) + '\n')
print(len(rows), 'lines', len(shots), 'shots', round(total / 60, 1), 'min', words, 'words')
