from PIL import Image, ImageDraw, ImageFont, ImageEnhance
FB='/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
src=Image.open('/root/.claude/uploads/453900cc-7c2d-508d-9394-3f7e6bd22c31/633bf8d8-image.webp').convert('RGB')
W,H=1280,720; TOP=232
ph=src.crop((0,0,2400,int(2400*(H-TOP)/W))).resize((W,H-TOP),Image.LANCZOS)
ph=ImageEnhance.Contrast(ImageEnhance.Color(ph).enhance(1.15)).enhance(1.06)
im=Image.new('RGB',(W,H),(20,10,26)); im.paste(ph,(0,TOP))
# fade photo top edge into the band
fade=Image.new('L',(W,H),0); d=ImageDraw.Draw(fade)
for y in range(70): d.line([(0,TOP+y),(W,TOP+y)],fill=int(255*(1-y/70)**1.6))
im=Image.composite(Image.new('RGB',(W,H),(20,10,26)),im,fade)
d=ImageDraw.Draw(im)
def word(t,x,y,sz,fill,box=None,rot=0):
    f=ImageFont.truetype(FB,sz); w,h=d.textbbox((0,0),t,font=f)[2:]
    L=Image.new('RGBA',(w+60,h+50),(0,0,0,0)); g=ImageDraw.Draw(L)
    if box: g.rounded_rectangle((6,6,w+54,h+44),14,fill=box,outline=(35,26,36),width=6)
    g.text((30,14),t,font=f,fill=fill,stroke_width=0 if box else 9,stroke_fill=(35,26,36))
    L=L.rotate(rot,expand=True,resample=Image.BICUBIC); im.paste(L,(x,y),L); return L.size[0]
w=word('DEADPOOL',22,10,84,(255,255,255),box=(195,32,44),rot=2)
word('DUG UP',22+w+6,12,92,(255,255,255))
word('WOLVERINE',22,118,92,(255,210,61))
d.text((700,165),'+ 100 DEADPOOLS · DUMBED DOWN',font=ImageFont.truetype(FB,30),fill=(230,220,255),stroke_width=5,stroke_fill=(35,26,36))
im.save('DumDown_DeadpoolWolverine_thumbnail_v3.jpg',quality=95)
