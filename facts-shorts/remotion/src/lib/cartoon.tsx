// Reusable flat cut-out cartoon kit, drawn fully in code (no image service needed).
// Style: thick even black outlines, flat fills, one soft shade, simple faces.
import React from 'react';

export const INK = '#151515';
export const LW = 9; // outline width in local px

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
export const easeInOut = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
export const easeOut = (u: number) => 1 - Math.pow(1 - u, 3);
export const easeOutBack = (u: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); };
// progress of t through [a, b], eased
export const prog = (t: number, a: number, b: number, e = easeInOut) => e(clamp((t - a) / (b - a)));
// damped spring that starts at t0 (0 -> 1 with overshoot)
export const pop = (t: number, t0: number, k = 9, damp = 5.5) => {
  if (t < t0) return 0; const x = t - t0; return 1 - Math.exp(-damp * x) * Math.cos(k * x);
};
// piecewise keyframes [[t, ...values]] with eased glides and perfectly still holds
export const keys = (t: number, ks: number[][], e = easeInOut): number[] => {
  if (t <= ks[0][0]) return ks[0].slice(1);
  for (let i = 0; i < ks.length - 1; i++) {
    const [t0, ...a] = ks[i]; const [t1, ...b] = ks[i + 1];
    if (t <= t1) { const u = t1 === t0 ? 1 : e((t - t0) / (t1 - t0)); return a.map((v, j) => lerp(v, b[j], u)); }
  }
  return ks[ks.length - 1].slice(1);
};
// smooth shake: sum of sines times an amplitude
export const shake = (t: number, amp: number) => [amp * (Math.sin(t * 83.6) * 0.6 + Math.sin(t * 44.6) * 0.4), amp * (Math.sin(t * 71.2) * 0.5 + Math.sin(t * 29.9) * 0.5)];

// ---------------------------------------------------------------- the character
export type Expr = 'hot' | 'hope' | 'yuck' | 'worried' | 'thirsty' | 'happy';
export type GuyProps = {
  t: number; expr: Expr;
  handL: [number, number]; handR: [number, number]; // hand targets in local coords (origin = seat, y up is negative)
  bendL?: number; bendR?: number; // elbow bend (+ = elbow out/down)
  sx?: number; sy?: number; lean?: number; // squash/stretch about the seat, lean in degrees
  blink?: boolean; sweat?: number; // sweat drop progress 0..1 (0 = none)
  cup?: 'L' | 'R' | null; cupFull?: boolean; cupTilt?: number;
  look?: [number, number]; // pupil offset
  xray?: number; xrayChildren?: React.ReactNode; cupChildren?: React.ReactNode;
  stand?: boolean; stepL?: number; stepR?: number; handChildren?: React.ReactNode; // handChildren drawn at handR
};

const SHOULDER_L: [number, number] = [-34, -188];
const SHOULDER_R: [number, number] = [40, -188];

