# PR long thumbnail: ElevenLabs art (gemini-3.1-flash-lite, no text) + text layer in code. usage: python3 mk_thumb.py ART OUT
import sys
from PIL import Image, ImageDraw, ImageFont
art, out = sys.argv[1:3]; W, H = 1280, 720
src = Image.open(art).convert('RGB'); import numpy as np
rows = np.asarray(src.convert('L')).mean(1); top = max([i for i in range(src.height // 3) if rows[i] > 240], default=-1) + 4
src = src.crop((0, top, src.width, src.height)); src = src.resize((W, int(src.height * W / src.width)))
im = Image.new('RGB', (W, H), (10, 8, 16)); y0 = H - src.height; im.paste(src, (0, y0))
g = Image.new('L', (W, 60)); dg = ImageDraw.Draw(g)
for y in range(60): dg.line([(0, y), (W, y)], fill=int(255 * (1 - y / 60)))
im.paste(Image.new('RGB', (W, 60), (10, 8, 16)), (0, y0), g)
F = '/home/user/repo/2d-history/shared/fonts/Anton.ttf'; d = ImageDraw.Draw(im)
def text(t, xy, px, fill, stroke=9):
    f = ImageFont.truetype(F, px); d.text(xy, t, font=f, fill=fill, stroke_width=stroke, stroke_fill=(18, 12, 8)); return d.textlength(t, font=f)
tw = text('PRIME IS ', (24, 4), 132, (255, 255, 255)); text('FINISHED?', (24 + tw, 4), 132, (232, 40, 46), 11)
f = ImageFont.truetype(F, 50); tw = d.textlength('LOGAN PAUL & KSI', font=f)
d.polygon([(24, 620), (24 + tw + 44, 612), (24 + tw + 44, 690), (24, 698)], fill=(232, 180, 74)); d.text((46, 620), 'LOGAN PAUL & KSI', font=f, fill=(18, 12, 8))
logo = Image.open('/home/user/repo/2d-history/shared/brand/stormi-watermark.png').convert('RGBA').resize((84, 84)); im.paste(logo, (W - 104, H - 104), logo)
im.save(out, quality=92); print(out)
