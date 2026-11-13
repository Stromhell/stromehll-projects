# Assemble the Loki S1+S2 full video in ONE encode pass (CFR 24 fps): act videos + their mixes, gags spliced in at their act points.
# Then a second audio-only pass applies measured two-pass loudnorm (video stream copied).
import json, subprocess, sys, os
sys.path.insert(0, 'gags'); from gags_data import G
SCR = '/tmp/claude-0/-home-user/acf60ddd-1269-5955-894d-60b48246689c/scratchpad/loki'
OUT = f'{SCR}/full/DumDown_Loki_S1S2_FULL_v1.mp4'; os.makedirs(f'{SCR}/full', exist_ok=True)
def dur(f): return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
inputs, segs = [], []
def inp(v, a=None):
    inputs.extend(['-i', v] + (['-i', a] if a else [])); return len(inputs) // 2 - (2 if a else 1)
for n in range(15):
    v = f'{SCR}/acts/act{n:02d}.mp4'; a = f'{SCR}/mix/act{n:02d}.wav'; d = min(dur(v), dur(a)); iv = inp(v, a); ia = iv + 1
    pts = sorted([g for g in G if g['act'] == n], key=lambda g: g['at']); cuts = [0] + [round(g['at'] * 24) / 24 for g in pts] + [round(d * 24) / 24]
    for k in range(len(cuts) - 1):
        segs.append((iv, ia, cuts[k], cuts[k + 1]))
        if k < len(pts): gi = inp(f'gags/out/gag{pts[k]["id"]:02d}.mp4'); segs.append((gi, gi, None, None))
fc = []
for j, (iv, ia, a, b) in enumerate(segs):
    if a is None: fc.append(f'[{iv}:v]fps=24,scale=1920:1080,setsar=1,setpts=PTS-STARTPTS[v{j}];[{ia}:a]aresample=48000,aformat=channel_layouts=stereo,asetpts=PTS-STARTPTS[a{j}]')
    else: fc.append(f'[{iv}:v]trim=start={a:.4f}:end={b:.4f},fps=24,setpts=PTS-STARTPTS[v{j}];[{ia}:a]atrim=start={a:.4f}:end={b:.4f},aresample=48000,aformat=channel_layouts=stereo,asetpts=PTS-STARTPTS[a{j}]')
fc.append(''.join(f'[v{j}][a{j}]' for j in range(len(segs))) + f'concat=n={len(segs)}:v=1:a=1[v][a]')
open(f'{SCR}/full/fc.txt', 'w').write(';\n'.join(fc))
tmp = f'{SCR}/full/_pass1.mp4'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + inputs + ['-filter_complex_script', f'{SCR}/full/fc.txt', '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '24', '-fps_mode', 'cfr', '-g', '48',
                '-c:a', 'pcm_s16le', tmp.replace('.mp4', '.mkv')], check=True)
tmp = tmp.replace('.mp4', '.mkv')
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
ln = f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-map', '0:v', '-map', '0:a', '-c:v', 'copy', '-af', ln + ',aresample=48000', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', OUT], check=True)
print('full', dur(OUT), len(segs), 'segments')
