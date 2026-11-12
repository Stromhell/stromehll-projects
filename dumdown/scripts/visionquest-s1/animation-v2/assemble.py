# Build DumDown VisionQuest S1 FULL v2: acts (acts_v2/*.mp4) split at gag points, cutaway gags spliced in.
import json, subprocess, os, sys
sys.path.insert(0, '../gags'); from gags_data import G
ACTS = [('film', 0), ('ep1', 49.79), ('ep2', 212.79), ('ep3', 322.79), ('ep4', 436.79), ('ep5', 615.79), ('ep6', 726.5), ('ep7', 868.29), ('ep8', 989.71), ('epi', 1187.71)]
os.makedirs('pieces', exist_ok=True)
def dur(f): return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
def cut(src, a, b, out):
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{a:.4f}', '-i', src] + (['-t', f'{b - a:.4f}'] if b else []) + ['-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '24', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', out]
    subprocess.run(cmd, check=True)
seq = []
for i, (a, off) in enumerate(ACTS):
    src = f'acts_v2/{a}.mp4'; d = dur(src); end = ACTS[i + 1][1] if i + 1 < len(ACTS) else None
    pts = [g for g in G if g['at'] >= off and (end is None or g['at'] < end)]
    cuts = [0] + [round((g['at'] - off) * 24) / 24 for g in pts] + [None]
    for k in range(len(cuts) - 1):
        out = f'pieces/{a}_{k}.mp4'
        if cuts[k + 1] is None and k == 0: seq.append(src)
        else: cut(src, cuts[k], cuts[k + 1], out); seq.append(out)
        if k < len(pts): seq.append(f'../gags/out/gag{pts[k]["id"]:02d}.mp4')
    print(a, round(d, 2), len(pts), 'gags', flush=True)
open('concat_v2.txt', 'w').write(''.join(f"file '{os.path.abspath(f)}'\n" for f in seq))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', 'concat_v2.txt', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', 'DumDown_VisionQuest_S1_FULL_v2.mp4'], check=True)
print('full', dur('DumDown_VisionQuest_S1_FULL_v2.mp4'))
