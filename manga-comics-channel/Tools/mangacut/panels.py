#!/usr/bin/env python3
"""Detect manga panels on each page (recursive XY-cut on white gutters) and write panels.json
{page: [[x,y,w,h] normalised, ...]} in reading order (right-to-left, top-to-bottom for manga).
Also writes labelled contact sheets so a human/agent can pick panels by id (e.g. "p023#2").
Usage: python3 panels.py PAGES_DIR OUT_DIR [--ltr]"""
import sys, os, glob, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def cuts(mask, axis, min_gap):
    # mask True = ink. Return segments along axis separated by >= min_gap empty lines
    prof = mask.any(axis=1 - axis) if axis == 0 else mask.any(axis=0)
    segs, start, gap = [], None, 0
    for i, v in enumerate(prof):
        if v:
            if start is None: start = i
            gap = 0
        elif start is not None:
            gap += 1
            if gap >= min_gap: segs.append((start, i - gap + 1)); start = None; gap = 0
    if start is not None: segs.append((start, len(prof)))
    return segs

def xycut(mask, x0, y0, depth=0, out=None, rtl=True):
    out = [] if out is None else out
    H, W = mask.shape
    mg = max(6, int(min(H, W) * 0.008))
    rows = cuts(mask, 0, mg)
    if len(rows) > 1 and depth < 8:
        for a, b in rows: xycut(mask[a:b], x0, y0 + a, depth + 1, out, rtl)
        return out
    cols = cuts(mask, 1, mg)
    if len(cols) > 1 and depth < 8:
        for a, b in (reversed(cols) if rtl else cols): xycut(mask[:, a:b], x0 + a, y0, depth + 1, out, rtl)
        return out
    out.append((x0, y0, W, H)); return out

def main():
    src, outd = sys.argv[1], sys.argv[2]; rtl = '--ltr' not in sys.argv
    os.makedirs(outd, exist_ok=True)
    f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 34)
    res = {}
    for p in sorted(glob.glob(os.path.join(src, '*.png')) + glob.glob(os.path.join(src, '*.jpg'))):
        im = Image.open(p).convert('L'); W, H = im.size
        a = np.array(im) < 225
        boxes = [b for b in xycut(a, 0, 0, rtl=rtl) if b[2] * b[3] > W * H * 0.02]
        name = os.path.splitext(os.path.basename(p))[0]
        res[name] = [[round(x / W, 4), round(y / H, 4), round(w / W, 4), round(h / H, 4)] for x, y, w, h in boxes]
    json.dump(res, open(os.path.join(outd, 'panels.json'), 'w'), indent=0)
    # sheets
    names = sorted(res)
    for s in range(0, len(names), 8):
        sheet = Image.new('RGB', (4 * 420, 2 * 620), 'white')
        for k, n in enumerate(names[s:s + 8]):
            p = [q for q in glob.glob(os.path.join(src, n + '.*'))][0]
            im = Image.open(p).convert('RGB'); sc = min(420 / im.width, 600 / im.height); im = im.resize((int(im.width * sc), int(im.height * sc)))
            d = ImageDraw.Draw(im)
            for i, (x, y, w, h) in enumerate(res[n]):
                X, Y, Ww, Hh = x * im.width, y * im.height, w * im.width, h * im.height
                d.rectangle([X, Y, X + Ww, Y + Hh], outline='red', width=3); d.text((X + 4, Y + 2), str(i), font=f, fill='red', stroke_width=3, stroke_fill='white')
            ox, oy = (k % 4) * 420, (k // 4) * 620
            sheet.paste(im, (ox, oy + 20)); ImageDraw.Draw(sheet).text((ox + 4, oy - 2), n, font=f, fill='blue')
        sheet.save(os.path.join(outd, f'panels_{s // 8:02d}.jpg'), quality=78)
    print(len(res), 'pages,', sum(len(v) for v in res.values()), 'panels')

if __name__ == '__main__':
    main()
