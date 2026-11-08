---
name: pushpam-voice-kit
description: Narrate any video script in Pushpam's own cloned voice with the free, local Chatterbox model, then clean, time and mix it the way the Stormi Explain Everything channel does. Use for any voiceover, VO, narration or "say this in my voice" request from Pushpam.
---

# Pushpam Voice Kit

This kit is the exact voice pipeline used for every Stormi Explain Everything video (2D, 2D dynamic and 3D lines). Any model or agent that can run Python and ffmpeg can follow it and produce narration in Pushpam's voice. Nothing here is paid and nothing needs an API key.

## 1. What the voice is

| Item | Value |
|---|---|
| Voice | Pushpam's own voice. He recorded the sample and asked for it to be cloned. Use it only for his content. |
| Reference sample | `voice/pushpam.wav`: 15.3 s, mono, 24 kHz WAV. A backup copy is inside `scripts/voice_data.py` (base64 FLAC) and `speak.py` rebuilds it if the WAV is missing. |
| TTS model | **Chatterbox TTS** by Resemble AI (open source, MIT licence, PyPI package `chatterbox-tts`, English model `ChatterboxTTS.from_pretrained`). Zero-shot cloning: the reference WAV is passed as `audio_prompt_path` on every call. There is no fine-tuning step and no trained voice file. |
| Runs on | Locally. NVIDIA GPU (cuda), Apple Silicon (mps) or CPU. CPU works but is slow (roughly real time x 3-6). |
| Watermark | Chatterbox adds an invisible AI watermark (Perth). Leave it on. |
| Language | English only. The multilingual Chatterbox model was never set up or tested for this voice. |
| Not used | **ElevenLabs is never used for voice** (its credits are kept only for long-video thumbnails). No other paid TTS is used. |

## 2. One-time setup

```bash
bash scripts/setup.sh                       # Python 3.11 venv at ~/.cache/pushpam-voice/venv + chatterbox-tts
~/.cache/pushpam-voice/venv/bin/pip install faster-whisper scipy numpy   # for timing/check
# ffmpeg must be on PATH (denoise, loudness, mp3)
```
First run downloads about 3 GB (PyTorch + Chatterbox weights from huggingface.co). Needs internet to PyPI, download.pytorch.org and huggingface.co. If you see `No module named 'pkg_resources'`, run `pip install "setuptools<81"` in the venv.

## 3. Quick use (one script, one file)

```bash
PY=~/.cache/pushpam-voice/venv/bin/python
$PY scripts/speak.py --text "Your line here." --out vo.wav
$PY scripts/speak.py --file script.txt --out vo.mp3 --scenes   # one file per paragraph: vo-01.mp3, vo-02.mp3 ...
```
Options: `--energy` (Chatterbox `exaggeration`: 0.35 calm, 0.5 natural, 0.7 punchy), `--pace` (Chatterbox `cfg_weight`: 0.5 normal, 0.3 slower), `--pause` seconds of silence between sentences (default 0.25). `speak.py` splits text into sentences, splits sentences over 35 words at commas, generates each piece separately and joins them with the pause. Never pass `--voice`; the built-in sample is found automatically.

## 4. The full video process (what the channel actually does)

### Step A. Write the VO text, one file per act
`<video>/production/voice/actN.txt`. One paragraph = one shot. Paragraphs are separated by a blank line. Keep sentences short (split anything over ~25 words). Punctuation drives pacing: comma = short pause, full stop = longer, "..." = hesitation. See `examples/japan-act0/act0.txt`.

### Step B. Respell for the TTS (`.say.txt`)
Chatterbox misreads numbers, acronyms and foreign names. `scripts/voice_batch.py` writes `actN.say.txt` from `actN.txt` with:
- **Years 1000-2049 spelled out** ("1945" -> "nineteen forty-five", "2003" -> "two thousand three", "1980s" -> "nineteen eighties"). Always do this; raw years are the main TTS gotcha.
- Acronyms spaced into letters ("GPU" -> "G P U", "TSMC" -> "T S M C").
- Hard names respelled phonetically (e.g. "Sutskever" -> "Suts-kever"). Add new names to the `WORDS` list in `voice_batch.py` for each new video.
The original `.txt` stays untouched; it is what subtitles and the timing map use. Compare `act0.txt` and `act0.say.txt` in the example.

### Step C. Generate the clips
```bash
python3 scripts/voice_batch.py path/to/video [path/to/video2 ...]
```
For every `production/voice/actN.txt` it writes the `.say.txt`, then calls `speak.py --scenes` with the channel's locked settings:

| Setting | Value |
|---|---|
| `--energy` | **0.45** |
| `--pace` | **0.42** |
| `--pause` | **0.4** s between sentences |

