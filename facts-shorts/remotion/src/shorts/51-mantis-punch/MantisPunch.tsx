import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys, shake, clamp} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SEA = '#1F6E9C', SAND = '#D9B97A';

// side-view mantis shrimp facing right; punch 0..1 swings the club forward
const Mantis: React.FC<{t: number; punch: number}> = ({t, punch}) => {
  const segs = ['#2FA35A', '#3DBA8A', '#3FA0D9', '#7A4DC8', '#E5414A'];
  const ang = lerp(-120, 10, punch);
  return (
    <g>
      {segs.map((c, i) => <ellipse key={i} cx={-60 - i * 70} cy={10 + i * 6} rx={60} ry={55 - i * 4} fill={c} stroke={INK} strokeWidth={LW} />)}
      <path d="M -400 40 L -470 0 L -470 90 Z" fill="#F28C28" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-80 - i * 60} 55 l ${-10 + 8 * Math.sin(t * 8 + i)} 60`} stroke={INK} strokeWidth={7} strokeLinecap="round" />)}
      <ellipse cx={40} cy={-10} rx={90} ry={70} fill="#3DBA8A" stroke={INK} strokeWidth={LW} />
      {[-1, 1].map((s) => (
        <g key={s}>
          <path d={`M ${70 + s * 18} -60 L ${80 + s * 30} -150`} stroke={INK} strokeWidth={10} />
          <circle cx={80 + s * 30} cy={-170} r={34} fill="#F2C14E" stroke={INK} strokeWidth={7} />
          <rect x={80 + s * 30 - 22} y={-176} width={44} height={14} rx={7} fill={INK} transform={`rotate(${15 * Math.sin(t * 2 + s)} ${80 + s * 30} -170)`} />
        </g>
      ))}
      <path d="M 120 -60 Q 200 -140 260 -170 M 120 -50 Q 210 -110 270 -120" stroke={INK} strokeWidth={6} fill="none" />
      <g transform={`translate(110 40) rotate(${ang})`}>
        <rect x={0} y={-22} width={130} height={44} rx={22} fill="#E5414A" stroke={INK} strokeWidth={LW} />
        <circle cx={150} cy={0} r={44} fill="#F28C28" stroke={INK} strokeWidth={LW} />
      </g>
    </g>
  );
};

const Shell: React.FC<{crack?: number}> = ({crack = 0}) => (
  <g>
    <path d="M -110 60 Q -130 -90 0 -110 Q 120 -100 110 60 Z" fill="#E8D3B0" stroke={INK} strokeWidth={LW} />
    <path d="M -60 40 Q -40 -40 20 -60 Q 60 -30 40 30" stroke="#B89A6A" strokeWidth={10} fill="none" />
    {crack > 0 && <path d={`M -100 0 l 40 ${-20 * crack} l 30 ${30 * crack} l 40 ${-40 * crack} l 30 ${30 * crack}`} stroke={INK} strokeWidth={7} fill="none" />}
  </g>
);

export const MantisPunch: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.club - 0.25 ? 'intro' : t < T.collapse - 0.25 ? 'bubbles' : t < T.glass - 0.25 ? 'flash' : 'glass';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.3, db: -18}, {f: 'zap', at: T.punches + 0.3, db: -18},
    {f: 'whoosh', at: T.club - 0.25, db: -24}, {f: 'knock', at: T.club + 0.5, db: -14}, {f: 'sizzle', at: T.boils, db: -18},
    {f: 'whoosh', at: T.collapse - 0.25, db: -24}, {f: 'pop', at: T.collapse + 0.1, db: -16}, {f: 'pop', at: T.collapse + 0.25, db: -16}, {f: 'crack', at: T.collapse + 0.4, db: -14}, {f: 'zap', at: T.heat, db: -16},
    {f: 'whoosh', at: T.glass - 0.25, db: -24}, {f: 'knock', at: T.glass + 0.2, db: -14}, {f: 'crack', at: T.glass + 0.3, db: -12},
  ];
  return (
    <AbsoluteFill style={{background: SEA}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SEA} />
        {Array.from({length: 18}).map((_, i) => <circle key={i} cx={(i * 211) % 1080} cy={1900 - ((t * 60 + i * 140) % 1900)} r={6 + (i % 4) * 3} fill="none" stroke="#9FD8F5" strokeWidth={3} opacity={0.5} />)}

        {scene === 'intro' && (() => {
          const bx = lerp(-300, 1500, prog(t, T.punches + 0.1, T.punches + 0.5, (u) => u));
          const p = t > T.punches + 0.2 && t < T.punches + 0.5 ? 1 : 0;
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1300, 1], [T.club - 0.3, 520, 1320, 1.1]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={SAND} stroke={INK} strokeWidth={LW} />
                <g transform={`translate(560 ${1520 + 10 * Math.sin(t * 2)}) scale(0.95)`}><Mantis t={t} punch={p} /></g>
                <g transform={`translate(${bx} 1150)`}>
                  <path d="M -260 0 L -60 0" stroke="#fff" strokeWidth={10} opacity={0.6} />
                  <path d="M -60 -26 L 60 -26 Q 110 0 60 26 L -60 26 Z" fill="#D9A23A" stroke={INK} strokeWidth={7} />
                </g>
              </Layer>
              <Label x={540} y={640} size={75} s={pop(t, T.punches, 12, 6)} color="#fff">THIS SHRIMP PUNCHES</Label>
              <Sticker t={t} t0={T.punches + 0.5} x={540} y={790} text="LIKE A BULLET" size={66} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'bubbles' && (() => {
          const p = prog(t, T.club + 0.35, T.club + 0.5, (u) => u);
          const hit = t > T.club + 0.5;
          const [sx, sy] = shake(t, t > T.club + 0.5 && t < T.club + 0.9 ? 12 : 0);
          const boil = t > T.boils;
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <Layer cam={keys(t, [[T.club - 0.25, 540, 1300, 1], [T.boils, 640, 1280, 1.25], [T.collapse - 0.3, 660, 1280, 1.35]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={SAND} stroke={INK} strokeWidth={LW} />
                <g transform="translate(380 1520) scale(0.9)"><Mantis t={t} punch={t < T.club + 0.35 ? 0.15 * Math.sin(t * 4) : p} /></g>
                <g transform="translate(850 1620)"><Shell crack={hit ? 1 : 0} /></g>
                {boil && Array.from({length: 16}).map((_, i) => {
                  const a = i * 2.4, r = 40 + (i % 5) * 18;
                  const k = pop(t, T.boils + i * 0.04, 12, 6);
                  return <circle key={i} cx={720 + Math.cos(a) * r} cy={1560 + Math.sin(a) * r * 0.8} r={(10 + (i % 3) * 8) * k * (1 + 0.1 * Math.sin(t * 12 + i))} fill="#E8F8FF" stroke={INK} strokeWidth={4} opacity={0.9} />;
                })}
              </Layer>
              <Label x={540} y={640} size={79} s={pop(t, T.club, 12, 6)} color="#fff">{boil ? 'THE WATER BOILS' : 'IT SWINGS ITS CLUB'}</Label>
              {boil && <Sticker t={t} t0={T.boils + 0.3} x={540} y={790} text="INTO TINY BUBBLES" size={58} fill="#2C7BE5" />}
            </g>
          );
        })()}

        {scene === 'flash' && (() => {
          const c = prog(t, T.collapse, T.collapse + 0.4, (u) => u);
          const fl = Math.max(0, 1 - Math.abs(t - T.heat) / 0.25);
          const [sx, sy] = shake(t, t > T.collapse + 0.35 && t < T.collapse + 0.8 ? 14 : 0);
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <Layer cam={keys(t, [[T.collapse - 0.25, 660, 1280, 1.35], [T.heat, 680, 1300, 1.5], [T.glass - 0.3, 620, 1300, 1.1]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={SAND} stroke={INK} strokeWidth={LW} />
                <g transform="translate(380 1520) scale(0.9)"><Mantis t={t} punch={1} /></g>
                <g transform={`translate(850 1620) rotate(${8 * clamp((t - T.collapse - 0.4) * 3)})`}><Shell crack={1 + clamp(t - T.collapse - 0.4)} /></g>
                {Array.from({length: 16}).map((_, i) => {
                  const a = i * 2.4, r = (40 + (i % 5) * 18) * (1 - c);
                  return c < 1 ? <circle key={i} cx={720 + Math.cos(a) * r} cy={1560 + Math.sin(a) * r * 0.8} r={(10 + (i % 3) * 8) * (1 - c)} fill="#E8F8FF" stroke={INK} strokeWidth={4} /> : null;
                })}
                {t > T.collapse + 0.35 && (
                  <g transform="translate(730 1560)">
                    <circle r={40 + 300 * prog(t, T.collapse + 0.35, T.collapse + 0.9)} fill="none" stroke="#fff" strokeWidth={12} opacity={1 - prog(t, T.collapse + 0.35, T.collapse + 0.9)} />
                    {Array.from({length: 10}).map((_, i) => <path key={i} transform={`rotate(${i * 36 + t * 60})`} d={`M 0 -30 L 14 ${-90 - 120 * fl} L -14 ${-90 - 120 * fl} Z`} fill="#FFE45C" opacity={0.3 + 0.7 * fl} />)}
                    <circle r={30 + 40 * fl} fill="#FFF3B0" stroke={INK} strokeWidth={5} />
                  </g>
                )}
              </Layer>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#fff" opacity={0.35 * fl} />
              <Label x={540} y={640} size={80} s={pop(t, T.collapse, 12, 6)} color="#fff">BUBBLES COLLAPSE</Label>
              <Sticker t={t} t0={T.collapse + 0.4} x={540} y={790} text="SECOND HIT!" size={66} fill="#E5414A" />
              <Sticker t={t} t0={T.heat} x={540} y={1800} text="FLASH OF HEAT + LIGHT" size={52} fill="#F28C28" />
            </g>
          );
        })()}

        {scene === 'glass' && (() => {
          const hit = t > T.glass + 0.2;
          const cr = prog(t, T.glass + 0.2, T.glass + 0.6);
          const [sx, sy] = shake(t, hit && t < T.glass + 0.6 ? 14 : 0);
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <Layer cam={keys(t, [[T.glass - 0.25, 540, 1300, 1], [T.card, 560, 1300, 1.08]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={SAND} stroke={INK} strokeWidth={LW} />
                <g transform={`translate(${hit ? 420 : 380} 1520) scale(0.9)`}><Mantis t={t} punch={t > T.glass && t < T.glass + 0.5 ? 1 : 0.2} /></g>
                <rect x={760} y={1250} width={60} height={450} fill="#CFF0FF" stroke={INK} strokeWidth={LW} opacity={0.85} />
                {hit && <g transform="translate(790 1540)">
                  {Array.from({length: 8}).map((_, i) => {
                    const a = i * 0.785 + 0.3, l = 220 * cr;
                    return <path key={i} d={`M 0 0 L ${Math.cos(a) * l * 0.5 + 15} ${Math.sin(a) * l * 0.5} L ${Math.cos(a) * l} ${Math.sin(a) * l}`} stroke={INK} strokeWidth={6} fill="none" />;
                  })}
                  <circle r={30 * cr} fill="none" stroke={INK} strokeWidth={6} />
                </g>}
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, T.glass, 12, 6)} color="#fff">IT CAN CRACK</Label>
              <Sticker t={t} t0={T.glass + 0.4} x={540} y={790} text="AQUARIUM GLASS" size={64} fill="#E5414A" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="51-mantis-punch" voAt={VO_AT} card={T.card} cues={cues} bed="ocean" bedVol={0.04} />
    </AbsoluteFill>
  );
};
