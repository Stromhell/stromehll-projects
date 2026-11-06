import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#FFE3D3', SKIN = '#F2C29B', SKIN2 = '#D9A47A', NAIL = '#FFE9EE';

// hand, fingers up, wrist at (0,0); grow extends the nails
const Hand: React.FC<{grow?: number; pencil?: boolean; glow?: number}> = ({grow = 0, pencil, glow = 0}) => (
  <g>
    <rect x={-120} y={-40} width={240} height={140} rx={30} fill={SKIN} stroke={INK} strokeWidth={LW} />
    <rect x={-150} y={-260} width={300} height={240} rx={70} fill={SKIN} stroke={INK} strokeWidth={LW} />
    {[-105, -35, 35, 105].map((x, i) => {
      const h = [180, 220, 210, 170][i], top = -240 - h;
      return (
        <g key={x}>
          <rect x={x - 32} y={top} width={64} height={h + 40} rx={32} fill={SKIN} stroke={INK} strokeWidth={LW} />
          <rect x={x - 22} y={top + 8 - 30 * grow} width={44} height={56 + 30 * grow} rx={16} fill={NAIL} stroke={INK} strokeWidth={5} />
          {glow > 0 && <rect x={x - 30} y={top - 30 * grow} width={60} height={70 + 30 * grow} rx={20} fill="none" stroke="#FFE45C" strokeWidth={8} opacity={glow} />}
        </g>
      );
    })}
    <g transform="translate(-150 -120) rotate(-40)">
      <rect x={-34} y={-150} width={68} height={170} rx={34} fill={SKIN} stroke={INK} strokeWidth={LW} />
      <rect x={-22} y={-140 - 30 * grow} width={44} height={50 + 30 * grow} rx={16} fill={NAIL} stroke={INK} strokeWidth={5} />
    </g>
    {pencil && <g transform="translate(60 -200) rotate(30)"><rect x={-18} y={-260} width={36} height={420} fill="#F7C94B" stroke={INK} strokeWidth={6} /><path d="M -18 160 L 0 210 L 18 160 Z" fill="#E8C49A" stroke={INK} strokeWidth={5} /></g>}
  </g>
);

// foot seen from above, toes up, heel at (0,0)
const Foot: React.FC<{grow?: number; snail?: boolean; t?: number}> = ({grow = 0, snail, t = 0}) => (
  <g>
    <ellipse cx={0} cy={-200} rx={160} ry={240} fill={SKIN} stroke={INK} strokeWidth={LW} />
    {[[-110, -400, 52], [-40, -440, 46], [25, -440, 42], [85, -420, 38], [135, -385, 32]].map(([x, y, r], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={r} fill={SKIN} stroke={INK} strokeWidth={LW} />
        <ellipse cx={x} cy={y - r * 0.35 - 10 * grow} rx={r * 0.55} ry={r * 0.4 + 10 * grow} fill={NAIL} stroke={INK} strokeWidth={4} />
      </g>
    ))}
    {snail && <g transform={`translate(${-110 + 20 * Math.sin(t)} -470) scale(0.5)`}>
      <ellipse cx={0} cy={20} rx={90} ry={26} fill="#C9B07A" stroke={INK} strokeWidth={7} />
      <circle cx={-10} cy={-30} r={60} fill="#E8A35A" stroke={INK} strokeWidth={7} />
      <path d="M 80 10 L 100 -40 M 70 10 L 80 -40" stroke={INK} strokeWidth={6} />
    </g>}
  </g>
);

const Box: React.FC<{y: number; s: number; text: string}> = ({y, s, text}) => (
  <g transform={`translate(540 ${y}) scale(${s})`}>
    <rect x={-330} y={-80} width={660} height={140} rx={28} fill="#fff" stroke={INK} strokeWidth={LW} />
    <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={66} fill={INK}>{text}</text>
  </g>
);

