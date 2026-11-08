#!/usr/bin/env python3
# Christmas release cut-downs: 15 vertical reels + 3 IG parts from the finished full video (-14 LUFS).
# Picture keeps the burned captions: a 1600x1080 centre crop (16:9 -> 4:3) sits on a blurred, darkened copy.
# Hook text in Anton for the first 2.6 s, then a small kicker; branding via tools/reel_brand.sh / ig_brand.sh.
import json, os, subprocess, sys
X = '/home/user/work/xmas'; FULL = f'{X}/acts/full/XM_FULL.mp4'
TOOLS = '/home/user/stromehll-projects/3d-documentaries/tools'; FONTS = '/home/user/stromehll-projects/3d-documentaries/engine/fonts'
OUT = f'{X}/release'; W = f'{OUT}/work'
for d in (W, f'{OUT}/reels', f'{OUT}/ig_parts'): os.makedirs(d, exist_ok=True)

def frames(a): return int(subprocess.check_output(['ffprobe', '-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', f'{X}/acts/act{a}.mp4']))
VDUR = [frames(a) / 24 for a in range(7)]; OFF = [sum(VDUR[:i]) for i in range(7)]
shots = {}
for a in range(7):
    s = 0
    for k, v in json.load(open(f'{X}/acts/act{a}.timing.json')).items():
        shots[k] = (OFF[a] + s, OFF[a] + min(s + v['dur'], VDUR[a])); s += v['dur']

def ts(t): return f'{int(t // 3600)}:{int(t % 3600 // 60):02d}:{t % 60:05.2f}'
HEAD = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Hook,Anton,124,&H0021B3E8,&H00FFFFFF,&H00100D12,&H96000000,0,0,0,0,100,100,1,0,1,7,4,8,60,60,250,1
Style: Kick,Oswald,44,&H00FFFFFF,&H00FFFFFF,&H00100D12,&H96000000,1,0,0,0,100,100,3,0,1,4,0,8,60,300,330,1
Style: Title,Anton,64,&H00FFFFFF,&H00FFFFFF,&H00100D12,&H96000000,0,0,0,0,100,100,1,0,1,6,3,8,60,60,300,1
Style: Pill,Oswald,46,&H00141018,&H00FFFFFF,&H002A22A8,&H002A22A8,1,0,0,0,100,100,2,0,3,10,0,8,60,60,410,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
KICK = 'THE REAL HISTORY OF CHRISTMAS'

def build(g0, g1, ass, out_body):
    d = g1 - g0
    fl = (f'[0:v]fps=24,format=yuv420p,split[s][t];[t]crop=1600:1080:160:0,scale=1080:730[p];'
          f'[s]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=28:2,eq=brightness=-0.28:saturation=0.8[bg];'
          f'[bg][p]overlay=0:595,drawbox=x=0:y=590:w=1080:h=5:color=0xE8B321:t=fill,drawbox=x=0:y=1325:w=1080:h=5:color=0xE8B321:t=fill,'
          f'subtitles={ass}:fontsdir={FONTS}[vo];'
          f'[0:a]afade=t=in:d=0.12,afade=t=out:st={d - 0.3:.3f}:d=0.3,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[ao]')
    subprocess.check_call(['nice', '-n', '10', 'ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{g0:.3f}', '-t', f'{d:.3f}', '-i', FULL,
                           '-filter_complex', fl, '-map', '[vo]', '-map', '[ao]', '-c:v', 'libx264', '-crf', '19', '-preset', 'medium',
                           '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', out_body])

only = set(sys.argv[1:])
REELS = json.load(open(f'{X}/launch/reels.json'))
for r in REELS:
    n = f"XM_Reel_{r['n']:02d}"
    if only and n not in only: continue
    g0 = min(shots[s[0]][0] for s in r['segs']); g1 = max(shots[s[-1]][1] for s in r['segs'])
    order = sorted(shots.values())
    while g1 - g0 < 28.5:  # reels must be >= 30 s with the end card: grow into the next shot (or the previous one at the end)
        nxt = [v for v in order if v[0] >= g1 - .01]
        if nxt: g1 = nxt[0][1]
        else: g0 = [v for v in order if v[1] <= g0 + .01][-1][0]
    ass = f'{W}/{n}.ass'
    open(ass, 'w').write(HEAD + f"Dialogue: 2,{ts(0)},{ts(2.6)},Hook,,0,0,0,,{{\\fad(0,250)}}{r['hook']}\n"
                         f"Dialogue: 1,{ts(2.6)},{ts(g1 - g0)},Kick,,0,0,0,,{{\\fad(250,0)}}{KICK}\n")
    build(g0, g1, ass, f'{W}/{n}_body.mp4')
    subprocess.check_call(['bash', f'{TOOLS}/reel_brand.sh', f'{W}/{n}_body.mp4', f'{OUT}/reels/{n}.mp4', 'Stormi Explain Everything'])
    print(n, round(g1 - g0 + 3, 1), flush=True)

# IG parts: split at act boundaries, each under 3 min
PARTS = [(0, OFF[3]), (OFF[3], OFF[5]), (OFF[5], OFF[6] + VDUR[6])]
for i, (g0, g1) in enumerate(PARTS, 1):
    n = f'XM_Part_{i:02d}'
    if only and n not in only: continue
    ass = f'{W}/{n}.ass'
    open(ass, 'w').write(HEAD + f"Dialogue: 1,{ts(0)},{ts(g1 - g0)},Title,,0,0,0,,THE REAL HISTORY OF CHRISTMAS\n"
                         f"Dialogue: 1,{ts(0)},{ts(g1 - g0)},Pill,,0,0,0,, PART {i} OF {len(PARTS)} \n")
    build(g0, g1, ass, f'{W}/{n}_body.mp4')
    if i < len(PARTS): cmd = ['bash', f'{TOOLS}/ig_brand.sh', f'{W}/{n}_body.mp4', f'{OUT}/ig_parts/{n}.mp4', f'WATCH PART {i + 1}', 'ON THIS PAGE']
    else: cmd = ['bash', f'{TOOLS}/reel_brand.sh', f'{W}/{n}_body.mp4', f'{OUT}/ig_parts/{n}.mp4', 'Stormi Explain Everything']
    subprocess.check_call(cmd); print(n, round(g1 - g0 + 3, 1), flush=True)
