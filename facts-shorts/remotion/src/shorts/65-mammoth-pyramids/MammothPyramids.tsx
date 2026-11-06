import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SAND = '#F2C46B', SAND2 = '#D9A24A', SKY = '#FFE2A8', SNOW = '#EAF6FF', FUR = '#8A5A34', FUR2 = '#6B4226';

const Mammoth: React.FC<{t: number; walk?: boolean}> = ({t, walk}) => (
  <g>
    {[-110, -50, 60, 120].map((x, i) => <rect key={i} x={x - 30} y={-170 - (walk ? 12 * Math.max(0, Math.sin(t * 8 + i * 1.6)) : 0)} width={60} height={170} rx={14} fill={i % 2 ? FUR : FUR2} stroke={INK} strokeWidth={LW} />)}
    <path d="M -200 -170 Q -220 -330 -40 -360 Q 120 -390 190 -290 Q 220 -200 170 -160 L -180 -150 Z" fill={FUR} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    {Array.from({length: 7}).map((_, i) => <path key={i} d={`M ${-170 + i * 50} -175 l 8 40`} stroke={FUR2} strokeWidth={10} strokeLinecap="round" />)}
    <circle cx={190} cy={-300} r={90} fill={FUR} stroke={INK} strokeWidth={LW} />
    <path d="M 180 -400 Q 210 -430 240 -395" fill={FUR2} stroke={INK} strokeWidth={6} />
    <path d="M 250 -270 Q 300 -180 260 -80" stroke={INK} strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d="M 250 -270 Q 300 -180 260 -80" stroke={FUR} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M 230 -230 Q 360 -200 370 -320" stroke={INK} strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d="M 230 -230 Q 360 -200 370 -320" stroke="#FFF8E7" strokeWidth={16} fill="none" strokeLinecap="round" />
    <circle cx={215} cy={-320} r={11} fill={INK} />
  </g>
);

const Pyramid: React.FC<{built?: number}> = ({built = 1}) => (
  <g>
    <path d="M -380 0 L 0 -420 L 380 0 Z" fill="none" stroke={INK} strokeWidth={4} strokeDasharray="14 12" opacity={0.4} />
    <clipPath id="pyb"><rect x={-400} y={-440 * built} width={800} height={440 * built + 2} /></clipPath>
    <g clipPath="url(#pyb)">
      <path d="M -380 0 L 0 -420 L 380 0 Z" fill={SAND} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M 0 -420 L 380 0 L 60 0 Z" fill={SAND2} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {[1, 2, 3, 4].map((i) => <path key={i} d={`M ${-380 + i * 76} ${-i * 84} L ${380 - i * 76} ${-i * 84}`} stroke={INK} strokeWidth={4} opacity={0.4} />)}
    </g>
  </g>
);

