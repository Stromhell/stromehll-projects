# build_reel_dd.py VIDEO_DIR ID : vertical 1080x1920 reel from a rendered 2D-dynamic act.
# hook (voice + first frame) -> clip (act video, subtitles cropped off, big word captions) -> end card (logo + CTA voice).
# Stormi logo top-right in the safe zone on every frame; local music bed under hook and end card.
import sys, json, subprocess, os, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy.io import wavfile
from scipy.signal import resample_poly
V, RID = sys.argv[1].rstrip('/'), int(sys.argv[2])
SH = os.path.dirname(os.path.abspath(__file__)) + '/..'
B = f'{V}/reels'; R = {r['id']: r for r in json.load(open(f'{B}/reels.json'))}[RID]
A = f'{V}/production/acts/act{R["act"]}'; T = json.load(open(f'{A}/timing.json')); SHOTS = {s['i']: s for s in T['shots']}
t0, t1 = SHOTS[R['s0']]['start'], SHOTS[R['s1']]['end']
FONT = f'{SH}/fonts/Anton.ttf'; SR = 48000; FPS = 30; W, H = 1080, 1920; os.makedirs(f'{B}/out', exist_ok=True); tmp = f'/tmp/claude-0/reel_{os.path.basename(V)}_{RID}'; os.makedirs(tmp, exist_ok=True)
def load(p):
    sr, x = wavfile.read(p); x = x.astype(np.float32)
    if np.max(np.abs(x)) > 2: x /= 32768
    if x.ndim > 1: x = x.mean(1)
    if sr != SR: g = np.gcd(sr, SR); x = resample_poly(x, SR // g, sr // g)
    return x
def trim(x, th=.01):
    i = np.where(np.abs(x) > th)[0]; return x[max(0, i[0] - 400): i[-1] + 2400] if len(i) else x
NV = len(json.load(open(f'{B}/reels.json')))
hook = trim(load(f'{B}/voice/vo/vo-{RID:02d}.wav' if os.path.exists(f'{B}/voice/vo/vo-{RID:02d}.wav') else f'{B}/voice/vo-{RID:02d}.wav'))
ctap = f'{B}/voice/vo/vo-{NV + 1:02d}.wav' if os.path.exists(f'{B}/voice/vo/vo-{NV + 1:02d}.wav') else f'{B}/voice/vo-{NV + 1:02d}.wav'; cta = trim(load(ctap))
hd = len(hook) / SR + .45; cd = len(cta) / SR + 1.0
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(t0), '-t', str(t1 - t0), '-i', f'{A}/act{R["act"]}.mp4', '-vn', '-ac', '1', '-ar', str(SR), f'{tmp}/clip.wav'], check=True)
clip = load(f'{tmp}/clip.wav'); nC = int((t1 - t0) * SR); clip = np.pad(clip, (0, max(0, nC - len(clip))))[:nC]
f = int(.2 * SR); clip[:f] *= np.linspace(0, 1, f); clip[-f:] *= np.linspace(1, 0, f)
nH, nE = int(hd * SR), int(cd * SR); N = nH + nC + nE
aud = np.zeros(N); aud[int(.15 * SR):int(.15 * SR) + len(hook)] += hook * .9; aud[nH:nH + nC] += clip; aud[nH + nC + int(.3 * SR):nH + nC + int(.3 * SR) + len(cta)] += cta * .9
subprocess.run(['python3', f'{SH}/score.py', f'{tmp}/mus.wav', '--dur', f'{N / SR + .5:.2f}', '--moods', f'0:{R.get("mood", "tension")}', '--seed', str(RID)], check=True, capture_output=True)
mu = load(f'{tmp}/mus.wav'); mu = np.pad(mu, (0, max(0, N - len(mu))))[:N] * 10 ** (-22 / 20)
g = np.ones(N); g[nH:nH + nC] = 0; g = np.convolve(g, np.ones(9600) / 9600, 'same'); aud += mu * g
aud = aud / max(1e-6, np.max(np.abs(aud))) * .9; wavfile.write(f'{tmp}/aud_raw.wav', SR, (aud * 32767).astype(np.int16))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{tmp}/aud_raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', f'{tmp}/aud.wav'], check=True)
words = [dict(w=w['w'], s=w['s'] - t0, e=w['e'] - t0) for w in T['words'] if w['s'] >= t0 - .05 and w['e'] <= t1 + .05]
LOGO = Image.open(f'{SH}/branding/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox())
LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS); LB = LOGO.resize((440, 440 * LOGO.height // LOGO.width), Image.LANCZOS)
fK = ImageFont.truetype(FONT, 74); fC = ImageFont.truetype(FONT, 92); fH = ImageFont.truetype(FONT, 82); fE = ImageFont.truetype(FONT, 76)
GOLD = (232, 180, 74); INK = (18, 13, 10); PY, PH = 640, 1080 * 930 // 1920
def wrap(d, txt, font, maxw):
    lines, cur = [], ''
    for w in txt.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=font) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    return lines + [cur]
def outlined(d, xy, txt, font, fill, sw=8): d.text(xy, txt, font=font, fill=fill, anchor='mm', stroke_width=sw, stroke_fill=INK)
def kicker(d):
    ls = wrap(d, R['kicker'], fK, 640); y = 330 - (len(ls) - 1) * 54; cx = 430
    for l in ls:
        tw = d.textlength(l, font=fK); d.rounded_rectangle([cx - tw / 2 - 28, y - 50, cx + tw / 2 + 28, y + 48], 18, fill=GOLD, outline=INK, width=6)
        d.text((cx, y), l, font=fK, fill=INK, anchor='mm'); y += 108
def frame(src, t_local, mode, zoom=1.0):
    pan = src.crop((0, 0, 1920, 930)).resize((W, PH), Image.BILINEAR)
    bg = src.resize((W * 2 // 5, H * 2 // 5)).filter(ImageFilter.GaussianBlur(8)).resize((W, H), Image.BILINEAR)
    cv = bg.copy(); cv.paste((0, 0, 0), (0, 0, W, H), Image.new('L', (W, H), 120))
    if zoom != 1: pw = int(W * zoom); ph = int(PH * zoom); pan = pan.resize((pw, ph), Image.BILINEAR).crop(((pw - W) // 2, (ph - PH) // 2, (pw - W) // 2 + W, (ph - PH) // 2 + PH))
    cv.paste(pan, (0, PY)); d = ImageDraw.Draw(cv); d.rectangle([0, PY - 5, W, PY], fill=GOLD); d.rectangle([0, PY + PH, W, PY + PH + 5], fill=GOLD)
    if mode == 'end':
        cv.paste((10, 10, 14), (0, 0, W, H), Image.new('L', (W, H), 236)); d = ImageDraw.Draw(cv); cv.paste(LB, ((W - LB.width) // 2, 560), LB)
        for k, l in enumerate(['WATCH THE FULL VIDEO', 'ON OUR YOUTUBE CHANNEL']): outlined(d, (540, 1110 + k * 100), l, fE, (255, 255, 255) if k else (118, 210, 74))
        return cv
    kicker(d)
    if mode == 'hook':
        ls = wrap(d, R['hook'].upper(), fH, 960); y = PY + PH + 150
        for l in ls: outlined(d, (540, y), l, fH, (255, 255, 255)); y += 98
    else:
        cur = [i for i, w in enumerate(words) if w['s'] <= t_local]
        if cur:
            i = cur[-1]; g0 = i // 3 * 3; grp = words[g0:g0 + 3]
            if t_local <= grp[-1]['e'] + .6:
                ls = wrap(d, ' '.join(w['w'].upper() for w in grp), fC, 980); y = PY + PH + 170
                for l in ls:
                    x = 540 - d.textlength(l, font=fC) / 2
                    for w in l.split():
                        on = words[i]['w'].upper() == w
                        d.text((x, y), w, font=fC, fill=(255, 214, 64) if on else (255, 255, 255), anchor='lm', stroke_width=8, stroke_fill=INK); x += d.textlength(w + ' ', font=fC)
                    y += 108
    cv.paste(LS, (820, 262), LS)
    return cv
rd = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-ss', str(t0), '-t', str(t1 - t0), '-i', f'{A}/act{R["act"]}.mp4', '-vf', 'fps=30', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
out = f'{B}/out/{R.get("pre", "ES1")}_Reel_{RID:02d}.mp4'
p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', f'{tmp}/aud.wav', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
FS = 1920 * 1080 * 3; nCF = int((t1 - t0) * FPS); frames = []
first = None; last = None; k = 0
buf = rd.stdout.read(FS); first = Image.frombytes('RGB', (1920, 1080), buf)
for j in range(int(hd * FPS)): p.stdin.write(frame(first, 0, 'hook', 1 + .06 * j / (hd * FPS)).tobytes())
while buf and len(buf) == FS and k < nCF:
    im = Image.frombytes('RGB', (1920, 1080), buf); last = im; p.stdin.write(frame(im, k / FPS, 'clip').tobytes()); k += 1; buf = rd.stdout.read(FS)
while k < nCF: p.stdin.write(frame(last, k / FPS, 'clip').tobytes()); k += 1
for j in range(int(cd * FPS) + 2): p.stdin.write(frame(last, 0, 'end').tobytes())
p.stdin.close(); p.wait(); rd.kill(); print('REEL', RID, out, f'{N / SR:.1f}s')
