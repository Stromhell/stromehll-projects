import re
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
W,H=1080,1920
A=lambda s: ImageFont.truetype('Anton.ttf', s)
O=lambda s: ImageFont.truetype('Oswald.ttf', s)
INK=(18,13,10); YEL=(255,214,64)
logo=Image.open('stormi-watermark.png').convert('RGBA'); logo=logo.crop(logo.getbbox())
def lg(w): return logo.resize((w, w*logo.height//logo.width), Image.LANCZOS)

# 1) overlay for the short: title band + watermark (transparent PNG)
ov=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(ov)
def fit(t,size,maxw):
    while d.textlength(t,font=A(size))>maxw: size-=2
    return A(size)
d.text((420,300),"WHY WERE ANCIENT HUMANS",font=fit("WHY WERE ANCIENT HUMANS",70,700),fill='white',anchor='mm',stroke_width=7,stroke_fill=INK)
d.text((420,392),"SCARED OF THE DARK?",font=fit("SCARED OF THE DARK?",96,700),fill=YEL,anchor='mm',stroke_width=8,stroke_fill=INK)
ov.alpha_composite(lg(150),(820,262))
ov.save('short_overlay.png')

# 2) end card 1080x1920
bg=Image.open('../frames/f66.png').convert('RGB')
s=H/bg.height; bg=bg.resize((int(bg.width*s),H)); x=(bg.width-W)//2; bg=bg.crop((x,0,x+W,H))
bg=bg.filter(ImageFilter.GaussianBlur(18)); bg=ImageEnhance.Brightness(bg).enhance(0.35)
ec=bg.convert('RGBA'); d=ImageDraw.Draw(ec)
L=lg(440); ec.alpha_composite(L,((W-L.width)//2,420))
y=420+L.height+70
d.text((W//2,y),"WATCH THE FULL VIDEO",font=A(92),fill='white',anchor='mm',stroke_width=8,stroke_fill=INK)
d.text((W//2,y+105),"ON OUR YOUTUBE CHANNEL",font=A(64),fill='white',anchor='mm',stroke_width=7,stroke_fill=INK)
t="STORMI EXPLAIN EVERYTHING"; f=A(66); tw=d.textlength(t,font=f)
d.rounded_rectangle([W//2-tw/2-34,y+175,W//2+tw/2+34,y+290],20,fill=YEL,outline=INK,width=7)
d.text((W//2,y+232),t,font=f,fill=INK,anchor='mm')
f2=A(60); tw=d.textlength("SUBSCRIBE",font=f2); bx0,by=W//2-(tw+140)/2,y+400
d.rounded_rectangle([bx0,by-58,bx0+tw+140,by+58],24,fill=(230,33,23),outline=INK,width=7)
d.polygon([(bx0+44,by-20),(bx0+44,by+20),(bx0+78,by)],fill='white')
d.text((W//2+22,by),"SUBSCRIBE",font=f2,fill='white',anchor='mm')
ec.convert('RGB').save('endcard.png')

# 3) captions as ASS, shifted by -OFF seconds
OFF=4.0
src=open('../subs.srt',encoding='utf-8').read().strip().split('\n\n')
def ts(t):
    h,m,r=t.split(':'); s,ms=r.split(','); v=int(h)*3600+int(m)*60+int(s)+int(ms)/1000-OFF; v=max(v,0)
    return f"{int(v//3600)}:{int(v%3600//60):02d}:{v%60:05.2f}"
ev=[]
for b in src:
    ln=b.split('\n'); a,bb=ln[1].split(' --> '); txt=re.sub(r'\s+',' ',' '.join(ln[2:])).strip().upper()
    ev.append(f"Dialogue: 0,{ts(a)},{ts(bb)},Cap,,0,0,0,,{txt}")
open('captions.ass','w').write(f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Anton,88,&H00FFFFFF,&H00FFFFFF,&H000A0D12,&H64000000,0,0,0,0,100,100,1,0,1,7,2,8,70,70,1450,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""+'\n'.join(ev)+'\n')
