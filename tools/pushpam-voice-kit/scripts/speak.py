"""Speak a script in Pushpam's cloned voice with Chatterbox.

  python speak.py --text "Hello" --out vo.mp3
  python speak.py --file script.txt --out vo.wav --energy 0.7 --pace 0.4
  python speak.py --file script.txt --out vo.mp3 --scenes   # one file per paragraph
"""
import argparse
import os
import re
import shutil
import subprocess
import sys

import torch
import torchaudio as ta
from chatterbox.tts import ChatterboxTTS

HERE = os.path.dirname(os.path.abspath(__file__))
SKILL = os.path.dirname(HERE)


def builtin_voice():
    """Pushpam's voice is built in: use voice/pushpam.wav, or rebuild it from voice_data.py."""
    wav = os.path.join(SKILL, "voice", "pushpam.wav")
    if os.path.isfile(wav) and os.path.getsize(wav) > 1000:
        return wav
    import base64
    import tempfile
    sys.path.insert(0, HERE)
    from voice_data import VOICE_FLAC_B64
    path = os.path.join(tempfile.gettempdir(), "pushpam-voice.flac")
    if not os.path.isfile(path):
        with open(path, "wb") as f:
            f.write(base64.b64decode("".join(VOICE_FLAC_B64.split())))
    return path


VOICE = builtin_voice()

p = argparse.ArgumentParser()
src = p.add_mutually_exclusive_group(required=True)
src.add_argument("--text")
src.add_argument("--file")
p.add_argument("--out", default="vo.mp3")
p.add_argument("--energy", type=float, default=0.5, help="0.35 calm, 0.5 natural, 0.7 punchy")
p.add_argument("--pace", type=float, default=0.5, help="0.5 normal, 0.3 slower")
p.add_argument("--pause", type=float, default=0.25, help="seconds between sentences")
p.add_argument("--scenes", action="store_true", help="one output file per paragraph")
p.add_argument("--voice", default=VOICE, help=argparse.SUPPRESS)
a = p.parse_args()

text = a.text if a.text is not None else open(a.file, encoding="utf-8").read()
text = text.strip()
if not text:
    sys.exit("pushpam-voice: the script is empty")

device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
model = ChatterboxTTS.from_pretrained(device=device)
gap = torch.zeros(1, int(model.sr * a.pause))


def speak(block):
    # Sentence by sentence keeps long scripts steady; very long sentences are split at commas.
    pieces = []
    for s in re.split(r"(?<=[.!?…])\s+", " ".join(block.split())):
        if len(s.split()) > 35:
            pieces += [c.strip() for c in re.split(r"(?<=[,;:])\s+", s) if c.strip()]
        elif s:
            pieces.append(s)
    audio = []
    for s in pieces:
        audio += [model.generate(s, audio_prompt_path=a.voice, exaggeration=a.energy, cfg_weight=a.pace), gap]
    return torch.cat(audio[:-1], dim=1)


def save(wav, path):
    ext = os.path.splitext(path)[1].lower()
    if ext == ".mp3":
        if not shutil.which("ffmpeg"):
            sys.exit("pushpam-voice: MP3 needs ffmpeg; use a .wav --out instead")
        tmp = path[:-4] + ".tmp.wav"
        ta.save(tmp, wav, model.sr)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-b:a", "192k", path], check=True)
        os.remove(tmp)
    else:
        ta.save(path, wav, model.sr)
    print(f"saved {path}  ({wav.shape[1] / model.sr:.1f} s)")


if a.scenes:
    base, ext = os.path.splitext(a.out)
    blocks = [b for b in re.split(r"\n\s*\n", text) if b.strip()]
    for i, b in enumerate(blocks, 1):
        save(speak(b), f"{base}-{i:02d}{ext}")
else:
    save(speak(text), a.out)
