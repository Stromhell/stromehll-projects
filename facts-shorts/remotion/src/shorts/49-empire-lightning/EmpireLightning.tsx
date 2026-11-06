import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const NIGHT = '#1B2140', BLD = '#8C96B0', BLD2 = '#6D7794', BOLT = '#FFE45C';

const Bolt: React.FC<{x: number; y0: number; y1: number; k: number; seed?: number}> = ({x, y0, y1, k, seed = 0}) => {
  if (k <= 0) return null;
  const n = 7; let d = `M ${x + 40 * Math.sin(seed)} ${y0}`;
  for (let i = 1; i <= n; i++) d += ` L ${x + (i === n ? 0 : 60 * Math.sin(seed * 3 + i * 2.1))} ${lerp(y0, y1, i / n)}`;
  return (
    <g opacity={k}>
      <path d={d} stroke={BOLT} strokeWidth={34} fill="none" strokeLinejoin="round" opacity={0.35} />
      <path d={d} stroke="#fff" strokeWidth={12} fill="none" strokeLinejoin="round" />
    </g>
  );
};

const Clouds: React.FC<{t: number; y?: number}> = ({t, y = 380}) => (
  <g>{[-100, 220, 540, 860, 1180].map((x, i) => <ellipse key={x} cx={x + 20 * Math.sin(t + i)} cy={y + (i % 2) * 40} rx={240} ry={120} fill={i % 2 ? '#3A4268' : '#2E3558'} stroke={INK} strokeWidth={LW} />)}</g>
);

// Empire State Building, base at (0,0), top of spire at y ≈ -1280
const Empire: React.FC<{glow?: number}> = ({glow = 0}) => (
  <g>
    <rect x={-260} y={-300} width={520} height={300} fill={BLD2} stroke={INK} strokeWidth={LW} />
    <rect x={-190} y={-760} width={380} height={470} fill={BLD} stroke={INK} strokeWidth={LW} />
    <rect x={-130} y={-960} width={260} height={210} fill={BLD} stroke={INK} strokeWidth={LW} />
    <rect x={-80} y={-1060} width={160} height={110} fill={BLD2} stroke={INK} strokeWidth={LW} />
    <path d="M -40 -1060 L 0 -1160 L 40 -1060 Z" fill={BLD} stroke={INK} strokeWidth={LW} />
    <rect x={-8} y={-1280} width={16} height={130} fill={glow > 0 ? BOLT : '#C9D3DE'} stroke={INK} strokeWidth={6} />
    {Array.from({length: 8}).map((_, r) => [0, 1, 2, 3, 4].map((c) => <rect key={`${r}${c}`} x={-160 + c * 66} y={-730 + r * 56} width={36} height={30} fill="#FFE27A" opacity={(r * 5 + c) % 3 ? 0.85 : 0.3} />))}
  </g>
);

