import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, Cloud, SweatDrop, clamp, lerp, prog, pop, keys, easeOut, shake} from '../../lib/cartoon';
import {W, H, FPS, Layer, Label, Sticker, Logo, EndCard, SoundTrack, Cue, SkyGrad} from '../../lib/short';

// woodpecker clinging to a trunk on its right; origin = feet. peck = 0..1 (1 = beak on wood)
const Bird: React.FC<{t: number; peck: number; squish?: number; xray?: number; xrayKind?: 'pad' | 'hammer'; dizzy?: boolean; sweat?: number}> =
  ({t, peck, squish = 0, xray = 0, xrayKind = 'pad', dizzy, sweat = 0}) => (
    <g>
      {/* tail braced on the trunk */}
      <path d="M 40 40 L 70 150 L 30 140 L 10 40 Z" fill="#222" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <g transform={`rotate(${-6 + 18 * peck} 40 20)`}>
        <ellipse cx={0} cy={-60} rx={70} ry={110} fill="#2A2A2A" stroke={INK} strokeWidth={LW} transform="rotate(14 0 -60)" />
        <ellipse cx={18} cy={-50} rx={34} ry={80} fill="#F4F1E8" transform="rotate(14 18 -50)" />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${-40 + i * 12} ${-110 + i * 50} l 30 6`} stroke="#fff" strokeWidth={8} strokeLinecap="round" />)}
        <g transform={`translate(30 -190) scale(${1 + squish * 0.12} ${1 - squish * 0.18})`}>
          <path d={`M 40 -8 L ${150 - squish * 20} 4 L 40 22 Z`} fill="#8C96A3" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <circle r={62} fill="#2A2A2A" stroke={INK} strokeWidth={LW} />
          <path d="M -50 -30 C -30 -76 30 -80 52 -34 C 20 -50 -20 -50 -50 -30 Z" fill="#E5414A" stroke={INK} strokeWidth={6} />
          <path d="M -40 10 C -10 30 30 30 56 14" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" />
          {dizzy
            ? <path d="M 12 -10 l 14 14 m 0 -14 l -14 14" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
            : <g><circle cx={20} cy={-6} r={12} fill="#fff" /><circle cx={24} cy={-6} r={6} fill={INK} /></g>}
          {xray > 0.01 && (
            <g opacity={xray}>
              <circle r={50} fill="#DDF3FF" stroke="#2C7BE5" strokeWidth={6} />
              {xrayKind === 'pad'
                ? <path d="M -30 0 l 10 -14 l 10 14 l 10 -14 l 10 14 l 10 -14 l 10 14" stroke="#2C7BE5" strokeWidth={7} fill="none" strokeLinejoin="round" />
                : <g><rect x={-34} y={-12} width={50} height={24} rx={4} fill="#8C96A3" stroke={INK} strokeWidth={5} /><rect x={-6} y={-30} width={22} height={60} rx={4} fill="#5A6672" stroke={INK} strokeWidth={5} /></g>}
              <ellipse cx={-8} cy={22} rx={9} ry={6} fill="#F49AB0" stroke={INK} strokeWidth={3} />
            </g>
          )}
          {sweat > 0 && <SweatDrop x={-40} y={-50 + 30 * sweat} s={0.6} />}
        </g>
      </g>
      <path d="M 0 0 l 30 -8 m -30 8 l 30 6" stroke="#8C96A3" strokeWidth={8} strokeLinecap="round" />
    </g>
  );

const Trunk: React.FC<{hits: number}> = ({hits}) => (
  <g>
    <rect x={0} y={-1400} width={330} height={3000} fill="#9A6436" stroke={INK} strokeWidth={LW} />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${60 + i * 50} -1400 Q ${80 + i * 50} 0 ${50 + i * 50} 1600`} stroke="#7E4F28" strokeWidth={8} fill="none" />)}
    <ellipse cx={8} cy={-180} rx={16 + 6 * hits} ry={20 + 6 * hits} fill="#4A2E16" stroke={INK} strokeWidth={5} />
  </g>
);

