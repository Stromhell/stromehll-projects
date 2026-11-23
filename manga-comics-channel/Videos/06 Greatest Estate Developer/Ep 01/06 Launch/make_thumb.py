# GED Ep1 thumbnail (in-house; ElevenLabs credits ran out 22 Nov). Left: real panel p041 scream (red/violet), right: own Animagine builder art (gold/cyan). Diagonal versus split, quote bottom centre, mascot logo top-right.
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance
W, H = 1280, 720; quote = sys.argv[1]; out = sys.argv[2]
A = '/tmp/claude-0/ged/pan1/p041.jpg'; B = '/mnt/project-files/manga-comics-channel/Videos/06 Greatest Estate Developer/Ep 01/03 Frames/art/ged1_joke_builder.png'
LOGO = '/mnt/project-files/manga-comics-channel/00 Channel/Branding/01 Drafts v2/ska_logo_1024.png'
F = '/mnt/project-files/manga-comics-channel/Tools/mangacut/fonts/Anton.ttf'
def cover(im, w, h, cx=0.5, cy=0.5):
    s = max(w / im.width, h / im.height); im = im.resize((int(im.width * s), int(im.height * s)))
    x = int((im.width - w) * cx); y = int((im.height - h) * cy); return im.crop((x, y, x + w, y + h))
a = Image.open(A).convert('RGB'); a = a.crop((0, int(a.height * 0.36), a.width, int(a.height * 0.82)))  # screaming face
a = cover(a, 760, H, 0.35, 0.55); a = ImageEnhance.Color(a).enhance(1.35); a = ImageEnhance.Contrast(a).enhance(1.15)
b = Image.open(B).convert('RGB'); b = cover(b, 760, H, 0.15, 0.3); b = ImageEnhance.Color(b).enhance(1.3)
# colour grade halves
ta = Image.new('RGB', a.size, (200, 20, 90)); a = Image.blend(a, ta, 0.18)
tb = Image.new('RGB', b.size, (255, 190, 40)); b = Image.blend(b, tb, 0.12)
img = Image.new('RGB', (W, H)); img.paste(b, (W - 760, 0))
m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).polygon([(0, 0), (700, 0), (580, H), (0, H)], fill=255)
la = Image.new('RGB', (W, H)); la.paste(a, (0, 0)); img = Image.composite(la, img, m)
# glowing split line
g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(g)
d.line([(700, 0), (580, H)], fill=(60, 230, 255, 255), width=14)
glow = g.filter(ImageFilter.GaussianBlur(18)); img = Image.alpha_composite(img.convert('RGBA'), glow); img = Image.alpha_composite(img, g)
# edge vignette
v = Image.new('L', (W, H), 0); ImageDraw.Draw(v).rectangle([0, 0, W, H], outline=255, width=60); v = v.filter(ImageFilter.GaussianBlur(50))
img = Image.composite(Image.new('RGBA', (W, H), (0, 0, 0, 255)), img, v.point(lambda x: int(x * 0.55)))
d = ImageDraw.Draw(img)
# corner callout
f2 = ImageFont.truetype(F, 54); d.rounded_rectangle([28, 26, 440, 104], 14, fill=(255, 210, 40)); d.text((46, 30), 'DE VAGO A INGENIERO', font=f2, fill='black') if False else None
cal = 'VAGO vs INGENIERO'; f2 = ImageFont.truetype(F, 50); bw = d.textlength(cal, font=f2)
d.rounded_rectangle([26, 24, 26 + bw + 36, 100], 14, fill=(255, 210, 40)); d.text((44, 30), cal, font=f2, fill=(20, 20, 20))
# quote
f = ImageFont.truetype(F, 112); tw = d.textlength(quote, font=f); x = (W - tw) / 2 - 40; y = H - 175
d.text((x, y), quote, font=f, fill='white', stroke_width=12, stroke_fill='black')
# logo top-right
lg = Image.open(LOGO).convert('RGBA'); lg.thumbnail((130, 130)); img.alpha_composite(lg, (W - 150, 18))
img.convert('RGB').save(out, quality=92); img.convert('RGB').resize((160, 90)).save(out.replace('.jpg', '_160.png'))
print(out)
