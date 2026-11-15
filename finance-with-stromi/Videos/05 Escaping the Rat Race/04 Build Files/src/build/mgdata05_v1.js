/* Finance with Stromi 05 (Escaping the Rat Race): motion-graphics beats. [shot, at (sec or phrase), pos, type, args] */
const RED = '#c2372d', GRN = '#3f9b5f', GLD = '#e3c77a';
const MGD = [
  ['S01', 'three hundred million', 'R', 'num', { pre: '$', to: 300, suf: 'M', label: 'EST. RING EARNINGS', col: GRN }],
  ['S09', 'twenty-two billion', 'L', 'num', { pre: '+$', to: 22, suf: 'B', label: 'CARD DEBT, ONE QUARTER', col: RED }],
  ['S10', 'sixty-three percent', 'L', 'num', { to: 63, suf: '%', label: 'PAYCHECK TO PAYCHECK', col: RED }],
  ['S24', 'twenty seventeen', 'R', 'cal', { top: '2017', big: '78%', sub: 'PAYCHECK TO PAYCHECK', col: GLD }],
  ['S27', 'a bigger place', 'R', 'list', { label: 'THE DRAIN GROWS', items: ['BIGGER PLACE', 'NICER CAR', 'ONE MORE SUBSCRIPTION'], tick: false }],
  ['S32', 'nineteen ninety-seven', 'R', 'num', { pre: '$', to: 1997, label: 'THE "ESCAPE" COURSE', col: RED }],
  ['S36', 'four-hundred-dollar', 'R', 'num', { pre: '$', to: 400, label: 'SURPRISE BILL', col: GLD }],
  ['S38', 'fourteen-hundred-dollar', 'R', 'num', { pre: '$', to: 1400, label: 'SAME REPAIR, NO PANIC', col: GRN }],
  ['S43', 'four hundred and ten', 'R', 'num', { pre: '$', to: 410, label: 'TAKEOUT, ONE MONTH', col: RED }],
  ['S46', 'thirty us states', 'R', 'num', { pre: '~', to: 30, label: 'STATES REQUIRING A MONEY CLASS', col: GRN }],
  ['S49', 'twenty-two percent', 'R', 'num', { to: 22.36, dec: 2, suf: '%', label: 'AVG CARD APR, Q3 2026', col: RED }],
  ['S54', 'twenty million', 'R', 'num', { pre: '~$', to: 20, suf: 'M', label: 'REPORTED 2024 PURSE', col: GRN }],
];
