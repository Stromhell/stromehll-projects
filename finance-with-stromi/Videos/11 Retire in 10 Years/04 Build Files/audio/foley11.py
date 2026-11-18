# ---------- per-shot foley (video 11) ----------
def caw(): t = ts(0.35); f = 650 - 350 * t; s = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * (0.6 + 0.4 * np.sin(2 * np.pi * 70 * t)); return lp(s, 0.25) * env(len(t), 0.01, 0.18) * 0.35
def caws(i, t0, n=3): [at(i, t0 + k * 0.42 + rng.uniform(0, 0.08), caw(), 0.45, rng.uniform(-0.5, 0.5)) for k in range(n)]
def drumroll(d): t = ts(d); return lp(noise(d), 0.2) * (0.55 + 0.45 * np.abs(np.sin(2 * np.pi * 14 * t))) * np.minimum(1, t / max(0.01, d)) * 0.7
def sizzle(d): t = ts(d); n = len(t); c = hp(noise(d), 0.5) * (rng.random(n) > 0.985) * 2.0; return (hp(noise(d), 0.35) * 0.25 + c) * np.minimum(1, np.minimum(t, d - t) / 0.3)
def scrib(d): t = ts(d); return hp(noise(d), 0.45) * (0.3 + 0.7 * np.abs(np.sin(2 * np.pi * 5 * t))) * 0.3
def lever(): return np.concatenate([creak(0.35) * 0.6, clack() * 2])
def pecks(i, t0, t1, g=0.5): [at(i, t, clack(), g, rng.uniform(-0.3, 0.3)) for t in np.arange(t0, t1, 0.22)]
def honk(): t = ts(0.5); return lp(np.sign(np.sin(2 * np.pi * 410 * t)) + np.sign(np.sin(2 * np.pi * 520 * t)), 0.3) * np.minimum(1, (0.5 - t) / 0.05) * 0.12
def tear(): return hp(noise(0.5), 0.3) * env(int(0.5 * SR), 0.01, 0.25) * 0.6
def cannon():
    x = thud(60, 0.7) * 1.5; p = pop(); i = int(0.05 * SR); x[i:i + len(p)] += p; return x
