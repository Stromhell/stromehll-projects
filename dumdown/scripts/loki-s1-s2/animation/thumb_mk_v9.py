from PIL import Image, ImageDraw, ImageFont, ImageFilter
FB='/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'; W,H=1920,1080
A=Image.open('r9a/f00024.jpg').convert('RGB'); B=Image.open('r9b/f00024.jpg').convert('RGB')
im=Image.new('RGB',(W,H)); im.paste(A.crop((480,0,1440,H)),(0,0)); im.paste(B.crop((480,0,1440,H)),(960,0))
d=ImageDraw.Draw(im)
# divider: glowing seam
g=Image.new('L',(W,H)); ImageDraw.Draw(g).rectangle((952,0,968,H),fill=255); g=g.filter(ImageFilter.GaussianBlur(14))
im.paste(Image.new('RGB',(W,H),'#c8ffd6'),(0,0),g.point(lambda p:p*.8)); d.rectangle((955,0,965,H),fill='#f4fff6')
f=lambda s: ImageFont.truetype(FB,s)
def ctext(x,y,t,sz,fill,stroke,glow=None,anchor='mm'):
    ft=f(sz); sh=Image.new('L',(W,H)); ImageDraw.Draw(sh).text((x+6,y+10),t,font=ft,fill=230,stroke_width=stroke,anchor=anchor); sh=sh.filter(ImageFilter.GaussianBlur(9)); im.paste(Image.new('RGB',(W,H),'#000'),(0,0),sh)
    if glow: gl=Image.new('L',(W,H)); ImageDraw.Draw(gl).text((x,y),t,font=ft,fill=255,stroke_width=stroke+8,anchor=anchor); gl=gl.filter(ImageFilter.GaussianBlur(20)); im.paste(Image.new('RGB',(W,H),glow),(0,0),gl.point(lambda p:p*.6))
    d.text((x,y),t,font=ft,fill=fill,stroke_width=stroke,stroke_fill='#060606',anchor=anchor)
ctext(960,160,'TRUE PURPOSE',176,'#ffffff',15,'#9affb8')
def tag(x,y,t,bgc,fg):
    ft=f(74); l,tp,r,b=d.textbbox((x,y),t,font=ft,anchor='mm'); d.rounded_rectangle((l-28,tp-16,r+28,b+16),20,fill=bgc,outline='#050505',width=6); d.text((x,y),t,font=ft,fill=fg,anchor='mm')
tag(480,995,'S1: PRISONER','#b07a3a','#ffffff'); tag(1440,995,'S2: GOD','#2fd36a','#050505')
im.resize((1280,720),Image.LANCZOS).save('loki_thumb_v9.jpg',quality=93); im.resize((320,180),Image.LANCZOS).save('small9.jpg')
