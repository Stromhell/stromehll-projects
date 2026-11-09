#!/usr/bin/env python3
# The Ides of March release cut-downs: 15 vertical reels + 7 IG parts (adapted from Operation Thunderbolt).
# Picture from the clean acts (no burned captions), sound from the approved full mix (-14 LUFS),
# new captions placed in the band under the picture, branding via 3d-documentaries/tools/reel_brand.sh.
import json, csv, re, os, sys
A = '/home/user/work/cae_acts'; FULL = '/home/user/work/cae_full/caesar_full.mp4'
REPO = '/home/user/stromehll-projects/3d-documentaries'
SCRIPT = f'{REPO}/caesar-ides-of-march/01-script/voice-lines'
OUT = '/home/user/work/cae_release'; W = f'{OUT}/work'
SIL = sys.argv[1] if len(sys.argv) > 1 else f'{W}/sil'
import subprocess
NA = 8
VDUR = [int(subprocess.check_output(['ffprobe','-v','error','-count_packets','-select_streams','v:0','-show_entries','stream=nb_read_packets','-of','csv=p=0',f'{A}/act{i}.mp4']).decode().strip())/24 for i in range(NA)]
OFF = [sum(VDUR[:i]) for i in range(NA)]

shots = {}  # id -> dict(act, s, e, a, vo, text)
for i in range(NA):
    t = json.load(open(f'{A}/act{i}.timing.json'))
    txt = {r[0]: r[-1] for r in csv.reader(open(f'{SCRIPT}/act{i}.tsv'), delimiter='\t')}
    s = 0
    for k, v in t.items():
        shots[k] = dict(act=i, s=s, e=min(s + v['dur'], VDUR[i]), a=v['a'], vo=v['vo'], text=txt[k]); s += v['dur']

def speech(i):
    ev = [l.split(': ') for l in open(f'{SIL}/act{i}.txt').read().split('\n') if l]
    segs, last = [], 0.0
    for k, v in ev:
        v = float(v)
        if k == 'silence_start':
            if v > last + 0.05: segs.append((last, v))
        else: last = v
    if last < VDUR[i] - 0.1: segs.append((last, VDUR[i]))
    return segs
SP = {i: speech(i) for i in range(NA)}

def sentences(shot):
    sh = shots[shot]; parts = re.findall(r'[^.?!]+[.?!]+', sh['text']) or [sh['text']]
    parts = [p.strip() for p in parts]
    lo, hi = sh['s'] + sh['a'] - 0.1, sh['s'] + sh['a'] + sh['vo'] + 0.2
    segs = [(max(a, lo), min(b, hi)) for a, b in SP[sh['act']] if b > lo and a < hi and min(b, hi) - max(a, lo) > 0.08]
    n = len(parts)
    if len(segs) >= n and n > 1:
        gaps = sorted(range(len(segs) - 1), key=lambda j: segs[j + 1][0] - segs[j][1], reverse=True)[:n - 1]
        cuts = sorted(gaps); groups, st = [], 0
        for c in cuts: groups.append((segs[st][0], segs[c][1])); st = c + 1
        groups.append((segs[st][0], segs[-1][1]))
    else:
        t0 = segs[0][0] if segs else sh['s'] + sh['a']; t1 = segs[-1][1] if segs else t0 + sh['vo']
        tot = sum(len(p) for p in parts); groups, c = [], t0
        for p in parts: d = (t1 - t0) * len(p) / tot; groups.append((c, c + d)); c += d
    return list(zip(parts, groups))

def chunks(text, maxc=22):
    out, cur = [], ''
    for w in text.split():
        if cur and len(cur) + 1 + len(w) > maxc: out.append(cur); cur = w
        else: cur = (cur + ' ' + w).strip()
    if cur:
        if out and len(cur) < 10 and len(out[-1]) + len(cur) < maxc + 8: out[-1] += ' ' + cur
        else: out.append(cur)
    return out

def caption_events(segs, maxc):
    """segs: list of (act, t0, t1) act-local; returns [(start,end,text)] in output time"""
    ev, base = [], 0.0
    for sgx in segs:
        act, t0, t1 = sgx[:3]
        for k, sh in shots.items():
            if sh['act'] != act or sh['e'] <= t0 + 0.05 or sh['s'] >= t1 - 0.05: continue
            for sent, (a, b) in sentences(k):
                if a < t0 - 0.05 or a >= t1 - 0.6: continue
                b = min(b, t1)
                cs = chunks(sent, maxc); tot = sum(len(c) for c in cs); c0 = a
                for c in cs:
                    d = (b - a) * len(c) / tot
                    ev.append((base + c0 - t0, base + c0 - t0 + d, c)); c0 += d
        base += t1 - t0
    # no overlaps, small min duration
    ev.sort()
    for j in range(len(ev) - 1):
        if ev[j][1] > ev[j + 1][0]: ev[j] = (ev[j][0], ev[j + 1][0] - 0.02, ev[j][2])
    return ev, base

