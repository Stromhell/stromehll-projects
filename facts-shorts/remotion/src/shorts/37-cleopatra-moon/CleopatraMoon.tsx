import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SAND = '#E8C27A', GOLD = '#F2B632';

// Egyptian headdress drawn over the Guy head (head centre 10,-346 r 138)
const Headdress: React.FC = () => (
  <g>
    <path d="M -140 -330 Q -150 -500 10 -500 Q 170 -500 160 -330 L 170 -200 L 110 -200 L 120 -330 Q 110 -440 10 -440 Q -90 -440 -100 -330 L -90 -200 L -150 -200 Z" fill="#1B1B2E" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -110 -430 Q 10 -470 130 -430" stroke={GOLD} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M 10 -470 Q -10 -520 15 -540 Q 40 -520 20 -470" fill={GOLD} stroke={INK} strokeWidth={6} />
  </g>
);

const Cleo: React.FC<{t: number; expr?: 'happy' | 'worried'; handR?: [number, number]; children?: React.ReactNode}> = ({t, expr = 'happy', handR = [130, -170], children}) => (
  <g>
    <Guy t={t} expr={expr} handL={[-120, -170]} handR={handR} stand blink={t % 3.2 < 0.12} handChildren={children} />
    <Headdress />
  </g>
);

const Pyramid: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <path d="M -300 0 L 0 -320 L 300 0 Z" fill={SAND} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M 0 -320 L 80 0 L 300 0 Z" fill="#C99A55" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    {[1, 2, 3, 4].map((i) => <path key={i} d={`M ${-300 + i * 60} ${-i * 64} L ${300 - i * 60 - (i * 0)} ${-i * 64}`} stroke="#B98A45" strokeWidth={5} />)}
  </g>
);

