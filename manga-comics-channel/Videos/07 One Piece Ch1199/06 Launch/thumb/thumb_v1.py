# One Piece 1199 thumbnail (from 1198 thumb_v1.py; HL env = word drawn yellow), copy of Boruto thumb_v1.py with env tints: LDUO/RDUO duotone colours (dark,mid,light), seam colours SEAM_L/SEAM_R.
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance, ImageChops
import os, sys
from PIL import ImageOps
P=os.environ.get('PG','/tmp/claude-0/op/pages'); F='/mnt/project-files/manga-comics-channel/Tools/mangacut/fonts/Anton.ttf'
BR='/mnt/project-files/manga-comics-channel/00 Channel/Branding/01 Drafts v2/ska_logo_1024.png'
OUT=os.path.dirname(os.path.abspath(__file__)); W,H=1280,720
L_BOX=tuple(float(x) for x in os.environ.get('LBOX','0.12,0.06,0.80,0.40').split(','))
R_BOX=tuple(float(x) for x in os.environ.get('RBOX','0.30,0.02,0.98,0.36').split(','))
def crop(f,box,size):
    im=Image.open(f'{P}/{f}.jpg').convert('RGB'); w,h=im.size
    im=im.crop((int(box[0]*w),int(box[1]*h),int(box[2]*w),int(box[3]*h)))
    r=max(size[0]/im.width,size[1]/im.height); im=im.resize((int(im.width*r)+1,int(im.height*r)+1),Image.LANCZOS)
    x=(im.width-size[0])//2; y=(im.height-size[1])//2; return im.crop((x,y,x+size[0],y+size[1]))
def grade(im,tint,amt):
    im=ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.45)).enhance(1.2)
    glow=im.filter(ImageFilter.GaussianBlur(18)); im=ImageChops.screen(im,ImageEnhance.Brightness(glow).enhance(0.35))
    return Image.blend(im,ImageChops.multiply(im,Image.new('RGB',im.size,tint)),amt)
a=crop(os.environ.get('LP','c1198-014'),L_BOX,(700,H))
if os.environ.get('LDUO'): d,m,li=os.environ['LDUO'].split(','); a=ImageOps.colorize(ImageOps.autocontrast(a.convert('L')),d,li,mid=m)
a=grade(a,os.environ.get('LT','#7fe8ff'),0.2)
b=crop(os.environ.get('RP','c039-001'),R_BOX,(700,H))
if os.environ.get('RDUO'): d,m,li=os.environ['RDUO'].split(','); b=ImageOps.colorize(ImageOps.autocontrast(b.convert('L')),d,li,mid=m)
b=grade(b,os.environ.get('RT','#ff6a6a'),0.2)
c=Image.new('RGB',(W,H),'black'); c.paste(b,(W-700,0))
m=Image.new('L',(W,H),0); ImageDraw.Draw(m).polygon([(0,0),(700,0),(580,H),(0,H)],fill=255); c.paste(a.crop((0,0,700,H)).resize((700,H)),(0,0),m.crop((0,0,700,H)))
# neon seam: cyan/red glow along the diagonal
s=Image.new('RGB',(W,H),'black'); d=ImageDraw.Draw(s); d.line([(700,0),(580,H)],fill=os.environ.get('SEAM_L','#00e5ff'),width=16); d.line([(712,0),(592,H)],fill=os.environ.get('SEAM_R','#ff1f3d'),width=16)
c=ImageChops.screen(c,s.filter(ImageFilter.GaussianBlur(14))); c=ImageChops.screen(c,s.filter(ImageFilter.GaussianBlur(3)))
# edge rim lights
rim=Image.new('RGB',(W,H),'black'); d=ImageDraw.Draw(rim); d.rectangle((0,0,40,H),fill=os.environ.get('SEAM_L','#00b8ff')); d.rectangle((W-40,0,W,H),fill=os.environ.get('SEAM_R','#ff1030'))
c=ImageChops.screen(c,ImageEnhance.Brightness(rim.filter(ImageFilter.GaussianBlur(60))).enhance(0.9))
# vignette bottom for quote
g=Image.new('L',(1,H)); [g.putpixel((0,y),int(200*max(0,(y-H*0.62)/(H*0.38)))) for y in range(H)]
c.paste(Image.new('RGB',(W,H),'black'),(0,0),g.resize((W,H)))
dr=ImageDraw.Draw(c); q=os.environ.get('QUOTE','"ESTO ES EL FIN"'); f=ImageFont.truetype(F,118)
tw=dr.textlength(q,font=f); x=(W-tw)/2-60; y=H-180
dr.text((x+6,y+8),q,font=f,fill='black',stroke_width=14,stroke_fill='black'); hl=os.environ.get('HL','')
if hl and hl in q:
    pre=q[:q.index(hl)]; post=q[q.index(hl)+len(hl):]; xx=x
    for part,col in ((pre,'white'),(hl,'#ffd23d'),(post,'white')):
        dr.text((xx,y),part,font=f,fill=col,stroke_width=12,stroke_fill='black'); xx+=dr.textlength(part,font=f)
else: dr.text((x,y),q,font=f,fill='white',stroke_width=12,stroke_fill='black')
lg=Image.open(BR).convert('RGBA'); sz=int(H*0.15); lg=lg.resize((sz,sz),Image.LANCZOS); c.paste(lg,(W-sz-int(W*0.035),int(H*0.035)),lg)
n=sys.argv[1] if len(sys.argv)>1 else 'v5'
c.save(f'{OUT}/OP1199_thumb_ES_{n}.jpg',quality=92); c.resize((160,90),Image.LANCZOS).save(f'{OUT}/OP1199_thumb_ES_{n}_160.png')
