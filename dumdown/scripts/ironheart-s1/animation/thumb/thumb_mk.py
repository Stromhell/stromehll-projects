# Ironheart S1 thumbnail: engine-rendered scene (thumb_act.js, crisp vector, no upscale) + text. Free, no ElevenLabs.
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import numpy as np, sys
W,H=1280,720; ML=40; FB='/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
bg=Image.open(sys.argv[1]).convert('RGB'); bg=ImageEnhance.Contrast(ImageEnhance.Color(bg).enhance(1.2)).enhance(1.1)
x=np.arange(W); sc=np.zeros((H,W)); sc[:]=np.clip(1-(x-300)/260,0,1)**1.3*.8
bg=Image.composite(Image.new('RGB',(W,H),'#0a0406'),bg,Image.fromarray((sc*255).astype('uint8')))
gl=Image.new('L',(W,H)); ImageDraw.Draw(gl).ellipse((640,250,1000,620),fill=150); gl=gl.filter(ImageFilter.GaussianBlur(40))
bg=Image.composite(Image.new('RGB',(W,H),'#ff8a3a'),bg,gl.point(lambda v:v*.35))
d=ImageDraw.Draw(bg); f=lambda s: ImageFont.truetype(FB,s)
def fit(t,sz,mw):
    while d.textlength(t,font=f(sz))>mw: sz-=2
    return sz
def stext(x,y,t,sz,fill,st=9):
    sh=Image.new('L',(W,H)); ImageDraw.Draw(sh).text((x+5,y+7),t,font=f(sz),fill=200,stroke_width=st); sh=sh.filter(ImageFilter.GaussianBlur(5))
    bg.paste(Image.new('RGB',(W,H),'#000'),(0,0),sh); d.text((x,y),t,font=f(sz),fill=fill,stroke_width=st,stroke_fill='#050505'); return d.textbbox((x,y),t,font=f(sz),stroke_width=st)
def slab(x,y,t,sz,fill,col,px=18,py=8):
    l,tp,r,b=d.textbbox((x,y),t,font=f(sz)); d.rounded_rectangle((l-px+6,tp-py+8,r+px+6,b+py+8),14,fill='#000'); d.rounded_rectangle((l-px,tp-py,r+px,b+py),14,fill=col,outline='#050505',width=6); d.text((x,y),t,font=f(sz),fill=fill); return (l-px,tp-py,r+px,b+py)
tag='SEASON 1 EXPLAINED'; tf=f(24); tw=d.textlength(tag,font=tf); d.rounded_rectangle((ML-4,30,ML+tw+24,70),20,fill='#1a0608',outline='#ffd23d',width=3); d.text((ML+10,36),tag,font=tf,fill='#ffd23d')
b=stext(ML,96,'SHE SOLD',fit('SHE SOLD',110,440),'#ffd23d')
b=stext(ML,b[3]+8,'HER SOUL?',fit('HER SOUL?',110,440),'#ffffff')
r=slab(ML+18,b[3]+26,'IRONHEART',fit('IRONHEART',88,392),'#ffffff','#d0202c')
bg.save(sys.argv[2],quality=93); bg.resize((320,180),Image.LANCZOS).save(sys.argv[2].replace('.jpg','_small.jpg'))
