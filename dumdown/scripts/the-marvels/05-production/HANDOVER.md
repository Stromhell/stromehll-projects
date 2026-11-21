# HANDOVER: DumDown video 10, The Marvels

- BOOKED Thu 3 Dec 2026 16:00 UTC (9:30 PM IST) on DumDown Zernio (YouTube @stormidumbdown, account 6af588367c013269c7d19174), post 6b0176a25d70644b4c2c4705. Pushpam OK 21 Nov 2026 10:44 UTC ("okay for now") on the kit https://claude.ai/artifact/R759k7NiVvQbfzMBZ1Xei9.
- Title: The Marvels But It Makes Sense Now (Funny Recap). Category 24, public, not for kids, pinned first comment. launch/metadata.md, launch/zernio_booked.json.
- Full video v2, 14:34, -14.5 LUFS, 20 acts + 10 gags, clean last 5 s. Drive AI/DumDown/The Marvels/04 Full Video (id 1ZlHVlFsFmCIt9CxfyKcOK_6okUEQisEZ). v1 only in scratch (cat in end screen).
- Thumbnail v1 free engine (thumb/thumb_act_mv.js + thumb_mk_mv.py). Voice Kokoro am_michael.
- Build: repo branch claude/project-thread-lu1yci, dumdown/scripts/the-marvels/animation (Thunderbolts engine + mvprops.js, mvplates.js 27 plates, 24 cast).

## Pushpam's feedback for the NEXT video (must apply)
See /mnt/project-files/dumdown/DumDown-NEXT-VIDEO-RULES-v1.md: real acting animation (punch = actual punch), proper framing (no graphics over characters or off to the edges), clean scene cut before each cutaway gag, Spider-Man BND voice (Chatterbox + Fenrir) for everything, researched joke writing, engagement/retention test before sharing, theory/clickbait packaging OK.

## Lessons
- A shot with p beyond the last paragraph gets zero length; give end-screen shots an explicit t0.
- `on: 0` hammer props over a hanging hand cover the face; place them free or layer 'back'.
- curl --data-binary runs out of memory on 1 GB files; use curl -T for Zernio presigned uploads.
- mixloki: shots with bg (no plate) need s.get('plate').
