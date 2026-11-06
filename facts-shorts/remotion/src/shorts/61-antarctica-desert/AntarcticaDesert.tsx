import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SAND = '#F2C46B', SAND2 = '#D9A24A', ICE = '#EAF6FF', ICE2 = '#BFE0F5', SKY = '#BFE8FF';

const Penguin: React.FC<{t: number; shiver?: boolean}> = ({t, shiver}) => (
  <g transform={`translate(${shiver ? 4 * Math.sin(t * 40) : 0} 0)`}>
    <ellipse cx={0} cy={-130} rx={90} ry={130} fill="#22252E" stroke={INK} strokeWidth={LW} />
    <ellipse cx={0} cy={-110} rx={60} ry={100} fill="#fff" />
    <circle cx={0} cy={-260} r={65} fill="#22252E" stroke={INK} strokeWidth={LW} />
    <circle cx={-20} cy={-270} r={10} fill="#fff" /><circle cx={20} cy={-270} r={10} fill="#fff" />
    <circle cx={-20} cy={-270} r={5} fill={INK} /><circle cx={20} cy={-270} r={5} fill={INK} />
    <path d="M -15 -245 L 0 -225 L 15 -245 Z" fill="#F2A13A" stroke={INK} strokeWidth={4} />
    <path d="M -40 0 L -10 0 M 10 0 L 40 0" stroke="#F2A13A" strokeWidth={14} strokeLinecap="round" />
    <rect x={-70} y={-200} width={140} height={34} rx={14} fill="#E5414A" stroke={INK} strokeWidth={5} />
  </g>
);

