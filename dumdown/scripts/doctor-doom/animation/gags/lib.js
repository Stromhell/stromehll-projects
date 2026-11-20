// helpers for gag pages: window.TIMING = gag meta json
(function () { const G = window.TIMING; window.TIMING = { durs: [G.dur - .6], gap: 0, paras: [] }; window.GAG = G;
  window.SAY = (who, from = 0) => G.speech.filter(s => s.who === who).map(s => [s.t0 - from, s.t1 - from]);
  window.LINE = (i) => G.speech[i].t0; window.LAUGH = () => (G.laugh[0] || { t: G.dur - 2 }).t; })();
