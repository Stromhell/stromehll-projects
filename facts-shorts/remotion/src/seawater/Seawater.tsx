import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {T, FPS, VO_AT} from './timing';
import {
  INK, LW, Guy, Expr, Raft, SaltCube, Kidney, Jug, TinCup, Cloud, Sun, SharkFin, SweatDrop,
  clamp, lerp, prog, pop, keys, easeOut, easeOutBack, shake,
} from '../lib/cartoon';

const W = 1080, H = 1920, CX = 540, CY = 960;
const SEAT: [number, number] = [540, 1300];
const HORIZON = 880;

// ------------------------------------------------------------------ camera
const camAt = (t: number) => keys(t, [
  [0, 560, 1120, 1.45],
  [T.water - 0.1, 560, 1120, 1.45],
  [T.water + 1.1, 540, 1000, 0.72],
  [T.why - 0.2, 540, 1000, 0.72],
  [T.drink + 0.35, 600, 1100, 1.5],
  [T.about + 0.05, 600, 1100, 1.5],
  [T.three + 0.45, 600, 1060, 1.9],
  [T.salt + 0.05, 600, 1060, 1.9],
  [T.salt + 0.5, 590, 1060, 1.6],
  [T.kidneys - 0.15, 590, 1060, 1.6],
  [T.kidneys + 0.55, 540, 1170, 2.0],
  [T.cant - 0.25, 540, 1170, 2.0],
  [T.cant + 0.45, 650, 1170, 2.0],
  [T.clear - 0.15, 650, 1170, 2.0],
  [T.clear + 0.75, 830, 1040, 1.05],
  [T.every - 0.15, 830, 1040, 1.05],
  [T.every + 1.0, 560, 1120, 1.45],
]);

// a world layer with parallax p (1 = main plane, smaller = further away)
const Layer: React.FC<{cam: number[]; p?: number; children: React.ReactNode}> = ({cam, p = 1, children}) => {
  const [cx, cy, z] = cam; const zp = 1 + (z - 1) * p;
  const ox = 540 + (cx - 540) * p, oy = 960 + (cy - 960) * p;
  return <g transform={`translate(${CX} ${CY}) scale(${zp}) translate(${-ox} ${-oy})`}>{children}</g>;
};

// ------------------------------------------------------------------ the guy's acting
const exprAt = (t: number): Expr => {
  if (t >= T.every + 0.15) return 'thirsty';
  if (t >= T.kidneys - 0.25) return 'worried';
  if (t >= T.salt + 0.45) return 'yuck';
  if (t >= T.drink - 0.25) return 'hope';
  return 'hot';
};
const SWAPS = [T.drink - 0.25, T.salt + 0.45, T.kidneys - 0.25, T.every + 0.15];

const KNEE_L: [number, number] = [-78, -78], KNEE_R: [number, number] = [86, -76];
const armsAt = (t: number) => {
  // returns [hl, hr, bendL, bendR, cupHeld]
  let hl: [number, number] = KNEE_L, hr: [number, number] = KNEE_R;
  // fan himself while hot
  const fanIn = prog(t, 0.35, 0.8), fanOut = prog(t, T.why - 0.75, T.why - 0.35);
  const fan = fanIn * (1 - fanOut);
  hr = [lerp(KNEE_R[0], 150 + 22 * Math.sin(t * 15), fan), lerp(KNEE_R[1], -300 + 8 * Math.cos(t * 15), fan)];
  // dip the cup into the sea and lift it
  const dip = prog(t, T.why - 0.35, T.why + 0.2), lift = prog(t, T.why + 0.35, T.drink + 0.1, easeOut);
  hr = [lerp(hr[0], 290, dip), lerp(hr[1], 30, dip)];
  hr = [lerp(hr[0], 64, lift), lerp(hr[1], -150, lift)];
  const join = prog(t, T.why + 0.6, T.drink + 0.2);
  hl = [lerp(hl[0], -6, join), lerp(hl[1], -146, join)];
  // sip
  const sip = prog(t, T.salt - 0.05, T.salt + 0.25), away = prog(t, T.salt + 0.42, T.salt + 0.62, easeOutBack);
  hr = [lerp(hr[0], 96, sip), lerp(hr[1], -262, sip)];
  hl = [lerp(hl[0], KNEE_L[0], sip), lerp(hl[1], KNEE_L[1], sip)];
  hr = [lerp(hr[0], 215, away), lerp(hr[1], -170, away)];
  // put the cup down, hands out wide for the x-ray
  const wide = prog(t, T.kidneys - 0.35, T.kidneys + 0.1);
  hl = [lerp(hl[0], -120, wide), lerp(hl[1], -60, wide)];
  hr = [lerp(hr[0], 128, wide), lerp(hr[1], -58, wide)];
  // thirsty slump: arms hang
  const slump = prog(t, T.every + 0.1, T.every + 0.5);
  hl = [lerp(hl[0], -96, slump), lerp(hl[1], -40, slump)];
  hr = [lerp(hr[0], 108, slump), lerp(hr[1], -38, slump)];
  const held = t >= T.why + 0.1 && t < T.kidneys - 0.1;
  return {hl, hr, held};
};

