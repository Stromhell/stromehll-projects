# Print chapter start times (full video) per act, using the same segment maths as assemble_full.py
import json, subprocess, sys, os
sys.path.insert(0, 'gags'); from gags_data import G
SCR = os.environ.get('SCR', '/tmp/dp2work')
def dur(f): return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
t = 0; out = []
for n in range(19):
    v = f'{SCR}/acts/act{n:02d}.mp4'; a = f'{SCR}/mix/act{n:02d}.wav'; tot = round(min(dur(v), dur(a)) * 24)
    out.append((n, t / 24)); pts = [g for g in G if g['act'] == n]
    t += tot + sum(round(dur(f'gags/out/gag{g["id"]:02d}.mp4') * 24) for g in pts)
for n, s in out: print(n, f'{int(s // 60)}:{int(s % 60):02d}')
print('total', f'{int(t / 24 // 60)}:{int(t / 24 % 60):02d}')