export const Fingernails: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.grows - 0.25 ? 'race' : t < T.toenail - 0.25 ? 'month' : t < T.blood - 0.25 ? 'toe' : t < T.writing - 0.25 ? 'blood' : 'writing';
  const cues: Cue[] = [
    {f: 'tick', at: 0.4, db: -22}, {f: 'rise', at: T.fingernails, db: -22}, {f: 'ding', at: T.grows - 0.6, db: -20},
    {f: 'whoosh', at: T.grows - 0.25, db: -24}, {f: 'tick', at: T.grows + 0.3, db: -22}, {f: 'ticktock', at: T.replaced, db: -22}, {f: 'pop', at: T.replaced + 1, db: -20},
    {f: 'whoosh', at: T.toenail - 0.25, db: -24}, {f: 'snore', at: T.toenail + 0.3, db: -22},
    {f: 'whoosh', at: T.blood - 0.25, db: -24}, {f: 'knock', at: T.blood + 0.6, db: -18}, {f: 'knock', at: T.blood + 1.0, db: -18},
    {f: 'whoosh', at: T.writing - 0.25, db: -24}, {f: 'ding', at: T.writing + 0.5, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'race' && (() => {
          const g = prog(t, 0.4, T.grows - 0.4, (u) => u);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1130, 1], [T.grows - 0.3, 540, 1130, 1.06]])}>
                <g transform="translate(300 1720) scale(0.85)"><Hand grow={2 * g} /></g>
                <g transform="translate(790 1720) scale(0.85)"><Foot grow={g} /></g>
                <text x={300} y={1850} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill="#E5414A" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.fingernails + 0.5, 12, 6)}>x2</text>
                <text x={790} y={1850} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.fingernails + 0.7, 12, 6)}>x1</text>
              </Layer>
              <Label x={540} y={640} size={84} s={pop(t, 0.1, 12, 6)} color="#fff">FINGERNAILS GROW</Label>
              <Sticker t={t} t0={T.fingernails + 0.5} x={540} y={790} text="2X FASTER THAN TOENAILS" size={50} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'month' && (() => {
          const mo = Math.min(6, Math.round(6 * prog(t, T.replaced, T.toenail - 0.5, (u) => u)));
          const rep = t > T.replaced - 0.1;
          return (
            <g>
              <Layer cam={keys(t, [[T.grows - 0.25, 540, 1080, 1.1], [T.toenail - 0.3, 540, 1110, 1.0]])}>
                <g transform="translate(540 1780)"><Hand grow={rep ? 0.3 + 0.1 * Math.sin(t * 4) : prog(t, T.grows, T.replaced - 0.2)} /></g>
                {!rep && <g transform="translate(860 1250) scale(0.8)">
                  <rect x={-40} y={-300} width={80} height={600} rx={10} fill="#FFE45C" stroke={INK} strokeWidth={LW} />
                  {Array.from({length: 13}).map((_, i) => <path key={i} d={`M -40 ${-280 + i * 46} L ${i % 2 ? -10 : 5} ${-280 + i * 46}`} stroke={INK} strokeWidth={5} />)}
                </g>}
                {rep && <g transform={`translate(840 1250) scale(${pop(t, T.replaced, 12, 6)})`}>
                  <rect x={-150} y={-150} width={300} height={280} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <rect x={-150} y={-150} width={300} height={80} rx={20} fill="#2C7BE5" stroke={INK} strokeWidth={LW} />
                  <text y={-92} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill="#fff">MONTHS</text>
                  <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={130} fill={INK}>{mo}</text>
                </g>}
              </Layer>
              <Label x={540} y={640} size={79} s={pop(t, T.grows, 12, 6)} color="#fff">{rep ? 'BRAND NEW NAIL' : 'ABOUT 3 MM A MONTH'}</Label>
              {rep && <Sticker t={t} t0={T.replaced + 0.3} x={540} y={790} text="EVERY 6 MONTHS" size={62} fill="#2C7BE5" />}
            </g>
          );
        })()}

        {scene === 'toe' && (
          <g>
            <Layer cam={keys(t, [[T.toenail - 0.25, 540, 1130, 1], [T.blood - 0.3, 540, 1080, 1.1]])}>
              <g transform="translate(540 1800) scale(1.1)"><Foot grow={0.2 * prog(t, T.toenail, T.blood)} snail t={t} /></g>
            </Layer>
            <Box y={1800} s={pop(t, T.toenail + 0.5, 12, 6)} text="12+ MONTHS" />
            <Label x={540} y={640} size={84} s={pop(t, T.toenail, 12, 6)} color="#fff">A TOENAIL TAKES</Label>
            <Sticker t={t} t0={T.toenail + 0.3} x={540} y={790} text="OVER A YEAR" size={64} fill="#7A4DC8" />
          </g>
        )}

        {scene === 'blood' && (() => {
          const tap = t > T.blood + 0.5 ? Math.abs(Math.sin((t - T.blood) * 8)) : 0;
          return (
            <g>
              <Layer cam={keys(t, [[T.blood - 0.25, 540, 1130, 1], [T.writing - 0.3, 540, 1150, 1.08]])}>
                <g transform={`translate(540 ${1700 - 30 * tap})`}><Hand /></g>
                {Array.from({length: 8}).map((_, i) => {
                  const a = ((t - T.blood) * 1.2 + i / 8) % 1;
                  return <circle key={i} cx={420 + (i % 4) * 80} cy={lerp(1800, 1260, a)} r={14} fill="#E5414A" stroke={INK} strokeWidth={3} opacity={0.9 * (1 - a)} />;
                })}
                <rect x={160} y={1820} width={760} height={90} rx={16} fill="#3A3A48" stroke={INK} strokeWidth={LW} />
                {Array.from({length: 8}).map((_, i) => <rect key={i} x={185 + i * 90} y={1838} width={70} height={50} rx={8} fill="#5A5A6E" />)}
              </Layer>
              <Label x={540} y={640} size={78} s={pop(t, T.blood, 12, 6)} color="#fff">MORE BLOOD FLOW</Label>
              <Sticker t={t} t0={T.blood + 0.6} x={540} y={790} text="+ MORE KNOCKS" size={64} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'writing' && (
          <g>
            <Layer cam={keys(t, [[T.writing - 0.25, 540, 1130, 1], [T.card, 540, 1150, 1.08]])}>
              <rect x={100} y={1650} width={880} height={260} fill="#fff" stroke={INK} strokeWidth={LW} />
              {[1700, 1760, 1820].map((y) => <path key={y} d={`M 140 ${y} L 940 ${y}`} stroke="#9FC4E8" strokeWidth={4} />)}
              <path d={`M 200 1735 ${Array.from({length: 12}).map((_, i) => `q 20 ${i % 2 ? 30 : -30} 40 0`).join(' ')}`} stroke="#2C7BE5" strokeWidth={6} fill="none" strokeDasharray={900} strokeDashoffset={900 * (1 - prog(t, T.writing, T.card))} />
              <g transform={`translate(${lerp(420, 700, prog(t, T.writing, T.card))} ${1640 + 10 * Math.sin(t * 10)}) rotate(-15) scale(0.85)`}><Hand pencil glow={pop(t, T.writing + 0.5, 10, 6)} grow={0.5} /></g>
            </Layer>
            <Label x={540} y={640} size={80} s={pop(t, T.writing, 12, 6)} color="#fff">YOUR WRITING HAND</Label>
            <Sticker t={t} t0={T.writing + 0.5} x={540} y={790} text="GROWS NAILS FASTER" size={58} fill="#2FA35A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="56-fingernails" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
