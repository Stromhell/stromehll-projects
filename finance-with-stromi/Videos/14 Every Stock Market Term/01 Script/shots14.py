# Finance with Stromi 14: "Every Stock Market Term Explained in 13 Minutes". Original Stromi script v1, 17 Nov 2026.
# (draft 0 at ~19.5 min kept as shots14_draft0_19min.py; v1 trimmed to fit the 13-minute title promise.)
# Source transcript (00 Brief/source-transcript.md) is research only: the term list is common vocabulary; no lines, examples
# (the "50% of YouTube" example) or host name/CTAs reused. Garbled "jigged out" replaced with the real term "shaken out".
# Every figure checked in 14-Stock-Market-Terms-sources.md (maths in calc14.py). [CHECK AT RECORD] lines get refreshed on voice day.
# Central image: MARKETLAND, a foreign country with its own language. Milo crosses the border with a pocket dictionary (LEXI)
#   and a PHRASEBOOK. Every term he learns is a stamp. One chapter per month of his first year investing.
#   Circular: opens at the depot not understanding Benny's jargon sentence, ends one year later translating it.
# Kept distinct from 06 (taxes, banks, inflation basics), 10 (emergency fund, index-fund how-to), 11 (retirement number),
#   13 (money psychology), 17 (scams in depth), 18 (inflation in depth), 22 (order to invest). Those get one line at most.
# Cast (all made up, all new): MILO (24, bicycle courier, first $500 to invest), LEXI (tiny pocket dictionary with glasses, lives
#   in Milo's jacket pocket), BENNY (Milo's loud coworker, talks in jargon, gets most of it wrong), MARGE (Marketland border officer,
#   rubber stamp, deadpan), BRUNO (a bull) and URSULA (a bear), + regulars PIP, DOT, GUS.
# N = narrator. Stromi mascot appears in Your Wallet.
SHOTS = [
# ---------------- ACT 0: COLD OPEN ----------------
dict(id='M01', act=0, set='depot14', vis='Courier depot at dawn, bikes in racks. Benny, sunglasses on his forehead, leans on a bike and talks fast. Speech bubbles full of jargon bounce off Milo\'s head like hail. Then freeze: seven jargon tags pop up and count 1 to 7.',
  lines=[('BENNY', "So I went long on a blue chip, got shaken out on a dead cat bounce, shorted it, and got caught in a squeeze. Classic."),
         ('MILO', "Totally. Classic."),
         ('N', "Milo understood none of that. That sentence has seven stock market terms in it. Milo is twenty four, he delivers parcels by bike, and he has five hundred dollars to invest for the first time.")]),
dict(id='M02', act=0, set='border14', vis='A striped border gate in the fog: WELCOME TO MARKETLAND. Marge sits in a booth with a giant rubber stamp. Milo rolls up on his bike. Out of his jacket pocket pops LEXI, a tiny dictionary with round glasses.',
  lines=[('MARGE', "Purpose of visit?"), ('MILO', "Investing. Maybe."), ('LEXI', "He's with me. I translate."),
         ('N', "The market speaks its own language. So this is Milo's first year in Marketland, month by month. Every word he learns gets a stamp. By the end, you'll understand Benny's sentence, and about seventy more.")]),
dict(id='M03', act=0, card="Every Stock Market Term", sub="One first year of investing, month by month"),
# ---------------- ACT 1: JANUARY, OWNING A SLICE ----------------
dict(id='M04', act=1, card="January: Owning a Slice"),
dict(id='M05', act=1, set='bakery14', vis='Milo\'s favourite bakery, PLOPPY PANCAKE CO. (made up), drawn as a giant pancake stack. A knife cuts it into thousands of thin slices, each with a little certificate.',
  lines=[('LEXI', "A stock is ownership in a company. Cut the company into equal pieces, and each piece is a share. Own one, and you're a shareholder."),
         ('MILO', "So I own part of the pancakes?"), ('LEXI', "About one crumb. Legally.")]),
dict(id='M06', act=1, set='exchange14', vis='A grand 1930s marble trading hall with a big board. A grand-opening ribbon reads IPO. Ticker tape scrolls: PLOP 40.00 ... F ... ',
  lines=[('N', "A public company is one whose shares anyone can buy, on a stock exchange like the New York Stock Exchange or the Nasdaq. Each gets a short ticker symbol. Ford's is just F. The first time a company sells shares to the public is its IPO, its initial public offering."),
         ('GUS', "Mine would be G. For Gorgeous.")]),
dict(id='M07', act=1, set='bank14', vis='Milo at a little window labelled BROKER that turns into a glowing phone app. Behind him, shelves marked ASSET (bike, laptop) and a red bin marked LIABILITY (a phone bill).',
  lines=[('N', "Milo can't walk onto the exchange himself. A broker places trades for him, today usually an app. Anything tradable, like a stock or a bond, is a security. An asset is something you own with value. A liability is something you owe."),
         ('MILO', "My bike is an asset. My phone bill is a liability."), ('MARGE', "Stamp.")]),
# ---------------- ACT 2: FEBRUARY, THE ORDER WINDOW ----------------
dict(id='M08', act=2, card="February: The Order Window"),
dict(id='M09', act=2, set='auction14', vis='A street stall where shares sell like apples. Buyers on the left hold signs: 49.98. Sellers on the right: 50.02. The tiny gap between them glows.',
  lines=[('N', "The bid is the highest price a buyer offers right now. The ask is the lowest a seller will take. Here, forty nine ninety eight and fifty oh two. That four cent gap is the bid ask spread."),
         ('DOT', "So who blinks first?")]),
dict(id='M10', act=2, set='auction14', vis='Two big buttons on Milo\'s phone: MARKET (Milo slides straight across the gap) and LIMIT (a flag at $49.50, he waits on a bench). Sticky notes pop on: DAY (melts at sunset), GOOD TILL CANCELED (held by a tortoise), STOP-LOSS (a trapdoor under the price).',
  lines=[('N', "A market order buys now at the best price available. A limit order only buys at your price or better, so it might never fill. A day order expires at the close. A good till canceled order waits. And a stop loss sells automatically if the price falls to a level you pick."),
         ('GUS', "A trapdoor for my feelings."), ('LEXI', "For your money. Your feelings are on their own.")]),
dict(id='M11', act=2, set='auction14', vis='Two stalls side by side. One packed with shouting traders (VOLUME: 40 MILLION). One with a sleepy seller and a tumbleweed (VOLUME: 300).',
  lines=[('N', "Volume is how many shares trade in a day. Liquidity is how easily you can get in and out. Busy stocks are liquid. Sleepy ones can be hard to sell when you need to."),
         ('PIP', "That's my lemonade stand.")]),
# ---------------- ACT 3: MARCH, MARKET WEATHER ----------------
dict(id='M12', act=3, card="March: Market Weather"),
dict(id='M13', act=3, set='weather14', vis='A 1930s TV weather studio. Bruno the bull tosses a price chart UP with his horns; Ursula the bear swipes it DOWN with her paw. A seismograph needle then draws wild zig-zags: VOLATILITY.',
  lines=[('N', "A bull market is a long rise. A bear market is a long fall, usually twenty percent or more from the top. A bull thrusts its horns up, a bear swipes its paws down. Volatility is how fast and far prices swing."),
         ('BRUNO', "Up!"), ('URSULA', "Down."), ('BRUNO', "Up!"), ('URSULA', "Still down.")]),
dict(id='M14', act=3, set='street14', vis='A street of shops sized by value. A towering marble store with a blue ribbon (BLUE CHIP). A tiny cardboard kiosk, UNDER $5 (PENNY STOCK). A measuring tape labelled MARKET CAP. Then a see-saw: SUPPLY crates vs a DEMAND crowd, price tag floating up.',
  lines=[('N', "Market cap is the share price times the number of shares. Fifty million Ploppy shares at forty dollars makes a two billion dollar company. Blue chips are big, established firms. Penny stocks trade under five dollars, are often tiny, and are easy to push around. And every price is just supply and demand: more buyers, it rises. More sellers, it falls."),
         ('BENNY', "Penny stocks are just cheap blue chips!"), ('LEXI', "That's not how anything works.")]),
# ---------------- ACT 4: APRIL, READING THE LABEL ----------------
dict(id='M15', act=4, card="April: Reading the Label"),
dict(id='M16', act=4, set='bakery14', vis='Milo flips the pancake box like a cereal box. On the back, a nutrition-style label: BALANCE SHEET (ASSETS, LIABILITIES, EQUITY). Chalk sums on the wall: $100 SALES -> $8 PROFIT = 8% MARGIN. EPS $2. PRICE $40 / EPS $2 = P/E 20.',
  lines=[('N', "In April, Milo reads the label. A balance sheet lists what a company owns, what it owes, and what's left for shareholders. Profit margin is how much of each sales dollar it keeps: eight cents here. Earnings per share is profit divided by shares, say two dollars. Price to earnings divides the price by that. Forty over two is a P E of twenty."),
         ('GUS', "Is twenty good?"), ('LEXI', "Depends. Past profits promise nothing.")]),
dict(id='M17', act=4, set='bakery14', vis='Three price tags hang off one share: BOOK VALUE $10 (calculator), INTRINSIC VALUE ? (crystal ball), MARKET PRICE $40 wobbling between them. A chute drips coins into Milo\'s hat: DIVIDEND $1.20 = 3% YIELD. Scoreboard: $500 -> $560, ROI 12%.',
  lines=[('N', "Book value is assets minus debts. Price to book compares the price to it. Intrinsic value is a guess at what the business is truly worth. A dividend is profit paid out in cash. A dollar twenty a year on a forty dollar share is a three percent yield. And return on investment: five hundred dollars that becomes five sixty is twelve percent."),
         ('MILO', "I'm rich!"), ('LEXI', "You're up sixty dollars.")]),
dict(id='M18', act=4, set='street14', vis='A big umbrella building, HOLDING CO., shelters smaller shops labelled SUBSIDIARY. A giant hand with a fat stack of shares (CONTROL STOCK) pulls a lever marked DECISIONS.',
  lines=[('N', "A holding company makes nothing itself. It owns controlling stakes in other companies, its subsidiaries. Google's parent, Alphabet, works this way. Control stock means owning enough to steer the big decisions."),
         ('DOT', "A landlord for companies.")]),
# ---------------- ACT 5: JUNE, BASKETS ----------------
dict(id='M19', act=5, card="June: Baskets"),
dict(id='M20', act=5, set='market14', vis='Milo in a grocery market with a wicker basket labelled PORTFOLIO. Inside: a pancake share, a paper IOU with ribbon (BOND), a sack of grain and a gold bar (COMMODITY), a jar of foreign coins (FOREX).',
  lines=[('N', "All your investments together are your portfolio. What's inside are your holdings. A bond is a loan to a government or company that pays you interest, the price of borrowing money. Commodities are raw materials like oil, wheat or gold. Forex is trading currencies."),
         ('MILO', "Pancakes, loans, wheat and yen."), ('LEXI', "Maybe not all on day one.")]),
dict(id='M21', act=5, set='market14', vis='Ready-made hampers on a shelf: INDEX FUND (copy-machine copying the S&P 500 list), MUTUAL FUND (a chef packing it), ETF (hamper with a ticker sticker), HEDGE FUND (behind velvet rope, MINIMUM $1,000,000).',
  lines=[('N', "An index tracks a group of stocks. The S and P 500 follows about five hundred of the biggest US companies. A mutual fund pools money for a manager to invest. An index fund just copies an index, cheaply. An ETF is a basket that trades like a single share, passive or actively managed. Hedge funds are private funds for wealthy investors."),
         ('BENNY', "I'm only in hedge funds."), ('LEXI', "You are not in a hedge fund."), ('BENNY', "Spiritually I am.")]),
dict(id='M22', act=5, set='market14', vis='A sturdy lockbox labelled IRA with a tax shield. A calendar page: 2026 LIMIT $7,500.',
  lines=[('N', "And an IRA, an individual retirement account, gives US savers tax breaks. In twenty twenty six you can put in up to seven thousand five hundred dollars.")]),
# ---------------- ACT 6: JULY + AUGUST, THE ZOO AND THE STORM ----------------
dict(id='M23', act=6, card="July: The Zoo"),
dict(id='M24', act=6, set='zoo14', vis='MARKETLAND ZOO gate. A sparkly unicorn trots past ($1 BILLION). A huge whale makes a wave that rocks the little rowboats. A rocket on a share tag blasts off (TO THE MOON); a second nosedives into a tank (TANKING).',
  lines=[('N', "A unicorn is a startup worth a billion dollars or more. A whale is an investor big enough to move prices alone. A stock shooting up is going to the moon. Crashing fast, it's tanking."),
         ('PIP', "And what are we?"), ('DOT', "Plankton.")]),
dict(id='M25', act=6, set='zoo14', vis='A giant soap bubble inflates around a price tag, crowds pointing at it. POP. The price falls below where it started. Benny, still cheering "moon", is covered in soap.',
  lines=[('N', "A bubble is when excitement pushes prices far above real value. Then it pops."),
         ('GUS', "How do you spot one?"), ('LEXI', "Usually afterwards.")]),
dict(id='M26', act=6, card="August: The Storm"),
dict(id='M27', act=6, set='exchange14', vis='The trading hall in a storm. People throw shares in the air and run (PANIC SELLING). A giant brass lever slams down: CIRCUIT BREAKER. Everyone freezes mid-air. Cut to a calm lake: one black swan drifts in among white ones.',
  lines=[('N', "Panic selling is fear selling, which drops prices, which causes more fear. So US markets have circuit breakers. If the S and P 500 falls seven percent in a day, trading pauses for fifteen minutes. Thirteen percent, another pause. Twenty, it shuts for the day. And a black swan is a huge event nobody saw coming."),
         ('URSULA', "Everyone take a breath.")]),
dict(id='M28', act=6, set='weather14', vis='A rubber squeaky toy cat (clearly a toy) bounces once a little way up, then flops lower. The price line copies it: DEAD CAT BOUNCE. Cut to Benny dropping through his stop-loss trapdoor just before the price shoots back up.',
  lines=[('N', "A dead cat bounce is a brief bounce in a falling price before it drops further. And Benny? His stop loss sold him at the bottom, right before a rebound. That's getting shaken out."),
         ('PIP', "It's a toy cat, right?"), ('LEXI', "Nobody was harmed in this metaphor.")]),
# ---------------- ACT 7: SEPTEMBER, DANGEROUS TOOLS ----------------
dict(id='M29', act=7, card="September: The Dangerous Toolbox"),
dict(id='M30', act=7, set='workshop14', vis='A workshop with a glass case marked HANDLE WITH CARE. A reversed arrow labelled SHORT: borrow a share, sell at $50, buy back at $40 (+$10)... or at $150 (-$100). Then a crowd of shorters on a narrow bridge as the price surges and they all rush to buy (SHORT SQUEEZE).',
  lines=[('N', "Going long means buying because you expect a rise. Shorting bets on a fall. Borrow a share, sell it at fifty, buy it back later. At forty, you keep ten. At a hundred and fifty, you lose a hundred, and in theory there's no ceiling. A short squeeze is when a shorted stock jumps and short sellers must buy back, pushing it higher. In January 2021, GameStop went from under twenty dollars to over four hundred and eighty in a few weeks. A long squeeze is the mirror image."),
         ('BENNY', "That's the squeeze I got caught in!"), ('MILO', "Benny, you were never short anything.")]),
dict(id='M31', act=7, set='workshop14', vis='A chainsaw labelled LEVERAGE. A seesaw: Milo\'s $1,000 plus a borrowed $1,000. Stock +10% -> Milo +20%. -10% -> -20%. -50% -> Milo\'s side smashes the floor: -100%. Then two tickets, CALL and PUT, and a padlocked contract: FUTURES, MUST BUY.',
  lines=[('N', "Leverage is investing with borrowed money. A thousand yours, a thousand borrowed. Up ten percent, you make twenty. Down ten, you lose twenty. If it halves, your thousand is gone. Options give you the right, not the duty, to buy or sell at a set price by a set date. A call is the right to buy, a put the right to sell. Futures oblige both sides to trade."),
         ('DOT', "Options are a reservation. Futures are a wedding.")]),
# ---------------- ACT 8: OCTOBER, THE CROOKS ----------------
dict(id='M32', act=8, card="October: Watch Your Pockets"),
dict(id='M33', act=8, set='alley14', vis='A dark alley. A man with a megaphone pumps a bike pump into a share balloon labelled TINY CO. Crowds rush in, he slips away with a sack of cash, the balloon flops on them. A clerk whispers a secret into a phone (envelope: RESULTS, NOT PUBLIC). Marge in a detective hat stamps ILLEGAL.',
  lines=[('N', "A pump and dump is fraud: hype a cheap stock with lies, then sell to everyone who believed it. A rug pull is the crypto version, where a token's creators cash out and vanish. And insider trading means trading on important information the public doesn't have yet. It's usually illegal."),
         ('MARGE', "Stamp. Not the good kind.")]),
# ---------------- ACT 9: NOVEMBER, STYLES ----------------
dict(id='M34', act=9, card="November: How People Play"),
dict(id='M35', act=9, set='exchange14', vis='The hall split into race lanes: a hummingbird darting (DAY TRADING), a kangaroo bounding (SWING TRADING), a tortoise with a lunchbox (LONG-TERM). Split screen: a chartist drawing lines (TECHNICAL) vs an inspector tasting batter in the bakery (FUNDAMENTAL).',
  lines=[('N', "Day traders buy and sell within a single day. Swing traders hold for days or months. Most day traders lose money over time. Technical analysis reads price charts. Fundamental analysis studies the business. Value investors hunt for bargains. Growth investors pay up for fast-growing companies. And going against the crowd is called fading."),
         ('BENNY', "Hummingbird. Obviously.")]),
dict(id='M36', act=9, set='auction14', vis='Milo\'s phone: BOUGHT 10 @ $20. Price drops. BOUGHT 10 MORE @ $10. AVERAGE $15. Then a silhouette professor (no likeness) writes on a chalkboard PRICES ALREADY KNOW while every trader reads the same newspaper.',
  lines=[('N', "Averaging down is buying more after a drop. Ten shares at twenty, ten at ten, and your average is fifteen. It only helps if the company recovers. And the efficient market hypothesis, linked to Nobel winner Eugene Fama, says prices already reflect public news, so beating the market again and again is very hard."),
         ('BENNY', "I beat it last Tuesday."), ('LEXI', "And Wednesday?"), ('BENNY', "We don't talk about Wednesday.")]),
# ---------------- ACT 10: DECEMBER, BORING SUPERPOWERS ----------------
dict(id='M37', act=10, card="December: The Boring Superpowers"),
dict(id='M38', act=10, set='apartment14', vis='Milo\'s small flat, snow outside. A calendar with a $100 coin on the 1st of each month. Prices wobble $10, $8, $5, $8, $10; shares pile higher in the cheap months. AVG PRICE $8.20 vs MILO\'S COST $7.69.',
  lines=[('N', "Dollar cost averaging means investing the same amount on a schedule, whatever the price. A hundred dollars a month buys more shares when prices are low. Over five months at these prices, the average price was eight twenty, but Milo's average cost was about seven sixty nine."),
         ('MILO', "I did nothing clever and still won?"), ('LEXI', "That's the point.")]),
dict(id='M39', act=10, set='apartment14', vis='A snowball rolls downhill gathering coins: $36,000 PUT IN -> ~$122,000 AFTER 30 YEARS (at 7% a year, assumed, not guaranteed). Then a grocery bag shrinks in Milo\'s hand as a calendar flips ten years: $100 -> BUYS $74.',
  lines=[('N', "Compound interest is earning returns on your returns. A hundred a month for thirty years is thirty six thousand dollars in. At an assumed seven percent a year, never guaranteed, that could become about a hundred and twenty two thousand. And inflation works the other way. At three percent a year, a hundred dollars buys about seventy four dollars' worth after ten years."),
         ('PIP', "Where did the extra money come from?"), ('LEXI', "Time.")]),
# ---------------- ACT 11: YOUR WALLET + ENDING ----------------
dict(id='M40', act=11, card="Your Wallet"),
dict(id='M41', act=11, set='wallet14', vis='Stromi the mascot at a desk with Milo and Lexi. Five stamps slide in: a slice, a basket, a price flag, a toolbox with a red X, a snowball.',
  lines=[('N', "So what does this mean for your wallet? Not financial advice, just Milo's five keepers. A share is a slice of a real business, so read the label. Baskets spread your risk. Limit orders protect your price. Leverage, shorting and options are sharp tools. And a steady amount, plus time, does the heavy lifting.")]),
dict(id='M42', act=11, set='border14', vis='One year later. Same foggy border booth. Marge flips Milo\'s phrasebook, now fat with stamps. Lexi sits on Milo\'s shoulder.',
  lines=[('MARGE', "Purpose of visit?"), ('MILO', "Residency.")]),
dict(id='M43', act=11, set='depot14', vis='Back at the courier depot at dawn. Benny leans on the same bike. As Milo speaks, each of the seven jargon tags from the opening flips over to show plain words.',
  lines=[('BENNY', "So I went long on a blue chip, got shaken out on a dead cat bounce, shorted it, and got caught in a squeeze."),
         ('MILO', "You bought a big safe company, sold in a panic, bet against it, and it jumped."),
         ('BENNY', "When you say it like that, it sounds bad."), ('MILO', "It is bad, Benny."),
         ('N', "Milo still has his five hundred dollars invested, plus a hundred every month. He never did day trade. But now, when the market talks, he understands every word.")]),
dict(id='M44', act=11, card="Watch next: turning savings into investing", sub="Video 10: the step-by-step path from a savings account to your first investment. General education only, not financial advice. Companies and tickers shown are examples, not recommendations. Figures as of November 2026."),
]
