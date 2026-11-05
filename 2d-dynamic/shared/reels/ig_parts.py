#!/usr/bin/env python3
"""Cut a full 16:9 video into Instagram parts (9:16, each under 3 min) at act boundaries.
usage: ig_parts.py FULL.mp4 CHAPTERS.json OUT_DIR PREFIX "TITLE" "1-3,4-5,6-7"   (act groups, 1-based act numbers in the order of the chapters file)
Each part: blurred painted fill + full-width 16:9 frame (burned-in subtitles kept), "PART N OF M" label + title on top,
Stormi logo top-right in the safe zone, and a 3 s end card: "Watch Part N+1 on this page" (last part: the YouTube card)."""
import sys, json, os, subprocess
from PIL import Image, ImageDraw, ImageFont
FULL, CH, OUT, PRE, TITLE, GROUPS = sys.argv[1:7]
SH = os.path.dirname(os.path.abspath(__file__)) + '/..'
FONT = f'{SH}/fonts/Anton.ttf'; W, H = 1080, 1920; GOLD = (232, 180, 74); INK = (18, 13, 10); END = 3.0
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', FULL]))
starts = [a['start'] for a in json.load(open(CH))['acts']] + [dur]
groups = [tuple(int(x) for x in g.split('-')) for g in GROUPS.split(',')]; M = len(groups)
LOGO = Image.open(f'{SH}/branding/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox())
LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS); LB = LOGO.resize((440, 440 * LOGO.height // LOGO.width), Image.LANCZOS)
os.makedirs(OUT, exist_ok=True); tmp = f'/tmp/claude-0/igp_{PRE}'; os.makedirs(tmp, exist_ok=True)
def font(s): return ImageFont.truetype(FONT, s)
def wrap(d, txt, f, maxw):
    lines, cur = [], ''
    for w in txt.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    return lines + [cur]
def overlay(n):
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    lab = f'PART {n} OF {M}'; f = font(74); tw = d.textlength(lab, font=f)
    d.rounded_rectangle([430 - tw / 2 - 28, 330 - 50, 430 + tw / 2 + 28, 330 + 48], 18, fill=GOLD, outline=INK, width=6); d.text((430, 330), lab, font=f, fill=INK, anchor='mm')
    y = 470
    for l in wrap(d, TITLE.upper(), font(64), 940): d.text((540, y), l, font=font(64), fill=(255, 255, 255), anchor='mm', stroke_width=7, stroke_fill=INK); y += 80
    im.paste(LS, (820, 262), LS); return im
def endcard(n):
    im = Image.new('RGB', (W, H), (10, 10, 14)); d = ImageDraw.Draw(im); im.paste(LB, ((W - LB.width) // 2, 560), LB)
    lines = [f'WATCH PART {n + 1}', 'ON THIS PAGE'] if n < M else ['WATCH THE FULL VIDEO', 'ON OUR YOUTUBE CHANNEL']
    for k, l in enumerate(lines): d.text((540, 1110 + k * 100), l, font=font(76), fill=(118, 210, 74) if k == 0 else (255, 255, 255), anchor='mm', stroke_width=8, stroke_fill=INK)
    return im
for n, (a, b) in enumerate(groups, 1):
    t0, t1 = starts[a - 1], starts[b]; L = t1 - t0
    assert L + END < 180, f'part {n} is {L + END:.1f}s, over 3 min'
    overlay(n).save(f'{tmp}/ov{n}.png'); endcard(n).save(f'{tmp}/end{n}.png')
    fc = (f'[0:v]fps=30,split[a][b];[a]crop=iw:ih*0.78:0:0,scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},boxblur=24:2,eq=brightness=-0.3[bg];'
          f'[b]scale={W}:-2[fg];[bg][fg]overlay=0:(H-h)/2[v0];[v0]drawbox=x=0:y=(ih-608)/2-6:w=iw:h=6:color=0xE8B44A:t=fill,drawbox=x=0:y=(ih+608)/2:w=iw:h=6:color=0xE8B44A:t=fill[v1];'
          f'[v1][1:v]overlay=0:0,format=yuv420p,setsar=1[main];[0:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=out:st={L - .6:.2f}:d=0.6[ma];'
          f'[2:v]fps=30,format=yuv420p,setsar=1[ev];[3:a]aformat=sample_rates=48000:channel_layouts=stereo[ea];[main][ma][ev][ea]concat=n=2:v=1:a=1[v][o]')
    out = f'{OUT}/{PRE}_IG_Part_{n:02d}.mp4'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', f'{t0:.3f}', '-t', f'{L:.3f}', '-i', FULL, '-i', f'{tmp}/ov{n}.png', '-loop', '1', '-t', str(END), '-i', f'{tmp}/end{n}.png',
                    '-f', 'lavfi', '-t', str(END), '-i', 'anullsrc=r=48000:cl=stereo', '-filter_complex', fc, '-map', '[v]', '-map', '[o]',
                    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out + '.part.mp4'], check=True)
    os.replace(out + '.part.mp4', out); print('PART', n, out, f'{L + END:.1f}s')
