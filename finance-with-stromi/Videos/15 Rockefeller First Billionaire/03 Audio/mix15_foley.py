# ---------- per-shot foley (video 15, Rockefeller) ----------
def murmur(i, t0, t1, g=0.12): at(i, t0, cheer(max(0.5, t1 - t0)), g)
def flurry(i, t0, t1, g=0.5): [at(i, t, paper(0.25), g, rng.uniform(-0.5, 0.5)) for t in np.arange(t0, t1, 0.14)]
def stampx(i, t): at(i, t, stamp(), 0.7)
def hl(i, w, n=0): return gs(i, Lt(i, w, n))
def rain(d): t = ts(d); n = len(t); c = hp(noise(d), 0.4) * (rng.random(n) > 0.97) * 1.2; return (lp(noise(d), 0.2) * 0.5 + c) * np.minimum(1, np.minimum(t, d - t) / 0.5)
def fire(d): t = ts(d); n = len(t); c = hp(noise(d), 0.5) * (rng.random(n) > 0.993) * 2.5; return (lp(noise(d), 0.03) * 0.8 + c) * np.minimum(1, np.minimum(t, d - t) / 0.4)
def gavel(): return thud(160, 0.35) * 0.9 + np.concatenate([clack() * 2.5, np.zeros(int(0.35 * SR) - len(clack()))])
def clinkb(): return clink() * 1.4
def hooves(i, t0, t1, g=0.4): [at(i, t + o, clack(), g * w, -0.2) for t in np.arange(t0, t1, 0.5) for o, w in ((0, 1), (0.09, 0.7), (0.25, 0.9), (0.33, 0.6))]
def press(d): t = ts(d); return (lp(noise(d), 0.3) * (np.sin(2 * np.pi * 4 * t) > 0.6) * 0.8 + lp(noise(d), 0.05) * 0.3) * np.minimum(1, np.minimum(t, d - t) / 0.3)
def flash(): return np.concatenate([click() * 1.5, np.zeros(int(0.02 * SR)), hp(noise(0.3), 0.15) * env(int(0.3 * SR), 0.002, 0.08) * 0.5])
def gush(d=3.0): t = ts(d); return smp('0740', 'rnd', d, 0.05, 0.6) * 1.4 + lp(noise(d), 0.02) * np.exp(-t / 1.5) * 3.0
def screw(i, t0, n=4): [at(i, t0 + k * 0.5, squeak(), 0.5) for k in range(n)]
def metal(): f = rng.uniform(300, 500); t = ts(0.6); return (np.sin(2 * np.pi * f * t) + 0.6 * np.sin(2 * np.pi * f * 2.7 * t)) * env(len(t), 0.001, 0.15) * 0.4 + thud(100, 0.6) * 0.5
def pump(i, t0, n): [at(i, t0 + k * 0.6, hp(noise(0.35), 0.15) * env(int(0.35 * SR), 0.08, 0.15) * 0.7, 0.5) for k in range(n)]
W = lambda i, w, n=0: hl(i, w, n)
# R01 porch 1916: newsboy runs past, chair creaks, Dot walks up the steps
steps('R01', 0.3, 2.4, 0.3, 0.32); at('R01', 0.9, paper(0.5), 0.5); at('R01', 1.5, creak(0.6), 0.25); steps('R01', W('R01', 'DOT') - 1.2, W('R01', 'DOT'), 0.25, 0.5)
# R02 dime out of the waistcoat
at('R02', 0.6, paper(0.2), 0.3); at('R02', 1.0, clinkb(), 0.6)
# R03 dime drops on the ledger, pen writes
at('R03', 0.3, clinkb(), 0.7); at('R03', 0.45, thud(220, 0.2), 0.4); at('R03', gs('R03', 2.0), scrib(3.0), 0.45)
# R06 farmhouse in rain, door bursts open, bottles rattle
at('R06', 0.0, rain(D('R06')), 0.35); at('R06', W('R06', 'BILL') - 0.6, creak(0.4), 0.5); at('R06', W('R06', 'BILL') - 0.3, thud(80, 0.5), 0.8); [at('R06', W('R06', 'BILL') + k * 0.15, clink(), 0.35) for k in range(5)]
# R07 wagon sale: bottle, coin, wink
at('R07', 0.5, creak(0.8), 0.25); at('R07', W('R07', 'FARMER') - 0.3, clink(), 0.5); at('R07', W('R07', 'BILL', 1) - 0.2, clinkb(), 0.6); at('R07', W('R07', 'N') - 0.3, ding(), 0.25)
# R08 night: Bill rides off, wagon fades
hooves('R08', 0.4, gs('R08', 6.0), 0.35); at('R08', 0.4, roll(6.0), 0.3); at('R08', gs('R08', 6.5), creak(0.6), 0.3); at('R08', hl('R08', 'N', 1), sad_tb(), 0.2)
# R10 Cleveland dock office: gulls, steps, sacks
at('R10', 0.3, gull(), 0.4); steps('R10', 0.6, 3.2, 0.3, 0.6); at('R10', W('R10', 'JOHN') - 0.4, thud(160, 0.2), 0.3); at('R10', W('R10', 'CLERK'), paper(0.3), 0.4)
# R11 ledger entries tick in
[at('R11', gs('R11', 1.0 + k * 1.6), clack(), 0.35) for k in range(5)]; at('R11', gs('R11', 1.0), scrib(7.0), 0.35)
# R12 tavern laughter vs. midnight candle
murmur('R12', 0.2, gs('R12', 4.0), 0.3); clinks('R12', 0.6, gs('R12', 3.0), 4); ticks('R12', gs('R12', 4.0), D('R12') - 0.2, 0.35); at('R12', gs('R12', 4.5), scrib(3.0), 0.35)
# R14 new sign, handshake, counting notes
at('R14', 0.5, thud(200, 0.25), 0.4); at('R14', W('R14', 'BILL') - 0.3, whoosh(0.5), 0.3); [at('R14', W('R14', 'JOHN') + k * 0.25, flip(), 0.45) for k in range(6)]
# R15 Titusville gusher, dancing, derricks pop up
at('R15', 0.6, thud(55, 0.9), 1.0); at('R15', 0.7, gush(4.0), 0.6); at('R15', 1.5, cheer(3.5), 0.35); [at('R15', gs('R15', 6.0 + k * 0.35), pop(), 0.35, rng.uniform(-0.5, 0.5)) for k in range(10)]
# R16 newspaper waved, papers stacked higher
at('R16', W('R16', 'CLARK') - 0.3, paper(0.5), 0.6); [at('R16', W('R16', 'JOHN') + k * 0.4, flip(), 0.45) for k in range(6)]
# R17 auction: gavel, price cards flip, sweating
murmur('R17', 0.2, D('R17') - 0.2, 0.06); at('R17', W('R17', 'LAWYER') - 0.3, gavel(), 0.8); [fl('R17', W('R17', w) - 0.4, 0.5, 0.45) for w in ('JOHN', 'CLARK')]; fl('R17', W('R17', 'JOHN', 1) - 0.4, 0.5, 0.45); at('R17', W('R17', 'N') - 0.5, gavel(), 0.9)
# R19 refinery: bubbling stills, sludge, jar
at('R19', 0.3, gurgle(D('R19') - 0.6), 0.25); at('R19', W('R19', 'ANDREWS') - 0.3, clinkb(), 0.5); at('R19', gs('R19', 3.0), water(2.0), 0.3)
# R20 products pop out, barrels hammered, wagons roll
[at('R20', gs('R20', 1.0 + k * 0.8), pop(), 0.5) for k in range(5)]; [at('R20', gs('R20', 6.0 + k * 0.4), thud(140, 0.25), 0.45, (k % 2 - 0.5) * 0.4) for k in range(6)]; at('R20', gs('R20', 9.5), roll(3.0), 0.35)
# R22 brass plate screwed on, certificate
screw('R22', 0.6, 4); at('R22', 2.8, clinkb(), 0.5); at('R22', W('R22', 'N', 1), paper(0.4), 0.5)
# R23 railroad office: model loco whistle, ledger opens
at('R23', 0.5, smp('1927', None, 1.0) * 0.3, 0.4); at('R23', W('R23', 'JOHN') - 0.4, flip(), 0.6); at('R23', W('R23', 'JOHN', 1) - 0.3, thud(180, 0.2), 0.4)
# R24 side door, three stamps, a coin flies
at('R24', 0.3, creak(0.9), 0.5); [stampx('R24', gs('R24', 3.0 + k * 0.7)) for k in range(3)]; at('R24', gs('R24', 6.0), whoosh(0.5), 0.5); at('R24', gs('R24', 6.4), clinkb(), 0.7)
# R25 the small family refinery: letter, door, the offer
at('R25', 0.4, paper(0.5), 0.5); at('R25', W('R25', 'JOHN') - 0.6, creak(0.5), 0.35); at('R25', W('R25', 'JOHN', 2) - 0.3, paper(0.3), 0.5); at('R25', W('R25', 'N') - 0.2, sad_tb(), 0.25)
# R26 torches and banners, newspaper flies, calm page turn
murmur('R26', 0.2, gs('R26', 7.0), 0.4); at('R26', 0.2, fire(gs('R26', 7.0)), 0.3); steps('R26', 0.4, gs('R26', 6.0), 0.3, 0.45); at('R26', W('R26', 'GUS') - 0.4, whoosh(0.7), 0.5); at('R26', W('R26', 'PIP'), paper(0.4), 0.5); at('R26', D('R26') - 2.0, flip(), 0.6)
# R28 war-room map: flags pinned one by one
[at('R28', gs('R28', 1.0 + k * 0.6), clack(), 0.45, rng.uniform(-0.4, 0.4)) for k in range(12)]; at('R28', gs('R28', 9.0), paper(0.5), 0.35)
# R29 pipeline over the hills, cheers, SOLD sign
[at('R29', gs('R29', 0.8 + k * 0.7), metal(), 0.35, rng.uniform(-0.3, 0.3)) for k in range(4)]; at('R29', gs('R29', 4.0), cheer(2.5), 0.3); stampx('R29', W('R29', 'N', 1) - 0.2)
# R30 forty certificates into one box, lid shuts, nine keys
at('R30', 0.8, thud(90, 0.5), 0.7); flurry('R30', 0.9, 2.0, 0.25); at('R30', gs('R30', 3.0), creak(0.4), 0.4); at('R30', gs('R30', 3.4), thud(70, 0.6), 0.9); clinks('R30', gs('R30', 4.2), gs('R30', 5.6), 9)
# R32 tin-can line, solder drops, counter ticks
at('R32', 0.3, roll(D('R32') - 0.6), 0.25); [at('R32', gs('R32', 1.0 + k * 1.1), sizzle(0.4), 0.35) for k in range(6)]; ticks('R32', gs('R32', 2.0), gs('R32', 8.0), 0.3); at('R32', W('R32', 'JOHN', 2) - 0.3, click(), 1.0)
# R33 lamps light up, ship, price tags drop
at('R33', 0.5, sizzle(0.6), 0.5); at('R33', gs('R33', 4.0), gull(), 0.35); [at('R33', gs('R33', 8.0 + k * 1.0), clack(), 0.5) for k in range(3)]; at('R33', gs('R33', 11.5), ding(), 0.25)
# R34 hat off in the mirror, wigs, milk and crackers
at('R34', 0.6, paper(0.2), 0.3); at('R34', W('R34', 'BUTLER') - 0.2, clink(), 0.5); at('R34', W('R34', 'JOHN', 1) + 0.5, snip(), 0.3)
# R36 magazine office: typing, papers, string on the wall
keys('R36', 0.4, gs('R36', 5.0), 0.35); at('R36', gs('R36', 6.0), paper(0.5), 0.45); at('R36', gs('R36', 9.0), scrib(2.0), 0.3)
# R37 notebook slams, the press spins, magazines fly
at('R37', W('R37', 'IDA') - 0.2, thud(150, 0.3), 0.6); at('R37', W('R37', 'N') - 0.5, press(4.0), 0.5); flurry('R37', W('R37', 'N'), W('R37', 'N') + 2.0, 0.25); at('R37', W('R37', 'N') + 2.5, roll(2.0), 0.3)
# R38 headline slams in, folded slowly
at('R38', 0.4, thud(80, 0.6), 0.8); at('R38', 0.5, whoosh(0.4), 0.4); at('R38', D('R38') - 3.0, paper(1.2), 0.5); at('R38', D('R38') - 2.0, sad_tb(), 0.2)
# R40 Supreme Court: gavel cracks the tank into 34 that roll away
at('R40', 0.4, cheer(1.0), 0.05); at('R40', W('R40', 'TEDDY') - 0.4, gavel(), 0.8); at('R40', W('R40', 'N', 1) - 0.6, gavel(), 1.0); at('R40', W('R40', 'N', 1) - 0.5, thud(60, 0.9), 0.9); at('R40', W('R40', 'N', 1) - 0.4, roll(3.0), 0.45)
# R41 pie of 34 tanks, labels, inflating, ticker tape
at('R41', 1.0, scrib(2.0), 0.4); pump('R41', gs('R41', 4.0), 4); ticks('R41', gs('R41', 7.0), D('R41') - 0.3, 0.35)
# R42 exchange floor: crowd, board flaps, Gus drops to his knees
murmur('R42', 0.2, D('R42') - 0.2, 0.2); fl('R42', 0.6, 2.0, 0.45); fl('R42', gs('R42', 4.0), 1.5, 0.4); at('R42', W('R42', 'PIP') - 0.4, thud(110, 0.4), 0.5)
# R44 Ivy Lee coaching: camera flashes, kids line up
murmur('R44', 0.2, D('R44') - 0.2, 0.05); [at('R44', gs('R44', 2.0 + k * 1.7), flash(), 0.6, rng.uniform(-0.4, 0.4)) for k in range(5)]; at('R44', W('R44', 'JOHN') + 0.3, clinkb(), 0.5)
# R45 lab, classroom, hospital: school bell, microscope click
at('R45', 0.5, smp('1927', None, 2.0) * 0.5, 0.35); at('R45', gs('R45', 5.0), cheer(1.2), 0.12); at('R45', gs('R45', 9.0), click(), 0.8); at('R45', gs('R45', 9.2), ding(), 0.2)
# R46 empty chair rocks, calendar flips
[at('R46', 0.5 + k * 1.6, creak(0.7), 0.3) for k in range(int(D('R46') / 1.6) - 1)]; at('R46', gs('R46', 4.0), flip(), 0.6); at('R46', gs('R46', 4.3), flip(), 0.5)
# R48 three stamps slide in
at('R48', 0.4, flip(), 0.5); [stampx('R48', W('R48', 'STROMI', k) - 0.2) for k in range(1, 4)]
# R49 fourth stamp, red X
at('R49', 0.6, whoosh(0.4), 0.4); stampx('R49', gs('R49', 1.6)); at('R49', gs('R49', 1.8), errbuzz(), 0.25)
# R50 the dime into Dot's hand, a note in the book
at('R50', W('R50', 'JOHN') - 0.2, clinkb(), 0.7); at('R50', W('R50', 'N') - 0.6, flip(), 0.5); at('R50', W('R50', 'N'), scrib(2.0), 0.4)
