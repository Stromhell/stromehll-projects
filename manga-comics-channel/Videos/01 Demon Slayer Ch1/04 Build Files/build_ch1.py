#!/usr/bin/env python3
"""Build Demon Slayer ch1 preview: VO per line (Kokoro voice B = am_fenrir 1.1), shots.json, script.md.
Usage: python3 build_ch1.py [--vo] ; then render with Tools/mangacut/mangacut_v2.py and mix.py"""
import json, os, sys, importlib.util
import numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.dirname(HERE)
spec = importlib.util.spec_from_file_location('s', os.path.join(HERE, 'script_ch1.py')); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
S = m.S
panels = json.load(open(os.path.join(V, '03 Frames/panels/panels.json')))
VO = os.path.join(V, '05 Production/voice'); os.makedirs(VO, exist_ok=True)
GAP = 0.22
if '--vo' in sys.argv:
    from kokoro_onnx import Kokoro
    k = Kokoro('/tmp/claude-0/kok/kokoro-v1.0.onnx', '/tmp/claude-0/kok/voices-v1.0.bin')
    for i, (line, _) in enumerate(S):
        a, sr = k.create(line, voice='am_fenrir', speed=1.1, lang='en-us')
        sf.write(os.path.join(VO, f'l{i:03d}.wav'), a, sr)
parts = []; shots = []; lines_md = []
for i, (line, vis) in enumerate(S):
    a, sr = sf.read(os.path.join(VO, f'l{i:03d}.wav'))
    parts += [a, np.zeros(int(sr * GAP))]
    dur = round(len(a) / sr + GAP, 3)
    v = vis['v']; sh = {'dur': dur, 'bg': vis.get('bg', 'paper'), 'move': vis.get('move', 'in')}
    if v.startswith('ai:'):
        sh['img'] = os.path.join('/mnt/project-files/manga-comics-channel/00 Channel/Style/art-tests', v[3:]); sh['fit'] = 'auto'; sh['margin'] = 0.92
    elif v.startswith('P'):
        sh['img'] = f'pages/p{v[1:]}.png'; sh['fit'] = 'height'
        if v in ('P057', 'P059'): sh['fit'] = 'width'; sh['margin'] = 0.62; sh['move'] = 'up'; sh['amount'] = 0.0
    else:
        pg, idx = v.split('#'); b = panels[pg][int(idx)]
        pad = 0.008; sh['img'] = f'pages/{pg}.png'
        sh['crop'] = [max(0, b[0] - pad), max(0, b[1] - pad), min(1, b[2] + 2 * pad), min(1, b[3] + 2 * pad)]
        sh['fit'] = 'auto'; sh['margin'] = 0.96
    for key in ('fit', 'margin', 'amount', 'punch'):
        if key in vis: sh[key] = vis[key]
    if 'gif' in vis: sh['gif'] = {'file': f'gifs/{vis["gif"]}.mp4', 'pos': vis.get('gpos', 'br'), 'scale': 0.3, 'at': 0.25, 'tilt': -4 if i % 2 else 4}
    if 'stamp' in vis: sh['stamp'] = {'text': vis['stamp'], 'at': 0.3, 'wash': False, 'color': '#ffd23d'}
    if 'pop' in vis:
        pg, idx = vis['pop'].split('#'); sh['pop'] = {'img': f'pages/{pg}.png', 'crop': panels[pg][int(idx)], 'at': 0.45, 'scale': 0.42, 'pos': [0.72, 0.5]}
    sh['sfx'] = 'hit' if vis.get('punch') else ('pop' if 'gif' in vis or 'stamp' in vis else ('whoosh_soft' if i % 3 == 0 else None))
    # keep the reference's 2-4 s cut rhythm: long lines become two shots (wide, then a closer crop of the same art)
    if dur > 4.4 and 'crop' in sh and not sh.get('gif') and not sh.get('stamp') and not sh.get('pop'):
        a1 = dict(sh); a1['dur'] = round(dur * 0.5, 3)
        b1 = dict(sh); b1['dur'] = round(dur - a1['dur'], 3); c = sh['crop']
        zx = 0.62
        b1['crop'] = [c[0] + c[2] * (1 - zx) * (0.15 if i % 2 else 0.85), c[1] + c[3] * (1 - zx) * 0.3, c[2] * zx, c[3] * zx]
        b1['move'] = {'in': 'left', 'left': 'in', 'right': 'in', 'up': 'in', 'down': 'in', 'out': 'right'}.get(sh['move'], 'in'); b1['sfx'] = 'whoosh_soft'; b1.pop('punch', None)
        shots += [a1, b1]
    else:
        shots.append(sh)
    lines_md.append(f'{i + 1}. {line}  \n   _[{v}, bg {sh["bg"]}{", gif " + vis["gif"] if "gif" in vis else ""}{", stamp " + vis["stamp"] if "stamp" in vis else ""}]_')
# clean 5 s end screen (moving bg + logo only) for YouTube end-screen elements
shots.append({'dur': 5.0, 'bg': 'halftone:#e3262e', 'img': '/mnt/project-files/manga-comics-channel/00 Channel/Branding/01 Drafts v1/ska_logo_1024.png', 'fit': 'height', 'margin': 0.55, 'move': 'in', 'amount': 0.04})
sf.write(os.path.join(VO, 'vo_full.wav'), np.concatenate(parts), sr)
json.dump({'assets': '../03 Frames', 'watermark': '/mnt/project-files/manga-comics-channel/00 Channel/Branding/01 Drafts v1/ska_watermark_600.png', 'shots': shots},
          open(os.path.join(HERE, 'shots_ch1.json'), 'w'), indent=1)
os.makedirs(os.path.join(V, '01 Script'), exist_ok=True)
words = sum(len(l.split()) for l, _ in S); total = sum(s['dur'] for s in shots)
open(os.path.join(V, '01 Script', 'DS_Ch1_script_v1.md'), 'w').write(
    f'# Demon Slayer Chapter 1 "Cruelty": Stormi Knows Anime preview script v1\n\n{len(S)} lines, {words} words, {total / 60:.1f} min incl. 5 s end screen. Voice B (Kokoro am_fenrir, speed 1.1).\n\n' + '\n'.join(lines_md) + '\n')
print(len(shots), 'shots', round(total, 1), 's', words, 'words')
