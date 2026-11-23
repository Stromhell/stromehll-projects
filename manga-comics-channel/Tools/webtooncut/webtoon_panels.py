#!/usr/bin/env python3
"""Cut a WEBTOON episode (vertical strips raw/NNN.jpg) into panels (22 Nov 2026, Greatest Estate Developer).
Stitches strips, finds uniform horizontal gutter rows (>= MIN_GAP px), saves each panel as pNNN.jpg + panels.json
and contact sheets for reading. Usage: webtoon_panels.py RAW_DIR OUT_DIR"""
import sys, os, glob, json
import numpy as np
from PIL import Image
raw, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
fs = sorted(glob.glob(os.path.join(raw, '*.jpg')))
arrs = [np.asarray(Image.open(f).convert('RGB')) for f in fs]
W = arrs[0].shape[1]
arrs = [a if a.shape[1] == W else np.asarray(Image.fromarray(a).resize((W, int(a.shape[0] * W / a.shape[1])))) for a in arrs]
big = np.concatenate(arrs, 0); H = big.shape[0]
g = big.astype(np.int16)
rowstd = g.std(axis=1).max(axis=1)                  # per row colour spread
uniform = rowstd < 6
MIN_GAP, MIN_PANEL = 40, 120
panels, y, start = [], 0, None
runs = []; i = 0
while i < H:
    if uniform[i]:
        j = i
        while j < H and uniform[j]: j += 1
        if j - i >= MIN_GAP: runs.append((i, j))
        i = j
    else: i += 1
prev = 0
for a, b in runs + [(H, H)]:
    if a - prev >= MIN_PANEL: panels.append((prev, a))
    prev = b
meta = []
for k, (a, b) in enumerate(panels):
    im = Image.fromarray(big[a:b]); n = f'p{k + 1:03d}.jpg'; im.save(os.path.join(out, n), quality=92)
    meta.append({'file': n, 'y0': int(a), 'y1': int(b), 'h': int(b - a)})
json.dump({'width': W, 'height': int(H), 'panels': meta}, open(os.path.join(out, 'panels.json'), 'w'), indent=1)
# contact sheets: panels scaled to 400 px wide, stacked in columns of ~3600 px, 3 columns per sheet, labelled
from PIL import ImageDraw
sheets, cols, col, colh = [], [], [], 0
for m in meta:
    im = Image.open(os.path.join(out, m['file'])); im = im.resize((400, max(1, int(im.height * 400 / im.width))))
    if im.height > 3400: im = im.resize((int(400 * 3400 / im.height), 3400))
    if colh + im.height > 3600 and col: cols.append(col); col, colh = [], 0
    col.append((m['file'], im)); colh += im.height + 24
if col: cols.append(col)
os.makedirs(os.path.join(out, 'sheets'), exist_ok=True)
for s in range(0, len(cols), 3):
    sh = Image.new('RGB', (1260, 3650), 'white'); d = ImageDraw.Draw(sh)
    for ci, c in enumerate(cols[s:s + 3]):
        yy = 0
        for name, im in c:
            d.rectangle([ci * 420, yy, ci * 420 + 400, yy + 22], fill='red'); d.text((ci * 420 + 4, yy + 4), name, fill='white')
            sh.paste(im, (ci * 420, yy + 22)); yy += im.height + 24
    sh.save(os.path.join(out, 'sheets', f'sheet{s // 3 + 1:02d}.jpg'), quality=80)
print(len(meta), 'panels', H, 'px', len(cols), 'cols')
