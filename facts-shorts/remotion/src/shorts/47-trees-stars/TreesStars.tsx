import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SPACE = '#141A33', GREEN = '#3FA34D', GREEN2 = '#2E7D3A', TRUNK = '#7A5230';

const Tree: React.FC<{s?: number; sway?: number}> = ({s = 1, sway = 0}) => (
  <g transform={`scale(${s})`}>
    <rect x={-18} y={-20} width={36} height={90} fill={TRUNK} stroke={INK} strokeWidth={7} />
    <g transform={`rotate(${sway})`}>
      <path d="M 0 -230 L 95 -60 L -95 -60 Z" fill={GREEN} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 -160 L 115 10 L -115 10 Z" fill={GREEN2} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    </g>
  </g>
);

const Star: React.FC<{s?: number; fill?: string}> = ({s = 1, fill = '#FFE45C'}) => (
  <path transform={`scale(${s})`} d="M 0 -60 L 17 -20 L 60 -18 L 26 9 L 37 52 L 0 28 L -37 52 L -26 9 L -60 -18 L -17 -20 Z" fill={fill} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
);

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 60}).map((_, i) => <circle key={i} cx={(i * 397) % 1300 - 110} cy={(i * 613) % 2100 - 90} r={3 + (i % 3) * 2} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 2 + i)} />)}</g>
);

const Box: React.FC<{y: number; s: number; text: string; col?: string}> = ({y, s, text, col = INK}) => (
  <g transform={`translate(540 ${y}) scale(${s})`}>
    <rect x={-420} y={-85} width={840} height={150} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
    <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill={col}>{text}</text>
  </g>
);

