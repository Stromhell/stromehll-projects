import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#FFE3E6', RED = '#E5414A', DARK = '#B22234';

const Heart: React.FC<{t: number; s?: number; face?: boolean; tired?: boolean}> = ({t, s = 1, face = true, tired}) => {
  const b = 1 + 0.08 * Math.max(0, Math.sin(t * 7.5));
  return (
    <g transform={`scale(${s * b})`}>
      <path d="M 0 150 C -260 -10 -170 -230 0 -110 C 170 -230 260 -10 0 150 Z" fill={RED} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -110 -110 Q -140 -60 -120 -20" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.6} />
      {face && <g>
        {tired ? <path d="M -70 -20 Q -50 -10 -30 -20 M 30 -20 Q 50 -10 70 -20" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" /> : <><circle cx={-50} cy={-20} r={14} fill={INK} /><circle cx={50} cy={-20} r={14} fill={INK} /></>}
        <path d="M -30 30 Q 0 60 30 30" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>}
    </g>
  );
};

const Counter: React.FC<{v: string; label: string; s: number}> = ({v, label, s}) => (
  <g transform={`scale(${s})`}>
    <rect x={-450} y={-80} width={900} height={190} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
    <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={78} fill={RED}>{v}</text>
    <text y={85} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill={INK}>{label}</text>
  </g>
);

export const HeartBeats: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.million - 0.25 ? 'day' : t < T.vessels - 0.25 ? 'life' : t < T.Laid - 0.25 ? 'vessels' : t < T.off - 0.25 ? 'earth' : 'off';
  const beats: Cue[] = Array.from({length: 6}).map((_, i) => ({f: 'knock', at: 0.2 + i * 0.84, db: -20}));
  const cues: Cue[] = [
    ...beats, {f: 'ding', at: 1.6, db: -20},
    {f: 'whoosh', at: T.million - 0.25, db: -24}, {f: 'tick', at: T.million + 0.2, db: -20}, {f: 'ding', at: T.billion + 0.3, db: -18},
    {f: 'whoosh', at: T.vessels - 0.25, db: -24}, {f: 'pour', at: T.vessels + 0.2, db: -22},
    {f: 'whoosh', at: T.Laid - 0.25, db: -24}, {f: 'rise', at: T.Laid + 0.2, db: -20}, {f: 'boing', at: T.Laid + 1.6, db: -20},
    {f: 'whoosh', at: T.off - 0.25, db: -24}, {f: 'knock', at: T.off + 0.2, db: -18}, {f: 'knock', at: T.off + 0.5, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'day' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1070, 1.08], [T.million - 0.3, 540, 1070, 1]])}>
              <g transform="translate(540 1280)"><Heart t={t} s={1.2} /></g>
              <g transform={`translate(540 1730)`}><Counter v={Math.round(100000 * prog(t, 0.3, T.million - 0.5)).toLocaleString('en-US')} label="BEATS EVERY DAY" s={pop(t, 0.2, 12, 6)} /></g>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, 0.1, 12, 6)} color="#fff">YOUR HEART BEATS</Label>
            <Sticker t={t} t0={0.6} x={540} y={790} text="100,000 TIMES A DAY" size={60} fill={RED} />
          </g>
        )}

        {scene === 'life' && (() => {
          const big = t > T.billion - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.million - 0.25, 540, 1070, 1], [T.vessels - 0.3, 540, 1070, 1.06]])}>
                {Array.from({length: big ? 30 : 12}).map((_, i) => <g key={i} transform={`translate(${130 + (i % 6) * 165} ${1050 + Math.floor(i / 6) * 140}) scale(${0.2 * pop(t, (big ? T.billion : T.million) + i * 0.03, 12, 6)})`}><Heart t={t + i * 0.1} face={false} /></g>)}
                <g transform="translate(540 1830)"><Counter v={big ? '2,500,000,000+' : '35,000,000'} label={big ? 'IN A LIFETIME' : 'EVERY YEAR'} s={pop(t, big ? T.billion : T.million + 0.2, 12, 6)} /></g>
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, T.million, 12, 6)} color="#fff">{big ? 'IN A LIFETIME' : 'IN ONE YEAR'}</Label>
            </g>
          );
        })()}

        {scene === 'vessels' && (
          <g>
            <Layer cam={keys(t, [[T.vessels - 0.25, 540, 1120, 1], [T.Laid - 0.3, 540, 1120, 1.08]])}>
              {Array.from({length: 7}).map((_, i) => {
                const k = (i - 3) * 0.45, d = `M 540 1500 Q ${540 + 300 * Math.sin(k)} ${1350 - 100 * Math.cos(k)} ${540 + 420 * Math.sin(k)} ${1100 + 80 * Math.abs(k)}`;
                return <g key={i}><path d={d} stroke={i % 2 ? DARK : RED} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray="1600" strokeDashoffset={1600 * (1 - prog(t, T.vessels + i * 0.08, T.vessels + 1.2))} />
                  {[0, 0.5].map((o) => { const u = ((t * 0.7 + o + i * 0.13) % 1), x0 = 540, y0 = 1500, cx = 540 + 300 * Math.sin(k), cy = 1350 - 100 * Math.cos(k), x1 = 540 + 420 * Math.sin(k), y1 = 1100 + 80 * Math.abs(k);
                    const x = (1 - u) ** 2 * x0 + 2 * (1 - u) * u * cx + u * u * x1, y = (1 - u) ** 2 * y0 + 2 * (1 - u) * u * cy + u * u * y1;
                    return <circle key={o} cx={x} cy={y} r={10} fill="#fff" stroke={INK} strokeWidth={3} opacity={prog(t, T.vessels + 1.0, T.vessels + 1.3)} />; })}</g>;
              })}
              <g transform="translate(540 1500)"><Heart t={t} s={0.7} /></g>
            </Layer>
            <Label x={540} y={640} size={66} s={pop(t, T.vessels, 12, 6)} color="#fff">100,000 KM OF VESSELS</Label>
            <Sticker t={t} t0={T.vessels + 0.5} x={540} y={790} text="EVERY BEAT PUSHES BLOOD" size={50} fill={DARK} />
          </g>
        )}

        {scene === 'earth' && (() => {
          const u = prog(t, T.Laid + 0.2, T.off - 0.4, (x) => x);
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#141A33" />
              <Layer cam={keys(t, [[T.Laid - 0.25, 540, 1120, 1], [T.off - 0.3, 540, 1120, 1.05]])}>
                <circle cx={540} cy={1380} r={280} fill="#4FA3E0" stroke={INK} strokeWidth={LW} />
                <path d="M 400 1260 Q 480 1190 560 1260 Q 520 1360 420 1340 Z M 600 1440 Q 720 1400 740 1510 Q 640 1560 600 1440 Z" fill="#5DB55A" stroke={INK} strokeWidth={6} />
                <ellipse cx={540} cy={1380} rx={350} ry={330} fill="none" stroke={RED} strokeWidth={16} strokeDasharray={`${2150 * Math.min(1, u * 2.5)} 3000`} transform="rotate(-90 540 1380)" />
                <ellipse cx={540} cy={1380} rx={400} ry={380} fill="none" stroke={DARK} strokeWidth={16} strokeDasharray={`${2470 * Math.max(0, Math.min(1, u * 2.5 - 1))} 3000`} transform="rotate(-90 540 1380)" />
                <text x={540} y={1860} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke">{`x${(Math.min(2.5, u * 3)).toFixed(1)}`}</text>
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.Laid, 12, 6)} color="#fff">LAID END TO END</Label>
              <Sticker t={t} t0={T.Laid + 0.5} x={540} y={790} text="AROUND EARTH TWICE+" size={56} fill={RED} />
            </g>
          );
        })()}

        {scene === 'off' && (
          <g>
            <Layer cam={keys(t, [[T.off - 0.25, 540, 1070, 1], [T.card, 540, 1070, 1.06]])}>
              <g transform="translate(540 1350)"><Heart t={t} s={1.1} /></g>
              <g transform={`translate(540 1780) rotate(-6) scale(${pop(t, T.off + 0.3, 12, 6)})`}>
                <rect x={-300} y={-60} width={600} height={110} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={INK}>DAYS OFF: 0</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={78} s={pop(t, T.off, 12, 6)} color="#fff">NEVER A DAY OFF</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="67-heart-beats" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
