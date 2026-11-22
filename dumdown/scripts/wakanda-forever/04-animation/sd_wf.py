import torch,json,sys,os,time
from diffusers import AutoPipelineForText2Image
from PIL import Image, ImageFilter, ImageEnhance
torch.set_num_threads(int(os.environ.get('THR','2')))
p=AutoPipelineForText2Image.from_pretrained("stabilityai/sdxl-turbo",torch_dtype=torch.bfloat16,variant="fp16")
vae=p.vae.to(torch.float32); vae.enable_tiling(); vae.enable_slicing()
def dec(lat):
  with torch.no_grad(): im=vae.decode(lat.to(torch.float32)/vae.config.scaling_factor).sample
  return p.image_processor.postprocess(im,output_type="pil")[0]
P=json.load(open(sys.argv[1])); seed=int(sys.argv[2]) if len(sys.argv)>2 else 7
PRE="anime film background painting, ghibli style, detailed, eye-level straight-on view, empty, no people: "
for k,v in P.items():
  o=f"/tmp/wf/anim/plates/{k}.jpg"
  if os.path.exists(o): continue
  t=time.time(); im=p(prompt=PRE+v,num_inference_steps=4,guidance_scale=0.0,width=1344,height=768,generator=torch.Generator().manual_seed(seed),output_type='latent').images; im=dec(im)
  im.save(f"/tmp/wfwork/sd/{k}.png"); big=im.resize((2560,1440),Image.LANCZOS).filter(ImageFilter.UnsharpMask(2,60,2)); big.save(o,quality=90); print(k,round(time.time()-t),flush=True)
print('SD DONE',flush=True)