export const TreesStars: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.counted - 0.25 ? 'intro' : t < T.Milky - 0.25 ? 'count' : t < T.several - 0.25 ? 'galaxy' : t < T.cut - 0.25 ? 'scale' : 'cut';
  const cues: Cue[] = [
    {f: 'pop', at: 0.3, db: -20}, {f: 'pop', at: 0.6, db: -20}, {f: 'ding', at: T.trees + 0.4, db: -20},
    {f: 'whoosh', at: T.counted - 0.25, db: -24}, {f: 'zap', at: T.satellites, db: -22}, {f: 'tick', at: T.satellites + 0.6, db: -22}, {f: 'ding', at: T.satellites + 1.6, db: -20},
    {f: 'whoosh', at: T.Milky - 0.25, db: -24}, {f: 'rise', at: T.Milky, db: -22},
    {f: 'whoosh', at: T.several - 0.25, db: -24}, {f: 'clink', at: T.several + 0.3, db: -18}, {f: 'boing', at: T.several + 0.8, db: -20},
    {f: 'whoosh', at: T.cut - 0.25, db: -24}, {f: 'knock', at: T.cut + 0.2, db: -14}, {f: 'knock', at: T.cut + 0.6, db: -14}, {f: 'creak', at: T.cut + 0.9, db: -18}, {f: 'rumble', at: T.cut + 1.5, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: '#BFE8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#BFE8FF" />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1250, 1], [T.counted - 0.3, 540, 1250, 1.08]])}>
              <rect x={-400} y={-400} width={940} height={2800} fill="#BFE8FF" />
              <rect x={540} y={-400} width={1000} height={2800} fill={SPACE} />
              <rect x={-400} y={1600} width={940} height={800} fill="#7CC576" stroke={INK} strokeWidth={LW} />
              {[[130, 1600, 0.9], [300, 1640, 1.0], [430, 1590, 0.8], [200, 1700, 1.1], [380, 1740, 0.95]].map(([x, y, s], i) => (
                <g key={i} transform={`translate(${x} ${y})`}><Tree s={s * pop(t, 0.2 + i * 0.12, 12, 6)} sway={3 * Math.sin(t * 2 + i)} /></g>
              ))}
              {[[680, 1250, 0.8], [900, 1330, 1], [760, 1450, 0.7], [960, 1600, 0.9], [700, 1750, 0.6]].map(([x, y, s], i) => (
                <g key={i} transform={`translate(${x} ${y}) rotate(${t * 20 + i * 30})`}><Star s={s * pop(t, 0.3 + i * 0.12, 12, 6)} /></g>
              ))}
              <path d="M 540 900 L 540 1900" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(540 1250) scale(${pop(t, T.trees + 0.3, 12, 6)})`}>
                <circle r={90} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={110} fill="#fff">&gt;</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={90} s={pop(t, 0.1, 12, 6)} color="#fff">MORE TREES</Label>
            <Label x={540} y={760} size={59} s={pop(t, T.trees, 12, 6)} color="#FFE45C">THAN STARS IN OUR GALAXY</Label>
          </g>
        )}

        {scene === 'count' && (() => {
          const a = (t - T.counted) * 0.9;
          const n = Math.round(3000 * prog(t, T.satellites, T.Milky - 0.6));
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SPACE} />
              <Stars t={t} />
              <Layer cam={keys(t, [[T.counted - 0.25, 540, 1250, 1], [T.Milky - 0.3, 540, 1250, 1.04]])}>
                <g transform="translate(540 1600) scale(0.78) translate(-540 -1500)">
                <circle cx={540} cy={1500} r={480} fill="#4FA3E0" stroke={INK} strokeWidth={LW} />
                {[[420, 1330], [640, 1420], [480, 1600], [700, 1650]].map(([x, y], i) => (
                  <g key={i}><ellipse cx={x} cy={y} rx={120} ry={80} fill="#5DB55A" stroke={INK} strokeWidth={7} />
                    {[0, 1, 2].map((j) => <g key={j} transform={`translate(${x - 50 + j * 50} ${y + 10}) scale(${0.22 * pop(t, T.satellites + 0.3 + (i * 3 + j) * 0.08, 12, 6)})`}><Tree /></g>)}</g>
                ))}
                <g transform={`translate(${540 + 520 * Math.cos(a - 2.4)} ${1500 + 520 * Math.sin(a - 2.4)}) rotate(${(a - 2.4) * 57 + 90})`}>
                  <rect x={-40} y={-30} width={80} height={60} fill="#C9D3DE" stroke={INK} strokeWidth={6} />
                  <rect x={-150} y={-20} width={100} height={40} fill="#2C7BE5" stroke={INK} strokeWidth={6} />
                  <rect x={50} y={-20} width={100} height={40} fill="#2C7BE5" stroke={INK} strokeWidth={6} />
                  {t > T.satellites && <path d="M -30 30 L -120 260 L 120 260 L 30 30 Z" fill="#FFE45C" opacity={0.35} />}
                </g>
              </g>
              </Layer>
              <Box y={1800} s={pop(t, T.satellites + 0.2, 12, 6)} text={`${(n / 1000).toFixed(1)} TRILLION TREES`} col={GREEN2} />
              <Label x={540} y={640} size={79} s={pop(t, T.counted, 12, 6)} color="#fff">COUNTED FROM SPACE</Label>
            </g>
          );
        })()}

        {scene === 'galaxy' && (() => {
          const n = Math.round(400 * prog(t, T.Milky + 0.3, T.several - 0.6));
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SPACE} />
              <Stars t={t} />
              <Layer cam={keys(t, [[T.Milky - 0.25, 540, 1250, 0.9], [T.several - 0.3, 540, 1250, 1.05]])}>
                <g transform={`translate(540 1250) rotate(${t * 18}) scale(1, 0.75)`}>
                  {[0, 1].map((arm) => Array.from({length: 40}).map((_, i) => {
                    const r = 30 + i * 11, an = arm * Math.PI + i * 0.16;
                    return <circle key={`${arm}${i}`} cx={r * Math.cos(an)} cy={r * Math.sin(an)} r={14 - i * 0.2} fill={i % 3 ? '#C9B8FF' : '#fff'} opacity={0.9} />;
                  }))}
                  <circle r={70} fill="#FFF3B0" opacity={0.9} />
                </g>
              </Layer>
              <Box y={1800} s={pop(t, T.Milky + 0.3, 12, 6)} text={`100-${Math.max(100, n)} BILLION`} col="#7A4DC8" />
              <Label x={540} y={640} size={90} s={pop(t, T.Milky, 12, 6)} color="#fff">THE MILKY WAY</Label>
            </g>
          );
        })()}

        {scene === 'scale' && (() => {
          const tip = 14 * prog(t, T.several + 0.3, T.several + 1.0);
          return (
            <g>
              <Layer cam={keys(t, [[T.several - 0.25, 540, 1130, 1], [T.cut - 0.3, 540, 1140, 1.05]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill="#7CC576" stroke={INK} strokeWidth={LW} />
                <path d="M 540 1700 L 540 1250" stroke={INK} strokeWidth={24} />
                <path d="M 460 1700 L 620 1700" stroke={INK} strokeWidth={24} strokeLinecap="round" />
                <g transform={`translate(540 1250) rotate(${tip})`}>
                  <rect x={-420} y={-14} width={840} height={28} rx={14} fill="#C98A3A" stroke={INK} strokeWidth={7} />
                  <g transform="translate(-330 0)">
                    <path d="M -140 120 L 140 120 L 100 160 L -100 160 Z" fill="#C9D3DE" stroke={INK} strokeWidth={7} />
                    <path d="M -120 120 L 0 0 L 120 120" stroke={INK} strokeWidth={5} fill="none" />
                    <g transform={`translate(0 ${60 - 10 * Math.sin(t * 4)}) rotate(${-tip}) rotate(${t * 40})`}><Star s={0.9} /></g>
                  </g>
                  <g transform="translate(330 0)">
                    <path d="M -140 120 L 140 120 L 100 160 L -100 160 Z" fill="#C9D3DE" stroke={INK} strokeWidth={7} />
                    <path d="M -120 120 L 0 0 L 120 120" stroke={INK} strokeWidth={5} fill="none" />
                    {[[-90, 120], [-30, 120], [30, 120], [90, 120], [-60, 50], [0, 50], [60, 50]].map(([x, y], i) => (
                      <g key={i} transform={`translate(${x} ${y - 300 * (1 - pop(t, T.several + i * 0.1, 10, 6))}) rotate(${-tip}) scale(0.32)`}><Tree /></g>
                    ))}
                  </g>
                </g>
              </Layer>
              <Label x={540} y={640} size={88} s={pop(t, T.several, 12, 6)} color="#fff">SEVERAL TREES</Label>
              <Sticker t={t} t0={T.several + 0.6} x={540} y={790} text="FOR EVERY SINGLE STAR" size={52} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'cut' && (() => {
          const hit = Math.floor(clampN((t - T.cut) / 0.4));
          const swing = t > T.cut && t < T.cut + 0.9 ? Math.abs(Math.sin((t - T.cut) * Math.PI / 0.4)) : 0;
          const fall = prog(t, T.cut + 0.9, T.cut + 1.6, (u) => u * u);
          const [sx, sy] = shake(t, t > T.cut + 1.5 && t < T.cut + 2.1 ? 12 : 0);
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <Layer cam={keys(t, [[T.cut - 0.25, 540, 1300, 1], [T.card, 540, 1300, 1.08]])}>
                <rect x={-400} y={1650} width={1900} height={800} fill="#7CC576" stroke={INK} strokeWidth={LW} />
                {[120, 960].map((x, i) => <g key={x} transform={`translate(${x} 1640)`}><Tree s={0.8} sway={3 * Math.sin(t * 2 + i)} /></g>)}
                <rect x={500} y={1590} width={80} height={60} fill={TRUNK} stroke={INK} strokeWidth={7} />
                <g transform={`translate(540 1600) rotate(${90 * fall})`}><g transform="translate(0 -40)"><Tree s={1.5} /></g></g>
                <g transform={`translate(330 1520) rotate(${-50 + 60 * swing})`}>
                  <rect x={-12} y={-240} width={24} height={260} rx={10} fill="#A86A33" stroke={INK} strokeWidth={6} />
                  <path d="M 10 -240 L 110 -260 L 110 -170 L 10 -190 Z" fill="#C9D3DE" stroke={INK} strokeWidth={6} />
                </g>
                {hit >= 0 && t > T.cut && t < T.cut + 1 && <circle cx={500} cy={1610} r={30 + 40 * ((t - T.cut) % 0.4)} fill="none" stroke="#fff" strokeWidth={8} opacity={0.8} />}
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, T.cut, 12, 6)} color="#fff">YET WE CUT DOWN</Label>
              <Sticker t={t} t0={T.cut + 0.6} x={540} y={790} text="BILLIONS EVERY YEAR" size={58} fill="#E5414A" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="47-trees-stars" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};

const clampN = (x: number) => Math.max(0, x);
