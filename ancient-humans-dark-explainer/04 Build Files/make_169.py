import subprocess, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
W,H,FPS=1920,1080,30
A=lambda s: ImageFont.truetype('Anton.ttf', s)
INK=(18,13,10); YEL=(255,214,64); RED=(230,33,23)
logo=Image.open('stormi-watermark.png').convert('RGBA'); logo=logo.crop(logo.getbbox())
def ease(t): t=max(0,min(1,t)); return 1-(1-t)**3
def pop(t): # overshoot scale
    t=max(0,min(1,t)); return 1+0.18*math.sin(t*math.pi)*(1-t) if t<1 else 1
def pipe(name,n):
    return subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p',name],stdin=subprocess.PIPE)
def text_layer(lines, alphas, scales):
    L=Image.new('RGBA',(W,H),(0,0,0,0))
    for (txt,size,fill,y),a,s in zip(lines,alphas,scales):
        if a<=0: continue
        f=A(int(size*s)); t=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(t)
        d.text((W//2,y),txt,font=f,fill=fill,anchor='mm',stroke_width=max(6,int(size*0.09)),stroke_fill=INK)
        if a<1: t.putalpha(t.getchannel('A').point(lambda v:int(v*a)))
        L.alpha_composite(t)
    return L

# ---- opener 2.5 s: push-in on the leopard + hook text
src=Image.open('../frames/g47.png').convert('RGB')
src=ImageEnhance.Brightness(src).enhance(0.85)
big=src.resize((W*2,H*2),Image.LANCZOS)
grad=Image.new('L',(1,H)); [grad.putpixel((0,y),int(235*max(0,(y-H*0.45)/(H*0.55))**1.3)) for y in range(H)]
shade=Image.new('RGBA',(W,H),(0,0,0,255)); shade.putalpha(grad.resize((W,H)))
N=int(2.5*FPS); p=pipe('opener.mp4',N)
cx,cy=0.44,0.48
for i in range(N):
    t=i/FPS; z=1+0.16*ease(t/2.5)
    cw,ch=W*2/z,H*2/z; x0=min(max(cx*W*2-cw/2,0),W*2-cw); y0=min(max(cy*H*2-ch/2,0),H*2-ch)
    fr=big.crop((int(x0),int(y0),int(x0+cw),int(y0+ch))).resize((W,H),Image.BILINEAR).convert('RGBA')
    if i<6: fr=Image.blend(Image.new('RGBA',(W,H),(0,0,0,255)),fr,i/6)
    fr.alpha_composite(shade)
    fr.alpha_composite(text_layer(
        [("YOUR FEAR OF THE DARK",110,'white',830),("KEPT YOUR ANCESTORS ALIVE",128,YEL,965)],
        [ease((t-0.15)/0.25),ease((t-0.75)/0.25)],[pop((t-0.15)/0.35),pop((t-0.75)/0.35)]))
    p.stdin.write(fr.convert('RGB').tobytes())
p.stdin.close(); p.wait()

# ---- end slate 6 s
bg=Image.open('../frames/f66.png').convert('RGB').filter(ImageFilter.GaussianBlur(16))
bg=ImageEnhance.Brightness(bg).enhance(0.38).convert('RGBA')
N=6*FPS; p=pipe('endslate.mp4',N)
fK=A(70); fS=A(64)
for i in range(N):
    t=i/FPS; fr=bg.copy(); d=ImageDraw.Draw(fr)
    s=0.8+0.2*ease(t/0.5); lw=int(420*s); L=logo.resize((lw,lw*logo.height//logo.width),Image.LANCZOS)
    bob=int(8*math.sin(t*2.4))
    fr.alpha_composite(L,(W//2-lw//2,130+(420-lw)//2+bob))
    a=ease((t-0.35)/0.35)
    tl=text_layer([("WATCH MORE VIDEOS LIKE THIS",92,'white',650),("ON STORMI EXPLAIN EVERYTHING",72,YEL,755)],[a,a],[1,1])
    fr.alpha_composite(tl)
    b=ease((t-0.8)/0.3)
    if b>0:
        pulse=1+0.05*math.sin(max(0,t-1.1)*5)
        txt="SUBSCRIBE"; tw=ImageDraw.Draw(fr).textlength(txt,font=fS)
        bw,bh=(tw+150)*pulse,120*pulse; x0,y0=W//2-bw/2,890-bh/2
        layer=Image.new('RGBA',(W,H),(0,0,0,0)); dl=ImageDraw.Draw(layer)
        dl.rounded_rectangle([x0,y0,x0+bw,y0+bh],int(26*pulse),fill=RED,outline=INK,width=7)
        dl.polygon([(x0+48*pulse,890-22*pulse),(x0+48*pulse,890+22*pulse),(x0+84*pulse,890)],fill='white')
        dl.text((W//2+24*pulse,890),txt,font=A(int(64*pulse)),fill='white',anchor='mm')
        if b<1: layer.putalpha(layer.getchannel('A').point(lambda v:int(v*b)))
        fr.alpha_composite(layer)
    p.stdin.write(fr.convert('RGB').tobytes())
p.stdin.close(); p.wait()
