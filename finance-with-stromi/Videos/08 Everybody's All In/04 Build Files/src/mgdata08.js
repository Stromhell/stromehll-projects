/* Finance with Stromi 08: motion-graphics beats. [shot, at (phrase), pos, type, args]. Only on sides with no characters. */
const RED = '#c2372d', GLD = '#e3c77a';
const MGD = [
  ['E06', 'more than double', 'R', 'bars', { label: 'STOCKS, ¢ PER $1 OWNED', vals: [16, 34], labels: ['AVG', 'NOW'], hi: 1 }],
  ['E10', 'seventy-four trillion', 'L', 'num', { pre: '$', to: 74, suf: 'T', label: 'STOCKS HOUSEHOLDS OWN', col: '#3f9b5f' }],
  ['E15', 'more than four times', 'R', 'num', { to: 4, suf: '×', label: 'SPENDING VS STOCKS, SINCE 1990', col: RED }],
  ['E24', 'five times the peak', 'R', 'bars', { label: 'MARGIN DEBT ($B)', vals: [278, 936, 1502], labels: ['2000', '2021', 'JUN 26'], hi: 2 }],
  ['E29', 'eighty-five billion', 'R', 'num', { pre: '-$', to: 85, suf: 'B', label: 'MARGIN DEBT, JULY 2026', col: RED }],
  ['E32', 'nine billion', 'L', 'num', { pre: '$', to: 9, suf: 'B', label: 'TRADED PER 1% MOVE (NOMURA)', col: RED }],
];
