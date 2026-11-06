import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#FCE4E4', STOM = '#F28CA0', STOM2 = '#E5607A', ACID = '#B8E04A', MUCUS = '#BFE8F0';

const STOMACH = 'M -60 -320 Q -60 -200 -150 -150 Q -320 -60 -260 140 Q -180 320 60 300 Q 260 280 300 120 Q 320 0 220 -40 Q 120 -60 60 -180 L 60 -320 Z';

// cells along a row; health 0..1 (1 = fresh)
const Cells: React.FC<{y: number; n: number; health: (i: number) => number}> = ({y, n, health}) => (
  <g>{Array.from({length: n}).map((_, i) => { const h = health(i); return <rect key={i} x={140 + i * 100} y={y - 50 * h} width={86} height={Math.max(4, 100 * h)} rx={14} fill={h > 0.6 ? '#FF9EB0' : '#D98A9A'} stroke={INK} strokeWidth={5} opacity={0.3 + 0.7 * h} />; })}</g>
);

export const StomachLining: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.acid - 0.25 ? 'intro' : t < T.worn - 0.25 ? 'acid' : t < T.replaces - 0.25 ? 'worn' : t < T.mucus - 0.25 ? 'new' : 'mucus';
  const cues: Cue[] = [
    {f: 'squeeze', at: 0.3, db: -18}, {f: 'ding', at: 1.2, db: -18},
    {f: 'whoosh', at: T.acid - 0.25, db: -24}, {f: 'sizzle', at: T.acid + 0.3, db: -18},
    {f: 'whoosh', at: T.worn - 0.25, db: -24}, {f: 'sad', at: T.worn + 0.2, db: -22},
    {f: 'whoosh', at: T.replaces - 0.25, db: -24}, ...Array.from({length: 7}).map((_, i) => ({f: 'pop', at: T.replaces + 0.2 + i * 0.1, db: -22})), {f: 'ding', at: T.replaces + 1.2, db: -18},
    {f: 'whoosh', at: T.mucus - 0.25, db: -24}, {f: 'splash', at: T.mucus + 0.2, db: -22}, {f: 'zap', at: T.mucus + 1.0, db: -22},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1070, 1.05], [T.acid - 0.3, 540, 1070, 1]])}>
              <g transform={`translate(560 1450) scale(${1 + 0.03 * Math.sin(t * 4)})`}>
                <path d={STOMACH} fill={STOM} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <path d="M -230 120 Q -150 260 60 250 Q 230 230 260 110" stroke={STOM2} strokeWidth={14} fill="none" strokeDasharray="30 18" />
                <circle cx={-60} cy={20} r={18} fill={INK} /><circle cx={60} cy={20} r={18} fill={INK} />
                <path d="M -50 90 Q 0 130 50 90" stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />
              </g>
              <g transform={`translate(540 1880) scale(${pop(t, 0.7, 12, 6)})`}>
                <rect x={-370} y={-55} width={740} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={STOM2}>NEW EVERY FEW DAYS</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, 0.1, 12, 6)} color="#fff">YOUR STOMACH MAKES</Label>
            <Sticker t={t} t0={0.5} x={540} y={790} text="A BRAND NEW LINING" size={64} fill={STOM2} />
          </g>
        )}

        {scene === 'acid' && (() => {
          const d = prog(t, T.acid + 0.3, T.worn - 0.4);
          return (
            <g>
              <Layer cam={keys(t, [[T.acid - 0.25, 540, 1070, 1], [T.worn - 0.3, 540, 1070, 1.06]])}>
                <path d="M 220 1150 L 860 1150 L 820 1800 Q 540 1880 260 1800 Z" fill="#fff" stroke={INK} strokeWidth={LW} opacity={0.8} />
                <path d="M 235 1350 L 845 1350 L 820 1800 Q 540 1880 260 1800 Z" fill={ACID} stroke={INK} strokeWidth={6} />
                {Array.from({length: 10}).map((_, i) => <circle key={i} cx={300 + (i * 61) % 480} cy={1780 - ((t * 200 + i * 70) % 420)} r={10 + (i % 3) * 5} fill="none" stroke="#5A8A1A" strokeWidth={4} />)}
                <g transform={`translate(540 ${lerp(1100, 1550, prog(t, T.acid, T.acid + 0.4))})`}>
                  <rect x={-20} y={-200 * (1 - d * 0.7)} width={40} height={200 * (1 - d * 0.7) + 60 * (1 - d)} fill="#9AA0AA" stroke={INK} strokeWidth={5} />
                  <rect x={-45} y={-200 * (1 - d * 0.7) - 20} width={90} height={24} rx={6} fill="#9AA0AA" stroke={INK} strokeWidth={5} />
                </g>
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.acid, 12, 6)} color="#fff">STOMACH ACID CAN</Label>
              <Sticker t={t} t0={T.acid + 0.3} x={540} y={790} text="DISSOLVE SOME METALS" size={57} fill="#5A8A1A" />
            </g>
          );
        })()}

        {scene === 'worn' && (() => {
          const w = prog(t, T.worn + 0.1, T.replaces - 0.4);
          return (
            <g>
              <Layer cam={keys(t, [[T.worn - 0.25, 540, 1120, 1], [T.replaces - 0.3, 540, 1120, 1.05]])}>
                <rect x={-400} y={1500} width={1900} height={900} fill={STOM2} stroke={INK} strokeWidth={LW} />
                <Cells y={1450} n={8} health={(i) => Math.max(0.05, 1 - w * (0.7 + 0.3 * ((i * 7) % 3) / 2))} />
                {Array.from({length: 14}).map((_, i) => <circle key={i} cx={150 + (i * 67) % 800} cy={1150 + ((t * 120 + i * 40) % 220)} r={12} fill={ACID} stroke={INK} strokeWidth={3} />)}
                <text x={540} y={1750} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.worn + 0.5, 12, 6)}>OUCH, OUCH, OUCH</text>
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.worn, 12, 6)} color="#fff">THE LINING CELLS</Label>
              <Sticker t={t} t0={T.worn + 0.3} x={540} y={790} text="GET WORN DOWN FAST" size={60} fill={STOM2} />
            </g>
          );
        })()}

        {scene === 'new' && (
          <g>
            <Layer cam={keys(t, [[T.replaces - 0.25, 540, 1120, 1], [T.mucus - 0.3, 540, 1120, 1.05]])}>
              <rect x={-400} y={1500} width={1900} height={900} fill={STOM2} stroke={INK} strokeWidth={LW} />
              <Cells y={1450} n={8} health={(i) => Math.max(0.05, pop(t, T.replaces + 0.2 + i * 0.1, 12, 6))} />
              <g transform={`translate(540 1180) scale(${pop(t, T.replaces + 1.0, 12, 6)})`}>
                <rect x={-280} y={-75} width={560} height={130} rx={26} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={25} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={76} fill="#2FA35A">3-5 DAYS</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, T.replaces, 12, 6)} color="#fff">YOUR BODY REPLACES</Label>
            <Sticker t={t} t0={T.replaces + 0.3} x={540} y={790} text="THEM ALL THE TIME" size={64} fill="#2FA35A" />
          </g>
        )}

        {scene === 'mucus' && (() => {
          const c = prog(t, T.mucus + 0.1, T.mucus + 0.7);
          return (
            <g>
              <Layer cam={keys(t, [[T.mucus - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.05]])}>
                <rect x={-400} y={1500} width={1900} height={900} fill={STOM2} stroke={INK} strokeWidth={LW} />
                <Cells y={1450} n={8} health={() => 1} />
                <path d={`M -100 1390 Q 540 ${1390 - 20 * Math.sin(t * 3)} 1200 1390 L 1200 1390 L 1200 ${1390 - 110 * c} Q 540 ${1390 - 110 * c - 25 * Math.sin(t * 3)} -100 ${1390 - 110 * c} Z`} fill={MUCUS} stroke={INK} strokeWidth={6} opacity={0.9} />
                {Array.from({length: 6}).map((_, i) => { const y = lerp(1000, 1250, ((t * 1.5 + i * 0.3) % 1)); return <g key={i}><circle cx={180 + i * 140} cy={y} r={16} fill={ACID} stroke={INK} strokeWidth={4} />{c > 0.9 && y > 1220 && <text x={180 + i * 140} y={1220} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={30} fill={INK}>NOPE</text>}</g>; })}
                <g transform="translate(540 1900) scale(0.5)"><Guy t={t} expr="happy" handL={[-150, -280]} handR={[150, -280]} stand /></g>
              </Layer>
              <Label x={540} y={640} size={71} s={pop(t, T.mucus, 12, 6)} color="#fff">A THICK MUCUS SHIELD</Label>
              <Sticker t={t} t0={T.mucus + 0.4} x={540} y={790} text="SO IT DOESN'T EAT ITSELF" size={48} fill="#2C7BE5" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="84-stomach-lining" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
