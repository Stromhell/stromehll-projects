#!/usr/bin/env python3
"""Black Clover PART 2 build (copied from Demon Slayer build_full.py, 21 Nov 2026): script_full.txt -> per-line Kokoro VO (voice B) + auto panel picks + shots_full.json + script md.
Usage: python3 build_full.py [--vo] [--es]   (--es = Spanish: script_full_es.txt, Kokoro em_santa, lang es; Pushpam 20 Nov)   then render with Tools/mangacut/mangacut_v3.py and mix with mix.py.
Pages live at PAGES (cNNN-PPP.jpg, all 205 chapters); panels from panels_all.json (Tools-style XY cut).
Per-line overrides: put  pick=c040-012#1  in options to force a panel."""
import json, os, sys, re, glob
import numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.dirname(HERE)
PAGES = os.environ.get('BC_PAGES', '/tmp/claude-0/bc/pg')
PANELS = json.load(open(os.environ.get('BC_PANELS', '/tmp/claude-0/bc/panels_all.json')))
BR = '/mnt/project-files/manga-comics-channel/00 Channel/Branding'
ES = True
VO = os.path.join(V, '05 Production/voice_es' if ES else '05 Production/voice'); os.makedirs(VO, exist_ok=True)
GAP = 0.22
import hashlib
vo_name = lambda t: 'l_' + hashlib.md5(t.encode()).hexdigest()[:10] + '.wav'

rows, sec = [], None
for ln in open(os.path.join(HERE, os.environ.get('BC_SCRIPT', 'script_bc2_es_v2.txt'))):
    ln = ln.rstrip('\n')
    if not ln or ln.startswith('#'): continue
    if ln.startswith('@'): sec = ln[1:].strip(); continue
    ch, opts, text = [x.strip() for x in ln.split('|', 2)]
    a, b = (ch.split('-') + [ch])[:2]; o = {}
    for t in opts.split():
        k, _, v = t.partition('='); o[k] = v.replace('_', ' ') if k == 'stamp' else (v or True)
    rows.append(dict(sec=sec, a=int(a), b=int(b), o=o, text=text))

if '--vo' in sys.argv:
    from kokoro_onnx import Kokoro
    k = Kokoro('/tmp/claude-0/kok/kokoro-v1.0.onnx', '/tmp/claude-0/kok/voices-v1.0.bin')
    for i, r in enumerate(rows):
        f = os.path.join(VO, vo_name(r['text']))
        if os.path.exists(f) and '--force' not in sys.argv: continue
        au, sr = k.create(r['text'], voice='em_santa' if ES else 'am_fenrir', speed=1.1, lang='es' if ES else 'en-us'); sf.write(f, au, sr)

pages_by_ch = {}
for name in sorted(PANELS):
    c = int(name[1:4]); pages_by_ch.setdefault(c, []).append(name)

INK = json.load(open(os.environ.get('BC_INK', '/tmp/claude-0/bc/ink.json')))  # per panel [dark fraction, edge density]
SKIP = {'c001-002', 'c001-003'}  # front matter (credits / contents)
# volume-start chapters (wide character-profile spread on page 005): skip their credits/contents/profile pages 002-005
for _k, _v in PANELS.items():
    if _k.endswith('-005') and _v['size'] and _v['size'][0] > _v['size'][1]:
        SKIP |= {f'{_k[:4]}-{n:03d}' for n in range(2, 6)}
from PIL import Image as _I
for _k, _v in PANELS.items():
    if _k.endswith('-001'):
        _im = _I.open(os.path.join(PAGES, _k + '.jpg')).convert('HSV').resize((60, 90)); _sat = np.array(_im)[..., 1].mean()
        if _sat > 40: SKIP.add(_k)  # colour volume cover
    if len(_v['panels']) == 1 and INK[_k][0][0] < 0.1: SKIP.add(_k)  # author note / near-blank page
# v2 (21 Nov watch check): volume extras (Blank Page Brigade, letters corner, popularity polls, afterwords, sketches) and fan-service pages
_COV = sorted({int(k[1:4]) for k in SKIP if k.endswith('-001')})
_pages = {}
for _k in PANELS: _pages.setdefault(int(_k[1:4]), []).append(_k)
for _c, _ps in _pages.items():
    _ps.sort()
    for _p in _ps:
        if _c > 1 and int(_p[5:8]) >= 18: SKIP.add(_p)
    if _c + 1 in _COV or _c == 380:
        SKIP |= set(_ps[-3:])
