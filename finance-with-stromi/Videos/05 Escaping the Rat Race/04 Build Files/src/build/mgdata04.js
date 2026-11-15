/* Finance with Stromi 04 (The 48-Hour Blackout): motion-graphics beats. [shot, at (sec or phrase), pos, type, args] */
const RED = '#c2372d', GRN = '#3f9b5f', GLD = '#e3c77a';
const MGD = [
  ['S01', 'third time', 'L', 'num', { to: 3, suf: 'rd', label: 'US SKY STOP THIS CENTURY', col: RED }],
  ['S03', 'forty-eight hours', 'R', 'num', { to: 48, suf: ' HRS', label: '3 GIANT SYSTEMS FAIL', col: RED }],
  ['S10', 'More than seventy', 'R', 'num', { to: 70, suf: '+', label: 'COUNTRIES HIT', col: RED }],
  ['S12', 'National Health', 'L', 'list', { label: 'WHO FELT IT', items: ['UK NHS SERVICES', 'AIR INDIA EMAIL', 'MILLIONS OF OFFICES'], tick: true }],
  ['S15', 'two days without', 'L', 'num', { to: 2, suf: ' DAYS', label: 'NO EMAIL = NO INVOICES', col: RED }],
  ['S20', 'four hours and twenty', 'R', 'cal', { top: 'NOV 13', big: '4h20', sub: 'NO TAKEOFFS', col: RED }],
  ['S21', 'four thousand seven hundred', 'TC', 'num', { to: 4700, suf: '+', label: 'FLIGHTS CANCELLED · FRIDAY', col: RED }],
  ['S21', 'ten thousand', 'TC', 'num', { pre: '~', to: 10000, label: 'FLIGHTS DELAYED · FRIDAY', col: GLD }],
  ['S23', 'about an hour', 'BRL', 'bars', { vals: [1.5, 4.3], labels: ['JAN 2023', 'NOV 2026'], label: 'GROUND STOP (HOURS)', dec: 1 }],
  ['S28', 'nineteen sixties', 'R', 'cal', { top: 'COPPER', big: '1960s', sub: 'OLDEST CABLES', col: GLD }],
  ['S33', 'eleven thousand five hundred', 'HR', 'num', { pre: '~', to: 11500, label: 'BUSINESSES ON WORKDAY', col: RED }],
  ['S44', 'United closed', 'BB', 'bars', { vals: [1.7, 1.3, 1.5, 1.0, 0.4], labels: ['UAL', 'JBLU', 'ALK', 'AAL', 'DAL'], label: '% DOWN · NOV 13 CLOSE', dec: 1 }],
  ['S48', 'Watch three things', 'BR', 'list', { label: 'WATCH ON MONDAY', items: ['AIRLINES', 'WORKDAY (WDAY)', 'WHO GETS PAID TO FIX IT'], tick: true }],
];
