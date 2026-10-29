#!/usr/bin/env python3
"""Build the storyboard: web page (index.html + img/), a PDF, and a Markdown copy.
Usage: build_storyboard.py <shots.json> <sketchDir> <outDir> <title>
"""
import html, json, os, sys
from PIL import Image, ImageDraw, ImageFont

src, sk, out, title = sys.argv[1:5]
d = json.load(open(src))
os.makedirs(out + '/img', exist_ok=True)
FONT = os.path.join(os.path.dirname(__file__), '../engine/fonts')

def esc(s): return html.escape(s or '')

# ---------- images ----------
shots = []
for a in d['acts']:
    for s in a['shots']:
        f = os.path.join(sk, s['id'] + '.jpg')
        if os.path.exists(f):
            Image.open(f).convert('RGB').resize((960, 540), Image.LANCZOS).save(f"{out}/img/{s['id']}.jpg", quality=72, optimize=True)
        shots.append((a, s))

# ---------- web page ----------
acts_html = []
for a in d['acts']:
    cards = []
    for s in a['shots']:
        tags = ''.join(f'<span class="tag">{esc(x)}</span>' for x in [s.get('dateTag'), s.get('overlay')] if x)
        cards.append(f'''<article class="shot" id="s{s['id'].replace('.', '-')}">
  <div class="frame"><img src="img/{s['id']}.jpg" alt="Sketch of shot {s['id']}: {esc(s['onScreen'])}" loading="lazy" width="960" height="540"><span class="sid">{s['id']}</span><span class="dur">{s['seconds']:.1f}s</span></div>
  <div class="notes">
    <p class="vo">“{esc(s['narration'])}”</p>
    <dl><dt>Frame</dt><dd>{esc(s['onScreen'])}</dd><dt>Motion</dt><dd>{esc(s['motion'])}</dd><dt>Sound</dt><dd>{esc(s.get('sfx'))}</dd></dl>
    {f'<div class="tags">{tags}</div>' if tags else ''}
  </div>
</article>''')
    acts_html.append(f'''<section class="act" id="act{a['act']}">
  <header class="acthead"><span class="actno">Act {a['act']}</span><h2>{esc(a['name'].title())}</h2><span class="period">{esc(a.get('period'))} · {a['seconds']/60:.1f} min · {len(a['shots'])} shots</span></header>
  <div class="grid">{''.join(cards)}</div>
</section>''')

nav = ''.join(f'<a href="#act{a["act"]}">{a["act"]} · {esc(a["name"].title())}</a>' for a in d['acts'])
total = sum(a['seconds'] for a in d['acts'])
page = f'''<title>{esc(title)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;600&family=Source+Serif+4:ital,wght@0,400;1,400&display=swap">
<style>
/* Layout: a production light-table. Acts as bands, shots as a 3-up grid of sketch + notes. */
:root {{ --bg:#efe8da; --paper:#faf6ee; --ink:#2b1e16; --muted:#6f6152; --line:#d6cbb6; --accent:#b8321f; --gold:#a8761a;
  --display:'Anton','Oswald',Impact,sans-serif; --label:'Oswald','Arial Narrow',sans-serif; --body:'Source Serif 4',Georgia,serif; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --bg:#17130f; --paper:#221c16; --ink:#efe6d6; --muted:#a89984; --line:#3a3128; --accent:#e0644c; --gold:#e3b04f; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --bg:#17130f; --paper:#221c16; --ink:#efe6d6; --muted:#a89984; --line:#3a3128; --accent:#e0644c; --gold:#e3b04f; color-scheme:dark }}
body {{ background:var(--bg); color:var(--ink); font-family:var(--body); font-size:15px; line-height:1.5; padding-left:max(16px, env(safe-area-inset-left,0px)); padding-right:max(16px, env(safe-area-inset-right,0px)); padding-block:0 64px }}
.top {{ max-width:1320px; margin:0 auto; padding-block:40px 20px; display:grid; gap:14px }}
.kicker {{ font-family:var(--label); letter-spacing:.14em; text-transform:uppercase; font-size:12px; color:var(--accent) }}
h1 {{ font-family:var(--display); font-weight:400; font-size:clamp(40px,7vw,84px); line-height:.95; margin:0; text-wrap:balance; letter-spacing:.01em }}
.meta {{ font-family:var(--label); color:var(--muted); font-size:14px; display:flex; flex-wrap:wrap; gap:6px 18px }}
.rules {{ max-width:70ch; color:var(--muted); margin:0 }}
nav {{ position:sticky; top:env(safe-area-inset-top,0px); z-index:5; background:var(--bg); border-bottom:1px solid var(--line); max-width:1320px; margin:0 auto; display:flex; gap:4px 16px; overflow-x:auto; padding-block:10px; font-family:var(--label); font-size:13px; white-space:nowrap }}
body::before {{ content:""; position:fixed; inset:0 0 auto; height:env(safe-area-inset-top,0px); z-index:10; background:var(--bg) }}
nav a {{ color:var(--muted); text-decoration:none }} nav a:hover, nav a:focus-visible {{ color:var(--accent); outline:none; text-decoration:underline }}
.act {{ max-width:1320px; margin:0 auto; padding-block:34px 8px }}
.acthead {{ display:flex; flex-wrap:wrap; align-items:baseline; gap:6px 16px; border-bottom:2px solid var(--ink); padding-bottom:8px; margin-bottom:18px }}
.actno {{ font-family:var(--label); text-transform:uppercase; letter-spacing:.14em; font-size:12px; color:var(--accent) }}
h2 {{ font-family:var(--display); font-weight:400; font-size:34px; margin:0; letter-spacing:.02em }}
.period {{ font-family:var(--label); color:var(--muted); font-size:13px; margin-left:auto }}
.grid {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(min(100%,380px),1fr)); gap:22px }}
.shot {{ background:var(--paper); border:1px solid var(--line); display:flex; flex-direction:column; min-width:0 }}
.frame {{ position:relative; aspect-ratio:16/9; max-width:100%; background:#d8d0c0 }}
.frame img {{ display:block; width:100%; height:100% ; object-fit:cover }}
.sid, .dur {{ position:absolute; top:8px; font-family:var(--label); font-weight:600; font-size:13px; padding:2px 8px; background:#2b1e16; color:#f7f1e4; font-variant-numeric:tabular-nums }}
.sid {{ left:8px }} .dur {{ right:8px; background:rgba(43,30,22,.75) }}
.notes {{ padding:14px 16px 16px; display:grid; gap:10px; min-width:0 }}
.vo {{ margin:0; font-style:italic; font-size:16px }}
dl {{ margin:0; display:grid; grid-template-columns:max-content 1fr; gap:4px 12px; font-size:14px }}
dt {{ font-family:var(--label); text-transform:uppercase; letter-spacing:.1em; font-size:11px; color:var(--muted); padding-top:3px }}
dd {{ margin:0; min-width:0 }}
.tags {{ display:flex; flex-wrap:wrap; gap:6px }}
.tag {{ font-family:var(--label); font-size:12px; border:1px solid var(--gold); color:var(--gold); padding:1px 8px }}
@media (prefers-reduced-motion: no-preference) {{ html {{ scroll-behavior:smooth }} }}
</style>
<header class="top">
  <span class="kicker">3D documentary · storyboard v1</span>
  <h1>{esc(title)}</h1>
  <div class="meta"><span>{len(shots)} shots</span><span>10 acts</span><span>≈ {total/60:.0f} min at script pace</span><span>Sketch frames from the 3D scenes; final renders are in colour</span></div>
  <p class="rules">Each panel is a sketch of the real 3D scene at about a third of the way through the shot, with the narration line, what is in frame, how the camera and characters move, and the sound. Violence is never shown: the raid uses silhouettes, flashes and cuts to black.</p>
</header>
<nav aria-label="Acts">{nav}</nav>
{''.join(acts_html)}
'''
open(out + '/index.html', 'w').write(page)

