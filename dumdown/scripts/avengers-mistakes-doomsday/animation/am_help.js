// helpers for inline gags: GT(key, idx[]) -> talk windows (shot-local, shot must start at the gag paragraph); GP(key) -> gag paragraph index
window.GP = key => (window.TIMING.gags.find(g => g.key === key) || {}).p;
window.GT = (key, idx) => { const g = window.TIMING.gags.find(g => g.key === key); if (!g) return []; return g.speech.filter((_, i) => !idx || idx.includes(i)).map(s => [s.t0, s.t1]); };
window.GS = (key, i) => { const g = window.TIMING.gags.find(g => g.key === key); return g && g.speech[i] ? g.speech[i].t0 : 0; };
window.DUR = p => window.TIMING.durs[p];
window.TK = (key, idx, off = 0) => window.GT(key, idx).map(([a, b]) => [a - off, b - off]);
// Doom thank-you beat: scroll insert (tick) then Doom says it. extra: props added behind Doom (basket, balloon, band...)
window.THX = (key, n, extra = {}) => { const p = window.GP(key), d = window.DUR(p), ts = Math.max(.9, window.GS(key, 0) - .35);
  return [
    { p, plate: 'sd_doom_throne', still: 1, noWhip: 1, cam: { z: [1.55, 1.65], x: 1280, y: 760 }, props: [{ k: 'scroll', x: 1280, y: 760, s: 1.1, n, tick: .25 }, { k: 'quill', x: [1500, 1440], y: [640, 600 + (12 - n) * 0], s: .9, layer: 'front' }] },
    { p, f: ts / d, plate: 'sd_doom_throne', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'doom', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'deadpan', talk: window.TK(key, null, ts), acts: [{ a: 'shrug', at: .2 }] }].concat(extra.chars || []),
      props: [{ k: 'listDesk', x: 1280, y: 1040, s: 1.2, layer: 'front' }].concat(extra.props || []), noMeter: 1 } ]; };
