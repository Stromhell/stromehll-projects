import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

const BG = '#E6ECF2', SILK = '#FFFFFF', STEEL = '#8C96A3';

const Spider: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s})`}>
    {[-1, 1].map((k) => [0, 1, 2, 3].map((i) => <path key={`${k}${i}`} d={`M ${k * 30} ${-10 + i * 12} Q ${k * (110 + i * 6)} ${-90 + i * 40 + 8 * Math.sin(t * 6 + i)} ${k * (150 + i * 8)} ${10 + i * 40}`} stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />))}
    <ellipse cx={0} cy={40} rx={60} ry={70} fill="#4A3524" stroke={INK} strokeWidth={LW} />
    <circle cx={0} cy={-30} r={42} fill="#5A4030" stroke={INK} strokeWidth={LW} />
    <circle cx={-14} cy={-36} r={10} fill="#fff" /><circle cx={14} cy={-36} r={10} fill="#fff" />
    <circle cx={-14} cy={-34} r={5} fill={INK} /><circle cx={14} cy={-34} r={5} fill={INK} />
  </g>
);

export const SpiderSilk: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Weight - 0.25 ? 'intro' : t < T.stretch - 0.25 ? 'weigh' : t < T.Darwin - 0.25 ? 'stretch' : 'river';
  const cues: Cue[] = [
    {f: 'creak', at: 0.3, db: -20}, {f: 'clink', at: 1.0, db: -18},
    {f: 'whoosh', at: T.Weight - 0.25, db: -24}, {f: 'creak', at: T.Weight + 0.4, db: -20}, {f: 'crack', at: T.Weight + 1.3, db: -16}, {f: 'ding', at: T.Kevlar + 0.2, db: -18},
    {f: 'whoosh', at: T.stretch - 0.25, db: -24}, {f: 'wobble', at: T.stretch + 0.2, db: -18},
    {f: 'whoosh', at: T.Darwin - 0.25, db: -24}, {f: 'ocean', at: T.Darwin, db: -26}, {f: 'rise', at: T.rivers, db: -22}, {f: 'ding', at: T.rivers + 1.0, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1070, 1.06], [T.Weight - 0.3, 540, 1070, 1]])}>
              <path d={`M 540 900 L 540 ${1300 + 20 * Math.sin(t * 2)}`} stroke={SILK} strokeWidth={6} />
              <g transform={`translate(540 ${1360 + 20 * Math.sin(t * 2)})`}><Spider t={t} s={1.4} /></g>
              <g transform={`translate(540 1780) scale(${pop(t, 0.8, 12, 6)})`}>
                <rect x={-300} y={-60} width={600} height={110} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={62} fill={INK}>SILK {'>'} STEEL</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={78} s={pop(t, 0.1, 12, 6)} color="#fff">SPIDER SILK BEATS</Label>
            <Sticker t={t} t0={0.6} x={540} y={790} text="STEEL" size={78} fill={STEEL} />
          </g>
        )}

        {scene === 'weigh' && (() => {
          const load = prog(t, T.Weight + 0.2, T.Weight + 1.3);
          const snap = t > T.Weight + 1.3;
          const kev = t > T.Kevlar - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.Weight - 0.25, 540, 1070, 1], [T.stretch - 0.3, 540, 1070, 1.05]])}>
                <rect x={80} y={1000} width={920} height={40} fill="#7A5534" stroke={INK} strokeWidth={LW} />
                {/* steel wire */}
                {!snap ? <path d={`M 330 1040 L 330 ${1300 + 60 * load}`} stroke={STEEL} strokeWidth={10} /> : <><path d="M 330 1040 L 330 1180" stroke={STEEL} strokeWidth={10} /><path d={`M 330 ${1260 + 1400 * prog(t, T.Weight + 1.3, T.Weight + 1.8, (u) => u * u)} L 330 ${1400 + 1400 * prog(t, T.Weight + 1.3, T.Weight + 1.8, (u) => u * u)}`} stroke={STEEL} strokeWidth={10} /></>}
                <g transform={`translate(330 ${snap ? 1400 + 1400 * prog(t, T.Weight + 1.3, T.Weight + 1.8, (u) => u * u) : 1300 + 60 * load})`}>
                  <rect x={-80} y={0} width={160} height={120} rx={14} fill="#3A3A48" stroke={INK} strokeWidth={LW} />
                  <text x={0} y={80} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill="#fff">KG</text>
                </g>
                <path d={`M 750 1040 L 750 ${1300 + 80 * load}`} stroke={SILK} strokeWidth={8} />
                <g transform={`translate(750 ${1300 + 80 * load})`}>
                  <rect x={-80} y={0} width={160} height={120} rx={14} fill="#3A3A48" stroke={INK} strokeWidth={LW} />
                  <text x={0} y={80} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill="#fff">KG</text>
                </g>
                <text x={330} y={1720} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill={INK}>STEEL</text>
                <text x={750} y={1720} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill={INK}>SILK</text>
                {kev && <g transform={`translate(540 1840) scale(${pop(t, T.Kevlar, 12, 6)})`}>
                  <rect x={-370} y={-55} width={740} height={100} rx={22} fill="#FFE45C" stroke={INK} strokeWidth={LW} />
                  <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill={INK}>TOUGHER THAN KEVLAR</text>
                </g>}
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.Weight, 12, 6)} color="#fff">WEIGHT FOR WEIGHT</Label>
              <Sticker t={t} t0={T.Weight + 0.4} x={540} y={790} text="SAME THICKNESS" size={58} fill={STEEL} />
            </g>
          );
        })()}

        {scene === 'stretch' && (() => {
          const u = 0.5 + 0.5 * Math.sin((t - T.stretch) * 4 - Math.PI / 2);
          return (
            <g>
              <Layer cam={keys(t, [[T.stretch - 0.25, 540, 1070, 1], [T.Darwin - 0.3, 540, 1070, 1.06]])}>
                <rect x={60} y={1150} width={60} height={500} fill="#7A5534" stroke={INK} strokeWidth={LW} />
                <rect x={960} y={1150} width={60} height={500} fill="#7A5534" stroke={INK} strokeWidth={LW} />
                <path d={`M 120 1300 Q 540 ${1300 + 380 * u} 960 1300`} stroke={SILK} strokeWidth={10} fill="none" />
                <g transform={`translate(540 ${1300 + 190 * u - 40})`}>
                  <circle r={46} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                  <path d="M -14 -10 L 14 -10 M -14 10 L 14 10" stroke={INK} strokeWidth={5} />
                </g>
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.stretch, 12, 6)} color="#fff">IT STRETCHES A LOT</Label>
              <Sticker t={t} t0={T.stretch + 0.4} x={540} y={790} text="BEFORE IT SNAPS" size={62} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'river' && (() => {
          const span = prog(t, T.Darwin + 0.8, T.rivers + 0.6, (u) => u);
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#CDEBC4" />
              <Layer cam={keys(t, [[T.Darwin - 0.25, 540, 1070, 1], [T.card, 540, 1070, 0.95]])}>
                <rect x={-400} y={1450} width={1900} height={1000} fill="#3E8FC4" />
                <path d={wavePath(t, 1450, 14, 200, 2)} fill="#3E8FC4" />
                <path d="M -400 1450 L 120 1450 L 160 1300 L -400 1300 Z" fill="#5DA858" stroke={INK} strokeWidth={LW} />
                <path d="M 1500 1450 L 960 1450 L 920 1300 L 1500 1300 Z" fill="#5DA858" stroke={INK} strokeWidth={LW} />
                <path d="M 100 1300 L 100 950 M 980 1300 L 980 950" stroke="#7A5534" strokeWidth={40} />
                <path d={`M 100 1000 L ${lerp(100, 980, span)} 1000`} stroke={SILK} strokeWidth={8} />
                {span >= 1 && [0, 1, 2, 3].map((i) => <path key={i} d={`M ${200 + i * 220} 1000 L ${300 + i * 200} 1180`} stroke={SILK} strokeWidth={5} />)}
                <g transform={`translate(${lerp(100, 980, span)} 1040) scale(0.75)`}><Spider t={t} /></g>
                <g transform={`translate(540 1700) scale(${pop(t, T.rivers + 1.0, 12, 6)})`}>
                  <rect x={-220} y={-55} width={440} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={INK}>UP TO 25 M</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={64} s={pop(t, T.Darwin, 12, 6)} color="#fff">DARWIN'S BARK SPIDER</Label>
              <Sticker t={t} t0={T.rivers} x={540} y={790} text="WEBS ACROSS RIVERS" size={58} fill="#2C7BE5" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="69-spider-silk" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
