#!/usr/bin/env python3
"""Free, local, highly detailed manga/anime art for joke/parody/theory scenes (Animagine XL 4.0, SDXL anime model, CPU).
No credits, nothing leaves the machine. ~ several min per image on 4 CPU cores.
Usage: python3 animagine_gen.py OUT.png "tag prompt" [--w 1216 --h 832 --steps 28 --cfg 5.5 --seed 1 --manga]
--manga adds the black-and-white manga page look (monochrome, screentone, ink) so it matches real chapter pages.
Animagine is trained on danbooru tags: write the prompt as comma-separated tags (subject first), not prose.
Original characters only: do not name real copyrighted characters in prompts for our own art."""
import argparse, time, torch
from diffusers import StableDiffusionXLPipeline, EulerAncestralDiscreteScheduler
ap = argparse.ArgumentParser(); ap.add_argument('out'); ap.add_argument('prompt')
ap.add_argument('--w', type=int, default=1216); ap.add_argument('--h', type=int, default=832)
ap.add_argument('--steps', type=int, default=28); ap.add_argument('--cfg', type=float, default=5.5)
ap.add_argument('--seed', type=int, default=1); ap.add_argument('--manga', action='store_true')
a = ap.parse_args()
torch.set_num_threads(4)
t0 = time.time()
pipe = StableDiffusionXLPipeline.from_pretrained('cagliostrolab/animagine-xl-4.0', torch_dtype=torch.bfloat16, use_safetensors=True, low_cpu_mem_usage=True)
pipe.vae.to(torch.float32); pipe.upcast_vae = getattr(pipe, 'upcast_vae', None)
pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pipe.scheduler.config)
style = ', monochrome, greyscale, manga, screentone, ink lineart, detailed hatching, dramatic lighting' if a.manga else ''
prompt = a.prompt + style + ', masterpiece, high score, great score, absurdres, highly detailed'
neg = ('lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, cropped, worst quality, '
       'low quality, low score, bad score, average score, signature, watermark, username, blurry, jpeg artifacts')
print('loaded', round(time.time() - t0), 's', flush=True)
lat = pipe(prompt, output_type='latent', negative_prompt=neg, width=a.w, height=a.h, num_inference_steps=a.steps, guidance_scale=a.cfg,
           generator=torch.Generator().manual_seed(a.seed)).images
with torch.no_grad():
    x = pipe.vae.decode(lat.to(torch.float32) / pipe.vae.config.scaling_factor).sample
img = pipe.image_processor.postprocess(x, output_type='pil')[0]
img.save(a.out); print('saved', a.out, round(time.time() - t0), 's')
