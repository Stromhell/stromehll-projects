import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const RED = '#D93A2B', CREAM = '#F6E7C8', WOOD = '#B88A5A';

const Bottle: React.FC<{t: number; s?: number; med?: boolean}> = ({t, s = 1, med = true}) => (
  <g transform={`scale(${s})`}>
    <path d="M -110 0 L -110 -300 Q -110 -380 -50 -400 L -50 -470 L 50 -470 L 50 -400 Q 110 -380 110 -300 L 110 0 Z" fill={RED} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <rect x={-60} y={-520} width={120} height={60} rx={14} fill="#fff" stroke={INK} strokeWidth={LW} />
    <rect x={-95} y={-270} width={190} height={190} rx={18} fill={CREAM} stroke={INK} strokeWidth={7} />
    {med ? <path d="M -22 -230 L 22 -230 L 22 -197 L 55 -197 L 55 -153 L 22 -153 L 22 -120 L -22 -120 L -22 -153 L -55 -153 L -55 -197 L -22 -197 Z" fill="#2FA35A" stroke={INK} strokeWidth={5} />
      : <circle cx={0} cy={-175} r={50} fill={RED} stroke={INK} strokeWidth={6} />}
    <path d="M -80 -360 Q -70 -330 -80 -300" stroke="#fff" strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.5 + 0.3 * Math.sin(t * 3)} />
  </g>
);

const Tomato: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <circle r={110} fill={RED} stroke={INK} strokeWidth={LW} />
    <path d="M -50 -105 L 0 -80 L 50 -105 L 20 -120 L 0 -150 L -20 -120 Z" fill="#3F8A4A" stroke={INK} strokeWidth={6} />
    <circle cx={-40} cy={-40} r={18} fill="#fff" opacity={0.6} />
  </g>
);

const PillJar: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <rect x={-100} y={-260} width={200} height={260} rx={24} fill="#F2C14E" stroke={INK} strokeWidth={LW} />
    <rect x={-115} y={-310} width={230} height={60} rx={14} fill="#fff" stroke={INK} strokeWidth={LW} />
    <rect x={-80} y={-200} width={160} height={130} rx={12} fill="#fff" stroke={INK} strokeWidth={6} />
    <text y={-150} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill={RED}>TOMATO</text>
    <text y={-105} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill={INK}>PILLS</text>
  </g>
);

const Crate: React.FC = () => (
  <g>
    <rect x={-120} y={-160} width={240} height={160} fill={WOOD} stroke={INK} strokeWidth={LW} />
    <path d="M -120 -80 L 120 -80 M -40 -160 L -40 0 M 40 -160 L 40 0" stroke="#8A6234" strokeWidth={8} />
    <circle cx={0} cy={-80} r={34} fill={RED} stroke={INK} strokeWidth={6} />
  </g>
);

const Pill: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={-30} y={-14} width={60} height={28} rx={14} fill="#fff" stroke={INK} strokeWidth={5} />
    <rect x={0} y={-14} width={30} height={28} rx={14} fill={RED} stroke={INK} strokeWidth={5} />
  </g>
);

