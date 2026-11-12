import sys,glob
from PIL import Image
fs=sorted(glob.glob(sys.argv[1]+'/*.jpg')); n=len(fs); cols=5; rows=(n+cols-1)//cols
S=Image.new('RGB',(cols*480,rows*270))
for i,f in enumerate(fs): S.paste(Image.open(f).resize((480,270)),((i%cols)*480,(i//cols)*270))
S.save(sys.argv[2],quality=80); print(n)
