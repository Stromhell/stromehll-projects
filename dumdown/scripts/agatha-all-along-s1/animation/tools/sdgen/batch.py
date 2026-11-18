import torch,json,sys,os,time
from diffusers import AutoPipelineForText2Image
torch.set_num_threads(4)
p=AutoPipelineForText2Image.from_pretrained("stabilityai/sdxl-turbo",torch_dtype=torch.bfloat16,variant="fp16")
vae=p.vae.to(torch.float32)
def dec(lat):
  with torch.no_grad():
    im=vae.decode(lat.to(torch.float32)/vae.config.scaling_factor).sample
  return p.image_processor.postprocess(im,output_type="pil")[0]
P=json.load(open(sys.argv[1])); seeds=[int(x) for x in sys.argv[2].split(',')]; only=sys.argv[3].split(',') if len(sys.argv)>3 and sys.argv[3] else None
PRE="anime film background painting, ghibli style, eye-level straight-on view, empty, no people: "
for k,v in P.items():
  if only and k not in only: continue
  for s in seeds:
    o=f"{os.environ.get('OUT','out2')}/{k}_s{s}.png"
    if os.path.exists(o): continue
    t=time.time(); im=p(prompt=PRE+v,num_inference_steps=4,guidance_scale=0.0,width=1344,height=768,generator=torch.Generator().manual_seed(s),output_type='latent').images; im=dec(im); im.save(o); print(k,s,round(time.time()-t),flush=True)