export const KetchupMedicine: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.doctor - 0.25 ? 'intro' : t < T.pills - 0.25 ? 'doctor' : t < T.ruined - 0.25 ? 'pills' : t < T.fries - 0.25 ? 'ruined' : 'fries';
  const cues: Cue[] = [
    {f: 'squeeze', at: 0.3, db: -18}, {f: 'ding', at: T.Ketchup + 0.6, db: -20},
    {f: 'whoosh', at: T.doctor - 0.25, db: -24}, {f: 'blegh', at: T.indigestion, db: -20}, {f: 'boing', at: T.indigestion + 0.8, db: -20},
    {f: 'whoosh', at: T.pills - 0.25, db: -24}, {f: 'pour', at: T.pills + 0.1, db: -18}, {f: 'clink', at: T.pills + 0.5, db: -20},
    {f: 'step', at: T.box, db: -18}, {f: 'step', at: T.box + 0.25, db: -18}, {f: 'step', at: T.box + 0.5, db: -18},
    {f: 'whoosh', at: T.ruined - 0.25, db: -24}, {f: 'knock', at: T.ruined + 0.1, db: -14}, {f: 'sad', at: T.ruined + 0.5, db: -20},
    {f: 'whoosh', at: T.fries - 0.25, db: -24}, {f: 'squeeze', at: T.fries + 0.2, db: -18}, {f: 'pop', at: T.fries + 0.6, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: '#FFE9B8'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#FFE9B8" />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1200, 1], [T.doctor - 0.3, 540, 1200, 1.05]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={WOOD} stroke={INK} strokeWidth={LW} />
              <g transform={`translate(540 1700) rotate(${3 * Math.sin(t * 2.4)}) scale(${pop(t, 0.1, 9, 5) * 0.95})`}><Bottle t={t} /></g>
              {[0, 1, 2, 3].map((i) => <path key={i} transform={`translate(540 1300) rotate(${i * 90 + t * 30})`} d="M 0 -330 L 0 -400" stroke="#F2A13A" strokeWidth={14} strokeLinecap="round" opacity={pop(t, T.Ketchup + 0.5, 10, 6)} />)}
            </Layer>
            <Label x={540} y={640} size={92} s={pop(t, 0.1, 12, 6)} color={RED}>KETCHUP WAS</Label>
            <Label x={540} y={770} size={110} s={pop(t, T.Ketchup + 0.5, 12, 6)} color="#fff">MEDICINE?!</Label>
          </g>
        )}

        {scene === 'doctor' && (() => {
          const cured = t > T.indigestion + 0.8;
          return (
            <g>
              <Layer cam={keys(t, [[T.doctor - 0.25, 540, 1250, 1], [T.pills - 0.3, 560, 1280, 1.08]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill="#D8C7A8" stroke={INK} strokeWidth={LW} />
                <g transform="translate(300 1700)">
                  <Guy t={t} expr="happy" handL={[-110, -180]} handR={[150, -330]} stand blink={t % 2.9 < 0.12} />
                  <path d="M -95 -290 L -95 -40 L 110 -40 L 110 -290" fill="none" stroke="#fff" strokeWidth={0} />
                  <circle cx={-30} cy={-410} r={34} fill="#C9D3DE" stroke={INK} strokeWidth={6} />
                  <g transform={`translate(160 ${-360 + 10 * Math.sin(t * 4)})`}><Tomato s={0.55} /></g>
                </g>
                <g transform="translate(780 1700)">
                  <Guy t={t} expr={cured ? 'happy' : 'worried'} handL={cured ? [-130, -330] : [-30, -150]} handR={cured ? [140, -330] : [40, -140]} stand sweat={cured ? 0 : (t * 0.8) % 1} lean={cured ? 0 : 6 * Math.sin(t * 5)} blink={t % 3.3 < 0.12} />
                  {!cured && t > T.indigestion - 0.1 && <path d={`M -40 -150 q 20 -30 40 0 q 20 30 40 0`} stroke="#5DB55A" strokeWidth={10} fill="none" strokeLinecap="round" transform={`rotate(${20 * Math.sin(t * 6)})`} />}
                </g>
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, T.doctor, 12, 6)} color="#fff">1830s DOCTOR SAYS</Label>
              <Sticker t={t} t0={T.indigestion} x={540} y={790} text="TOMATOES CURE INDIGESTION" size={44} fill={RED} />
            </g>
          );
        })()}

        {scene === 'pills' && (() => {
          const boxes = t > T.box - 0.1;
          return (
            <g>
              <Layer cam={keys(t, [[T.pills - 0.25, 540, 1250, 1], [T.ruined - 0.3, 540, 1280, 1.06]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={WOOD} stroke={INK} strokeWidth={LW} />
                {!boxes && <g>
                  <g transform={`translate(540 1700) scale(${pop(t, T.pills - 0.1, 10, 6) * 1.3})`}><PillJar /></g>
                  {Array.from({length: 10}).map((_, i) => {
                    const a = ((t - T.pills) * 1.2 + i / 10) % 1;
                    return t > T.pills ? <Pill key={i} x={540 + (i - 4.5) * 70 * a} y={1200 - 300 * a + 600 * a * a} r={i * 50 + t * 200} /> : null;
                  })}
                </g>}
                {boxes && [[300, 1700], [540, 1700], [780, 1700], [420, 1540], [660, 1540], [540, 1380]].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x} ${y - 250 * (1 - pop(t, T.box + i * 0.15, 10, 7))})`}><Crate /></g>
                ))}
                {boxes && <g transform={`translate(860 1150) rotate(12) scale(${pop(t, T.box + 1, 12, 6)})`}>
                  <rect x={-150} y={-60} width={300} height={110} rx={16} fill="#2FA35A" stroke={INK} strokeWidth={LW} />
                  <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill="#fff">SOLD!</text>
                </g>}
              </Layer>
              <Label x={540} y={640} size={84} s={pop(t, T.pills, 12, 6)} color="#fff">{boxes ? 'BOUGHT BY THE BOX' : 'TOMATO PILLS'}</Label>
              {!boxes && <Sticker t={t} t0={T.pills + 0.5} x={540} y={790} text="CURE ANYTHING!" size={62} fill={RED} />}
            </g>
          );
        })()}

        {scene === 'ruined' && (() => {
          const st = pop(t, T.ruined + 0.1, 14, 7);
          const [sx, sy] = shake(t, t > T.ruined + 0.1 && t < T.ruined + 0.5 ? 14 : 0);
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <Layer cam={keys(t, [[T.ruined - 0.25, 540, 1250, 1.05], [T.fries - 0.3, 540, 1250, 1.12]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={WOOD} stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 1700) scale(1.3)"><PillJar /></g>
                {[[-320, 0.6], [320, -0.5]].map(([dx, r], i) => {
                  const f = prog(t, T.ruined + 0.3 + i * 0.2, T.ruined + 1.0 + i * 0.2);
                  return <g key={i} transform={`translate(${540 + dx} ${1700}) rotate(${r * 90 * f})`}><Crate /></g>;
                })}
                <g transform={`translate(540 1380) rotate(-14) scale(${st > 0 ? 2.2 - 1.2 * Math.min(1, st) : 0})`} opacity={Math.min(1, st * 2)}>
                  <rect x={-230} y={-90} width={460} height={170} rx={20} fill="none" stroke={RED} strokeWidth={18} />
                  <text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={120} fill={RED}>FAKE!</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, T.ruined, 12, 6)} color="#fff">FAKES RUINED IT</Label>
              <Sticker t={t} t0={T.ruined + 0.7} x={540} y={790} text="CRAZE COLLAPSED" size={56} fill="#7A4DC8" />
            </g>
          );
        })()}

        {scene === 'fries' && (
          <g>
            <Layer cam={keys(t, [[T.fries - 0.25, 540, 1250, 1], [T.card, 540, 1280, 1.1]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={WOOD} stroke={INK} strokeWidth={LW} />
              <g transform={`translate(780 1700) rotate(${-8 + 3 * Math.sin(t * 2)})`}><Bottle t={t} s={0.9} med={false} /></g>
              <g transform="translate(380 1700)">
                {Array.from({length: 9}).map((_, i) => <rect key={i} x={-130 + i * 30} y={-420 + 40 * Math.sin(i * 1.7) - 20 * pop(t, T.fries + i * 0.05, 10, 6)} width={26} height={260} rx={6} fill="#F7C94B" stroke={INK} strokeWidth={5} transform={`rotate(${(i - 4) * 4} ${-115 + i * 30} -300)`} />)}
                <path d="M -170 -280 L 170 -280 L 130 0 L -130 0 Z" fill={RED} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                <circle cx={0} cy={-150} r={50} fill="#FFE45C" stroke={INK} strokeWidth={6} />
              </g>
              <g transform="translate(600 1690)">
                <ellipse rx={90} ry={30} fill="#fff" stroke={INK} strokeWidth={7} />
                <ellipse rx={65 * prog(t, T.fries + 0.2, T.fries + 0.8)} ry={18 * prog(t, T.fries + 0.2, T.fries + 0.8)} fill={RED} />
              </g>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.fries, 12, 6)} color="#fff">NOW IT JUST</Label>
            <Sticker t={t} t0={T.fries + 0.4} x={540} y={790} text="LIVES ON YOUR FRIES" size={58} fill={RED} />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="48-ketchup-medicine" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