export const EmpireLightning: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Empire - 0.25 ? 'intro' : t < T.spire - 0.25 ? 'hits' : t < T.struck - 0.25 ? 'rod' : 'record';
  const flash = (at: number) => Math.max(0, 1 - Math.abs(t - at) / 0.12);
  const cues: Cue[] = [
    {f: 'rumble', at: 0.1, db: -20}, {f: 'zap', at: 0.6, db: -14}, {f: 'crack', at: 0.65, db: -16},
    {f: 'whoosh', at: T.Empire - 0.25, db: -24}, {f: 'zap', at: T.hit, db: -14}, {f: 'zap', at: T.hit + 0.7, db: -16}, {f: 'zap', at: T.hit + 1.4, db: -16}, {f: 'tick', at: T.hit + 0.2, db: -22},
    {f: 'whoosh', at: T.spire - 0.25, db: -24}, {f: 'zap', at: T.spire + 0.3, db: -14}, {f: 'rumble', at: T.ground, db: -18},
    {f: 'whoosh', at: T.struck - 0.25, db: -24}, ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({f: i % 2 ? 'crack' : 'zap', at: T.struck + 0.1 + i * 0.32, db: -16})), {f: 'ticktock', at: T.minutes, db: -22},
  ];
  const strikes = scene === 'intro' ? [0.6] : scene === 'hits' ? [T.hit, T.hit + 0.7, T.hit + 1.4, T.hit + 2.1] : scene === 'rod' ? [T.spire + 0.3] : [0, 1, 2, 3, 4, 5, 6, 7].map((i) => T.struck + 0.1 + i * 0.32);
  const fl = Math.max(...strikes.map(flash));
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={NIGHT} />
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#fff" opacity={0.25 * fl} />

        {scene === 'intro' && (() => {
          const [sx, sy] = shake(t, flash(0.6) * 10);
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <Layer cam={keys(t, [[0, 540, 1250, 1], [T.Empire - 0.3, 540, 1250, 1.08]])}>
                <Clouds t={t} y={820} />
                <rect x={-400} y={1700} width={1900} height={800} fill="#2E5A3A" stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 1700)">
                  <rect x={-25} y={-200} width={50} height={200} fill="#6B4A2E" stroke={INK} strokeWidth={7} />
                  <circle cx={0} cy={-280} r={130} fill={t > 0.65 ? '#3A3A3A' : '#3F8A4A'} stroke={INK} strokeWidth={LW} />
                  {t > 0.7 && [0, 1, 2].map((i) => <circle key={i} cx={-40 + i * 40} cy={-420 - 120 * ((t * 0.8 + i * 0.3) % 1)} r={30} fill="#777" opacity={0.6 * (1 - ((t * 0.8 + i * 0.3) % 1))} />)}
                </g>
                <Bolt x={540} y0={900} y1={1420} k={flash(0.6) * 3} seed={1} />
                <g transform={`translate(540 1250) scale(${pop(t, T.Lightning + 1.2, 12, 6)})`}>
                  <text textAnchor="middle" y={40} fontFamily={FONT} fontWeight={900} fontSize={150} fill="#E5414A" stroke={INK} strokeWidth={14} paintOrder="stroke">?</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={71} s={pop(t, T.Lightning, 12, 6)} color={BOLT}>NEVER STRIKES TWICE?</Label>
            </g>
          );
        })()}

        {scene === 'hits' && (() => {
          const n = Math.min(20, Math.round(20 * prog(t, T.hit, T.spire - 0.5)));
          return (
            <g>
              <Layer cam={keys(t, [[T.Empire - 0.25, 540, 1100, 0.95], [T.spire - 0.3, 540, 1100, 1.02]])}>
                <g transform="translate(540 1800) scale(0.55) translate(-540 -1800)">
                <Clouds t={t} y={480} />
                <rect x={-400} y={1800} width={1900} height={800} fill="#2B3148" stroke={INK} strokeWidth={LW} />
                {[[140, 380], [300, 520], [800, 460], [950, 340]].map(([x, h], i) => <rect key={i} x={x - 70} y={1800 - h} width={140} height={h} fill="#3A4466" stroke={INK} strokeWidth={7} />)}
                <g transform="translate(540 1800)"><Empire glow={fl} /></g>
                {strikes.map((s, i) => <Bolt key={i} x={540} y0={500} y1={520} k={0} />)}
                {strikes.map((s, i) => <Bolt key={`b${i}`} x={540} y0={520} y1={1800 - 1280} k={flash(s) * 3} seed={i + 2} />)}
              </g>
              </Layer>
              <Label x={540} y={640} size={68} s={pop(t, T.Empire, 12, 6)} color="#fff">EMPIRE STATE BUILDING</Label>
              <g transform={`translate(540 1790) scale(${pop(t, T.hit, 12, 6)})`}>
                <rect x={-380} y={-80} width={760} height={140} rx={28} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill={INK}>{`~${n} HITS A YEAR`}</text>
              </g>
            </g>
          );
        })()}

        {scene === 'rod' && (() => {
          const flow = t > T.spire + 0.3;
          return (
            <g>
              <Layer cam={keys(t, [[T.spire - 0.25, 540, 1250, 1.25], [T.ground - 0.2, 540, 1300, 1.0], [T.struck - 0.3, 540, 1320, 0.92]])}>
                <g transform="translate(540 2000) scale(0.6) translate(-540 -2000)">
                <Clouds t={t} y={380} />
                <rect x={-400} y={2000} width={1900} height={800} fill="#4A3524" stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 2000)"><Empire glow={flow ? 1 : 0} /></g>
                <Bolt x={540} y0={440} y1={720} k={flash(T.spire + 0.3) * 3} seed={7} />
                {flow && Array.from({length: 14}).map((_, i) => {
                  const a = ((t - T.spire) * 0.9 + i / 14) % 1;
                  return <circle key={i} cx={540 + 10 * Math.sin(i)} cy={lerp(720, 2060, a)} r={16} fill={BOLT} stroke={INK} strokeWidth={4} />;
                })}
                {t > T.ground && [0, 1, 2].map((i) => {
                  const a = ((t - T.ground) * 1.2 + i / 3) % 1;
                  return <ellipse key={i} cx={540} cy={2080} rx={80 + 400 * a} ry={20 + 60 * a} fill="none" stroke={BOLT} strokeWidth={8} opacity={1 - a} />;
                })}
              </g>
              </Layer>
              <Label x={540} y={640} size={68} s={pop(t, T.spire, 12, 6)} color="#fff">A GIANT LIGHTNING ROD</Label>
              <Sticker t={t} t0={T.ground} x={540} y={790} text="SAFELY INTO THE GROUND" size={52} fill="#2FA35A" />
            </g>
          );
        })()}

        {scene === 'record' && (() => {
          const hits = strikes.filter((s) => t > s).length;
          const mins = Math.round(24 * prog(t, T.struck, T.minutes + 0.6));
          return (
            <g>
              <Layer cam={keys(t, [[T.struck - 0.25, 540, 1250, 1], [T.card, 540, 1250, 1.08]])}>
                <Clouds t={t} y={820} />
                <rect x={-400} y={1850} width={1900} height={800} fill="#2B3148" stroke={INK} strokeWidth={LW} />
                <g transform="translate(330 1850) scale(0.5)"><Empire glow={fl} /></g>
                {strikes.map((s, i) => <Bolt key={i} x={330} y0={900} y1={1850 - 1280 * 0.62} k={flash(s) * 3} seed={i + 11} />)}
                <g transform="translate(790 1300)">
                  <circle r={170} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <path d={`M 0 0 L ${120 * Math.sin(mins / 60 * 2 * Math.PI)} ${-120 * Math.cos(mins / 60 * 2 * Math.PI)}`} stroke="#E5414A" strokeWidth={12} strokeLinecap="round" />
                  <path d={`M 0 -150 A 150 150 0 ${mins > 30 ? 1 : 0} 1 ${150 * Math.sin(mins / 60 * 2 * Math.PI)} ${-150 * Math.cos(mins / 60 * 2 * Math.PI)}`} stroke={BOLT} strokeWidth={16} fill="none" />
                  <circle r={14} fill={INK} />
                  <text y={260} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke">{`${mins} MIN`}</text>
                </g>
                <g transform="translate(790 1700)">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} transform={`translate(${(i % 4 - 1.5) * 70} ${Math.floor(i / 4) * 80}) scale(${i < hits ? pop(t, strikes[i], 14, 7) : 0})`} d="M 10 -35 L -15 5 L 5 5 L -10 35 L 20 -8 L 0 -8 Z" fill={BOLT} stroke={INK} strokeWidth={4} />)}
                </g>
              </Layer>
              <Label x={540} y={640} size={78} s={pop(t, T.struck, 12, 6)} color={BOLT}>{`STRUCK ${hits} TIMES`}</Label>
              <Sticker t={t} t0={T.minutes} x={540} y={790} text="IN JUST 24 MINUTES" size={58} fill="#E5414A" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="49-empire-lightning" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
