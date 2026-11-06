import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SKY = '#BFE3FF', ICE = '#EAF6FF', FUR = '#F7F4EA', SKIN = '#26262E';

// side-view polar bear facing right; fur 0..1 (0 = shaved, black skin)
const Bear: React.FC<{t: number; fur: number; blush?: boolean; walk?: number}> = ({t, fur, blush, walk = 0}) => {
  const col = fur > 0.5 ? FUR : SKIN;
  const blink = t % 3.2 < 0.12;
  return (
    <g>
      {[-170, -80, 90, 180].map((x, i) => <rect key={x} x={x - 38 + walk * 16 * Math.sin(t * 7 + (i % 2) * Math.PI)} y={40} width={76} height={150} rx={30} fill={col} stroke={INK} strokeWidth={LW} />)}
      <ellipse cx={0} cy={0} rx={280} ry={160} fill={col} stroke={INK} strokeWidth={LW} />
      <circle cx={-280} cy={-30} r={30} fill={col} stroke={INK} strokeWidth={LW} />
      <g transform="translate(270 -90)">
        <ellipse cx={30} cy={0} rx={130} ry={105} fill={col} stroke={INK} strokeWidth={LW} />
        <circle cx={-40} cy={-90} r={34} fill={col} stroke={INK} strokeWidth={LW} />
        <ellipse cx={130} cy={30} rx={60} ry={45} fill={col} stroke={INK} strokeWidth={LW} />
        <ellipse cx={175} cy={18} rx={20} ry={15} fill={INK} />
        {blink ? <path d="M 40 -20 Q 60 -10 80 -20" stroke={fur > 0.5 ? INK : '#fff'} strokeWidth={7} fill="none" /> : <circle cx={60} cy={-20} r={13} fill={fur > 0.5 ? INK : '#fff'} />}
        {blush && <><ellipse cx={70} cy={30} rx={28} ry={14} fill="#F07A8B" opacity={0.8} /></>}
      </g>
    </g>
  );
};

const Ice: React.FC = () => (
  <g>
    <rect x={-400} y={1700} width={1900} height={800} fill="#6FB6E8" stroke={INK} strokeWidth={LW} />
    <path d="M -400 1700 L 980 1700 L 1020 1620 L -400 1620 Z" fill={ICE} stroke={INK} strokeWidth={LW} />
  </g>
);

