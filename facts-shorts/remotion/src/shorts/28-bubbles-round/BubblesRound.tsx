import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, Cloud, Expr, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

// gentle caption pop (small overshoot so wide captions stay inside the frame)
const pk = (t: number, t0: number) => pop(t, t0, 10, 8);
const RAIN = ['#FF6FA5', '#FFB84D', '#FFE45C', '#6FDC8C', '#5CC8FF', '#A98BFF'];
type Mood = 'happy' | 'grin' | 'oo' | 'strain' | 'worried';

const arc = (r: number, a0: number, a1: number) => {
  const p = (a: number) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

// superellipse outline: n = 2 is a circle, bigger n is squarer; wob adds wobbly lumps
const blob = (r: number, n = 2, wob = 0, t = 0, sx = 1, sy = 1) => {
  let d = '';
  const e = 2 / n;
  for (let i = 0; i < 96; i++) {
    const a = (i / 96) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    const k = 1 + wob * (0.6 * Math.sin(3 * a + t * 5) + 0.4 * Math.sin(5 * a - t * 7));
    const x = r * sx * k * Math.sign(c) * Math.pow(Math.abs(c), e), y = r * sy * k * Math.sign(s) * Math.pow(Math.abs(s), e);
    d += `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d + 'Z';
};

const BubFace: React.FC<{r: number; mood: Mood; t: number; look?: [number, number]; y?: number}> = ({r, mood, t, look = [0, 0], y = 0}) => {
  const blink = (t + r * 0.013) % 3.3 < 0.12;
  const ex = 0.26 * r, ey = -0.1 * r + y, er = Math.max(4, 0.075 * r), sw = Math.max(3, r * 0.035);
  const [lx, ly] = look;
  const eyes = mood === 'strain'
    ? [-1, 1].map((sd) => <path key={sd} d={`M ${sd * ex - sd * er} ${ey - er} L ${sd * ex + sd * er * 0.4} ${ey} L ${sd * ex - sd * er} ${ey + er}`} stroke={INK} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />)
    : mood === 'grin'
      ? [-1, 1].map((sd) => <path key={sd} d={`M ${sd * ex - er} ${ey + er * 0.4} Q ${sd * ex} ${ey - er * 1.4} ${sd * ex + er} ${ey + er * 0.4}`} stroke={INK} strokeWidth={sw} fill="none" strokeLinecap="round" />)
      : [-1, 1].map((sd) => (
        <g key={sd}>
          <ellipse cx={sd * ex + lx} cy={ey + ly} rx={er} ry={blink ? er * 0.15 : er * (mood === 'oo' || mood === 'worried' ? 1.6 : 1.3)} fill={INK} />
          {!blink && <circle cx={sd * ex + lx + er * 0.35} cy={ey + ly - er * 0.5} r={er * 0.35} fill="#fff" />}
        </g>
      ));
  const my = 0.2 * r + y, mw = 0.2 * r;
  const mouth = mood === 'happy' ? <path d={`M ${-mw} ${my} Q 0 ${my + mw * 0.9} ${mw} ${my}`} stroke={INK} strokeWidth={sw} fill="none" strokeLinecap="round" />
    : mood === 'grin' ? <g><path d={`M ${-mw * 1.2} ${my - 4} Q 0 ${my + mw * 1.5} ${mw * 1.2} ${my - 4} Z`} fill={INK} /><ellipse cx={0} cy={my + mw * 0.45} rx={mw * 0.5} ry={mw * 0.22} fill="#F07A8A" /></g>
      : mood === 'oo' ? <ellipse cx={0} cy={my + mw * 0.2} rx={mw * 0.42} ry={mw * 0.55 + mw * 0.08 * Math.sin(t * 9)} fill={INK} />
        : mood === 'worried' ? <path d={`M ${-mw} ${my + mw * 0.4} Q 0 ${my - mw * 0.3} ${mw} ${my + mw * 0.4}`} stroke={INK} strokeWidth={sw} fill="none" strokeLinecap="round" />
          : <path d={`M ${-mw} ${my} q ${mw / 2} ${-mw * 0.35} ${mw} 0 q ${mw / 2} ${mw * 0.35} ${mw} 0`} stroke={INK} strokeWidth={sw} fill="none" strokeLinecap="round" />;
  return (
    <g>
      <ellipse cx={-0.42 * r} cy={0.1 * r + y} rx={0.1 * r} ry={0.06 * r} fill="#FF8FB0" opacity={0.55} />
      <ellipse cx={0.42 * r} cy={0.1 * r + y} rx={0.1 * r} ry={0.06 * r} fill="#FF8FB0" opacity={0.55} />
      {eyes}{mouth}
    </g>
  );
};

// soap bubble with rainbow shimmer; origin = centre
const Bub: React.FC<{id: string; t: number; r: number; n?: number; wob?: number; sx?: number; sy?: number; mood?: Mood | null; look?: [number, number]}> =
  ({id, t, r, n = 2, wob = 0, sx = 1, sy = 1, mood = 'happy', look}) => {
    const d = blob(r, n, wob, t, sx, sy);
    const R = r * Math.max(sx, sy);
    return (
      <g>
        <defs><clipPath id={id}><path d={d} /></clipPath></defs>
        <path d={d} fill="#DDF5FF" fillOpacity={0.55} />
        <g clipPath={`url(#${id})`}>
          {[0, 180].map((b) => (
            <g key={b} transform={`rotate(${t * 40 + b + r})`}>
              {RAIN.map((c, j) => <path key={j} d={arc(R * (0.97 - j * 0.055), -55, 35)} stroke={c} strokeWidth={r * 0.06} fill="none" opacity={0.75} />)}
            </g>
          ))}
        </g>
        <path d={arc(r * 0.72, 200, 245)} stroke="#fff" strokeWidth={r * 0.08} strokeLinecap="round" fill="none" opacity={0.95} />
        <circle cx={-r * 0.15} cy={-r * 0.74} r={r * 0.045} fill="#fff" />
        <path d={d} fill="none" stroke={INK} strokeWidth={r < 60 ? 6 : LW} strokeLinejoin="round" />
        {mood && <BubFace r={r} mood={mood} t={t} look={look} />}
      </g>
    );
  };

// a puff of air (cloud), optionally with a face
const Air: React.FC<{t: number; s?: number; squish?: number; face?: boolean}> = ({t, s = 1, squish = 0, face = true}) => (
  <g transform={`scale(${s * (1 + 0.1 * squish)} ${s * (1 - 0.14 * squish)}) rotate(${3 * Math.sin(t * 2)})`}>
    <Cloud s={1} />
    {face && <g><circle cx={-24} cy={2} r={7} fill={INK} /><circle cx={22} cy={2} r={7} fill={INK} /><path d="M -12 16 Q 0 26 12 16" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" /></g>}
  </g>
);

const SoapCube: React.FC<{t: number; s: number; mood?: Mood | null}> = ({t, s, mood}) => {
  const h = s / 2, d = s * 0.25;
  return (
    <g>
      <path d={`M ${-h} ${-h} L ${-h + d} ${-h - d} L ${h + d} ${-h - d} L ${h} ${-h} Z`} fill="#EAF9FF" fillOpacity={0.75} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M ${h} ${-h} L ${h + d} ${-h - d} L ${h + d} ${h - d} L ${h} ${h} Z`} fill="#BFE6FF" fillOpacity={0.75} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <rect x={-h} y={-h} width={s} height={s} fill="#DDF5FF" fillOpacity={0.45} />
      <path d={`M ${-h + 14} ${h - 34} L ${h - 34} ${-h + 14}`} stroke="#FF6FA5" strokeWidth={9} opacity={0.55} strokeLinecap="round" />
      <path d={`M ${-h + 30} ${h - 18} L ${h - 18} ${-h + 30}`} stroke="#5CC8FF" strokeWidth={9} opacity={0.55} strokeLinecap="round" />
      <path d={`M ${-h + 18} ${-h + 46} L ${-h + 18} ${-h + 18} L ${-h + 46} ${-h + 18}`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={-h} y={-h} width={s} height={s} fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {mood && <BubFace r={h * 1.05} mood={mood} t={t} />}
    </g>
  );
};

// origin = middle of the base
const SoapPyr: React.FC<{t: number; b: number; h: number; mood?: Mood | null}> = ({t, b, h, mood}) => (
  <g>
    <path d={`M ${-b / 2} 0 L ${b / 2} 0 L 0 ${-h} Z`} fill="#DDF5FF" fillOpacity={0.5} />
    <path d={`M 0 ${-h} L ${b * 0.16} 0`} stroke={INK} strokeWidth={6} opacity={0.5} />
    <path d={`M ${-b * 0.34} -26 L ${-b * 0.06} ${-h * 0.8}`} stroke="#FFB84D" strokeWidth={9} opacity={0.6} strokeLinecap="round" />
    <path d={`M ${-b * 0.26} -18 L ${b * 0.0} ${-h * 0.72}`} stroke="#A98BFF" strokeWidth={9} opacity={0.6} strokeLinecap="round" />
    <path d={`M ${-b / 2} 0 L ${b / 2} 0 L 0 ${-h} Z`} fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    {mood && <g transform={`translate(0 ${-h * 0.34})`}><BubFace r={b * 0.25} mood={mood} t={t} /></g>}
  </g>
);

const Wand: React.FC<{square?: boolean; rot?: number; glow?: number}> = ({square, rot = 0, glow = 0}) => (
  <g transform={`rotate(${rot})`}>
    <path d="M 0 14 L 0 -86" stroke={INK} strokeWidth={24} strokeLinecap="round" />
    <path d="M 0 14 L 0 -86" stroke="#FF6FA5" strokeWidth={11} strokeLinecap="round" />
    {square ? (
      <g>
        {glow > 0 && <rect x={-78} y={-219} width={156} height={156} rx={16} fill="none" stroke="#FFE45C" strokeWidth={10} strokeDasharray="22 14" opacity={glow} />}
        <rect x={-55} y={-196} width={110} height={110} rx={10} fill="#DDF5FF" fillOpacity={0.5} stroke={INK} strokeWidth={24} />
        <rect x={-55} y={-196} width={110} height={110} rx={10} fill="none" stroke="#FFB84D" strokeWidth={10} />
      </g>
    ) : (
      <g>
        <circle cx={0} cy={-141} r={55} fill="#DDF5FF" fillOpacity={0.5} stroke={INK} strokeWidth={24} />
        <circle cx={0} cy={-141} r={55} fill="none" stroke="#FFB84D" strokeWidth={10} />
      </g>
    )}
  </g>
);

const BgBubbles: React.FC<{t: number; col?: string}> = ({t, col = '#fff'}) => (
  <g>
    {Array.from({length: 12}).map((_, i) => {
      const y = 1900 - ((t * 70 + i * 160) % 1400);
      return <circle key={i} cx={((i * 233) % 1000) + 40 + 22 * Math.sin(t + i)} cy={y} r={14 + (i % 4) * 9} fill="none" stroke={col} strokeWidth={5} opacity={0.55 * clamp((y - 500) / 120)} />;
    })}
  </g>
);

const Sky: React.FC<{t: number}> = ({t}) => (
  <g>
    <defs><linearGradient id="sky28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7FCBFF" /><stop offset="1" stopColor="#D8F2FF" /></linearGradient></defs>
    <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="url(#sky28)" />
    {[0, 1].map((i) => <g key={i} transform={`translate(${((t * 25 + i * 560) % 1400) - 200} ${840 + i * 150})`}><Cloud s={0.8 - i * 0.15} /></g>)}
    <path d="M -400 1720 L 1480 1720 L 1480 2400 L -400 2400 Z" fill="#7CC960" stroke={INK} strokeWidth={LW} />
    {[120, 700, 860, 980].map((x, i) => (
      <g key={i} transform={`translate(${x} 1790) rotate(${6 * Math.sin(t * 2 + i)})`}>
        <path d="M 0 0 L 0 -40" stroke={INK} strokeWidth={6} />
        {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={14 * Math.cos((a * Math.PI) / 180)} cy={-48 + 14 * Math.sin((a * Math.PI) / 180)} r={10} fill={['#FF6FA5', '#FFE45C', '#A98BFF', '#fff'][i]} stroke={INK} strokeWidth={4} />)}
        <circle cx={0} cy={-48} r={8} fill="#FFB84D" stroke={INK} strokeWidth={4} />
      </g>
    ))}
  </g>
);

// guy standing at (GX, GY) scale GS; ring of the wand when held up sits at RING
const GX = 240, GY = 1720, GS = 1.4;
const RING: [number, number] = [GX + 240 * GS, GY + (-150 - 60 - 141) * GS];

const Puffs: React.FC<{t: number}> = ({t}) => (
  <g>
    {[0, 1, 2].map((i) => {
      const u = (t * 2.2 + i / 3) % 1;
      return <path key={i} d={`M ${RING[0] - 100 + 40 * u} ${RING[1] - 6 + (i - 1) * 16} l 22 0`} stroke="#fff" strokeWidth={7} strokeLinecap="round" opacity={1 - u} />;
    })}
  </g>
);

export const BubblesRound: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const wrapsT = lerp(T.pulls, T.least, 4 / 10), insideT = lerp(T.pulls, T.least, 7 / 10);
  const airT = lerp(T.least, T.sphere, 5 / 17), smallT = lerp(T.least, T.sphere, 13 / 17);
  const pyrT = lerp(T.cube, T.square, 3 / 15), moreT = lerp(T.cube, T.square, 6 / 15), medalT = lerp(T.cube, T.square, 7 / 15);
  const ballT = Math.min(T.ball, T.square + 1.1);
  const soT = lerp(T.cube, T.square, 8 / 15), blowT = lerp(T.cube, T.square, 12 / 15), stillT = lerp(T.square, ballT, 0.5);
  const scene = t < T.skin - 0.25 ? 'blow' : t < T.pulls - 0.25 ? 'skin' : t < T.least - 0.25 ? 'pull' : t < airT - 0.25 ? 'least'
    : t < T.sphere - 0.25 ? 'same' : t < soT - 0.25 ? 'contest' : 'wand';
  const cues: Cue[] = [
    {f: 'pop', at: 0.3, db: -20}, {f: 'boing', at: T.round, db: -22},
    {f: 'whoosh', at: T.skin - 0.25, db: -24}, {f: 'squeeze', at: T.skin, db: -22}, {f: 'wobble', at: T.shrink, db: -22},
    {f: 'whoosh', at: T.pulls - 0.25, db: -24}, {f: 'whoosh', at: T.least - 0.25, db: -24}, {f: 'ding', at: T.least + 1.1, db: -20},
    {f: 'whoosh', at: airT - 0.25, db: -24}, {f: 'tick', at: T.cube, db: -20}, {f: 'clink', at: medalT, db: -18},
    {f: 'whoosh', at: soT - 0.25, db: -24}, {f: 'wobble', at: T.square + 0.3, db: -22}, {f: 'pop', at: ballT - 0.1, db: -18},
  ];

  // ---------------------------------------------------------------- scene: blowing bubbles
  const blowScene = () => {
    const blowing = t > 0.2 && t < T.round + 1.6;
    const heroT0 = T.round + 0.3;
    const att = prog(t, heroT0, heroT0 + 1.0, (u) => u);
    const fly = prog(t, heroT0 + 1.0, T.skin - 0.7);
    const hr = lerp(lerp(10, 75, att), 200, fly);
    const hx = lerp(RING[0] + 55 + hr - 8, 700, fly), hy = lerp(RING[1], 1080, fly) + 10 * Math.sin(t * 2.4) * fly;
    return (
      <g>
        <Layer cam={keys(t, [[0, 540, 960, 1], [T.skin - 0.95, 540, 960, 1], [T.skin - 0.25, 700, 1040, 1.7]])}>
          <Sky t={t} />
          <g transform={`translate(${GX} ${GY}) scale(${GS})`}>
            <Guy t={t} expr={blowing ? 'hot' : 'hope'} stand handL={[-100, -110]} handR={[240, -150]} bendR={0.2} look={[10, -6]}
              blink={t % 3 < 0.12} handChildren={<Wand rot={0} />} />
          </g>
          {blowing && <Puffs t={t} />}
          {Array.from({length: 7}).map((_, i) => {
            const t0 = 0.25 + i * 0.3; const a = t - t0; if (a < 0) return null;
            const x = RING[0] + 40 + a * [-70, 40, 120][i % 3] + 30 * Math.sin(a * 2 + i), y = RING[1] - 60 - 250 * a - 20 * a * a;
            const r = Math.min(34 + ((i * 37) % 46), 18 + 90 * a);
            const op = clamp((y - 690) / 90) * clamp((800 - x) / 80);
            if (op <= 0) return null;
            return <g key={i} transform={`translate(${x} ${y})`} opacity={op}><Bub id={`b28s${i}`} t={t + i} r={r} wob={0.04} mood={i % 2 ? 'happy' : 'oo'} /></g>;
          })}
          {t > heroT0 && <g transform={`translate(${hx} ${hy})`}><Bub id="b28hero" t={t} r={hr} wob={0.05 * (1 - fly) + 0.015} mood={fly > 0.3 ? 'happy' : 'oo'} look={[-6, 0]} /></g>}
        </Layer>
        <Label x={540} y={640} size={84} s={pk(t, T.round) * (1 - prog(t, T.skin - 0.95, T.skin - 0.7))} color="#fff">WHY SO ROUND?</Label>
      </g>
    );
  };

  // ---------------------------------------------------------------- scene: stretchy skin
  const BX = 540, BY = 1130;
  const skinScene = () => {
    const grab = prog(t, T.skin - 0.25, T.skin) * (1 - prog(t, T.shrink - 0.45, T.shrink - 0.1));
    const st = 0.26 * prog(t, T.skin, T.skin + 0.5) * (1 - prog(t, T.shrink - 0.45, T.shrink - 0.25));
    const snap = t > T.shrink - 0.25 ? 0.07 * Math.exp(-4 * (t - T.shrink + 0.25)) : 0;
    const r = lerp(330, 285, prog(t, T.shrink, T.shrink + 0.7));
    const mood: Mood = st > 0.05 ? 'oo' : t > T.shrink - 0.25 && t < T.shrink + 1 ? 'strain' : 'happy';
    const hand = (sd: number) => {
      const hx = BX + sd * lerp(640, r * (1 + st) + 16, grab);
      return (
        <g key={sd}>
          <path d={`M ${sd > 0 ? 1200 : -120} ${BY + 60} Q ${hx + sd * 160} ${BY + 90} ${hx} ${BY}`} stroke={INK} strokeWidth={46} fill="none" strokeLinecap="round" />
          <path d={`M ${sd > 0 ? 1200 : -120} ${BY + 60} Q ${hx + sd * 160} ${BY + 90} ${hx} ${BY}`} stroke="#FFD2A8" strokeWidth={30} fill="none" strokeLinecap="round" />
          <circle cx={hx} cy={BY} r={38} fill="#fff" stroke={INK} strokeWidth={LW} />
          <ellipse cx={hx - sd * 26} cy={BY - 30} rx={14} ry={20} fill="#fff" stroke={INK} strokeWidth={7} />
        </g>
      );
    };
    return (
      <g>
        <rect width={W} height={H} fill="#FFE3F1" />
        <circle cx={540} cy={1130} r={620} fill="#FFD1E8" />
        <BgBubbles t={t} />
        <g transform={`translate(${BX} ${BY})`}><Bub id="b28skin" t={t} r={r} sx={1 + st} sy={1 - 0.45 * st} wob={snap + 0.012} mood={mood} /></g>
        {[-1, 1].map(hand)}
        <Label x={540} y={640} size={84} s={pk(t, T.skin)} color="#FFE45C">STRETCHY SKIN</Label>
        <Sticker t={t} t0={T.shrink} x={540} y={1690} text="ALWAYS SHRINKING" size={66} fill="#E5414A" />
      </g>
    );
  };

  // ---------------------------------------------------------------- scene: surface tension pulls inward
  const pullScene = () => {
    const r = lerp(285, 215, prog(t, wrapsT, wrapsT + 0.8)) * (1 - 0.02 * Math.sin(t * 7));
    const sq = clamp(1 - Math.abs(t - insideT - 0.2) * 3);
    return (
      <g>
        <rect width={W} height={H} fill="#E7E0FF" />
        <circle cx={540} cy={1130} r={620} fill="#D8CCFF" />
        <BgBubbles t={t} />
        <g transform={`translate(${BX} ${BY})`}>
          {t > wrapsT - 0.3 && <g transform={`scale(${pop(t, wrapsT - 0.3, 10, 6)})`}><Air t={t} s={1.25} squish={sq} /></g>}
          <Bub id="b28pull" t={t} r={r} wob={0.02 * Math.sin(t * 3)} mood="strain" />
          {Array.from({length: 10}).map((_, i) => {
            const k = pop(t, T.pulls - 0.15 + i * 0.05, 10, 7); if (k <= 0.01) return null;
            const tip = r + 34 + 16 * Math.abs(Math.sin(t * 5 + i)), tail = tip + 100;
            return (
              <g key={i} transform={`rotate(${i * 36 + 18 + t * 8}) scale(${k})`}>
                <path d={`M ${tip} 0 L ${tip + 46} -32 L ${tip + 46} -13 L ${tail} -13 L ${tail} 13 L ${tip + 46} 13 L ${tip + 46} 32 Z`} fill="#E5414A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
              </g>
            );
          })}
        </g>
        <Label x={540} y={640} size={78} s={pk(t, T.pulls - 0.1)} color="#fff">SURFACE TENSION</Label>
        <Sticker t={t} t0={wrapsT} x={540} y={1700} text="WRAPS THE AIR" size={70} fill="#2C7BE5" />
      </g>
    );
  };

  // ---------------------------------------------------------------- scene: least skin possible
  const leastScene = () => {
    const wob = 0.16 * (1 - prog(t, T.least - 0.1, T.least + 1.1));
    const done = pop(t, T.least + 1.1, 10, 6);
    const used = clamp(0.62 + 2.3 * wob);
    return (
      <g>
        <rect width={W} height={H} fill="#DDF7E8" />
        <circle cx={540} cy={1130} r={620} fill="#C6F0D8" />
        <BgBubbles t={t} />
        <g transform={`translate(${BX} ${BY})`}>
          <Air t={t} s={1.25} />
          <Bub id="b28least" t={t} r={215} wob={wob} mood={done > 0.2 ? 'grin' : 'strain'} />
          {Array.from({length: 8}).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45 + t * 20}) translate(${300 + 20 * Math.sin(t * 4 + i)} 0) scale(${done})`}>
              <path d="M 0 -22 L 6 -6 L 22 0 L 6 6 L 0 22 L -6 6 L -22 0 L -6 -6 Z" fill="#FFE45C" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            </g>
          ))}
        </g>
        <Label x={540} y={640} size={64} s={pk(t, T.least)} color="#fff">LEAST SKIN POSSIBLE</Label>
        <g opacity={prog(t, T.least - 0.2, T.least + 0.1)}>
          <Label x={540} y={1585} size={50} color="#FFE45C">FILM USED</Label>
          <rect x={240} y={1620} width={600} height={56} rx={28} fill="#fff" stroke={INK} strokeWidth={LW} />
          <rect x={248} y={1628} width={584 * used} height={40} rx={20} fill="#5CC8FF" />
        </g>
      </g>
    );
  };

  // ---------------------------------------------------------------- scenes: same air contest + podium
  const XS = [190, 520, 860];
  const shapesScene = (contest: boolean) => {
    const mv = contest ? prog(t, T.sphere - 0.25, T.sphere + 0.25) : 0;
    const hop = 140 * Math.sin(mv * Math.PI);
    const bases = [lerp(1420, 1560, mv), lerp(1420, 1460, mv), lerp(1420, 1630, mv)].map((b) => b - hop);
    const shell = [pop(t, airT + 1.1, 10, 6), pop(t, airT + 0.7, 10, 6), pop(t, airT + 1.5, 10, 6)].map((k) => (contest ? 1 : k));
    const faces = t > smallT;
    const won = t > T.sphere;
    const moodC: Mood | null = !faces ? null : t > moreT ? 'strain' : t > T.cube ? 'worried' : 'happy';
    const moodP: Mood | null = !faces ? null : t > moreT ? 'strain' : t > pyrT ? 'worried' : 'happy';
    const moodS: Mood | null = !faces ? null : won ? 'grin' : 'happy';
    const bob = (i: number) => 6 * Math.sin(t * 3 + i * 2);
    const meters: [number, number, number][] = [[0, 0.6, T.cube], [1, 0.48, T.sphere + 0.1], [2, 0.72, pyrT]];
    const medal = prog(t, medalT, medalT + 0.4, (u) => 1 - Math.pow(1 - u, 2));
    const pod = lerp(500, 0, mv);
    return (
      <g>
        <rect width={W} height={H} fill="#BDE3FF" />
        <g transform={`translate(540 1150) rotate(${t * 6})`} opacity={0.5}>
          {Array.from({length: 12}).map((_, i) => <path key={i} transform={`rotate(${i * 30})`} d="M 0 0 L 70 -1400 L -70 -1400 Z" fill="#D2EDFF" />)}
        </g>
        <BgBubbles t={t} />
        {/* table */}
        <g opacity={1 - mv}>
          <rect x={30} y={1420} width={1020} height={40} rx={10} fill="#C48A52" stroke={INK} strokeWidth={LW} />
          <path d="M 90 1460 L 90 1780 M 990 1460 L 990 1780" stroke={INK} strokeWidth={30} strokeLinecap="round" />
          <path d="M 90 1460 L 90 1780 M 990 1460 L 990 1780" stroke="#A86F3C" strokeWidth={14} strokeLinecap="round" />
        </g>
        {/* podium */}
        {contest && (
          <g transform={`translate(0 ${pod})`}>
            <path d={`M 0 ${1780 - pod} L 1080 ${1780 - pod} L 1080 1920 L 0 1920 Z`} fill="#7CC960" />
            {spot(t, mv)}
            {[[190, 280, 1560, '#C9D3DD', '2'], [520, 300, 1460, '#FFD84D', '1'], [860, 380, 1630, '#E2A06A', '3']].map(([x, w, top, c, n], i) => (
              <g key={i}>
                <rect x={(x as number) - (w as number) / 2} y={top as number} width={w as number} height={1800 - (top as number)} fill={c as string} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <Label x={x as number} y={(top as number) + 64} size={54} color="#fff">{n}</Label>
              </g>
            ))}
          </g>
        )}
        {/* contestants: cube, sphere, pyramid (same volume of air, true relative sizes) */}
        <g transform={`translate(${XS[0]} ${bases[0] - 88 + bob(0)})`}>
          <Air t={t} s={0.55} face={!faces} />
          <g transform={`scale(${shell[0]})`}><SoapCube t={t} s={177} mood={moodC} /></g>
        </g>
        <g transform={`translate(${XS[1]} ${bases[1] - 110 + bob(1)})`}>
          <Air t={t} s={0.55} face={!faces} />
          <g transform={`scale(${shell[1]})`}><Bub id="b28sph" t={t} r={110} mood={moodS} />
            {medal > 0 && (
              <g transform={`translate(0 ${lerp(-260, 0, medal)})`}>
                <path d="M -86 52 Q -40 84 0 86 Q 40 84 86 52" stroke={INK} strokeWidth={24} fill="none" strokeLinecap="round" />
                <path d="M -86 52 Q -40 84 0 86 Q 40 84 86 52" stroke="#E5414A" strokeWidth={11} fill="none" strokeLinecap="round" />
                <g transform="translate(0 6)"><circle cx={0} cy={72} r={30} fill="#FFD84D" stroke={INK} strokeWidth={7} />
                <path d="M 0 56 L 5 67 L 16 68 L 8 76 L 10 87 L 0 81 L -10 87 L -8 76 L -16 68 L -5 67 Z" fill="#FFB938" /></g>
              </g>
            )}
          </g>
        </g>
        <g transform={`translate(${XS[2]} ${bases[2] + bob(2)})`}>
          <g transform="translate(0 -101)"><Air t={t} s={0.55} face={!faces} /></g>
          <g transform={`scale(${shell[2]})`}><SoapPyr t={t} b={362} h={296} mood={moodP} /></g>
        </g>
        {/* film counters */}
        {contest && meters.map(([i, f, t0]) => {
          const k = pop(t, t0, 10, 7); if (k <= 0.01) return null;
          const fill = f * prog(t, t0, t0 + 0.6) + (i !== 1 ? 0.12 * prog(t, moreT, moreT + 0.5) : 0);
          return (
            <g key={i} transform={`translate(${XS[i]} 1170) scale(${k})`}>
              <rect x={-110} y={-22} width={220} height={44} rx={22} fill="#fff" stroke={INK} strokeWidth={7} />
              <rect x={-104} y={-16} width={208 * fill} height={32} rx={16} fill={i === 1 ? '#6FDC8C' : '#FF6FA5'} />
              {(i === 1 || t < moreT) && <Label x={0} y={-40} size={38} color="#fff">FILM</Label>}
            </g>
          );
        })}
        {contest && <Sticker t={t} t0={moreT} x={XS[0]} y={1095} text="MORE FILM" size={40} fill="#E5414A" rot={-4} />}
        {contest && <Sticker t={t} t0={moreT + 0.15} x={XS[2] - 20} y={1095} text="MORE FILM" size={40} fill="#E5414A" rot={4} />}
        {contest && t > medalT && Array.from({length: 18}).map((_, i) => {
          const a = t - medalT, y = 720 + a * (300 + (i % 5) * 60);
          if (y > 1700) return null;
          return <rect key={i} x={60 + ((i * 131) % 960) + 30 * Math.sin(a * 3 + i)} y={y} width={18} height={30} rx={4} fill={RAIN[i % 6]} stroke={INK} strokeWidth={3} transform={`rotate(${a * 200 + i * 40} ${60 + ((i * 131) % 960)} ${y})`} />;
        })}
        {!contest && <Label x={540} y={640} size={62} s={pk(t, airT)} color="#fff">SAME AMOUNT OF AIR</Label>}
        {!contest && <Sticker t={t} t0={smallT} x={540} y={1650} text="SMALLEST SURFACE?" size={62} fill="#5B3A8C" />}
        {contest && <Label x={540} y={640} size={84} s={pk(t, T.sphere)} color="#FFE45C">SPHERE WINS!</Label>}
        {contest && <Sticker t={t} t0={medalT + 0.1} x={540} y={1700} text="LEAST SKIN" size={76} fill="#2C7BE5" />}
      </g>
    );
  };
  const spot = (tt: number, mv: number) => (
    <path d={`M 470 700 L 570 700 L ${780 + 10 * Math.sin(tt * 2)} 1460 L ${260 + 10 * Math.sin(tt * 2)} 1460 Z`} fill="#FFF7C2" opacity={0.45 * mv} transform={`translate(0 ${-lerp(500, 0, mv)})`} />
  );

  // ---------------------------------------------------------------- scene: square wand still makes a ball
  const wandScene = () => {
    const dip = prog(t, soT - 0.15, soT + 0.35) * (1 - prog(t, soT + 0.8, soT + 1.2));
    const hand: [number, number] = [lerp(240, 330, dip), lerp(-150, -110, dip)];
    const blowing = t > blowT - 0.1 && t < T.square + 0.3;
    const g = prog(t, blowT, T.square + 0.2, (u) => u);
    const fly = prog(t, T.square + 0.2, T.square + 1.2);
    const u = prog(t, T.square + 0.3, ballT - 0.05);
    const br = lerp(lerp(8, 70, g), 180, fly);
    const bx = lerp(RING[0] + 55 + br * 0.9, 720, fly), by = lerp(RING[1], 1060, fly) + 10 * Math.sin(t * 2.2) * fly;
    const n = lerp(10, 2, u);
    const wob = u < 1 ? 0.05 * Math.sin(u * Math.PI) : 0;
    const round = pop(t, ballT - 0.1, 10, 6);
    const expr: Expr = blowing ? 'hot' : t > stillT ? 'happy' : t > T.square + 0.3 ? 'worried' : 'hope';
    const bmood: Mood = t > ballT - 0.15 ? 'grin' : t > T.square + 0.3 ? 'strain' : 'oo';
    return (
      <g>
        <Sky t={t} />
        <g transform={`translate(${GX} ${GY}) scale(${GS})`}>
          <Guy t={t} expr={expr} stand handL={t > stillT ? [-150, -320] : [-100, -110]} bendL={0.3} handR={hand} bendR={0.2}
            look={t > T.square ? [14, -10] : dip > 0.3 ? [12, 8] : [10, -4]} blink={t % 3 < 0.12}
            handChildren={<Wand square rot={180 * dip} glow={clamp(1 - Math.abs(t - T.square - 0.3) * 1.5)} />} />
        </g>
        {/* soap tray */}
        <g transform="translate(702 1712)">
          <path d="M -140 -20 L 140 -20 L 120 40 L -120 40 Z" fill="#FF6FA5" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
          <ellipse cx={0} cy={-20} rx={140} ry={22} fill="#9FDBFF" stroke={INK} strokeWidth={LW} />
          <circle cx={-40} cy={12} r={6} fill={INK} /><circle cx={40} cy={12} r={6} fill={INK} />
          <path d="M -16 22 Q 0 32 16 22" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
          {dip > 0.5 && [0, 1, 2].map((i) => <circle key={i} cx={-60 + i * 60} cy={-50 - ((t * 120 + i * 30) % 60)} r={10} fill="none" stroke="#fff" strokeWidth={4} />)}
        </g>
        {blowing && <Puffs t={t} />}
        {t > blowT && (
          <g transform={`translate(${bx} ${by})`}>
            <Bub id="b28sq" t={t} r={br} n={n} wob={wob} mood={bmood} look={[-8, 0]} />
            {round > 0.01 && Array.from({length: 8}).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45}) translate(${230 + 30 * round} 0) scale(${round})`}>
                <path d="M 0 -20 L 6 -6 L 20 0 L 6 6 L 0 20 L -6 6 L -20 0 L -6 -6 Z" fill="#FFE45C" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
              </g>
            ))}
          </g>
        )}
        {t > soT && t < T.square && <Label x={540} y={640} size={64} s={pk(t, soT + 0.2)} color="#fff">WHAT ABOUT A SQUARE?</Label>}
        {t < ballT && <Label x={540} y={640} size={86} s={pk(t, T.square)} color="#FFE45C">SQUARE WAND</Label>}
        <Sticker t={t} t0={ballT} x={540} y={640} text="STILL A BALL!" size={60} fill="#E5414A" rot={4} />
      </g>
    );
  };

  return (
    <AbsoluteFill style={{background: '#BFE6FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#BFE6FF" />
        {scene === 'blow' && blowScene()}
        {scene === 'skin' && skinScene()}
        {scene === 'pull' && pullScene()}
        {scene === 'least' && leastScene()}
        {scene === 'same' && shapesScene(false)}
        {scene === 'contest' && shapesScene(true)}
        {scene === 'wand' && wandScene()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="28-bubbles-round" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
