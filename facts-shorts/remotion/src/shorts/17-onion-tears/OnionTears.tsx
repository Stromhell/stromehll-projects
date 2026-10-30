import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, SweatDrop, clamp, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const Onion: React.FC<{t: number; s?: number; cut?: number; cold?: boolean; mood?: 'evil' | 'calm'}> = ({t, s = 1, cut = 0, cold, mood = 'evil'}) => (
  <g transform={`scale(${s})`}>
    <g transform={`translate(${-30 * cut} 0) rotate(${-8 * cut})`}>
      <path d="M 0 -200 Q -20 -150 -60 -120 Q -170 -60 -150 50 Q -120 150 0 150 L 0 -200 Z" fill={cold ? '#D8E6F5' : '#E9C1E6'} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -40 -110 Q -110 -20 -60 120" stroke="#C78BC4" strokeWidth={8} fill="none" />
    </g>
    <g transform={`translate(${30 * cut} 0) rotate(${8 * cut})`}>
      <path d="M 0 -200 Q 20 -150 60 -120 Q 170 -60 150 50 Q 120 150 0 150 L 0 -200 Z" fill={cold ? '#D8E6F5' : '#E9C1E6'} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M 40 -110 Q 110 -20 60 120" stroke="#C78BC4" strokeWidth={8} fill="none" />
    </g>
    <path d="M -10 -200 Q -30 -260 -10 -290 M 10 -200 Q 30 -250 20 -280" stroke="#6E9A3C" strokeWidth={10} fill="none" strokeLinecap="round" />
    {cut < 0.2 && (mood === 'evil'
      ? <g><path d="M -70 -30 L -24 -14 M 70 -30 L 24 -14" stroke={INK} strokeWidth={8} strokeLinecap="round" /><circle cx={-44} cy={0} r={9} fill={INK} /><circle cx={44} cy={0} r={9} fill={INK} /><path d="M -40 50 Q 0 80 40 50" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /></g>
      : <g><path d="M -60 0 q 16 -12 32 0 M 28 0 q 16 -12 32 0" stroke={INK} strokeWidth={7} fill="none" /><path d="M -20 50 q 20 10 40 0" stroke={INK} strokeWidth={6} fill="none" /></g>)}
    {cold && [-120, 110].map((x) => <path key={x} d={`M ${x} -140 l 0 40 m -18 -30 l 36 20 m 0 -20 l -36 20`} stroke="#3D8CF0" strokeWidth={6} />)}
  </g>
);

const Knife: React.FC<{y?: number}> = ({y = 0}) => (
  <g transform={`translate(0 ${y})`}>
    <path d="M -20 -260 L 20 -260 L 26 40 Q 0 90 -26 40 Z" fill="#DDE4EA" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <rect x={-30} y={-420} width={60} height={170} rx={20} fill="#8A5A3C" stroke={INK} strokeWidth={LW} />
  </g>
);

const GasPuff: React.FC<{t: number; k: number; s?: number}> = ({t, k, s = 1}) => (
  <g transform={`scale(${s * (0.4 + 0.6 * k)})`} opacity={k > 0 ? 0.9 : 0}>
    {[[-60, 0, 60], [10, -30, 70], [70, 10, 55], [0, 40, 60]].map(([x, y, r], i) => <circle key={i} cx={x + 6 * Math.sin(t * 3 + i)} cy={y} r={r} fill="#D8F27A" stroke={INK} strokeWidth={6} />)}
    <path d="M -40 -6 L -14 6 M 40 -6 L 14 6" stroke={INK} strokeWidth={7} strokeLinecap="round" />
    <path d="M -20 36 l 10 -8 l 10 8 l 10 -8 l 10 8" stroke={INK} strokeWidth={5} fill="none" />
  </g>
);

