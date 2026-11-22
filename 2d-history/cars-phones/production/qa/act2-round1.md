# act2 (The 70 mph test) round 1
Re-voiced VO: prep_act.sh refreshed timing (69.93 s); render 69.90 s matches. Pre-render fixes from writer notes: placards now held overhead on poles ending at owners' raised hands (owners s 1.9); runway dashes + cones stream past under the cars in shots 2 and 4 (real travel, not just speed lines); HALF BLIND card on 'driven' (~2 s earlier); NAME tags and source tags scaled 1.5x (readable).
qa_auto: FAIL z-fighting bottom-centre 0:07-0:20 and 0:29-0:40 = the intentional scrolling runway dashes/cones (deterministic, no random) -> false positive, low. WARN loudness -16.7, cut rhythm (VO paragraphs).
| t | issue | sev | cause | fix |
|---|---|---|---|---|
| 0-7 | tester small in wide shot | med | s 1.6 | s 2.0, nearer camera |
| 18-29 | showroom composition holds ~10 s | med | tiny cam push | wider push + pan |
| 59-70 | design boss partly behind press table | low | layout | left |
