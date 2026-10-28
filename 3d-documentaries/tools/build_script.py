"""Turn a compact shot file into: shot table markdown, shots.json, and per-act VO tsv files.
Usage: python3 build_script.py shots.txt out_dir CODE
Shot line: id|TYPE|narration|on screen|motion|sfx|date tag|overlay
Act line:  # ACT n | NAME | PERIOD | emblem
"""
import json, sys, os, re
src, out, code = sys.argv[1], sys.argv[2], sys.argv[3]
WPS = 150/60.0  # words per second at 150 wpm
acts, cur = [], None
for line in open(src, encoding='utf-8'):
    line = line.rstrip('\n')
    if not line.strip(): continue
    if line.startswith('# ACT'):
        n, name, period, emblem = [x.strip() for x in line[2:].split('|')]
        cur = dict(act=int(n.split()[1]), name=name, period=period, emblem=emblem, shots=[])
        acts.append(cur); continue
    p = [x.strip() for x in line.split('|')]
    p += [''] * (8 - len(p))
    sid, typ, narr, screen, motion, sfx, date, ov = p[:8]
    words = len(narr.split())
    secs = round(max(3.0, words / WPS + 0.6), 1)
    cur['shots'].append(dict(id=sid, type=typ, narration=narr, onScreen=screen, motion=motion,
                             sfx=sfx, dateTag=date, overlay=ov, words=words, seconds=secs))
os.makedirs(os.path.join(out, 'voice', 'scripts'), exist_ok=True)
total_w = sum(s['words'] for a in acts for s in a['shots'])
total_s = sum(s['seconds'] for a in acts for s in a['shots'])
nshots = sum(len(a['shots']) for a in acts)
maps = sum(1 for a in acts for s in a['shots'] if s['type'] == 'MAP')
def mmss(t): return f"{int(t//60)}:{int(t%60):02d}"
md = []
md.append(f"**Runtime (estimate):** {mmss(total_s)} · **Narration:** {total_w} words at 150 wpm · **Shots:** {nshots} · **Average shot:** {total_s/nshots:.1f} s · **Map shots:** {maps} ({100*maps/nshots:.0f}%)\n")
t0 = 0.0
for a in acts:
    at = sum(s['seconds'] for s in a['shots'])
    md.append(f"\n### Act {a['act']}: {a['name']} ({a['period']}) · {mmss(at)} · {len(a['shots'])} shots\n")
    md.append("| Shot | Time | Sec | Type | Narration | On screen | Motion | SFX | Date tag | Title / overlay |")
    md.append("|---|---|---|---|---|---|---|---|---|---|")
    t = 0.0
    for s in a['shots']:
        s['start'] = round(t, 1)
        md.append(f"| {s['id']} | {mmss(t)} | {s['seconds']} | {s['type']} | {s['narration']} | {s['onScreen']} | {s['motion']} | {s['sfx']} | {s['dateTag']} | {s['overlay']} |")
        t += s['seconds']
    with open(os.path.join(out, 'voice', 'scripts', f"act{a['act']}.tsv"), 'w', encoding='utf-8') as f:
        for s in a['shots']:
            if s['narration']:
                f.write(f"{s['id']}\t{s['narration']}\n")
    a['seconds'] = round(at, 1)
json.dump(dict(code=code, runtimeSec=round(total_s, 1), words=total_w, acts=acts),
          open(os.path.join(out, f"{code} - Script v1 shots.json"), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
open(os.path.join(out, 'shot_tables.md'), 'w', encoding='utf-8').write('\n'.join(md) + '\n')
print(md[0]); [print(f"Act {a['act']} {a['name']}: {mmss(a['seconds'])}") for a in acts]
