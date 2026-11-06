# Act 3 QA (act3r8): NOT CLEAN

Method: watch skill (local, balanced, 768) + 1 fps sheets (5) + 4 fps strip of 3.1 + frame-step of the 3.14/3.15 cut. No black frames found by blackdetect.

## Requested checks
- 3.1 push-in: ends lit (flag, portrait, floor visible at 4.4 s). Never goes to black. PASS.
- 3.1 caption vs portrait: the IDI AMIN badge sits on the top third of the portrait frame and hides the portrait's head. Problem (see table).
- 3.14/3.15 sheet: the same cream DEMANDS sheet is on both sides of the cut, EXCEPT the first frame of 3.15, which shows the board with no sheet. Problem (see table).

## Issues
| Time | Shot | Problem | Sev | Fix |
|---|---|---|---|---|
| 01:26.83 (1 frame) | 3.15 first frame | Board is empty: the DEMANDS sheet is missing for 1 frame at the cut, then pops in | HIGH | Spawn the sheet before frame 0 of 3.15 (or pre-roll a frame before capture) |
| 00:01-00:04 | 3.1 | Name badge covers the top of the portrait (hides the head), reads as a label stuck on the picture | MEDIUM | Move the badge left/below the portrait or near the figure's shoulder, or move the portrait right |
| 00:00-00:04 | 3.1 | Portrait is a blurry blob of colour, low detail in a push-in | MEDIUM | Give it a real painted generic-officer texture |
| 00:00-00:04, 00:05-00:12, 01:00-01:06 | 3.1, 3.2, 3.13 | Amin's trousers/jacket blown out with a glowing sheen (rule: weird glow) | MEDIUM | Lower specular/emissive on the uniform, reduce key-light intensity |
| 01:27.4 | 3.15 | $5,000,000 sheet pops in at once | MEDIUM | 0.3 s slide/fade-in |

Rest of act (3.2-3.14): grounding, overlaps, motion, walking (3.10 walkers travel), map shots fine; no other hits.
