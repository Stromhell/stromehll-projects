# Rothschilds reels: render checkup, round 1

Files: `/tmp/claude-0/rsreels/out/RS_Reel_01.mp4` to `RS_Reel_15.mp4` (1080x1920, 30 fps, AAC mono 48 kHz)
Builder: `2d-history/shared/tools/build_reel.py`. Config: `/tmp/claude-0/rsreels/reels.json`
Date: 31 Oct 2026. Method: 1 fps contact sheets for every reel, 5–10 fps strips at the hook→clip and clip→end joins, full-res band crops where needed, ebur128, sample-jump/RMS scan at both joins, freezedetect + blackdetect on the picture band, end-card voice cross-correlated against vo-16/17/18, word timings checked against `acts/actN/timing.json`.

## Checks that passed on all 15 reels

- **Hook text** matches reels.json word for word on every reel.
- **Loudness**: I between -13.9 and -14.6 LUFS. True peak -1.4 to -1.5 dBTP (target ≤ -1). LRA 3.2–6.4.
- **Joins**: no clicks or pops. The largest sample jump at either join is 0.03, and no sample jump anywhere is over 0.5. The hook voice ends about 0.2 s before the clip starts. Clip narration ends 0.27–1.1 s before the clip's 0.25 s fade-out, and the CTA starts 0.3 s after that. **No overlap** between hook voice, clip narration and CTA voice on any reel.
- **CTA voice** is vo-16, "Watch the full video on our YouTube channel" (correlation 0.98–0.99; vo-17 and vo-18 score about 0.1).
- **Clip in/out**: every clip starts on a narration sentence start and ends on a full stop. No word is cut at either end (no words straddle t0 or t1).
- **Kicker and logo do not overlap.** The widest kicker box ends at about x 780, and the logo starts at x 820.
- **Picture**: no black stretches. The only freeze over 1.5 s is the static end card.
- **End card**: present on all 15, with logo and both lines of text.
- **A/V length**: video and audio match within 20 ms on every reel.
- **Characters**: all are stylised cartoons. Reel 6 shows the pamphlet blurred and stamped FALSE, with "LEGEND" and question-mark labels on the myth retelling, and ends on "What historians found / No good evidence of a great swindle".

## Problem across 11 reels: the hook plays over the previous act shot

For every reel cut from mid-act (t0 > 0: reels 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15), `frames[0]` at t0 is still the **last frame of the previous shot**. The act's incoming dissolve runs from about t0+0.1 to t0+0.6 s. So:
- the whole hook card sits over an unrelated picture;
- the clip then opens with a 0.5 s dissolve out of that shot.

Reels that start at t0 = 0 (1, 2, 4, 12) are not affected.
**Fix in build_reel.py (one change fixes all 11):** when t0 > 0, take the hook still from `frames[int(0.8*FPS)]`, and replace clip frames 0…int(0.7*FPS) with that same frame. Holding the frame keeps the audio in sync, because narration starts at t0+0.275 and must not be trimmed. Do not just move t0 later, because that would cut the first word.

---

## Reel 01: LENT A SUPERPOWER £4,000,000 (39.7 s)
- LOW, 0:00–0:05.5: the hook is held for 5.5 s on one still with a slow zoom, against a 1–2 s spec. Fix: accept it, or shorten the hook line.
- LOW, 0:35.5: the last caption group "THEY GET THERE?" disappears the moment the word ends, with no 0.6 s hold. This happens on every reel: for the final word, the `cur` logic only matches `s<=t<=e`. Fix: let the final group stay up until grp[-1].e + 0.6.
- LOW, 0:00–0:39: the kicker is 2 lines and its box top is at y 212, inside the top ~250 px that IG/TikTok UI can cover. Fix: shorten it to fit one line, for example "LENT BRITAIN £4M".
- LOW, 0:37–0:39: a ghost of the kicker shows through the end-card dim (alpha 236). This happens on every reel. Fix: in `end` mode, draw the canvas without `kicker(d)`, or dim to 250.

## Reel 02: FROM A LOCKED STREET (30.8 s)
- LOW, 0:26.4–0:27.0: the 3-word caption grouping splits the quote into "RED SHIELD, 'ZUM" / "ROTEN SCHILD'." This happens on every reel. Fix: break groups at punctuation and quote marks, or allow up to 4 words.
- LOW: 2-line kicker, top at y 212 (same as Reel 01). Fix: put it on one line, for example "LOCKED IN AT NIGHT".

