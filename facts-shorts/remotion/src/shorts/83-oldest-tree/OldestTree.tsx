import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SKY = '#BFE3F5', BARK = '#8A6A4A', BARK2 = '#C9A57A', NEEDLE = '#3E7A4A', ROCK = '#A89A88', SAND = '#E8C98A';

// twisted bristlecone pine
const Pine: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s})`}>
    <path d="M -50 0 Q -70 -120 -20 -220 Q 30 -300 -10 -380 L 20 -380 Q 70 -290 30 -200 Q 10 -120 50 0 Z" fill={BARK} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -20 -60 Q -10 -150 20 -230 M 10 -40 Q 25 -120 0 -180" stroke={BARK2} strokeWidth={8} fill="none" />
    <path d="M 0 -260 Q -120 -300 -180 -380" stroke={BARK} strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d="M 10 -320 Q 120 -360 170 -440" stroke={BARK} strokeWidth={22} fill="none" strokeLinecap="round" />
    {[[-190, -400, 70], [180, -460, 60], [0, -420, 80]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r * (1 + 0.04 * Math.sin(t * 2 + i))} ry={r * 0.6} fill={NEEDLE} stroke={INK} strokeWidth={6} />)}
  </g>
);

const Mountains: React.FC = () => (
  <g>
    <path d="M -300 1500 L 150 1050 L 450 1350 L 720 980 L 1100 1450 L 1400 1500 Z" fill="#9A9AB0" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M 75 1125 L 150 1050 L 230 1130 L 190 1150 L 150 1120 L 110 1150 Z" fill="#fff" />
    <path d="M 630 1100 L 720 980 L 810 1100 L 760 1120 L 720 1090 L 680 1120 Z" fill="#fff" />
  </g>
);

export const OldestTree: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Methuselah - 0.25 ? 'intro' : t < T.Pyramid - 0.25 ? 'name' : t < T.White - 0.25 ? 'pyramid' : t < T.secret - 0.25 ? 'mountains' : 'secret';
  const cues: Cue[] = [
    {f: 'creak', at: 0.3, db: -18}, ...Array.from({length: 6}).map((_, i) => ({f: 'tick', at: 0.6 + i * 0.12, db: -24})), {f: 'ding', at: 1.4, db: -18},
    {f: 'whoosh', at: T.Methuselah - 0.25, db: -24}, {f: 'knock', at: T.Methuselah + 0.2, db: -18},
    {f: 'whoosh', at: T.Pyramid - 0.25, db: -24}, ...[0, 1, 2].map((i) => ({f: 'knock', at: T.Pyramid + 0.3 + i * 0.3, db: -20})),
    {f: 'whoosh', at: T.White - 0.25, db: -24}, {f: 'rumble', at: T.White, db: -24},
    {f: 'whoosh', at: T.secret - 0.25, db: -24}, {f: 'clink', at: T.secret + 0.4, db: -18},
  ];
  const bg = scene === 'pyramid' ? '#F6D8A0' : SKY;
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bg} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1070, 1.05], [T.Methuselah - 0.3, 540, 1070, 1]])}>
              <rect x={-400} y={1750} width={1900} height={700} fill={ROCK} stroke={INK} strokeWidth={LW} />
              <g transform="translate(540 1760)"><Pine t={t} s={1.2} /></g>
              <g transform={`translate(540 1880) scale(${pop(t, 0.5, 12, 6)})`}>
                <rect x={-260} y={-55} width={520} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={58} fill={INK}>{`${Math.round(4800 * prog(t, 0.6, 1.4))}+ YEARS`}</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, 0.1, 12, 6)} color="#fff">THIS TREE IS OVER</Label>
            <Sticker t={t} t0={0.5} x={540} y={790} text="4,800 YEARS OLD" size={72} fill="#2FA35A" />
          </g>
        )}

        {scene === 'name' && (
          <g>
            <Layer cam={keys(t, [[T.Methuselah - 0.25, 540, 1070, 1], [T.Pyramid - 0.3, 540, 1070, 1.06]])}>
              <rect x={-400} y={1750} width={1900} height={700} fill={ROCK} stroke={INK} strokeWidth={LW} />
              <g transform="translate(380 1760)"><Pine t={t} s={1.0} /></g>
              <g transform={`translate(780 1600) rotate(${lerp(-30, 4, prog(t, T.Methuselah, T.Methuselah + 0.3))})`}>
                <rect x={-12} y={-20} width={24} height={170} fill={BARK} stroke={INK} strokeWidth={5} />
                <rect x={-200} y={-120} width={400} height={110} rx={14} fill="#C98A4A" stroke={INK} strokeWidth={LW} />
                <text y={-48} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill="#fff">METHUSELAH</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, T.Methuselah, 12, 6)} color="#fff">A BRISTLECONE PINE</Label>
            <Sticker t={t} t0={T.Methuselah + 0.3} x={540} y={790} text="NAMED METHUSELAH" size={62} fill={BARK} />
          </g>
        )}

        {scene === 'pyramid' && (() => {
          const b = prog(t, T.Pyramid + 0.2, T.White - 0.6);
          return (
            <g>
              <Layer cam={keys(t, [[T.Pyramid - 0.25, 540, 1070, 1], [T.White - 0.3, 540, 1070, 1.05]])}>
                <rect x={-400} y={1750} width={1900} height={700} fill={SAND} stroke={INK} strokeWidth={LW} />
                <clipPath id="pyr"><rect x={300} y={lerp(1750, 1100, b)} width={760} height={700} /></clipPath>
                <path d="M 400 1750 L 710 1130 L 1020 1750 Z" fill="none" stroke={INK} strokeWidth={4} strokeDasharray="16 12" />
                <g clipPath="url(#pyr)"><path d="M 400 1750 L 710 1130 L 1020 1750 Z" fill="#E0B060" stroke={INK} strokeWidth={LW} />
                  {[1300, 1450, 1600].map((y) => <path key={y} d={`M ${710 - (y - 1130) / 2} ${y} L ${710 + (y - 1130) / 2} ${y}`} stroke="#B88A40" strokeWidth={6} />)}</g>
                <g transform="translate(230 1760)"><Pine t={t} s={0.6} /></g>
                <text x={230} y={1850} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill={INK}>ALREADY OLD</text>
              </Layer>
              <Label x={540} y={640} size={66} s={pop(t, T.Pyramid, 12, 6)} color="#fff">OLDER THAN THE</Label>
              <Sticker t={t} t0={T.Pyramid + 0.3} x={540} y={790} text="GREAT PYRAMID" size={70} fill="#E0A030" />
            </g>
          );
        })()}

        {scene === 'mountains' && (
          <g>
            <Layer cam={keys(t, [[T.White - 0.25, 540, 1070, 1], [T.secret - 0.3, 540, 1070, 1.05]])}>
              <Mountains />
              <path d="M -400 1500 Q 540 1420 1500 1520 L 1500 2400 L -400 2400 Z" fill={ROCK} stroke={INK} strokeWidth={LW} />
              {[[160, 1650, 50], [880, 1700, 60], [520, 1820, 40]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.6} fill="#8A7E6E" stroke={INK} strokeWidth={5} />)}
              <g transform="translate(540 1600)"><Pine t={t} s={0.55} /></g>
              <text x={540} y={1900} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={52} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.White + 0.5, 12, 6)}>DRY, COLD, ROCKY</text>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.White, 12, 6)} color="#fff">HIGH UP IN THE</Label>
            <Sticker t={t} t0={T.White + 0.3} x={540} y={790} text="WHITE MOUNTAINS" size={66} fill="#7A7AA0" />
          </g>
        )}

        {scene === 'secret' && (
          <g>
            <Layer cam={keys(t, [[T.secret - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.05]])}>
              <rect x={150} y={1100} width={780} height={620} rx={24} fill="#F4E6C0" stroke={INK} strokeWidth={LW} />
              {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${280 + i * 170} ${1300 + (i % 2) * 180}) scale(0.18)`}><Pine t={t} /></g>)}
              <path d="M 230 1650 Q 450 1500 600 1600 T 880 1250" stroke="#E5414A" strokeWidth={8} strokeDasharray="20 16" fill="none" />
              <text x={880} y={1230} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={110} fill="#E5414A" stroke={INK} strokeWidth={8} paintOrder="stroke">?</text>
              <g transform={`translate(540 1820) scale(${pop(t, T.secret + 0.3, 12, 6)})`}>
                <rect x={-70} y={-60} width={140} height={120} rx={16} fill="#E8B030" stroke={INK} strokeWidth={LW} />
                <path d="M -40 -60 L -40 -110 Q 0 -160 40 -110 L 40 -60" stroke={INK} strokeWidth={14} fill="none" />
                <circle cy={0} r={14} fill={INK} />
              </g>
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, T.secret, 12, 6)} color="#fff">ITS EXACT SPOT?</Label>
            <Sticker t={t} t0={T.secret + 0.3} x={540} y={790} text="TOP SECRET" size={74} fill="#E5414A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="83-oldest-tree" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
