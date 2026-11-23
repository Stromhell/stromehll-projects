# GED launch kit page for any episode (from the Ep 2 kit layout).
# Usage: python3 ged_kit.py EP VIDEO_URL VIDEO_NAME "QUOTE" "SLOT_UTC" "SLOT_IST" FRAME_IMG OUT.html
import base64, re, sys, subprocess, os
ep, url, vname, quote, slot, ist, frame, out = sys.argv[1:9]
B=f'/mnt/project-files/manga-comics-channel/Videos/06 Greatest Estate Developer/Ep {int(ep):02d}/06 Launch'
SRC='/mnt/project-files/manga-comics-channel/Videos/02 Demon Slayer Full Story/06 Launch/DS_Full_launch_kit_ES_v2.html'
h=open(SRC).read()
mds=sorted(f for f in os.listdir(B) if re.match(rf'GED{ep}_launch_ES_v\d+\.md',f))
md=open(f'{B}/{mds[-1]}').read()
thumb=re.search(r'Main: (\S+)',md).group(1)
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'/tmp/claude-0/ged/render/{vname}.mp4']).decode())
L=f'{int(dur//60)}:{int(dur%60):02d}'
title=re.search(r'## Título.*?\n(.+)\n',md).group(1).strip()
desc=re.search(r'## Descripción\n(.*?)\n## Etiquetas',md,re.S).group(1).strip()
tags=re.search(r'## Etiquetas.*?\n(.+)\n',md).group(1).strip()
pin=re.search(r'## Comentario fijado\n(.+)',md).group(1).strip()
b=lambda p: base64.b64encode(open(p,'rb').read()).decode()
def jpg(p):
    if p.endswith('.jpg'): return b(p)
    from PIL import Image; import io
    im=Image.open(p).convert('RGB'); im.thumbnail((1280,1280)); bio=io.BytesIO(); im.save(bio,'JPEG',quality=85)
    return base64.b64encode(bio.getvalue()).decode()
imgs=re.findall(r'src="data:image/jpeg;base64,[A-Za-z0-9+/=]+"',h)
h=h.replace(imgs[0],'src="data:image/jpeg;base64,'+b(f'{B}/{thumb}')+'"',1)
h=h.replace(imgs[1],'src="data:image/jpeg;base64,'+jpg(frame)+'"',1)
h=h.replace('<title>Demon Slayer Launch Kit</title>',f'<title>Estate Developer Ep {ep} Kit</title>')
h=re.sub(r'<p class="eyebrow">.*?</h1>',f'<p class="eyebrow">Stormi Knows Anime · launch kit v1 · español · serie por episodios</p><h1>The Greatest Estate Developer: <span>Episodio {ep}</span></h1>',h,flags=re.S)
h=re.sub(r'alt="Thumbnail: [^"]*"',f'alt="Thumbnail: {quote}"',h,count=1)
h=re.sub(r'<b>.*?</b><small>.*?</small>',f'<b>{title}</b><small>Stormi Knows Anime · {L}</small>',h,count=1,flags=re.S)
facts=f'''<dl class="facts">
<div><dt>Video</dt><dd><a href="{url}" target="_blank" rel="noopener">{vname} (Drive)</a></dd></div>
<div><dt>Length</dt><dd>{L}, Webtoon episode {ep}</dd></div>
<div><dt>Language</dt><dd>Spanish (Latin America)</dd></div>
<div><dt>Proposed slot</dt><dd>{slot}</dd></div>
<div><dt>Your time</dt><dd>{ist}</dd></div>
<div><dt>Audience time</dt><dd>5 PM Mexico · 8 PM Buenos Aires · midnight Madrid</dd></div>
</dl>'''
h=re.sub(r'<dl class="facts">.*?</dl>',facts,h,count=1,flags=re.S)
for k,v in (('t',title),('d',desc),('g',tags)):
    h=re.sub(rf'(<pre id="{k}">).*?(</pre>)',lambda m:m.group(1)+v+m.group(2),h,count=1,flags=re.S)
h=h.replace('alt="Thumbnail variant: TE ENCONTRÉ, MUZAN"','alt="Key frame from the episode"').replace('<h2>Second thumbnail (for the low-view swap)</h2>','<h2>Joke art from this episode</h2>')
h=h.replace('</main>',f'<section><h2>Pinned comment <button data-c="p">Copy</button></h2><pre id="p">{pin}</pre></section></main>',1)
open(out,'w').write(h); print('ok',L,len(h))
