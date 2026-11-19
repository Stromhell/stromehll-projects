/* Finance with Stromi 10: motion-graphics beats. [shot, at (phrase), pos, type, args]. Only on sides with no characters. */
const MGD = [
  ['S06', 'national average', 'R', 'bars', { label: 'SAVINGS RATE, % A YEAR', vals: [0.01, 0.38, 4.35], labels: ['BIG BANK', 'AVG', 'HIGH-YIELD'], hi: 2 }],
  ['S10', 'over decades', 'R', 'num', { pre: '~', to: 10, suf: '%', label: 'S&P 500, LONG-RUN AVG A YEAR', col: '#3f9b5f' }],
  ['S19', 'on nine thousand', 'L', 'num', { pre: '$', to: 390, suf: '', label: 'A YEAR ON $9,000 AT ~4.3%', col: '#3f9b5f' }],
  ['S31', 'nine in ten', 'L', 'num', { pre: '~', to: 90, suf: '%', label: 'PRO FUNDS BEHIND THE INDEX, 15 YRS', col: '#c2372d' }],
  ['S35', 'hundred and four', 'R', 'bars', { label: '$300/MO AT 8% ($K)', vals: [285, 104], labels: ['START NOW', '10 YRS LATE'], hi: 1 }],
];
