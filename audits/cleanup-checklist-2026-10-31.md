# What to remove: cleanup checklist (31 Oct 2026)

Only you can do this part. Connectors and plugins are account settings and I can't change them from a thread.
Connectors: https://claude.ai/customize/connectors. Plugins: Customize → Plugins.

## KEEP (the pipeline uses these)
| Item | Why |
|---|---|
| Zernio (connector + plugin) | All scheduling |
| GitHub | Repo storage rule |
| Google Drive (the claude.ai connector "Google Drive") | Drive storage rule |
| ElevenLabs **full** connector (the one named "elevan_labs", 160 tools, has image generation) | Long-form thumbnails only |
| Claude Docs | Docs |
| remotion plugin | Facts shorts are built in Remotion |
| superpowers, hookify | Harness (tested lightest) |
| Your account skills (anthropic-skills: pushpam-voice, youtube-thumbnail, yt-*) | Used by the lines |

## REMOVE: connectors
| Connector | Tools | Bytes per session (names + instructions) | Why it's safe |
|---|---|---|---|
| ElevenLabs (restricted duplicate, 151 tools) | 151 | 9,908 | Duplicate; it has no image model, and the full one is kept |
| Adobe | 111 | 7,669 | Not in rulebook or memory |
| ImagineArt | 76 | 5,659 | Not used |
| creative-claw | 70 | 6,529 | Not used, needs sign-in anyway |
| upload-post | 72 | 3,891 | Zernio does all posting |
| R3 | 65 | 5,180 | 3D web apps, not used |
| HyperFrames by HeyGen | 11 | 4,661 | Not used |
| artlist | 33 | 5,098 | No credits (memory) |
| mage | 16 | 3,873 | Needs a paid Gem pack (memory), not used |
| VoiceCapture | 9 | 4,011 | Survey widget, not used |
| Canva | 42 | 1,316 + plugin | Not in rulebook (thumbnails are in-house) |
| composio | 11 | 440 | Not used |
| Runway Export | 1 | 50 | Not used |
| Instagram plugin | — | — | Fails to connect every session; Zernio posts to IG |

## REMOVE: plugins
| Plugin | What it adds every session |
|---|---|
| small-business | QuickBooks 99 tools, Shopify 42, Gmail 23, Calendar 9, a second Google Drive, ~40 "needs sign-in" servers, ~60 skills |
| marketing | ~5 unsigned servers + skills |
| product-management | ~15 unsigned servers + skills |
| zizi-skills | 5,332 bytes of skill list (largest) |
| seo-audit, aeotester | 4,699 bytes of skills |
| agent-protocols | 1,802 bytes of skills + a SessionStart hook that errors (10,917 bytes of broken output) every session |
| token-shield, token-efficiency-audit | 2,305 bytes of skills |
| adobe-for-creativity, canva, creative-claw, upload-post, meshy-3d-agent, dataink, design, caveman, instagram | ~3,100 bytes of skills |

## Measured size of what's being removed (from this session's log)
- Tool names: 36,611 bytes
- Server instructions: 36,836 bytes
- Skill list entries: 18,935 bytes
- **Total: 92,382 bytes per session start** (not counting the ~44 "needs sign-in" notices)

## Estimated savings (estimate: bytes ÷ 3.5–4 ≈ tokens, not measured)
- **About 23,000–26,000 tokens off every session's starting context**, roughly 20% of the 118,880 measured today.
- Every turn re-reads that context, so a 50-turn thread re-reads about 1.2M fewer tokens.
- Every cold start (new thread, 2-hourly watchdog, daily tasks) writes about 23–26k fewer tokens to cache. About 15 cold scheduled fires a day comes to roughly 350k fewer cache-write tokens a day, before counting production threads.
- The handover + fresh-thread rule (set up separately) stops thread history from piling up on top of this. That saving depends on thread length and can't be measured until it runs.

After you remove them, ask me (or any thread) to re-run the turn-1 context measurement. That gives the real number, which replaces this estimate.
