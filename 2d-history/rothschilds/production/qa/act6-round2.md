# QA: Act 6 "Hatred and Loss", round 2

- File: `scratchpad/rs-preview/act6.mp4`, re-rendered on 31 Oct at 01:16. 1280x720, 30 fps, 55.51 s.
- Timing: `production/acts/act6/timing.json`. Shot 6 starts at 47.092 s and its VO at 47.367 s.
- Passes run: `qa.sh` with tag rs6b (33 frames). Sheets 1–2 were produced; sheet 3 failed because a single frame can't be tiled, so I checked that frame (the candle) directly. Also 1 fps sheets (`rs6b_fps_01/02.jpg`), full-res crops, 4–5 fps strips of the arrest walk-off and the 44.5–47.7 s join, a frame-difference motion scan, a corner-drift check, ebur128 and silencedetect.
- All coordinates are in 1920x1080 space.

## Content rules
- Swastikas: none. The soldiers' uniforms are plain grey-green with caps and no insignia, and there are no banners. PASS.
- Antisemitic imagery: all three pamphlets are blurred, the reader's own copy is blurred too, and each of the three is stamped FALSE in turn (10.5–15 s). PASS.
- Hitler: does not appear. PASS.
- Real people: the Baron is a generic figure in an overcoat and homburg, and Elisabeth is a name card only. PASS.
- See M2 for a portrayal concern about the new reader.

## Round-1 issues

| # | Status | Evidence |
|---|---|---|
| H1 reel over the man's head | FIXED | At 32–35 s the reel and card sit top-left (x 180–560, y 60–420), clear of every head. |
| M1 static frames, no reader, pamphlets vanish | FIXED | The reader walks in at 0–1.5 s and gestures with a pamphlet. All three pages stay in 6.02 and are stamped one by one. A slow push-in shows as corner drift (ΔY 2.6 over 2.2–7.2 s, 1.7 over 15.2–18.2 s), so nothing is frozen for more than 3 s. |
| M2 "(BLURRED)" caption | FIXED | It now reads "ANTISEMITIC PROPAGANDA · LATE 1800s". |
| M3 subtitles over feet | FIXED | Feet now sit at y ≈ 860 in the bank (20–29 s), street (30–39 s) and room (39–47 s) shots. The subtitle box is at y 940–1020. |
| M4 arrest reads as a handshake | FIXED | Two uniformed escorts flank the Baron, hold his arms and walk him off frame right (36–39 s) with real strides. The name tag has a leader line to him. |
| M5 Switzerland in France | FIXED | The arrow now ends north of Genoa (about x 1160, y 585), east of France. |
| L1 faded card stuck on map | FIXED | "EUROPE · 1940" is at full opacity. |
| L2 USA dot reads as Ireland | FIXED | It is now an edge tag reading "USA" at the left frame edge. |
| L3 CLOSED sign floating | FIXED | It hangs on shut arched doors in the central arch. |
| L4 arms through neighbours | FIXED | The crowd now raises fists over their heads, and no arm crosses a neighbour's body. |
| L5 map dissolve vs VO | FIXED | The room stays up through "seized." (46.5 s). The dissolve runs 47.0–47.9 s and "Many family members…" starts at 47.31 s (audible) / 47.37 s (timing.json), with the map about half in. That reads fine. |
| L6 candle hold | PARTLY FIXED (hold deferred) | The flame now flickers (motion 0.1–0.4 at 52.5–55 s). The file still ends 1.0 s after the last word (VO 54.48 s, end 55.51 s). |
| L7 loudness | DEFERRED TO COMBINE | Unchanged: −16.0 LUFS integrated, LRA 2.6 LU, true peak −1.3 dBFS. |
| L8 card text | FIXED | The bottom-right card reads "CREDITANSTALT · 1931" and the top-left tag reads "VIENNA". |

## New issues

### MEDIUM

**M1. 38.0–39.0 s: the Baron's name tag is cut off at the right frame edge, reading "BARON LOUIS RO…"**
- Region: x 1700–1920, y 330–380.
- Likely cause: the tag is parented to the Baron and follows him off frame without fading.
- Fix: fade the tag out over 0.3 s starting at about 37.7 s, before the group passes x ≈ 1500. Or clamp the tag inside a 40 px frame margin and fade it as the group exits.

**M2. 0.5–10 s: the new reader's full black beard covers his mouth, and he scowls**
- Region: face at about x 590–760, y 300–460.
- At this size the beard reads as a black mask. Next to the antisemitic pamphlets, a menacing, faceless bearded Jewish figure risks echoing the caricature the shot is debunking. The script wants a family member who is the target of these pamphlets.
- Likely cause: a stock beard asset with no mouth cut-out, plus the default "angry" expression.
- Fix:
  - Use a shorter, trimmed beard with the mouth visible, or no beard.
  - Change the expression to worried or hurt (brows up, small frown) instead of angry.
  - Keep his outfit as is.

### LOW

**L1. 20–29 s: the "CREDITANSTALT · 1931" card clips the shoes of the woman in green on the far right**
- Region: x 1610–1700, y 845–865. The card spans x 1410–1840, y 855–920.
- Fix: move the card 30 px down (it stays above the subtitle band), or move her 120 px left.

**L2. 47.0–47.9 s: two map overlays pop in at full opacity before the dissolve finishes**
- The arrow-origin dot appears at about x 1354, y 532, over the walker's head in the fading room.
- The "EUROPE · 1940" card shows at x 1680–1850, y 380–430 while the map is only about 40 % in.
- Likely cause: the overlays are not parented to the map layer's opacity.
- Fix: start both overlays at 47.9 s, or parent them to the map's opacity.

**L3 (carried from round 1, deferred). 54.48–55.51 s: the act ends 1.0 s after "died in the camps."**
- Fix: hold the shot 2–3 s longer with room tone and a slow fade to black.

**L4 (carried from round 1, deferred to combine). Audio level is −16.0 LUFS against the −14 target**
- True peak is −1.3 dBFS.
- Fix: two-pass `loudnorm=I=-14:TP=-1.5:LRA=7` with a limiter at combine.

## Clean checks
- No gliding walks. The 5 fps strip of the escort walk-off at 35.6–38 s and the room walkers show stride changes on every step.
- No flicker, no blocky or empty plates, and no floating figures. Everyone stands on the ground plane.
- No cards over the subtitle text, and no subtitles over characters.
- No harsh audio cuts. VO gaps of 0.2–0.6 s sit at the scene joins (18.0, 29.1, 38.9, 46.7, 51.0 s).
- No SFX louder than the VO: momentary peaks of −12 to −13 LUFS match word onsets.

Totals: 0 high, 2 medium, 4 low. Two of the lows are deferred (the L6 hold and L7 loudness).

RESULT: FIXING