SKIP |= {'c111-010', 'c082-001', 'c082-002', 'c082-003'} | set(os.environ.get('BC_SKIP', '').split())
print('skip', len(SKIP))
def score(bx, pg=None, idx=None):
    x, y, w, h = bx; ar = (w * 1.0) / max(h, 1e-3)
    pen = 1.0 if 0.5 < ar < 2.6 else 0.45
    if pg is not None:
        if pg in SKIP: return 0
        dark, edge = INK[pg][idx]
        if edge < 0.12 or dark < 0.06: return 0          # near-empty / text-only panels
        pen *= min(1.6, max(0.3, edge / 0.15)) * (1.0 if dark < 0.85 else 0.3)
    return w * h * pen

used = set()
from collections import Counter
range_n = Counter((r['a'], r['b']) for r in rows); range_k = Counter()
def pick(r):
    if 'pick' in r['o']:
        pg, idx = r['o']['pick'].split('#'); return pg, int(idx)
    pages = [p for c in range(r['a'], r['b'] + 1) for p in pages_by_ch.get(c, [])]
    key = (r['a'], r['b']); kk = range_k[key]; range_k[key] += 1
    t = int((kk + 0.5) / range_n[key] * len(pages))
    best = None
    for d in range(0, len(pages)):
        for j in (t - d, t + d):
            if not 0 <= j < len(pages): continue
            pg = pages[j]
            for idx, bx in enumerate(PANELS[pg]['panels']):
                if (pg, idx) in used or bx[2] * bx[3] < 0.08: continue
                s = score(bx, pg, idx) * (1 - 0.04 * d)
                if s <= 0: continue
                if best is None or s > best[0]: best = (s, pg, idx)
        if best and d >= 3: break
    if not best: pg = pages[min(t, len(pages) - 1)]; return pg, -1
    return best[1], best[2]

