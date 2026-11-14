/* Finance with Stromi 03: motion-graphics beats. [shot, at (sec or phrase), pos, type, args] */
const RED = '#c2372d', GRN = '#3f9b5f', GLD = '#e3c77a';
const MGD = [
  ['S02', 'forty-seven', 'L', 'num', { pre: '$', to: 47.5, dec: 1, suf: 'B', label: 'REWARDS EARNED · 2024', col: GRN }],
  ['S08', 'two and a quarter', 'L', 'num', { to: 2.25, dec: 2, suf: '%', label: 'TYPICAL STORE FEE', col: RED }],
  ['S12', 'fourteen cents', 'L', 'list', { label: 'WHO GETS THE FEE', items: ['YOUR BANK ~$1.90', 'NETWORK ~14¢', "STORE'S BANK: REST"], tick: true }],
  ['S15', 'zero point three', 'L', 'bars', { vals: [2.25, 0.3], labels: ['US', 'EU'], label: 'FEE PER $100', dec: 2 }],
  ['S19', 'cost of doing business', 'R', 'list', { label: "THE STORE'S COSTS", items: ['RENT', 'ELECTRICITY', 'CARD FEES'], tick: true }],
  ['S22', 'thirty billion', 'R', 'num', { pre: '$', to: 30, suf: 'B', label: 'MOVED EACH YEAR', col: RED }],
  ['S25', 'a quarter smaller', 'R', 'bars', { vals: [40, 30], labels: ['SIMPLE STORY', 'WITH TWISTS'], label: 'TRANSFER ($B, ROUGH)', dec: 0 }],
  ['S29', 'month by month', 'R', 'cal', { top: 'MONTHLY DATA', big: '2014-21', sub: '13 BANKS', col: RED }],
  ['S31', 'pays for the rewards', 'R', 'list', { label: 'PAYING SIDE COSTS', items: ['REWARDS', 'FRAUD', 'FREE FLOAT'], tick: true }],
  ['S33', 'a quarter more', 'L', 'chart', { dir: 1, label: 'REWARD COST PER $', col: RED }],
  ['S33', 'minus four', 'R', 'num', { to: -4, suf: '%', label: 'PAYING SIDE SHARE OF PROFIT', col: RED }],
  ['S34', 'one point six', 'R', 'num', { to: 1.6, dec: 1, suf: '%', label: 'REWARD RATE · CFPB 2024', col: GRN }],
  ['S36', 'eighty-six', 'L', 'pie', { pct: 86, label: 'INTERCHANGE → REWARDS', col: GRN }],
  ['S40', 'grace period', 'L', 'words', { txt: 'PAY IN FULL BY THE DUE DATE = NO INTEREST' }],
  ['S42', 'about half', 'C', 'pie', { delay: 2.8, pct: 50, label: 'ACCOUNTS CARRYING A BALANCE', col: RED }],
  ['S43', 'hundred and sixty', 'L', 'num', { pre: '$', to: 160, suf: 'B', label: 'INTEREST CHARGED · 2024', col: RED }],
  ['S43', 'side by side', 'R', 'bars', { vals: [160, 47.5], labels: ['INTEREST', 'REWARDS'], label: '2024 ($B)', dec: 0 }],
  ['S44', 'twenty-two percent a year in', 'L', 'num', { to: 22, suf: '%', label: 'RATE ON ACCOUNTS CHARGED INTEREST', col: RED }],
  ['S48', 'covered by the whole', 'L', 'words', { txt: 'THE WHOLE CARD PAYS' }],
  
  ['S55', 'about nineteen', 'L', 'num', { pre: '$', to: 19, label: 'ONE MONTH OF INTEREST', col: RED }],
  ['S61', 'one and a half', 'R', 'bars', { vals: [1.9, 1.5, 0.3], labels: ['US FEE', 'US REWARD', 'CAP FEE'], label: '% OF SPENDING', dec: 1 }],
  ['S62', 'thirty-eight', 'CL', 'num', { pre: '$', to: 38, suf: 'B', label: 'EST. SETTLEMENT VALUE', col: GLD }],
];