const Rocket: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s})`}>
    <path d="M -40 0 L -40 -260 Q 0 -360 40 -260 L 40 0 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -40 -40 L -90 20 L -40 0 Z M 40 -40 L 90 20 L 40 0 Z" fill="#E5414A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <circle cy={-200} r={22} fill="#7CC7F0" stroke={INK} strokeWidth={6} />
    <path d={`M -25 10 Q 0 ${90 + 20 * Math.sin(t * 30)} 25 10 Z`} fill="#FFB020" stroke={INK} strokeWidth={5} />
  </g>
);

const Moon: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <circle r={140} fill="#E6E6EE" stroke={INK} strokeWidth={LW} />
    <circle cx={-40} cy={-30} r={26} fill="#C8C8D6" /><circle cx={50} cy={40} r={18} fill="#C8C8D6" /><circle cx={30} cy={-60} r={12} fill="#C8C8D6" />
    <path d="M 40 -150 L 40 -230" stroke={INK} strokeWidth={8} />
    <path d="M 40 -230 L 120 -210 L 40 -190 Z" fill="#fff" stroke={INK} strokeWidth={6} />
  </g>
);

// timeline: world x per year
const X = (yr: number) => 200 + (yr + 2560) * 0.62;

const Bracket: React.FC<{x0: number; x1: number; y: number; u: number; text: string; col: string}> = ({x0, x1, y, u, text, col}) => {
  if (u <= 0) return null;
  const xe = lerp(x0, x1, u);
  return (
    <g>
      <path d={`M ${x0} ${y - 40} L ${x0} ${y} L ${xe} ${y} ${u > 0.98 ? `L ${x1} ${y - 40}` : ''}`} stroke={col} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {u > 0.6 && <Label x={(x0 + x1) / 2} y={y + 130} size={110} s={pop(u * 3, 1.8, 12, 6)} color={col}>{text}</Label>}
    </g>
  );
};

export const CleopatraMoon: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Giza - 0.25 ? 'intro' : t < T.ancient - 0.25 ? 'line' : 'tourist';
  const cues: Cue[] = [
    {f: 'pop', at: 0.4, db: -22}, {f: 'boing', at: T.closer, db: -20},
    {f: 'whoosh', at: T.Giza - 0.25, db: -24}, {f: 'rumble', at: T.Giza, db: -24}, {f: 'whoosh', at: T.born - 0.2, db: -22}, {f: 'ding', at: T.nearly, db: -20},
    {f: 'whoosh', at: T.landing - 0.25, db: -22}, {f: 'rise', at: T.landing, db: -22}, {f: 'ding', at: T.only + 0.3, db: -18},
    {f: 'whoosh', at: T.ancient - 0.25, db: -24}, {f: 'clink', at: T.ancient + 0.4, db: -18},
  ];
  // camera along the timeline
  const cam = keys(t, [
    [T.Giza - 0.25, X(-2560) + 250, 1150, 1], [T.finished + 0.3, X(-2560) + 250, 1150, 1],
    [T.born - 0.2, 920, 1300, 0.5], [T.landing - 0.35, 920, 1300, 0.5],
    [T.landing + 0.3, X(1969) - 200, 1200, 0.95], [T.only - 0.2, X(1969) - 200, 1200, 0.95],
    [T.only + 0.5, 2400, 1250, 0.52], [T.ancient - 1.4, 2400, 1250, 0.52], [T.ancient - 0.25, 1610, 1300, 0.31],
  ]);
  const bg = scene === 'line' ? '#FCE9C2' : '#BFE8FF';
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bg} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1100, 1.15], [T.Giza - 0.3, 540, 1100, 1]])}>
              <rect x={-400} y={1650} width={1900} height={700} fill={SAND} stroke={INK} strokeWidth={LW} />
              <g transform={`translate(200 1650) scale(${pop(t, 0.2, 10, 6)})`}><Pyramid s={0.8} /></g>
              <g transform={`translate(880 ${1300 + 15 * Math.sin(t * 2)}) scale(${pop(t, 0.5, 10, 6)})`}><Moon s={0.7} /></g>
              <g transform={`translate(540 1650) scale(0.85) rotate(${3 * Math.sin(t * 2.4)})`}><Cleo t={t} handR={[150, -360]} /></g>
            </Layer>
            <Label x={540} y={640} size={92} s={pop(t, 0.3, 12, 6)} color="#FFE45C">CLEOPATRA</Label>
            <Sticker t={t} t0={T.closer} x={540} y={790} text="CLOSER TO THE MOON LANDING?!" size={41} fill="#2C7BE5" rot={-3} />
          </g>
        )}

        {scene === 'line' && (
          <g>
            <Layer cam={cam}>
              <rect x={-3000} y={1500} width={9000} height={3200} fill={SAND} />
              <path d={`M -3000 1500 L 6000 1500`} stroke={INK} strokeWidth={LW} />
              <path d={`M -3000 1560 L 6000 1560`} stroke={INK} strokeWidth={12} strokeDasharray="4 40" />
              <g transform={`translate(${X(-2560)} 1500) scale(${pop(t, T.Giza, 10, 6)})`}><Pyramid /></g>
              <g transform={`translate(${X(-2560)} 1680)`}><Label x={0} y={0} size={70} color={INK} s={pop(t, T.finished, 12, 6)}>2560 BC</Label></g>
              <g transform={`translate(${X(-69)} 1500) scale(${0.9 * pop(t, T.born - 0.2, 10, 6)})`}><Cleo t={t} handR={[150, -360]} /></g>
              <g transform={`translate(${X(-69)} 1680)`}><Label x={0} y={0} size={70} color={INK} s={pop(t, T.born + 0.2, 12, 6)}>69 BC</Label></g>
              <g transform={`translate(${X(1969) - 120} ${1500 - 900 * prog(t, T.landing + 0.2, T.landing + 1.6) * 0}) scale(${pop(t, T.landing, 10, 6)})`}><Rocket t={t} s={1.1} /></g>
              <g transform={`translate(${X(1969) + 160} 1200) scale(${pop(t, T.landing + 0.2, 10, 6)})`}><Moon s={1} /></g>
              <g transform={`translate(${X(1969)} 1680)`}><Label x={0} y={0} size={70} color={INK} s={pop(t, T.landing + 0.3, 12, 6)}>AD 1969</Label></g>
              <Bracket x0={X(-2560)} x1={X(-69)} y={1820} u={prog(t, T.nearly - 0.1, T.nearly + 0.6)} text="2,500 YEARS" col="#E5414A" />
              <Bracket x0={X(-69)} x1={X(1969)} y={1820} u={prog(t, T.only - 0.1, T.only + 0.6)} text="2,000 YEARS" col="#2C7BE5" />
            </Layer>
            <Label x={540} y={640} size={75} s={pop(t, T.Giza, 12, 6)} color="#fff">{t < T.born - 0.1 ? 'GREAT PYRAMID BUILT' : t < T.landing - 0.1 ? 'CLEOPATRA BORN' : t < T.only ? 'MOON LANDING' : 'CLOSER TO THE MOON!'}</Label>
          </g>
        )}

        {scene === 'tourist' && (
          <g>
            <Layer cam={keys(t, [[T.ancient - 0.25, 540, 1100, 1], [T.card, 520, 1180, 1.12]])}>
              <rect x={-400} y={1650} width={1900} height={700} fill={SAND} stroke={INK} strokeWidth={LW} />
              <g transform="translate(780 1650)"><Pyramid s={1.1} /></g>
              {/* cracks and cobwebs: it was already old */}
              <path d="M 700 1430 L 740 1480 L 720 1530" stroke={INK} strokeWidth={6} fill="none" />
              <path d="M 880 1520 L 860 1570 L 900 1610" stroke={INK} strokeWidth={6} fill="none" />
              <g transform={`translate(330 1650) scale(0.85)`}>
                <Cleo t={t} handR={[160, -300]}>
                  <g transform={`translate(10 -10) scale(${1 + 0.06 * Math.sin(t * 6)})`}>
                    <rect x={-50} y={-36} width={100} height={72} rx={12} fill="#333" stroke={INK} strokeWidth={6} />
                    <circle r={22} fill="#7CC7F0" stroke={INK} strokeWidth={5} />
                  </g>
                </Cleo>
              </g>
              {t > T.ancient + 0.4 && t < T.ancient + 0.6 && <rect x={-400} y={-400} width={1900} height={2800} fill="#fff" opacity={0.7} />}
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.ancient, 12, 6)} color="#FFE45C">ANCIENT HISTORY</Label>
            <Sticker t={t} t0={T.ancient + 0.6} x={540} y={790} text="EVEN TO CLEOPATRA" size={54} fill="#E5414A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="37-cleopatra-moon" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
