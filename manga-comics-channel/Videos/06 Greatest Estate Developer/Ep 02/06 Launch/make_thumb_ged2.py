# GED Ep2 thumbnail (in-house). Left: Lloyd evil grin (p021) gold, right: father Arcos (p107) cold violet. Quote bottom, callout, logo.
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance
W, H = 1280, 720; quote, cal, out = sys.argv[1], sys.argv[2], sys.argv[3]
P = '/tmp/claude-0/ged/pan2/'; LOGO = '/mnt/project-files/manga-comics-channel/00 Channel/Branding/01 Drafts v2/ska_logo_1024.png'
F = '/mnt/project-files/manga-comics-channel/Tools/mangacut/fonts/Anton.ttf'
def cover(im, w, h, cx=0.5, cy=0.5):
    s = max(w / im.width, h / im.height); im = im.resize((int(im.width * s), int(im.height * s)))
    x = int((im.width - w) * cx); y = int((im.height - h) * cy); return im.crop((x, y, x + w, y + h))
a = Image.open(P + 'p021.jpg').convert('RGB'); a = a.crop((0, int(a.height * 0.0), a.width, int(a.height * 0.62)))
a = cover(a, 760, H, 0.3, 0.3); a = ImageEnhance.Color(a).enhance(1.4); a = Image.blend(a, Image.new('RGB', a.size, (255, 170, 20)), 0.15)
b = Image.open(P + 'p107.jpg').convert('RGB'); b = b.crop((60, int(b.height * 0.14), b.width - 60, int(b.height * 0.42)))
b = cover(b, 760, H, 0.35, 0.25); b = ImageEnhance.Contrast(b).enhance(1.2); b = Image.blend(b, Image.new('RGB', b.size, (110, 40, 220)), 0.22)
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
f = ImageFont.truetype(F, 104); tw = d.textlength(quote, font=f); d.text(((W - tw) / 2 - 40, H - 168), quote, font=f, fill='white', stroke_width=12, stroke_fill='black')
lg = Image.open(LOGO).convert('RGBA'); lg.thumbnail((130, 130)); img.alpha_composite(lg, (W - 150, 18))
img.convert('RGB').save(out, quality=92); img.convert('RGB').resize((160, 90)).save(out.replace('.jpg', '_160.png')); print(out)