q = lambda i, ph: gs(i, TM_(i, ph))
# R01 game show: wheel ticks, spotlight, buzzers, audience
at('R01', 0.2, cheer(2.5), 0.18); ticks('R01', 1.0, 4.0, 0.5); at('R01', 0.4, thud(140, 0.3), 0.35)
at('R01', gs('R01', wt('R01', 'PIP') - 0.25), buzz(0.3), 0.6, -0.3); at('R01', gs('R01', wt('R01', 'DOT') - 0.25), buzz(0.3), 0.6, 0.3); at('R01', gs('R01', D('R01') - 1.6), cheer(1.5), 0.12)
# R02 diner grill at 4 a.m.
at('R02', 0.2, sizzle(D('R02') - 0.4), 0.5); [at('R02', gs('R02', 2.0 + k * 3.2), thud(220, 0.18), 0.35) for k in range(4)]; at('R02', gs('R02', wt('R02', 'NADIA') - 0.3), clink(), 0.4)
# R03 sticky note slap, fry flies
at('R03', 0.2, sizzle(D('R03') - 0.4), 0.3); at('R03', gs('R03', 1.2), paper(0.25), 0.5); at('R03', gs('R03', 1.3), thud(260, 0.15), 0.5); at('R03', gs('R03', wt('R03', 'OSCAR') + 1.6), pop(), 0.5)
# R04 envelope wiggle, drum roll, countdown clock
at('R04', 0.5, paper(0.4), 0.4); at('R04', gs('R04', D('R04') - 6), drumroll(4.5), 0.35); ticks('R04', gs('R04', 3.0), gs('R04', D('R04') - 1.0), 0.35); at('R04', gs('R04', wt('R04', 'CHET') - 0.2), ding(), 0.3)
# R07 shoebox of receipts tipped out, sorting
at('R07', 0.8, thud(160, 0.3), 0.4); at('R07', 1.0, paper(1.2), 0.5); [at('R07', gs('R07', 4.0 + k * 2.2), flip(), 0.4, (k - 3) * 0.12) for k in range(6)]
# R08 adding-machine tape, stamps
at('R08', 0.5, bleep(10, 0.08, 900), 0.25); at('R08', 1.0, sweep(3.0), 0.3); at('R08', q('R08', 'three thousand'), stamp(), 0.55); at('R08', q('R08', 'thirty-six'), stamp(), 0.55)
# R10 orchard at dusk: knife peeling an apple
[at('R10', gs('R10', 1.0 + k * 1.6), snip(), 0.35) for k in range(5)]; at('R10', gs('R10', wt('R10', 'BARB') - 0.4), creak(0.6), 0.25)
# R11 sepia 1994 office: computer hum, pencil running down the scroll
at('R11', 0.3, keys('R11', 0.3, 2.5, 0.35) or np.zeros(1), 0); at('R11', 2.5, scrib(3.0), 0.5); ticks('R11', 2.5, 6.5, 0.3)
# R12 1966 storm, gauge drops, stamp
at('R12', 0.5, thunder(), 0.45); at('R12', gs('R12', 4.0), powerdown(), 0.5); at('R12', q('R12', 'four percent'), stamp(), 0.6)
# R13 carving x25 into the post
[at('R13', gs('R13', 1.0 + k * 0.3), saw_s(), 0.5) for k in range(7)]; at('R13', q('R13', 'nine hundred'), ding(), 0.35)
# R14 second line scratched, knife-handle tap
[at('R14', gs('R14', 1.2 + k * 0.3), saw_s(), 0.45) for k in range(6)]; [at('R14', gs('R14', wt('R14', 'BARB') + k * 0.25), clack(), 0.6) for k in range(2)]
# R16 planting the sapling, watering can
[at('R16', gs('R16', 0.8 + k * 0.5), thud(110, 0.25), 0.4) for k in range(3)]; at('R16', gs('R16', 3.5), water(2.5), 0.45); at('R16', gs('R16', 3.5), gurgle(2.5), 0.25)
# R17 Oscar's new sneakers, flicks the fruit
steps('R17', 0.6, 3.0, 0.35, 0.55); at('R17', 1.2, squeak(), 0.4); at('R17', gs('R17', wt('R17', 'OSCAR') - 0.3), clink(), 0.6)
# R18 time-lapse years, bars grow
[at('R18', gs('R18', 1.0 + k * 2.5), whoosh(0.6), 0.35) for k in range(4)]; ticks('R18', 1.0, min(12, D('R18') - 1), 0.3); at('R18', gs('R18', D('R18') - 3), ding(), 0.35)
# R20 three crows land
at('R20', 0.4, whoosh(0.9), 0.4); [at('R20', 0.8 + k * 0.5, flutter(0.8), 0.5, (k - 1) * 0.4) for k in range(3)]; caws('R20', 2.5, 3); pecks('R20', 4.5, 7.0)
# R21 inflation crow pecks, the fruit pile shrinks
pecks('R21', 1.0, 3.0, 0.45); caws('R21', gs('R21', wt('R21', 'CROW_I') - 0.6), 1); at('R21', q('R21', 'twenty-nine'), sad_tb(), 0.3)
# R22 chalkboard sums, crows rub out slices
at('R22', 0.6, scrib(2.5), 0.45); [at('R22', gs('R22', 4.0 + k * 3.0), sweep(0.8), 0.35) for k in range(3)]; caws('R22', gs('R22', D('R22') - 3), 2)
# R23 fees crow falls off the tiny sign, taxes crow shut out
at('R23', 0.6, flutter(0.6), 0.4); at('R23', gs('R23', 2.0), thud(120, 0.35), 0.55); at('R23', gs('R23', 2.2), caw(), 0.5); at('R23', gs('R23', 5.0), clack(), 0.7); at('R23', gs('R23', 5.3), caw(), 0.4)
# R24 Barb hangs the lantern
at('R24', 0.8, creak(0.8), 0.35); at('R24', 1.6, clink(), 0.6); caws('R24', gs('R24', 4.0), 1); [at('R24', gs('R24', 6.0 + k * 0.4), pop(), 0.3) for k in range(4)]
# R26 greenhouse, the same seed bag into three beds
at('R26', 0.8, paper(0.5), 0.4); [at('R26', gs('R26', 3.0 + k * 2.0), thud(130, 0.3), 0.4, (k - 1) * 0.5) for k in range(3)]
# R27-R29 growth and the goal line
at('R27', 1.0, whoosh(0.8), 0.3); at('R27', q('R27', 'ninety-nine'), ding(), 0.3)
at('R28', 1.0, whoosh(0.8), 0.3); at('R28', 3.5, whoosh(0.8), 0.3); at('R28', 0.5, wind(min(6, D('R28') - 1)), 0.25)
at('R29', 1.0, whoosh(0.8), 0.3); at('R29', gs('R29', 4.0), sad_tb(), 0.3)
# R31 envelope torn open, drum roll
at('R31', 0.4, drumroll(min(5, D('R31') - 1)), 0.35); at('R31', gs('R31', wt('R31', 'CHET') + 0.5), tear(), 0.6); at('R31', 0.3, cheer(1.5), 0.12)
# R32 scoreboard flips, Pip faints, confetti cannon by mistake
fl('R32', 0.3, 1.4, 0.55); at('R32', 1.9, thud(90, 0.5), 0.6); at('R32', 2.6, clink(), 0.5); at('R32', gs('R32', 3.4), cannon(), 0.6); at('R32', gs('R32', 3.6), cheer(2.5), 0.2)
# R33 quiet kitchen, coffee, three wooden levers slid across the counter
at('R33', 0.8, clink(), 0.4); [at('R33', gs('R33', 2.5 + k * 0.9), roll(0.5), 0.35) for k in range(3)]
# R34-R36 the levers
at('R34', 0.6, lever(), 0.6); fl('R34', 1.2, 1.2, 0.45); fl('R34', gs('R34', D('R34') * 0.5), 1.0, 0.4)
at('R35', 0.6, lever(), 0.6); at('R35', gs('R35', 2.5), paper(0.3), 0.5); at('R35', gs('R35', 2.6), thud(260, 0.15), 0.5); fl('R35', gs('R35', 4.0), 1.0, 0.45); fl('R35', gs('R35', D('R35') * 0.65), 1.0, 0.4)
at('R36', 0.6, lever(), 0.6); at('R36', gs('R36', 2.5), clack(), 0.6); [at('R36', gs('R36', 5.0 + k * 3.0), register(), 0.3) for k in range(3)]
# R37 the see-saw tips
at('R37', 0.6, creak(1.4), 0.4); at('R37', gs('R37', 2.0), thud(90, 0.4), 0.55); at('R37', gs('R37', D('R37') - 4), creak(1.0), 0.35); at('R37', gs('R37', D('R37') - 3), thud(80, 0.45), 0.5)
# R39 brass sprinkler on a payday timer
ticks('R39', 0.8, 2.6, 0.5); at('R39', 2.8, ding(), 0.4); at('R39', gs('R39', 3.2), spray(min(8, D('R39') - 4)), 0.45)
# R40 night: Oscar sneaks the hose to the car
steps('R40', 0.8, 4.0, 0.22, 0.7); at('R40', gs('R40', 4.5), squeak(), 0.4); at('R40', gs('R40', 6.0), spray(3.0), 0.45); at('R40', gs('R40', 8.5), water(1.5), 0.5); at('R40', gs('R40', 9.5), honk(), 0.4)
# R41 rope bridge to video 10
at('R41', 0.8, creak(1.4), 0.35); at('R41', gs('R41', 3.5), creak(1.0), 0.25)
# R43 index card, Stromi pops out of the shoebox
at('R43', 0.6, paper(0.3), 0.4); at('R43', 1.4, pop(), 0.6); [at('R43', gs('R43', 3.0 + k * 3.5), scrib(1.2), 0.4) for k in range(5)]
# R44 ten years later, customer side of the counter
at('R44', 0.3, sizzle(D('R44') - 0.6), 0.2); at('R44', 0.8, cbell(), 0.35); at('R44', gs('R44', 3.0), clink(), 0.5); at('R44', gs('R44', D('R44') - 3), cheer(1.6), 0.1)
# R45 back on the stage
at('R45', 0.3, cheer(2.0), 0.15); at('R45', 0.8, ding(), 0.4)
