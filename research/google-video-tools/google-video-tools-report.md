# Google video tools: what we can use (29 Oct 2026)

## Short answer
- **Google Vids (Google's video editor):** no access. There is no connector or public API. Vids files sit in Drive, which we can read, but we can't open or edit them.
- **Flow (Google's AI film app):** no public API, so no direct access. Its engine (Veo 3.1) is reachable another way, below.
- **Gemini Omni 1.1 Flash (Google's newest video model, from I/O May 2026):** reachable through Creative Claw and ImagineArt. Makes clips from text or images and can **edit an existing clip from a prompt**. Native audio, first/last frame control, scenes extendable to ~40 s, 4K upscale, cheap 360p drafts.
- **Veo 3.1 (Lite / Fast / Quality):** reachable through Artlist (and ImagineArt). Text-to-video and image-to-video, with or without audio, up to 4K.

## What we have right now
| Tool | Google model | Balance today | Notes |
|---|---|---|---|
| Creative Claw | Gemini Omni Flash | 84 credits | An 8 s 720p clip is estimated at ~120 credits, so one top-up is needed |
| Artlist | Veo 3.1 / Veo 3.1 Fast | 1 free video left (one-time) | More needs an Artlist plan |
| ImagineArt | google-omni-flash, veo-3.1 | not checked yet | Needs an organisation pick first |

Google's own prices for reference (Gemini API, per second of output): Veo 3.1 Lite $0.05-0.08, Fast $0.10-0.30, Standard $0.40-0.60. Flow subscription: AI Pro $19.99/mo for 1,000 credits (a Veo 3.1 Fast clip is 20 credits). Sources disagree on whether the Veo 3.1 preview API was shut on 22 Oct 2026; Google is moving video to Gemini Omni.

## How it could fit our lines
- **3D line (slow):** best fit. Veo 3.1 / Omni can make short cinematic inserts (establishing shots, aircraft, oceans, crowds) from a rendered still, which could cut render time on Thunderbolt, Caesar, Bermuda, Doolittle.
- **2D dynamic (Village Painterly):** use with care. Image-to-video from an approved painterly frame can add camera moves and ambient motion (smoke, water, crowds), but AI models drift off-style and redraw faces. Good for B-roll shots, not for the locked cast.
- **2D line (rigged characters):** low fit. Our rig gives exact joints and lip timing; AI clips would break the character style rules.
- **Reels / shorts:** Omni's prompt editing could make quick vertical variants, but the logo watermark and end card still go on in our own pipeline.
- **Voice:** both models make native audio, but we keep our own VO. Note: none of this uses ElevenLabs credits.

## Risks
- Style drift and changing faces between clips.
- Clips are short (8-10 s, ~40 s with extend), so it's for inserts, not whole acts.
- Credits cost money; nothing here is free past the one Artlist trial video.
- Real people (e.g. Putin, Franco) may be refused by the models' likeness filters.

## Suggested next step
One test: take one approved Village Painterly frame and one 3D still, and make a 5-8 s image-to-video clip of each (the free Artlist Veo 3.1 video plus one Creative Claw top-up). Then judge style match before using it in production.

Sources: [Gemini Omni 1.1 Flash, Google blog](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/), [Veo in the Gemini API](https://ai.google.dev/gemini-api/docs/veo), [Gemini Omni Flash launch, The Next Web](https://thenextweb.com/news/google-gemini-omni-flash-video-model-io-2026), [Google Flow explained, Pixo](https://pixo.video/blog/google-flow-ai-explained), [Veo 3 pricing, CloudZero](https://www.cloudzero.com/blog/veo-3-pricing/), [Flow has no API, Wireflow](https://www.wireflow.ai/blog/google-flow-api).
