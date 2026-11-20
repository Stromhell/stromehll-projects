#!/usr/bin/env python3
"""Fetch reaction GIFs (as mp4) from Tenor's public search page, no API key.
Usage: python3 tenor_fetch.py "anime shocked" OUTDIR [--n 6]
Writes OUTDIR/<slug>_<k>.mp4 and appends source URLs to OUTDIR/SOURCES.md (keep for credits / takedown checks).
Picks the biggest available rendition per GIF (gif->mp4 'AAAPo' is small; we try several codes)."""
import argparse, os, re, subprocess, urllib.request
ap = argparse.ArgumentParser(); ap.add_argument('q'); ap.add_argument('out'); ap.add_argument('--n', type=int, default=6)
a = ap.parse_args(); os.makedirs(a.out, exist_ok=True)
slug = re.sub(r'[^a-z0-9]+', '-', a.q.lower()).strip('-')
UA = {'User-Agent': 'Mozilla/5.0'}
html = urllib.request.urlopen(urllib.request.Request(f'https://tenor.com/search/{slug}-gifs', headers=UA), timeout=30).read().decode('utf8', 'ignore')
ids = []
for m in re.finditer(r'https://media[0-9]*\.tenor\.com/([A-Za-z0-9_-]{11})AAA[A-Za-z0-9]{2}/([A-Za-z0-9_-]+)\.(?:gif|mp4)', html):
    if m.group(1) not in [i for i, _ in ids]: ids.append((m.group(1), m.group(2)))
got = 0
for gid, name in ids:
    if got >= a.n: break
    best = None
    for code in ('AAAPo', 'AAAAC', 'AAAAd'):
        url = f'https://media.tenor.com/{gid}{code}/{name}.{"mp4" if code == "AAAPo" else "gif"}'
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()
        except Exception:
            continue
        if best is None or len(data) > len(best[1]): best = (url, data)
    if not best: continue
    raw = os.path.join(a.out, f'{slug}_{got + 1}.src'); open(raw, 'wb').write(best[1])
    mp4 = os.path.join(a.out, f'{slug}_{got + 1}.mp4')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-movflags', '+faststart', '-pix_fmt', 'yuv420p',
                    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', mp4], check=True)
    os.remove(raw)
    with open(os.path.join(a.out, 'SOURCES.md'), 'a') as f: f.write(f'- {os.path.basename(mp4)}: {best[0]} (search "{a.q}")\n')
    print(mp4); got += 1