const Arm: React.FC<{s: [number, number]; h: [number, number]; bend: number}> = ({s, h, bend}) => {
  const mx = (s[0] + h[0]) / 2, my = (s[1] + h[1]) / 2;
  const dx = h[0] - s[0], dy = h[1] - s[1]; const len = Math.hypot(dx, dy) || 1;
  // perpendicular pointing "down/out" so elbows only bend one way, in a soft curve
  let px = -dy / len, py = dx / len; if (py < 0) { px = -px; py = -py; }
  const c: [number, number] = [mx + px * bend * len * 0.35, my + py * bend * len * 0.35];
  const d = `M ${s[0]} ${s[1]} Q ${c[0]} ${c[1]} ${h[0]} ${h[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d={d} stroke="#fff" strokeWidth={18} fill="none" strokeLinecap="round" />
      <circle cx={s[0]} cy={s[1]} r={10} fill="#fff" />
    </g>
  );
};

const Hand: React.FC<{h: [number, number]; flip?: boolean}> = ({h, flip}) => (
  <g transform={`translate(${h[0]} ${h[1]})`}>
    <ellipse cx={flip ? -16 : 16} cy={-8} rx={11} ry={8} fill="#fff" stroke={INK} strokeWidth={7} transform={`rotate(${flip ? 30 : -30} ${flip ? -16 : 16} -8)`} />
    <circle r={21} fill="#fff" stroke={INK} strokeWidth={8} />
    <path d="M -9 4 Q -2 12 7 6" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

export const TinCup: React.FC<{full?: boolean; tilt?: number; s?: number}> = ({full = true, tilt = 0, s = 1}) => (
  <g transform={`rotate(${tilt}) scale(${s})`}>
    <path d="M 34 -48 C 64 -50 66 -8 34 -12" stroke={INK} strokeWidth={17} fill="none" strokeLinecap="round" />
    <path d="M 34 -48 C 64 -50 66 -8 34 -12" stroke="#C9D1D9" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -40 -62 L 40 -62 L 33 18 Q 0 26 -33 18 Z" fill="#C9D1D9" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M 14 -58 L 10 16" stroke="#AEB8C2" strokeWidth={14} strokeLinecap="round" />
    <ellipse cx={0} cy={-62} rx={40} ry={11} fill={full ? '#3FA3EA' : '#8C969F'} stroke={INK} strokeWidth={LW} />
    {full && <ellipse cx={-12} cy={-64} rx={14} ry={3.5} fill="#BFE6FF" />}
  </g>
);

const Face: React.FC<{expr: Expr; blink: boolean; look: [number, number]; t: number}> = ({expr, blink, look, t}) => {
  const E1: [number, number] = [36, -346], E2: [number, number] = [94, -341];
  const lx = look[0], ly = look[1];
  const eye = (e: [number, number], i: number) => {
    if (expr === 'yuck') {
      const d = i === 0 ? `M ${e[0] - 14} ${e[1] - 14} L ${e[0] + 10} ${e[1]} L ${e[0] - 14} ${e[1] + 14}` : `M ${e[0] + 14} ${e[1] - 14} L ${e[0] - 10} ${e[1]} L ${e[0] + 14} ${e[1] + 14}`;
      return <path key={i} d={d} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
    }
    if (expr === 'happy') return <path key={i} d={`M ${e[0] - 14} ${e[1] + 6} Q ${e[0]} ${e[1] - 14} ${e[0] + 14} ${e[1] + 6}`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
    const ry = blink ? 1.5 : expr === 'worried' ? 17 : expr === 'thirsty' ? 9 : 14;
    const rx = expr === 'worried' ? 11 : 9.5;
    return (
      <g key={i}>
        <ellipse cx={e[0] + lx} cy={e[1] + ly + (expr === 'thirsty' ? 5 : 0)} rx={rx} ry={ry} fill={INK} />
        {!blink && <circle cx={e[0] + lx + 3} cy={e[1] + ly - 5} r={3} fill="#fff" />}
        {expr === 'thirsty' && !blink && <path d={`M ${e[0] - 15} ${e[1] - 3} L ${e[0] + 15} ${e[1] - 3}`} stroke={INK} strokeWidth={6} strokeLinecap="round" />}
      </g>
    );
  };
  const brow = (() => {
    switch (expr) {
      case 'hope': return ['M 18 -372 Q 34 -384 52 -376', 'M 78 -386 Q 96 -402 114 -388'];
      case 'yuck': return ['M 18 -380 L 52 -368', 'M 80 -368 L 114 -380'];
      case 'happy': return ['M 18 -380 Q 34 -390 52 -382', 'M 78 -382 Q 96 -392 112 -380'];
      default: return ['M 18 -372 Q 36 -380 52 -390', 'M 78 -390 Q 94 -382 112 -372']; // worried: inner ends up
    }
  })();
  let mouth: React.ReactNode = null;
  const wob = Math.sin(t * 18) * 2;
  if (expr === 'hot') mouth = (<g><ellipse cx={70} cy={-286} rx={17} ry={13} fill={INK} /><ellipse cx={72} cy={-280} rx={10} ry={6} fill="#F07A8A" /></g>);
  if (expr === 'hope') mouth = <path d="M 52 -292 Q 72 -274 92 -294" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
  if (expr === 'happy') mouth = (<g><path d="M 48 -296 Q 72 -258 98 -298 Z" fill={INK} /><ellipse cx={74} cy={-280} rx={12} ry={6} fill="#F07A8A" /></g>);
  if (expr === 'worried') mouth = <path d={`M 50 ${-286 + wob} q 8 -8 16 0 q 8 8 16 0 q 8 -8 16 0`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
  if (expr === 'yuck') mouth = (<g>
    <path d="M 46 -292 Q 72 -300 98 -290" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M 60 -294 L 60 -262 Q 74 -246 86 -262 L 86 -293" fill="#F07A8A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 73 -288 L 73 -266" stroke="#D45468" strokeWidth={4} strokeLinecap="round" />
  </g>);
  if (expr === 'thirsty') mouth = (<g>
    <ellipse cx={72} cy={-284} rx={20} ry={11} fill={INK} />
    <path d={`M 62 -282 L 62 ${-240 + wob} Q 74 ${-226 + wob} 86 ${-240 + wob} L 86 -282`} fill="#E89AA4" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
  </g>);
  return (
    <g>
      {expr === 'yuck' && (<g opacity={0.45}><circle cx={18} cy={-300} r={20} fill="#7DCB5A" /><circle cx={118} cy={-296} r={16} fill="#7DCB5A" /></g>)}
      {[E1, E2].map(eye)}
      {brow.map((d, i) => <path key={i} d={d} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />)}
      {mouth}
    </g>
  );
};

export const SweatDrop: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -26 C 8 -12 16 -2 16 8 C 16 18 8 24 0 24 C -8 24 -16 18 -16 8 C -16 -2 -8 -12 0 -26 Z" fill="#7CC8FF" stroke={INK} strokeWidth={6} />
    <ellipse cx={-5} cy={6} rx={4} ry={6} fill="#fff" />
  </g>
);

export const Guy: React.FC<GuyProps> = (p) => {
  const sx = p.sx ?? 1, sy = p.sy ?? 1, lean = p.lean ?? 0;
  const breathe = 1 + 0.009 * Math.sin(p.t * 2 * Math.PI * 0.6);
  const look = p.look ?? [0, 0];
  const cupHand = p.cup === 'L' ? p.handL : p.cup === 'R' ? p.handR : null;
  return (
    <g transform={`scale(${sx} ${sy * breathe}) rotate(${lean})`}>
      {/* contact shadow */}
      <ellipse cx={0} cy={4} rx={150} ry={18} fill="rgba(40,30,20,0.22)" />
      {p.stand ? (
        <g>
          <path d={`M -34 -120 Q ${-38 + (p.stepL ?? 0)} -50 ${-40 + (p.stepL ?? 0) * 2} 0`} stroke={INK} strokeWidth={40} fill="none" strokeLinecap="round" />
          <path d={`M -34 -120 Q ${-38 + (p.stepL ?? 0)} -50 ${-40 + (p.stepL ?? 0) * 2} 0`} stroke="#fff" strokeWidth={24} fill="none" strokeLinecap="round" />
          <path d={`M 34 -120 Q ${38 + (p.stepR ?? 0)} -50 ${40 + (p.stepR ?? 0) * 2} 0`} stroke={INK} strokeWidth={40} fill="none" strokeLinecap="round" />
          <path d={`M 34 -120 Q ${38 + (p.stepR ?? 0)} -50 ${40 + (p.stepR ?? 0) * 2} 0`} stroke="#fff" strokeWidth={24} fill="none" strokeLinecap="round" />
          <ellipse cx={-50 + (p.stepL ?? 0) * 2} cy={2} rx={36} ry={20} fill="#fff" stroke={INK} strokeWidth={LW} />
          <ellipse cx={54 + (p.stepR ?? 0) * 2} cy={2} rx={36} ry={20} fill="#fff" stroke={INK} strokeWidth={LW} />
        </g>
      ) : (
        <g>
      <g stroke={INK} strokeWidth={LW} strokeLinejoin="round">
        <ellipse cx={-52} cy={-46} rx={92} ry={44} fill="#fff" transform="rotate(-6 -52 -46)" />
        <ellipse cx={58} cy={-44} rx={96} ry={44} fill="#fff" transform="rotate(7 58 -44)" />
        <ellipse cx={-4} cy={-28} rx={46} ry={26} fill="#fff" />
      </g>
      <path d="M -120 -40 Q -60 -10 -10 -30" stroke="#E4E7EB" strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      )}
      <g transform={p.stand ? 'translate(0 -60)' : undefined}>
      {/* body */}
      <path d="M -66 -64 C -86 -150 -58 -212 4 -218 C 66 -212 90 -150 70 -64 Q 2 -46 -66 -64 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -54 -80 C -70 -150 -50 -196 -18 -208" stroke="#E4E7EB" strokeWidth={16} fill="none" strokeLinecap="round" />
      {/* head */}
      <circle cx={10} cy={-346} r={138} fill="#fff" stroke={INK} strokeWidth={LW} />
      <path d="M -88 -420 A 128 128 0 0 0 -60 -238" stroke="#E4E7EB" strokeWidth={22} fill="none" strokeLinecap="round" />
      <Face expr={p.expr} blink={!!p.blink} look={look} t={p.t} />
      {p.sweat ? <SweatDrop x={-42} y={-420 + 70 * p.sweat} s={Math.min(1, p.sweat * 4) * (p.sweat > 0.9 ? (1 - p.sweat) * 10 : 1)} /> : null}
      {/* arms + hands in front */}
      <Arm s={SHOULDER_L} h={p.handL} bend={p.bendL ?? 0.5} />
      <Arm s={SHOULDER_R} h={p.handR} bend={p.bendR ?? 0.5} />
      {cupHand && (
        <g transform={`translate(${cupHand[0] + 8} ${cupHand[1] + 10})`}><TinCup full={p.cupFull} tilt={p.cupTilt ?? 0} s={0.9} />{p.cupChildren}</g>
      )}
      <Hand h={p.handL} flip />
      {p.handChildren && <g transform={`translate(${p.handR[0]} ${p.handR[1]})`}>{p.handChildren}</g>}
      <Hand h={p.handR} />
      {p.xray ? <g>{p.xrayChildren}</g> : null}
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- props and set pieces
export const Raft: React.FC<{t: number}> = ({t}) => {
  const logs = [0, 1, 2, 3, 4, 5];
  const flag = (k: number) => 10 * Math.sin(t * 6 + k);
  return (
    <g stroke={INK} strokeWidth={LW} strokeLinejoin="round">
      {/* mast + flag */}
      <path d="M 190 -40 L 190 -330" strokeWidth={22} stroke={INK} strokeLinecap="round" />
      <path d="M 190 -40 L 190 -330" strokeWidth={10} stroke="#9A6436" strokeLinecap="round" />
      <path d={`M 196 -320 Q 240 ${-330 + flag(0)} 286 ${-318 + flag(1)} L 272 ${-292 + flag(2)} L 290 ${-268 + flag(2)} Q 240 ${-262 + flag(1)} 196 -262 Z`} fill="#fff" />
      {/* deck */}
      <path d="M -290 -40 L 290 -40 L 260 30 L -260 30 Z" fill="#C48A52" />
      {logs.map((i) => <path key={i} d={`M ${-260 + i * 87} 30 L ${-286 + i * 96} -40`} stroke="#8A5A30" strokeWidth={6} />)}
      {/* log ends */}
      {logs.map((i) => (
        <g key={'e' + i}>
          <circle cx={-218 + i * 87} cy={44} r={40} fill="#B07A45" />
          <circle cx={-218 + i * 87} cy={44} r={20} fill="none" stroke="#8A5A30" strokeWidth={5} />
        </g>
      ))}
      <path d="M -40 2 L -40 84 M 60 2 L 60 84" stroke="#E8D29A" strokeWidth={10} />
    </g>
  );
};

export const SaltCube: React.FC<{s?: number; face?: boolean; t?: number}> = ({s = 1, face = true, t = 0}) => (
  <g transform={`scale(${s})`}>
    <path d="M -22 -14 L 0 -26 L 22 -14 L 22 14 L 0 26 L -22 14 Z" fill="#fff" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -22 -14 L 0 -2 L 22 -14 M 0 -2 L 0 26" stroke={INK} strokeWidth={4} fill="none" />
    <path d="M 0 -2 L 22 -14 L 22 14 L 0 26 Z" fill="#E4E7EB" />
    {face && (<g><circle cx={-12} cy={2} r={3} fill={INK} /><circle cx={-4} cy={6} r={3} fill={INK} />
      <path d={`M -14 ${12 + Math.sin(t * 9)} Q -8 16 -2 13`} stroke={INK} strokeWidth={2.5} fill="none" /></g>)}
  </g>
);

export const Kidney: React.FC<{t: number; flip?: boolean; squeeze?: number; sweat?: number; expr?: 'ok' | 'strain' | 'oops'}> = ({t, flip, squeeze = 0, sweat = 0, expr = 'ok'}) => {
  const sy = 1 - 0.14 * squeeze, sx = 1 + 0.08 * squeeze;
  return (
    <g transform={`scale(${(flip ? -1 : 1) * sx} ${sy})`}>
      <path d="M 10 -70 C 60 -80 80 -20 60 20 C 44 56 30 74 -8 72 C -46 70 -54 30 -34 6 C -20 -10 -42 -26 -36 -46 C -30 -64 -14 -66 10 -70 Z" fill="#E5636A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 40 -50 C 58 -30 58 10 44 34" stroke="#F49A9E" strokeWidth={12} fill="none" strokeLinecap="round" />
      <g transform={`scale(${flip ? -1 : 1} 1)`}>
        {expr === 'strain'
          ? (<g><path d="M -14 -12 l 9 6 l -9 6 M 14 -12 l -9 6 l 9 6" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
              <path d="M -10 22 q 10 -8 20 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" /></g>)
          : (<g><ellipse cx={-10} cy={-6} rx={5} ry={expr === 'oops' ? 9 : 7} fill={INK} /><ellipse cx={12} cy={-6} rx={5} ry={expr === 'oops' ? 9 : 7} fill={INK} />
              {expr === 'oops' ? <ellipse cx={2} cy={22} rx={7} ry={8} fill={INK} /> : <path d="M -8 16 q 10 10 20 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />}</g>)}
        {sweat > 0 && <SweatDrop x={30} y={-46 + 20 * sweat} s={0.45} />}
      </g>
    </g>
  );
};

export const Jug: React.FC<{level: number; s?: number}> = ({level, s = 1}) => {
  // level 0..1 of the jug's inside height (bottom y 120, top y -120)
  const top = 116 - 230 * clamp(level);
  return (
    <g transform={`scale(${s})`}>
      <defs><clipPath id="jugIn"><path d="M -78 -120 L 78 -120 L 70 112 Q 0 126 -70 112 Z" /></clipPath></defs>
      <path d="M 78 -80 C 136 -80 136 40 72 40" stroke={INK} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M 78 -80 C 136 -80 136 40 72 40" stroke="#DDF3FF" strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d="M -78 -120 L 78 -120 L 70 112 Q 0 126 -70 112 Z" fill="#E9F7FF" />
      <g clipPath="url(#jugIn)">
        <rect x={-90} y={top} width={180} height={260} fill="#F4D35E" />
        <path d={`M -90 ${top} L 90 ${top}`} stroke="#E0B93A" strokeWidth={8} />
      </g>
      <path d="M -78 -120 L 78 -120 L 70 112 Q 0 126 -70 112 Z" fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -96 -120 L -78 -138 L 78 -138 L 90 -120" fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M -60 ${80 - i * 50} L -36 ${80 - i * 50}`} stroke="#7FA9C4" strokeWidth={6} strokeLinecap="round" />)}
    </g>
  );
};

