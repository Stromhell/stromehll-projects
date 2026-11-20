#!/usr/bin/env python3
"""mangacut v1: renders a manga/comic explainer video in the channel style from a shot list.

Style (see 00 Channel/Style/STYLE-BREAKDOWN-v1.md): B&W page on crumpled paper or black, slow
Ken Burns on every still, panel pop-outs with black border + drop shadow, colour hero art on a
starfield, stamp overlays (our own memes), watermark bottom-right, hard cuts every 2-4 s, no subs.

Usage: python3 mangacut.py shots.json out.mp4 [--fps 30] [--size 1920x1080] [--preview]
shots.json = {"assets": "dir", "watermark": "wm.png", "shots": [ ... ]}
Shot keys:
  dur      seconds
  bg       paper | black | stars | color:#rrggbb
  img      main image (page/panel/hero art), path relative to assets
  crop     [x,y,w,h] normalised crop of img (default whole image)
  move     in | out | left | right | up | down | none   (Ken Burns, default in)
  amount   zoom amount for in/out (default 0.08)
  fit      height | width | cover (default height)
  pop      {"img":..., "crop":[...], "at":0.4, "scale":0.55, "pos":[cx,cy]}  panel pop-out
  stamp    {"text":"WASTED", "color":"#e0262b", "at":0.2}  big overlay text with shake
  sting    {"title":"CHANNEL", "sub":"tagline", "color":"#d81f26"}  logo sting card
  punch    true -> quick 6% zoom punch at shot start
Audio is mixed separately by mix.py.
"""
import json, sys, os, math, subprocess, argparse, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, 'fonts', 'Anton.ttf')
if not os.path.exists(FONT):
    FONT = '/mnt/project-files/2d-dynamic/shared/fonts/Anton.ttf'

def ease(x):
    return x * x * (3 - 2 * x)

