# hires_batch.py picks.json : {name: [src_png, x, y, w, prompt]} -> plates/sd_<name>.jpg (2560x1440, detail re-painted)
import sys, json, torch, time, os
from PIL import Image, ImageFilter
from diffusers import AutoPipelineForImage2Image
torch.set_num_threads(4)
J = json.load(open(sys.argv[1])); OUTD = sys.argv[2]
p = AutoPipelineForImage2Image.from_pretrained("stabilityai/sdxl-turbo", torch_dtype=torch.bfloat16, variant="fp16")
for name, (src, x, y, w, pr) in J.items():
    o = f"{OUTD}/sd_{name}.jpg"
    if os.path.exists(o): continue
    t = time.time(); h = round(w * 9 / 16)
    im = Image.open(src).convert("RGB").crop((x, y, x + w, y + h)).resize((1536, 864), Image.LANCZOS)
    r = p(prompt="anime film background painting, ghibli style, highly detailed, crisp: " + pr, image=im, strength=.42, num_inference_steps=5, guidance_scale=0.0, generator=torch.Generator().manual_seed(3)).images[0]
    r = r.resize((2560, 1440), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=2, percent=55, threshold=2)); r.save(o, quality=92); print(name, round(time.time() - t), flush=True)