const swapSquash = (t: number) => {
  let sx = 1, sy = 1;
  for (const s of SWAPS) {
    const a = t - (s - 0.12);
    if (a > 0 && a < 0.12) { const u = a / 0.12; sy -= 0.06 * u; sx += 0.04 * u; }
    if (a >= 0.12 && a < 1.2) { const k = pop(t, s, 16, 7); sy -= 0.06 * (1 - k); sx += 0.04 * (1 - k); }
  }
  return [sx, sy];
};

// ------------------------------------------------------------------ sea and sky
const wavePath = (t: number, y: number, amp: number, len: number, speed: number, x0 = -1400, x1 = 2500) => {
  let d = `M ${x0} ${y + 400} L ${x0} ${y}`;
  for (let x = x0; x <= x1; x += len) {
    const ph = Math.sin((x / len) * 1.3 + t * speed) * amp * 0.25;
    d += ` Q ${x + len / 2} ${y - amp + ph} ${x + len} ${y}`;
  }
  return d + ` L ${x1} ${y + 2000} L ${x0} ${y + 2000} Z`;
};

const Splash: React.FC<{t: number; t0: number; x: number; y: number}> = ({t, t0, x, y}) => {
  const a = t - t0; if (a < 0 || a > 0.8) return null;
  return (
    <g>
      {[-1, -0.5, 0, 0.5, 1].map((k, i) => {
        const vx = 220 * k, vy = -520 + 120 * Math.abs(k); const px = x + vx * a, py = y + vy * a + 0.5 * 1500 * a * a;
        const r = 14 * (1 - a / 0.8) + 3;
        return <circle key={i} cx={px} cy={py} r={r} fill="#6CC3FF" stroke={INK} strokeWidth={5} />;
      })}
    </g>
  );
};

