import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys, clamp} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BLUE = '#1F3A93', RED = '#C8102E';

// bicorne hat + coat drawn over the Guy (head centre 10,-346)
const Napo: React.FC<{t: number; expr?: 'happy' | 'worried' | 'hot'; handR?: [number, number]; handL?: [number, number]; sy?: number}> = ({t, expr = 'happy', handR = [60, -230], handL = [-120, -170], sy = 1}) => (
  <g transform={`scale(1 ${sy})`}>
    <Guy t={t} expr={expr} handL={handL} handR={handR} stand blink={t % 3.1 < 0.12} />
    <path d="M -60 -190 L -50 -60 L 60 -60 L 70 -190 Z" fill={BLUE} stroke={INK} strokeWidth={7} opacity={0.9} />
    <path d="M -10 -190 L -10 -70" stroke="#F2B632" strokeWidth={6} strokeDasharray="4 14" />
    <path d="M -200 -440 Q 10 -620 220 -440 Q 10 -500 -200 -440 Z" fill="#1B1B1B" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <circle cx={10} cy={-500} r={18} fill={RED} stroke="#fff" strokeWidth={6} />
  </g>
);

const Chart: React.FC<{label?: boolean}> = ({label = true}) => (
  <g>
    <rect x={-60} y={-760} width={120} height={760} fill="#fff" stroke={INK} strokeWidth={LW} />
    {Array.from({length: 36}).map((_, i) => <path key={i} d={`M -60 ${-i * 21.5} L ${i % 4 === 0 ? 20 : -20} ${-i * 21.5}`} stroke={INK} strokeWidth={i % 4 === 0 ? 6 : 3} />)}
    {label && [4, 5, 6].map((ft) => <text key={ft} x={30} y={-ft * 86 + 12} fontFamily={FONT} fontWeight={900} fontSize={34} fill={INK}>{`${ft} FT`}</text>)}
  </g>
);

const Ruler: React.FC<{len: number; ticks: number; col: string; text: string}> = ({len, ticks, col, text}) => (
  <g>
    <rect x={0} y={-50} width={len} height={100} rx={8} fill={col} stroke={INK} strokeWidth={LW} />
    {Array.from({length: ticks + 1}).map((_, i) => <path key={i} d={`M ${i * len / ticks} -50 L ${i * len / ticks} -10`} stroke={INK} strokeWidth={6} />)}
    <text x={len / 2} y={35} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill={INK}>{text}</text>
  </g>
);

