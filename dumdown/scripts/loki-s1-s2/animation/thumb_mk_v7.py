from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
import numpy as np, math, random
FB='/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
W,H=1280,720
src=Image.open('/tmp/claude-0/-home-user/acf60ddd-1269-5955-894d-60b48246689c/scratchpad/upscale/throne_x4.png').convert('RGB')
# centred crop on Loki (source 1400x700 units *4); Loki head ~ (700,265)
cw,ch=1120,630; cx,cy=702,350
bg=src.crop((int((cx-cw/2)*4),int((cy-ch/2)*4),int((cx+cw/2)*4),int((cy+ch/2)*4))).resize((W,H),Image.LANCZOS)
k=W/cw; hx,hy=(700-(cx-cw/2))*k,(265-(cy-ch/2))*k   # head position in thumb
a=np.asarray(bg).astype(float)/255; a=np.clip((a-0.03)/0.8,0,1)**0.85; bg=Image.fromarray((a*255).astype('uint8'))
bg=ImageEnhance.Contrast(ImageEnhance.Color(bg).enhance(1.2)).enhance(1.15).filter(ImageFilter.MedianFilter(3))
fa=np.asarray(bg).astype(float)
# face: calm green halo + warm skin
hl=Image.new('L',(W,H)); ImageDraw.Draw(hl).ellipse((hx-95,hy-90,hx+95,hy+110),fill=255); hl=np.asarray(hl.filter(ImageFilter.GaussianBlur(30)))[...,None]/255*.7
lum=fa@np.array([.3,.59,.11]); fa=fa*(1-hl)+np.stack([lum*.95,lum*.95,lum],2)*hl
fl=Image.new('L',(W,H)); ImageDraw.Draw(fl).ellipse((hx-30,hy-38,hx+30,hy+42),fill=255); fl=np.asarray(fl.filter(ImageFilter.GaussianBlur(8)))[...,None]/255
lum=fa@np.array([.3,.59,.11]); l=np.clip((lum-40)/150,0,1)**.85; fa=fa*(1-fl)+np.stack([70+l*200,52+l*160,45+l*125],2)*fl
# cosmic void: deep vignette + stars
yy,xx=np.mgrid[0:H,0:W]; v=np.clip(((xx-W/2)/(W*.62))**2+((yy-hy-40)/(H*.72))**2-0.25,0,1)
void=np.stack([4+0*xx,6+0*xx,16+0*xx],2).astype(float); fa=fa*(1-v[...,None]*.85)+void*v[...,None]*.85
random.seed(7); st=Image.new('L',(W,H)); sd=ImageDraw.Draw(st)
for _ in range(260):
    x,y=random.uniform(0,W),random.uniform(0,H); r=random.choice([.6,.8,1,1.3,1.8]); sd.ellipse((x-r,y-r,x+r,y+r),fill=random.randint(120,255))
st=np.asarray(st.filter(ImageFilter.GaussianBlur(.6)))[...,None]/255*v[...,None]; fa=fa+st*np.array([200,230,255])
# Yggdrasil: glowing branch + root silhouette growing out of the throne
tr=Image.new('L',(W,H)); td=ImageDraw.Draw(tr); random.seed(3)
def br(x,y,ang,ln,w,d):
    if d==0 or ln<8: return
    x2,y2=x+math.cos(ang)*ln,y+math.sin(ang)*ln; td.line((x,y,x2,y2),fill=255,width=max(1,int(w)))
    for s in (-1,1): br(x2,y2,ang+s*random.uniform(.25,.55),ln*random.uniform(.68,.8),w*.68,d-1)
bx,by=W/2,hy+150
for a0 in (-math.pi/2-.9,-math.pi/2-.45,-math.pi/2+.45,-math.pi/2+.9): br(bx,by-60,a0,150,10,7)
for a0 in (math.pi/2-.9,math.pi/2-.35,math.pi/2+.35,math.pi/2+.9): br(bx,by+40,a0,95,9,5)
cut=Image.new('L',(W,H)); ImageDraw.Draw(cut).ellipse((hx-150,hy-130,hx+150,by+70),fill=255); cut=cut.filter(ImageFilter.GaussianBlur(40))
trm=np.asarray(tr).astype(float)*(1-np.asarray(cut)/255)
glow=np.asarray(Image.fromarray(trm.astype('uint8')).filter(ImageFilter.GaussianBlur(9))).astype(float)
t=(trm*.35+glow*1.1)[...,None]/255; fa=fa+t*np.array([60,255,140])*.55
bg=Image.fromarray(np.clip(fa,0,255).astype('uint8'))
d=ImageDraw.Draw(bg); f=lambda s: ImageFont.truetype(FB,s)
def ctext(y,t,sz,fill,stroke=10,glowc=None):
    ft=f(sz); w=d.textlength(t,font=ft); x=(W-w)/2
    sh=Image.new('L',(W,H)); ImageDraw.Draw(sh).text((x+5,y+8),t,font=ft,fill=220,stroke_width=stroke); sh=sh.filter(ImageFilter.GaussianBlur(7))
    bg.paste(Image.new('RGB',(W,H),'#000'),(0,0),sh)
    if glowc:
        g=Image.new('L',(W,H)); ImageDraw.Draw(g).text((x,y),t,font=ft,fill=255,stroke_width=stroke+6); g=g.filter(ImageFilter.GaussianBlur(16)); bg.paste(Image.new('RGB',(W,H),glowc),(0,0),g.point(lambda p:p*.7))
    d.text((x,y),t,font=ft,fill=fill,stroke_width=stroke,stroke_fill='#03140a')
    return d.textbbox((x,y),t,font=ft,stroke_width=stroke)
b=ctext(26,'ALONE TOGETHER',122,'#eaffef',9,'#2bff7a')
print('header bottom',b[3],'head top',hy-45)
# subject name slab bottom-left of centre (bottom-right kept clear for the timestamp)
tf=f(40); t1='LOKI'; t2='SEASON 1 + 2 EXPLAINED'; tf2=f(30)
w1=d.textlength(t1,font=tf); w2=d.textlength(t2,font=tf2); tot=w1+w2+70; x=(W-tot)/2; y=H-82
d.rounded_rectangle((x,y,x+w1+36,y+58),14,fill='#ffd23d',outline='#050505',width=5); d.text((x+18,y+5),t1,font=tf,fill='#050505')
x2=x+w1+50; d.rounded_rectangle((x2,y+6,x2+w2+30,y+52),12,fill='#0d1233',outline='#ffd23d',width=3); d.text((x2+15,y+11),t2,font=tf2,fill='#ffffff')
bg.save('loki_thumb_v7.jpg',quality=93); bg.resize((320,180),Image.LANCZOS).save('small7.jpg')
