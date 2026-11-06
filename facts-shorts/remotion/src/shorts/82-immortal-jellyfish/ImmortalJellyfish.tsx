import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SEA = '#16406B', SEA2 = '#1E5A8A', JELLY = '#F7A8D8', JELLY2 = '#E06AB0', ROCK = '#6E6A78';

const Jelly: React.FC<{t: number; sad?: boolean; band?: boolean}> = ({t, sad, band}) => (
  <g>
    {[-60, -30, 0, 30, 60].map((x, i) => <path key={x} d={`M ${x} 20 q ${15 * Math.sin(t * 3 + i)} 60 0 120 q ${-15 * Math.sin(t * 3 + i)} 60 0 120`} stroke={JELLY2} strokeWidth={8} fill="none" strokeLinecap="round" />)}
    <path d={`M -110 30 Q -110 -120 0 -120 Q 110 -120 110 30 Q ${55} ${15 + 10 * Math.sin(t * 3)} 0 30 Q -55 ${15 + 10 * Math.sin(t * 3)} -110 30 Z`} fill={JELLY} stroke={INK} strokeWidth={LW} opacity={0.95} />
    <ellipse cx={0} cy={-40} rx={45} ry={30} fill="#FF5C8A" opacity={0.8} />
    <circle cx={-35} cy={-60} r={9} fill={INK} /><circle cx={35} cy={-60} r={9} fill={INK} />
    <path d={sad ? 'M -20 -15 Q 0 -30 20 -15' : 'M -20 -25 Q 0 -5 20 -25'} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    {band && <g transform="translate(60 -80) rotate(30)"><rect x={-40} y={-14} width={80} height={28} rx={10} fill="#F5D6A8" stroke={INK} strokeWidth={5} /><path d="M -10 -8 L -10 8 M 10 -8 L 10 8" stroke={INK} strokeWidth={4} /></g>}
  </g>
);

const Polyp: React.FC<{t: number}> = ({t}) => (
  <g>
    <path d="M -20 0 Q -25 -80 -10 -150 L 10 -150 Q 25 -80 20 0 Z" fill={JELLY} stroke={INK} strokeWidth={6} />
    {[-1, -0.5, 0, 0.5, 1].map((k, i) => <path key={i} d={`M 0 -150 q ${k * 40} ${-30 + 6 * Math.sin(t * 4 + i)} ${k * 70} -20`} stroke={JELLY2} strokeWidth={7} fill="none" strokeLinecap="round" />)}
  </g>
);

const Bubbles: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 16}).map((_, i) => <circle key={i} cx={(i * 173) % 1080} cy={2000 - ((t * 80 + i * 137) % 1300)} r={6 + (i % 3) * 4} fill="none" stroke="#9FD8F0" strokeWidth={3} opacity={0.5} />)}</g>
);

