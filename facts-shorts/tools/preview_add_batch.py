# Add a batch section to preview/index.html.  usage: preview_add_batch.py BATCH_DIR BLOBS_JSON "Section title" "small note"
import sys, json, html, re
B, BL, title, note = sys.argv[1:5]
p = json.load(open(f'{B}/posts.json')); bl = json.load(open(BL))
f = 'preview/index.html'; s = open(f).read()
cards = []
for sid, x in p.items():
    if sid not in bl: continue
    n = sid.split('-')[0]; v, c = bl[sid]; e = html.escape
    desc = open(f'{B}/{sid}/description.txt').read().strip()
    cards.append(f'''<article class="card" id="s{n}">
<div class="phone"><video controls playsinline preload="none" poster="{c}" src="{v}"></video></div>
<div class="meta"><div class="row"><span class="slot">Booking soon</span><span class="cat">{e(x['category'])}</span><span class="no">#{n}</span></div>
<h3>{e(x['title'])}</h3><p class="idea">{e(x['idea'])}</p>
<details><summary>Caption</summary><pre id="c{n}">{e(desc)}</pre><button type="button" data-copy="c{n}">Copy caption</button></details></div></article>''')
sec = f'<section class="day" id="{B.split("/")[-1]}"><h2><span>{e(title)}</span><small>{e(note)}</small></h2><div class="grid">' + ''.join(cards) + '</div></section>\n'
s = re.sub(r'<section class="day" id="' + re.escape(B.split('/')[-1]) + r'">.*?</section>\n', '', s, flags=re.S)
s = s.replace('</div>\n<script>', sec + '</div>\n<script>', 1)
open(f, 'w').write(s); print(len(cards), 'cards')