export const PolarBearSkin: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.skin - 0.25 ? 'intro' : t < T.clear - 0.25 ? 'skin' : t < T.Shave - 0.25 ? 'hair' : 'shave';
  const cues: Cue[] = [
    {f: 'step', at: 0.3, db: -20}, {f: 'step', at: 0.7, db: -20}, {f: 'boing', at: T.white + 0.3, db: -18},
    {f: 'whoosh', at: T.skin - 0.25, db: -24}, {f: 'zap', at: T.skin + 0.1, db: -20}, {f: 'rise', at: T.warmth, db: -22},
    {f: 'whoosh', at: T.clear - 0.25, db: -24}, {f: 'ding', at: T.clear + 0.3, db: -20}, {f: 'zap', at: T.scatters, db: -20},
    {f: 'whoosh', at: T.Shave - 0.25, db: -24}, {f: 'sizzle', at: T.Shave + 0.1, db: -20}, {f: 'pop', at: T.Shave + 1.0, db: -18}, {f: 'sad', at: T.Shave + 1.3, db: -22},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1300, 1], [T.skin - 0.3, 540, 1320, 1.1]])}>
              <Ice />
              <g transform={`translate(${lerp(-200, 480, prog(t, 0, 1.0))} 1430) scale(0.85)`}><Bear t={t} fur={1} walk={t < 1 ? 1 : 0} /></g>
              <g transform={`translate(860 1080) scale(${pop(t, T.white + 0.3, 12, 6)})`}>
                <circle r={90} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                <text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={120} fill="#fff">?!</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={80} s={pop(t, 0.1, 12, 6)} color="#fff">POLAR BEARS</Label>
            <Sticker t={t} t0={T.white} x={540} y={790} text="AREN'T WHITE" size={72} fill="#E5414A" />
          </g>
        )}

        {scene === 'skin' && (() => {
          const lift = prog(t, T.skin, T.skin + 0.6);
          return (
            <g>
              <Layer cam={keys(t, [[T.skin - 0.25, 540, 1300, 1.1], [T.warmth, 560, 1300, 1.2], [T.clear - 0.3, 560, 1300, 1.25]])}>
                <Ice />
                <g transform="translate(480 1430) scale(0.85)">
                  <Bear t={t} fur={1} />
                  <clipPath id="win"><circle cx={-20} cy={-10} r={150 * lift} /></clipPath>
                  <g clipPath="url(#win)">
                    <rect x={-400} y={-300} width={800} height={600} fill={SKIN} />
                    {Array.from({length: 14}).map((_, i) => <path key={i} d={`M ${-140 + i * 20} 60 l ${8 * Math.sin(t * 3 + i)} -90`} stroke="#fff" strokeWidth={4} opacity={0.5} />)}
                  </g>
                  <circle cx={-20} cy={-10} r={150 * lift} fill="none" stroke={INK} strokeWidth={LW} />
                </g>
                <g transform="translate(150 900)">
                  <circle r={80} fill="#FFD23C" stroke={INK} strokeWidth={LW} opacity={pop(t, T.warmth - 0.2, 10, 6)} />
                  {t > T.warmth && [0, 1, 2].map((i) => {
                    const a = ((t - T.warmth) * 0.9 + i / 3) % 1;
                    return <path key={i} d={`M ${60 + 170 * a} ${70 + 330 * a} l 40 70`} stroke="#FFB020" strokeWidth={12} strokeLinecap="round" opacity={1 - a} />;
                  })}
                </g>
              </Layer>
              <Label x={540} y={640} size={84} s={pop(t, T.skin, 12, 6)} color="#fff">THE SKIN IS BLACK</Label>
              <Sticker t={t} t0={T.warmth} x={540} y={790} text="SOAKS UP THE SUN'S WARMTH" size={46} fill="#F28C28" />
            </g>
          );
        })()}

        {scene === 'hair' && (() => {
          const sc = t > T.scatters;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#1F2D4A" />
              <Layer cam={keys(t, [[T.clear - 0.25, 540, 860, 1], [T.Shave - 0.3, 540, 880, 1.06]])}>
                <g transform="translate(540 1300) rotate(-20) scale(0.85)">
                  <rect x={-90} y={-520} width={180} height={1040} rx={90} fill="#E8F8FF" fillOpacity={0.35} stroke="#fff" strokeWidth={10} />
                  <rect x={-38} y={-500} width={76} height={1000} rx={38} fill="#1F2D4A" fillOpacity={0.6} stroke="#fff" strokeWidth={5} strokeDasharray="18 12" />
                </g>
                <text x={850} y={1000} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill="#fff" opacity={pop(t, T.clear + 0.4, 12, 6)}>HOLLOW</text>
                <path d="M 760 1010 L 600 1150" stroke="#fff" strokeWidth={6} opacity={pop(t, T.clear + 0.4, 12, 6)} />
                {[0, 1, 2].map((i) => {
                  const a = clampU((t - T.clear - 0.2 - i * 0.25) * 0.8);
                  return <path key={i} d={`M ${-60 + i * 50} ${900 + i * 40} L ${lerp(-60, 540, a) + i * 50} ${lerp(900, 1300, a) + i * 40}`} stroke="#FFE45C" strokeWidth={14} strokeLinecap="round" />;
                })}
                {sc && Array.from({length: 12}).map((_, i) => {
                  const ang = i * 30 * Math.PI / 180, a = ((t - T.scatters) * 1.1 + (i % 3) / 3) % 1;
                  return <path key={`s${i}`} d={`M ${540 + Math.cos(ang) * 60 * a} ${1300 + Math.sin(ang) * 60 * a} l ${Math.cos(ang) * (80 + 400 * a)} ${Math.sin(ang) * (80 + 400 * a)}`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={1 - a} />;
                })}
              </Layer>
              <Label x={540} y={640} size={79} s={pop(t, T.clear, 12, 6)} color="#fff">{sc ? 'IT SCATTERS LIGHT' : 'EACH HAIR IS CLEAR'}</Label>
              {sc && <Sticker t={t} t0={T.scatters + 0.4} x={540} y={790} text="SO IT ONLY LOOKS WHITE" size={50} fill="#2C7BE5" />}
            </g>
          );
        })()}

        {scene === 'shave' && (() => {
          const cut = prog(t, T.Shave, T.Shave + 0.9, (u) => u);
          const done = cut >= 1;
          return (
            <g>
              <Layer cam={keys(t, [[T.Shave - 0.25, 540, 1300, 1], [T.card, 540, 1320, 1.1]])}>
                <Ice />
                <g transform="translate(480 1430) scale(0.85)">
                  <Bear t={t} fur={0} blush={done} />
                  <clipPath id="furleft"><rect x={-500 + 1100 * cut} y={-400} width={1200} height={700} /></clipPath>
                  {!done && <g clipPath="url(#furleft)"><Bear t={t} fur={1} /></g>}
                </g>
                {!done && <g transform={`translate(${lerp(30, 960, cut)} ${1280 + 20 * Math.sin(t * 20)})`}>
                  <rect x={-50} y={-90} width={100} height={150} rx={20} fill="#C9D3DE" stroke={INK} strokeWidth={LW} />
                  <rect x={-60} y={-110} width={120} height={30} fill="#888" stroke={INK} strokeWidth={6} />
                </g>}
                {Array.from({length: 10}).map((_, i) => {
                  const a = ((t - T.Shave) * 1.3 + i / 10) % 1;
                  return t > T.Shave && t < T.Shave + 1.6 ? <circle key={i} cx={lerp(30, 960, cut) - 40 + i * 9} cy={1300 + 400 * a} r={14} fill={FUR} stroke={INK} strokeWidth={3} opacity={1 - a} /> : null;
                })}
              </Layer>
              <Label x={540} y={640} size={84} s={pop(t, T.Shave, 12, 6)} color="#fff">SHAVE ONE AND...</Label>
              <Sticker t={t} t0={T.Shave + 1.0} x={540} y={790} text="A BIG BLACK BEAR" size={66} fill={SKIN} />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="52-polar-bear-skin" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};

const clampU = (x: number) => Math.min(1, Math.max(0, x));
