# Long-video thumb (Pushpam 21 Nov: ElevenLabs art for long-video thumbs). ElevenLabs scene as background + real manga face panel + big quote + logo.
# Usage: python3 thumb_el.py BG.png PAGE BOX(x0,y0,x1,y1) "QUOTE" OUT.jpg [--side left|right] [--duo dark,mid,light] [--hl WORD]
import sys, os, argparse
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance, ImageOps
ap=argparse.ArgumentParser(); ap.add_argument('bg'); ap.add_argument('page'); ap.add_argument('box'); ap.add_argument('quote'); ap.add_argument('out')
ap.add_argument('--side',default='left'); ap.add_argument('--duo',default='#04122e,#2f7dff,#e8f6ff'); ap.add_argument('--hl',default=''); ap.add_argument('--fw',type=float,default=0.40)
ap.add_argument('--pg',default='/tmp/claude-0/bc/pg'); ap.add_argument('--tilt',type=float,default=-3)
a=ap.parse_args(); W,H=1280,720
F='/mnt/project-files/manga-comics-channel/Tools/mangacut/fonts/Anton.ttf'
LOGO='/mnt/project-files/manga-comics-channel/00 Channel/Branding/01 Drafts v2/ska_logo_1024.png'
bg=Image.open(a.bg).convert('RGB'); r=max(W/bg.width,H/bg.height); bg=bg.resize((int(bg.width*r)+1,int(bg.height*r)+1),Image.LANCZOS).crop((0,0,W,H))
bg=ImageEnhance.Contrast(ImageEnhance.Color(bg).enhance(1.2)).enhance(1.1)
# manga face panel
pg=Image.open(f'{a.pg}/{a.page}.jpg').convert('RGB'); w,h=pg.size; b=[float(x) for x in a.box.split(',')]
face=pg.crop((int(b[0]*w),int(b[1]*h),int(b[2]*w),int(b[3]*h)))
d,m,l=a.duo.split(','); face=ImageOps.colorize(ImageOps.autocontrast(face.convert('L'),cutoff=1),d,l,mid=m)
fw=int(W*a.fw); fh=int(fw*face.height/face.width)
if fh>int(H*0.78): fh=int(H*0.78); fw=int(fh*face.width/face.height)
face=face.resize((fw,fh),Image.LANCZOS)
fr=Image.new('RGB',(fw+24,fh+24),'white'); fr.paste(face,(12,12)); fr=fr.convert('RGBA').rotate(a.tilt,expand=True,resample=Image.BICUBIC)
sh=Image.new('RGBA',fr.size,(0,0,0,0)); sh.paste((0,0,0,200),mask=fr.split()[3]); sh=sh.filter(ImageFilter.GaussianBlur(14))
x=int(W*0.03) if a.side=='left' else W-fr.width-int(W*0.03); y=int(H*0.06)
c=bg.convert('RGBA'); c.alpha_composite(sh,(x+10,y+14)); c.alpha_composite(fr,(x,y)); c=c.convert('RGB')
# bottom gradient + quote
g=Image.new('L',(1,H)); [g.putpixel((0,yy),int(215*max(0,(yy-H*0.6)/(H*0.4)))) for yy in range(H)]
c.paste(Image.new('RGB',(W,H),'black'),(0,0),g.resize((W,H)))
dr=ImageDraw.Draw(c); q=a.quote; size=150
while True:
    f=ImageFont.truetype(F,size)
    if dr.textlength(q,font=f)<W*0.92 or size<70: break
    size-=6
tw=dr.textlength(q,font=f); tx=(W-tw)/2; ty=H-size-40
words=q.split(' '); cx=tx
for i,wd in enumerate(words):
    s=wd+(' ' if i<len(words)-1 else '')
    col='#ffd400' if a.hl and a.hl.upper() in wd.upper() else 'white'
    dr.text((cx+6,ty+8),s,font=f,fill='black',stroke_width=16,stroke_fill='black'); dr.text((cx,ty),s,font=f,fill=col,stroke_width=12,stroke_fill='black')
    cx+=dr.textlength(s,font=f)
lg=Image.open(LOGO).convert('RGBA'); sz=int(H*0.15); lg=lg.resize((sz,sz),Image.LANCZOS); c.paste(lg,(W-sz-int(W*0.035),int(H*0.035)),lg)
c.save(a.out,quality=92); c.resize((160,90),Image.LANCZOS).save(a.out.rsplit('.',1)[0]+'_160.png'); print('ok',a.out)
