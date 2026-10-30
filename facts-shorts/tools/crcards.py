# crcards.py BATCH_DIR OUT_DIR [note]: Control Room fs-* card per short, phases read from the files on disk.
# Writes OUT_DIR/<doc_id>.json (Control Room 'external' docs) + OUT_DIR/writes.json (batch entries, versions from OUT_DIR/versions.json).
import sys, json, os, time, glob
B, O = sys.argv[1], sys.argv[2]; note = sys.argv[3] if len(sys.argv) > 3 else ''
R = os.path.dirname(os.path.abspath(__file__)) + '/../remotion'
QA = os.environ.get('QA_DIR', '')
os.makedirs(O, exist_ok=True); P = json.load(open(f'{B}/posts.json')); now = int(time.time())
vers = json.load(open(f'{O}/versions.json')) if os.path.exists(f'{O}/versions.json') else {}
done = lambda *f: all(os.path.exists(x) for x in f)
writes = []
for sid, p in P.items():
    d = f'{B}/{sid}'; real = done(f'{R}/src/shorts/{sid}/timing.ts') and 'ESTIMATE' not in open(f'{R}/src/shorts/{sid}/timing.ts').read()
    mp4 = f'{R}/out/{sid}-1080p.mp4'; qa = QA and done(f'{QA}/{sid[:2]}.ok')
    ph = [
        ('script', 'Script + 2 sources', 100, 'done'),
        ('vo', 'Narration (your voice)', 100 if done(f'{d}/words.json') else 30, 'done' if done(f'{d}/words.json') else 'active'),
        ('anim', 'Animation code + layout check', 100 if real else 70, 'done' if real else 'active'),
        ('render', '1080p render', 100 if done(mp4) else 0, 'done' if done(mp4) else ('active' if real else 'todo')),
        ('qa', 'Watch-skill glitch check', 100 if qa else 0, 'done' if qa else ('active' if done(mp4) else 'todo')),
        ('thumb', 'Cover, title, caption', 100 if done(f'{d}/thumbnail') else 0, 'done' if done(f'{d}/thumbnail') else 'todo'),
        ('deliver', 'GitHub + Drive, sent for booking', 100 if done(f'{d}/drive.jsonl') else 0, 'done' if done(f'{d}/drive.jsonl') else 'todo'),
    ]
    pct = round(sum(x[2] for x in ph) / len(ph)); cur = next((x[1] for x in ph if x[3] != 'done'), 'Ready to book')
    stage = 'Ready to book: waiting for Production plan to give it a slot.' if pct == 100 else f'Now: {cur}.'
    doc = {'format': 'Short', 'short': p['name'], 'title': p['title'], 'status': 'review' if pct == 100 else 'working', 'pct': pct,
           'stage': stage + (' ' + note if note else ''), 'asOf': now, 'batch': os.path.basename(B.rstrip('/')),
           'phases': [{'key': k, 'name': n, 'pct': c, 'state': s} for k, n, c, s in ph], 'previews': [],
           'latest': {'at': now, 'text': stage}}
    did = f'fs-{sid}'; json.dump(doc, open(f'{O}/{did}.json', 'w'), indent=1)
    w = {'op': 'set', 'collection': 'external', 'doc_id': did, 'file_path': f'{O}/{did}.json'}
    if did in vers: w['if_version'] = vers[did]
    writes.append(w)
json.dump(writes, open(f'{O}/writes.json', 'w'), indent=1); print(json.dumps(writes))
