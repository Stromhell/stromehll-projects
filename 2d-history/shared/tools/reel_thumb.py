# reel_thumb.py SPEC.json REELDIR OUTDIR PREFIX : vertical 1080x1920 reel covers from act frames.
# spec item: {id, frame, cx, cy, z, lines:[..], hi: index of accent line, acc: "#hex"}
import json, os, sys
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
SPEC, B, OUT, PRE = sys.argv[1:5]; os.makedirs(OUT, exist_ok=True)
G = '/home/user/stromehll-projects/2d-history'; FONT = f'{G}/shared/fonts/Anton.ttf'; W, H = 1080, 1920
LOGO = Image.open(f'{G}/shared/brand/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox()); LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS)
hexc = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
def fit(d, txt, maxw, size):
    while size > 60:
        f = ImageFont.truetype(FONT, size)
        if d.textlength(txt, font=f) <= maxw: return f
        size -= 4
    return ImageFont.truetype(FONT, size)
for s in json.load(open(SPEC)):
    fs = sorted(os.listdir(f'{B}/r{s["id"]}/frames')); src = Image.open(f'{B}/r{s["id"]}/frames/' + fs[min(s['frame'], len(fs) - 1)]).convert('RGB')
    k = H / src.height * s.get('z', 1.0); big = src.resize((int(src.width * k), int(src.height * k)), Image.LANCZOS)
    x0 = int(min(max(s['hx'] * k - W / 2 - s.get('dx', 0), 0), big.width - W)); y0 = int(min(max(s['hy'] * k - s.get('hyOut', 560), 0), big.height - H))
    im = big.crop((x0, y0, x0 + W, y0 + H)).filter(ImageFilter.UnsharpMask(3, 80, 2))
    im = ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.3)).enhance(1.12)
    # top + bottom darkening for text, vignette
    sh = Image.new('L', (W, H), 0); d = ImageDraw.Draw(sh)
    for y in range(H):
        t = max(0, 1 - y / 420) ** 1.5 * 190 + max(0, (y - 1050) / 870) ** 1.3 * 225
        d.line([(0, y), (W, y)], fill=int(min(235, t)))
    im.paste((8, 8, 12), (0, 0, W, H), sh)
    vg = Image.new('L', (W, H), 0); ImageDraw.Draw(vg).ellipse([-260, 120, W + 260, H + 220], fill=255); vg = vg.filter(ImageFilter.GaussianBlur(160))
    im = Image.composite(im, ImageEnhance.Brightness(im).enhance(.55), vg)
    acc = hexc(s.get('acc', '#ffd23f')); d = ImageDraw.Draw(im)
    hs = [ImageFont.truetype(FONT, 10)]; tot = 0
    for i, line in enumerate(s['lines']):
        f = fit(d, line, 900, 165 if i != s.get('hi', 1) else 150); tot += f.getbbox(line)[3] + (80 if i == s.get('hi', 1) else 30)
    y = 1650 - tot
    for i, line in enumerate(s['lines']):
        f = fit(d, line, 900, 165 if i != s.get('hi', 1) else 150); hgt = f.getbbox(line)[3]
        if i == s.get('hi', 1):
            tw = d.textlength(line, font=f); slab = Image.new('RGBA', (int(tw + 90), hgt + 70), acc + (255,)); sd = ImageDraw.Draw(slab)
            sd.rectangle([0, 0, slab.width - 1, slab.height - 1], outline=(15, 12, 10), width=10)
            sd.text((45, 26), line, font=f, fill=(15, 12, 10)); slab = slab.rotate(-3, expand=True, resample=Image.BICUBIC)
            shadow = Image.new('RGBA', slab.size, (0, 0, 0, 0)); shadow.paste((0, 0, 0, 150), (0, 0) + slab.size, slab)
            px = (W - slab.width) // 2; im.paste(shadow, (px + 14, y + 16), shadow); im.paste(slab, (px, y), slab); y += slab.height + 10
        else:
            d.text((W // 2 + 8, y + 10), line, font=f, fill=(0, 0, 0), anchor='mt', stroke_width=14, stroke_fill=(0, 0, 0))
            d.text((W // 2, y), line, font=f, fill=(255, 255, 255), anchor='mt', stroke_width=12, stroke_fill=(15, 12, 10)); y += hgt + 30
    im.paste(LS, (820, 262), LS)
    im.save(f'{OUT}/{PRE}_Reel_{s["id"]:02d}_thumb.jpg', quality=92); print('THUMB', s['id'])
