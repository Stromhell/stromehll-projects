#!/usr/bin/env python3
"""Add the headline to a long-video thumbnail. usage: long_thumb.py ART OUT.jpg "LINE 1" "SLAB LINE" "#accent" [maxw]"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
ART, OUT, L1, L2, ACC = sys.argv[1:6]; MAXW = int(sys.argv[6]) if len(sys.argv) > 6 else 560
FONT = __file__.rsplit('/', 2)[0] + '/fonts/Anton.ttf'; W, H = 1280, 720
im = Image.open(ART).convert('RGB'); k = max(W / im.width, H / im.height); im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
im = im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H))
sh = Image.new('L', (W, H), 0); d = ImageDraw.Draw(sh)
for x in range(W): d.line([(x, 0), (x, H)], fill=int(max(0, 1 - x / 700) ** 1.4 * 150))
im.paste((6, 8, 14), (0, 0, W, H), sh)
acc = tuple(int(ACC[i:i + 2], 16) for i in (1, 3, 5)); d = ImageDraw.Draw(im)
def fit(t, s):
    while d.textlength(t, font=ImageFont.truetype(FONT, s)) > MAXW: s -= 4
    return ImageFont.truetype(FONT, s)
f1 = fit(L1, 170); f2 = fit(L2, 130); h1 = f1.getbbox(L1)[3]; h2 = f2.getbbox(L2)[3]
y = (H - (h1 + 30 + h2 + 60)) // 2 - 10; x = 60
d.text((x + 7, y + 9), L1, font=f1, fill=(0, 0, 0), stroke_width=12, stroke_fill=(0, 0, 0))
d.text((x, y), L1, font=f1, fill=(255, 255, 255), stroke_width=10, stroke_fill=(12, 10, 10)); y += h1 + 30
tw = d.textlength(L2, font=f2); slab = Image.new('RGBA', (int(tw + 70), h2 + 56), acc + (255,)); sd = ImageDraw.Draw(slab)
sd.rectangle([0, 0, slab.width - 1, slab.height - 1], outline=(12, 10, 10), width=8)
sd.text((35, 20), L2, font=f2, fill=(12, 10, 10) if sum(acc) > 450 else (255, 255, 255)); slab = slab.rotate(3, expand=True, resample=Image.BICUBIC)
shd = Image.new('RGBA', slab.size, (0, 0, 0, 0)); shd.paste((0, 0, 0, 150), (0, 0) + slab.size, slab)
im.paste(shd, (x + 10, y + 12), shd); im.paste(slab, (x - 6, y), slab)
im.save(OUT, quality=93); print(OUT)
