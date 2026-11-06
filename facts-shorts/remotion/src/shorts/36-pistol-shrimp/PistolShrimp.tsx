import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys, shake, clamp} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const PINK = '#FF8A7A', SEA = '#1F6FA8', DEEP = '#0F3B66';

// pistol shrimp side view facing right; claw open 0..1
const Shrimp: React.FC<{t: number; open: number}> = ({t, open}) => {
  const blink = t % 2.8 < 0.12;
  const a = lerp(0, -38, open);
  return (
    <g>
      {/* tail segments */}
      {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={-140 - i * 70} cy={20 + i * 14} rx={60 - i * 6} ry={48 - i * 6} fill={PINK} stroke={INK} strokeWidth={LW} />)}
      <path d="M -390 70 L -470 30 L -460 110 Z" fill={PINK} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <ellipse cx={-30} cy={0} rx={120} ry={70} fill={PINK} stroke={INK} strokeWidth={LW} />
      {/* legs */}
      {[-90, -50, -10, 30].map((x, i) => <path key={x} d={`M ${x} 55 L ${x - 10 + 6 * Math.sin(t * 8 + i)} 115`} stroke={INK} strokeWidth={8} strokeLinecap="round" />)}
      {/* antennae */}
      <path d={`M 70 -40 Q 200 ${-200 + 20 * Math.sin(t * 2)} 330 ${-150 + 20 * Math.sin(t * 2.3)}`} stroke={INK} strokeWidth={6} fill="none" />
      <path d={`M 60 -50 Q 160 ${-240 + 20 * Math.sin(t * 1.7)} 250 ${-250 + 15 * Math.sin(t * 2)}`} stroke={INK} strokeWidth={6} fill="none" />
      {/* eye */}
      <circle cx={70} cy={-40} r={28} fill="#fff" stroke={INK} strokeWidth={7} />
      <circle cx={78} cy={-40} r={blink ? 2 : 12} fill={INK} />
      {/* big claw */}
      <g transform="translate(60 40)">
        <path d="M 0 0 Q 60 30 120 30" stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" />
        <path d="M 0 0 Q 60 30 120 30" stroke={PINK} strokeWidth={34} fill="none" strokeLinecap="round" />
        <path d="M 110 0 L 330 10 Q 360 40 320 70 L 110 70 Z" fill="#FF6F5E" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        <g transform={`translate(120 10) rotate(${a})`}>
          <path d="M 0 0 L 230 -10 Q 250 -30 220 -50 L 0 -40 Z" fill="#FF6F5E" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        </g>
      </g>
    </g>
  );
};

const Fish: React.FC<{t: number; dizzy: number}> = ({t, dizzy}) => (
  <g>
    <path d="M 0 0 L 70 -50 L 70 50 Z" fill="#FFB020" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <ellipse cx={-80} cy={0} rx={110} ry={70} fill="#FFD84A" stroke={INK} strokeWidth={LW} />
    {dizzy > 0 ? (
      <g transform="translate(-140 -15)">
        <path d="M -14 -14 L 14 14 M 14 -14 L -14 14" stroke={INK} strokeWidth={7} strokeLinecap="round" />
      </g>
    ) : <circle cx={-140} cy={-15} r={12} fill={INK} />}
    {dizzy > 0 && [0, 1, 2].map((i) => {
      const a = t * 5 + i * 2.1;
      return <path key={i} transform={`translate(${-100 + 70 * Math.cos(a)} ${-110 + 20 * Math.sin(a)})`} d="M 0 -16 L 5 -5 L 16 -4 L 8 4 L 10 16 L 0 10 L -10 16 L -8 4 L -16 -4 L -5 -5 Z" fill="#FFE45C" stroke={INK} strokeWidth={4} />;
    })}
    <path d="M -180 25 Q -165 35 -150 25" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

const Bubbles: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 14}).map((_, i) => {
    const y = 1920 - ((t * 120 + i * 173) % 2100);
    return <circle key={i} cx={(i * 211) % 1080 + 20 * Math.sin(t + i)} cy={y} r={8 + (i % 4) * 5} fill="none" stroke="#9FD8FF" strokeWidth={4} opacity={0.6} />;
  })}</g>
);