// ------------------------------------------------------------------ x-ray of the kidneys
const XRay: React.FC<{t: number}> = ({t}) => {
  const open = pop(t, T.kidneys, 11, 6) * (1 - prog(t, T.clear - 0.1, T.clear + 0.15));
  if (open <= 0.01) return null;
  const pump = t > T.flush + 0.25 && t < T.clear ? Math.max(0, Math.sin((t - T.flush) * 9)) : 0;
  const strain = t > T.cant;
  const kExpr = strain ? 'strain' : t > T.flush + 0.2 ? 'ok' : 'oops';
  const drops = t > T.flush + 0.4 && t < T.clear ? [0, 1, 2] : [];
  return (
    <g transform={`translate(4 -142) scale(${open})`}>
      <defs><clipPath id="xr"><circle r={104} /></clipPath></defs>
      <circle r={104 + LW / 2} fill={INK} />
      <g clipPath="url(#xr)">
        <circle r={104} fill="#FFE3DF" />
        <path d="M -30 10 Q -20 50 0 70 M 34 10 Q 24 50 4 70" stroke="#F2A6A6" strokeWidth={10} fill="none" strokeLinecap="round" />
        <ellipse cx={2} cy={86} rx={30} ry={22} fill="#F4D35E" stroke={INK} strokeWidth={5} />
        {drops.map((i) => {
          const a = ((t - T.flush - 0.4 + i * 0.33) % 1);
          return <ellipse key={i} cx={i % 2 ? -18 : 22} cy={14 + a * 64} rx={6} ry={9} fill="#F4D35E" stroke={INK} strokeWidth={3} />;
        })}
        <g transform="translate(-40 -30) scale(0.62)"><Kidney t={t} squeeze={pump} sweat={strain ? ((t * 0.9) % 1) : 0} expr={kExpr as any} /></g>
        <g transform="translate(46 -30) scale(0.62)"><Kidney t={t} flip squeeze={pump} sweat={strain ? (((t + 0.5) * 0.9) % 1) : 0} expr={kExpr as any} /></g>
        {/* salt falls in on "flush" */}
        {[0, 1, 2, 3].map((i) => {
          const a = t - (T.flush - 0.35 + i * 0.12); if (a < 0 || a > 0.6) return null;
          const tx = i % 2 ? 46 : -40; const y = -130 + 300 * a * a + 60 * a;
          return <g key={i} transform={`translate(${tx + (i - 1.5) * 8} ${Math.min(y, -40)}) scale(${a > 0.5 ? (0.6 - a) * 10 * 0.5 : 0.5})`}><SaltCube face={false} /></g>;
        })}
      </g>
    </g>
  );
};

