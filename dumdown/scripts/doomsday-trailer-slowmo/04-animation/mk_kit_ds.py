# Launch kit page for the Doomsday 0.25x video, built from 06-launch/metadata_v1.md + thumbs (embedded small).
import base64, html, io, re
from PIL import Image
L = '/mnt/project-files/dumdown/scripts/doomsday-trailer-slowmo/06-launch/'
md = open(L + 'metadata_v1.md').read()
desc = md.split('## Description\n')[1].split('\n## Tags')[0].strip()
tags = md.split('## Tags\n')[1].split('\n## ')[0].strip()
pin = md.split('## Pinned first comment\n')[1].strip()
rows = re.findall(r'^\| (A \(recommended\)|B|C) \| (.+?) \| (\S+\.jpg): (.+?) \|$', md, re.M)
def b64(f):
    im = Image.open(L + f).convert('RGB').resize((640, 360)); b = io.BytesIO(); im.save(b, 'JPEG', quality=82); return base64.b64encode(b.getvalue()).decode()
e = html.escape
cards = ''.join(f'''<article class="opt{' rec' if 'rec' in k else ''}"><img src="data:image/jpeg;base64,{b64(f)}" alt="Thumbnail {k[0]}: {e(d)}"><div class="ob"><span class="lab">Option {k[0]}{' · recommended' if 'rec' in k else ''}</span><p class="tt" id="t{k[0]}">{e(t)}</p><p class="td">{e(d)}</p><button data-c="t{k[0]}">Copy title</button></div></article>''' for k, t, f, d in rows)
page = f'''<title>Doomsday 0.25x Launch Kit</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;600&display=swap">
<style>
/* Layout: one review column; thumbnail options as a 3-up grid, then copy-ready metadata blocks */
:root {{ --bg:#f6f5f8; --card:#ffffff; --fg:#1d1a22; --mut:#5d5868; --line:#dcd8e3; --accent:#3c8f4e; --tag:#ffd23d; --ink:#231a24;
 --fd:'Space Grotesk',system-ui,sans-serif; --fb:'Inter',system-ui,sans-serif; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --bg:#141218; --card:#1e1b24; --fg:#ece9f1; --mut:#a59fb0; --line:#34303c; --accent:#6fd387; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --bg:#141218; --card:#1e1b24; --fg:#ece9f1; --mut:#a59fb0; --line:#34303c; --accent:#6fd387; color-scheme:dark }}
body {{ background:var(--bg); color:var(--fg); font:15px/1.55 var(--fb); }}
.wrap {{ max-width:1080px; margin:0 auto; padding-block:28px 48px; padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px)); display:grid; gap:28px }}
h1 {{ font:700 clamp(26px,4vw,38px)/1.1 var(--fd); margin:0; text-wrap:balance }}
h2 {{ font:600 13px var(--fb); letter-spacing:.08em; text-transform:uppercase; color:var(--mut); margin:0 0 10px }}
.meta {{ display:flex; flex-wrap:wrap; gap:8px 18px; color:var(--mut) }} .meta b {{ color:var(--fg); font-variant-numeric:tabular-nums }}
.status {{ display:inline-block; background:var(--tag); color:var(--ink); font:600 12px var(--fb); padding:3px 10px; border-radius:4px; letter-spacing:.04em }}
.grid {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px }}
.opt {{ background:var(--card); border:1px solid var(--line); border-radius:10px; overflow:hidden; display:flex; flex-direction:column }}
.opt.rec {{ border:2px solid var(--accent) }} .opt img {{ display:block; width:100%; aspect-ratio:16/9; object-fit:cover }}
.ob {{ padding:12px 14px 14px; display:grid; gap:6px; flex:1; align-content:start }}
.lab {{ font:600 12px var(--fb); letter-spacing:.06em; text-transform:uppercase; color:var(--accent) }}
.tt {{ font:600 16px/1.3 var(--fd); margin:0 }} .td {{ margin:0; color:var(--mut); font-size:13px }}
section.box {{ background:var(--card); border:1px solid var(--line); border-radius:10px; padding:16px; min-width:0 }}
.head {{ display:flex; justify-content:space-between; align-items:center; gap:10px }}
pre {{ white-space:pre-wrap; word-break:break-word; margin:0; font:14px/1.6 var(--fb); }}
button {{ font:600 13px var(--fb); background:transparent; color:var(--fg); border:1px solid var(--line); border-radius:6px; padding:6px 12px; cursor:pointer; justify-self:start }}
button:hover {{ border-color:var(--accent) }} button:focus-visible {{ outline:2px solid var(--accent); outline-offset:2px }}
</style>
<div class="wrap">
<header style="display:grid;gap:10px"><span class="status">WAITING FOR YOUR OK</span><h1>Doomsday Final Trailer at 0.25x</h1>
<div class="meta"><span>Channel <b>DumDown</b></span><span>Length <b>15:13</b></span><span>Proposed slot <b>Sun 13 Dec, 16:00 UTC (9:30 PM IST)</b></span><span>Public · category 24 · not for kids</span></div></header>
<div><h2>Title + thumbnail</h2><div class="grid">{cards}</div></div>
<section class="box"><div class="head"><h2>Description (with chapters)</h2><button data-c="desc">Copy</button></div><pre id="desc">{e(desc)}</pre></section>
<section class="box"><div class="head"><h2>Tags</h2><button data-c="tags">Copy</button></div><pre id="tags">{e(tags)}</pre></section>
<section class="box"><div class="head"><h2>Pinned first comment</h2><button data-c="pin">Copy</button></div><pre id="pin">{e(pin)}</pre></section>
</div>
<script>
document.querySelectorAll('button[data-c]').forEach(b => b.addEventListener('click', () => {{ const el = document.getElementById(b.dataset.c), t = el.innerText;
 const done = () => {{ const o = b.textContent; b.textContent = 'Copied'; setTimeout(() => b.textContent = o, 1400); }};
 try {{ navigator.clipboard.writeText(t).then(done, () => sel(el)); }} catch (e) {{ sel(el); }} }}));
function sel(el) {{ const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }}
</script>'''
open(L + 'doomsday-slowmo-launch-kit-v1.html', 'w').write(page); print(len(rows), len(page))
