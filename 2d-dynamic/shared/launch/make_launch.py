#!/usr/bin/env python3
"""Fill a launch text (title, backups, tags, description, chapters, sources) from VIDEO/launch/launch.json + the combine chapters json.
usage: python3 shared/launch/make_launch.py VIDEO_DIR CHAPTERS.json OUT.txt"""
import json, sys
V, CJ, OUT = sys.argv[1:4]
L = json.load(open(f'{V}/launch/launch.json')); C = json.load(open(CJ))
starts = {a['act']: a['start'] for a in C['acts']}
ch = []
for c in L['chapters']:  # [act, seconds into act, label]
    s = starts[c[0]] + c[1]; ch.append(f'{int(s // 60)}:{int(s % 60):02d} {c[2]}')
ch[0] = '0:00 ' + ch[0].split(' ', 1)[1]
txt = f"""Title: {L['title']}

Backups:
""" + ''.join(f'- {b}\n' for b in L['backups']) + f"""
Tags: {', '.join(L['tags'])}


Description:
{L['desc']}

Chapters
""" + '\n'.join(ch) + f"""

Sources: {L['sources']}

{L.get('note', '')}

{' '.join(L['hashtags'])}
"""
open(OUT, 'w').write(txt.replace('\n\n\n\n', '\n\n')); print(txt)