export const OnionTears: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.sulfur - 0.25 ? 'intro' : t < T.floats - 0.25 ? 'cell' : t < T.nerves - 0.2 ? 'float' : t < T.chill - 0.25 ? 'tears' : 'tip';
  const cues: Cue[] = [
    {f: 'knock', at: 0.3, db: -20}, {f: 'knock', at: 0.65, db: -20}, {f: 'sad', at: T.cry, db: -22},
    {f: 'whoosh', at: T.sulfur - 0.25, db: -24}, {f: 'pop', at: T.sulfur, db: -20}, {f: 'pop', at: T.enzyme, db: -20},
    {f: 'crack', at: T.knife, db: -18}, {f: 'sizzle', at: T.mix, db: -22}, {f: 'whoosh', at: T.gas, db: -22},
    {f: 'whoosh', at: T.floats - 0.25, db: -24}, {f: 'rise', at: T.floats, db: -24},
    {f: 'zap', at: T.sting, db: -20}, {f: 'splash', at: T.flood, db: -20},
    {f: 'whoosh', at: T.chill - 0.25, db: -24}, {f: 'clink', at: T.chill, db: -18}, {f: 'ding', at: T.less, db: -18},
  ];
  const chop = (t0: number) => Math.abs(Math.sin((t - t0) * 7)) * 160;
  return (
    <AbsoluteFill style={{background: '#FFF1D6'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#F7E3C6" />
        {Array.from({length: 6}).map((_, r) => Array.from({length: 4}).map((_, c) => <rect key={`${r}${c}`} x={c * 270 + 10} y={r * 270 + 10} width={250} height={250} rx={14} fill="#FFF4E4" />))}
        <rect x={0} y={1500} width={W} height={420} fill="#C98B5A" stroke={INK} strokeWidth={LW} />
        {scene === 'intro' && (
          <g>
            <g transform="translate(340 1560)"><Guy t={t} expr="worried" handL={[-80, -150]} handR={[180, lerp(-260, -140, chop(0) / 160)]} look={[10, 10]} stand sweat={0} /></g>
            {[0, 1].map((i) => <SweatDrop key={i} x={300 + i * 80} y={1080 + ((t * 300 + i * 120) % 260)} s={0.8} />)}
            <rect x={460} y={1440} width={480} height={60} rx={14} fill="#E7B984" stroke={INK} strokeWidth={LW} />
            <g transform="translate(720 1330)"><Onion t={t} s={0.6} /></g>
            <g transform={`translate(560 ${1170 + chop(0) * 0.5})`}><Knife /></g>
            <Label x={540} y={620} size={92} s={pop(t, T.cry, 12, 6)} color="#BFE6FF">WHY THE TEARS?</Label>
          </g>
        )}
        {scene === 'cell' && (
          <g>
            <Layer cam={[540, 1000, 1]}>
              <g transform={`translate(540 1050) scale(${1 + 0.02 * Math.sin(t * 3)})`}>
                <rect x={-380} y={-260} width={760} height={520} rx={120} fill="#F3D8F0" stroke={INK} strokeWidth={LW} />
                <path d={`M 0 -260 L 0 ${lerp(260, -260, 0) }`} stroke={INK} strokeWidth={LW} opacity={1 - prog(t, T.knife, T.knife + 0.2)} />
                {Array.from({length: 6}).map((_, i) => {
                  const m = prog(t, T.mix - 0.1, T.mix + 0.6);
                  const sx = lerp(-200 + (i % 2) * 70, -30 + i * 14, m), sy = -140 + Math.floor(i / 2) * 120 + 20 * Math.sin(t * 4 + i);
                  return <g key={i} transform={`translate(${sx} ${sy}) scale(${pop(t, T.sulfur + i * 0.06, 12, 6)})`}><circle r={40} fill="#FFD84D" stroke={INK} strokeWidth={6} /><Label x={0} y={16} size={44} color={INK} keep>S</Label></g>;
                })}
                {Array.from({length: 4}).map((_, i) => {
                  const m = prog(t, T.mix - 0.1, T.mix + 0.6);
                  const ex = lerp(210 + (i % 2) * 70, 40 + i * 20, m), ey = -110 + Math.floor(i / 2) * 170 + 20 * Math.cos(t * 4 + i);
                  return <g key={i} transform={`translate(${ex} ${ey}) rotate(${t * 60}) scale(${pop(t, T.enzyme + i * 0.06, 12, 6)})`}><path d="M -40 -30 L 40 -30 L 40 30 L 10 30 L 10 0 L -10 0 L -10 30 L -40 30 Z" fill="#7DD35A" stroke={INK} strokeWidth={6} /></g>;
                })}
              </g>
              <g transform={`translate(540 ${lerp(-200, 1300, prog(t, T.knife - 0.25, T.knife + 0.1)) - 1500 * prog(t, T.knife + 0.5, T.knife + 0.9)})`}><Knife /></g>
              <g transform="translate(540 850)"><GasPuff t={t} k={prog(t, T.gas - 0.1, T.gas + 0.5)} s={1.2} /></g>
            </Layer>
            <Sticker t={t} t0={T.apart} t1={T.knife} x={540} y={1500} text="KEPT APART" size={84} fill="#2C7BE5" />
            <Sticker t={t} t0={T.gas} x={540} y={1500} text="IRRITATING GAS" size={80} fill="#6E9A3C" />
            <Label x={540} y={560} size={70} s={pop(t, T.sulfur, 12, 6)} color="#FFE45C">SULFUR + ENZYME</Label>
          </g>
        )}
        {scene === 'float' && (
          <g>
            <g transform="translate(540 1440)"><Onion t={t} s={0.6} cut={1} /></g>
            {[0, 1, 2].map((i) => {
              const k = prog(t, T.floats + i * 0.25, T.floats + 1.4 + i * 0.25);
              return <g key={i} transform={`translate(${540 + (i - 1) * 120 + 60 * Math.sin(t * 2 + i)} ${lerp(1300, 820, k)})`}><GasPuff t={t} k={clamp(k * 4)} s={0.7} /></g>;
            })}
            <g transform="translate(540 600)">
              <ellipse rx={220} ry={110} fill="#fff" stroke={INK} strokeWidth={LW} />
              <circle cx={10 * Math.sin(t * 5)} r={70} fill="#5A8F3C" stroke={INK} strokeWidth={6} /><circle cx={10 * Math.sin(t * 5)} r={34} fill={INK} />
            </g>
            <Label x={540} y={1760} size={58} s={pop(t, T.eyes, 12, 6)} color="#fff">STRAIGHT TO YOUR EYES</Label>
          </g>
        )}
        {scene === 'tears' && (
          <g>
            <Layer cam={keys(t, [[T.nerves - 0.2, 540, 960, 1], [T.flood, 540, 980, 1.1]])}>
              <g transform={`translate(${540 + shake(t, prog(t, T.sting, T.sting + 0.2) * (1 - prog(t, T.sting + 0.6, T.sting + 0.9)) * 12)[0]} 960)`}>
                <ellipse rx={420} ry={240} fill="#fff" stroke={INK} strokeWidth={LW} />
                {[[-300, -80], [-200, -170], [200, -170], [300, -80]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l ${x * 0.15} -40`} stroke="#E5414A" strokeWidth={8} strokeLinecap="round" opacity={prog(t, T.sting, T.sting + 0.3)} />)}
                <circle r={150} fill="#5A8F3C" stroke={INK} strokeWidth={LW} /><circle r={70} fill={INK} /><circle cx={-40} cy={-40} r={24} fill="#fff" />
                <path d={`M -420 0 Q 0 ${lerp(-300, -150, prog(t, T.sting, T.sting + 0.3))} 420 0`} fill="#E8B48A" stroke={INK} strokeWidth={LW} />
              </g>
              {T.nerves < t && <path d={`M 120 600 l 60 60 l -40 20 l 70 80`} stroke="#FFD84D" strokeWidth={16} fill="none" strokeLinejoin="round" opacity={prog(t, T.sting, T.sting + 0.2)} />}
              {Array.from({length: 10}).map((_, i) => {
                const k = ((t - T.flood) * 1.2 + i * 0.13) % 1;
                return t > T.flood ? <path key={i} transform={`translate(${200 + (i % 5) * 170} ${1180 + k * 600})`} d="M 0 -30 Q 22 0 0 22 Q -22 0 0 -30 Z" fill="#7FD3FF" stroke={INK} strokeWidth={5} /> : null;
              })}
            </Layer>
            <Sticker t={t} t0={T.sting} x={540} y={600} text="NERVES FEEL THE STING" size={64} fill="#E5414A" />
            <Label x={540} y={1760} size={78} s={pop(t, T.flood, 12, 6)} color="#BFE6FF">TEARS WASH IT AWAY</Label>
          </g>
        )}
        {scene === 'tip' && (
          <g>
            <g transform="translate(300 1180)">
              <rect x={-200} y={-380} width={400} height={700} rx={40} fill="#EAF4FB" stroke={INK} strokeWidth={LW} />
              <path d="M -200 -120 L 200 -120" stroke={INK} strokeWidth={8} />
              <rect x={150} y={-320} width={20} height={140} rx={8} fill="#9AA5B1" /><rect x={150} y={-60} width={20} height={200} rx={8} fill="#9AA5B1" />
              <g transform={`translate(0 120) scale(${pop(t, T.chill, 12, 6) * 0.8})`}><Onion t={t} cold mood="calm" /></g>
            </g>
            <g transform="translate(780 1400)"><Onion t={t} s={0.55} cut={1} cold /></g>
            <g transform="translate(780 1100)"><GasPuff t={t} k={0.25} s={0.6} /></g>
            <Sticker t={t} t0={T.chill} x={540} y={600} text="TIP: CHILL IT FIRST" size={74} fill="#2C7BE5" />
            <Label x={780} y={1760} size={72} s={pop(t, T.less, 12, 6)} color="#fff">LESS GAS</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="17-onion-tears" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
