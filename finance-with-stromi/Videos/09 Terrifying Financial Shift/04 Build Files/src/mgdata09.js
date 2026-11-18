/* Finance with Stromi 09: motion-graphics beats. [shot, at (phrase|sec), pos, type, args]. Only on sides with no characters. */
const RED = '#c2372d', GLD = '#e3c77a';
const MGD = [
  ['Y13', 'rises five', 'L', 'bars', { label: 'YOUR $1,000 AT 10:1', vals: [1000, 1500, 500, 0], labels: ['START', '+5%', '-5%', '-10%'], hi: 3 }],
  ['Y19', 'one hundred sixty-two', 'L', 'bars', { label: 'YEN PER $1', vals: [162, 142], labels: ['JUL 2024', '5 AUG'], hi: 1 }],
  ['Y29', 'forty trillion', 'L', 'num', { pre: '$', to: 40, suf: 'T', label: 'U.S. DEBT, AUG 2026', col: RED }],
  ['Y34', 'today', 'R', 'bars', { label: 'DOLLAR SHARE OF RESERVES', vals: [72, 57], labels: ['2001', '2026'], hi: 1 }],
];
