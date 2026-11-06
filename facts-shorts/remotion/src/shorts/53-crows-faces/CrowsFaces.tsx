import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const CROW = '#2A2A35', CROW2 = '#43435A', SKY = '#CDE6F7', GRASS = '#7CC576';

// side-view crow facing right; flap 0..1 raises the wing; angry narrows the eye
const Crow: React.FC<{t: number; flap?: number; angry?: boolean; happy?: boolean; beak?: number}> = ({t, flap = 0, angry, happy, beak = 0}) => (
  <g>
    <path d="M -110 10 L -200 -10 L -190 40 Z" fill={CROW} stroke={INK} strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={120} ry={80} fill={CROW} stroke={INK} strokeWidth={LW} />
    <path d="M -10 120 L -20 80 M 30 120 L 20 80" stroke="#E5A23A" strokeWidth={9} strokeLinecap="round" />
    <circle cx={100} cy={-60} r={62} fill={CROW} stroke={INK} strokeWidth={LW} />
    <path d={`M 150 -70 L 230 ${-55 - 10 * beak} L 150 -48 Z`} fill="#555" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {beak > 0 && <path d="M 150 -48 L 225 -30 L 150 -40 Z" fill="#555" stroke={INK} strokeWidth={6} />}
    <circle cx={115} cy={-75} r={16} fill="#fff" />
    {happy ? <path d="M 103 -75 Q 115 -88 127 -75" stroke={INK} strokeWidth={6} fill="none" /> : <circle cx={119} cy={-74} r={8} fill={INK} />}
    {angry && <path d="M 95 -100 L 135 -88" stroke={INK} strokeWidth={9} strokeLinecap="round" />}
    <g transform={`translate(-10 -20) rotate(${-50 * flap})`}>
      <path d="M 0 0 Q -80 -20 -150 30 Q -60 50 40 30 Z" fill={CROW2} stroke={INK} strokeWidth={7} />
    </g>
    <circle cx={115 + 3 * Math.sin(t)} cy={-75} r={0} />
  </g>
);

// scary mask (worn over the Guy head, head centre at 10,-346)
const Mask: React.FC = () => (
  <g transform="translate(10 -346)">
    <ellipse rx={150} ry={170} fill="#C9A06A" stroke={INK} strokeWidth={LW} />
    <path d="M -110 -60 L -30 -40 M 110 -60 L 30 -40" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    <ellipse cx={-55} cy={-10} rx={26} ry={20} fill={INK} /><ellipse cx={55} cy={-10} rx={26} ry={20} fill={INK} />
    <path d="M -70 80 Q 0 40 70 80 L 50 100 L 30 85 L 10 100 L -10 85 L -30 100 L -50 85 Z" fill="#fff" stroke={INK} strokeWidth={6} />
    <path d="M -150 -40 Q -170 -170 -60 -170 M 150 -40 Q 170 -170 60 -170" stroke="#6B4A2E" strokeWidth={22} fill="none" strokeLinecap="round" />
  </g>
);

