from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
import numpy as np
S='/tmp/claude-0/-home-user/acf60ddd-1269-5955-894d-60b48246689c/scratchpad/loki'
FB='/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
W,H=1280,720; ML=56
src=Image.open(f'{S}/shots/throne_hq.jpg').convert('RGB'); Z=1.29
bg=src.resize((int(src.width*Z),int(src.height*Z)),Image.LANCZOS).crop((0,62,W,62+H))
a=np.asarray(bg).astype(float)/255; a=np.clip((a-0.02)/0.85,0,1)**0.82; bg=Image.fromarray((a*255).astype('uint8'))
bg=ImageEnhance.Contrast(ImageEnhance.Color(bg).enhance(1.25)).enhance(1.12).filter(ImageFilter.MedianFilter(3))
# glow on Loki (head ~ x900,y275)
# calm the green rays around the head (desaturate halo), then skin-tone the face itself
hl=Image.new('L',(W,H)); ImageDraw.Draw(hl).ellipse((820,200,980,380),fill=255); hl=hl.filter(ImageFilter.GaussianBlur(30))
fa=np.asarray(bg).astype(float); lum=fa@np.array([.3,.59,.11]); h=np.asarray(hl)[...,None]/255*.75
gray=np.stack([lum*.95,lum*.95,lum*1.0],2); fa=fa*(1-h)+gray*h
fl=Image.new('L',(W,H)); ImageDraw.Draw(fl).ellipse((874,250,926,318),fill=255); fl=np.asarray(fl.filter(ImageFilter.GaussianBlur(7)))[...,None]/255
lum=fa@np.array([.3,.59,.11]); l=np.clip((lum-40)/150,0,1)**.85
skin=np.stack([60+l*200,45+l*160,40+l*125],2); fa=fa*(1-fl)+skin*fl
bg=Image.fromarray(np.clip(fa,0,255).astype('uint8'))
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
dm=Image.open('/mnt/project-files/uploads/hearth/b22f7efe-85f1-40ce-8e75-fce29361db20').convert('RGB'); w,h=dm.size; c=int(w*.92); cx,cy=w*.5,h*.42
dm=dm.crop((int(cx-c/2),int(cy-c/2),int(cx+c/2),int(cy+c/2))).resize((230,230),Image.LANCZOS)
X,Y=1010,46; m=Image.new('L',(230,230)); ImageDraw.Draw(m).ellipse((0,0,229,229),fill=255)
sh=Image.new('L',(W,H)); ImageDraw.Draw(sh).ellipse((X-8+8,Y-8+10,X+238+8,Y+238+10),fill=200); sh=sh.filter(ImageFilter.GaussianBlur(8)); bg.paste(Image.new('RGB',(W,H),'#000'),(0,0),sh)
d.ellipse((X-11,Y-11,X+241,Y+241),fill='#e23a3a',outline='#050505',width=5); bg.paste(dm,(X,Y),m)
bg.save(f'{S}/thumb/loki_thumb_v5.jpg',quality=93); bg.resize((320,180),Image.LANCZOS).save(f'{S}/thumb/small5.jpg')
