import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, SweatDrop, clamp, lerp, prog, pop, keys, easeOut} from '../../lib/cartoon';
import {W, H, FPS, Layer, Label, Sticker, Logo, EndCard, SoundTrack, Cue} from '../../lib/short';

const C = [540, 900];
const Web: React.FC<{t: number}> = ({t}) => {
  const spokes = 14, rings = 9;
  const pts = (r: number) => Array.from({length: spokes}).map((_, i) => { const a = (i / spokes) * Math.PI * 2; const wob = 1 + 0.04 * Math.sin(i * 2.3); return [Math.cos(a) * r * wob, Math.sin(a) * r * wob]; });
  return (
    <g>
      {pts(620).map(([x, y], i) => <path key={i} d={`M 0 0 L ${x} ${y}`} stroke="#fff" strokeWidth={5} />)}
      {Array.from({length: rings}).map((_, k) => {
        const r = 90 + k * 62; const p = pts(r);
        const d = p.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ') + ' Z';
        return (
          <g key={k}>
            <path d={d} stroke="#fff" strokeWidth={4} fill="none" />
            {p.map(([x, y], i) => { const [x2, y2] = p[(i + 1) % spokes]; return [0.33, 0.66].map((u, j) => <circle key={`${i}-${j}`} cx={lerp(x, x2, u)} cy={lerp(y, y2, u)} r={5} fill="#BFE9FF" />); })}
          </g>
        );
      })}
    </g>
  );
};

const Fly: React.FC<{t: number}> = ({t}) => (
  <g transform={`rotate(${8 * Math.sin(t * 20)})`}>
    {[-1, 1].map((s) => <ellipse key={s} cx={s * 40} cy={-40} rx={40} ry={22} fill="#E6F6FF" stroke={INK} strokeWidth={6} transform={`rotate(${s * (30 + 20 * Math.sin(t * 40))} ${s * 10} -20)`} />)}
    <ellipse cx={0} cy={0} rx={44} ry={56} fill="#3A4652" stroke={INK} strokeWidth={LW} />
    <circle cx={0} cy={-60} r={34} fill="#3A4652" stroke={INK} strokeWidth={LW} />
    <circle cx={-16} cy={-66} r={14} fill="#E5414A" stroke={INK} strokeWidth={5} /><circle cx={16} cy={-66} r={14} fill="#E5414A" stroke={INK} strokeWidth={5} />
    <path d="M -10 -44 q 10 6 20 0" stroke="#fff" strokeWidth={4} fill="none" />
    <SweatDrop x={40} y={-90 + 20 * ((t * 1.5) % 1)} s={0.45} />
  </g>
);

