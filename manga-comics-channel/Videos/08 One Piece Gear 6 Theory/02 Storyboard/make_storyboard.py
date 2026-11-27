import base64, io, os, html
from PIL import Image
V=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S=os.path.join(V,'04 Build Files/script_opg6_es_v1.txt')
EN={'Gancho':'Hook: Nika has taken over Luffy in ch.1200, he attacks Sanji. Claim: this is the road to Gear 6, with clues back to Little Garden, Thriller Bark and Wano.',
"¿Luffy está muerto?":'Recap of 1199 to 1200: Luffy wraps his own arm around himself to protect Sanji; Nika threatens to destroy everyone, Luffy included.',
'Los tambores cambiaron de ritmo':'Zunesha heard Joy Boy, Imu said Nika; the drum rhythm changed (don-do-to-to vs don-don-don-ka-ka). Three suns: original Nika, Joy Boy, Luffy. Cover-song analogy.',
'Oda lo plantó desde el principio':'Musician before doctor; Little Garden then Drum Island (Chopper Monster Point); Brook, Binks no Sake and the tone dial.',
'La libertad no tiene moral':'Freedom without morals: Nika frees the kids but floods Elbaph; to Nika, Luffy himself is a chain.',
'La danza del dios destructor':'Shiva as Nataraja: damaru drum (creation) + flame (destruction); bliss dance vs wrath dance = two rhythms. Respectful framing.',
'¿Por qué Luffy perdió el control?':'Wano: Luffy restarted his heart for his promises and said "I am Luffy". Vs Imu he begged his heart for more power, like King Harald with Imu.',
'Haki y frutas: dos voluntades':'Haki beats all; fruits = collective will (Vegapunk), Zoans have wills (Gorosei); Bonney shows belief shapes the fruit. Gear 6 = Nika obeys Luffy.',
'La pista de Thriller Bark':"Oars with Luffy's shadow; Nightmare Luffy (100 shadows, in control) vs Moria (1000, loses reason). First Conqueror's haki soon after.",
'Zoro, Sanji y "Luffy es Luffy"':'Zoro and Sanji solved their own identity crises; Usopp: Luffy is Luffy. Nika has sword and shield, Luffy has Zoro and Sanji.',
'El plan de Brook':"Brook's soul music + Binks no Sake to bring Luffy back; crew opens the door, Luffy must walk through.",
'Negro, blanco y rojo: el Gear 6':'Alchemy black/white/red = Nika/Joy Boy/Luffy. Red-haired Luffy colour page foreshadow. Gear 6 likely vs Blackbeard.',
'Cierre':'Questions + comments CTA, point to the 1200 chapter video.'}
ART={'a1_red_sun.png':'Own art (colour): straw-hat boy from behind, huge red sun, flames','a2_three_suns.png':'Own art (colour): black, white and red suns over the sea',
'a3_dancing_god.png':'Own art (colour): cosmic dancing deity silhouette with drum and flame','a4_detective_board.png':'Own art (manga): boy at a conspiracy board with red strings (joke)',
'a5_skeleton_violin.png':'Own art (manga): afro skeleton gentleman playing violin','a6_shadow_inside.png':'Own art (manga): boy with a giant grinning monkey-god shadow behind him',
'a7_cover_song.png':'Own art (manga): monkey drumming on a concert stage (cover-song joke)','a8_red_fist.png':'Own art (colour): red-haired fighter with flaming fists',
'a9_girl_believe.png':'Own art (manga): pink-haired girl glowing with sun aura','c1200_restrain.png':'Own art placeholder until ch.1200 pages are out: Luffy wrapping his arm around himself'}
def thumb(ch,p,c,full):
    f=f'/tmp/claude-0/op/p{ch}/c{ch:03d}-{p:03d}.jpg'
    if not os.path.exists(f): return None
    im=Image.open(f).convert('RGB')
    if c and not full:
        W,H=im.size; x,y,w,h=c; im=im.crop((int(x*W),int(y*H),int((x+w)*W),int((y+h)*H)))
    im.thumbnail((360,300)); b=io.BytesIO(); im.save(b,'JPEG',quality=62); return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
secs=[]; n=0
for ln in open(S):
    ln=ln.rstrip('\n')
    if not ln or ln.startswith('#'): continue
    if ln.startswith('@'): secs.append((ln[1:].strip(),[])); continue
    pg,opts,text=[x.strip() for x in ln.split('|',2)]; o={}
    for t in opts.split(): k,_,v=t.partition('='); o[k]=v or True
    n+=1
    if 'ai' in o: vis=('art',ART.get(o['ai'],o['ai']))
    else:
        ch=int(o.get('ch',1199)); c=[float(v) for v in o['c'].split(',')] if 'c' in o else None
        vis=('img',thumb(ch,int(pg),c,'page' in o),f'Ch.{ch} p.{pg}'+(' (full page)' if 'page' in o else ''))
    secs[-1][1].append((n,text,vis,o.get('gif')))
