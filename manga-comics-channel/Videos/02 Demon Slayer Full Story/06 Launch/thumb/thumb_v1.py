# Thumbnail v1 (1280x720): real volume-cover art (vol 1 Tanjiro+Nezuko, vol 8 Rengoku) + Spanish title, subject highlighted, logo top-right.
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
# right: Tanjiro + Nezuko (vol 1), left: Rengoku (vol 8)
a=crop('c001-001',(0.0,0.17,1.0,0.62),(760,H)); a=ImageEnhance.Color(a).enhance(1.25); a=ImageEnhance.Contrast(a).enhance(1.1)
b=crop('c062-001',(0.0,0.12,0.95,0.62),(560,H)); b=ImageEnhance.Color(b).enhance(1.2)
c.paste(b,(0,0)); c.paste(a,(W-760,0))
# diagonal slash divider
m=Image.new('L',(W,H),0); d=ImageDraw.Draw(m); d.polygon([(500,0),(560,0),(470,H),(410,H)],fill=255)
c.paste(Image.new('RGB',(W,H),'#e3262e'),(0,0),m)
# bottom dark gradient for text
g=Image.new('L',(1,H)); [g.putpixel((0,y),int(235*max(0,(y-H*0.45)/(H*0.55))**1.2)) for y in range(H)]
c.paste(Image.new('RGB',(W,H),'black'),(0,0),g.resize((W,H)))
dr=ImageDraw.Draw(c)
def txt(xy,s,size,fill,stroke=10):
    f=ImageFont.truetype(F,size); dr.text(xy,s,font=f,fill=fill,stroke_width=stroke,stroke_fill='black'); return f.getbbox(s)
txt((40,430),'TODO',120,'white')
txt((40,540),'DEMON SLAYER',150,'#ffd23d',12)
# badge
f=ImageFont.truetype(F,54); s='205 CAPÍTULOS'; bw=f.getbbox(s)[2]+44
dr.rounded_rectangle((40,370,40+bw,436),12,fill='#e3262e',outline='black',width=5); dr.text((62,372),s,font=f,fill='white')
lg=Image.open(BR).convert('RGBA'); s=int(H*0.17); lg=lg.resize((s,s),Image.LANCZOS)
c.paste(lg,(W-s-int(W*0.035),int(H*0.035)),lg)
c.save(f'{OUT}/DS_Full_thumb_ES_v1.png'); c.convert('RGB').save(f'{OUT}/DS_Full_thumb_ES_v1.jpg',quality=92)
