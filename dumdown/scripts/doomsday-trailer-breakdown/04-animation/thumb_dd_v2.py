# Doomsday trailer thumbs D/E/F from Pushpam's 3 concepts (24 Nov). Engine stills in /tmp/ddw/shotrev/a90_*.
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
exec(open('/tmp/eng/thumb_dd.py').read().split("OUT = ")[0])
OUT = '/mnt/project-files/dumdown/scripts/doomsday-trailer-breakdown/06-launch/'; S = '/tmp/ddw/shotrev/a90_s%02d_1.jpg'
def crop(i, box, size=(1280, 720)): im = Image.open(S % i).convert('RGB').crop(box).resize(size, Image.LANCZOS); return ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.25)).enhance(1.1)
def glow(im, x, y, r, col, a=200):
    L = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(L); d.ellipse((x - r, y - r, x + r, y + r), fill=col + (a,)); L = L.filter(ImageFilter.GaussianBlur(r * .6)); im.paste(L, (0, 0), L)
# D: Old Cap grips the hammer, shield in the open trunk
im = crop(0, (330, 150, 1610, 870)); im = band(im, 0, 430)
word(im, 'OLD CAP', 0, 40, 96, (255, 210, 61), left=10); word(im, 'IS WORTHY?!', 0, 160, 70, (255, 255, 255), left=10)
word(im, 'DOOMSDAY TRAILER', 0, 250, 38, INK, box=(255, 210, 61), rot=-2, left=14)
im.save(OUT + 'thumb_D_hammer_trunk_v1.jpg', quality=95)
# E: split, farmhouse Cap (left) vs Doom through the green rift (right)
L = crop(1, (640, 140, 1360, 950), (640, 720)); R = crop(2, (600, 120, 1320, 930), (640, 720))
im = Image.new('RGB', (1280, 720)); im.paste(L, (0, 0)); im.paste(R, (640, 0))
d = ImageDraw.Draw(im); d.polygon([(620, 0), (668, 0), (660, 720), (612, 720)], fill=(255, 210, 61)); d.line([(644, 0), (636, 720)], fill=INK, width=6)
word(im, 'RETIRED', 320, 600, 74, (255, 255, 255)); word(im, 'DOOM', 960, 590, 92, (122, 255, 154))
word(im, 'VS', 640, 300, 64, INK, box=(255, 210, 61))
im.save(OUT + 'thumb_E_farm_vs_doom_v1.jpg', quality=95)
# F: Doom looming over Old Cap (shield + hammer raised)
bg = crop(3, (498, 140, 1920, 940))
dm = Image.open(S % 4).convert('RGB'); a = np.asarray(dm, float); key = np.abs(a - [255, 0, 255]).sum(2)
m = Image.fromarray(((key > 140) * 255).astype(np.uint8)); m = m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.5))
bx = (480, 140, 1440, 940); dmc = dm.crop(bx).resize((960, 800)); mc = m.crop(bx).resize((960, 800))
dmc = ImageEnhance.Brightness(Image.blend(dmc, Image.new('RGB', dmc.size, (20, 60, 30)), .35)).enhance(.85)
fade = Image.linear_gradient('L').resize((960, 800)); fade = Image.eval(fade, lambda v: 255 if v < 110 else max(0, 255 - (v - 110) * 2.4))
mc = Image.fromarray((np.asarray(mc, float) * np.asarray(fade, float) / 255 * .92).astype(np.uint8))
px, py = 520, -110; bg.paste(dmc, (px, py), mc)
for ex in (920, 1000): glow(bg, px + int((ex - 480) * 960 / 960), py + int((366 - 140)), 26, (90, 255, 120), 255); glow(bg, px + int((ex - 480)), py + 226, 9, (220, 255, 220), 255)
bg = band(bg, 700, 1280)
word(bg, 'DOOM', 0, 450, 110, (122, 255, 154), left=880); word(bg, 'vs OLD CAP', 0, 590, 64, (255, 255, 255), left=860)
bg.save(OUT + 'thumb_F_doom_looms_v1.jpg', quality=95)
print('ok')
