# Clean end screen (6 s): blurred sofa plate, slow push, no graphics (room for YouTube end-screen elements), music tail only.
import sys, os, subprocess, numpy as np
sys.path.insert(0, 'gags'); import gagaudio_si as GA
from scipy.io import wavfile
SCR = os.environ.get('SCR', '/tmp/siwork'); D = 6.0; SR = 48000
m = GA.music('sitcom', D + .5, 7)[:int(SR * D)]; m = m / (np.abs(m).max() or 1) * .35; m *= np.linspace(1, 0, len(m)) ** 1.5
wavfile.write(f'{SCR}/mix/endscreen.wav', SR, (m * 32767).astype(np.int16))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-loop', '1', '-i', 'plates/si_sofa.jpg', '-i', f'{SCR}/mix/endscreen.wav', '-filter_complex',
  "[0:v]scale=2560:1440,gblur=sigma=14,eq=brightness=-0.12,zoompan=z='1+0.0006*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=24[v]",
  '-map', '[v]', '-map', '1:a', '-t', str(D), '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '24', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', f'{SCR}/acts/endscreen.mp4'], check=True)
print('endscreen ok')
