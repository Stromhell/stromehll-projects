#!/usr/bin/env python3
"""Original placeholder manga-style art for the style test (no copyrighted panels).
Writes page1.png, page2.png (B&W pages 1400x2000), hero.png (colour, transparent), wm.png.
Usage: python3 make_demo_art.py OUTDIR"""
import sys, os, math, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__)); FONT = os.path.join(HERE, 'fonts', 'Anton.ttf')
R = random.Random(4)

def tone(d, box, step=9, r=2):
    x0, y0, x1, y1 = box
    for y in range(int(y0), int(y1), step):
        for x in range(int(x0) + (y // step % 2) * step // 2, int(x1), step):
            d.ellipse([x - r, y - r, x + r, y + r], fill=0)

def speed(d, box, cx, cy, n=90):
    x0, y0, x1, y1 = box
    for i in range(n):
        a = R.uniform(0, 2 * math.pi); r0 = R.uniform(140, 260); r1 = 2000
        d.line([cx + math.cos(a) * r0, cy + math.sin(a) * r0, cx + math.cos(a) * r1, cy + math.sin(a) * r1], fill=0, width=R.choice([1, 2, 3]))

def figure(d, cx, cy, s, fill=0, hair=True):
    # head + spiky hair + shoulders silhouette, simple and original
    d.ellipse([cx - 55 * s, cy - 70 * s, cx + 55 * s, cy + 60 * s], fill=255, outline=0, width=int(5 * s))
    if hair:
        pts = [(cx - 70 * s, cy - 10 * s)]
        for i in range(7):
            pts += [(cx - 60 * s + i * 20 * s, cy - (120 + R.uniform(0, 40)) * s), (cx - 50 * s + i * 20 * s, cy - 60 * s)]
        pts += [(cx + 75 * s, cy - 10 * s), (cx + 55 * s, cy - 60 * s), (cx - 55 * s, cy - 60 * s)]
        d.polygon(pts, fill=fill)
    d.line([cx - 25 * s, cy, cx - 8 * s, cy + 4 * s], fill=0, width=int(6 * s)); d.line([cx + 8 * s, cy + 4 * s, cx + 25 * s, cy], fill=0, width=int(6 * s))
    d.polygon([(cx - 150 * s, cy + 260 * s), (cx - 60 * s, cy + 80 * s), (cx + 60 * s, cy + 80 * s), (cx + 150 * s, cy + 260 * s)], fill=fill)

def bubble(d, xy, text, f):
    x, y = xy; lines = text.split('\n'); w = max(d.textlength(l, font=f) for l in lines) + 60; h = len(lines) * f.size * 1.15 + 50
    d.ellipse([x - w / 2, y - h / 2, x + w / 2, y + h / 2], fill=255, outline=0, width=4)
    for i, l in enumerate(lines):
        d.text((x - d.textlength(l, font=f) / 2, y - h / 2 + 25 + i * f.size * 1.15), l, font=f, fill=0)

def page(name, seed, layout):
    global R; R = random.Random(seed)
    W, H = 1400, 2000; im = Image.new('L', (W, H), 255); d = ImageDraw.Draw(im); f = ImageFont.truetype(FONT, 44)
    for kind, box, extra in layout:
        x0, y0, x1, y1 = box; cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        sub = Image.new('L', (int(x1 - x0), int(y1 - y0)), 255); sd = ImageDraw.Draw(sub); sx, sy = sub.size
        if kind == 'speed': speed(sd, (0, 0, sx, sy), sx / 2, sy / 2); figure(sd, sx / 2, sy / 2 - 40, 1.3)
        elif kind == 'tone': tone(sd, (0, 0, sx, sy * .55)); figure(sd, sx * .35, sy * .55, 1.0); figure(sd, sx * .75, sy * .6, .8, fill=60, hair=False)
        elif kind == 'close': figure(sd, sx / 2, sy * .45, 2.2)
        elif kind == 'sfx':
            tone(sd, (0, 0, sx, sy), 7, 2); g = ImageFont.truetype(FONT, 220)
            sd.text((40, sy / 2 - 140), extra, font=g, fill=255, stroke_width=10, stroke_fill=0)
        im.paste(sub, (int(x0), int(y0)))
        d.rectangle(box, outline=0, width=7)
        if kind != 'sfx' and extra: bubble(d, (x0 + (x1 - x0) * .72, y0 + 110), extra, f)
    im.convert('RGBA').save(os.path.join(out, name))

page('page1.png', 1, [('speed', (60, 60, 1340, 760), 'THIS POWER...\nISN\'T MINE!'),
                      ('tone', (60, 800, 690, 1400), 'WHO ARE\nYOU?'),
                      ('close', (730, 800, 1340, 1400), 'RUN.'),
                      ('sfx', (60, 1440, 1340, 1940), 'DOOOM')])
page('page2.png', 2, [('close', (60, 60, 690, 900), 'I REMEMBER\nEVERYTHING.'),
                      ('tone', (730, 60, 1340, 900), 'THAT\'S\nIMPOSSIBLE'),
                      ('speed', (60, 940, 1340, 1940), 'FINAL\nFORM!')])
# colour hero: glowing original silhouette
W, H = 1200, 1400; hero = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(hero)
for r in range(520, 0, -20):
    a = int(140 * (1 - r / 520)); d.ellipse([W / 2 - r, H / 2 - r, W / 2 + r, H / 2 + r], fill=(60, 160, 255, a))
hero = hero.filter(ImageFilter.GaussianBlur(25)); d = ImageDraw.Draw(hero)
R = random.Random(9)
pts = [(W / 2 - 120, 520)]
for i in range(9): pts += [(W / 2 - 110 + i * 28, 300 - R.uniform(0, 90)), (W / 2 - 100 + i * 28, 430)]
pts += [(W / 2 + 130, 520)]
d.polygon(pts, fill=(235, 240, 255, 255))
d.ellipse([W / 2 - 110, 400, W / 2 + 110, 660], fill=(250, 220, 190, 255), outline=(20, 20, 30, 255), width=6)
d.ellipse([W / 2 - 60, 500, W / 2 - 20, 530], fill=(40, 140, 255, 255)); d.ellipse([W / 2 + 20, 500, W / 2 + 60, 530], fill=(40, 140, 255, 255))
d.polygon([(W / 2 - 330, H), (W / 2 - 140, 690), (W / 2 + 140, 690), (W / 2 + 330, H)], fill=(40, 30, 70, 255), outline=(10, 10, 20, 255))
for i in range(40):
    a = R.uniform(0, 2 * math.pi); r0 = R.uniform(250, 400)
    d.line([W / 2 + math.cos(a) * r0, H / 2 + math.sin(a) * r0, W / 2 + math.cos(a) * (r0 + 120), H / 2 + math.sin(a) * (r0 + 120)], fill=(150, 220, 255, 200), width=4)
hero.save(os.path.join(out, 'hero.png'))
# placeholder watermark (name TBD)
wm = Image.new('RGBA', (400, 400), (0, 0, 0, 0)); d = ImageDraw.Draw(wm)
d.ellipse([10, 10, 390, 390], fill=(20, 200, 120, 255), outline=(0, 0, 0, 255), width=14)
g = ImageFont.truetype(FONT, 150); t = 'M&C'; d.text((200 - d.textlength(t, font=g) / 2, 95), t, font=g, fill=(255, 255, 255, 255), stroke_width=8, stroke_fill=(0, 0, 0, 255))
wm.save(os.path.join(out, 'wm.png'))
print('ok')
