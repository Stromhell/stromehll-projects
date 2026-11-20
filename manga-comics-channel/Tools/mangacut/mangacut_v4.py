#!/usr/bin/env python3
"""v4 (Pushpam 20 Nov): everything moves. 2.5D depth parallax inside every panel (Depth Anything V2 small),
foreground "breathing" sway, VO-loudness zoom pulses (shot key env = per-frame 0..1 list), impact shake + flash on punch shots.
Depth maps cached in $MC_DEPTH_CACHE (default /tmp/claude-0/mc_depth).
mangacut v2 (20 Nov: no intro sting, MOVING backgrounds, GIF reactions):
mangacut v1 notes: renders a manga/comic explainer video in the channel style from a shot list.

Style (see 00 Channel/Style/STYLE-BREAKDOWN-v1.md): B&W page on crumpled paper or black, slow
Ken Burns on every still, panel pop-outs with black border + drop shadow, colour hero art on a
starfield, stamp overlays (our own memes), watermark top-right inside the YouTube safe zone (v3, Pushpam 20 Nov), hard cuts every 2-4 s, no subs.

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
  bg (v2 moving): paper (drifting crumpled paper + dust), speed[:#hex] (flickering manga concentration lines),
           aura:#hex (energy gradient + rising sparks), halftone:#hex (scrolling dots), stars (twinkling, drifting)
  gif      {"file":"gifs/x.mp4", "pos":"br|bl|tr|tl|full|center", "scale":0.36, "at":0.0, "tilt":-4}
           looping reaction GIF as a white-bordered sticker (or full frame). Fetch with tenor_fetch.py.
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


import hashlib, cv2
_DP = [None]
DEPTH_CACHE = os.environ.get('MC_DEPTH_CACHE', '/tmp/claude-0/mc_depth')
def depth_of(src, key):
    os.makedirs(DEPTH_CACHE, exist_ok=True)
    f = os.path.join(DEPTH_CACHE, hashlib.md5(key.encode()).hexdigest() + '.npy')
    if os.path.exists(f): return np.load(f)
    if _DP[0] is None:
        os.environ.setdefault('TQDM_DISABLE', '1')
        from transformers import pipeline
        _DP[0] = pipeline('depth-estimation', model='depth-anything/Depth-Anything-V2-Small-hf', device='cpu')
    rgb = src.convert('RGB'); sc = min(1.0, 768 / max(rgb.size)); small = rgb.resize((max(8, int(rgb.width * sc)), max(8, int(rgb.height * sc))))
    d = _DP[0](small)['predicted_depth'].squeeze().numpy().astype('float32')
    d = cv2.resize(d, small.size); lo, hi = np.percentile(d, 2), np.percentile(d, 98); d = np.clip((d - lo) / max(hi - lo, 1e-6), 0, 1)
    d = cv2.GaussianBlur(d, (0, 0), 3)
    np.save(f, d.astype('float16')); return d

def motion_src(src, depth, t, p, move, seed=0):
    """Warp src (RGBA PIL) with depth parallax + foreground breathing. Returns RGBA PIL same size."""
    a = np.array(src); h, w = a.shape[:2]
    d = cv2.resize(depth.astype('float32'), (w, h))
    X, Y = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    dirx, diry = {'left': (1, 0), 'right': (-1, 0), 'up': (0, 1), 'down': (0, -1), 'out': (-0.7, 0.4)}.get(move, (0.8, -0.35) if seed % 2 else (-0.8, -0.35))
    amp = 0.035 * max(w, h) * (p - 0.5)
    par = (d - 0.5)
    m = np.clip((d - 0.55) * 3, 0, 1)
    ys, xs = np.nonzero(m > 0.5)
    cx, cy = (xs.mean(), ys.mean()) if len(xs) > 50 else (w / 2, h / 2)
    b = np.float32(0.012 * math.sin(2 * math.pi * t / 1.7 + seed))
    mx = X - par * amp * dirx - m * (X - cx) * b
    my = Y - par * amp * diry - m * (Y - cy) * b * 1.4
    out = cv2.remap(a, mx.astype(np.float32), my.astype(np.float32), cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    return Image.fromarray(out)

def kb_frame(src, W, H, p, move, amount, fit, punch, margin=1.0, pulse=0.0, shake=(0, 0)):
    """Return RGBA canvas WxH with src placed and moved (Ken Burns) at progress p."""
    sw, sh = src.size
    if fit == 'width': s0 = W / sw
    elif fit == 'cover': s0 = max(W / sw, H / sh)
    elif fit == 'auto': s0 = min(W / sw, H / sh)
    else: s0 = H / sh
    s0 *= margin
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
    z *= 1 + 0.025 * pulse
    dx += shake[0]; dy += shake[1]
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
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
    if cfg.get('wash', True):
        layer.alpha_composite(Image.new('RGBA', (W, H), (200, 20, 30, int(90 * q))))
    size = int(H * 0.17)
    f = ImageFont.truetype(FONT, size)
    while d.textlength(text, font=f) > W * 0.72 and size > 20:
        size -= 4; f = ImageFont.truetype(FONT, size)
    tw = d.textlength(text, font=f)
    sc = 1.5 - 0.5 * min(1, q)
    t = Image.new('RGBA', (int(tw + 60), int(size * 1.5)), (0, 0, 0, 0)); td = ImageDraw.Draw(t)
    td.text((30, 0), text, font=f, fill=col, stroke_width=max(6, size // 14), stroke_fill=(10, 10, 10))
    t = t.rotate(cfg.get('tilt', 4), expand=True, resample=Image.BICUBIC)
    t = t.resize((max(1, int(t.width * sc)), max(1, int(t.height * sc))), Image.BILINEAR)
    jit = (random.uniform(-5, 5), random.uniform(-3, 3)) if q < 1 else (0, 0)
    cy = cfg.get('y', 0.74)
    layer.paste(t, (int(W / 2 - t.width / 2 + jit[0]), int(H * cy - t.height / 2 + jit[1])), t)
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

class AnimBG:
    """Moving backgrounds so no shot ever sits on a dead plate."""
    def __init__(s, W, H):
        s.W, s.H = W, H
        s.paper_big = paper_bg(int(W * 1.25), int(H * 1.25), 3).convert('RGBA')
        s.stars_big = stars_bg(int(W * 1.2), int(H * 1.2)).convert('RGBA')
        rng = np.random.default_rng(2)
        s.dust = rng.uniform(0, 1, (60, 4))
        s.cache = {}
    def frame(s, kind, t, shot_seed=0):
        W, H = s.W, s.H
        name, _, col = kind.partition(':')
        if name == 'paper':
            dx = (math.sin(t * 0.35 + shot_seed) * 0.5 + 0.5) * (s.paper_big.width - W)
            dy = (math.cos(t * 0.27 + shot_seed) * 0.5 + 0.5) * (s.paper_big.height - H)
            img = s.paper_big.crop((int(dx), int(dy), int(dx) + W, int(dy) + H))
            d = ImageDraw.Draw(img)
            for x0, y0, sp, r in s.dust:
                x = (x0 * W + t * 30 * sp) % W; y = (y0 * H - t * 55 * (0.4 + sp)) % H; rr = 1 + r * 2.5
                d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=(90, 90, 90, 110))
            return img
        if name == 'stars':
            ox = (t * 18) % (s.stars_big.width - W); img = s.stars_big.crop((int(ox), 20, int(ox) + W, 20 + H))
            d = ImageDraw.Draw(img); rng = random.Random(int(t * 6))
            for _ in range(25):
                x, y = rng.uniform(0, W), rng.uniform(0, H); d.line([x - 6, y, x + 6, y], fill=(255, 255, 255, 180)); d.line([x, y - 6, x, y + 6], fill=(255, 255, 255, 180))
            return img
        if name == 'speed':
            bgc = col or '#ffffff'; ink = (0, 0, 0, 255) if bgc.lower() in ('#ffffff', '#fff', '#f4f1ea') else (255, 255, 255, 230)
            img = Image.new('RGBA', (W, H), bgc); d = ImageDraw.Draw(img)
            rng = random.Random(int(t * 15) + shot_seed)  # re-drawn every 2 frames = the anime flicker
            cx, cy = W / 2, H / 2
            for _ in range(140):
                a = rng.uniform(0, 2 * math.pi); w = rng.uniform(0.002, 0.012); r0 = rng.uniform(0.28, 0.45) * W
                P = lambda ang, r: (cx + math.cos(ang) * r, cy + math.sin(ang) * r)
                d.polygon([P(a, r0), P(a - w, W), P(a + w, W)], fill=ink)
            return img
        if name == 'aura':
            key = ('aura', col)
            if key not in s.cache:
                c = Image.new('RGB', (1, 1), col or '#3a6cff').getpixel((0, 0))
                yy, xx = np.mgrid[0:H, 0:W]; r = np.sqrt(((xx - W / 2) / W) ** 2 + ((yy - H * .6) / H) ** 2)
                g = np.clip(1.1 - r * 1.6, 0, 1)[..., None]
                arr = (np.array(c)[None, None, :] * g + np.array([6, 6, 14])[None, None, :] * (1 - g)).clip(0, 255).astype('uint8')
                s.cache[key] = Image.fromarray(arr).convert('RGBA')
            img = s.cache[key].copy(); d = ImageDraw.Draw(img); rng = random.Random(7)
            for i in range(90):
                x0, sp, sz = rng.uniform(0, W), rng.uniform(80, 260), rng.uniform(2, 6)
                y = H - ((t * sp + rng.uniform(0, H)) % (H + 40)); x = x0 + math.sin(t * 2 + i) * 14
                d.ellipse([x - sz, y - sz * 3, x + sz, y + sz * 3], fill=(255, 255, 255, 150))
            return img.filter(ImageFilter.GaussianBlur(0.8)) if False else img
        if name == 'halftone':
            c = col or '#e3262e'; img = Image.new('RGBA', (W, H), c); d = ImageDraw.Draw(img); st = 34; off = (t * 40) % st
            for y in range(-st, H + st, st):
                for x in range(-st, W + st, st):
                    xx, yy = x + off + (y // st % 2) * st / 2, y + off; r = 3 + 7 * (xx / W)
                    d.ellipse([xx - r, yy - r, xx + r, yy + r], fill=(0, 0, 0, 70))
            return img
        if name == 'black': return Image.new('RGBA', (W, H), (0, 0, 0, 255))
        return Image.new('RGBA', (W, H), col or '#000000')

def load_gif(path, H, cache={}):
    if path in cache: return cache[path]
    import tempfile, glob
    d = tempfile.mkdtemp()
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', path, '-vf', 'fps=15', os.path.join(d, 'f%04d.png')], check=True)
    frames = [Image.open(f).convert('RGBA') for f in sorted(glob.glob(os.path.join(d, '*.png')))]
    cache[path] = frames; return frames

def gif_layer(frames, W, H, t, p, cfg):
    if p < cfg.get('at', 0.0): return None
    fr = frames[int((t - 0) * 15) % len(frames)]
    pos = cfg.get('pos', 'br')
    if pos == 'full':
        s = max(W / fr.width, H / fr.height); im = fr.resize((int(fr.width * s), int(fr.height * s)), Image.BILINEAR)
        out = Image.new('RGBA', (W, H)); out.paste(im, ((W - im.width) // 2, (H - im.height) // 2)); return out
    sc = cfg.get('scale', 0.36); s = W * sc / fr.width; im = fr.resize((int(fr.width * s), int(fr.height * s)), Image.BILINEAR)
    bw = max(6, int(W * 0.005)); st = Image.new('RGBA', (im.width + 2 * bw, im.height + 2 * bw), (255, 255, 255, 255)); st.paste(im, (bw, bw))
    k = min(1, (p - cfg.get('at', 0)) / 0.08) if p >= cfg.get('at', 0) else 0; k = 1 - (1 - k) ** 3
    st = st.rotate(cfg.get('tilt', -3), expand=True, resample=Image.BICUBIC)
    if k < 1: st = st.resize((max(1, int(st.width * (0.6 + 0.4 * k))), max(1, int(st.height * (0.6 + 0.4 * k)))))
    m = int(W * 0.03)
    x = {'br': W - st.width - m, 'tr': W - st.width - m, 'bl': m, 'tl': m, 'center': (W - st.width) // 2}[pos]
    y = {'br': H - st.height - m - int(H * .13), 'bl': H - st.height - m, 'tr': m + int(H * .17), 'tl': m, 'center': (H - st.height) // 2}[pos]
    out = Image.new('RGBA', (W, H)); sh = Image.new('RGBA', st.size, (0, 0, 0, 120)); sh.putalpha(st.getchannel('A').point(lambda v: v // 2))
    out.paste(sh, (x + 10, y + 12), sh); out.paste(st, (x, y), st); return out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('shots'); ap.add_argument('out')
    ap.add_argument('--fps', type=int, default=30); ap.add_argument('--size', default='1920x1080')
    ap.add_argument('--preview', action='store_true', help='960x540 fast preview'); ap.add_argument('--nodepth', action='store_true')
    ap.add_argument('--only', default=None, help='a:b shot range for tests')
    a = ap.parse_args()
    W, H = map(int, a.size.split('x'))
    if a.preview: W, H = 960, 540
    spec = json.load(open(a.shots)); base = os.path.join(os.path.dirname(os.path.abspath(a.shots)), spec.get('assets', '.'))
    P = lambda x: x if os.path.isabs(x) else os.path.join(base, x)
    AB = AnimBG(W, H)
    wm = None
    if spec.get('watermark') and os.path.exists(P(spec['watermark'])):
        wm = load(P(spec['watermark'])); s = (H * 0.15) / wm.height
        wm = wm.resize((int(wm.width * s), int(wm.height * s))); a_ = np.array(wm); a_[..., 3] = (a_[..., 3] * 0.8).astype('uint8'); wm = Image.fromarray(a_)
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(a.fps), '-i', '-',
                           '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', str(a.fps), a.out], stdin=subprocess.PIPE)
    tl = []; t0 = 0.0
    shots_all = spec['shots']
    if a.only: i0, i1 = map(int, a.only.split(':')); shots_all = shots_all[i0:i1]
    for sh in shots_all:
        n = max(1, round(sh['dur'] * a.fps))
        bgk = sh.get('bg', 'paper')
        gif = load_gif(P(sh['gif']['file']), H) if sh.get('gif') else None
        src = cropn(load(P(sh['img'])), sh.get('crop')) if sh.get('img') else None
        dmap = src_m = None
        if src is not None and not sh.get('nomotion') and not a.nodepth:
            # work at display resolution so the warp is cheap
            s_fit = min(W / src.width, H / src.height) if sh.get('fit', 'height') == 'auto' else (W / src.width if sh.get('fit') == 'width' else H / src.height)
            s_fit = min(1.0, s_fit * sh.get('margin', 1.0) * (1 + sh.get('amount', 0.08) + 0.1))
            src_m = src.resize((max(8, int(src.width * s_fit)), max(8, int(src.height * s_fit))), Image.LANCZOS) if s_fit < 1 else src
            dmap = depth_of(src, sh['img'] + json.dumps(sh.get('crop')))
        pop = cropn(load(P(sh['pop']['img'])), sh['pop'].get('crop')) if sh.get('pop') else None
        for i in range(n):
            p = i / max(1, n - 1)
            if sh.get('sting'):
                fr = sting(W, H, p, sh['sting'])
            else:
                tg = t0 + i / a.fps
                fr = AB.frame(bgk, tg, len(tl))
                if src is not None:
                    tt = i / a.fps; env = sh.get('env') or []
                    pulse = env[min(i, len(env) - 1)] if env else 0.0
                    shake = (0, 0)
                    if sh.get('punch') and tt < 0.45:
                        k = (1 - tt / 0.45) * H * 0.012; rr = random.Random(i * 7 + len(tl))
                        shake = (rr.uniform(-k, k), rr.uniform(-k, k))
                    msrc = motion_src(src_m, dmap, tt, p, sh.get('move', 'in'), len(tl)) if dmap is not None else src
                    fr.alpha_composite(kb_frame(msrc, W, H, p, sh.get('move', 'in'), sh.get('amount', 0.08), sh.get('fit', 'height'), sh.get('punch'), sh.get('margin', 1.0), pulse, shake))
                    if sh.get('punch') and i < 4:
                        fl = Image.new('RGBA', (W, H), (255, 255, 255, int(150 * (1 - i / 4)))); fr.alpha_composite(fl)
                if pop is not None:
                    po = popout(pop, W, H, p, sh['pop'])
                    if po is not None: fr.alpha_composite(po)
                if gif is not None:
                    gl = gif_layer(gif, W, H, i / a.fps, p, sh['gif'])
                    if gl is not None: fr.alpha_composite(gl)
                if sh.get('stamp'):
                    st = stamp(W, H, p, dict(sh['stamp'], **({'y': 0.25} if gif is not None and sh['gif'].get('pos','br').startswith('b') else {})))
                    if st is not None: fr.alpha_composite(st)
            if wm is not None and not sh.get('sting'):
                fr.alpha_composite(wm, (W - wm.width - int(W * 0.04), int(H * 0.035)))  # 5% inset = YouTube title-safe area
            ff.stdin.write(fr.convert('RGB').tobytes())
        tl.append({'start': round(t0, 3), 'dur': sh['dur'], 'sfx': sh.get('sfx')}); t0 += n / a.fps
    ff.stdin.close(); ff.wait()
    json.dump(tl, open(os.path.splitext(a.out)[0] + '.timeline.json', 'w'), indent=1)
    print('rendered', a.out, round(t0, 2), 's')

if __name__ == '__main__':
    main()
