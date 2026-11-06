import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const WATER = '#9FD8F0', FISH = '#F28C28', FISH2 = '#FFB25C', BG = '#E9F6FB';

const Fish: React.FC<{t: number; flip?: boolean}> = ({t, flip}) => (
  <g transform={flip ? 'scale(-1 1)' : undefined}>
    <path d={`M -70 0 L -130 ${-45 + 8 * Math.sin(t * 10)} L -130 ${45 + 8 * Math.sin(t * 10)} Z`} fill={FISH2} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <ellipse rx={90} ry={60} fill={FISH} stroke={INK} strokeWidth={LW} />
    <path d="M -10 -58 Q 10 -95 40 -55" fill={FISH2} stroke={INK} strokeWidth={6} />
    <circle cx={45} cy={-12} r={16} fill="#fff" stroke={INK} strokeWidth={5} />
    <circle cx={50} cy={-12} r={7} fill={INK} />
    <path d="M 75 15 Q 85 22 78 30" stroke={INK} strokeWidth={5} fill="none" />
  </g>
);

const Bowl: React.FC = () => (
  <g>
    <path d="M -300 -250 Q -420 50 -220 260 L 220 260 Q 420 50 300 -250 Z" fill={WATER} stroke={INK} strokeWidth={LW} opacity={0.9} />
    <ellipse cx={0} cy={-250} rx={300} ry={40} fill="#C9EEFA" stroke={INK} strokeWidth={LW} />
    <rect x={-160} y={230} width={320} height={40} rx={10} fill="#B5835A" stroke={INK} strokeWidth={6} />
  </g>
);

// maze path points (world coords)
const MAZE: [number, number][] = [[220, 1250], [220, 1450], [540, 1450], [540, 1250], [860, 1250], [860, 1650], [540, 1650], [540, 1800]];
const along = (p: number): [number, number, number] => {
  const segs = MAZE.length - 1, f = Math.min(p, 0.9999) * segs, i = Math.floor(f), k = f - i;
  const [x1, y1] = MAZE[i], [x2, y2] = MAZE[i + 1];
  return [lerp(x1, x2, k), lerp(y1, y2, k), Math.atan2(y2 - y1, x2 - x1)];
};

