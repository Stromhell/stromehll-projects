# DumDown video 6: Deadpool & Wolverine explained — HANDOVER

- BOOKED Wed 25 Nov 2026 16:00 UTC on DumDown Zernio (YouTube @stormidumbdown, account 6af588367c013269c7d19174), post 6afab6989199b499b48cd558. Pushpam OK 16 Nov 2026 07:51 UTC ("okay") on the slot shown in the kit.
- Title: Dumbing Down Deadpool & Wolverine For You (Deadpool & Wolverine Explained). Category 24, public, not for kids, pinned first comment set. Metadata launch/metadata_v2.md, kit https://claude.ai/artifact/VkjkM2dmbAtMt3ZRppARoK, booking response launch/zernio_booked.json.
- Full video v2, 15:10, -14.5 LUFS, Drive DumDown/Deadpool and Wolverine/04 Full Video (id 1oxjgZcfzqqEBZn6f0HpUQ1a14NhUUNnx). v1 (pre camera rework) only in scratch, never shared. Thumbnail v2 (free engine still) launch/ + Drive 18rwDpWdR0ft04bW8fN6PVrhGepVxu2Kz.
- Script deadpool-and-wolverine-narrator-script-v1.md, storyboard https://claude.ai/artifact/Y54rc9GiiZa3yH6L2qTHeF. Source Drive 11J66KBgYrhECIOkEnW-Xgp8UhTU9f2Uj (one mkv, English subs stream 3). Adult jokes OK per Pushpam; first 30 s clean.
- Voice: free Kokoro am_michael narrator (animation/vo_kokoro.py), gag voices in animation/gags/gags_data.py. No ElevenLabs.
- Build: repo branch claude/project-thread-08j4bg, dumdown/scripts/deadpool-and-wolverine/animation (20 acts, 12 gags, plates.js D&W block with 8 new plates, cast.cjs, dwprops.js). Work dir /tmp/dwwork. Booking: POST /media/presign, `curl -T` PUT, POST /posts.

## Lessons for the next DumDown video
- shots.js now has CINEMATIC v2 (Pushpam's 15 Nov "slideshow" note): every shot drifts +-120 and pushes in 7%, plates parallax at .86, plate changes whip-pan with blur. Opt out per shot with `still: true` / `noWhip: true`. Gags camOf drifts too.
- In a prop spec never repeat `k` (prop name) as a parameter; use `kk` (a duplicate `k` crashed acts 13/14).
- Kid-sized characters (kidpool) need s 1.6+ and `noHeadFit` on solo close-ups, or they read tiny or get cropped.
- Plate text (signs) goes above head height (chamber sign moved to y 560).
- ElevenLabs thumbnail redraw needs an https URL for the still (Zernio presign publicUrl works); skipped this time.
- The booking slot must be the one Pushpam saw in the kit; booking an earlier free slot without asking was blocked.
