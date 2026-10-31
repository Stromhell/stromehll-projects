# cover.py VIDEO SECONDS OUT.jpg "LINE1" "SLAB LINE" [#acc] [cx 0-1] : 1080x1920 reel cover, house style (white Anton line + tilted accent slab, Stormi logo)
import sys,subprocess,io,os
from PIL import Image,ImageDraw,ImageFont,ImageEnhance,ImageFilter
v,t,out,l1,l2=sys.argv[1:6]; acc=sys.argv[6] if len(sys.argv)>6 else '#7ee03c'; cx=float(sys.argv[7]) if len(sys.argv)>7 else 0.5
T=os.path.dirname(os.path.abspath(__file__)); FONT=T+'/Anton.ttf'; W,H=1080,1920
LOGO=Image.open(T+'/stormi-watermark.png').convert('RGBA'); LOGO=LOGO.crop(LOGO.getbbox()); LS=LOGO.resize((150,150*LOGO.height//LOGO.width),Image.LANCZOS)
p=subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',v,'-frames:v','1','-f','image2pipe','-vcodec','png','-'],capture_output=True).stdout
src=Image.open(io.BytesIO(p)).convert('RGB')
import numpy as np
def grab(tt):
    q=subprocess.run(['ffmpeg','-v','error','-ss',str(tt),'-i',v,'-frames:v','1','-f','image2pipe','-vcodec','png','-'],capture_output=True).stdout
    return np.asarray(Image.open(io.BytesIO(q)).convert('L'),dtype=float)
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',v]).decode())
vd=sum(np.abs(np.diff(grab(dur*f),axis=0)).mean(1) for f in (.2,.4,.6,.8))
for y in range(len(vd)-3):
    pass
top=list(np.argsort(vd)[-14:]); best=None
for a_ in top:
    for b_ in top:
        if 540<=b_-a_<=900:
            sc=vd[a_]+vd[b_]
            if best is None or sc>best[0]: best=(sc,a_,b_)
if len(sys.argv)>8: best=(0,)+tuple(int(z) for z in sys.argv[8].split(','))
if best: src=src.crop((0,int(best[1])+3,src.width,int(best[2])-2))
print('panel',best and (int(best[1]),int(best[2])))
k=max(W/src.width,H/src.height); big=src.resize((int(src.width*k)+1,int(src.height*k)+1),Image.LANCZOS)
x0=int(min(max(big.width*cx-W/2,0),big.width-W)); y0=(big.height-H)//2; im=big.crop((x0,y0,x0+W,y0+H)).filter(ImageFilter.UnsharpMask(3,80,2))
im=ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.25)).enhance(1.1)
sh=Image.new('L',(W,H),0); d=ImageDraw.Draw(sh)
for y in range(H): d.line([(0,y),(W,y)],fill=int(min(235,max(0,(y-1000)/920)**1.3*230)))
im.paste((8,8,12),(0,0,W,H),sh)
hexc=lambda h:tuple(int(h[i:i+2],16) for i in (1,3,5)); a=hexc(acc); d=ImageDraw.Draw(im)
def fit(txt,maxw,size):
    while size>60:
        f=ImageFont.truetype(FONT,size)
        if d.textlength(txt,font=f)<=maxw: return f
        size-=4
    return ImageFont.truetype(FONT,size)
f1=fit(l1,900,170); f2=fit(l2,860,140); h1=f1.getbbox(l1)[3]; h2=f2.getbbox(l2)[3]
y=1640-(h1+30+h2+70)
d.text((W//2+8,y+10),l1,font=f1,fill=(0,0,0),anchor='mt',stroke_width=14,stroke_fill=(0,0,0))
d.text((W//2,y),l1,font=f1,fill=(255,255,255),anchor='mt',stroke_width=12,stroke_fill=(15,12,10)); y+=h1+40
tw=d.textlength(l2,font=f2); slab=Image.new('RGBA',(int(tw+90),h2+70),a+(255,)); sd=ImageDraw.Draw(slab)
sd.rectangle([0,0,slab.width-1,slab.height-1],outline=(15,12,10),width=10); sd.text((45,26),l2,font=f2,fill=(15,12,10)); slab=slab.rotate(-3,expand=True,resample=Image.BICUBIC)
shd=Image.new('RGBA',slab.size,(0,0,0,0)); shd.paste((0,0,0,150),(0,0)+slab.size,slab); px=(W-slab.width)//2
im.paste(shd,(px+14,y+16),shd); im.paste(slab,(px,y),slab)
im.paste(LS,(820,262),LS); im.save(out,quality=92); print('OK',out)