export const PistolShrimp: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.snaps - 0.25 ? 'intro' : t < T.split - 0.25 ? 'snap' : t < T.stun - 0.25 ? 'heat' : 'stun';
  const snapAt = T.jet - 0.1;
  const cues: Cue[] = [
    {f: 'pop', at: T.shrimp, db: -22}, {f: 'whoosh', at: T.snaps - 0.25, db: -24}, {f: 'crack', at: snapAt, db: -16},
    {f: 'splash', at: T.jet, db: -22}, {f: 'pop', at: T.bubble, db: -20}, {f: 'crack', at: T.bang, db: -14}, {f: 'rumble', at: T.bang + 0.05, db: -20},
    {f: 'whoosh', at: T.split - 0.25, db: -24}, {f: 'sizzle', at: T.split + 0.3, db: -22}, {f: 'ding', at: T.nearly + 0.6, db: -18},
    {f: 'whoosh', at: T.stun - 0.25, db: -24}, {f: 'crack', at: T.stun + 0.1, db: -18}, {f: 'wobble', at: T.stun + 0.4, db: -20},
  ];
  const bg = scene === 'heat' ? '#1A1030' : SEA;
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bg} />
        {scene !== 'heat' && <rect x={-400} y={1650} width={1900} height={700} fill="#D9B77A" stroke={INK} strokeWidth={LW} />}
        {scene !== 'heat' && <Bubbles t={t} />}

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1300, 1.2], [T.snaps - 0.3, 540, 1250, 1]])}>
              <g transform={`translate(${lerp(-300, 470, prog(t, 0, 0.8))} 1460) scale(0.9)`}><Shrimp t={t} open={0.6} /></g>
              <g transform={`translate(860 1150) scale(${0.8 * pop(t, T.shrimp + 0.3, 10, 6)})`}>
                <circle r={120} fill="#FFD84A" stroke={INK} strokeWidth={LW} />
                <circle cx={-35} cy={-20} r={12} fill={INK} /><circle cx={35} cy={-20} r={12} fill={INK} />
                <path d="M -40 35 Q 0 15 40 35" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
                <path d="M -150 -120 Q -160 -60 -140 -40" stroke="#fff" strokeWidth={10} fill="none" />
              </g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, 0.3, 12, 6)} color="#FFE45C">SHRIMP VS THE SUN</Label>
          </g>
        )}

        {scene === 'snap' && (() => {
          const open = t < snapAt ? prog(t, T.snaps - 0.2, T.snaps + 0.3) * (0.9 + 0.1 * Math.sin(t * 7)) : 1 - prog(t, snapAt, snapAt + 0.05);
          const jetU = prog(t, T.jet, T.jet + 0.4);
          const bR = t < T.bang ? 30 + 80 * prog(t, T.bubble - 0.2, T.bubble + 0.4) : 110 * (1 - prog(t, T.bang, T.bang + 0.12));
          const boom = t > T.bang ? clamp(1 - (t - T.bang) / 0.8) : 0;
          const [jx, jy] = shake(t, boom * 14);
          return (
            <g>
              <Layer cam={keys(t, [[T.snaps - 0.25, 540, 1420, 0.95], [T.jet, 560, 1430, 1.0], [T.bang - 0.1, 600, 1440, 1.05], [T.split - 0.3, 560, 1420, 0.95]])}>
                <g transform={`translate(${440 + jx} ${1420 + jy}) scale(0.6)`}><Shrimp t={t} open={open} /></g>
                {jetU > 0 && <path d={`M 740 1450 Q ${lerp(740, 960, jetU) - 60} 1430 ${lerp(740, 960, jetU)} 1450`} stroke="#CFF0FF" strokeWidth={lerp(60, 20, jetU)} fill="none" strokeLinecap="round" opacity={0.9} />}
                {t > T.bubble - 0.2 && bR > 1 && <circle cx={860} cy={1450} r={bR * (1 + 0.07 * Math.sin(t * 13))} fill="#CFF0FF" stroke={INK} strokeWidth={8} opacity={0.9} />}
                {t > T.bang && t < T.bang + 1.6 && Array.from({length: 12}).map((_, i) => {
                  const a = (t - T.bang) / 1.6, ang = i * 30 * Math.PI / 180;
                  return <circle key={i} cx={860 + Math.cos(ang) * 420 * a} cy={1450 + Math.sin(ang) * 300 * a - 120 * a * a} r={14 - 6 * a} fill="none" stroke="#CFF0FF" strokeWidth={5} opacity={1 - a} />;
                })}
                {boom > 0 && <g transform="translate(860 1450)">
                  <circle r={60 + 300 * (1 - boom)} fill="none" stroke="#fff" strokeWidth={14 * boom} />
                  <circle r={30 + 500 * (1 - boom)} fill="none" stroke="#FFE45C" strokeWidth={10 * boom} />
                  <circle r={90 * boom} fill="#FFF3B0" />
                </g>}
              </Layer>
              <Label x={540} y={640} size={92} s={pop(t, T.snaps, 12, 6)}>{t < T.bang ? 'SNAP!' : 'BANG!'}</Label>
              <Sticker t={t} t0={T.bang + 0.2} x={540} y={1840} text="LOUDER THAN A GUNSHOT" size={54} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'heat' && (() => {
          const fill = prog(t, T.split, T.nearly + 0.4);
          const temp = Math.round(4700 * fill);
          return (
            <g>
              <Layer cam={keys(t, [[T.split - 0.25, 540, 1150, 1], [T.nearly + 0.5, 540, 1200, 1.08], [T.stun - 0.3, 580, 1150, 1.1]])}>
                {/* sun on the right */}
                <g transform={`translate(780 1240) rotate(${t * 15}) scale(${1 + 0.06 * Math.sin(t * 4)})`}>
                  {Array.from({length: 12}).map((_, i) => <path key={i} transform={`rotate(${i * 30})`} d="M 0 -170 L 0 -220" stroke="#FFB020" strokeWidth={18} strokeLinecap="round" />)}
                  <circle r={150} fill="#FFD84A" stroke={INK} strokeWidth={LW} />
                </g>
                <g transform="translate(780 1540)"><Label x={0} y={0} size={60} color="#FFD84A">SUN 5,500°C</Label></g>
                {/* thermometer for the bubble; full tube = the Sun's surface */}
                <g transform="translate(300 1700)">
                  <rect x={-50} y={-640} width={100} height={640} rx={50} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <rect x={-28} y={-600 * 0.855 * fill - 10} width={56} height={600 * 0.855 * fill + 10} rx={28} fill="#E5414A" />
                  <circle cy={30} r={80} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                  
                </g>
                <g transform={`translate(300 ${1700 - 600 * 0.855 * fill - 70})`}><Label x={0} y={0} size={60} color="#fff">{`${temp.toLocaleString('en-GB')}°C`}</Label></g>
              </Layer>
              <Label x={540} y={640} size={79} s={pop(t, T.split, 12, 6)} color="#FFB020">FOR A SPLIT SECOND</Label>
              <Sticker t={t} t0={T.nearly + 0.5} x={540} y={1830} text="NEARLY AS HOT AS THE SUN" size={48} fill="#F28C28" />
            </g>
          );
        })()}

        {scene === 'stun' && (() => {
          const boom = t > T.stun ? clamp(1 - (t - T.stun) / 0.6) : 0;
          return (
            <g>
              <Layer cam={keys(t, [[T.stun - 0.25, 540, 1300, 1], [T.card, 600, 1300, 1.12]])}>
                <g transform="translate(400 1440) scale(0.6)"><Shrimp t={t} open={t < T.stun ? 0.8 : 0} /></g>
                {boom > 0 && <circle cx={620} cy={1400} r={40 + 260 * (1 - boom)} fill="none" stroke="#fff" strokeWidth={12 * boom} />}
                <g transform={`translate(860 ${1380 + 10 * Math.sin(t * 3)}) rotate(${t > T.stun ? 160 + 10 * Math.sin(t * 4) : 0})`}>
                  <Fish t={t} dizzy={t > T.stun ? 1 : 0} />
                </g>
              </Layer>
              <Label x={540} y={640} size={92} s={pop(t, T.stun, 12, 6)}>STUNNED!</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="36-pistol-shrimp" voAt={VO_AT} card={T.card} cues={cues} bed="ocean" bedVol={0.06} />
    </AbsoluteFill>
  );
};
