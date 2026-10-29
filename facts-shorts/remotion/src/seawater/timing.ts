// Beat times in seconds (voice placed at 0.1 s; word starts from faster-whisper, checked against pauses).
export const FPS = 60;
export const VO_AT = 0.1;
const w = (s: number) => s + VO_AT;
export const T = {
  raft: w(0.72), water: w(2.4), so1: w(3.98), why: w(4.06), drink: w(4.66), about: w(5.6), three: w(5.8),
  salt: w(7.36), kidneys: w(8.44), flush: w(9.16), but: w(10.12), cant: w(10.48), sea: w(11.92),
  clear: w(13.36), cup1: w(14.54), pee2: w(15.1), more: w(15.58), cup2: w(16.08), every: w(16.84),
  sip: w(17.18), thirstier: w(18.28), vend: w(19.26),
  card: w(19.26) + 0.35, end: w(19.26) + 0.35 + 2.8,
};