export const CrowsFaces: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.mask - 0.25 ? 'intro' : t < T.years - 0.25 ? 'mask' : t < T.taught - 0.25 ? 'attack' : t < T.nice - 0.25 ? 'teach' : 'nice';
  const cues: Cue[] = [
    {f: 'blegh', at: 0.3, db: -24}, {f: 'ding', at: T.forget + 0.4, db: -20},
    {f: 'whoosh', at: T.mask - 0.25, db: -24}, {f: 'rumble', at: T.mask + 0.2, db: -22}, {f: 'whoosh', at: T.mask + 0.8, db: -18},
    {f: 'whoosh', at: T.years - 0.25, db: -24}, {f: 'ticktock', at: T.years, db: -22},
    {f: 'zap', at: T.screamed, db: -20}, {f: 'whoosh', at: T.screamed + 0.3, db: -18}, {f: 'whoosh', at: T.screamed + 0.9, db: -18},
    {f: 'whoosh', at: T.taught - 0.25, db: -24}, {f: 'knock', at: T.taught + 0.3, db: -18}, {f: 'ding', at: T.taught + 0.8, db: -20},
    {f: 'whoosh', at: T.nice - 0.25, db: -24}, {f: 'plop', at: T.nice + 0.3, db: -20}, {f: 'pop', at: T.nice + 0.7, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1020, 1], [T.mask - 0.3, 600, 970, 1.25]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={GRASS} stroke={INK} strokeWidth={LW} />
              <path d="M -100 1300 L 600 1300" stroke="#7A5230" strokeWidth={30} strokeLinecap="round" />
              <g transform={`translate(330 ${1185 + 4 * Math.sin(t * 3)}) scale(1.1)`}><Crow t={t} angry /></g>
              <g transform="translate(820 1700) scale(0.9)"><Guy t={t} expr="worried" handL={[-120, -170]} handR={[120, -170]} stand sweat={(t * 0.7) % 1} blink={t % 3 < 0.12} /></g>
              <path d="M 560 1110 L 700 1250" stroke="#E5414A" strokeWidth={8} strokeDasharray="16 12" opacity={pop(t, T.forget, 10, 6)} />
            </Layer>
            <Label x={540} y={640} size={79} s={pop(t, 0.1, 12, 6)} color="#fff">CROWS NEVER FORGET</Label>
            <Sticker t={t} t0={T.forget + 0.3} x={540} y={790} text="YOUR FACE" size={72} fill="#E5414A" />
          </g>
        )}

        {scene === 'mask' && (() => {
          const net = prog(t, T.mask + 0.7, T.mask + 1.3);
          return (
            <g>
              <Layer cam={keys(t, [[T.mask - 0.25, 540, 1020, 1], [T.years - 0.3, 560, 1040, 1.08]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={GRASS} stroke={INK} strokeWidth={LW} />
                <g transform="translate(360 1700) scale(0.95)">
                  <Guy t={t} expr="happy" handL={[-120, -180]} handR={[200, -380]} stand blink={false} />
                  <g transform={`translate(10 -346) scale(${pop(t, T.mask, 12, 6)}) translate(-10 346)`}><Mask /></g>
                </g>
                <g transform={`translate(${lerp(560, 780, net)} ${lerp(1240, 1450, net)})`}>
                  <path d="M 0 0 L 120 -60" stroke="#7A5230" strokeWidth={14} strokeLinecap="round" />
                  <ellipse cx={170} cy={-60} rx={70} ry={50} fill="none" stroke={INK} strokeWidth={7} />
                </g>
                <g transform={`translate(${lerp(1000, 900, net)} ${lerp(1100, 1530, net)}) scale(0.6)`}><Crow t={t} flap={(Math.sin(t * 14) + 1) / 2} beak={1} /></g>
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.mask, 12, 6)} color="#fff">SCIENTISTS WORE</Label>
              <Sticker t={t} t0={T.mask + 0.3} x={540} y={790} text="A SCARY MASK" size={66} fill="#7A4DC8" />
            </g>
          );
        })()}

        {scene === 'attack' && (() => {
          const yrs = Math.min(5, Math.floor(prog(t, T.years, T.screamed, (u) => u) * 5.99));
          const att = t > T.screamed - 0.1;
          return (
            <g>
              <Layer cam={keys(t, [[T.years - 0.25, 540, 1020, 1], [T.screamed, 540, 1020, 1.0], [T.taught - 0.3, 540, 1050, 1.08]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={GRASS} stroke={INK} strokeWidth={LW} />
                <g transform={`translate(540 1700) scale(0.95)`}>
                  <Guy t={t} expr="worried" handL={att ? [-120, -420] : [-120, -180]} handR={att ? [140, -420] : [120, -180]} stand sweat={att ? (t * 1.2) % 1 : 0} lean={att ? 6 * Math.sin(t * 9) : 0} />
                  <Mask />
                </g>
                {!att && <g transform={`translate(830 1080) scale(${pop(t, T.years, 12, 6)})`}>
                  <rect x={-120} y={-110} width={240} height={220} rx={16} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <rect x={-120} y={-110} width={240} height={60} rx={16} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                  <text y={70} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={INK}>{`+${Math.max(1, yrs)} YR${yrs > 1 ? "S" : ""}`}</text>
                </g>}
                {att && [0, 1, 2].map((i) => {
                  const a = (t - T.screamed) * 1.6 + i * 2.1;
                  return <g key={i} transform={`translate(${540 + 330 * Math.cos(a)} ${1150 + 150 * Math.sin(a * 1.3)}) scale(${(Math.cos(a) > 0 ? -0.55 : 0.55)} 0.55)`}><Crow t={t} flap={(Math.sin(t * 16 + i) + 1) / 2} angry beak={1} /></g>;
                })}
                {att && [0, 1].map((i) => <text key={i} x={i ? 860 : 180} y={i ? 1000 : 1060} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" transform={`rotate(${i ? 10 : -10} ${i ? 860 : 180} ${i ? 1000 : 1060})`} opacity={pop(t, T.screamed + i * 0.3, 12, 6)}>CAW!</text>)}
              </Layer>
              <Label x={540} y={640} size={79} s={pop(t, T.years, 12, 6)} color="#fff">{att ? 'SCREAMED AND DIVED' : 'FOR YEARS AFTER...'}</Label>
              {att && <Sticker t={t} t0={T.screamed + 0.4} x={540} y={790} text="AT ANYONE IN THAT MASK" size={48} fill="#E5414A" />}
            </g>
          );
        })()}

        {scene === 'teach' && (
          <g>
            <Layer cam={keys(t, [[T.taught - 0.25, 540, 1020, 1], [T.nice - 0.3, 540, 1040, 1.08]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={GRASS} stroke={INK} strokeWidth={LW} />
              <rect x={300} y={950} width={480} height={360} rx={14} fill="#2F5B44" stroke={INK} strokeWidth={LW} />
              <g transform="translate(540 1290) scale(0.6)"><Mask /></g>
              <path d="M 380 1000 L 700 1260 M 700 1000 L 380 1260" stroke="#E5414A" strokeWidth={14} strokeLinecap="round" opacity={pop(t, T.taught + 0.8, 12, 6)} />
              <path d="M 400 1310 L 380 1700 M 680 1310 L 700 1700" stroke="#7A5230" strokeWidth={16} />
              <g transform={`translate(190 ${1520 + 6 * Math.sin(t * 3)}) scale(0.8)`}><Crow t={t} flap={0.4 + 0.3 * Math.sin(t * 5)} beak={Math.sin(t * 9) > 0 ? 1 : 0} /></g>
              {[0, 1, 2].map((i) => <g key={i} transform={`translate(${720 + i * 120} ${1620 - 10 * Math.abs(Math.sin(t * 4 + i))}) scale(-0.45 0.45)`}><Crow t={t + i} /></g>)}
            </Layer>
            <Label x={540} y={640} size={62} s={pop(t, T.taught, 12, 6)} color="#fff">CROWS THAT NEVER SAW IT</Label>
            <Sticker t={t} t0={T.taught + 0.3} x={540} y={790} text="WERE TAUGHT BY OTHERS" size={52} fill="#2FA35A" />
          </g>
        )}

        {scene === 'nice' && (
          <g>
            <Layer cam={keys(t, [[T.nice - 0.25, 540, 1020, 1], [T.card, 560, 1040, 1.1]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={GRASS} stroke={INK} strokeWidth={LW} />
              <g transform="translate(360 1700) scale(0.95)"><Guy t={t} expr="happy" handL={[-120, -180]} handR={[200, -260]} stand blink={t % 2.8 < 0.12} /></g>
              {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={640 + i * 40} cy={lerp(1440, 1690, prog(t, T.nice + 0.2 + i * 0.1, T.nice + 0.6 + i * 0.1, (u) => u * u))} rx={20} ry={13} fill="#D9A86A" stroke={INK} strokeWidth={4} />)}
              <g transform={`translate(860 ${1600 - 20 * Math.abs(Math.sin(t * 4))}) scale(-0.75 0.75)`}><Crow t={t} happy flap={0.2 * Math.abs(Math.sin(t * 4))} /></g>
              {[0, 1].map((i) => <path key={i} transform={`translate(${880 + i * 70} ${1340 - 40 * ((t + i * 0.5) % 1)}) scale(${pop(t, T.nice + 0.7, 12, 6)})`} d="M 0 10 C -30 -20 -10 -40 0 -20 C 10 -40 30 -20 0 10 Z" fill="#F07A8B" stroke={INK} strokeWidth={4} opacity={1 - ((t + i * 0.5) % 1)} />)}
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.nice, 12, 6)} color="#fff">SO BE NICE</Label>
            <Sticker t={t} t0={T.nice + 0.3} x={540} y={790} text="TO CROWS" size={70} fill="#2C7BE5" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="53-crows-faces" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
