# Thumbnail v4 (top-left cover lettering hidden by a soft dark corner, cover logo fragments cropped out, background softer): left text panel (no text over faces), right vol-1 cover art (Tanjiro + Nezuko), Rengoku faded behind text.
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os, sys
P='/tmp/claude-0/ds/pages'; F='/mnt/project-files/manga-comics-channel/Tools/mangacut/fonts/Anton.ttf'
BR='/mnt/project-files/manga-comics-channel/00 Channel/Branding/01 Drafts v2/ska_logo_1024.png'
OUT=os.path.dirname(os.path.abspath(__file__))
W,H=1280,720
c=Image.new('RGB',(W,H),'#0b0b10')
def crop(f,box,size):
    im=Image.open(f'{P}/{f}.jpg').convert('RGB'); w,h=im.size
    im=im.crop((int(box[0]*w),int(box[1]*h),int(box[2]*w),int(box[3]*h)))
    r=max(size[0]/im.width,size[1]/im.height); im=im.resize((int(im.width*r)+1,int(im.height*r)+1),Image.LANCZOS)
    return im.crop((0,0,size[0],size[1]))
a=crop('c001-001',(0.36,0.20,1.0,0.62),(760,H)); a=ImageEnhance.Color(a).enhance(1.25); a=ImageEnhance.Contrast(a).enhance(1.1)
b=crop('c062-001',(0.05,0.30,0.85,0.80),(560,H)); b=ImageEnhance.Brightness(ImageEnhance.Color(b).enhance(1.2)).enhance(0.32).filter(ImageFilter.GaussianBlur(4))
c.paste(b,(0,0)); c.paste(a,(W-760,0))
k=Image.new('L',(W,H),0); ImageDraw.Draw(k).polygon([(540,0),(790,0),(540,170)],fill=255); k=k.filter(ImageFilter.GaussianBlur(28)); c.paste(Image.new('RGB',(W,H),'#140608'),(0,0),k)
m=Image.new('L',(W,H),0); d=ImageDraw.Draw(m); d.polygon([(520,0),(560,0),(530,H),(490,H)],fill=255)
c.paste(Image.new('RGB',(W,H),'#e3262e'),(0,0),m)
dr=ImageDraw.Draw(c)
def txt(xy,s,size,fill,stroke=10):
    f=ImageFont.truetype(F,size); dr.text(xy,s,font=f,fill=fill,stroke_width=stroke,stroke_fill='black')
f=ImageFont.truetype(F,50); s='205 CAPÍTULOS'; bw=f.getbbox(s)[2]+40
dr.rounded_rectangle((40,60,40+bw,128),12,fill='#e3262e',outline='black',width=5); dr.text((60,63),s,font=f,fill='white')
txt((40,150),'TODO',130,'white')
txt((40,300),'DEMON',150,'#ffd23d',12)
txt((40,475),'SLAYER',150,'#ffd23d',12)
lg=Image.open(BR).convert('RGBA'); s=int(H*0.17); lg=lg.resize((s,s),Image.LANCZOS)
c.paste(lg,(W-s-int(W*0.035),int(H*0.035)),lg)
c.save(f'{OUT}/DS_Full_thumb_ES_v4.png'); c.convert('RGB').save(f'{OUT}/DS_Full_thumb_ES_v4.jpg',quality=92)
