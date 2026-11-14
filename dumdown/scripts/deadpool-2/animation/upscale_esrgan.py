import sys, numpy as np, onnxruntime as o
from PIL import Image
s=o.InferenceSession(sys.argv[3] if len(sys.argv)>3 else '/tmp/claude-0/-home-user/acf60ddd-1269-5955-894d-60b48246689c/scratchpad/upscale/x4.onnx')
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(np.float32)/255; H,W,_=im.shape
T,P=64,8; S=T-2*P
pad=np.pad(im,((P,P+T),(P,P+T),(0,0)),mode='reflect'); out=np.zeros((H*4,W*4,3),np.float32)
for y in range(0,H,S):
  for x in range(0,W,S):
    t=pad[y:y+T,x:x+T].transpose(2,0,1)[None]
    r=s.run(None,{'input.1':t})[0][0].transpose(1,2,0)
    h=min(S,H-y); w=min(S,W-x)
    out[y*4:(y+h)*4,x*4:(x+w)*4]=r[P*4:(P+h)*4,P*4:(P+w)*4]
Image.fromarray((np.clip(out,0,1)*255).round().astype('uint8')).save(sys.argv[2])
print('ok',out.shape)
