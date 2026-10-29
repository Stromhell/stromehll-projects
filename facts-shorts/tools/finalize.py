# Gather a finished short into its batch folder: render, cover, README with script, sources and post copy.
# Usage: python3 finalize.py BATCH_DIR ID
import sys, json, os, shutil, subprocess
B, sid = sys.argv[1], sys.argv[2]
R = os.path.dirname(os.path.abspath(__file__)) + '/../remotion'
d = f'{B}/{sid}'; p = json.load(open(f'{B}/posts.json'))[sid]
os.makedirs(f'{d}/render', exist_ok=True); os.makedirs(f'{d}/thumbnail', exist_ok=True)
shutil.copy(f'{R}/out/{sid}-1080p.mp4', f'{d}/render/{sid}-1080p.mp4')
shutil.copy(f'{R}/out/thumbs/Th{sid.replace("-", "")}.png', f'{d}/thumbnail/{sid}-cover-1080x1920.png')
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{d}/render/{sid}-1080p.mp4']).decode())
script = open(f'{d}/script.txt').read().strip(); n = sid.split('-')[0]
src = '\n'.join(f'- {s}' for s in p['sources'])
desc = f"{p['hook']}\n{p['body']}\nSources: {'; '.join(s.split(' http')[0] for s in p['sources']).rstrip('.?!')}.\nFull videos on our channel: Stormi Explain Everything\n{p['tags']}"
open(f'{d}/README.md', 'w').write(f"""# Facts Short {n} · {p['title']}

Category: {p['category']} · Length {dur:.1f} s (voice + end card) · 1080x1920, 60 fps
Made fully in-house: drawings and animation in code (Remotion), voice = Pushpam's cloned voice (Chatterbox, local),
music and sound effects composed in code. ElevenLabs credits used: none.

## Idea
{p['idea']}

## Voiceover ({len(script.split())} words)
{script}

## Sources
{src}

## Post copy
**Title:** {p['title']}
**Description:**
{desc}

Files: `render/` (1080p MP4), `thumbnail/` (Shorts cover 1080x1920), `vo.wav` + `words.json` (voice and word times),
source code in `../../remotion/src/shorts/{sid}/`.
""")
open(f'{d}/description.txt', 'w').write(desc + '\n')
print(sid, f'{dur:.1f}s')
