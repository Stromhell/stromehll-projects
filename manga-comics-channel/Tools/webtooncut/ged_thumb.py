# GED episode thumbnail (in-house, generalised from Ep2 make_thumb_ged2.py, 23 Nov 2026).
# Usage: python3 ged_thumb.py EP LEFT_PANEL ly0 ly1 RIGHT_PANEL ry0 ry1 "QUOTE" "CALLOUT" OUT.jpg
# Left = Lloyd (gold tint), right = opponent (cool tint); y0/y1 = vertical crop fractions of the tall webtoon panel.
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance
ep, lp, ly0, ly1, rp, ry0, ry1, quote, cal, out = sys.argv[1:11]
W, H = 1280, 720; P = f'/tmp/claude-0/ged/pan{ep}/'; LOGO = '/mnt/project-files/manga-comics-channel/00 Channel/Branding/01 Drafts v2/ska_logo_1024.png'
F = '/mnt/project-files/manga-comics-channel/Tools/mangacut/fonts/Anton.ttf'
def cover(im, w, h, cx=0.5, cy=0.4):
    s = max(w / im.width, h / im.height); im = im.resize((int(im.width * s), int(im.height * s)))
    x = int((im.width - w) * cx); y = int((im.height - h) * cy); return im.crop((x, y, x + w, y + h))
def part(p, y0, y1):
    im = Image.open(P + p + '.jpg').convert('RGB'); return im.crop((0, int(im.height * float(y0)), im.width, int(im.height * float(y1))))
a = cover(part(lp, ly0, ly1), 760, H, 0.35); a = ImageEnhance.Color(a).enhance(1.4); a = Image.blend(a, Image.new('RGB', a.size, (255, 170, 20)), 0.15)
b = cover(part(rp, ry0, ry1), 760, H, 0.5); b = ImageEnhance.Contrast(b).enhance(1.2); b = Image.blend(b, Image.new('RGB', b.size, (40, 120, 230)), 0.2)
img = Image.new('RGB', (W, H)); img.paste(b, (W - 760, 0))
m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).polygon([(0, 0), (700, 0), (580, H), (0, H)], fill=255)
la = Image.new('RGB', (W, H)); la.paste(a, (0, 0)); img = Image.composite(la, img, m)
g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(g).line([(700, 0), (580, H)], fill=(255, 220, 60, 255), width=14)
img = Image.alpha_composite(img.convert('RGBA'), g.filter(ImageFilter.GaussianBlur(18))); img = Image.alpha_composite(img, g)
v = Image.new('L', (W, H), 0); ImageDraw.Draw(v).rectangle([0, 0, W, H], outline=255, width=60); v = v.filter(ImageFilter.GaussianBlur(50))
img = Image.composite(Image.new('RGBA', (W, H), (0, 0, 0, 255)), img, v.point(lambda x: int(x * 0.55)))
d = ImageDraw.Draw(img)
f2 = ImageFont.truetype(F, 50); bw = d.textlength(cal, font=f2)
d.rounded_rectangle([26, 24, 26 + bw + 36, 100], 14, fill=(255, 210, 40)); d.text((44, 30), cal, font=f2, fill=(20, 20, 20))
fs = 104
while True:
    f = ImageFont.truetype(F, fs); tw = d.textlength(quote, font=f)
    if tw < W - 120 or fs < 60: break
    fs -= 6
d.text(((W - tw) / 2, H - 168), quote, font=f, fill='white', stroke_width=12, stroke_fill='black')
lg = Image.open(LOGO).convert('RGBA'); lg.thumbnail((130, 130)); img.alpha_composite(lg, (W - 150, 18))
img.convert('RGB').save(out, quality=92); img.convert('RGB').resize((160, 90)).save(out.replace('.jpg', '_160.png')); print(out)
