# build_reel.py ID VIDEO REELDIR PREFIX FULLACTSDIR MUSIC.wav CTA.wav : composes reel ID from rID/frames + act audio + hook/CTA voice -> out/NV_Reel_ID.mp4
import sys, json, subprocess, os, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy.io import wavfile
from scipy.signal import resample_poly
VID, B, PRE, FULL, MUS, CTA = sys.argv[2:8]; RID = int(sys.argv[1]); R = {r['id']: r for r in json.load(open(f'{B}/reels.json'))}[RID]
G = '/home/user/stromehll-projects/2d-history'; FONT = f'{G}/shared/fonts/Anton.ttf'; SR = 48000; FPS = 30; W, H = 1080, 1920
T = json.load(open(f'{G}/{VID}/production/acts/act{R["act"]}/timing.json'))
FIX = {'CURA': 'CUDA'}
def load(p):
    sr, x = wavfile.read(p); x = x.astype(np.float32)
    if np.max(np.abs(x)) > 2: x /= 32768
    if x.ndim > 1: x = x.mean(1)
    if sr != SR: g = np.gcd(sr, SR); x = resample_poly(x, SR // g, sr // g)
    return x
def trim(x, th=.01):
    i = np.where(np.abs(x) > th)[0]; return x[max(0, i[0] - 400): i[-1] + 2400] if len(i) else x
hook = trim(load(f'{B}/voice/vo-{RID:02d}.wav')); cta = trim(load(CTA))
t0, t1 = R['t0'], R['t1']; hd = len(hook) / SR + .35; cd = len(cta) / SR + .9
# act audio slice
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(t0), '-t', str(t1 - t0), '-i', f'{FULL}/act{R["act"]}.mp4', '-vn', '-ac', '1', '-ar', str(SR), f'{B}/r{RID}/clip.wav'], check=True)
clip = load(f'{B}/r{RID}/clip.wav'); nC = int((t1 - t0) * SR); clip = np.pad(clip, (0, max(0, nC - len(clip))))[:nC]
f = int(.25 * SR); clip[:f] *= np.linspace(0, 1, f); clip[-f:] *= np.linspace(1, 0, f)
nH, nE = int(hd * SR), int(cd * SR); N = nH + nC + nE
aud = np.zeros(N); aud[int(.15 * SR):int(.15 * SR) + len(hook)] += hook * .9; aud[nH:nH + nC] += clip; aud[nH + nC + int(.3 * SR):nH + nC + int(.3 * SR) + len(cta)] += cta * .9
mus = load(MUS); ms = int(sum([0]) * SR)
mu = np.tile(mus, N // len(mus) + 1)[:N] * 10 ** (-26 / 20); g = np.ones(N); g[nH:nH + nC] = .35; mu *= np.convolve(g, np.ones(4800) / 4800, 'same'); aud += mu
aud = aud / max(1e-6, np.max(np.abs(aud))) * .9; wavfile.write(f'{B}/r{RID}/aud_raw.wav', SR, (aud * 32767).astype(np.int16))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{B}/r{RID}/aud_raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', f'{B}/r{RID}/aud.wav'], check=True)
# words inside the clip
words = [dict(w=FIX.get(w['w'].strip('.,'), w['w']), s=w['s'] - t0, e=w['e'] - t0) for w in T['words'] if w['s'] >= t0 - .05 and w['e'] <= t1 + .05]
F0 = round(t0 * FPS); frames = sorted(os.listdir(f'{B}/r{RID}/frames'))
LOGO = Image.open('/tmp/claude-0/brand/stormi.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox()); LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS); LB = LOGO.resize((440, 440 * LOGO.height // LOGO.width), Image.LANCZOS)
fK = ImageFont.truetype(FONT, 78); fC = ImageFont.truetype(FONT, 92); fH = ImageFont.truetype(FONT, 84); fE = ImageFont.truetype(FONT, 76)
def wrap(d, txt, font, maxw):
    lines, cur = [], ''
    for w in txt.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=font) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    return lines + [cur]
def outlined(d, xy, txt, font, fill, sw=8, anchor='mm'):
    d.text(xy, txt, font=font, fill=fill, anchor=anchor, stroke_width=sw, stroke_fill=(18, 13, 10))
def kicker(d):
    ls = wrap(d, R['kicker'], fK, 700); y = 300 - (len(ls) - 1) * 56; cx = 455
    for l in ls:
        tw = d.textlength(l, font=fK); d.rounded_rectangle([cx - tw / 2 - 30, y - 52, cx + tw / 2 + 30, y + 50], 18, fill=(232, 180, 74), outline=(18, 13, 10), width=6)
        d.text((cx, y), l, font=fK, fill=(18, 13, 10), anchor='mm'); y += 112
def frame(img16, bgimg, t_local, mode, zoom=1.0):
    bg = bgimg.resize((W, H), Image.BILINEAR); canvas = bg.copy(); canvas.paste((0, 0, 0), (0, 0, W, H), Image.new('L', (W, H), 110))
    fw = int(W * zoom); fh = int(fw * 9 / 16); im = img16.resize((fw, fh), Image.BILINEAR)
    if zoom != 1: im = im.crop(((fw - W) // 2, (fh - 608) // 2, (fw - W) // 2 + W, (fh - 608) // 2 + 608)); fw, fh = W, 608
    canvas.paste(im, (0, 640)); d = ImageDraw.Draw(canvas); d.rectangle([0, 636, W, 640], fill=(232, 180, 74)); d.rectangle([0, 1248, W, 1252], fill=(232, 180, 74)); kicker(d)
    if mode == 'hook':
        ls = wrap(d, R['hook'].upper(), fH, 960); y = 1420 - (len(ls) - 1) * 50
        for l in ls: outlined(d, (540, y), l, fH, (255, 255, 255)); y += 100
    elif mode == 'clip':
        cur = [i for i, w in enumerate(words) if w['s'] <= t_local < words[min(i + 1, len(words) - 1)]['s'] or (w['s'] <= t_local <= w['e'])]
        if cur:
            i = cur[-1]; g0 = i // 3 * 3; grp = words[g0:g0 + 3]
            if t_local <= grp[-1]['e'] + .6:
                txt = ' '.join(w['w'].upper() for w in grp); ls = wrap(d, txt, fC, 980); y = 1440 - (len(ls) - 1) * 52
                for l in ls:
                    x = 540 - d.textlength(l, font=fC) / 2
                    for w in l.split():
                        on = words[i]['w'].upper() == w
                        d.text((x, y), w, font=fC, fill=(255, 214, 64) if on else (255, 255, 255), anchor='lm', stroke_width=8, stroke_fill=(18, 13, 10)); x += d.textlength(w + ' ', font=fC)
                    y += 108
    else:
        canvas.paste((10, 10, 14), (0, 0, W, H), Image.new('L', (W, H), 236)); d = ImageDraw.Draw(canvas)
        canvas.paste(LB, ((W - LB.width) // 2, 560), LB)
        for k, l in enumerate(['WATCH THE FULL VIDEO', 'ON OUR YOUTUBE CHANNEL']): outlined(d, (540, 1110 + k * 100), l, fE, (255, 255, 255) if k else (118, 210, 74))
        return canvas
    canvas.paste(LS, (880, 225), LS)
    return canvas
cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', f'{B}/r{RID}/aud.wav', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', f'{B}/out/{PRE}_Reel_{RID:02d}.mp4']
os.makedirs(f'{B}/out', exist_ok=True); p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
small = lambda im: im.resize((240, 135)).filter(ImageFilter.GaussianBlur(6)).crop((50, 0, 190, 135))
first = Image.open(f'{B}/r{RID}/frames/' + frames[0]).convert('RGB'); last = Image.open(f'{B}/r{RID}/frames/' + frames[-1]).convert('RGB')
for k in range(int(hd * FPS)): p.stdin.write(frame(first, small(first), 0, 'hook', 1 + .06 * k / (hd * FPS)).tobytes())
for k, fn in enumerate(frames[:int((t1 - t0) * FPS)]):
    im = Image.open(f'{B}/r{RID}/frames/' + fn).convert('RGB'); p.stdin.write(frame(im, small(im), k / FPS, 'clip').tobytes())
for k in range(int(cd * FPS)): p.stdin.write(frame(last, small(last), 0, 'end').tobytes())
p.stdin.close(); p.wait(); print('REEL', RID, f'{N / SR:.1f}s')
