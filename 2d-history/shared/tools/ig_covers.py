# ig_covers.py SPEC.json OUTDIR PREFIX : 1080x1920 IG part covers (tag slab, 2-line headline, 16:9 frame band, subtitle, PART n OF m)
# spec item: {n, of, frame: path to 16:9 jpg, tag, l1, l2, sub}
import json, sys, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
SPEC, OUT, PRE = sys.argv[1:4]; os.makedirs(OUT, exist_ok=True)
G = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); FONT = f'{G}/fonts/Anton.ttf'; W, H = 1080, 1920
LOGO = Image.open(f'{G}/brand/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox()); LS = LOGO.resize((110, 110 * LOGO.height // LOGO.width), Image.LANCZOS)
def fit(d, t, mw, s):
    while d.textlength(t, font=ImageFont.truetype(FONT, s)) > mw: s -= 4
    return ImageFont.truetype(FONT, s)
def slab(im, d, t, cy, s, bg, mw=620):
    f = fit(d, t, mw, s); tw = d.textlength(t, font=f); bb = f.getbbox(t); h = bb[3] + 40; x0 = int(W / 2 - tw / 2 - 30)
    d.rectangle([x0 + 10, cy - h // 2 + 10, x0 + tw + 70, cy + h // 2 + 10], fill=(0, 0, 0)); d.rectangle([x0, cy - h // 2, x0 + tw + 60, cy + h // 2], fill=bg)
    d.text((W / 2, cy), t, font=f, fill=(15, 12, 10), anchor='mm')
def big(d, t, cy, s, col):
    f = fit(d, t, 900, s); d.text((W / 2 + 8, cy + 8), t, font=f, fill=(0, 0, 0), anchor='mm', stroke_width=12, stroke_fill=(0, 0, 0)); d.text((W / 2, cy), t, font=f, fill=col, anchor='mm', stroke_width=10, stroke_fill=(15, 12, 10))
for s in json.load(open(SPEC)):
    fr = Image.open(s['frame']).convert('RGB'); bg = fr.resize((W * 2, H)).filter(ImageFilter.GaussianBlur(40)).crop((W // 2, 0, W // 2 + W, H)); im = ImageEnhance.Brightness(bg).enhance(.35)
    band = fr.resize((W, 608), Image.LANCZOS); im.paste(band, (0, 760)); d = ImageDraw.Draw(im)
    d.rectangle([0, 752, W, 760], fill=(255, 214, 10)); d.rectangle([0, 1368, W, 1376], fill=(255, 214, 10))
    slab(im, d, s['tag'], 360, 110, (255, 214, 10)); big(d, s['l1'], 530, 120, (255, 255, 255)); big(d, s['l2'], 650, 120, tuple(int(s.get('acc', '#ffd60a')[i:i + 2], 16) for i in (1, 3, 5)))
    big(d, s['sub'], 1460, 96, (255, 255, 255)); slab(im, d, s.get("badge") or f"PART {s['n']} OF {s['of']}", 1620, 120, (255, 128, 26))
    im.paste(LS, (940, 300), LS); im.save(f"{OUT}/" + (s.get("name") or f"{PRE}_Part_{s['n']:02d}_thumb.jpg"), quality=92); print('COVER', s['n'])