export const NapoleonHeight: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.seven - 0.25 ? 'intro' : t < T.myth - 0.25 ? 'chart' : t < T.cartoonists - 0.25 ? 'inches' : 'cartoon';
  const cues: Cue[] = [
    {f: 'boing', at: 0.4, db: -20}, {f: 'crack', at: T.short + 0.2, db: -18},
    {f: 'whoosh', at: T.seven - 0.25, db: -24}, {f: 'rise', at: T.seven, db: -22}, {f: 'ding', at: T.average, db: -18},
    {f: 'whoosh', at: T.myth - 0.25, db: -24}, {f: 'knock', at: T.myth, db: -16}, {f: 'tick', at: T.inches, db: -18}, {f: 'tick', at: T.inches + 0.3, db: -18}, {f: 'wobble', at: T.mistranslated, db: -20},
    {f: 'whoosh', at: T.cartoonists - 0.25, db: -24}, {f: 'squeeze', at: T.cartoonists + 0.3, db: -20}, {f: 'blegh', at: T.cartoonists + 1.0, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: '#F6EBD6'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#F6EBD6" />

        {scene === 'intro' && (() => {
          const grow = prog(t, T.short + 0.2, T.short + 0.8);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1300, 1.1], [T.seven - 0.3, 540, 1250, 1]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill="#B88A5A" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(540 1700) scale(${lerp(0.4, 0.9, grow)} ${lerp(0.4, 0.9, grow)})`}>
                  <Napo t={t} expr={grow > 0.5 ? 'happy' : 'worried'} handR={grow > 0.5 ? [150, -380] : [60, -230]} />
                </g>
                {grow < 0.6 && <g transform={`translate(540 1300) scale(${pop(t, 0.4, 12, 6) * (1 - grow)})`}><Label x={0} y={0} size={70} color={INK}>TINY?</Label></g>}
              </Layer>
              <Label x={540} y={640} size={62} s={pop(t, T.short, 12, 6)} color="#fff">NAPOLEON WASN'T SHORT</Label>
            </g>
          );
        })()}

        {scene === 'chart' && (
          <g>
            <Layer cam={keys(t, [[T.seven - 0.25, 540, 1250, 1], [T.myth - 0.3, 520, 1300, 1.08]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill="#B88A5A" stroke={INK} strokeWidth={LW} />
              <g transform="translate(200 1700)"><Chart /></g>
              <g transform={`translate(470 1700) scale(0.95)`}><Napo t={t} handR={[150, -380]} /></g>
              <g transform={`translate(820 1700) scale(${0.95 * pop(t, T.average, 10, 6)})`}>
                <Guy t={t} expr="happy" handL={[-120, -170]} handR={[120, -170]} stand blink={t % 2.6 < 0.12} />
                <path d="M -120 -460 Q 10 -540 140 -460 L 140 -420 L -120 -420 Z" fill="#6B4E2E" stroke={INK} strokeWidth={LW} />
              </g>
              <path d="M 380 1220 L 940 1220" stroke={RED} strokeWidth={8} strokeDasharray="20 14" />
            </Layer>
            <Label x={540} y={640} size={86} s={pop(t, T.seven, 12, 6)} color="#fff">ABOUT 5 FT 7</Label>
            <Sticker t={t} t0={T.seven + 0.4} x={540} y={790} text="1.69 METRES" size={62} fill={BLUE} />
            <Sticker t={t} t0={T.average} x={540} y={1850} text="AVERAGE FOR HIS TIME" size={56} fill={RED} />
          </g>
        )}

        {scene === 'inches' && (() => {
          const stamp = pop(t, T.myth, 14, 7);
          return (
            <g>
              <Layer cam={keys(t, [[T.myth - 0.25, 540, 1200, 1], [T.cartoonists - 0.3, 540, 1250, 1.08]])}>
                {t < T.inches - 0.1 ? (
                  <g transform={`translate(540 1200) rotate(-12) scale(${2 - stamp})`} opacity={clamp(stamp * 2)}>
                    <rect x={-330} y={-130} width={660} height={260} rx={30} fill="none" stroke={RED} strokeWidth={24} />
                    <text y={70} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={200} fill={RED}>MYTH</text>
                  </g>
                ) : (
                  <g>
                    <g transform={`translate(${lerp(-800, 120, prog(t, T.inches - 0.1, T.inches + 0.4))} 1080)`}><Ruler len={812} ticks={3} col="#9FC5FF" text="3 FRENCH INCHES" /></g>
                    <g transform={`translate(${lerp(1400, 120, prog(t, T.inches + 0.2, T.inches + 0.7))} 1300)`}><Ruler len={762} ticks={3} col="#FFB3B3" text="3 BRITISH INCHES" /></g>
                    <g transform={`translate(540 1600) scale(${pop(t, T.mistranslated, 12, 6)})`}>
                      <rect x={-420} y={-90} width={840} height={180} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                      <text x={-200} y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={84} fill={BLUE}>5'2" FR</text>
                      <text x={20} y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={84} fill={INK}>=</text>
                      <text x={230} y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={84} fill={RED}>5'7" UK</text>
                    </g>
                  </g>
                )}
              </Layer>
              <Label x={540} y={640} size={57} s={pop(t, T.myth, 12, 6)} color="#fff">{t < T.inches - 0.1 ? 'WHERE DID IT COME FROM?' : 'FRENCH INCHES WERE LONGER'}</Label>
            </g>
          );
        })()}

        {scene === 'cartoon' && (() => {
          const draw = prog(t, T.cartoonists + 0.1, T.cartoonists + 1.0);
          return (
            <g>
              <Layer cam={keys(t, [[T.cartoonists - 0.25, 540, 1250, 1], [T.card, 580, 1250, 1.05]])}>
                {/* newspaper */}
                <g transform="translate(560 1500) rotate(-4) scale(0.8)">
                  <rect x={-380} y={-420} width={760} height={840} fill="#FBF6EA" stroke={INK} strokeWidth={LW} />
                  <text x={0} y={-330} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={66} fill={INK}>LONDON GAZETTE</text>
                  <path d="M -340 -300 L 340 -300" stroke={INK} strokeWidth={6} />
                  <rect x={-320} y={-270} width={640} height={540} fill="#fff" stroke={INK} strokeWidth={6} />
                  <g transform={`translate(0 230) scale(${0.45 * draw} ${0.32 * draw}) rotate(${6 * Math.sin(t * 14)})`} opacity={draw > 0 ? 1 : 0}>
                    <Napo t={t} expr="hot" handL={[-160, -380]} handR={[170, -380]} />
                  </g>
                  {draw > 0.9 && <text x={0} y={-180} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill={RED}>LITTLE BONEY!</text>}
                </g>
                {/* cartoonist's pen */}
                <g transform={`translate(${560 + 100 * Math.sin(t * 7)} ${1560 + 50 * Math.cos(t * 9)}) rotate(30)`}>
                  <rect x={-14} y={-200} width={28} height={200} rx={8} fill="#6B4E2E" stroke={INK} strokeWidth={6} />
                  <path d="M -14 0 L 0 40 L 14 0 Z" fill="#333" stroke={INK} strokeWidth={5} />
                </g>
              </Layer>
              <Label x={540} y={640} size={75} s={pop(t, T.cartoonists, 12, 6)} color="#fff">BRITISH CARTOONISTS</Label>
              <Sticker t={t} t0={T.cartoonists + 1.0} x={540} y={1850} text="DREW HIM TINY ON PURPOSE" size={48} fill={RED} />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="44-napoleon-height" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
