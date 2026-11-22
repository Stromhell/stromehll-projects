import subprocess, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from words import g6
src = open('/mnt/project-files/2d-dynamic/shared/voice_batch.py').read().split('os.chdir(')[0]; exec(src)
SPEAK = '/root/.claude/skills/synced/28996af7-eb85-4e49-9dd9-f273fd537747_5b2788dc-eca9-4918-911b-4b5aaf7c3164/pushpam-voice/scripts/speak.py'
V = os.path.dirname(os.path.abspath(__file__))
paras = [p for p in open(f'{V}/act9.txt').read().split('\n\n') if p.strip()]
for n in (11,):
    for take in ('b',):
        say = f'/tmp/claude-0/r9_{n}.txt'; open(say, 'w').write(respell(g6(paras[n-1])))
        r = subprocess.run([PY, SPEAK, '--file', say, '--energy', '0.45', '--pace', '0.42', '--out', f'{V}/act9/alt-{n:02d}{take}.wav'], capture_output=True, text=True, cwd='/tmp')
        print(n, take, r.returncode, (r.stdout + r.stderr)[-200:].replace('\n', ' | '), flush=True)
