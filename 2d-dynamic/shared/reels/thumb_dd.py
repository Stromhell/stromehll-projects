#!/usr/bin/env python3
"""In-house vertical reel covers (1080x1920) for the 2D dynamic line.
usage: python3 shared/reels/thumb_dd.py VIDEO_DIR [ID ...]
Reads VIDEO/reels/reels.json. Per reel: thumb [line1, line2] (line 2 goes on the accent slab),
optional name (gold name tag above the headline), tt (seconds into the reel clip, default middle of shot s0), thx (crop centre x in 1920 px, default 960), tz (zoom, default 1)."""
import json, os, sys, subprocess
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
V = sys.argv[1].rstrip('/'); IDS = set(map(int, sys.argv[2:]))
SH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = f'{SH}/fonts/Anton.ttf'; W, H = 1080, 1920
LOGO = Image.open(f'{SH}/branding/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox())
LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS)
ACC = {'epic': (255, 196, 40), 'tense': (232, 58, 42), 'sad': (90, 170, 255), 'light': (120, 230, 120)}
OUT = f'{V}/reels/out'; os.makedirs(OUT, exist_ok=True)
def fit(d, txt, maxw, size):
    while size > 60:
        f = ImageFont.truetype(FONT, size)
        if d.textlength(txt, font=f) <= maxw: return f
        size -= 4
    return ImageFont.truetype(FONT, size)
for R in json.load(open(f'{V}/reels/reels.json')):
    if IDS and R['id'] not in IDS: continue
    A = f'{V}/production/acts/act{R["act"]}'; T = {s['i']: s for s in json.load(open(f'{A}/timing.json'))['shots']}
    s0 = T[R['s0']]; t = s0['start'] + R.get('tt', (s0['end'] - s0['start']) * .55)
    tmp = f'/tmp/thumb_{os.getpid()}.png'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(t), '-i', f'{A}/act{R["act"]}.mp4', '-frames:v', '1', tmp], check=True)
    src = Image.open(tmp).convert('RGB').crop((0, 0, 1920, 930))  # drop burned-in subtitles
    if R.get('layout') == 'top':  # text band on top, whole scene below it: text never covers a character
        src = src.crop((0, R.get('cy', 140), 1920, 930))  # drop the burned-in place/date cards at the top
        SHh = int(H * R.get('tz', .62)); k = SHh / src.height; sc = src.resize((int(src.width * k), SHh), Image.LANCZOS)
        x0 = int(min(max(R.get('thx', 960) * k - W / 2, 0), sc.width - W)); sc = sc.crop((x0, 0, x0 + W, SHh))
        bg = sc.crop((0, 0, W, max(60, SHh // 4))).resize((W, H - SHh + 200), Image.BICUBIC).filter(ImageFilter.GaussianBlur(40))
        bg = ImageEnhance.Brightness(bg).enhance(.45); im = Image.new('RGB', (W, H)); im.paste(bg, (0, 0))
        fm = Image.new('L', (W, SHh), 255); fd = ImageDraw.Draw(fm)
        for yy in range(120): fd.line([(0, yy), (W, yy)], fill=int(255 * yy / 120))
        im.paste(sc.filter(ImageFilter.UnsharpMask(3, 70, 2)), (0, H - SHh), fm)
        im = ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.25)).enhance(1.12); TOPY = R.get('ty', 70)
    else:
        TOPY = None
    k = H / src.height * R.get('tz', 1.0); big = src.resize((int(src.width * k), int(src.height * k)), Image.LANCZOS)
    if TOPY is None:
        x0 = int(min(max(R.get('thx', 960) * k - W / 2, 0), big.width - W)); y0 = int((big.height - H) * R.get('thy', .5))
        im = big.crop((x0, y0, x0 + W, y0 + H)).filter(ImageFilter.UnsharpMask(3, 70, 2))
        im = ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.25)).enhance(1.12)
        sh = Image.new('L', (W, H), 0); d = ImageDraw.Draw(sh)
        for y in range(H):
            d.line([(0, y), (W, y)], fill=int(min(235, max(0, 1 - y / 420) ** 1.5 * 170 + max(0, (y - 1050) / 870) ** 1.3 * 230)))
        im.paste((8, 8, 12), (0, 0, W, H), sh)
        vg = Image.new('L', (W, H), 0); ImageDraw.Draw(vg).ellipse([-260, 120, W + 260, H + 220], fill=255); vg = vg.filter(ImageFilter.GaussianBlur(160))
        im = Image.composite(im, ImageEnhance.Brightness(im).enhance(.55), vg)
    acc = ACC.get(R.get('mood'), (255, 196, 40)); d = ImageDraw.Draw(im)
    l1, l2 = R['thumb'][0], R['thumb'][1]
    f1 = fit(d, l1, 940, 170); f2 = fit(d, l2, 860, 150)
    h1 = f1.getbbox(l1)[3]; h2 = f2.getbbox(l2)[3]
    y = 1660 - (h1 + 40 + h2 + 70)
    if TOPY is not None: y = TOPY + ((170 + 34) if R.get('name') else 0)
    if R.get('name'):  # optional name tag slab above the headline (gold, like the long thumbnail)
        nm = R['name']; fn = fit(d, nm, 760, 120); hn = fn.getbbox(nm)[3]; ng = (232, 180, 74)
        tag = Image.new('RGBA', (int(d.textlength(nm, font=fn) + 70), hn + 50), ng + (255,)); td = ImageDraw.Draw(tag)
        td.rectangle([0, 0, tag.width - 1, tag.height - 1], outline=(15, 12, 10), width=9); td.text((35, 16), nm, font=fn, fill=(15, 12, 10))
        tag = tag.rotate(2, expand=True, resample=Image.BICUBIC); y -= tag.height + 34
        tsh = Image.new('RGBA', tag.size, (0, 0, 0, 0)); tsh.paste((0, 0, 0, 150), (0, 0) + tag.size, tag)
        px = (W - tag.width) // 2; im.paste(tsh, (px + 12, y + 14), tsh); im.paste(tag, (px, y), tag); y += tag.height + 34
    d.text((W // 2 + 8, y + 10), l1, font=f1, fill=(0, 0, 0), anchor='mt', stroke_width=14, stroke_fill=(0, 0, 0))
    d.text((W // 2, y), l1, font=f1, fill=(255, 255, 255), anchor='mt', stroke_width=12, stroke_fill=(15, 12, 10)); y += h1 + 40
    tw = d.textlength(l2, font=f2); slab = Image.new('RGBA', (int(tw + 90), h2 + 70), acc + (255,)); sd = ImageDraw.Draw(slab)
    sd.rectangle([0, 0, slab.width - 1, slab.height - 1], outline=(15, 12, 10), width=10)
    sd.text((45, 26), l2, font=f2, fill=(15, 12, 10) if sum(acc) > 450 else (255, 255, 255)); slab = slab.rotate(-3, expand=True, resample=Image.BICUBIC)
    shadow = Image.new('RGBA', slab.size, (0, 0, 0, 0)); shadow.paste((0, 0, 0, 150), (0, 0) + slab.size, slab)
    px = (W - slab.width) // 2; im.paste(shadow, (px + 14, y + 16), shadow); im.paste(slab, (px, y), slab)
    im.paste(LS, (820, 262) if TOPY is None else (W - LS.width - 40, 50), LS)
    p = f'{OUT}/{R.get("pre", "ES1")}_Reel_{R["id"]:02d}_thumb.jpg'; im.save(p, quality=92); os.remove(tmp); print('THUMB', p)
