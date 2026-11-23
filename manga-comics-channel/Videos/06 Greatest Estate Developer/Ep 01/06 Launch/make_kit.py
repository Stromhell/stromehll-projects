# GED Ep 1 launch kit page, built from the Demon Slayer kit v2 layout. Usage: python3 make_kit.py VIDEO_URL OUT.html
import base64, re, sys
SRC='/mnt/project-files/manga-comics-channel/Videos/02 Demon Slayer Full Story/06 Launch/DS_Full_launch_kit_ES_v2.html'
h=open(SRC).read()
md=open('GED1_launch_ES_v2.md').read()
title=re.search(r'## Título.*?\n(.+)\n',md).group(1).strip()
desc=re.search(r'## Descripción\n(.*?)\n## Etiquetas',md,re.S).group(1).strip()
tags=re.search(r'## Etiquetas.*?\n(.+)\n',md).group(1).strip()
b=lambda p: base64.b64encode(open(p,'rb').read()).decode()
imgs=re.findall(r'src="data:image/jpeg;base64,[A-Za-z0-9+/=]+"',h)
h=h.replace(imgs[0],'src="data:image/jpeg;base64,'+b('thumb/GED1_thumb_ES_v2.jpg')+'"',1)
h=h.replace(imgs[1],'src="data:image/jpeg;base64,'+b('thumb/GED1_thumb_ES_v2b.jpg')+'"',1)
h=h.replace('<title>Demon Slayer Launch Kit</title>','<title>Estate Developer Ep 1 Kit</title>')
h=re.sub(r'<p class="eyebrow">.*?</h1>','<p class="eyebrow">Stormi Knows Anime · launch kit v1 · español · serie por episodios</p><h1>The Greatest Estate Developer: <span>Episodio 1</span></h1>',h,flags=re.S)
h=re.sub(r'alt="Thumbnail: [^"]*"','alt="Thumbnail: ¿YO SOY EL VAGO?"',h,1)
h=re.sub(r'<b>.*?</b><small>.*?</small>',f'<b>{title}</b><small>Stormi Knows Anime · 6:47</small>',h,1,flags=re.S)
facts=f'''<dl class="facts">
<div><dt>Video</dt><dd><a href="{sys.argv[1]}" target="_blank" rel="noopener">GED1_ES_v3 (Drive)</a></dd></div>
<div><dt>Length</dt><dd>6:47, Webtoon episode 1</dd></div>
<div><dt>Language</dt><dd>Spanish (Latin America)</dd></div>
<div><dt>Proposed slot</dt><dd>Wed 3 Dec, 23:00 UTC</dd></div>
<div><dt>Your time</dt><dd>Thu 4 Dec, 4:30 AM IST</dd></div>
<div><dt>Audience time</dt><dd>5 PM Mexico · 8 PM Buenos Aires · midnight Madrid</dd></div>
</dl>'''
h=re.sub(r'<dl class="facts">.*?</dl>',facts,h,1,flags=re.S)
h=re.sub(r'(<pre id="t">).*?(</pre>)',lambda m:m.group(1)+title+m.group(2),h,1,flags=re.S)
h=re.sub(r'(<pre id="d">).*?(</pre>)',lambda m:m.group(1)+desc+m.group(2),h,1,flags=re.S)
h=re.sub(r'(<pre id="g">).*?(</pre>)',lambda m:m.group(1)+tags+m.group(2),h,1,flags=re.S)
h=h.replace('alt="Thumbnail variant: TE ENCONTRÉ, MUZAN"','alt="Thumbnail variant: spare ¡TODO ES DINERO!"')
pin=re.search(r'## Comentario fijado\n(.+)',md).group(1).strip()
h=h.replace('</main>',f'<section><h2>Pinned comment <button data-c="p">Copy</button></h2><pre id="p">{pin}</pre></section></main>',1)
open(sys.argv[2],'w').write(h); print('ok', len(h))
