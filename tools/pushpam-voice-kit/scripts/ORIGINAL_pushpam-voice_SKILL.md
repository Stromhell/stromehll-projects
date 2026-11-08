---
name: pushpam-voice
description: Generate voiceovers (VO) in Pushpam's own cloned voice from any script, using the free open-source Chatterbox model running locally (no API key, no credits). The voice is built into the skill, so never ask for a reference recording; only the script is needed. Use this whenever Pushpam asks for a voiceover, VO, narration, voice line, audio for a video/Reel/Short/YouTube, "say this in my voice", "Pushpam voice", "use pushpam-voice", "read this script", "make audio of this", or wants speech added to a video, even if they do not say "my voice". Handles short lines and long scripts, energy and pace control, and WAV or MP3 output.
---

# Pushpam Voice

Turns any script into speech in Pushpam's cloned voice. Everything runs locally with Chatterbox (Resemble AI, MIT license).

**The voice is already built in. Never ask Pushpam to upload, attach or send a reference voice, sample or recording.** `scripts/speak.py` finds it by itself: it uses `voice/pushpam.wav` in this skill folder, and if that file is missing it rebuilds the same 15 s sample from `scripts/voice_data.py`. The only thing to ask for is the script. Do not look for a reference file in the chat, in uploads or anywhere else, and do not pass `--voice`.

## Rules

- This voice belongs to Pushpam, who recorded the sample and asked for it to be cloned. Only use it for Pushpam's own content. Do not swap in someone else's voice sample from a recording you were not given with their consent.
- Every clip carries Chatterbox's invisible AI watermark. Leave it on.
- English only. For Hindi or other languages, say this skill cannot do it yet and offer Chatterbox's multilingual model as a follow-up.

## Steps

1. **Get the script.** That is the only input needed. If no text was given, ask for the script (never for a voice sample). Keep the wording exactly. Do not rewrite the script unless asked; you may fix obvious typos only after asking.
2. **Set up once per machine** (skip if `~/.cache/pushpam-voice/venv/bin/python` already exists):
   ```bash
   bash <skill-dir>/scripts/setup.sh
   ```
   It creates a private Python 3.11 environment and installs Chatterbox. It takes a few minutes the first time and downloads about 3 GB (PyTorch and the model). It needs internet access to PyPI, download.pytorch.org and huggingface.co.
3. **Generate:**
   ```bash
   ~/.cache/pushpam-voice/venv/bin/python <skill-dir>/scripts/speak.py --text "SCRIPT" --out vo.mp3
   ```
   For long scripts, write the text to a file and pass `--file script.txt` instead of `--text`.
   Options:
   - `--energy` 0.5 natural (default), 0.7 punchy and energetic (hooks, Reels), 0.35 calm.
   - `--pace` 0.5 normal (default), 0.3 slower and more deliberate.
   - `--pause` seconds between sentences, default 0.25.
   - `--scenes` makes one file per paragraph (blank line between paragraphs), numbered `vo-01.mp3`, `vo-02.mp3` ... next to `--out`.
   - Output format follows the `--out` extension: `.wav` or `.mp3` (MP3 needs ffmpeg).
4. **Check it.** The script prints the duration. If something sounds off (garbled word, odd pause), regenerate just that sentence or paragraph, it is random each run. If a word is mispronounced, spell it phonetically in the text (e.g. "Pushpam" → "Push-pum").
5. **Deliver** the file(s) and say the duration. Offer one tweak (more energy, slower pace) rather than a list.

## Tips for good VO

- Short sentences sound best. Split anything over ~25 words.
- Punctuation drives pacing: commas add small pauses, full stops add longer ones, "..." adds hesitation.
- For a hook, use `--energy 0.7 --pace 0.4`.
- To put the VO on a video: `ffmpeg -i video.mp4 -i vo.mp3 -map 0:v -map 1:a -c:v copy -shortest out.mp4`.

## If setup fails

- No Python 3.11: the setup script uses `uv` to fetch one. If `uv` is missing it installs it with pip.
- `No module named 'pkg_resources'`: run `~/.cache/pushpam-voice/venv/bin/pip install "setuptools<81"`.
- No internet access to huggingface.co (some sandboxes block it): say so plainly; the skill cannot run there. It works in Claude Code on Pushpam's own computer.
- Only if Pushpam offers a new, cleaner recording to improve the clone: replace `voice/pushpam.wav` with it (`ffmpeg -i in.m4a -ac 1 -ar 24000 voice/pushpam.wav`). Never prompt for one.