const Cactus: React.FC = () => (
  <g>
    <rect x={-30} y={-260} width={60} height={260} rx={30} fill="#4FA35A" stroke={INK} strokeWidth={LW} />
    <path d="M -30 -140 L -80 -140 L -80 -200" stroke={INK} strokeWidth={LW + 30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -30 -140 L -80 -140 L -80 -200" stroke="#4FA35A" strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

const Gauge: React.FC<{lvl: number; label: string; col: string}> = ({lvl, label, col}) => (
  <g>
    <rect x={-70} y={-500} width={140} height={500} rx={14} fill="#fff" fillOpacity={0.7} stroke={INK} strokeWidth={LW} />
    <rect x={-58} y={-12 - 476 * lvl} width={116} height={476 * lvl} rx={8} fill="#5FB6F0" />
    <text y={70} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill={col} stroke={INK} strokeWidth={8} paintOrder="stroke">{label}</text>
  </g>
);

export const AntarcticaDesert: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Antarctica - 0.25 ? 'sahara' : t < T.rain - 0.25 ? 'ant' : t < T.valleys - 0.25 ? 'rain' : t < T.Cold - 0.25 ? 'valley' : 'cold';
  const cues: Cue[] = [
    {f: 'sizzle', at: 0.2, db: -24}, {f: 'blegh', at: T.Sahara + 0.4, db: -20},
    {f: 'whoosh', at: T.Antarctica - 0.25, db: -24}, {f: 'ding', at: T.Antarctica + 0.2, db: -18}, {f: 'pop', at: T.Antarctica + 0.8, db: -20},
    {f: 'whoosh', at: T.rain - 0.25, db: -24}, {f: 'pour', at: T.rain + 0.3, db: -20}, {f: 'tick', at: T.less, db: -20},
    {f: 'whoosh', at: T.valleys - 0.25, db: -24}, {f: 'rumble', at: T.valleys + 0.2, db: -22},
    {f: 'whoosh', at: T.Cold - 0.25, db: -24}, {f: 'wobble', at: T.Cold + 0.2, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'sahara' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#FFE2A8" />
            <Layer cam={keys(t, [[0, 540, 1070, 1], [T.Antarctica - 0.3, 540, 1070, 1.06]])}>
              <circle cx={850} cy={1000} r={120} fill="#FFD23C" stroke={INK} strokeWidth={LW} />
              <path d="M -400 1500 Q 100 1300 540 1480 Q 900 1350 1500 1500 L 1500 2400 L -400 2400 Z" fill={SAND} stroke={INK} strokeWidth={LW} />
              <path d="M -400 1700 Q 300 1580 700 1680 Q 1100 1600 1500 1700 L 1500 2400 L -400 2400 Z" fill={SAND2} stroke={INK} strokeWidth={LW} />
              <g transform="translate(300 1520)"><Cactus /></g>
              <g transform={`translate(540 1220) rotate(-8) scale(${pop(t, T.Sahara + 0.3, 12, 6)})`}>
                <circle r={110} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={45} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={120} fill={SAND2}>#1</text>
                <path d="M -80 -80 L 80 80 M 80 -80 L -80 80" stroke="#E5414A" strokeWidth={26 * prog(t, T.Sahara + 0.6, T.Sahara + 0.9)} strokeLinecap="round" />
              </g>
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, 0.1, 12, 6)} color="#fff">THE BIGGEST DESERT?</Label>
            <Sticker t={t} t0={T.Sahara + 0.2} x={540} y={790} text="NOT THE SAHARA" size={64} fill="#E5414A" />
          </g>
        )}

        {scene === 'ant' && (
          <g>
            <Layer cam={keys(t, [[T.Antarctica - 0.25, 540, 1070, 1.1], [T.rain - 0.3, 540, 1070, 1]])}>
              <path d="M -400 1450 L 150 1450 L 260 1300 L 420 1400 L 560 1250 L 720 1380 L 880 1290 L 1500 1450 L 1500 2400 L -400 2400 Z" fill={ICE} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
              <path d="M -400 1700 L 1500 1700" stroke={ICE2} strokeWidth={20} />
              <g transform={`translate(780 1700) scale(0.8)`}><Penguin t={t} /></g>
              <g transform={`translate(320 ${1200 - 10 * Math.sin(t * 3)}) scale(${pop(t, T.Antarctica + 0.6, 12, 6)})`}>
                <path d="M -90 -120 L 90 -120 L 70 0 Q 0 60 -70 0 Z" fill="#FFD23C" stroke={INK} strokeWidth={LW} />
                <rect x={-20} y={40} width={40} height={60} fill="#FFD23C" stroke={INK} strokeWidth={6} />
                <rect x={-70} y={100} width={140} height={34} rx={8} fill="#B88A3A" stroke={INK} strokeWidth={6} />
                <text y={-40} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill={INK}>#1</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={92} s={pop(t, T.Antarctica, 12, 6)} color="#fff">IT'S ANTARCTICA</Label>
          </g>
        )}

        {scene === 'rain' && (
          <g>
            <Layer cam={keys(t, [[T.rain - 0.25, 540, 1070, 1], [T.valleys - 0.3, 540, 1070, 1.06]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill="#D9D2C2" stroke={INK} strokeWidth={LW} />
              <g transform="translate(320 1650)"><Gauge lvl={0.6 * prog(t, T.rain + 0.2, T.less)} label="HOT DESERTS" col="#fff" /></g>
              <g transform="translate(760 1650)"><Gauge lvl={0.25 * prog(t, T.less, T.valleys - 0.4)} label="ANTARCTICA" col={ICE} /></g>
              {Array.from({length: 10}).map((_, i) => { const a = ((t * 1.3 + i / 10) % 1); return <path key={i} d={`M ${200 + (i % 5) * 140} ${1000 + 600 * a} l -6 30`} stroke="#5FB6F0" strokeWidth={8} strokeLinecap="round" opacity={0.7} />; })}
            </Layer>
            <Label x={540} y={640} size={62} s={pop(t, T.rain, 12, 6)} color="#fff">DESERT = TINY RAIN/SNOW</Label>
            <Sticker t={t} t0={T.less + 0.2} x={540} y={790} text="ANTARCTICA GETS EVEN LESS" size={46} fill="#2C7BE5" />
          </g>
        )}

        {scene === 'valley' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#D7E6F0" />
            <Layer cam={keys(t, [[T.valleys - 0.25, 540, 1070, 1], [T.Cold - 0.3, 560, 1090, 1.1]])}>
              <path d="M -400 1250 L 100 1150 L 300 1450 L 780 1450 L 980 1150 L 1500 1250 L 1500 2400 L -400 2400 Z" fill={ICE} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
              <path d="M 300 1450 Q 540 1550 780 1450 L 980 2400 L 100 2400 Z" fill="#9A7A5A" stroke={INK} strokeWidth={LW} />
              {[0, 1, 2].map((i) => { const a = ((t * 0.5 + i / 3) % 1); return <circle key={i} cx={lerp(300, 800, a)} cy={1600 - 60 * Math.sin(a * Math.PI)} r={40 + 30 * a} fill="#B89A7A" opacity={0.6 * (1 - a)} />; })}
              <g transform={`translate(540 1250) scale(${pop(t, T.valleys + 0.6, 12, 6)})`}>
                <circle r={90} fill="#fff" stroke={INK} strokeWidth={LW} />
                <path d="M -40 -30 Q 0 -70 40 -30 Q 50 10 0 10 Q -50 10 -40 -30 Z" fill="#9FB0C8" stroke={INK} strokeWidth={5} />
                <path d="M -60 -60 L 60 60" stroke="#E5414A" strokeWidth={16} strokeLinecap="round" />
              </g>
            </Layer>
            <Label x={540} y={640} size={71} s={pop(t, T.valleys, 12, 6)} color="#fff">SOME VALLEYS HAVEN'T</Label>
            <Sticker t={t} t0={T.valleys + 0.4} x={540} y={790} text="SEEN RAIN IN THOUSANDS OF YEARS" size={37} fill="#E5414A" />
          </g>
        )}

        {scene === 'cold' && (
          <g>
            <Layer cam={keys(t, [[T.Cold - 0.25, 540, 1070, 1], [T.card, 540, 1090, 1.08]])}>
              <path d="M -400 1600 L 1500 1600 L 1500 2400 L -400 2400 Z" fill={ICE} stroke={INK} strokeWidth={LW} />
              <g transform="translate(400 1650)"><Penguin t={t} shiver /></g>
              <g transform={`translate(760 1640) scale(${0.8 * pop(t, T.Cold + 0.5, 10, 6)})`}><Cactus /></g>
              {Array.from({length: 14}).map((_, i) => { const a = ((t * 0.4 + i / 14) % 1); return <circle key={i} cx={(i * 97) % 1080 + 20 * Math.sin(t + i)} cy={900 + 800 * a} r={8} fill="#fff" opacity={0.9} />; })}
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.Cold, 12, 6)} color="#fff">COLD AND ICY...</Label>
            <Sticker t={t} t0={T.Cold + 0.5} x={540} y={790} text="BUT STILL A DESERT" size={64} fill={SAND2} />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="61-antarctica-desert" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
