# sheet.py VIDEO OUT.jpg : 3x3 contact sheet of 9 evenly spaced frames, labelled with seconds
import sys,subprocess,json
from PIL import Image,ImageDraw,ImageFont
v,out=sys.argv[1:3]
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',v]).decode().strip())
ts=[round(dur*(i+0.5)/9,1) for i in range(9)]
W,H=270,480; sh=Image.new('RGB',(W*3,H*3)); d=ImageDraw.Draw(sh)
for i,t in enumerate(ts):
    p=subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',v,'-frames:v','1','-f','image2pipe','-vcodec','png','-'],capture_output=True).stdout
    import io; im=Image.open(io.BytesIO(p)).convert('RGB').resize((W,H))
    sh.paste(im,((i%3)*W,(i//3)*H)); d.rectangle([(i%3)*W,(i//3)*H,(i%3)*W+70,(i//3)*H+28],fill=(0,0,0)); d.text(((i%3)*W+4,(i//3)*H+4),f'{t}s',fill=(255,255,0))
sh.save(out,quality=80); print(dur)