def ts(t):
    t = max(0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f'{h}:{m:02d}:{s:05.2f}'

def ass_head():
    return """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Anton,80,&H00FFFFFF,&H00FFFFFF,&H00100D12,&H96000000,0,0,0,0,100,100,1,0,1,6,3,8,70,70,{cap},1
Style: Hook,Anton,{hooksize},&H0021B3E8,&H00FFFFFF,&H00100D12,&H96000000,0,0,0,0,100,100,1,0,1,7,4,8,60,300,{hooky},1
Style: Kick,Oswald,40,&H00FFFFFF,&H00FFFFFF,&H00100D12,&H96000000,1,0,0,0,100,100,3,0,1,4,0,8,60,300,{kicky},1
Style: Pill,Oswald,46,&H00141018,&H00FFFFFF,&H0021B3E8,&H0021B3E8,1,0,0,0,100,100,2,0,3,10,0,8,60,300,{pilly},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

def write_ass(path, ev, dur, cap, hook=None, kicker='', title=None, pill=None, hooksize=92):
    h = ass_head().format(cap=cap, hooksize=hooksize, hooky=262, kicky=300 if hook is None else 330, pilly=395)
    L = []
    if hook:
        L.append(f'Dialogue: 2,{ts(0)},{ts(2.6)},Hook,,0,0,0,,{{\\fad(0,250)}}{hook}')
        L.append(f'Dialogue: 1,{ts(2.6)},{ts(dur)},Kick,,0,0,0,,{{\\fad(250,0)}}{kicker}')
    if title:
        L.append(f'Dialogue: 1,{ts(0)},{ts(dur)},Kick,,0,0,0,,{{\\fs58\\fnAnton\\b0}}{title}')
        L.append(f'Dialogue: 1,{ts(0)},{ts(dur)},Pill,,0,0,0,, {pill} ')
    if os.environ.get('BANDCAPS'):
      for a, b, t in ev: L.append(f'Dialogue: 0,{ts(a)},{ts(b)},Cap,,0,0,0,,{t}')
    open(path, 'w').write(h + '\n'.join(L) + '\n')

def ffcmd(segs, ass, body, panel):
    """panel: ('reel', dx) 4:3 crop at y 500, or ('ig',) full 16:9 at y 656"""
    ins, fl, n = [], [], len(segs)
    for j, sg in enumerate(segs):
        act, t0, t1 = sg[:3]; dx = sg[3] if len(sg) > 3 else 160
        ins += ['-ss', f'{OFF[act] + t0:.3f}', '-t', f'{t1 - t0:.3f}', '-i', FULL]
        ins += ['-ss', f'{OFF[act] + t0:.3f}', '-t', f'{t1 - t0:.3f}', '-i', FULL]
        d = t1 - t0
        cin = j > 0 and segs[j-1][0] == act and abs(segs[j-1][2] - t0) < 0.02
        cout = j < len(segs) - 1 and segs[j+1][0] == act and abs(segs[j+1][1] - t1) < 0.02
        fi = '' if cin else ',afade=t=in:d=0.12'; fo = '' if cout else f',afade=t=out:st={d-0.25:.3f}:d=0.25'
        if panel[0] == 'reel':
            cw = 1600; x = max(0, min(1920 - cw, (1920 - cw)//2 + dx))
            fl.append(f'[{2*j}:v]fps=24,setpts=PTS-STARTPTS,format=yuv420p,split[s{j}][t{j}];[t{j}]crop={cw}:1080:{x}:0,scale=1080:{round(1080*1080/cw)//2*2}[p{j}]')
        else:
            fl.append(f'[{2*j}:v]fps=24,setpts=PTS-STARTPTS,format=yuv420p,split[s{j}][t{j}];[t{j}]scale=1080:608[p{j}]')
        fl.append(f'[{2*j+1}:a]asetpts=PTS-STARTPTS,aresample=48000{fi}{fo}[a{j}]')
    fl.append(''.join(f'[s{j}][p{j}][a{j}]' for j in range(n)) + f'concat=n={n}:v=2:a=1[cv][fg][ca]')
    fl.append('[cv]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=28:2,eq=brightness=-0.28:saturation=0.8[bg]')
    if panel[0] == 'reel': hh = round(1080*1080/1600)//2*2; y0 = 500
    else: y0, hh = 656, 608
    fl.append(f'[bg][fg]overlay=0:{y0},drawbox=x=0:y={y0-5}:w=1080:h=5:color=0xE8B321:t=fill,drawbox=x=0:y={y0+hh}:w=1080:h=5:color=0xE8B321:t=fill,'
              f"subtitles={ass}:fontsdir={REPO}/engine/fonts[vo]")
    fl.append('[ca]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[ao]')
    return ['nice', '-n', '10', 'ffmpeg', '-y', '-loglevel', 'error'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[vo]', '-map', '[ao]',
            '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', body]

def S(a, b=None): b = b or a; sa, sb = shots[a], shots[b]; assert sa['act'] == sb['act']; return (sa['act'], sa['s'], sb['e'])
def first_sentence(k):
    ss = sentences(k); b = ss[0][1][1]; sh = shots[k]; nx = ss[1][1][0] - 0.08 if len(ss) > 1 else sh['e']
    return (sh['act'], sh['s'], min(b + 0.45, nx, sh['e']))

REELS = json.load(open(f'{W}/reels.json'))
def segs_of(r):
    out = []
    for sg in r['segs']:
        if sg[0] == 'first': out.append(first_sentence(sg[1]))
        elif sg[0] == 'upto': f = first_sentence(sg[2]); out.append((f[0], shots[sg[1]]['s'], f[2]))
        else:
            dx = sg[2] if len(sg) > 2 else 0; out.append(S(sg[0], sg[1] if len(sg) > 1 and sg[1] else None) + ((dx,) if len(sg) > 2 else ()))
    return out

if __name__ == '__main__':
    jobs = []
    for r in REELS:
        sg = segs_of(r); ev, dur = caption_events(sg, 22); n = f"CAE_Reel_{r['n']:02d}"
        ass = f'{W}/{n}.ass'; write_ass(ass, ev, dur, 1395, hook=r['hook'], kicker='THE IDES OF MARCH · ROME, 44 BC', hooksize=r.get('hooksize', 84))
        body = f'{W}/{n}_body.mp4'
        c = ffcmd(sg, ass, body, ('reel', r.get('dx', 0)))
        brand = f"nice -n 10 bash {REPO}/tools/reel_brand.sh {body} {OUT}/reels/{n}.mp4 'THE IDES OF MARCH'"
        jobs.append((n, dur, ' '.join(f"'{x}'" if (' ' in x or ';' in x or '[' in x) else x for x in c) + ' && ' + brand))
    IG = json.load(open(f'{W}/ig.json'))
    for p in IG:
        # global range -> act-local segments
        g0, g1 = p['g0'], p['g1']; sg = []
        for i in range(NA):
            a, b = max(g0, OFF[i]), min(g1, OFF[i] + VDUR[i])
            if b - a > 0.05: sg.append((i, a - OFF[i], b - OFF[i]))
        ev, dur = caption_events(sg, 24); n = f"CAE_Part_{p['n']:02d}"
        ass = f'{W}/{n}.ass'; write_ass(ass, ev, dur, 1330, title='THE IDES OF MARCH', pill=f"PART {p['n']} OF {len(IG)}")
        body = f'{W}/{n}_body.mp4'; c = ffcmd(sg, ass, body, ('ig',))
        if p['n'] < len(IG): brand = f"nice -n 10 bash {REPO}/tools/ig_brand.sh {body} {OUT}/ig_parts/{n}.mp4 'WATCH PART {p['n']+1}' 'ON THIS PAGE'"
        else: brand = f"nice -n 10 bash {REPO}/tools/reel_brand.sh {body} {OUT}/ig_parts/{n}.mp4 'THE IDES OF MARCH'"
        jobs.append((n, dur, ' '.join(f"'{x}'" if (' ' in x or ';' in x or '[' in x) else x for x in c) + ' && ' + brand))
    os.makedirs(f'{W}/jobs', exist_ok=True)
    for n, dur, cmd in jobs:
        open(f'{W}/jobs/{n}.sh', 'w').write('set -e\n' + cmd + '\n'); print(n, round(dur, 1))