// spider seen from the front; legs drawn as two-segment noodles, phase = walking cycle
const Spider: React.FC<{t: number; phase: number; stuckLeg?: number; worried?: boolean; tiptoe?: number}> = ({t, phase, stuckLeg = 0, worried, tiptoe = 0}) => {
  const legs = [-1, 1].flatMap((s) => [0, 1, 2, 3].map((i) => ({s, i})));
  return (
    <g>
      {legs.map(({s, i}, k) => {
        const lift = (Math.sin(phase + i * 1.6 + (s > 0 ? 0.8 : 0)) * 0.5 + 0.5) * (1 - tiptoe * 0.6);
        const ang = (-40 + i * 32) * Math.PI / 180;
        const kx = s * (90 + 30 * Math.cos(ang)), ky = -40 + i * 26 - 50;
        let fx = s * (190 + 20 * i), fy = 60 + i * 30 - 30 * lift - (k === 7 ? -stuckLeg * 40 : 0);
        const d = `M ${s * 40} ${-10 + i * 10} Q ${kx} ${ky - 60} ${fx} ${fy}`;
        return (
          <g key={k}>
            <path d={d} stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d={d} stroke="#6B4A2E" strokeWidth={10} fill="none" strokeLinecap="round" />
          </g>
        );
      })}
      <ellipse cx={0} cy={60} rx={90} ry={100} fill="#6B4A2E" stroke={INK} strokeWidth={LW} />
      <path d="M -30 40 L 0 70 L 30 40 M -20 100 L 20 100" stroke="#C99A6B" strokeWidth={10} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={-40} r={70} fill="#7A5636" stroke={INK} strokeWidth={LW} />
      <circle cx={-26} cy={-50} r={22} fill="#fff" stroke={INK} strokeWidth={5} /><circle cx={26} cy={-50} r={22} fill="#fff" stroke={INK} strokeWidth={5} />
      <circle cx={-24} cy={-46} r={10} fill={INK} /><circle cx={28} cy={-46} r={10} fill={INK} />
      {[-44, -14, 14, 44].map((x, i) => <circle key={i} cx={x} cy={-86} r={6} fill={INK} />)}
      {worried
        ? <path d="M -20 -6 q 10 -8 20 0 q 10 8 20 0" stroke={INK} strokeWidth={5} fill="none" transform="translate(-10 0)" />
        : <path d="M -20 -10 Q 0 6 20 -10" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
      {worried && <SweatDrop x={60} y={-90 + 20 * ((t * 1.5) % 1)} s={0.5} />}
    </g>
  );
};

// leg close-up: shaft with branching hairs over a glue thread
const LegCloseUp: React.FC<{t: number; coat: number; washed: number; stuck: number}> = ({t, coat, washed, stuck}) => (
  <g>
    <path d="M -500 260 Q 0 230 500 260" stroke="#fff" strokeWidth={8} fill="none" />
    {Array.from({length: 7}).map((_, i) => <circle key={i} cx={-420 + i * 140} cy={250} r={26 + (i % 2) * 6} fill="#BFE9FF" stroke={INK} strokeWidth={5} />)}
    <g transform={`translate(0 ${-30 * (1 - stuck)})`}>
      <rect x={-460} y={-60} width={920} height={110} rx={55} fill="#6B4A2E" stroke={INK} strokeWidth={LW} />
      {Array.from({length: 12}).map((_, i) => {
        const x = -400 + i * 72;
        return (
          <g key={i} stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round">
            <path d={`M ${x} 40 L ${x + 30} 150 M ${x + 16} 96 L ${x + 52} 120 M ${x + 22} 120 L ${x - 6} 160`} />
            <circle cx={x + 30} cy={150} r={i % 3 === 1 ? 9 : 0} fill="#FFD84D" stroke="none" />
          </g>
        );
      })}
      {coat > 0.01 && Array.from({length: 6}).map((_, i) => {
        const a = (t * 1.8 + i / 6) % 1;
        return <path key={i} transform={`translate(${-380 + i * 150} ${-80 - a * 30}) scale(${coat * (1 - a)})`} d="M 0 -20 L 6 -6 L 20 0 L 6 6 L 0 20 L -6 6 L -20 0 L -6 -6 Z" fill="#fff" stroke={INK} strokeWidth={3} />;
      })}
      {washed > 0.01 && washed < 0.99 && Array.from({length: 10}).map((_, i) => <circle key={i} cx={-400 + i * 90} cy={-120 + washed * 200 + (i % 3) * 20} r={14} fill="#7FC8E8" stroke={INK} strokeWidth={4} />)}
    </g>
    {stuck > 0.01 && Array.from({length: 7}).map((_, i) => <path key={i} d={`M ${-420 + i * 140} 226 L ${-420 + i * 140} ${226 - 70 * stuck}`} stroke="#BFE9FF" strokeWidth={14 * stuck} strokeLinecap="round" />)}
  </g>
);

export const SpiderWeb: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const close = t > T.y2012 - 0.25 && t < T.carefully - 0.3;
  const cam = keys(t, [[0, 540, 960, 1.0], [T.stuck - 0.2, 540, 960, 1.0], [T.stuck + 0.3, 600, 980, 1.25], [T.y2012 - 0.3, 600, 980, 1.25], [T.carefully - 0.3, 540, 960, 1.0]]);
  const walk = t < T.y2012 ? t * 6 : (t - T.carefully) * 2.2;
  const sx = t < T.y2012 ? lerp(300, 620, prog(t, 0.2, T.y2012 - 0.3, (u) => u)) : lerp(620, 380, prog(t, T.carefully - 0.3, T.card, (u) => u));
  const coat = prog(t, T.coating - 0.1, T.coating + 0.3) * (1 - prog(t, T.washed, T.washed + 0.6));
  const washed = prog(t, T.washed - 0.05, T.washed + 0.6);
  const stuck = prog(t, T.much - 0.1, T.much + 0.4);
  const cues: Cue[] = [
    {f: 'zap', at: 0.3, db: -26}, {f: 'pop', at: T.flies, db: -20}, {f: 'boing', at: T.stuck, db: -22},
    {f: 'whoosh', at: T.y2012 - 0.25, db: -22}, {f: 'pop', at: T.y2012, db: -18}, {f: 'tick', at: T.branching, db: -20},
    {f: 'ding', at: T.tips + 0.2, db: -22}, {f: 'rise', at: T.coating, db: -24}, {f: 'splash', at: T.washed, db: -18},
    {f: 'squeeze', at: T.much, db: -18}, {f: 'squeeze', at: T.much + 0.6, db: -20}, {f: 'whoosh', at: T.carefully - 0.3, db: -24},
    {f: 'step', at: T.carefully + 0.2, db: -22}, {f: 'step', at: T.carefully + 0.7, db: -22}, {f: 'step', at: T.carefully + 1.2, db: -22},
    {f: 'ding', at: T.grip + 0.2, db: -22},
  ];
  return (
    <AbsoluteFill style={{background: '#20304A'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#253A5C" />
        <circle cx={640} cy={270} r={110} fill="#FFF3B0" stroke={INK} strokeWidth={LW} />
        {!close && (
          <Layer cam={cam}>
            <path d="M -200 120 Q 300 60 1300 90" stroke="#5A3A1C" strokeWidth={60} fill="none" />
            <path d="M -60 -200 L 80 1900" stroke="#5A3A1C" strokeWidth={70} />
            <g transform={`translate(${C[0]} ${C[1]})`}><Web t={t} /></g>
            <g transform={`translate(760 640) scale(0.9)`}><Fly t={t} /></g>
            <g transform={`translate(${sx} ${t < T.y2012 ? 1150 : 1150}) scale(1.1)`}>
              <Spider t={t} phase={walk} tiptoe={t > T.carefully - 0.3 ? 1 : 0} />
            </g>
          </Layer>
        )}
        {close && (
          <g>
            <rect width={W} height={H} fill="#2C4468" />
            <g transform={`translate(540 980) scale(${pop(t, T.y2012 - 0.25, 10, 6)})`}><LegCloseUp t={t} coat={coat} washed={washed} stuck={stuck} /></g>
            <g transform="translate(860 560) rotate(20)"><circle r={110} fill="none" stroke={INK} strokeWidth={22} /><circle r={110} fill="#BFE9FF" opacity={0.3} /><path d="M 80 80 L 170 170" stroke={INK} strokeWidth={34} strokeLinecap="round" /></g>
            <Sticker t={t} t0={T.y2012} t1={T.branching - 0.2} x={420} y={470} text="2012 · SMITHSONIAN" size={62} fill="#2C7BE5" />
            <Label x={540} y={1460} size={74} s={pop(t, T.branching, 12, 6) * (1 - prog(t, T.coating - 0.3, T.coating))} color="#FFE45C">ONLY THE TIPS TOUCH</Label>
            <Label x={540} y={1460} size={80} s={pop(t, T.coating, 12, 6) * (1 - prog(t, T.washed - 0.2, T.washed))} color="#7CF0B0">NON-STICK COATING</Label>
            <Label x={540} y={1460} size={80} s={pop(t, T.much, 12, 6)} color="#FF8A8A">WASHED = STUCK</Label>
          </g>
        )}
        {!close && <Label x={540} y={1560} size={96} s={pop(t, T.stuck, 12, 6) * (1 - prog(t, T.y2012 - 0.3, T.y2012))} color="#FFE45C">WHY NOT STUCK?</Label>}
        {!close && <Sticker t={t} t0={T.carefully} x={540} y={1600} text="TIPTOE MODE" size={96} fill="#4CC38A" />}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="09-spider-web" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
