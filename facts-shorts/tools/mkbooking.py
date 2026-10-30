# mkbooking.py BATCH_DIR "HEADER LINE" "INTRO" -> BATCH_DIR/booking.md from posts.json + <id>/drive.jsonl + <id>/description.txt
import sys, json, os
B, head, intro = sys.argv[1:4]
P = json.load(open(f'{B}/posts.json')); out = [f'# {head}', '', intro, '']
for sid, p in P.items():
    links = [json.loads(l) for l in open(f'{B}/{sid}/drive.jsonl')]
    vid = next(l['link'] for l in links if l['name'].endswith('.mp4')).split('?')[0]
    cov = next(l['link'] for l in links if l['name'].endswith('.png')).split('?')[0]
    out += [f'## {sid}', f'- Video: {vid}', f'- Cover: {cov}', f"- YouTube title: {p['title']}", '- Caption:', '', '```', open(f'{B}/{sid}/description.txt').read().strip(), '```', '']
open(f'{B}/booking.md', 'w').write('\n'.join(out)); print(len(P), 'entries')
