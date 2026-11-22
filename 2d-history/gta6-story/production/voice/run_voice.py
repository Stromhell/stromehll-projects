import re, subprocess, os, glob, time, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from words import g6
src = open('/mnt/project-files/2d-dynamic/shared/voice_batch.py').read().split('os.chdir(')[0]; exec(src)
SPEAK = '/root/.claude/skills/synced/28996af7-eb85-4e49-9dd9-f273fd537747_5b2788dc-eca9-4918-911b-4b5aaf7c3164/pushpam-voice/scripts/speak.py'
V = os.path.dirname(os.path.abspath(__file__))
for i in range(10):
    txt = f'{V}/act{i}.txt'; out = f'{V}/act{i}'; os.makedirs(out, exist_ok=True)
    n = len([p for p in open(txt).read().split('\n\n') if p.strip()])
    if len(glob.glob(f'{out}/vo-*.wav')) >= n: continue
    say = f'{V}/act{i}.say.txt'; open(say, 'w').write(respell(g6(open(txt).read())))
    t0 = time.time()
    r = subprocess.run([PY, SPEAK, '--file', say, '--scenes', '--energy', '0.45', '--pace', '0.42', '--pause', '0.4', '--out', f'{out}/vo.wav'], capture_output=True, text=True, cwd='/tmp')
    print(i, 'rc', r.returncode, f'{time.time()-t0:.0f}s', (r.stdout + r.stderr)[-300:].replace('\n', ' | '), flush=True)
