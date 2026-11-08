import json, html, subprocess
X='/home/user/work/xmas/release'; L=f'{X}/Launch'
full=json.load(open(f'{L}/full_copy.json')); rc=json.load(open(f'{L}/reels_copy.json')); ic=json.load(open(f'{L}/ig_parts_copy.json'))
R=json.load(open('/home/user/work/xmas/launch/reels.json'))
def dur(f):
    try: return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
    except Exception: return 0
def mmss(s): return f'{int(s//60)}:{int(s%60):02d}'
e=html.escape
reels=''
for c,r in zip(rc,R):
    n=c['id']; d=dur(f'{X}/reels/XM_Reel_{n:02d}.mp4')
    reels+=f'''<article class="reel"><div class="vids"><video src="media/r{n:02d}.mp4" poster="media/c{n:02d}.jpg" controls preload="none" playsinline></video></div>
<div class="meta"><div class="num">Reel {n:02d} · {mmss(d)}</div><h3>{e(c['title'])}</h3><div class="hook">Hook: {e(r['hook'].replace(chr(92)+'N',' '))}</div>
<details><summary>Description</summary><pre>{e(c['desc'])}</pre></details>
<a class="cov" href="media/c{n:02d}.jpg" target="_blank">Cover</a></div></article>'''
parts=''
for p in ic:
    n=p['n']; d=dur(f'{X}/ig_parts/XM_Part_{n:02d}.mp4')
    parts+=f'''<article class="part"><video src="media/p{n}.mp4" poster="media/pc{n}.jpg" controls preload="none" playsinline></video>
<div class="meta"><div class="num">Part {n} of {len(ic)} · {mmss(d)}</div><h3>{e(p['title'])}</h3><pre>{e(p['caption'])}</pre></div></article>'''
page=open('/home/user/work/xmas/pages/kit/template.html').read()
page=page.replace('{{TITLE}}',e(full['title'])).replace('{{DESC}}',e(full['desc'])).replace('{{TAGS}}',e(full['tags'])).replace('{{REELS}}',reels).replace('{{PARTS}}',parts).replace('{{FULLDUR}}',mmss(dur('/home/user/work/xmas/acts/full/XM_FULL.mp4')))
open('/home/user/work/xmas/pages/kit/index.html','w').write(page)
