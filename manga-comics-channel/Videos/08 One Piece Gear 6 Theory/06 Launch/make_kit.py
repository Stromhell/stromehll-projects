# Gear 6 theory launch kit page (from 07 One Piece Ch1199 make_kit.py). Usage: python3 make_kit.py VIDEO_SRC OUT.html
import base64, re, sys
SRC='/mnt/project-files/manga-comics-channel/Videos/02 Demon Slayer Full Story/06 Launch/DS_Full_launch_kit_ES_v2.html'
h=open(SRC).read()
md=open('OPG6_launch_ES_v1.md').read()
title=re.search(r'## Título.*?\n(.+)\n',md).group(1).strip()
desc=re.search(r'## Descripción\n(.*?)\n## Tags',md,re.S).group(1).strip()
tags=re.search(r'## Tags.*?\n(.+)\n',md).group(1).strip()
b=lambda p: base64.b64encode(open(p,'rb').read()).decode()
imgs=re.findall(r'src="data:image/jpeg;base64,[A-Za-z0-9+/=]+"',h)
h=h.replace(imgs[0],'src="data:image/jpeg;base64,'+b('thumb/OPG6_thumb_ES_v1.jpg')+'"',1)
if len(imgs)>1: h=h.replace(imgs[1],'src="data:image/jpeg;base64,'+b('thumb/OPG6_thumb_ES_v1.jpg')+'"',1)
h=h.replace('<title>Demon Slayer Launch Kit</title>','<title>Gear 6 Theory Kit</title>')
h=re.sub(r'<p class="eyebrow">.*?</h1>','<p class="eyebrow">Stormi Knows Anime · launch kit v1 · español</p><h1>One Piece: <span>teoría del Gear 6</span></h1>',h,flags=re.S)
h=re.sub(r'alt="Thumbnail: [^"]*"','alt="Thumbnail: ESE NO ES LUFFY"',h,1)
h=re.sub(r'<b>.*?</b><small>.*?</small>',f'<b>{title}</b><small>Stormi Knows Anime · 8:49</small>',h,1,flags=re.S)
facts=f'''<dl class="facts">
<div><dt>Video</dt><dd>Full 1080p file attached in the thread (OPG6_ES_v2.mp4)</dd></div>
<div><dt>Length</dt><dd>8:49, no intro</dd></div>
<div><dt>Language</dt><dd>Spanish (Latin America)</dd></div>
<div><dt>Proposed slot</dt><dd>~48 h after the One Piece 1200 video, 23:00 UTC</dd></div>
<div><dt>Your time</dt><dd>4:30 AM IST the next morning</dd></div>
<div><dt>Note</dt><dd>4 shots use our own art until chapter 1200 is out; swapped for real panels before upload</dd></div>
</dl>'''
h=re.sub(r'<dl class="facts">.*?</dl>',facts,h,1,flags=re.S)
h=re.sub(r'(<pre id="t">).*?(</pre>)',lambda m:m.group(1)+title+m.group(2),h,1,flags=re.S)
h=re.sub(r'(<pre id="d">).*?(</pre>)',lambda m:m.group(1)+desc+m.group(2),h,1,flags=re.S)
h=re.sub(r'(<pre id="g">).*?(</pre>)',lambda m:m.group(1)+tags+m.group(2),h,1,flags=re.S)
h=re.sub(r'alt="Thumbnail variant: [^"]*"','alt="Thumbnail at a second size"',h)
vid=f'<section><h2>Watch (360p preview)</h2><video controls preload="metadata" style="width:100%;border-radius:8px;background:#000" src="{sys.argv[1]}"></video><p>Low-res preview so it loads here. The full 1080p file is attached in the thread.</p></section>'
h=re.sub(r'(<main[^>]*>)',lambda m:m.group(1)+vid,h,1)
open(sys.argv[2],'w').write(h); print('ok', len(h))
