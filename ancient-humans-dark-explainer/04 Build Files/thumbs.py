from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
A=lambda s: ImageFont.truetype('Anton.ttf', s)
INK=(18,13,10); YEL=(255,214,64); RED=(230,33,23)
src=Image.open('../frames/f12.png').convert('RGB')
src=ImageEnhance.Contrast(src).enhance(1.12)
def glow_eyes(img, boxes, r):
    g=Image.new('RGBA',img.size,(0,0,0,0)); d=ImageDraw.Draw(g)
    for (x,y) in boxes: d.ellipse([x-r,y-r*0.7,x+r,y+r*0.7],fill=(255,220,40,150))
    g=g.filter(ImageFilter.GaussianBlur(r*0.6)); o=img.convert('RGBA'); o.alpha_composite(g); return o
# ---------- 16:9 1280x720
logo=Image.open('stormi-watermark.png').convert('RGBA'); logo=logo.crop(logo.getbbox())
EY=[(727,223),(1179,223)]
W,H=1280,720; k=0.97
sc=src.resize((int(1920*k),int(1080*k)),Image.LANCZOS)
ox=560-int(620*k); oy=-55
cv=Image.new('RGB',(W,H),(6,6,10)); cv.paste(sc,(ox,oy))
cv=glow_eyes(cv,[(int(x*k)+ox,int(y*k)+oy) for x,y in EY],int(105*k))
m=Image.new('L',(W,1)); [m.putpixel((x,0),int(245*max(0,1-x/(W*0.5))**1.1)) for x in range(W)]
sh=Image.new('RGBA',(W,H),(0,0,0,255)); sh.putalpha(m.resize((W,H))); cv.alpha_composite(sh)
d=ImageDraw.Draw(cv)
def fit(t,size,maxw):
    while d.textlength(t,font=A(size))>maxw: size-=2
    return A(size)
d.text((40,250),"IT'S NOT",font=fit("IT'S NOT",170,500),fill='white',anchor='ls',stroke_width=10,stroke_fill=INK)
d.text((40,470),"A ROCK",font=fit("A ROCK",230,520),fill=YEL,anchor='ls',stroke_width=12,stroke_fill=INK)
d.text((44,560),"WHY ANCIENT HUMANS FEARED THE DARK",font=fit("WHY ANCIENT HUMANS FEARED THE DARK",60,500),fill='white',anchor='ls',stroke_width=5,stroke_fill=INK)
lw=100; cv.alpha_composite(logo.resize((lw,lw*logo.height//logo.width),Image.LANCZOS),(40,H-135))
cv.convert('RGB').save('../out/ancient-humans-dark_thumbnail_16x9.jpg',quality=93)
# ---------- 9:16 1080x1920
W,H=1080,1920; k=1.4
sc=src.resize((int(1920*k),int(1080*k)),Image.LANCZOS)
x0=int(953*k)-W//2; part=sc.crop((x0,0,x0+W,sc.height)); top=170
cv=Image.new('RGBA',(W,H),(6,6,10,255)); cv.paste(part,(0,top))
cv=glow_eyes(cv,[(int(x*k)-x0,int(y*k)+top) for x,y in EY],int(105*k))
m=Image.new('L',(1,H))
for y in range(H):
    v=0
    if y<top+120: v=255*max(0,1-(y-top)/120) if y>=top else 255
    if y>1250: v=max(v,255*min(1,(y-1250)/300))
    m.putpixel((0,y),int(v))
sh=Image.new('RGBA',(W,H),(6,6,10,255)); sh.putalpha(m.resize((W,H))); cv.alpha_composite(sh)
d=ImageDraw.Draw(cv)
d.text((W//2,1520),"IT'S NOT",font=A(190),fill='white',anchor='mm',stroke_width=12,stroke_fill=INK)
d.text((W//2,1730),"A ROCK",font=A(250),fill=YEL,anchor='mm',stroke_width=14,stroke_fill=INK)
cv.convert('RGB').save('../out/ancient-humans-dark_thumbnail_9x16.jpg',quality=93)
