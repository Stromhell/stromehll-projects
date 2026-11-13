from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
import numpy as np
S='/tmp/claude-0/-home-user/acf60ddd-1269-5955-894d-60b48246689c/scratchpad/loki'
FB='/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
W,H=1280,720; ML=56
src=Image.open(f'{S}/shots/throne_hq.jpg').convert('RGB'); Z=1.29
bg=src.resize((int(src.width*Z),int(src.height*Z)),Image.LANCZOS).crop((0,62,W,62+H))
a=np.asarray(bg).astype(float)/255; a=np.clip((a-0.02)/0.85,0,1)**0.82; bg=Image.fromarray((a*255).astype('uint8'))
bg=ImageEnhance.Contrast(ImageEnhance.Color(bg).enhance(1.25)).enhance(1.12).filter(ImageFilter.UnsharpMask(2,80,2))
# glow on Loki (head ~ x900,y275)
gl=Image.new('L',(W,H)); ImageDraw.Draw(gl).ellipse((720,160,1080,560),fill=45); gl=gl.filter(ImageFilter.GaussianBlur(80))
bg=Image.composite(Image.new('RGB',(W,H),'#9dffb0'),bg,gl)
fl=Image.new('L',(W,H)); ImageDraw.Draw(fl).ellipse((855,240,945,345),fill=255); fl=fl.filter(ImageFilter.GaussianBlur(18))
br=ImageEnhance.Contrast(ImageEnhance.Brightness(bg).enhance(2.2)).enhance(1.1); bg=Image.composite(br,bg,fl)
# left scrim for text + edge vignette
sc=np.zeros((H,W)); x=np.arange(W); sc[:]=np.clip(1-(x-420)/330,0,1)**1.4*0.82
yy,xx=np.mgrid[0:H,0:W]; v=np.clip(((xx-900)/900)**2+((yy-360)/520)**2-0.35,0,1)*0.6; sc=np.maximum(sc,v)
bg=Image.composite(Image.new('RGB',(W,H),'#020a06'),bg,Image.fromarray((sc*255).astype('uint8')))
d=ImageDraw.Draw(bg)
def font(sz): return ImageFont.truetype(FB,sz)
def fit(t,sz,mw):
    while d.textlength(t,font=font(sz))>mw: sz-=2
    return sz
def shadow_text(x,y,t,sz,fill,stroke=10):
    f=font(sz); sh=Image.new('L',(W,H)); ImageDraw.Draw(sh).text((x+6,y+8),t,font=f,fill=200,stroke_width=stroke); sh=sh.filter(ImageFilter.GaussianBlur(6))
    bg.paste(Image.new('RGB',(W,H),'#000'),(0,0),sh); d.text((x,y),t,font=f,fill=fill,stroke_width=stroke,stroke_fill='#050505')
    return d.textbbox((x,y),t,font=f,stroke_width=stroke)
def slab(x,y,t,sz,fill,col,padx=20,pady=10):
    f=font(sz); l,tp,r,b=d.textbbox((x,y),t,font=f); sh=Image.new('L',(W,H)); ImageDraw.Draw(sh).rounded_rectangle((l-padx+7,tp-pady+9,r+padx+7,b+pady+9),16,fill=190); sh=sh.filter(ImageFilter.GaussianBlur(6))
    bg.paste(Image.new('RGB',(W,H),'#000'),(0,0),sh); d.rounded_rectangle((l-padx,tp-pady,r+padx,b+pady),16,fill=col,outline='#050505',width=7); d.text((x,y),t,font=f,fill=fill)
    return (l-padx,tp-pady,r+padx,b+pady)
COLW=640
# tag line
tf=font(28); tag='SEASON 1 + SEASON 2 EXPLAINED'; tw=d.textlength(tag,font=tf)
d.rounded_rectangle((ML-4,34,ML+tw+28,80),23,fill='#0d1233',outline='#ffd23d',width=3); d.text((ML+12,40),tag,font=tf,fill='#ffd23d')
# line 1: IS [LOKI]
b=shadow_text(ML,104,'IS',104,'#ffffff'); r=slab(b[2]+34,102,'LOKI',132,'#050505','#7dff9a',22,8)
# line 2-3
y=r[3]+14; sz=fit('GOD OF MARVEL',100,COLW); b=shadow_text(ML,y,'GOD OF MARVEL',sz,'#ffffff')
sz2=fit('UNIVERSE',150,COLW); b=shadow_text(ML-4,b[3]+6,'UNIVERSE',sz2,'#ffd23d',11)
f_=font(96); l0=d.textbbox((0,0),'NOW?',font=f_)[0]; slab(ML+18-l0,b[3]+30,'NOW?',96,'#ffffff','#e23a3a',22,8)
bg.save(f'{S}/thumb/loki_thumb_v4.jpg',quality=93); bg.resize((320,180),Image.LANCZOS).save(f'{S}/thumb/small4.jpg')
