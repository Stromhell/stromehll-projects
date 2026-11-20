# DumDown video 8: Thunderbolts* explained — HANDOVER

- BOOKED Sun 29 Nov 2026 16:00 UTC on DumDown Zernio (YouTube @stormidumbdown, account 6af588367c013269c7d19174), post 6b00198dda00f0ee6168b0fc. Pushpam OK 20 Nov 2026 09:53 UTC ("okay") on the kit https://claude.ai/artifact/Y7usiLC2kWzXe1FvuQBbwe.
- Title: Thunderbolts* But It Makes Sense Now (Funny Recap). Category 24, public, not for kids, pinned first comment. Metadata launch/metadata.md, booking response launch/zernio_booked.json.
- Full video v2, 12:39, -14.5 LUFS, Drive AI/DumDown/Thunderbolts/04 Full Video (id 1ZthXzhI0o99sPI3S6AV4_kBi8VnJnsHz). v1 only in scratch (mirrored truck sign). Thumbnail v1 free engine still (thumb/thumb_act_tb.js + thumb_mk_tb.py), Drive 1rl2xBO1l8o7p8pdNoQeGzcAqRHiafaKR.
- Script thunderbolts-narrator-script-v2.md, storyboard https://claude.ai/artifact/QdvnhXQhwBSeXCHDnupJaj. Source Drive 1It0aum7Ct5VktM8YWXDPkdN_7gTTmGU8 (research only). Family-friendly.
- Build: repo branch claude/project-thread-xrw5lo, dumdown/scripts/thunderbolts/animation (18 acts, 10 gags; tbkit.js action poses/anims + metal arm; tbprops.js; Thunderbolts plates block in plates.js; cast in cast.cjs). Work dir /tmp/tbwork.

## Lessons for the next DumDown video
- ANIMS.idle overwrites pose.bob, so pose bob values only matter in anims; tbkit cp() zeroes bob so anim and pose sitting match.
- Arm-up poses (lift, hug) read wrong in side view: use threequarter/front.
- Prop/char `rot` and `ghost` accept [a,b] arrays now (shots.js val()).
- Prop with dir:-1 mirrors its painted text (truck sign); keep dir 1 on props with words.
- Unknown expr names fall back silently: valid ones are neutral, deadpan, happy, smile, smug, angry, shock, nervous, sad, blank, excited.
- render_gags.sh needed `mkdir -p` for its frame dir.
- Full render: ~1 min per act on 4 cores, assemble ~13 min.
