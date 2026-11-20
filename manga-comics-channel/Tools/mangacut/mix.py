#!/usr/bin/env python3
"""Mix VO + music bed (ducked under VO) + SFX hits from a mangacut timeline, mux onto the video.
Usage: python3 mix.py video.mp4 out.mp4 --vo vo.wav --music bed.wav [--vo-offset 0] [--sfx-dir DIR]
SFX names in the timeline (whoosh, pop, hit, riser, stamp...) map to DIR/<name>.wav.
Levels: VO -16 LUFS-ish, music ~-14 dB under VO with sidechain ducking, SFX -8 dB."""
import argparse, json, os, subprocess
ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('out')
ap.add_argument('--vo', required=True); ap.add_argument('--music', required=True)
ap.add_argument('--vo-offset', type=float, default=0.0)
ap.add_argument('--sfx-dir', default='/mnt/project-files/2d-dynamic/shared/sfx')
a = ap.parse_args()
tl = json.load(open(os.path.splitext(a.video)[0] + '.timeline.json'))
dur = tl[-1]['start'] + tl[-1]['dur']
inputs = ['-i', a.video, '-i', a.vo, '-stream_loop', '-1', '-i', a.music]
fc = [f"[1:a]aresample=48000,adelay={int(a.vo_offset*1000)}|{int(a.vo_offset*1000)},apad,atrim=0:{dur},volume=1.0,asplit=2[vo][sc]",
      f"[2:a]aresample=48000,atrim=0:{dur},volume=0.32[mus]",
      "[mus][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[bed]"]
mixins = ['[vo]', '[bed]']; n = 3
for s in tl:
    if not s.get('sfx'): continue
    f = os.path.join(a.sfx_dir, s['sfx'] + '.wav')
    if not os.path.exists(f): continue
    inputs += ['-i', f]; ms = int(s['start'] * 1000)
    fc.append(f"[{n}:a]aresample=48000,volume=0.4,adelay={ms}|{ms}[s{n}]"); mixins.append(f'[s{n}]'); n += 1
fc.append(''.join(mixins) + f"amix=inputs={len(mixins)}:normalize=0,atrim=0:{dur},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]")
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inputs, '-filter_complex', ';'.join(fc), '-map', '0:v', '-map', '[a]',
                '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', a.out], check=True)
print('mixed', a.out)