parts, shots, md, chapters, t_now, sr = [], [], [], [], 0.0, 24000
last_sec = None
for i, r in enumerate(rows):
    au, sr = sf.read(os.path.join(VO, vo_name(r['text'])))
    parts += [au, np.zeros(int(sr * GAP))]; dur = round(len(au) / sr + GAP, 3)
    # VO loudness envelope per video frame (30 fps) -> zoom pulses in mangacut_v4 so the art reacts to the voice
    hop = sr // 30; nfr = int(round(dur * 30)); x = np.concatenate([au, np.zeros(int(sr * GAP) + hop)])
    env = np.array([np.sqrt(np.mean(x[k * hop:(k + 1) * hop] ** 2)) for k in range(nfr)])
    env = env / max(np.percentile(env, 95), 1e-6); env = np.clip(env, 0, 1)
    env = np.convolve(env, np.ones(4) / 4, mode='same'); env = [round(float(v), 2) for v in env]
    if r['sec'] != last_sec: chapters.append((t_now, r['sec'])); last_sec = r['sec']
    o = r['o']; sh = {'env': env, 'dur': dur, 'bg': o.get('bg', 'paper'), 'move': o.get('move', 'in')}
    if 'ai' in o:
        sh['img'] = os.path.join(V, '03 Frames/art', o['ai']); sh['fit'] = 'auto'; sh['margin'] = 0.92; vis = 'ai:' + o['ai']
    elif 'page' in o:
        pg = [p for p in pages_by_ch[r['a']] if p not in SKIP][0] if r['a'] == r['b'] else pick(r)[0]
        sh['img'] = os.path.join(PAGES, pg + '.jpg'); sh['fit'] = 'width'; sh['margin'] = 0.62; sh['move'] = 'up'; sh['amount'] = 0.0; vis = pg
    else:
        pg, idx = pick(r); used.add((pg, idx)); sh['img'] = os.path.join(PAGES, pg + '.jpg'); vis = f'{pg}#{idx}'
        if idx < 0:
            sh['fit'] = 'width'; sh['margin'] = 0.62; sh['move'] = 'up'; sh['amount'] = 0.0
        else:
            bx = list(PANELS[pg]['panels'][idx]); pad = 0.008
            if bx[2] * bx[3] > 0.45:  # XY-cut could not split this page: use the top or bottom half so the art reads big
                half = bx[3] / 2; bx = [bx[0], bx[1] + (half * 0.5 if i % 2 else 0), bx[2], half]  # top or middle half (faces), never the bottom
            sh['crop'] = [max(0, bx[0] - pad), max(0, bx[1] - pad), min(1, bx[2] + 2 * pad), min(1, bx[3] + 2 * pad)]
            sh['fit'] = 'auto'; sh['margin'] = 0.96
    if o.get('punch'): sh['punch'] = True
    if 'gif' in o: sh['gif'] = {'file': f'gifs/{o["gif"]}.mp4', 'pos': o.get('gpos', 'br'), 'scale': 0.3, 'at': 0.25, 'tilt': -4 if i % 2 else 4}
    if 'stamp' in o: sh['stamp'] = {'text': o['stamp'], 'at': 0.3, 'wash': False, 'color': '#ffd23d'}
    sh['sfx'] = 'hit' if o.get('punch') else ('pop' if 'gif' in o or 'stamp' in o else ('whoosh_soft' if i % 3 == 0 else None))
    if dur > 4.4 and 'crop' in sh and 'gif' not in sh and 'stamp' not in sh:
        a1 = dict(sh); a1['dur'] = round(dur * 0.5, 3); b1 = dict(sh); b1['dur'] = round(dur - a1['dur'], 3); c = sh['crop']; zx = 0.62
        h1 = int(round(a1['dur'] * 30)); a1['env'] = env[:h1]; b1['env'] = env[h1:]
        b1['crop'] = [c[0] + c[2] * (1 - zx) * (0.15 if i % 2 else 0.85), c[1] + c[3] * (1 - zx) * 0.3, c[2] * zx, c[3] * zx]
        b1['move'] = {'in': 'left', 'left': 'in', 'right': 'in', 'up': 'in', 'down': 'in', 'out': 'right'}.get(sh['move'], 'in'); b1['sfx'] = 'whoosh_soft'; b1.pop('punch', None)
        shots += [a1, b1]
    else:
        shots.append(sh)
    t_now += dur
    md.append(f'{i + 1}. {r["text"]}  \n   _[ch {r["a"]}-{r["b"]}, {vis}, bg {sh["bg"]}{", gif " + o["gif"] if "gif" in o else ""}{", stamp " + o["stamp"] if "stamp" in o else ""}]_')
shots.append({'dur': 5.0, 'bg': 'halftone:#e3262e', 'img': f'{BR}/01 Drafts v2/ska_logo_1024.png', 'fit': 'height', 'margin': 0.55, 'move': 'in', 'amount': 0.04})
sf.write(os.path.join(VO, 'vo_full.wav'), np.concatenate(parts), sr)
json.dump({'assets': os.path.join(V, '03 Frames'), 'watermark': f'{BR}/01 Drafts v1/ska_watermark_600.png', 'shots': shots}, open(os.path.join(HERE, os.environ.get('BC_SHOTS','shots_bc2_es_v1.json')), 'w'), indent=1)
os.makedirs(os.path.join(V, '01 Script'), exist_ok=True)
words = sum(len(r['text'].split()) for r in rows); total = sum(s['dur'] for s in shots)
fmt = lambda s: f'{int(s // 60)}:{int(s % 60):02d}'
open(os.path.join(V, '01 Script', 'BC2_chapters_ES_v1.txt'), 'w').write('\n'.join(f'{fmt(t)} {n}' for t, n in chapters) + '\n')
open(os.path.join(V, '01 Script', 'BC2_script_ES_v1.md'), 'w').write(
    f'# Black Clover Parte 2 (cap. 151-334): Stormi Knows Anime script v1 (ES)\n\n{len(rows)} lines, {words} words, {total / 60:.1f} min incl. 5 s end screen. Voice B (Kokoro am_fenrir 1.1).\n\n' + '\n'.join(md) + '\n')
json.dump(sorted({s['img'] for s in shots if s['img'].startswith(PAGES)}), open(os.path.join(HERE, 'pages_used.json'), 'w'))
print(len(rows), 'lines', len(shots), 'shots', round(total / 60, 1), 'min', words, 'words')