const Camera: React.FC<{t: number}> = ({t}) => (
  <g>
    <path d="M 0 0 L -70 260 M 0 0 L 70 260 M 0 0 L 0 270" stroke={INK} strokeWidth={10} />
    <rect x={-90} y={-110} width={180} height={110} rx={16} fill="#3A4652" stroke={INK} strokeWidth={LW} />
    <circle cx={30} cy={-55} r={36} fill="#8ECFFF" stroke={INK} strokeWidth={LW} />
    <circle cx={-60} cy={-90} r={10} fill={Math.sin(t * 8) > 0 ? '#E5414A' : '#7A1E22'} />
    <path d="M 66 -80 L 120 -100 L 120 -10 L 66 -30 Z" fill="#5A6672" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
  </g>
);

const Brain: React.FC<{s: number}> = ({s}) => (
  <g transform={`scale(${s})`}>
    <path d="M -60 10 C -80 -40 -40 -70 -10 -60 C 10 -80 60 -70 62 -30 C 90 -10 70 40 40 40 C 20 60 -30 60 -40 40 C -70 44 -76 26 -60 10 Z" fill="#F49AB0" stroke={INK} strokeWidth={LW / s} />
    <path d="M -30 -30 q 10 10 0 24 M 10 -40 q 14 14 0 30 M 30 0 q -14 10 -30 4" stroke="#D96A86" strokeWidth={6 / s} fill="none" />
  </g>
);

