# Act 8 · QA pass act8r4 (re-render after r3 fixes)
File: /home/user/work/tb3_acts/act8.mp4 (136.8 s). Looked at: watch_sheet.jpg (9 frames), 1fps_01..07.jpg, z_*.jpg, zz.jpg, z818.jpg, YAVG probes.

**Verdict: 0 high, 0 medium, 1 low. Clean of MEDIUM/HIGH issues.**

| # | Time | Shot | Problem | Sev | Fix |
|---|------|------|---------|-----|-----|
| 1 | 1:00.0 (one frame) | 8.10 | The flash is now one frame, but that frame is still a flat grey wash (YAVG 99 against about 16–19 around it). The sky goes grey and the navy is lost for that frame. It reads as a short flash, so this is minor. | LOW | Tint the flash frame toward the navy sky, or cap its exposure lower. |

## Fixes from r3
- 8.18 (1:42–1:48): fixed. The pillar base is clear of the mattresses, and the mattress sits behind the pillar.
- 8.15 (1:21.6–1:28.7): fixed. The scene stays visible (YAVG about 47) until about 1:27.9, then fades over about 0.75 s.
- 8.10 (~1:00): mostly fixed. The flash is clamped to one frame, and the shot keeps the navy runway. See #1.
- 8.1 (0:00–0:04.7): fixed. Parchment stains and a vignette are visible, and the arrow no longer crosses the caption.

## Checklist (render-qa-rules)
- Grounding is OK. Hostages are on mattresses and walkers are on the runway.
- Held props are in hand: lamps, megaphone, radio handset.
- There are no vehicle overlaps, and no frozen frames beyond the intended short black under "He is killed" (1:57).