## Reel 03: WAR MADE THEM RICH (40.1 s)
- MEDIUM, 0:00–0:04.4, then a dissolve to 0:05.1: the hook plays over the act 1 s7 map ("GROWTH NEEDS CAPITAL / SOMEBODY HAS TO LEND IT"). Fix: the build fix above.
- MEDIUM (content), whole reel: the kicker "WAR MADE THEM RICH" and the hook "Napoleon's wars made this family rich" put "they profit from war" up front, and that is a stock Rothschild conspiracy trope. The clip itself is measured (loans, managing a prince's money, blockade smuggling), but the frame text read alone could look like an endorsement. Fix: reword, for example kicker "BANKING IN WARTIME" and hook "Napoleon's wars changed this family's fortunes. Here's how."
- LOW, 0:04.4: an act coin SFX (cue at t0-0.36) is clipped by the clip fade-in. You hear a faint coin tail. Fix: none needed, or start the fade 0.4 s later.

## Reel 04: 5 SONS, 5 CAPITALS (31.7 s)
- LOW, 0:00–0:04.8: the hook still is the empty Judengasse before the five brothers walk in. It is relevant but empty. Fix: optional, take the hook still from about 2 s into the clip (brothers in frame).

## Reel 05: THE SECRET LETTERS (27.4 s)
- MEDIUM, 0:00–0:02.7, then a dissolve to about 0:03.3: the hook "They wrote in a script…" plays over the five-arrows crest shot from act 2 s3. Fix: the build fix above.

## Reel 06: THE WATERLOO MYTH (32.2 s)
- LOW, 0:00–0:04.5, then a dissolve to about 0:05.1: the hook plays over the previous shot (Nathan, London, "GOLD TO PAY BRITISH ARMIES"). It is on topic, so the impact is low, but the same dissolve-in happens. Fix: the build fix above.
- Content OK. The myth is labelled LEGEND, every claim label ends in "?", and the pamphlet appears at 0:19 blurred, is stamped FALSE by about 0:20, and sits beside "WHAT HISTORIANS FOUND". No action.

## Reel 07: GHETTO TO BARONS (22.0 s)
- **HIGH, 0:00–0:04.2, then a dissolve to about 0:04.8**: the hook "BORN IN A GHETTO. MADE BARONS BY AN EMPEROR." sits over the blurred antisemitic pamphlet slide ("SPREAD LATER BY PAMPHLETS / SOME OPENLY ANTISEMITIC", FALSE stamp) from act 3 s4. This reel never explains it. The pamphlet becomes the reel's opening frame and likely its thumbnail, next to a hook about Jewish origins, and that pairing can read badly out of context. Fix: the build fix above, so the hook still becomes the "THE REAL MONEY: SLOW AND STEADY" bonds chart. Re-check the cover frame after the rebuild.

## Reel 08: THEY FUNDED COUNTRIES (20.9 s)
- MEDIUM, 0:00–0:02.8, then a dissolve to about 0:03.4: the hook plays over the act 4 s2 railway shot ("EARLY FRENCH RAILWAYS / PAID FOR BY HIS BANK"). Fix: the build fix above.
- MEDIUM (content), whole reel: the hook "This family paid for a whole country to exist" and the kicker "THEY FUNDED COUNTRIES" overstate what the narration says (Belgium "needed money", "the Paris and London houses lent it", and a Brazil loan). The wording feeds the "Rothschilds own nations" trope. Fix: for example hook "When Belgium broke away, it needed a loan to survive. Guess who lent it." and kicker "LOANS TO NEW NATIONS".
- LOW: 2-line kicker, top at y 212. Fix: the shorter kicker above fixes this too.

## Reel 09: THE 1835 LOAN (18.8 s)
- MEDIUM, 0:00–0:05.0, then a dissolve to about 0:05.6: the hook "In 1835 Britain paid off slave-owners…" plays over the Brazil ship shot ("RIO → LISBON"). Fix: the build fix above.
- LOW, 0:00–0:05: the hook is held for 5 s (the voice line is 4.7 s). Fix: optional, a shorter hook.

## Reel 10: 11 YEARS FOR ONE SEAT (21.2 s)
- MEDIUM, 0:00–0:03.1, then a dissolve to about 0:03.7: the hook plays over the Irish famine relief shot ("THE GREAT FAMINE / BRITISH RELIEF ASSOCIATION"). Fix: the build fix above.
- MEDIUM, 0:11.8–0:18.2: the clip runs on into act 4 s8, the £16 million Crimean War loan ("to fight Russia"). That topic has nothing to do with the hook or kicker. The oath reel ends on a war loan, which also sounds like "funding wars". Fix: set s1 = 7 so t1 is the s8 start, ending on "…the first practising Jewish MP." Check that t1 falls on that shot boundary.

## Reel 11: PROPPING UP EMPIRES (23.2 s)
- MEDIUM, 0:00–0:02.8, then a dissolve to about 0:03.4: the hook plays over the Crimea "£16 MILLION / BORROWED TO FIGHT RUSSIA" shot. Fix: the build fix above.
- LOW (content): "When empires went broke, they called one family" and "PROPPING UP EMPIRES" lean toward "one family controls governments". The clip makes clear they raised loans. Fix: optional, "When governments needed big loans, they called this bank."

## Reel 12: WORST TIMING EVER (29.9 s)
- No build issues. The hook text wraps to 3 lines ("DISASTER." alone on line 3), which is still readable. Note only.

## Reel 13: DIAMONDS AND OIL (33.9 s)
- MEDIUM, 0:00–0:04.0, then a dissolve to about 0:04.6: the hook "Diamonds, then oil…" plays over the phylloxera shot (magnifier on the insect). Fix: the build fix above.

## Reel 14: ZEBRAS TO THE PALACE (19.4 s)
- MEDIUM, 0:00–0:04.1, then a dissolve to about 0:04.8: the hook "A Rothschild drove zebras to Buckingham Palace" plays over the Shell sale desk shot ("SOLD TO ROYAL DUTCH SHELL"). The mismatch is obvious. Fix: the build fix above.
- qa_rules items 9 and 10 checked at full resolution (0:08.5 and 0:12.5): the three zebras are evenly spaced with no overlap, and the carriage and zebras are layered clearly in front of the gates. OK.

## Reel 15: TRILLIONS? NO. (26.7 s)
- MEDIUM, 0:00–0:05.4, then a dissolve to about 0:06.0: the hook "Are the Rothschilds worth trillions? No." plays over the 1981 map with a red "NATIONALISED" stamp and "THE NEW CENTRE OF MONEY". Out of context, the stamp next to the trillions question is confusing. Fix: the build fix above.
- LOW, 0:05.7–0:06.6: the caption splits "TODAY ROTHSCHILD & / CO IS STILL". "TODAY" is never highlighted because its start time is the same as "Rothschild". Fix: the punctuation-aware grouping (Reel 02 fix) and keeping "&" with the next word.
- Content OK: it ends on "Online claims of 'trillions' are fantasy" with a FANTASY stamp, so it debunks clearly.

---

## qa_rules.md pass (grounding, held props, still frames, overlaps, detail)
No new hits added by the reel build. Every character shot inside the clips is the act render that already passed. The build only adds the static hook still, which has a 6% zoom so it is not frozen, and the static end card, which is a graphic card and not a character shot. Zebra and vehicle crossings in reels 11 and 14 were checked again, and no hits were found.

## Summary
| Sev | Reel | Time | Item |
|---|---|---|---|
| HIGH | 07 | 0:00–0:04.8 | Hook plays over the antisemitic-pamphlet slide from the previous shot |
| MED | 03, 05, 08, 09, 10, 11, 13, 14, 15 | 0:00 to hook end + 0.6 s | Hook plays over the previous act shot, then dissolves in (one build fix) |
| MED | 03 | whole | "WAR MADE THEM RICH" framing reads as the war-profiteer trope |
| MED | 08 | whole | "Paid for a whole country to exist" overstates the facts and feeds the "own nations" trope |
| MED | 10 | 0:11.8–0:18.2 | Clip runs into the Crimean War loan; end it at the s8 start |
| LOW | various | — | Final caption group not held; 3-word groups split quotes and names; 2-line kickers top at y 212 (01, 02, 08); kicker ghost on end card; long held hooks (01, 09, 15); reel 06 hook-frame dissolve |

**RESULT: FIXING**