// ------------------------------------------------------------------ screen overlays
const Label: React.FC<{x: number; y: number; size: number; s?: number; color?: string; children: React.ReactNode; rot?: number}> = ({x, y, size, s = 1, color = '#fff', children, rot = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <text textAnchor="middle" fontFamily="Anton, 'Arial Black', 'DejaVu Sans', sans-serif" fontWeight={900} fontSize={size}
      fill={color} stroke={INK} strokeWidth={size * 0.16} paintOrder="stroke" strokeLinejoin="round">{children}</text>
  </g>
);

const SaltMeter: React.FC<{t: number}> = ({t}) => {
  const k = pop(t, T.cant - 0.1, 12, 7) * (1 - prog(t, T.clear - 0.2, T.clear + 0.1));
  if (k <= 0.01) return null;
  const seaFill = prog(t, T.cant, T.cant + 0.5, easeOut);
  const peeFill = prog(t, T.cant + 0.35, T.cant + 1.1, easeOut) * 0.6 + (t > T.cant + 1.1 ? 0.012 * Math.sin(t * 40) : 0);
  const bar = (x: number, fill: number, col: string, label: string) => (
    <g transform={`translate(${x} 0)`}>
      <rect x={-46} y={-420} width={92} height={420} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
      <rect x={-41} y={-415 + 410 * (1 - fill)} width={82} height={410 * fill} rx={16} fill={col} />
      <rect x={-46} y={-420} width={92} height={420} rx={20} fill="none" stroke={INK} strokeWidth={LW} />
      <Label x={0} y={70} size={52}>{label}</Label>
    </g>
  );
  return (
    <g transform={`translate(850 1600) scale(${1.15 * k})`}>
      <Label x={0} y={-470} size={50} color="#FFE45C">SALTINESS</Label>
      {bar(-62, seaFill, '#3FA3EA', 'SEA')}
      {bar(62, peeFill, '#F4D35E', 'PEE')}
      <path d="M 6 -262 L 118 -262" stroke="#E5414A" strokeWidth={8} strokeDasharray="16 10" />
      <Label x={62} y={-280} size={34} color="#FF8A8A">MAX</Label>
    </g>
  );
};

const CupVsJug: React.FC<{t: number}> = ({t}) => {
  const k = 1 - prog(t, T.every - 0.1, T.every + 0.25);
  if (t < T.cup1 - 0.15 || k <= 0.01) return null;
  const c = pop(t, T.cup1 - 0.1, 12, 7) * k, a = pop(t, T.pee2 - 0.1, 12, 7) * k, j = pop(t, T.pee2, 12, 7) * k;
  const level = 0.45 * prog(t, T.pee2 + 0.1, T.more, easeOut) + 0.37 * prog(t, T.more, T.cup2 + 0.4, easeOut);
  return (
    <g>
      <g transform={`translate(540 1170) scale(${2.1 * c})`}><TinCup full /></g>
      <Label x={530} y={1350} size={54} s={c}>1 CUP IN</Label>
      <g transform={`translate(690 1110) scale(${1.3 * a})`}>
        <path d="M -34 0 L 26 0" stroke={INK} strokeWidth={26} strokeLinecap="round" />
        <path d="M -34 0 L 26 0" stroke="#fff" strokeWidth={12} strokeLinecap="round" />
        <path d="M 14 -26 L 44 0 L 14 26 Z" fill="#fff" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      </g>
      <g transform={`translate(880 1090) scale(${1.2 * j})`}>
        <Jug level={level} />
        <path d="M -96 12 L 96 12" stroke="#E5414A" strokeWidth={7} strokeDasharray="14 9" />
      </g>
      <Label x={890} y={1350} size={54} s={j} color="#FFE45C">MORE OUT</Label>
    </g>
  );
};

const PctBadge: React.FC<{t: number}> = ({t}) => {
  const k = pop(t, T.three - 0.05, 12, 6) * (1 - prog(t, T.kidneys - 0.45, T.kidneys - 0.2));
  if (k <= 0.01) return null;
  return (
    <g>
      <Label x={540} y={1570} size={190} s={k} rot={-4} color="#FFE45C">3.5%</Label>
      <Label x={540} y={1690} size={86} s={pop(t, T.salt - 0.1, 12, 6) * (1 - prog(t, T.kidneys - 0.45, T.kidneys - 0.2))} rot={-4}>IS SALT</Label>
    </g>
  );
};

const EndCard: React.FC<{t: number}> = ({t}) => {
  const a = t - T.card; if (a < 0) return null;
  const r = 2300 * easeOut(clamp(a / 0.45));
  const lk = pop(t, T.card + 0.2, 10, 6);
  return (
    <g>
      <defs><clipPath id="iris"><circle cx={540} cy={960} r={r} /></clipPath></defs>
      <g clipPath="url(#iris)">
        <rect width={W} height={H} fill="#2C7BE5" />
        <g transform={`translate(540 860) rotate(${a * 10})`}>
          {Array.from({length: 16}).map((_, i) => <path key={i} transform={`rotate(${i * 22.5})`} d="M 0 0 L 90 -1600 L -90 -1600 Z" fill="#3D8CF0" />)}
        </g>
        <Label x={540} y={1330} size={70} s={pop(t, T.card + 0.45, 10, 6)}>WATCH FULL VIDEOS</Label>
        <Label x={540} y={1420} size={60} s={pop(t, T.card + 0.55, 10, 6)}>ON OUR YOUTUBE CHANNEL</Label>
        <Label x={540} y={1560} size={60} s={pop(t, T.card + 0.7, 10, 6)} rot={-3} color="#FFE45C">STORMI EXPLAIN EVERYTHING</Label>
      </g>
      <foreignObject x={0} y={0} width={W} height={H} clipPath="url(#iris)">
        <div style={{position: 'absolute', left: 540 - 330, top: 800 - 330, width: 660, height: 660, transform: `scale(${lk})`}}>
          <Img src={staticFile('seawater/stormi.png')} style={{width: 660, height: 660}} />
        </div>
      </foreignObject>
    </g>
  );
};

// ------------------------------------------------------------------ sound
type Cue = {f: string; at: number; db: number};
const CUES: Cue[] = [
  {f: 'whoosh', at: T.water - 0.05, db: -24},
  {f: 'boing', at: T.water + 0.7, db: -27},
  {f: 'whoosh', at: T.why - 0.3, db: -27},
  {f: 'splash', at: T.why + 0.18, db: -17},
  {f: 'pop', at: T.drink - 0.25, db: -24},
  {f: 'whoosh', at: T.three - 0.1, db: -27},
  {f: 'pop', at: T.three - 0.05, db: -18},
  {f: 'pop', at: T.three + 0.25, db: -22},
  {f: 'pop', at: T.three + 0.5, db: -22},
  {f: 'pop', at: T.salt - 0.1, db: -20},
  {f: 'slurp', at: T.salt + 0.05, db: -20},
  {f: 'blegh', at: T.salt + 0.45, db: -18},
  {f: 'whoosh', at: T.kidneys - 0.2, db: -25},
  {f: 'pop', at: T.kidneys, db: -18},
  {f: 'tick', at: T.flush - 0.3, db: -22},
  {f: 'tick', at: T.flush - 0.15, db: -22},
  {f: 'squeeze', at: T.flush + 0.3, db: -22},
  {f: 'squeeze', at: T.flush + 1.0, db: -24},
  {f: 'pop', at: T.cant - 0.1, db: -18},
  {f: 'pour', at: T.cant + 0.3, db: -26},
  {f: 'boing', at: T.cant + 1.1, db: -25},
  {f: 'whoosh', at: T.clear - 0.1, db: -25},
  {f: 'pop', at: T.cup1 - 0.1, db: -18},
  {f: 'pop', at: T.pee2, db: -18},
  {f: 'pour', at: T.pee2 + 0.1, db: -21},
  {f: 'pour', at: T.more + 0.2, db: -21},
  {f: 'whoosh', at: T.every - 0.1, db: -25},
  {f: 'sad', at: T.thirstier + 0.05, db: -20},
  {f: 'whoosh', at: T.card - 0.05, db: -20},
  {f: 'pop', at: T.card + 0.2, db: -14},
];

export const Seawater: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  const cam = camAt(t);
  const bobY = 7 * Math.sin(t * 2.1), bobR = 1.3 * Math.sin(t * 1.6 + 0.6);
  const {hl, hr, held} = armsAt(t);
  const [sx, sy] = swapSquash(t);
  const expr = exprAt(t);
  const blink = expr !== 'yuck' && ((t + 0.4) % 2.9) < 0.1;
  const hot = t < T.why - 0.3 || t > T.every + 0.1;
  const sweat = hot ? ((t + 0.3) % 2.3) / 2.3 : t > T.cant && t < T.clear + 1 ? ((t * 0.8) % 1) : 0;
  const lookShark = t > T.water + 0.6 && t < T.why - 0.4;
  const look: [number, number] = lookShark ? [-6, 4] : expr === 'worried' && t > T.kidneys && t < T.clear ? [-2, 6] : [0, 0];
  const lean = (t > T.salt + 0.45 && t < T.kidneys - 0.3 ? -6 * (1 - pop(t, T.salt + 0.45, 12, 6)) : 0) + (t > T.every + 0.15 ? 4 * prog(t, T.every + 0.15, T.every + 0.6) : 0);
  const finX = lerp(1500, -500, prog(t, T.water + 0.4, T.why + 1.4, (u) => u));
  const sunMood = t > T.thirstier - 0.1 ? 'grin' : 'smug';
  const [shx, shy] = shake(t, t > T.salt + 0.45 && t < T.salt + 0.75 ? 6 * (1 - (t - T.salt - 0.45) / 0.3) : 0);

  // the cup with salt cubes popping out of it
  const cubes = t > T.three - 0.05 && t < T.salt + 0.1 ? [0, 1, 2] : [];
  const cupChildren = (
    <g>
      {cubes.map((i) => {
        const a = t - (T.three + i * 0.27); if (a < 0) return null;
        const hop = Math.abs(Math.sin(a * 7 + i)) * 24;
        const x = (i - 1) * 36, y = -78 - 30 * easeOutBack(clamp(a / 0.3)) - hop;
        return <g key={i} transform={`translate(${x} ${y}) scale(${0.62 * Math.min(1, a * 4)})`}><SaltCube t={t + i} /></g>;
      })}
    </g>
  );

  return (
    <AbsoluteFill style={{backgroundColor: '#9BD8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', transform: `translate(${shx}px, ${shy}px)`}}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7FCBFF" /><stop offset="1" stopColor="#D4F1FF" />
          </linearGradient>
        </defs>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="url(#sky)" />
        {/* far: clouds, sun */}
        <Layer cam={cam} p={0.2}>
          <g transform={`translate(${640 + t * 6} 300)`}><Cloud s={1.1} /></g>
          <g transform={`translate(${760 + t * 4} 560)`}><Cloud s={0.8} /></g>
          <g transform={`translate(${-260 + t * 5} 640)`}><Cloud s={0.7} /></g>
        </Layer>
        <Layer cam={cam} p={0.32}>
          <g transform="translate(300 360) scale(0.8)"><Sun t={t} mood={sunMood} /></g>
        </Layer>
        {/* sea */}
        <Layer cam={cam} p={0.6}>
          <rect x={-2000} y={HORIZON} width={6000} height={3000} fill="#3C8ED8" />
          <path d={`M -2000 ${HORIZON} L 4000 ${HORIZON}`} stroke={INK} strokeWidth={LW} />
          <path d={wavePath(t, HORIZON + 70, 14, 160, 1.4, -2000, 4000)} fill="#3585D0" />
        </Layer>
        <Layer cam={cam}>
          <g transform={`translate(${finX} ${1078 + 6 * Math.sin(t * 3)})`}><SharkFin /></g>
          <path d={wavePath(t, 1075, 26, 200, 1.8)} fill="#2F7DC7" stroke={INK} strokeWidth={LW} />
          <Splash t={t} t0={T.why + 0.18} x={SEAT[0] + 290} y={SEAT[1] + 30} />
          <g transform={`translate(${SEAT[0]} ${SEAT[1] + bobY}) rotate(${bobR})`}>
            <g transform="translate(0 40)"><Raft t={t} /></g>
            {!held && t > T.kidneys - 0.2 && <g transform="translate(225 -12) scale(0.8)"><TinCup full={false} /></g>}
            <Guy t={t} expr={expr} handL={hl} handR={hr} bendL={0.45} bendR={0.5} sx={sx} sy={sy} lean={lean}
              blink={blink} sweat={sweat} cup={held ? 'R' : null} cupFull={t < T.salt + 0.2}
              cupTilt={-38 * prog(t, T.salt - 0.05, T.salt + 0.25) * (1 - prog(t, T.salt + 0.42, T.salt + 0.62))}
              look={look} xray={t > T.kidneys - 0.05 && t < T.clear + 0.2 ? 1 : 0} xrayChildren={<XRay t={t} />} cupChildren={cupChildren} />
          </g>
          <path d={wavePath(t + 1.3, 1405, 30, 230, 2.2)} fill="#2A70B8" stroke={INK} strokeWidth={LW} />
          <path d={wavePath(t + 2.1, 1560, 34, 260, 2.6)} fill="#2563A6" stroke={INK} strokeWidth={LW} />
        </Layer>
        {/* overlays in screen space */}
        <PctBadge t={t} />
        <SaltMeter t={t} />
        <CupVsJug t={t} />
        <EndCard t={t} />
      </svg>
      {/* channel logo, top-right inside the safe zone */}
      {t < T.card + 0.3 && (
        <Img src={staticFile('seawater/stormi.png')} style={{position: 'absolute', left: 820, top: 262, width: 150, height: 150, opacity: 0.92}} />
      )}
      {/* sound */}
      <Sequence from={Math.round(VO_AT * FPS)} layout="none"><Audio src={staticFile('seawater/vo.wav')} /></Sequence>
      <Audio src={staticFile('seawater/music.wav')} volume={(f) => { const s = f / FPS; return s < T.card ? 0.075 : 0.075 + 0.25 * clamp((s - T.card) / 0.5); }} />
      <Audio src={staticFile('seawater/sfx/ocean.wav')} volume={(f) => 0.1 * (1 - clamp((f / FPS - T.card) / 0.5))} />
      {CUES.map((c, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(c.at * FPS))} layout="none">
          <Audio src={staticFile(`seawater/sfx/${c.f}.wav`)} volume={10 ** (c.db / 20)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