def paper_bg(W, H, seed=3):
    rng = np.random.default_rng(seed)
    base = np.full((H, W), 214.0)
    # crumple: random soft creases
    yy, xx = np.mgrid[0:H, 0:W]
    for _ in range(26):
        a = rng.uniform(0, math.pi); c = rng.uniform(-W, W)
        d = (np.cos(a) * xx + np.sin(a) * yy - c - W / 2)
        w = rng.uniform(6, 40)
        base += rng.uniform(-14, 14) * np.exp(-(d / w) ** 2) * np.sign(d + 1e-3) * 0.6
    small = rng.normal(0, 1, (H // 8, W // 8))
    small = np.array(Image.fromarray(((small + 3) * 40).clip(0, 255).astype('uint8')).resize((W, H), Image.BICUBIC), float) - 120
    base += small * 0.12 + rng.normal(0, 3.5, (H, W))
    # vignette
    r = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    base *= 1 - 0.18 * r ** 2
    g = base.clip(0, 255).astype('uint8')
    return Image.fromarray(g).convert('RGB').filter(ImageFilter.GaussianBlur(0.6))

def stars_bg(W, H, seed=5):
    rng = np.random.default_rng(seed)
    img = Image.new('RGB', (W, H), (10, 8, 26))
    neb = Image.new('RGB', (W, H), (0, 0, 0)); nd = ImageDraw.Draw(neb)
    for _ in range(9):
        x, y, r = rng.uniform(0, W), rng.uniform(0, H), rng.uniform(W * .15, W * .35)
        c = [(70, 40, 140), (30, 70, 160), (120, 40, 120)][int(rng.integers(0, 3))]
        nd.ellipse([x - r, y - r, x + r, y + r], fill=c)
    img = Image.blend(img, neb.filter(ImageFilter.GaussianBlur(W // 12)), 0.55); d = ImageDraw.Draw(img)
    for _ in range(700):
        x, y = rng.uniform(0, W), rng.uniform(0, H); r = rng.choice([0.6, 0.8, 1.2, 2.0], p=[.5, .3, .15, .05])
        b = int(rng.uniform(120, 255)); d.ellipse([x - r, y - r, x + r, y + r], fill=(b, b, min(255, b + 15)))
    return img

def load(path, cache={}):
    if path not in cache:
        cache[path] = Image.open(path).convert('RGBA')
    return cache[path]

def cropn(im, c):
    if not c: return im
    w, h = im.size; x, y, cw, ch = c
    return im.crop((int(x * w), int(y * h), int((x + cw) * w), int((y + ch) * h)))

def kb_frame(src, W, H, p, move, amount, fit, punch):
    """Return RGBA canvas WxH with src placed and moved (Ken Burns) at progress p."""
    sw, sh = src.size
    if fit == 'width': s0 = W / sw
    elif fit == 'cover': s0 = max(W / sw, H / sh)
    else: s0 = H / sh
    e = ease(p)
    z = 1.0; dx = dy = 0.0
    if move == 'in': z = 1 + amount * e
    elif move == 'out': z = 1 + amount * (1 - e)
    elif move in ('left', 'right', 'up', 'down'):
        z = 1 + amount
        span = (sw * s0 * z - W) if move in ('left', 'right') else (sh * s0 * z - H)
        span = max(span, W * 0.06 if move in ('left', 'right') else H * 0.06)
        off = (e - 0.5) * span
        if move == 'left': dx = off
        elif move == 'right': dx = -off
        elif move == 'up': dy = off
        else: dy = -off
    if punch: z *= 1 + 0.06 * max(0, 1 - p * 8)
    s = s0 * z
    nw, nh = max(1, int(sw * s)), max(1, int(sh * s))
    im = src.resize((nw, nh), Image.BILINEAR)
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    canvas.paste(im, (int((W - nw) / 2 + dx), int((H - nh) / 2 + dy)), im)
    return canvas

def popout(img, W, H, p, cfg):
    at = cfg.get('at', 0.35)
    if p < at: return None
    q = min(1, (p - at) / 0.12)  # 0.12 of shot to pop in
    k = 1 - (1 - q) ** 3
    sc = cfg.get('scale', 0.55) * (0.85 + 0.15 * k) * (1 + 0.03 * (p - at))
    bw = 6
    w0, h0 = img.size
    s = min(W * sc / w0, H * sc * 1.35 / h0)
    pw, ph = int(w0 * s), int(h0 * s)
    pan = img.resize((pw, ph), Image.BILINEAR)
    framed = Image.new('RGBA', (pw + 2 * bw, ph + 2 * bw), (0, 0, 0, 255)); framed.alpha_composite(pan, (bw, bw))
    sh = Image.new('RGBA', (framed.width + 60, framed.height + 60), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rectangle([30, 30, 30 + framed.width, 30 + framed.height], fill=(0, 0, 0, 150))
    sh = sh.filter(ImageFilter.GaussianBlur(14))
    cx, cy = cfg.get('pos', [0.5, 0.5])
    out = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    x = int(cx * W - framed.width / 2); y = int(cy * H - framed.height / 2)
    out.paste(sh, (x - 18, y - 12), sh)
    out.paste(framed, (x, y), framed)
    if k < 1:
        a = np.array(out); a[..., 3] = (a[..., 3] * k).astype('uint8'); out = Image.fromarray(a)
    return out

def stamp(W, H, p, cfg):
    at = cfg.get('at', 0.15)
    if p < at: return None
    q = min(1, (p - at) / 0.06)
    text = cfg['text']; col = cfg.get('color', '#e0262b')
    f = ImageFont.truetype(FONT, int(H * 0.2))
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
    # red wash + splatter
    if cfg.get('wash', True):
        wash = Image.new('RGBA', (W, H), (200, 20, 30, int(90 * q))); layer.alpha_composite(wash)
        rng = random.Random(len(text))
        for _ in range(40):
            x, y, r = rng.uniform(0, W), rng.uniform(0, H), rng.uniform(4, 40)
            d.ellipse([x - r, y - r, x + r, y + r], fill=(170, 10, 20, int(200 * q)))
    tw = d.textlength(text, font=f)
    sc = 1.6 - 0.6 * min(1, q)
    jit = (random.uniform(-6, 6), random.uniform(-4, 4)) if q < 1 or random.random() < .3 else (0, 0)
    t = Image.new('RGBA', (int(tw + 40), int(H * 0.28)), (0, 0, 0, 0)); td = ImageDraw.Draw(t)
    td.text((20, 0), text, font=f, fill=col, stroke_width=8, stroke_fill=(20, 0, 0))
    t = t.resize((int(t.width * sc), int(t.height * sc)), Image.BILINEAR)
    layer.alpha_composite(t, (max(0, int(W / 2 - t.width / 2 + jit[0])), max(0, int(H / 2 - t.height / 2 + jit[1]))))
    return layer

def sting(W, H, p, cfg):
    col = cfg.get('color', '#d81f26')
    img = Image.new('RGBA', (W, H), col)
    d = ImageDraw.Draw(img)
    # dark silhouette swirl
    rng = random.Random(9)
    for i in range(14):
        r = 200 + i * 60 + 40 * math.sin(p * 6 + i)
        a = p * 1.4 + i * 0.45
        x, y = W / 2 + math.cos(a) * r * .7, H / 2 + math.sin(a) * r * .4
        d.ellipse([x - 160, y - 160, x + 160, y + 160], fill=(0, 0, 0, 16))
    img = img.filter(ImageFilter.GaussianBlur(30))
    d = ImageDraw.Draw(img)
    k = ease(min(1, p / 0.25))
    f1 = ImageFont.truetype(FONT, int(H * 0.26 * (0.7 + 0.3 * k)))
    f2 = ImageFont.truetype(FONT, int(H * 0.09))
    t1 = cfg.get('title', 'LOGO'); t2 = cfg.get('sub', '')
    w1 = d.textlength(t1, font=f1)
    d.text((W / 2 - w1 / 2, H * 0.22), t1, font=f1, fill=(255, 255, 255, int(255 * k)), stroke_width=10, stroke_fill=(0, 0, 0))
    if t2 and p > 0.2:
        k2 = ease(min(1, (p - 0.2) / 0.2)); w2 = d.textlength(t2, font=f2)
        d.text((W / 2 - w2 / 2, H * 0.62), t2, font=f2, fill=(255, 255, 255, int(255 * k2)), stroke_width=7, stroke_fill=(0, 0, 0))
    return img

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('shots'); ap.add_argument('out')
    ap.add_argument('--fps', type=int, default=30); ap.add_argument('--size', default='1920x1080')
    ap.add_argument('--preview', action='store_true', help='960x540 fast preview')
    a = ap.parse_args()
    W, H = map(int, a.size.split('x'))
    if a.preview: W, H = 960, 540
    spec = json.load(open(a.shots)); base = os.path.join(os.path.dirname(os.path.abspath(a.shots)), spec.get('assets', '.'))
    P = lambda x: x if os.path.isabs(x) else os.path.join(base, x)
    papers = [paper_bg(W, H, sd).convert('RGBA') for sd in (3, 11, 17)]
    bgs = {'paper': papers[0], 'black': Image.new('RGBA', (W, H), (0, 0, 0, 255)), 'stars': stars_bg(W, H).convert('RGBA')}
    wm = None
    if spec.get('watermark') and os.path.exists(P(spec['watermark'])):
        wm = load(P(spec['watermark'])); s = (H * 0.07) / wm.height
        wm = wm.resize((int(wm.width * s), int(wm.height * s))); a_ = np.array(wm); a_[..., 3] = (a_[..., 3] * 0.8).astype('uint8'); wm = Image.fromarray(a_)
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(a.fps), '-i', '-',
                           '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', str(a.fps), a.out], stdin=subprocess.PIPE)
    tl = []; t0 = 0.0
    for sh in spec['shots']:
        n = max(1, round(sh['dur'] * a.fps))
        bgk = sh.get('bg', 'paper')
        bg = papers[len(tl) % 3] if bgk == 'paper' else (bgs.get(bgk) or Image.new('RGBA', (W, H), bgk.split(':', 1)[1]))
        src = cropn(load(P(sh['img'])), sh.get('crop')) if sh.get('img') else None
        pop = cropn(load(P(sh['pop']['img'])), sh['pop'].get('crop')) if sh.get('pop') else None
        for i in range(n):
            p = i / max(1, n - 1)
            if sh.get('sting'):
                fr = sting(W, H, p, sh['sting'])
            else:
                fr = bg.copy()
                if src is not None:
                    fr.alpha_composite(kb_frame(src, W, H, p, sh.get('move', 'in'), sh.get('amount', 0.08), sh.get('fit', 'height'), sh.get('punch')))
                if pop is not None:
                    po = popout(pop, W, H, p, sh['pop'])
                    if po is not None: fr.alpha_composite(po)
                if sh.get('stamp'):
                    st = stamp(W, H, p, sh['stamp'])
                    if st is not None: fr.alpha_composite(st)
            if wm is not None and not sh.get('sting'):
                fr.alpha_composite(wm, (W - wm.width - int(W * 0.02), H - wm.height - int(H * 0.03)))
            ff.stdin.write(fr.convert('RGB').tobytes())
        tl.append({'start': round(t0, 3), 'dur': sh['dur'], 'sfx': sh.get('sfx')}); t0 += n / a.fps
    ff.stdin.close(); ff.wait()
    json.dump(tl, open(os.path.splitext(a.out)[0] + '.timeline.json', 'w'), indent=1)
    print('rendered', a.out, round(t0, 2), 's')

if __name__ == '__main__':
    main()