export const GoldfishMemory: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const TM = T.maze - 1.0;
  const scene = t < T.myth - 0.25 ? 'intro' : t < T.months - 0.25 ? 'myth' : t < T.levers - 0.25 ? 'months' : t < TM - 0.25 ? 'levers' : 'maze';
  const cues: Cue[] = [
    {f: 'plop', at: 0.2, db: -18}, {f: 'tick', at: 0.8, db: -20}, {f: 'tick', at: 1.3, db: -20}, {f: 'tick', at: 1.8, db: -20},
    {f: 'whoosh', at: T.myth - 0.25, db: -24}, {f: 'crack', at: T.myth + 0.1, db: -16},
    {f: 'whoosh', at: T.months - 0.25, db: -24}, ...Array.from({length: 6}).map((_, i) => ({f: 'tick', at: T.months + 0.2 + i * 0.15, db: -22})), {f: 'ding', at: T.months + 1.2, db: -18},
    {f: 'whoosh', at: T.levers - 0.25, db: -24}, {f: 'knock', at: T.levers + 0.5, db: -18}, {f: 'plop', at: T.levers + 0.9, db: -18}, {f: 'slurp', at: T.levers + 1.4, db: -20},
    {f: 'whoosh', at: TM - 0.25, db: -24}, {f: 'splash', at: TM + 0.2, db: -22}, {f: 'ding', at: T.card - 0.4, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (() => {
          const s = Math.max(0, 3 - Math.floor((t - 0.5) / 0.5));
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1070, 1.05], [T.myth - 0.3, 540, 1070, 1]])}>
                <g transform="translate(540 1500)"><Bowl /></g>
                <g transform={`translate(${540 + 120 * Math.sin(t * 1.5)} ${1500 + 30 * Math.sin(t * 3)})`}><Fish t={t} flip={Math.cos(t * 1.5) < 0} /></g>
                <g transform={`translate(540 1880) scale(${pop(t, 0.4, 12, 6)})`}>
                  <rect x={-200} y={-55} width={400} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill="#E5414A">{`${t < 0.5 ? 3 : s} SEC?`}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, 0.1, 12, 6)} color="#fff">GOLDFISH MEMORY</Label>
              <Sticker t={t} t0={0.5} x={540} y={790} text="ONLY 3 SECONDS?" size={66} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'myth' && (
          <g>
            <Layer cam={keys(t, [[T.myth - 0.25, 540, 1070, 1], [T.months - 0.3, 540, 1070, 1.06]])}>
              <g transform="translate(540 1500)"><Bowl /></g>
              <g transform={`translate(540 1500)`}><Fish t={t} /></g>
              <g transform={`translate(540 1450) rotate(-12) scale(${lerp(2, 1, prog(t, T.myth, T.myth + 0.2)) * (t > T.myth ? 1 : 0)})`}>
                <rect x={-260} y={-90} width={520} height={170} rx={20} fill="none" stroke="#E5414A" strokeWidth={16} />
                <text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={130} fill="#E5414A">MYTH</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={76} s={pop(t, T.myth, 12, 6)} color="#fff">TOTALLY FALSE</Label>
            <Sticker t={t} t0={T.myth + 0.4} x={540} y={790} text="THEY REMEMBER WAY MORE" size={52} fill="#2FA35A" />
          </g>
        )}

        {scene === 'months' && (() => {
          const n = Math.min(5, Math.floor((t - T.months - 0.1) / 0.15) + 1);
          const names = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
          return (
            <g>
              <Layer cam={keys(t, [[T.months - 0.25, 540, 1070, 1], [T.levers - 0.3, 540, 1070, 1.05]])}>
                <g transform="translate(540 1350)">
                  <rect x={-260} y={-200} width={520} height={400} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <rect x={-260} y={-200} width={520} height={110} rx={30} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                  <text y={-120} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff">{names[Math.max(0, n)]}</text>
                  <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={150} fill={INK}>{Math.max(1, n + 1)}</text>
                </g>
                <g transform="translate(540 1780) scale(0.8)"><Fish t={t} /></g>
                <text x={540} y={1930} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.months + 1.0, 12, 6)}>STILL KNOWS!</text>
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.months, 12, 6)} color="#fff">THEY REMEMBER FOR</Label>
              <Sticker t={t} t0={T.months + 0.3} x={540} y={790} text="MONTHS" size={80} fill="#2FA35A" />
            </g>
          );
        })()}

        {scene === 'levers' && (() => {
          const push = prog(t, T.levers + 0.3, T.levers + 0.5) * (1 - prog(t, T.levers + 0.7, T.levers + 0.9));
          const drop = prog(t, T.levers + 0.5, T.levers + 1.2);
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={WATER} />
              <Layer cam={keys(t, [[T.levers - 0.25, 540, 1070, 1], [TM - 0.3, 540, 1070, 1.05]])}>
                <rect x={-400} y={1800} width={1900} height={700} fill="#E8D2A0" stroke={INK} strokeWidth={LW} />
                <rect x={700} y={1500} width={60} height={300} fill="#8A8A9A" stroke={INK} strokeWidth={6} />
                <g transform={`translate(730 1520) rotate(${-25 + 40 * push})`}><rect x={-12} y={-180} width={24} height={180} fill="#5A5A6E" stroke={INK} strokeWidth={5} /><circle cy={-180} r={30} fill="#E5414A" stroke={INK} strokeWidth={6} /></g>
                <g transform={`translate(${lerp(380, 520, push)} 1550)`}><Fish t={t} /></g>
                {[0, 1, 2].map((i) => <circle key={i} cx={560 + i * 30} cy={lerp(1150, 1420 + i * 10, drop)} r={14} fill="#B5835A" stroke={INK} strokeWidth={4} opacity={drop > 0 ? 1 : 0} />)}
                <g transform="translate(560 1100)"><rect x={-60} y={-40} width={120} height={60} fill="#fff" stroke={INK} strokeWidth={6} /><text y={8} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={32} fill={INK}>FOOD</text></g>
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.levers, 12, 6)} color="#fff">TRAINED TO PUSH</Label>
              <Sticker t={t} t0={T.levers + 0.3} x={540} y={790} text="LEVERS FOR FOOD" size={64} fill={FISH} />
            </g>
          );
        })()}

        {scene === 'maze' && (() => {
          const [fx, fy, a] = along(prog(t, TM + 0.2, T.card - 0.4));
          return (
            <g>
              <Layer cam={keys(t, [[TM - 0.25, 540, 1170, 0.95], [T.card, 540, 1170, 1.0]])}>
                <rect x={80} y={1130} width={920} height={790} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                <path d={`M ${MAZE.map(([x, y]) => `${x} ${y}`).join(' L ')}`} stroke={WATER} strokeWidth={130} fill="none" strokeLinejoin="round" />
                <path d={`M 380 1130 L 380 1350 M 700 1350 L 700 1560 M 380 1550 L 700 1550 M 80 1550 L 380 1550 M 700 1130 L 700 1150 M 1000 1750 L 700 1750 M 380 1750 L 380 1920`} stroke={INK} strokeWidth={LW} />
                <g transform={`translate(${fx} ${fy}) rotate(${(a * 180) / Math.PI}) scale(0.55)`}><Fish t={t} /></g>
                <text x={540} y={1890} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={46} fill="#2FA35A" opacity={pop(t, T.card - 0.4, 12, 6)}>EXIT!</text>
              </Layer>
              <Label x={540} y={640} size={66} s={pop(t, TM, 12, 6)} color="#fff">EVEN A TINY MAZE</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="80-goldfish-memory" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
