# Manga & Comics channel: setup plan v1 (20 Nov 2026)

Status: awaiting Pushpam's OK on style, voice, name. Channel name TBD ("M&C" is a placeholder).

## Decided
- Style: copy the reference's editing grammar (STYLE-BREAKDOWN-v1.md), with our own branding.
- Art: MIX (Pushpam, 20 Nov): real chapter pages Pushpam supplies for key moments + our own manga-style art for theory/joke scenes.
- Audio: free voice (Kokoro, optionally Chatterbox for more expression), music + SFX made in code. No ElevenLabs.

## Pipeline (Tools/mangacut/)
1. Script (01 Script): 45 s hook of stacked shock claims -> "let's cue the intro" -> chapter walkthrough in page order -> theory -> outro. ~2,700 words, ~18 min.
2. Pages in (03 Frames): Pushpam drops chapter pages; we write a shot list (shots.json) that crops panels per sentence.
3. Voice (05 Production/voice): Kokoro per sentence, voice_qa.py on every stem.
4. Render: `python3 mangacut.py shots.json out.mp4` (paper/black/starfield bg, Ken Burns, panel pop-outs, stamp memes, logo sting, watermark). ~1 s render per 1 s of video at 1080p.
5. Mix: `python3 mix.py out.mp4 final.mp4 --vo vo.wav --music bed.wav` (music ducked under VO, SFX on cuts, -14 LUFS).
6. QA: qa_auto.py + /watch. Note: "cut leak" flags on page-on-paper cuts are expected in this style (the paper background stays), so eyeball those.

## Next steps after OK
- Pick voice, channel name, colours -> logo sting, watermark, profile/banner.
- Mascot reaction stickers (our own memes instead of copied clips).
- Redrawn-art kit for theory scenes (proper manga-style characters, not the placeholder shapes in the style test).
- First video: Pushpam picks the series/chapter and sends the pages.
