# Preview every shot's crop as a numbered contact sheet (fast check before rendering). Usage: python3 crop_sheet.py shots.json out.jpg
import json, sys
from PIL import Image, ImageDraw
d = json.load(open(sys.argv[1])); sh = [s for s in d['shots'] if 'img' in s]
th = []
for i, s in enumerate(sh):
    im = Image.open(s['img']).convert('RGB'); c = s.get('crop')
    if c: W, H = im.size; im = im.crop((int(c[0] * W), int(c[1] * H), int((c[0] + c[2]) * W), int((c[1] + c[3]) * H)))
    im.thumbnail((200, 200)); t = Image.new('RGB', (210, 225), 'white'); t.paste(im, (5, 20)); ImageDraw.Draw(t).text((4, 3), f"{i} {s['img'].split('/')[-1]}", fill='red'); th.append(t)
cols = 9; S = Image.new('RGB', (cols * 210, ((len(th) + cols - 1) // cols) * 225), 'grey')
for i, t in enumerate(th): S.paste(t, ((i % cols) * 210, (i // cols) * 225))
S.save(sys.argv[2], quality=80); print(len(th))