Output: `production/voice/actN/vo-01.wav, vo-02.wav ...` (one per paragraph/shot). It skips acts already voiced, so re-running only fills gaps. To redo one bad line, delete that `vo-XX.wav` and re-run (each run is random, so a retry often fixes it). Override the venv python with env `PUSHPAM_VOICE_PY`.

### Step D. Join, check and time every word (`wt.py`)
```bash
python3 scripts/wt.py path/to/video N --check
```
- Loads every clip, resamples to 48 kHz mono, trims silence (threshold 0.012), joins them with a 0.55 s gap and a 0.6 s lead-in into `production/acts/actN/vo.wav`.
- Transcribes each clip with **faster-whisper `small.en`** (CPU, int8, word timestamps) and writes `production/acts/actN/timing.json`: per shot `start/end/vo_start/vo_end/text`, and per word `{w, s, e}` in seconds, mapped back onto the ORIGINAL wording. Every visual beat in the animation is keyed to these word times, never to guessed seconds.
- `--check` prints every shot whose word error rate vs the `.say.txt` is over 25%. Re-record those lines (Step C), then run `wt.py` again until it says "all lines clean".
- The channel also writes `timing.js` (`window.TIMING = <timing.json>;`) for the HTML act pages.

### Step E. Remove breaths and hiss (QA rule, 6 Nov 2026: "remove VO hiss/breath noise")
1. **Breaths:** `python3 scripts/debreath.py production/acts/actN` turns quiet, breathy lead-ins and tails of each line down to 3% (keeps timing; backup saved as `vo.orig.wav`).
2. **Hiss:** the channel's standard ffmpeg filter:
   ```bash
   ffmpeg -y -i vo.wav -af "highpass=f=70,afftdn=nr=14:nf=-42:tn=1,lowpass=f=12000" -ar 48000 -ac 1 -c:a pcm_s16le vo.clean.wav && mv vo.clean.wav vo.wav
   ```
   Stronger variant used on some videos (Micromax, WW2, Hackers): RNNoise first with the free `models/sh.rnnn` model (GregorR/rnnoise-models, "somnolent-hogwash"), then afftdn: `-af "arnndn=m=models/sh.rnnn,afftdn=nr=14"`. arnndn adds a delay of 1680 samples at 48 kHz; trim that from the start so timing still matches.
`scripts/prep_act_example.sh` shows the real order used on the Mongols video: wt.py -> timing.js -> debreath -> afftdn -> rebuild act pages.

### Step F. Mix (`mix.py`)
`python3 scripts/mix.py vo.wav cues.json out.wav [--music bed.wav --music-db -24]` adds SFX cues and ambience beds, auto-ducks them under the voice and loudness-normalises with ffmpeg `loudnorm`. Channel targets from the production rulebook: **VO -14 LUFS** on the final master, SFX -12 to -18 dB, music ducked to -22 to -26 dB under speech and up to about -14 dB in gaps, crossfades (J/L cuts) on every scene change. SFX sound files are not in this kit: `mix.py` reads them from an `sfx/` folder next to it (the channel library is `2d-dynamic/shared/sfx/` in the repo). Note: `mix.py` itself normalises each act to -16 LUFS (TP -1.5); the final full-video combine brings the master to -14 LUFS.

### Step G. Listen / QA
Before anything is handed over: listen through each act for garbled words, odd pauses, hiss, breaths, and anything fighting the voice. Fix and re-check until clean.

## 5. Rules
- Only Pushpam's content, in Pushpam's voice. Never swap in someone else's voice sample.
- Never ask for a new reference recording. Only if Pushpam offers a cleaner one: `ffmpeg -i in.m4a -ac 1 -ar 24000 voice/pushpam.wav`.
- Keep the script wording exactly; respelling happens only in `.say.txt`.
- No ElevenLabs or other paid voice service.

## 6. Files in this kit
| Path | What it is |
|---|---|
| `SKILL.md` | This guide |
| `voice/pushpam.wav` | The reference voice sample (the clone source) |
| `scripts/setup.sh` | Installs Chatterbox in a private venv |
| `scripts/speak.py` | Text -> speech in Pushpam's voice |
| `scripts/voice_data.py` | Backup of the voice sample (base64 FLAC) |
| `scripts/voice_batch.py` | Per-act batch voicing + respelling (channel settings) |
| `scripts/wt.py` | Join clips, Whisper check, word timing map |
| `scripts/debreath.py` | Breath removal |
| `scripts/prep_act_example.sh` | Real per-act chain from the Mongols video |
| `scripts/mix.py` | VO + SFX + music mix with ducking and loudness |
| `scripts/ORIGINAL_pushpam-voice_SKILL.md` | The original Claude skill this kit came from |
| `models/sh.rnnn` | Free RNNoise model for the stronger hiss clean-up |
| `examples/japan-act0/` | Real example: act text, respelled text, one finished clip, timing map |
