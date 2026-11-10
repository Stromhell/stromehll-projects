import json,base64,io,html,subprocess
from PIL import Image
R='caesar-ides-of-march/05-production/reels'
ids={}
for l in open('/home/user/work/cae_release/drive_ids.txt'):
    p=l.split()
    if len(p)==2: ids[p[1].split('/')[-1]]=p[0]
def img(path,w):
    im=Image.open(path).convert('RGB'); im=im.resize((w,int(im.height*w/im.width)))
    b=io.BytesIO(); im.save(b,'JPEG',quality=78); return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]).decode())
def mmss(s): return f"{int(s//60)}:{int(s%60):02d}"
dl=lambda i:f"https://drive.google.com/file/d/{i}/view"
e=html.escape
reels=json.load(open(f'{R}/reels.json')); rc=json.load(open(f'{R}/reels_copy.json'))
parts=json.load(open(f'{R}/ig.json')); pc=json.load(open(f'{R}/ig_parts_copy.json'))
yt=open(f'{R}/CAE_Full_YouTube.md').read()
title=yt.split('## Title')[1].split('```')[1].strip()
desc=yt.split('## Description')[1].split('```')[1].strip()
tags=yt.split('## Tags')[1].split('```')[1].strip()
thumb=img('caesar-ides-of-march/05-production/launch/thumb/CAE_Thumbnail_v1.jpg',960)
def card(kind,n,t,d,hook=None):
    nm=f"CAE_{kind}_{n:02d}"; f=f"/home/user/work/cae_release/{'reels' if kind=='Reel' else 'ig_parts'}/{nm}.mp4"
    cov=img(f"/home/user/work/cae_release/covers/{nm}_thumb.png",300)
    hk=f'<span class="hook">Hook: {e(hook.replace(chr(92)+"N"," "))}</span>' if hook else ''
    return f'''<article class="card"><a class="cov" href="{dl(ids[nm+'.mp4'])}" target="_blank" rel="noopener"><img src="{cov}" alt="Cover for {e(t)}" loading="lazy"><span class="play">Play {mmss(dur(f))}</span></a>
<div class="meta"><span class="num">{kind.replace('Reel','Reel').upper()} {n:02d}</span>{hk}<h3>{e(t)}</h3><p class="desc">{e(d)}</p></div></article>'''
rcards=''.join(card('Reel',r['n'],c['title'],c['desc'],r['hook']) for r,c in zip(reels,rc))
pcards=''.join(card('Part',p['n'],c['title'],c['caption']) for p,c in zip(parts,pc))
page=f'''<title>Ides of March Launch Kit</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Source+Sans+3:wght@400;600&family=Oswald:wght@500&display=swap">
<style>
/* Layout: a dark Curia hall. Long video up top as the hero, then reels and IG parts as cover grids. Single dark look on purpose. */
:root{{--bg:#140f0b;--panel:#1e1712;--line:#3a2c20;--fg:#efe4d2;--mute:#b3a28a;--gold:#e0ad3b;--wine:#8e2a2a;
--display:"Marcellus","Trajan Pro",Georgia,serif;--body:"Source Sans 3","Segoe UI",system-ui,sans-serif;--label:"Oswald","Arial Narrow",sans-serif;color-scheme:dark}}
body{{background:var(--bg);color:var(--fg);font:16px/1.55 var(--body)}}
.wrap{{max-width:1180px;margin:0 auto;padding-block:32px 64px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:48px}}
.eyebrow,.num{{font:500 13px/1 var(--label);letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}}
h1{{font:400 clamp(30px,5vw,52px)/1.08 var(--display);margin:8px 0 6px;text-wrap:balance}}
h2{{font:400 28px/1.2 var(--display);margin:0;text-wrap:balance}}
h3{{font:600 17px/1.3 var(--body);margin:6px 0 4px}}
.status{{display:inline-flex;gap:8px;align-items:center;background:var(--wine);color:var(--fg);font:500 13px/1 var(--label);letter-spacing:.08em;text-transform:uppercase;padding:8px 12px;border-radius:3px}}
.hero{{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:28px;align-items:start}}
.hero img{{width:100%;border:1px solid var(--line);display:block}}
.hero .txt{{min-width:0;display:grid;gap:12px}}
.btn{{justify-self:start;background:var(--gold);color:#1a120a;font:600 15px/1 var(--body);padding:11px 16px;border-radius:3px;text-decoration:none}}
.btn:focus-visible,.cov:focus-visible{{outline:2px solid var(--gold);outline-offset:3px}}
details{{border-top:1px solid var(--line);padding-top:10px}} summary{{cursor:pointer;color:var(--mute);font:500 14px var(--label);letter-spacing:.06em;text-transform:uppercase}}
pre{{white-space:pre-wrap;font:14px/1.5 var(--body);color:var(--fg);margin:10px 0 0}}
.sec{{display:grid;gap:18px}} .sec .lead{{color:var(--mute);margin:0;max-width:65ch}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:22px}}
.card{{display:grid;gap:10px;align-content:start;min-width:0}}
.cov{{position:relative;display:block;aspect-ratio:9/16;max-width:100%;overflow:hidden;border:1px solid var(--line);background:var(--panel)}}
.cov img{{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}}
.cov:hover img{{transform:scale(1.03)}}
.play{{position:absolute;left:8px;bottom:8px;background:rgba(10,7,5,.82);color:var(--fg);font:500 12px/1 var(--label);letter-spacing:.08em;padding:6px 8px;border-radius:2px}}
.meta{{min-width:0}} .hook{{display:block;color:var(--mute);font-size:13px;margin-top:4px}}
.desc{{white-space:pre-line;color:var(--mute);font-size:14px;margin:0}}
@media (max-width:760px){{.hero{{grid-template-columns:1fr}}}}
@media (prefers-reduced-motion:reduce){{.cov img{{transition:none}}}}
</style>
<div class="wrap">
<header><span class="eyebrow">Stormi Explain Everything · 3D · Rome, 15 March 44 BC</span><h1>The Ides of March launch kit</h1>
<span class="status">Not scheduled · waiting for Pushpam's OK on the full video</span></header>
<section class="hero"><img src="{thumb}" alt="YouTube thumbnail: 60 men, 1 target, Caesar">
<div class="txt"><span class="eyebrow">Long video · YouTube · 10:15 · -14 LUFS</span><h2>{e(title)}</h2>
<a class="btn" href="{dl('1TUUS83GiOfeyN3HgmfkyBGKm9vzAO-Kb')}" target="_blank" rel="noopener">Watch the full video</a>
<p class="lead" style="color:var(--mute);margin:0">Planned slot: 25 Feb 2027, 16:00 UTC (next free long-video day, one long video every 4 days).</p>
<details open><summary>Description and chapters</summary><pre>{e(desc)}</pre></details>
<details><summary>Tags</summary><pre>{e(tags)}</pre></details></div></section>
<section class="sec"><span class="eyebrow">15 reels · Instagram Reels, YouTube Shorts, Facebook</span><h2>Reels</h2>
<p class="lead">Each reel is under 25 seconds and opens on the shock line. 1080×1920, Stormi logo top-right, and a 3-second end card pointing to the full video. Tap a cover to play it on Drive.</p>
<div class="grid">{rcards}</div></section>
<section class="sec"><span class="eyebrow">7 parts · Instagram</span><h2>IG parts</h2>
<p class="lead">The whole video cut into seven parts at scene breaks. Each part ends on a "watch part N on this page" card. The last one points to YouTube.</p>
<div class="grid">{pcards}</div></section>
</div>'''
open('/tmp/claude-0/-home-user-stromehll-projects/516b557c-9e64-5039-8c4f-1c34a226674b/scratchpad/kit/ides-launch-kit.html','w').write(page)
print(len(page))