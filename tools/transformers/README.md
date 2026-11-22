# Transformers (latest) + Headroom: video and voice kit

Set up 22 Nov 2026 for Pushpam ("both for voice and video, mostly video").

## Install (per cloud session, nothing kept in project storage)
```
bash /mnt/project-files/tools/transformers/setup.sh             # Transformers from GitHub main, ~3 min
bash /mnt/project-files/tools/transformers/setup.sh --headroom  # + Headroom from GitHub main (~5 min build)
bash /mnt/project-files/tools/transformers/setup.sh --test      # + smoke test
```
Run code with `~/.venvs/hf/bin/python`. Everything lives in its own venv, so system Python tools
(Kokoro-onnx voice, `system/qa/qa_auto.py`, `voice_qa.py`, motion-kit) are untouched. Checked 22 Nov.

Tested versions: transformers 5.24.0.dev0 (main @ 7bf5b71), torch 2.15.0+cpu, torchcodec 0.17.0,
headroom-ai 0.45.0 (main @ ce0460c; motion-kit still pins PyPI 0.43.1, use `--headroom` here for the newer one).
Pin with `TF_REF=<commit>` / `HR_REF=<commit>` if main breaks.

Note: video decoding needs `torchcodec` (torchvision's read_video was removed). The script installs it.

## Smoke test results (CPU, 4 cores)
| Task | Model | Result |
|---|---|---|
| Speech to text | openai/whisper-tiny.en | ok |
| Text to speech | facebook/mms-tts-eng | ok, 16 kHz (robotic; Kokoro stays our narrator) |
| Video classify | MCG-NJU/videomae-base-finetuned-kinetics | ok, ~3 s for a 3 s clip |
| Headroom `hc` | 22 KB JSON | 9,621 -> 4,043 tokens |

## Useful free models it enables (all local, no keys)
**Video (main use)**
- **Qwen2.5-VL-3B-Instruct / SmolVLM2-2.2B-Video**: watch a rendered clip and describe it / answer questions
  ("is any character floating?", "is text over a face?"). A second opinion next to `qa_auto.py`. SmolVLM2 is the fast one on CPU.
- **openai/whisper-large-v3-turbo** (+ word timestamps): accurate captions and clip-moment finding for the Clips channel
  and Hinglish/Spanish transcripts. Free alternative to paying for transcription.
- Also: `facebook/sam2` / `depth-anything` for cut-outs and depth parallax on 2D scenes.

**Voice**
- Whisper (above) to auto-check VO stems against the script (catches skipped/misread words).
- Kokoro stays the narrator; Pushpam-clone VO is unchanged. MMS-TTS is only a fallback.

CPU only here: bigger models (7B+) are slow; keep to <=3B for video understanding.
