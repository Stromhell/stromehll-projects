#!/usr/bin/env python3
"""One Piece Gear 6 theory (ES), copied from build_op1199.py.
One Piece 1199 (ES), copied from Boruto build_ch39.py build: script_op1198_es.txt -> per-line Kokoro VO (em_santa 1.1, es) + shots_opg6_es_v1.json + script md + chapters.
Adapted from 02 Demon Slayer Full Story/04 Build Files/build_full.py, but single chapter: first column = PAGE number, and every
line gives its own crop (c=x,y,w,h, normalised) so panels are hand-picked. Render with Tools/mangacut/mangacut_v5.py, mix with mix.py.
Usage: python3 build_ch39.py [--vo] [--force]"""
import json, os, sys
import numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.dirname(HERE)
PAGES = os.environ.get('OP_PAGES', '/tmp/claude-0/op/pages')
BR = '/mnt/project-files/manga-comics-channel/00 Channel/Branding'
VO = os.path.join(V, '05 Production/voice_es'); os.makedirs(VO, exist_ok=True)  # VO files named by text hash so edits never shift/overwrite
import hashlib
vo_name = lambda t: 'l_' + hashlib.md5(t.encode()).hexdigest()[:10] + '.wav'
GAP = 0.22
rows, sec = [], None
for ln in open(os.path.join(HERE, os.environ.get('OP_SCRIPT', 'script_opg6_es_v1.txt'))):
    ln = ln.rstrip('\n')
    if not ln or ln.startswith('#'): continue
    if ln.startswith('@'): sec = ln[1:].strip(); continue
    pg, opts, text = [x.strip() for x in ln.split('|', 2)]; o = {}
    for t in opts.split():
        k, _, v = t.partition('='); o[k] = v.replace('_', ' ') if k == 'stamp' else (v or True)
    rows.append(dict(sec=sec, p=int(pg), o=o, text=text))
if '--vo' in sys.argv:
    from kokoro_onnx import Kokoro
    k = Kokoro('/tmp/claude-0/kok/kokoro-v1.0.onnx', '/tmp/claude-0/kok/voices-v1.0.bin')
    for i, r in enumerate(rows):
        f = os.path.join(VO, vo_name(r['text']))
        if os.path.exists(f) and '--force' not in sys.argv: continue
        au, sr = k.create(r['text'], voice='em_santa', speed=1.1, lang='es'); sf.write(f, au, sr)
parts, shots, md, chapters, t_now, last = [], [], [], [], 0.0, None
for i, r in enumerate(rows):
    au, sr = sf.read(os.path.join(VO, vo_name(r['text'])))
    parts += [au, np.zeros(int(sr * GAP))]; dur = round(len(au) / sr + GAP, 3)
    hop = sr // 30; nfr = int(round(dur * 30)); x = np.concatenate([au, np.zeros(int(sr * GAP) + hop)])
    env = np.array([np.sqrt(np.mean(x[k * hop:(k + 1) * hop] ** 2)) for k in range(nfr)])
    env = np.clip(env / max(np.percentile(env, 95), 1e-6), 0, 1); env = [round(float(v), 2) for v in np.convolve(env, np.ones(4) / 4, mode='same')]
    if r['sec'] != last: chapters.append((t_now, r['sec'])); last = r['sec']
    o = r['o']; sh = {'env': env, 'dur': dur, 'bg': o.get('bg', 'paper'), 'move': o.get('move', 'in')}
    ch = int(o.get('ch', 1199)); pgname = f'c{ch:03d}-{r["p"]:03d}'; PDIR = f'/tmp/claude-0/op/p{ch}'
    if 'ai' in o:
        sh['img'] = os.path.join(V, '03 Frames/art', o['ai']); sh['fit'] = 'auto'; sh['margin'] = 0.92; vis = 'ai:' + o['ai']
    elif 'page' in o:
        sh['img'] = os.path.join(PDIR, pgname + '.jpg'); sh['fit'] = 'width'; sh['margin'] = 0.62; sh['move'] = 'up'; sh['amount'] = 0.0; vis = pgname
    else:
        sh['img'] = os.path.join(PDIR, pgname + '.jpg'); sh['crop'] = [float(v) for v in o['c'].split(',')]
        sh['fit'] = 'auto'; sh['margin'] = 0.96; vis = f'{pgname} crop {o["c"]}'
    if o.get('punch'): sh['punch'] = True
    if 'gif' in o: sh['gif'] = {'file': f'gifs/{o["gif"]}.mp4', 'pos': o.get('gpos', 'br'), 'scale': 0.3, 'at': 0.25, 'tilt': -4 if i % 2 else 4}
    if 'stamp' in o: sh['stamp'] = {'text': o['stamp'], 'at': 0.3, 'wash': False, 'color': '#ffd23d'}
    sh['sfx'] = 'hit' if o.get('punch') else ('pop' if 'gif' in o or 'stamp' in o else ('whoosh_soft' if i % 3 == 0 else None))
    if dur > 4.4 and 'crop' in sh and 'gif' not in sh and 'stamp' not in sh:
        a1 = dict(sh); a1['dur'] = round(dur * 0.5, 3); b1 = dict(sh); b1['dur'] = round(dur - a1['dur'], 3); c = sh['crop']; zx = 0.66
        h1 = int(round(a1['dur'] * 30)); a1['env'] = env[:h1]; b1['env'] = env[h1:]
        b1['crop'] = [c[0] + c[2] * (1 - zx) * (0.15 if i % 2 else 0.85), c[1] + c[3] * (1 - zx) * 0.3, c[2] * zx, c[3] * zx]
        b1['move'] = {'in': 'left', 'left': 'in', 'right': 'in', 'up': 'in', 'down': 'in', 'out': 'right'}.get(sh['move'], 'in'); b1['sfx'] = 'whoosh_soft'; b1.pop('punch', None)
        shots += [a1, b1]
    else:
        shots.append(sh)
    t_now += dur
    md.append(f'{i + 1}. {r["text"]}  \n   _[{vis}, bg {sh["bg"]}{", gif " + o["gif"] if "gif" in o else ""}{", stamp " + o["stamp"] if "stamp" in o else ""}]_')
shots.append({'dur': 5.0, 'bg': 'halftone:#e3262e', 'img': f'{BR}/01 Drafts v2/ska_logo_1024.png', 'fit': 'height', 'margin': 0.55, 'move': 'in', 'amount': 0.04})
sf.write(os.path.join(VO, 'vo_full.wav'), np.concatenate(parts), sr)
json.dump({'assets': os.path.join(V, '03 Frames'), 'watermark': f'{BR}/01 Drafts v1/ska_watermark_600.png', 'shots': shots}, open(os.path.join(HERE, 'shots_opg6_es_v1.json'), 'w'), indent=1)
words = sum(len(r['text'].split()) for r in rows); total = sum(s['dur'] for s in shots)
fmt = lambda s: f'{int(s // 60)}:{int(s % 60):02d}'
open(os.path.join(V, '01 Script', 'OPG6_chapters_ES_v1.txt'), 'w').write('\n'.join(f'{fmt(t)} {n}' for t, n in chapters) + '\n')
open(os.path.join(V, '01 Script', 'OPG6_script_ES_v1.md'), 'w').write(
    f'# One Piece: teoría Gear 6, Stormi Knows Anime script v1 (ES)\n\n{len(rows)} lines, {words} words, {total / 60:.1f} min incl. 5 s end screen. Voice Kokoro em_santa 1.1.\n\n' + '\n'.join(md) + '\n')
print(len(rows), 'lines', len(shots), 'shots', round(total / 60, 1), 'min', words, 'words')