rows=[]
for name,items in secs:
    rows.append(f'<section><h2>{html.escape(name)}</h2><p class="en">{html.escape(EN.get(name,""))}</p>')
    for n,text,vis,gif in items:
        if vis[0]=='art': v=f'<div class="art">{html.escape(vis[1])}</div>'
        else: v=f'<figure><img src="{vis[1]}" alt="{html.escape(vis[2])}"><figcaption>{html.escape(vis[2])}</figcaption></figure>' if vis[1] else f'<div class="art">{html.escape(vis[2])}</div>'
        g=f'<span class="gif">GIF: {html.escape(gif.replace("_"," ").rsplit(" ",1)[0])}</span>' if gif else ''
        rows.append(f'<div class="row"><span class="n">{n}</span><div class="vis">{v}</div><div class="txt"><p>{html.escape(text)}</p>{g}</div></div>')
    rows.append('</section>')
page=f'''<title>Gear 6 Theory Storyboard</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;600&display=swap">
<style>
/* layout: single column of storyboard rows, panel left, Spanish VO right */
:root{{--bg:#f6f3ee;--fg:#1b1a1f;--mut:#5d5a66;--card:#ffffff;--line:#ddd7cf;--acc:#d8262f;--sun:#f0b323;--fd:'Bangers',Impact,sans-serif;--fb:'Inter',system-ui,sans-serif}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#141318;--fg:#eeeaf2;--mut:#a7a2b2;--card:#1e1c24;--line:#34303d;--acc:#ff5a5f;--sun:#f5c34a;color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:#141318;--fg:#eeeaf2;--mut:#a7a2b2;--card:#1e1c24;--line:#34303d;--acc:#ff5a5f;--sun:#f5c34a;color-scheme:dark}}
body{{background:var(--bg);color:var(--fg);font-family:var(--fb);line-height:1.5;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:24px 48px}}
main{{max-width:980px;margin:0 auto;display:grid;gap:28px}}
h1{{font-family:var(--fd);font-size:clamp(2rem,6vw,3.4rem);letter-spacing:.02em;margin:0;line-height:1;text-wrap:balance}}
h1 b{{color:var(--acc);font-weight:400}}
.meta{{color:var(--mut);margin:.4rem 0 0}}
h2{{font-family:var(--fd);font-size:1.7rem;letter-spacing:.03em;margin:0;color:var(--acc);font-weight:400}}
.en{{color:var(--mut);margin:.2rem 0 .8rem;max-width:70ch}}
section{{display:grid;gap:10px}}
.row{{display:grid;grid-template-columns:2.2rem minmax(0,300px) minmax(0,1fr);gap:14px;background:var(--card);border:1px solid var(--line);border-radius:6px;padding:10px;align-items:start}}
.n{{font-variant-numeric:tabular-nums;color:var(--mut);font-weight:600}}
figure{{margin:0}} img{{display:block;width:100%;border-radius:3px;border:1px solid var(--line)}}
figcaption{{font-size:.75rem;color:var(--mut);margin-top:4px}}
.art{{border:2px dashed var(--sun);border-radius:4px;padding:12px;font-size:.85rem;color:var(--fg);min-height:70px}}
.txt p{{margin:0;font-size:1.02rem}}
.gif{{display:inline-block;margin-top:6px;font-size:.75rem;font-weight:600;background:var(--sun);color:#1b1a1f;padding:2px 8px;border-radius:99px}}
@media (max-width:620px){{.row{{grid-template-columns:1.6rem minmax(0,1fr)}}.txt{{grid-column:2}}}}
</style>
<main><header><h1>One Piece: <b>¿Existe el Gear 6?</b></h1>
<p class="meta">Stormi Knows Anime · storyboard v1 · {n} lines, about 11-12 min · Spanish VO (Santa) · real manga panels + our own theory art · reaction GIFs · no intro</p>
<p class="meta">Chapter 1200 is not out yet (expected ~30 Nov). Its scenes use our own art for now and get swapped for real panels when it lands.</p></header>
{''.join(rows)}</main>'''
open(os.path.join(V,'02 Storyboard','OPG6_storyboard_v1.html'),'w').write(page); print(n,'lines', len(page)//1024,'KB')
