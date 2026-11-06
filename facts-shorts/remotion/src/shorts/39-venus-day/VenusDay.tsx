import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const VEN = '#F2B36B';

const Venus: React.FC<{t: number; s?: number; rot?: number; face?: 'smug' | 'dizzy' | 'calm'}> = ({t, s = 1, rot = 0, face = 'calm'}) => {
  const blink = t % 3 < 0.12;
  return (
    <g transform={`scale(${s})`}>
      <circle r={200} fill={VEN} stroke={INK} strokeWidth={LW} />
      <defs><clipPath id="vclip"><circle r={196} /></clipPath></defs>
      <g clipPath="url(#vclip)" transform={`rotate(${rot})`}>
        {[-120, -40, 50, 130].map((y, i) => <path key={y} d={`M -220 ${y} Q 0 ${y + 30 * (i % 2 ? 1 : -1)} 220 ${y}`} stroke="#D98D45" strokeWidth={22} fill="none" />)}
        <path d="M 0 -200 L 0 -150" stroke={INK} strokeWidth={8} />
        <path d="M 0 -200 L 50 -185 L 0 -170 Z" fill="#E5414A" stroke={INK} strokeWidth={5} />
      </g>
      <g>
        {face === 'dizzy'
          ? <><path d="M -70 -30 l 30 30 m 0 -30 l -30 30 M 40 -30 l 30 30 m 0 -30 l -30 30" stroke={INK} strokeWidth={8} strokeLinecap="round" /><ellipse cx={0} cy={60} rx={20} ry={26} fill={INK} /></>
          : <><circle cx={-55} cy={-15} r={blink ? 2 : 14} fill={INK} /><circle cx={55} cy={-15} r={blink ? 2 : 14} fill={INK} />
            <path d={face === 'smug' ? 'M -50 50 Q 10 80 60 40' : 'M -40 50 Q 0 75 40 50'} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" /></>}
      </g>
    </g>
  );
};

const SunC: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s})`}>
    {Array.from({length: 12}).map((_, i) => <path key={i} transform={`rotate(${i * 30 + t * 12})`} d="M 0 -150 L 0 -200" stroke="#FFB020" strokeWidth={18} strokeLinecap="round" />)}
    <circle r={130} fill="#FFD84A" stroke={INK} strokeWidth={LW} />
  </g>
);

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 30}).map((_, i) => <circle key={i} cx={(i * 211) % 1080} cy={(i * 337) % 1920} r={3 + 3 * Math.abs(Math.sin(t * 1.7 + i))} fill="#fff" />)}</g>
);

const Counter: React.FC<{v: number; label: string; col: string}> = ({v, label, col}) => (
  <g>
    <rect x={-300} y={-90} width={600} height={170} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
    <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={100} fill={col}>{v}</text>
    <text y={66} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill={INK}>{label}</text>
  </g>
);

export const VenusDay: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.slowly - 0.25 ? 'intro' : t < T.around - 0.25 ? 'spin' : t < T.weird - 0.25 ? 'orbit' : 'backwards';
  const cues: Cue[] = [
    {f: 'pop', at: T.day, db: -20}, {f: 'boing', at: T.year, db: -20},
    {f: 'whoosh', at: T.slowly - 0.25, db: -24}, {f: 'ticktock', at: T.slowly + 0.2, db: -24}, {f: 'ding', at: T.turn + 1.2, db: -18},
    {f: 'whoosh', at: T.around - 0.25, db: -24}, {f: 'rise', at: T.around, db: -24}, {f: 'ding', at: T.around + 1.4, db: -18},
    {f: 'whoosh', at: T.weird - 0.25, db: -24}, {f: 'wobble', at: T.backwards, db: -20}, {f: 'rise', at: T.rises, db: -22},
  ];
  const bg = scene === 'backwards' ? '#F7C68B' : '#141A33';
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bg} />

        {scene === 'intro' && (
          <g>
            <Stars t={t} />
            <Layer cam={keys(t, [[0, 540, 1250, 1], [T.slowly - 0.3, 540, 1250, 1.05]])}>
              <g transform={`translate(540 1300) scale(${pop(t, 0.1, 9, 5)})`}><Venus t={t} s={1.12} face="smug" rot={t * 3} /></g>
              <g transform={`translate(310 1770) rotate(-6) scale(${pop(t, T.day, 12, 6) * 0.82})`}><Counter v={1} label="DAY" col="#E5414A" /></g>
              <g transform={`translate(790 1770) rotate(5) scale(${pop(t, T.year, 12, 6) * 0.75})`}><Counter v={1} label="YEAR" col="#2C7BE5" /></g>
              <g transform={`translate(545 1770) scale(${pop(t, T.year + 0.2, 12, 6)})`}><Label x={0} y={30} size={110} color="#FFE45C">&gt;</Label></g>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, 0.2, 12, 6)} color="#FFE45C">ON VENUS...</Label>
            <Sticker t={t} t0={T.year} x={540} y={1335} text="A DAY BEATS A YEAR" size={56} fill="#E5414A" />
          </g>
        )}

        {scene === 'spin' && (() => {
          const d = Math.round(243 * prog(t, T.turn - 0.2, T.turn + 1.2));
          return (
            <g>
              <Stars t={t} />
              <Layer cam={keys(t, [[T.slowly - 0.25, 540, 1150, 1], [T.around - 0.3, 540, 1150, 1.08]])}>
                <g transform="translate(540 1200)"><Venus t={t} s={1.2} rot={-360 * prog(t, T.turn - 0.2, T.turn + 1.2) - 12 * (t - T.slowly)} /></g>
                <path d="M 240 1063 A 330 330 0 0 1 840 1063" stroke="#fff" strokeWidth={10} fill="none" strokeDasharray="20 16" />
                <g transform={`translate(540 1780) scale(${pop(t, T.turn - 0.2, 12, 6)})`}><Counter v={d} label="DAYS TO SPIN ONCE" col="#E5414A" /></g>
              </Layer>
              <Label x={540} y={640} size={86} s={pop(t, T.slowly, 12, 6)} color="#fff">SLOOOW SPIN</Label>
            </g>
          );
        })()}

        {scene === 'orbit' && (() => {
          const u = prog(t, T.around, T.around + 1.4);
          const a = -Math.PI / 2 + 2 * Math.PI * u + Math.PI / 2 * prog(t, T.around + 1.4, T.weird - 0.25);
          return (
            <g>
              <Stars t={t} />
              <Layer cam={keys(t, [[T.around - 0.25, 540, 1000, 1], [T.weird - 0.3, 540, 1000, 1.04]])}>
                <g transform="translate(540 1220) scale(0.85)"><SunC t={t} /></g>
                <circle cx={540} cy={1220} r={320} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="16 18" opacity={0.7} />
                <g transform={`translate(${540 + 320 * Math.cos(a)} ${1220 + 320 * Math.sin(a)})`}><Venus t={t} s={0.42} /></g>
                <g transform={`translate(540 1780) scale(${pop(t, T.around, 12, 6)})`}><Counter v={Math.round(225 * u)} label="DAYS TO ORBIT THE SUN" col="#2C7BE5" /></g>
              </Layer>
              <Label x={540} y={640} size={86} s={pop(t, T.around, 12, 6)} color="#fff">FAST ORBIT</Label>
              <Sticker t={t} t0={T.around + 1.5} x={540} y={790} text="243 > 225" size={70} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'backwards' && (() => {
          const rise = prog(t, T.rises, T.rises + 1.6);
          return (
            <g>
              <Layer cam={keys(t, [[T.weird - 0.25, 540, 1150, 1], [T.card, 520, 1220, 1.1]])}>
                {t < T.rises - 0.25 ? (
                  <g>
                    <rect x={-400} y={-400} width={1900} height={2800} fill="#141A33" />
                    <Stars t={t} />
                    <g transform="translate(540 1300)"><Venus t={t} s={1.3} rot={-t * 90} face="dizzy" /></g>
                    <g transform={`translate(540 1300) rotate(${-t * 90})`}>
                      <path d="M 330 0 A 330 330 0 0 1 0 330" stroke="#FFE45C" strokeWidth={16} fill="none" />
                      <path d="M -20 300 L 0 350 L 30 310" stroke="#FFE45C" strokeWidth={16} fill="none" strokeLinecap="round" />
                    </g>
                  </g>
                ) : (
                  <g>
                    <g transform={`translate(${lerp(260, 400, rise)} ${lerp(1650, 1050, rise)})`}><SunC t={t} s={0.9} /></g>
                    <path d="M -400 1600 Q 200 1520 540 1580 Q 900 1640 1500 1560 L 1500 2400 L -400 2400 Z" fill="#C46A2D" stroke={INK} strokeWidth={LW} />
                    <g transform="translate(120 1760)"><Label x={0} y={0} size={110} color="#fff">W</Label></g>
                    <g transform="translate(960 1760)"><Label x={0} y={0} size={110} color="#fff">E</Label></g>
                  </g>
                )}
              </Layer>
              <Label x={540} y={640} size={t < T.backwards - 0.1 ? 58 : 68} s={pop(t, T.weird, 12, 6)} color="#fff">{t < T.backwards - 0.1 ? "HERE'S THE WEIRD PART" : t < T.rises - 0.25 ? 'IT SPINS BACKWARDS' : 'SUN RISES IN THE WEST'}</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="39-venus-day" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