export const Woodpecker: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const slowmo = t > T.cameras && t < T.soaked - 0.2;
  const springy = t > T.soaked - 0.2 && t < T.size - 0.3;
  const rate = slowmo ? 1.2 : springy ? 2.2 : 7.5;
  const cyc = (t * rate) % 1;
  const peckRaw = cyc < 0.5 ? cyc * 2 : 2 - cyc * 2;
  const peck = t > T.size - 0.3 ? 0.2 : Math.pow(peckRaw, 0.6);
  const hit = peckRaw > 0.93;
  const squish = springy && peckRaw > 0.7 ? (peckRaw - 0.7) / 0.3 : 0;
  const xray = prog(t, T.skull - 0.1, T.skull + 0.3) * (1 - prog(t, T.size - 0.4, T.size - 0.1));
  const kind = t > T.opposite ? 'hammer' : 'pad';
  const cam = keys(t, [
    [0, 560, 1000, 1.0], [T.skull - 0.3, 560, 1000, 1.0], [T.skull + 0.3, 690, 880, 1.7],
    [T.cameras - 0.3, 690, 880, 1.7], [T.cameras + 0.3, 560, 1000, 1.0], [T.hammer - 0.3, 560, 1000, 1.0],
    [T.hammer + 0.2, 690, 880, 1.7], [T.size - 0.4, 690, 880, 1.7], [T.size + 0.2, 540, 1000, 1.0],
  ]);
  const [shx, shy] = shake(t, hit && !slowmo && t < T.size - 0.3 ? 4 : 0);
  const cues: Cue[] = [];
  // knocks on every hit until "size"
  for (let s = 0.05; s < T.size - 0.3; s += 1 / 7.5) { if (!(s > T.cameras && s < T.size - 0.3)) cues.push({f: 'knock', at: s + 0.06, db: -20}); }
  for (let s = T.cameras; s < T.soaked - 0.2; s += 1 / 1.2) cues.push({f: 'knock', at: s + 0.42, db: -18});
  for (let s = T.soaked - 0.2; s < T.size - 0.3; s += 1 / 2.2) cues.push({f: 'boing', at: s + 0.3, db: -26});
  cues.push({f: 'pop', at: T.concussion, db: -20}, {f: 'whoosh', at: T.skull - 0.3, db: -24}, {f: 'pop', at: T.y2022 - 0.05, db: -18},
    {f: 'tick', at: T.cameras, db: -20}, {f: 'zap', at: T.opposite, db: -22}, {f: 'clink', at: T.hammer + 0.1, db: -18},
    {f: 'whoosh', at: T.size - 0.35, db: -24}, {f: 'ding', at: T.tiny + 0.2, db: -22});
  const tinyCompare = t > T.size - 0.3;
  return (
    <AbsoluteFill style={{background: '#BDE6C2'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', transform: `translate(${shx}px, ${shy}px)`}}>
        <SkyGrad top="#A8E0FF" bottom="#E6F7FF" />
        <Layer cam={cam} p={0.2}>
          <g transform={`translate(${240 + t * 6} 340)`}><Cloud s={0.9} /></g>
          <path d="M -900 1500 Q -300 1200 300 1400 Q 900 1200 1600 1450 L 1600 3000 L -900 3000 Z" fill="#7CC67A" stroke={INK} strokeWidth={LW} />
        </Layer>
        <Layer cam={cam}>
          <g transform="translate(760 0)"><Trunk hits={prog(t, 0, 8)} /></g>
          {/* leaves */}
          {[[-80, 300], [180, 220], [420, 330]].map(([x, y], i) => <ellipse key={i} cx={x + 700} cy={y} rx={160} ry={90} fill="#4E9A49" stroke={INK} strokeWidth={LW} />)}
          {!tinyCompare && (
            <g transform="translate(620 990) scale(1.2)">
              <Bird t={t} peck={peck} squish={squish} xray={xray} xrayKind={kind as any} sweat={springy ? ((t * 1.3) % 1) : 0} />
            </g>
          )}
          {hit && !slowmo && !tinyCompare && [0, 1, 2].map((i) => <path key={i} d={`M 770 ${760 + i * 26} l ${-30 - i * 6} ${-12 + i * 12}`} stroke="#5A3A1C" strokeWidth={6} strokeLinecap="round" />)}
          {slowmo && <g transform="translate(250 1250)"><Camera t={t} /></g>}
          {!tinyCompare && (
            <g transform={`translate(${slowmo ? 120 : 200} 1500) scale(0.85)`}>
              <Guy t={t} stand expr={t < T.concussion + 0.4 ? 'worried' : 'hope'} handL={[-70, -330]} handR={[90, -330]} bendL={0.2} bendR={0.2}
                blink={((t + 0.2) % 2.9) < 0.1} sweat={t < T.skull ? ((t % 2.2) / 2.2) : 0} look={[8, -4]} />
            </g>
          )}
          {tinyCompare && (
            <g>
              <g transform="translate(300 1500) scale(1.05)">
                <Guy t={t} stand expr="worried" handL={[-80, -80]} handR={[90, -80]} blink={((t + 0.2) % 2.9) < 0.1}
                  xray={1} xrayChildren={null} />
              </g>
              <g transform="translate(320 975) scale(1.25)"><circle r={110} fill="#DDF3FF" stroke="#2C7BE5" strokeWidth={6} /><Brain s={1.3} /></g>
              <g transform="translate(700 1040) scale(1.4)"><Bird t={t} peck={0.15} /></g>
              <g transform="translate(790 795)"><circle r={36} fill="#DDF3FF" stroke="#2C7BE5" strokeWidth={5} /><Brain s={0.3} /></g>
            </g>
          )}
        </Layer>
        <Label x={540} y={520} size={130} s={pop(t, T.concussion, 12, 6) * (1 - prog(t, T.skull - 0.3, T.skull))} color="#FFE45C">CONCUSSION?</Label>
        <Sticker t={t} t0={T.skull} t1={T.opposite + 0.6} x={540} y={1650} text={t > T.opposite ? 'NOT A SHOCK PAD' : 'SHOCK PAD?'} size={80} fill={t > T.opposite ? '#E5414A' : '#2C7BE5'} />
        <Sticker t={t} t0={T.y2022 - 0.05} t1={T.opposite} x={540} y={560} text="2022 · SLOW-MO" size={84} fill="#2B3A4A" />
        <Label x={540} y={1650} size={92} s={pop(t, T.hammer, 12, 6) * (1 - prog(t, T.soaked - 0.3, T.soaked))} color="#FFE45C">STIFF HAMMER</Label>
        <Label x={540} y={1650} size={64} s={pop(t, T.harder - 0.1, 12, 6) * (1 - prog(t, T.size - 0.4, T.size - 0.2))} color="#FF8A8A">SQUISHY = PECK HARDER</Label>
        <Sticker t={t} t0={T.tiny} t1={T.card} x={540} y={1700} text="TINY BRAIN, BIG JOLTS" size={76} fill="#2C7BE5" />
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="05-woodpecker" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