# ---------- markdown ----------
md = [f'# {title}', '', f'{len(shots)} shots, sketch frames in img/.', '']
for a in d['acts']:
    md += [f"## Act {a['act']} · {a['name'].title()} ({a.get('period','')})", '']
    for s in a['shots']:
        md += [f"### {s['id']} · {s['seconds']:.1f}s", f"![{s['id']}](img/{s['id']}.jpg)", '', f"> {s['narration']}", '',
               f"- **Frame:** {s['onScreen']}", f"- **Motion:** {s['motion']}", f"- **Sound:** {s.get('sfx','')}"]
        if s.get('dateTag') or s.get('overlay'): md.append(f"- **On-screen text:** {' · '.join(x for x in [s.get('dateTag'), s.get('overlay')] if x)}")
        md.append('')
open(out + '/storyboard.md', 'w').write('\n'.join(md))

# ---------- PDF (A4 landscape, 6 panels per page) ----------
W, H = 3508, 2480
fT = ImageFont.truetype(FONT + '/Anton-Regular.ttf', 90); fH = ImageFont.truetype(FONT + '/Oswald.ttf', 40); fB = ImageFont.truetype(FONT + '/Oswald.ttf', 30)
def wrap(dr, text, font, width):
    lines, cur = [], ''
    for w in (text or '').split():
        t = (cur + ' ' + w).strip()
        if dr.textlength(t, font=font) > width and cur: lines.append(cur); cur = w
        else: cur = t
    return lines + ([cur] if cur else [])
pages = []
for a in d['acts']:
    ss = a['shots']
    for p in range(0, len(ss), 6):
        pg = Image.new('RGB', (W, H), '#faf6ee'); dr = ImageDraw.Draw(pg)
        dr.text((120, 70), f"{title.upper()}  ·  ACT {a['act']}  {a['name']}", font=fT, fill='#2b1e16')
        for i, s in enumerate(ss[p:p + 6]):
            x = 120 + (i % 3) * 1110; y = 250 + (i // 3) * 1110
            f = f"{out}/img/{s['id']}.jpg"
            if os.path.exists(f): pg.paste(Image.open(f).resize((1040, 585)), (x, y))
            dr.rectangle([x, y, x + 1040, y + 585], outline='#2b1e16', width=4)
            dr.text((x, y + 600), f"{s['id']}  ·  {s['seconds']:.1f}s", font=fH, fill='#b8321f')
            ty = y + 655
            for lab, txt in [('VO', s['narration']), ('FRAME', s['onScreen']), ('MOTION', s['motion'])]:
                for j, ln in enumerate(wrap(dr, txt, fB, 900)[:3]):
                    if j == 0: dr.text((x, ty), lab, font=fB, fill='#6f6152')
                    dr.text((x + 140, ty), ln, font=fB, fill='#2b1e16'); ty += 40
        pages.append(pg)
pages[0].save(out + '/storyboard.pdf', save_all=True, append_images=pages[1:], resolution=300)
print('ok', len(shots), 'shots,', len(pages), 'pdf pages')