export const Cloud: React.FC<{s?: number}> = ({s = 1}) => {
  const c = [[-70, 10, 42], [-20, -18, 56], [44, -6, 48], [86, 14, 34], [0, 18, 46]];
  return (
    <g transform={`scale(${s})`}>
      {c.map(([x, y, r], i) => <circle key={'o' + i} cx={x} cy={y} r={r + LW / 2 + 1} fill={INK} />)}
      {c.map(([x, y, r], i) => <circle key={'f' + i} cx={x} cy={y} r={r - LW / 2 + 1} fill="#fff" />)}
      <path d="M -100 30 L 110 30" stroke="#fff" strokeWidth={10} />
    </g>
  );
};

export const Sun: React.FC<{t: number; mood: 'smug' | 'grin'}> = ({t, mood}) => (
  <g>
    <g transform={`rotate(${t * 12})`}>
      {Array.from({length: 12}).map((_, i) => (
        <path key={i} transform={`rotate(${i * 30})`} d="M 0 -150 L 18 -112 L -18 -112 Z" fill="#FFB938" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      ))}
    </g>
    <circle r={110} fill="#FFD84D" stroke={INK} strokeWidth={LW} />
    <path d="M -76 -40 A 96 96 0 0 0 -20 90" stroke="#FFE995" strokeWidth={16} fill="none" strokeLinecap="round" />
    {/* sunglasses */}
    <path d="M -72 -26 L 72 -26" stroke={INK} strokeWidth={8} />
    <path d="M -70 -28 L -10 -28 Q -12 6 -40 8 Q -68 6 -70 -28 Z" fill={INK} />
    <path d="M 10 -28 L 70 -28 Q 68 6 40 8 Q 12 6 10 -28 Z" fill={INK} />
    <path d="M -54 -20 L -40 -20" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
    {mood === 'smug'
      ? <path d="M -30 46 Q 10 62 44 38" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
      : <g><path d="M -44 36 Q 0 92 48 34 Z" fill={INK} /><path d="M -30 46 L 34 46" stroke="#fff" strokeWidth={8} /></g>}
  </g>
);

export const SharkFin: React.FC = () => (
  <g>
    <path d="M -50 0 C -30 -40 -10 -90 30 -110 C 22 -70 30 -30 50 0 Z" fill="#7C8C9A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -10 -40 C 0 -70 12 -90 26 -100" stroke="#A3B2BF" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);
