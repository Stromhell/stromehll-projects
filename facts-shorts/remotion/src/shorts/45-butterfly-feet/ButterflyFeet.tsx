import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const WING = '#F28C28', WING2 = '#FFD25C', LEAF = '#5DB55A', LEAF2 = '#3F8A4A';

// front-view butterfly; flap 0..1 squeezes the wings, tap moves the feet
const Butterfly: React.FC<{t: number; flap: number; tap?: number; glow?: number}> = ({t, flap, tap = 0, glow = 0}) => {
  const k = lerp(1, 0.25, flap);
  const wing = (sx: number) => (
    <g transform={`scale(${sx * k} 1)`}>
      <path d="M 0 -40 C 80 -260 330 -230 300 -80 C 285 0 120 20 0 0 Z" fill={WING} stroke={INK} strokeWidth={LW} />
      <path d="M 0 10 C 120 20 250 60 210 170 C 170 250 60 180 0 40 Z" fill={WING2} stroke={INK} strokeWidth={LW} />
      <circle cx={190} cy={-120} r={34} fill="#fff" stroke={INK} strokeWidth={6} />
      <circle cx={140} cy={110} r={22} fill={WING} stroke={INK} strokeWidth={6} />
    </g>
  );
  return (
    <g>
      {wing(1)}{wing(-1)}
      {[-1, 1].map((s) => [0, 1, 2].map((i) => {
        const up = i === 1 ? tap : 0;
        const fx = s * (30 + i * 22), fy = 170 + i * 6 - up * 30;
        return (
          <g key={`${s}${i}`}>
            <path d={`M ${s * 10} ${40 + i * 30} L ${fx} ${fy}`} stroke={INK} strokeWidth={7} strokeLinecap="round" />
            {glow > 0 && <circle cx={fx} cy={fy} r={10 + 6 * glow} fill="#9BFF6A" stroke={INK} strokeWidth={4} opacity={glow} />}
          </g>
        );
      }))}
      <ellipse cx={0} cy={40} rx={26} ry={150} fill="#4A3524" stroke={INK} strokeWidth={LW} />
      <circle cx={0} cy={-120} r={46} fill="#4A3524" stroke={INK} strokeWidth={LW} />
      <path d="M -14 -160 Q -60 -260 -90 -270 M 14 -160 Q 60 -260 90 -270" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      <circle cx={-90} cy={-270} r={12} fill={INK} /><circle cx={90} cy={-270} r={12} fill={INK} />
      {t % 3.1 < 0.12 ? <path d="M -28 -125 L -8 -125 M 8 -125 L 28 -125" stroke="#fff" strokeWidth={6} /> : <><circle cx={-18} cy={-126} r={10} fill="#fff" /><circle cx={18} cy={-126} r={10} fill="#fff" /></>}
      <path d="M -14 -98 Q 0 -86 14 -98" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Leaf: React.FC<{s?: number; bite?: number}> = ({s = 1, bite = 0}) => (
  <g transform={`scale(${s})`}>
    <path d="M -420 0 Q -200 -230 420 0 Q -200 230 -420 0 Z" fill={LEAF} stroke={INK} strokeWidth={LW} />
    <path d="M -420 0 L 400 0" stroke={LEAF2} strokeWidth={10} />
    {[-250, -80, 90, 240].map((x) => <path key={x} d={`M ${x} 0 L ${x + 90} -90 M ${x} 0 L ${x + 90} 90`} stroke={LEAF2} strokeWidth={7} />)}
    {bite > 0 && <circle cx={420} cy={0} r={150 * bite} fill="#BFE8FF" />}
  </g>
);

const Caterpillar: React.FC<{t: number}> = ({t}) => (
  <g>
    {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-i * 52} cy={-10 * Math.abs(Math.sin(t * 6 + i * 0.7))} r={36} fill="#8BD14E" stroke={INK} strokeWidth={7} />)}
    <circle cx={30} cy={-20} r={44} fill="#8BD14E" stroke={INK} strokeWidth={7} />
    <circle cx={44} cy={-30} r={9} fill={INK} />
    <path d={`M 50 0 Q 62 ${6 + 6 * Math.sin(t * 14)} 74 -2`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

export const ButterflyFeet: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.covered - 0.25 ? 'intro' : t < T.lands - 0.25 ? 'sensors' : t < T.eggs - 0.25 ? 'drum' : t < T.landing - 0.25 ? 'eggs' : 'test';
  const flap = (Math.sin(t * 16) + 1) / 2;
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.2, db: -22}, {f: 'slurp', at: T.taste + 0.1, db: -20},
    {f: 'whoosh', at: T.covered - 0.25, db: -24}, {f: 'ding', at: T.covered + 0.3, db: -22},
    {f: 'whoosh', at: T.lands - 0.25, db: -24}, {f: 'plop', at: T.lands + 0.3, db: -20},
    {f: 'knock', at: T.drums, db: -18}, {f: 'knock', at: T.drums + 0.3, db: -18}, {f: 'knock', at: T.drums + 0.6, db: -18}, {f: 'ding', at: T.drums + 1.0, db: -20},
    {f: 'whoosh', at: T.eggs - 0.25, db: -24}, {f: 'pop', at: T.eggs + 0.1, db: -18}, {f: 'pop', at: T.eggs + 0.3, db: -18}, {f: 'pop', at: T.eggs + 0.5, db: -18},
    {f: 'crack', at: T.meal - 0.4, db: -20}, {f: 'slurp', at: T.meal + 0.2, db: -20},
    {f: 'whoosh', at: T.landing - 0.25, db: -24}, {f: 'ding', at: T.landing + 0.6, db: -18},
  ];
  const tapNow = t > T.drums ? Math.abs(Math.sin((t - T.drums) * 10)) * (t < T.eggs - 0.4 ? 1 : 0) : 0;
  return (
    <AbsoluteFill style={{background: '#BFE8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#BFE8FF" />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 900, 1], [T.covered - 0.3, 540, 940, 1.05]])}>
              <rect x={-400} y={1650} width={1900} height={800} fill="#7CC576" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(${540 + 60 * Math.sin(t * 1.3)} ${1250 + 30 * Math.sin(t * 2.1)}) scale(1.1)`}><Butterfly t={t} flap={flap} glow={prog(t, T.taste + 0.6, T.taste + 1.1)} /></g>
              <g transform={`translate(830 1500) scale(${pop(t, T.taste + 0.6, 12, 6)})`}>
                <circle r={90} fill="#fff" stroke={INK} strokeWidth={LW} />
                <path d="M -40 -10 Q 0 50 40 -10 L 30 40 Q 0 70 -30 40 Z" fill="#F07A8B" stroke={INK} strokeWidth={6} />
              </g>
            </Layer>
            <Label x={540} y={640} size={86} s={pop(t, T.taste, 12, 6)} color="#FFE45C">THEY TASTE WITH</Label>
            <Label x={540} y={760} size={110} s={pop(t, T.taste + 0.4, 12, 6)} color="#fff">THEIR FEET</Label>
          </g>
        )}

        {scene === 'sensors' && (
          <g>
            <Layer cam={keys(t, [[T.covered - 0.25, 540, 1150, 1], [T.lands - 0.3, 540, 1150, 1.05]])}>
              <g transform="translate(0 150)">
              <path d="M 380 900 L 520 1250 L 640 1700" stroke="#4A3524" strokeWidth={60} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {Array.from({length: 14}).map((_, i) => {
                const u = i / 13, x = u < 0.45 ? lerp(380, 520, u / 0.45) : lerp(520, 640, (u - 0.45) / 0.55), y = u < 0.45 ? lerp(900, 1250, u / 0.45) : lerp(1250, 1700, (u - 0.45) / 0.55);
                const k = pop(t, T.covered + 0.1 + i * 0.08, 12, 6);
                return <circle key={i} cx={x + (i % 2 ? 34 : -34)} cy={y} r={18 * k * (1 + 0.15 * Math.sin(t * 6 + i))} fill="#9BFF6A" stroke={INK} strokeWidth={5} />;
              })}
            </g>
            </Layer>
            <Label x={540} y={640} size={79} s={pop(t, T.covered, 12, 6)} color="#fff">TINY TASTE SENSORS</Label>
            <Sticker t={t} t0={T.covered + 1.2} x={540} y={1820} text="ON EVERY FOOT" size={60} fill="#E5414A" />
          </g>
        )}

        {scene === 'drum' && (() => {
          const land = prog(t, T.lands - 0.2, T.lands + 0.6);
          return (
            <g>
              <Layer cam={keys(t, [[T.lands - 0.25, 540, 1000, 1], [T.drums, 540, 1060, 1.08], [T.eggs - 0.3, 540, 1070, 1.12]])}>
                <path d="M -200 1600 Q 300 1500 540 1460" stroke={LEAF2} strokeWidth={30} fill="none" strokeLinecap="round" />
                <g transform="translate(560 1450)"><Leaf /></g>
                <g transform={`translate(${lerp(1200, 560, land)} ${lerp(950, 1270, land) - 20 * tapNow}) scale(0.9)`}><Butterfly t={t} flap={land < 1 ? flap : 0.15 + 0.1 * Math.sin(t * 3)} tap={tapNow} glow={tapNow} /></g>
                {t > T.drums && t < T.eggs - 0.4 && [0, 1].map((i) => <path key={i} d={`M ${430 - i * 260} 1440 l -40 -30 M ${700 + i * 220} 1440 l 40 -30`} stroke={INK} strokeWidth={8} strokeLinecap="round" opacity={tapNow} />)}
              </Layer>
              <Label x={540} y={640} size={82} s={pop(t, T.lands, 12, 6)} color="#fff">{t < T.drums ? 'LANDS ON A LEAF' : 'DRUMS IT TO TASTE'}</Label>
              <Sticker t={t} t0={T.drums + 0.2} x={540} y={790} text="TAP TAP TAP" size={64} fill="#7A4DC8" />
            </g>
          );
        })()}

        {scene === 'eggs' && (() => {
          const hatch = t > T.meal - 0.4;
          return (
            <g>
              <Layer cam={keys(t, [[T.eggs - 0.25, 540, 1300, 1.1], [T.meal - 0.4, 540, 1350, 1.2], [T.landing - 0.3, 600, 1350, 1.3]])}>
                <g transform="translate(560 1450)"><Leaf bite={prog(t, T.meal, T.landing - 0.3)} /></g>
                {!hatch && [0, 1, 2].map((i) => <ellipse key={i} cx={420 + i * 110} cy={1430 - 20 * pop(t, T.eggs + i * 0.2, 12, 6)} rx={38 * pop(t, T.eggs + i * 0.2, 12, 6)} ry={46 * pop(t, T.eggs + i * 0.2, 12, 6)} fill="#FFF6D6" stroke={INK} strokeWidth={6} />)}
                {hatch && <g transform={`translate(${lerp(560, 820, prog(t, T.meal, T.landing - 0.3))} 1400)`}><Caterpillar t={t} /></g>}
              </Layer>
              <Label x={540} y={640} size={86} s={pop(t, T.eggs, 12, 6)} color="#fff">{hatch ? "BABY'S FIRST MEAL" : 'TASTES RIGHT?'}</Label>
              {!hatch && <Sticker t={t} t0={T.eggs + 0.3} x={540} y={790} text="LAY EGGS HERE" size={62} fill="#2FA35A" />}
            </g>
          );
        })()}

        {scene === 'test' && (
          <g>
            <Layer cam={keys(t, [[T.landing - 0.25, 540, 900, 1], [T.card, 540, 940, 1.05]])}>
              <rect x={-400} y={1650} width={1900} height={800} fill="#7CC576" stroke={INK} strokeWidth={LW} />
              <path d="M 540 1650 L 540 1350" stroke={LEAF2} strokeWidth={22} />
              {[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx={540 + 80 * Math.cos(i * 1.047)} cy={1300 + 80 * Math.sin(i * 1.047)} rx={60} ry={60} fill="#F07AB8" stroke={INK} strokeWidth={7} />)}
              <circle cx={540} cy={1300} r={50} fill="#FFD25C" stroke={INK} strokeWidth={7} />
              <g transform={`translate(540 ${lerp(1000, 1110, prog(t, T.landing, T.landing + 0.6))}) scale(0.85)`}><Butterfly t={t} flap={t < T.landing + 0.6 ? flap : 0.2} glow={prog(t, T.landing + 0.5, T.landing + 0.8)} /></g>
              <g transform={`translate(860 1000) scale(${pop(t, T.landing + 0.6, 12, 6)})`}>
                <circle r={80} fill="#2FA35A" stroke={INK} strokeWidth={LW} />
                <path d="M -35 0 L -8 28 L 38 -28" stroke="#fff" strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.landing, 12, 6)} color="#fff">EVERY LANDING</Label>
            <Sticker t={t} t0={T.landing + 0.4} x={540} y={790} text="IS A TASTE TEST" size={64} fill="#E5414A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="45-butterfly-feet" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
