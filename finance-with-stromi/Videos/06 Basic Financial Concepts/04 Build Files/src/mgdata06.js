/* Finance with Stromi 06: motion-graphics beats. [shot, at (phrase), pos, type, args] */
const RED = '#c2372d', GLD = '#e3c77a';
const MGD = [
  ['B02', 'three hundred and sixty-nine', 'R', 'num', { pre: '-$', to: 369, label: 'WHERE DID IT GO?', col: RED }],
  ['B13', 'forty-two billion', 'L', 'num', { pre: '$', to: 42, suf: 'B', label: 'SVB, ONE DAY (2023)', col: RED }],
  ['B17', 'roughly eighteen hundred', 'L', 'num', { pre: '~$', to: 1852, label: 'TOTAL PAID FOR A $1,000 LAPTOP', col: RED }],
  ['B21', 'three point seven', 'L', 'num', { to: 3.7, dec: 1, suf: '%', label: 'CPI, SEPT 2026 (BLS)', col: RED }],
  ['B30', 'seven hundred and fourteen', 'L', 'num', { to: 714, label: 'AVERAGE FICO, 2026', col: GLD }],
  ['B36', 'nineteen seventy-one', 'R', 'cal', { top: 'AUG', big: '1971', sub: 'GOLD LINK CUT', col: GLD }],
  ['B47', 'two hundred and eighty-one', 'L', 'num', { pre: '~$', to: 281, suf: 'K', label: 'PIP AT 65 (PUT IN $24K)', col: '#3f9b5f' }],
];
