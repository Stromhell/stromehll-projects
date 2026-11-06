import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys, shake, clamp} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

const SEA = '#3E8FC4', RED = '#C8102E';

const Stopwatch: React.FC<{t: number; mins: number}> = ({t, mins}) => (
  <g>
    <rect x={-30} y={-250} width={60} height={50} rx={10} fill="#ccc" stroke={INK} strokeWidth={LW} />
    <circle r={200} fill="#fff" stroke={INK} strokeWidth={LW} />
    {Array.from({length: 12}).map((_, i) => <path key={i} transform={`rotate(${i * 30})`} d="M 0 -180 L 0 -150" stroke={INK} strokeWidth={8} />)}
    <path d={`M 0 0 L 0 -170`} transform={`rotate(${mins * 6})`} stroke="#E5414A" strokeWidth={12} strokeLinecap="round" />
    <path d={`M 0 0 L 0 -150 A 150 150 0 ${mins > 30 ? 1 : 0} 1 ${150 * Math.sin(mins * 6 * Math.PI / 180)} ${-150 * Math.cos(mins * 6 * Math.PI / 180)} Z`} fill="#E5414A" opacity={0.25} />
    <circle r={16} fill={INK} />
    <text y={95} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={INK}>{`${Math.round(mins)} MIN`}</text>
  </g>
);

const Ship: React.FC<{t: number; fire?: number}> = ({t, fire = 0}) => (
  <g transform={`rotate(${2 * Math.sin(t * 1.5)})`}>
    <path d="M -230 0 L 230 0 L 180 90 L -190 90 Z" fill="#59606B" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <rect x={-120} y={-90} width={200} height={90} fill="#D9DEE6" stroke={INK} strokeWidth={LW} />
    <rect x={-60} y={-180} width={50} height={90} fill="#3A3F47" stroke={INK} strokeWidth={LW} />
    <rect x={20} y={-160} width={40} height={70} fill="#3A3F47" stroke={INK} strokeWidth={LW} />
    {[0, 1].map((i) => { const a = (t * 0.6 + i / 2) % 1; return <circle key={i} cx={-35 - 30 * a} cy={-200 - 150 * a} r={25 + 40 * a} fill="#bbb" opacity={0.7 * (1 - a)} />; })}
    <path d="M 120 -40 L 260 -60" stroke={INK} strokeWidth={22} strokeLinecap="round" />
    {fire > 0 && <g transform="translate(275 -62)"><circle r={60 * fire} fill="#FFD84A" stroke="#FFB020" strokeWidth={10} /></g>}
    <path d="M -200 -10 L -200 -110" stroke={INK} strokeWidth={8} />
    <rect x={-200} y={-110} width={70} height={45} fill="#1F3A93" stroke={INK} strokeWidth={4} />
    <path d="M -200 -110 L -130 -65 M -130 -110 L -200 -65" stroke="#fff" strokeWidth={8} />
    <path d="M -165 -110 L -165 -65 M -200 -87 L -130 -87" stroke={RED} strokeWidth={8} />
  </g>
);

const Palace: React.FC<{t: number; dmg: number; flag: number}> = ({t, dmg, flag}) => (
  <g>
    <rect x={-300} y={-300} width={600} height={300} fill="#F4EBD6" stroke={INK} strokeWidth={LW} />
    {[-220, -110, 0, 110, 220].map((x) => <path key={x} d={`M ${x - 30} -40 L ${x - 30} -160 Q ${x} -200 ${x + 30} -160 L ${x + 30} -40`} fill="#7A5A42" stroke={INK} strokeWidth={6} />)}
    <rect x={-120} y={-420} width={240} height={120} fill="#F4EBD6" stroke={INK} strokeWidth={LW} />
    <path d={`M 140 -420 L 140 ${lerp(-620, -440, flag)}`} stroke={INK} strokeWidth={10} />
    <path d="M 140 -620 L 140 -440" stroke={INK} strokeWidth={10} />
    <rect x={140} y={lerp(-620, -480, flag)} width={110} height={65} fill={RED} stroke={INK} strokeWidth={6} />
    {dmg > 0 && <g opacity={dmg}>
      <path d="M -300 -300 L -200 -380 L -120 -300 Z" fill={INK} opacity={0.2} />
      <path d="M -150 -300 L -110 -230 L -170 -160 L -120 -90" stroke={INK} strokeWidth={8} fill="none" />
      <path d="M 180 -300 L 140 -220 L 200 -150" stroke={INK} strokeWidth={8} fill="none" />
      <path d="M 30 -420 L 60 -380 L 20 -330" stroke={INK} strokeWidth={8} fill="none" />
      {[0, 1, 2].map((i) => { const a = (t * 0.5 + i / 3) % 1; return <circle key={i} cx={-100 + i * 120 + 30 * a} cy={-350 - 300 * a} r={50 + 70 * a} fill="#777" opacity={0.6 * (1 - a)} />; })}
    </g>}
  </g>
);