export const ImmortalJellyfish: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.hurt - 0.25 ? 'intro' : t < T.polyp - 0.25 ? 'hurt' : t < T.theory - 0.25 ? 'polyp' : t < T.wild - 0.25 ? 'loop' : 'wild';
  const cues: Cue[] = [
    {f: 'ocean', at: 0, db: -26}, {f: 'rise', at: 0.4, db: -22}, {f: 'ding', at: 1.4, db: -18},
    {f: 'whoosh', at: T.hurt - 0.25, db: -24}, {f: 'sad', at: T.hurt + 0.2, db: -22},
    {f: 'whoosh', at: T.polyp - 0.25, db: -24}, {f: 'wobble', at: T.polyp - 0.6, db: -20}, {f: 'pop', at: T.polyp + 0.2, db: -18},
    {f: 'whoosh', at: T.theory - 0.25, db: -24}, {f: 'rise', at: T.theory, db: -22}, {f: 'ding', at: T.theory + 1.0, db: -18},
    {f: 'whoosh', at: T.wild - 0.25, db: -24}, {f: 'slurp', at: T.wild + 0.6, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: SEA}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SEA} />
        <rect x={-100} y={1300} width={W + 200} height={900} fill={SEA2} opacity={0.5} />
        <Bubbles t={t} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1120, 1.1], [T.hurt - 0.3, 540, 1120, 1]])}>
              <g transform={`translate(540 ${1300 + 30 * Math.sin(t * 2)}) scale(1.6)`}><Jelly t={t} /></g>
              <g transform={`translate(540 1850) scale(${pop(t, 0.9, 12, 6)})`}>
                <rect x={-290} y={-55} width={580} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={JELLY2}>AGE: FOREVER</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, 0.1, 12, 6)} color="#fff">THIS JELLYFISH</Label>
            <Sticker t={t} t0={0.6} x={540} y={790} text="CAN LIVE FOREVER" size={68} fill={JELLY2} />
          </g>
        )}

        {scene === 'hurt' && (
          <g>
            <Layer cam={keys(t, [[T.hurt - 0.25, 540, 1120, 1], [T.polyp - 0.3, 540, 1120, 1.02]])}>
              <g transform={`translate(540 ${1350 + 15 * Math.sin(t * 2)}) scale(1.5) rotate(${4 * Math.sin(t * 3)})`}><Jelly t={t * 0.4} sad band /></g>
              {['HURT', 'OLD', 'STARVING'].map((s, i) => <g key={s} transform={`translate(${[230, 850, 540][i]} ${[1200, 1200, 1830][i]}) scale(${pop(t, T.hurt + 0.2 + i * 0.4, 12, 6)})`}>
                <rect x={i === 2 ? -170 : -130} y={-45} width={i === 2 ? 340 : 260} height={80} rx={18} fill="#fff" stroke={INK} strokeWidth={6} />
                <text y={15} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill="#E5414A">{s}</text>
              </g>)}
            </Layer>
            <Label x={540} y={640} size={71} s={pop(t, T.hurt, 12, 6)} color="#fff">WHEN IT'S IN TROUBLE</Label>
          </g>
        )}

        {scene === 'polyp' && (() => {
          const shrink = prog(t, T.polyp - 0.2, T.polyp + 0.4);
          return (
            <g>
              <Layer cam={keys(t, [[T.polyp - 0.25, 540, 1120, 1], [T.theory - 0.3, 540, 1170, 1.15]])}>
                <path d="M 200 1800 Q 540 1600 880 1800 L 880 1900 L 200 1900 Z" fill={ROCK} stroke={INK} strokeWidth={LW} />
                {shrink < 1 && <g transform={`translate(540 ${lerp(1350, 1650, shrink)}) scale(${lerp(1.5, 0.2, shrink)}) rotate(${shrink * 360})`}><Jelly t={t} /></g>}
                {shrink >= 1 && <g transform={`translate(540 1700) scale(${1.3 * pop(t, T.polyp + 0.4, 12, 6)})`}><Polyp t={t} /></g>}
                <text x={540} y={1180} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={72} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.polyp + 0.5, 12, 6)}>BABY AGAIN!</text>
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.polyp - 0.6, 12, 6)} color="#fff">IT TURNS BACK INTO</Label>
              <Sticker t={t} t0={T.polyp} x={540} y={790} text="A BABY POLYP" size={70} fill={JELLY2} />
            </g>
          );
        })()}

        {scene === 'loop' && (() => {
          const a = (t - T.theory) * 2;
          const pts = [0, 1, 2].map((i) => [540 + 300 * Math.cos(a + (i * 2 * Math.PI) / 3 - Math.PI / 2), 1420 + 300 * Math.sin(a + (i * 2 * Math.PI) / 3 - Math.PI / 2)]);
          return (
            <g>
              <Layer cam={keys(t, [[T.theory - 0.25, 540, 1170, 1], [T.wild - 0.3, 540, 1170, 1.05]])}>
                <circle cx={540} cy={1420} r={300} fill="none" stroke="#9FD8F0" strokeWidth={14} strokeDasharray="40 30" strokeDashoffset={-t * 120} />
                <g transform={`translate(${pts[0][0]} ${pts[0][1]}) scale(0.6)`}><Polyp t={t} /></g>
                <g transform={`translate(${pts[1][0]} ${pts[1][1]}) scale(0.4)`}><Jelly t={t} /></g>
                <g transform={`translate(${pts[2][0]} ${pts[2][1]}) scale(0.7)`}><Jelly t={t} /></g>
                <text x={540} y={1450} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#FFE45C" stroke={INK} strokeWidth={10} paintOrder="stroke">REPEAT</text>
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.theory, 12, 6)} color="#fff">IN THEORY, IT CAN</Label>
              <Sticker t={t} t0={T.theory + 0.3} x={540} y={790} text="DO THIS FOREVER" size={68} fill="#2FA35A" />
            </g>
          );
        })()}

        {scene === 'wild' && (() => {
          const chomp = prog(t, T.wild + 0.2, T.wild + 0.7);
          const eaten = t > T.wild + 0.7;
          return (
            <g>
              <Layer cam={keys(t, [[T.wild - 0.25, 540, 1170, 1], [T.card, 540, 1170, 1.05]])}>
                {!eaten && <g transform={`translate(620 1400) scale(1.1)`}><Jelly t={t} sad /></g>}
                <g transform={`translate(${lerp(-200, 520, chomp)} 1420)`}>
                  <path d="M -220 0 L -320 -70 L -320 70 Z" fill="#7A8A9A" stroke={INK} strokeWidth={6} />
                  <ellipse rx={230} ry={110} fill="#9AAABA" stroke={INK} strokeWidth={LW} />
                  <circle cx={130} cy={-40} r={20} fill="#fff" stroke={INK} strokeWidth={5} /><circle cx={135} cy={-40} r={9} fill={INK} />
                  <path d={`M 230 0 L 140 ${eaten ? 10 : 50} L 230 ${eaten ? 20 : 70}`} fill={SEA} stroke={INK} strokeWidth={6} />
                </g>
                <text x={540} y={1800} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={52} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.wild + 1.0, 12, 6)}>BUT NEVER FROM OLD AGE</text>
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.wild, 12, 6)} color="#fff">IN THE WILD...</Label>
              <Sticker t={t} t0={T.wild + 0.6} x={540} y={790} text="MOST GET EATEN" size={68} fill="#E5414A" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="82-immortal-jellyfish" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