export const MammothPyramids: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Meanwhile - 0.25 ? 'intro' : t < T.hundreds - 0.25 ? 'island' : t < T.shared - 0.25 ? 'timeline' : 'shared';
  const cues: Cue[] = [
    {f: 'rumble', at: 0.2, db: -22}, {f: 'boing', at: 0.6, db: -20}, {f: 'knock', at: T.pyramid + 0.2, db: -18}, {f: 'knock', at: T.pyramid + 0.6, db: -18},
    {f: 'whoosh', at: T.Meanwhile - 0.25, db: -24}, {f: 'ocean', at: T.Meanwhile, db: -26}, {f: 'pop', at: T.Meanwhile + 0.7, db: -20}, {f: 'ding', at: T.Wrangel + 1.4, db: -18},
    {f: 'whoosh', at: T.hundreds - 0.25, db: -24}, {f: 'tick', at: T.hundreds + 0.2, db: -20}, {f: 'tick', at: T.hundreds + 0.6, db: -20},
    {f: 'whoosh', at: T.shared - 0.25, db: -24}, {f: 'pop', at: T.shared + 0.3, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1070, 1.05], [T.Meanwhile - 0.3, 540, 1090, 1]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={SAND} stroke={INK} strokeWidth={LW} />
              <circle cx={880} cy={1050} r={80} fill="#FFD23C" stroke={INK} strokeWidth={LW} />
              <g transform="translate(330 1700) scale(0.75)"><Pyramid built={prog(t, T.pyramid, T.Meanwhile - 0.5)} /></g>
              <g transform={`translate(${lerp(1300, 760, prog(t, 0.2, 1.4))} 1720) scale(0.7)`}><Mammoth t={t} walk={t < 1.4} /></g>
              <g transform={`translate(330 1830) scale(${pop(t, T.pyramid + 0.3, 12, 6)})`}>
                <rect x={-170} y={-50} width={340} height={90} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={INK}>2560 BC</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, 0.1, 12, 6)} color="#fff">MAMMOTHS WERE ALIVE</Label>
            <Sticker t={t} t0={T.pyramid - 0.2} x={540} y={790} text="WHEN THE PYRAMID WAS BUILT" size={44} fill="#E5414A" />
          </g>
        )}

        {scene === 'island' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#BFE3F5" />
            <Layer cam={keys(t, [[T.Meanwhile - 0.25, 540, 1070, 1], [T.hundreds - 0.3, 540, 1090, 1.08]])}>
              <rect x={-400} y={1500} width={1900} height={1000} fill="#2A7DB8" />
              <path d="M 120 1520 Q 300 1380 540 1400 Q 800 1380 960 1520 Z" fill={SNOW} stroke={INK} strokeWidth={LW} />
              {[0, 1].map((i) => <g key={i} transform={`translate(${400 + i * 300} ${1450 - i * 10}) scale(${0.45 * pop(t, T.Meanwhile + 0.7 + i * 0.2, 12, 6)} 0.45) scale(${i ? -1 : 1} 1)`}><Mammoth t={t} /></g>)}
              {Array.from({length: 12}).map((_, i) => { const a = ((t * 0.3 + i / 12) % 1); return <circle key={i} cx={(i * 91) % 1080} cy={900 + 700 * a} r={7} fill="#fff" />; })}
              <g transform={`translate(540 1780) scale(${pop(t, T.Wrangel + 1.4, 12, 6)})`}>
                <rect x={-320} y={-55} width={640} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={INK}>UNTIL ~2000 BC</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.Meanwhile, 12, 6)} color="#fff">WRANGEL ISLAND</Label>
            <Sticker t={t} t0={T.Wrangel + 0.5} x={540} y={790} text="OFF SIBERIA" size={60} fill="#2C7BE5" />
          </g>
        )}

        {scene === 'timeline' && (() => {
          const u = prog(t, T.hundreds, T.shared - 0.4);
          const X = (bc: number) => lerp(130, 950, (2700 - bc) / 800);
          return (
            <g>
              <Layer cam={keys(t, [[T.hundreds - 0.25, 540, 1070, 1], [T.shared - 0.3, 540, 1070, 1.05]])}>
                <path d="M 100 1450 L 980 1450" stroke={INK} strokeWidth={14} strokeLinecap="round" />
                <g transform={`translate(${X(2560)} 1450)`}>
                  <g transform="translate(0 -40) scale(0.3)"><Pyramid /></g>
                  <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill={INK}>2560 BC</text>
                </g>
                <rect x={X(2560)} y={1600} width={(X(2000) - X(2560)) * u} height={60} rx={20} fill="#8A5A34" stroke={INK} strokeWidth={6} />
                <g transform={`translate(${X(2000)} 1450)`} opacity={u > 0.9 ? 1 : 0.3}>
                  <g transform="translate(-40 -40) scale(0.3)"><Mammoth t={t} /></g>
                  <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill={INK}>2000 BC</text>
                </g>
                <text x={540} y={1760} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.hundreds + 0.8, 12, 6)}>~500 YEARS LATER</text>
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.hundreds, 12, 6)} color="#fff">HUNDREDS OF YEARS</Label>
              <Sticker t={t} t0={T.hundreds + 0.3} x={540} y={790} text="AFTER THE PYRAMID" size={60} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'shared' && (
          <g>
            <Layer cam={keys(t, [[T.shared - 0.25, 540, 1070, 1], [T.card, 540, 1070, 1.06]])}>
              <circle cx={540} cy={1420} r={360} fill="#4FA3E0" stroke={INK} strokeWidth={LW} />
              <path d="M 320 1260 Q 420 1180 520 1260 Q 480 1380 360 1360 Z M 600 1450 Q 760 1400 800 1540 Q 680 1620 600 1450 Z" fill="#5DB55A" stroke={INK} strokeWidth={6} />
              <g transform={`translate(380 1180) scale(${0.5 * pop(t, T.shared + 0.1, 12, 6)})`}><Guy t={t} expr="happy" handL={[-140, -300]} handR={[140, -300]} stand /></g>
              <g transform={`translate(720 1200) scale(${0.32 * pop(t, T.shared + 0.3, 12, 6)})`}><Mammoth t={t} /></g>
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, T.shared, 12, 6)} color="#fff">SAME PLANET</Label>
            <Sticker t={t} t0={T.shared + 0.4} x={540} y={790} text="SAME TIME" size={66} fill="#2FA35A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="65-mammoth-pyramids" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