const Clock: React.FC<{text: string}> = ({text}) => (
  <g>
    <rect x={-250} y={-80} width={500} height={150} rx={26} fill="#1B1B2E" stroke={INK} strokeWidth={LW} />
    <text y={35} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={88} fill="#7CFF6B">{text}</text>
  </g>
);

export const ShortestWar: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Zanzibar - 0.25 ? 'intro' : t < T.warships - 0.25 ? 'sultan' : t < T.palace - 0.25 ? 'fire' : 'palace';
  const cues: Cue[] = [
    {f: 'ticktock', at: 0.3, db: -22}, {f: 'ding', at: T.shortest + 0.3, db: -18},
    {f: 'whoosh', at: T.Zanzibar - 0.25, db: -24}, {f: 'pop', at: T.sultan, db: -18}, {f: 'blegh', at: T.sultan + 1.2, db: -22},
    {f: 'whoosh', at: T.warships - 0.25, db: -24}, {f: 'ocean', at: T.warships, db: -26}, {f: 'crack', at: T.fire, db: -14}, {f: 'rumble', at: T.fire + 0.1, db: -18}, {f: 'crack', at: T.fire + 0.6, db: -16},
    {f: 'whoosh', at: T.palace - 0.25, db: -24}, {f: 'rumble', at: T.palace, db: -18}, {f: 'creak', at: T.flag, db: -18}, {f: 'ding', at: T.over, db: -16},
  ];
  return (
    <AbsoluteFill style={{background: '#BFE8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#BFE8FF" />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1250, 1], [T.Zanzibar - 0.3, 540, 1250, 1.05]])}>
              <g transform={`translate(540 1330) rotate(${3 * Math.sin(t * 5)}) scale(${pop(t, 0.1, 9, 5) * 1.1})`}><Stopwatch t={t} mins={lerp(0, 38, prog(t, 0.3, T.Zanzibar - 0.6))} /></g>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.shortest, 12, 6)} color="#FFE45C">SHORTEST WAR EVER</Label>
            <Sticker t={t} t0={T.shortest + 0.8} x={540} y={1760} text="UNDER 45 MINUTES" size={66} fill="#E5414A" />
          </g>
        )}

        {scene === 'sultan' && (
          <g>
            <Layer cam={keys(t, [[T.Zanzibar - 0.25, 540, 1150, 1], [T.sultan - 0.2, 540, 1150, 1], [T.warships - 0.3, 560, 1250, 1.12]])}>
              <path d={wavePath(t, 1500, 20, 200, 2)} fill={SEA} />
              <path d="M 120 1500 Q 140 1380 300 1390 Q 520 1360 700 1420 Q 880 1460 940 1500 Z" fill="#E8C27A" stroke={INK} strokeWidth={LW} />
              <path d="M 300 1395 Q 280 1250 340 1220 M 340 1220 l -60 -10 m 60 10 l -40 -50 m 40 50 l 20 -60 m -20 60 l 60 -30" stroke="#3F8A4A" strokeWidth={14} fill="none" strokeLinecap="round" />
              <g transform={`translate(560 1400) scale(${0.62 * pop(t, T.sultan, 10, 6)})`}>
                <Guy t={t} expr="happy" handL={[-150, -330]} handR={[150, -330]} stand blink={t % 2.8 < 0.12} />
                <path d="M -110 -460 Q 10 -560 130 -460 L 120 -420 L -100 -420 Z" fill="#fff" stroke={INK} strokeWidth={LW} />
                <circle cx={10} cy={-520} r={18} fill="#2EA043" stroke={INK} strokeWidth={6} />
              </g>
              <g transform={`translate(${lerp(1400, 870, prog(t, T.sultan + 0.6, T.sultan + 1.2))} 1530) scale(0.45)`}><Ship t={t} /></g>
            </Layer>
            <Label x={540} y={640} size={75} s={pop(t, T.Zanzibar, 12, 6)} color="#fff">BRITAIN vs ZANZIBAR</Label>
            <Sticker t={t} t0={T.Zanzibar + 0.3} x={540} y={790} text="1896" size={70} fill="#2C7BE5" />
            <Sticker t={t} t0={T.sultan + 1.2} x={540} y={1800} text="NEW SULTAN? NOT APPROVED" size={48} fill={RED} />
          </g>
        )}

        {scene === 'fire' && (() => {
          const f1 = t > T.fire ? clamp(1 - (t - T.fire) / 0.35) : 0, f2 = t > T.fire + 0.6 ? clamp(1 - (t - T.fire - 0.6) / 0.35) : 0;
          const [jx, jy] = shake(t, (f1 + f2) * 8);
          return (
            <g>
              <Layer cam={keys(t, [[T.warships - 0.25, 540, 1200, 1], [T.fire, 520, 1250, 1.05], [T.palace - 0.3, 600, 1250, 1.15]])}>
                <g transform={`translate(${jx} ${jy})`}>
                  <path d={wavePath(t, 1250, 24, 220, 2)} fill={SEA} />
                  <g transform="translate(330 1330) scale(0.75)"><Ship t={t} fire={Math.max(f1, f2)} /></g>
                  <g transform="translate(700 1500) scale(0.6)"><Ship t={t + 1} fire={f2} /></g>
                  <path d={wavePath(t + 1, 1550, 20, 200, 2.4)} fill={SEA} opacity={0.8} />
                </g>
              </Layer>
              <g transform={`translate(540 860) scale(${pop(t, T.fire, 12, 6)})`}><Clock text="9:00 AM" /></g>
              <Label x={540} y={640} size={86} s={pop(t, T.warships, 12, 6)} color="#fff">{t < T.fire ? 'WARSHIPS ARRIVE' : 'OPEN FIRE!'}</Label>
            </g>
          );
        })()}

        {scene === 'palace' && (() => {
          const dmg = prog(t, T.palace, T.palace + 0.6);
          const flag = prog(t, T.flag, T.flag + 0.8);
          const [jx, jy] = shake(t, t < T.palace + 0.8 && t > T.palace ? 8 : 0);
          const mins = lerp(0, 40, prog(t, T.palace - 0.25, T.over));
          return (
            <g>
              <Layer cam={keys(t, [[T.palace - 0.25, 540, 1200, 1], [T.over, 540, 1250, 1.05], [T.card, 540, 1250, 1.12]])}>
                <rect x={-400} y={1560} width={1900} height={900} fill="#E8C27A" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(${540 + jx} ${1560 + jy}) scale(0.95)`}><Palace t={t} dmg={dmg} flag={flag} /></g>
              </Layer>
              <g transform={`translate(540 1740) scale(${pop(t, T.palace, 12, 6)})`}><Clock text={t < T.over ? `9:${String(Math.round(mins)).padStart(2, '0')} AM` : '9:40 AM'} /></g>
              <Label x={540} y={640} size={86} s={pop(t, T.palace, 12, 6)} color="#fff">{t < T.flag ? 'PALACE WRECKED' : t < T.over ? 'FLAG COMES DOWN' : 'WAR OVER!'}</Label>
              <Sticker t={t} t0={T.over + 0.2} x={540} y={790} text="ABOUT 40 MINUTES" size={64} fill={RED} />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="41-shortest-war" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
