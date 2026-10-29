#!/usr/bin/env python3
"""Join a video's finished acts (act0..actN) into one full video and print chapter times.
usage: python3 shared/combine.py VIDEO_DIR OUT.mp4"""
import sys, os, json, subprocess
V, OUT = sys.argv[1], sys.argv[2]
acts = sorted(int(d[3:]) for d in os.listdir(f'{V}/production/acts') if d.startswith('act') and d[3:].isdigit())
files = [f'{V}/production/acts/act{a}/act{a}.mp4' for a in acts]
dur = lambda f: float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))
t, chap = 0.0, []
for a, f in zip(acts, files):
    chap.append((a, t)); t += dur(f)
inp = sum([['-i', f] for f in files], [])
fc = ''.join(f'[{i}:v:0][{i}:a:0]' for i in range(len(files))) + f'concat=n={len(files)}:v=1:a=1[v][a]'
subprocess.run(['ffmpeg', '-y', '-v', 'error', *inp, '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', OUT], check=True)
json.dump({'acts': [{'act': a, 'start': round(s, 2)} for a, s in chap], 'dur': round(t, 2)}, open(OUT.rsplit('.', 1)[0] + '_chapters.json', 'w'), indent=1)
for a, s in chap: print(f'{int(s // 60)}:{int(s % 60):02d} act{a}')
print('TOTAL', round(t, 1))
