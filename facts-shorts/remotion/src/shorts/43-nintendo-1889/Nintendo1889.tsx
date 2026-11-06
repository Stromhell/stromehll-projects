import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SEPIA = '#F1E1C2', RED = '#D62828';

const Torii: React.FC = () => (
  <g>
    <rect x={-260} y={-520} width={60} height={520} fill={RED} stroke={INK} strokeWidth={LW} />
    <rect x={200} y={-520} width={60} height={520} fill={RED} stroke={INK} strokeWidth={LW} />
    <path d="M -360 -560 Q 0 -620 360 -560 L 340 -500 Q 0 -550 -340 -500 Z" fill={RED} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <rect x={-300} y={-440} width={600} height={45} fill={RED} stroke={INK} strokeWidth={LW} />
    <path d="M -380 -600 Q 0 -660 380 -600" stroke={INK} strokeWidth={30} fill="none" strokeLinecap="round" />
  </g>
);

// hanafuda-style card with a simple flower and red sun
const Card: React.FC<{k: number}> = ({k}) => (
  <g>
    <rect x={-90} y={-140} width={180} height={280} rx={14} fill="#FFF7E8" stroke={INK} strokeWidth={LW} />
    <rect x={-74} y={-124} width={148} height={248} rx={8} fill={['#2B3A67', '#C8102E', '#2E7D32', '#6A1B9A'][k % 4]} />
    {k % 2 === 0 ? <circle cx={0} cy={-40} r={44} fill="#F2B632" stroke={INK} strokeWidth={5} /> : <circle cx={0} cy={-40} r={44} fill="#fff" stroke={INK} strokeWidth={5} />}
    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} transform={`translate(0 60) rotate(${a}) translate(0 -26)`} rx={16} ry={26} fill="#FF8AC4" stroke={INK} strokeWidth={4} />)}
    <circle cx={0} cy={60} r={12} fill="#F2B632" stroke={INK} strokeWidth={4} />
  </g>
);

const Taxi: React.FC<{t: number}> = ({t}) => (
  <g>
    <path d="M -230 0 L -230 -90 L -130 -100 L -80 -190 L 120 -190 L 170 -100 L 240 -90 L 240 0 Z" fill="#2B2B2B" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -60 -170 L 0 -170 L 0 -105 L -105 -105 Z M 20 -170 L 105 -170 L 140 -105 L 20 -105 Z" fill="#9FD8FF" stroke={INK} strokeWidth={6} />
    <rect x={-40} y={-230} width={90} height={40} rx={8} fill="#FFD84A" stroke={INK} strokeWidth={6} />
    <text x={5} y={-200} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={26} fill={INK}>TAXI</text>
    {[-140, 150].map((x) => <g key={x} transform={`translate(${x} 10) rotate(${t * 400})`}><circle r={55} fill="#333" stroke={INK} strokeWidth={LW} /><circle r={20} fill="#ccc" /><path d="M 0 -50 L 0 50" stroke="#666" strokeWidth={6} /></g>)}
  </g>
);

const RiceBowl: React.FC<{t: number}> = ({t}) => (
  <g>
    {[0, 1, 2].map((i) => <path key={i} d={`M ${-60 + i * 60} -140 q 20 ${-30 + 10 * Math.sin(t * 4 + i)} 0 -60 q -20 -30 0 -60`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.7} />)}
    <ellipse cx={0} cy={-60} rx={190} ry={60} fill="#fff" stroke={INK} strokeWidth={LW} />
    {Array.from({length: 12}).map((_, i) => <ellipse key={i} cx={-140 + i * 25} cy={-70 - 18 * Math.sin(i * 0.8)} rx={12} ry={7} fill="#F4F4F4" stroke="#ccc" strokeWidth={2} />)}
    <path d="M -190 -60 Q -170 120 0 130 Q 170 120 190 -60" fill={RED} stroke={INK} strokeWidth={LW} />
    <path d="M -120 20 Q 0 50 120 20" stroke="#fff" strokeWidth={10} fill="none" />
  </g>
);

const Pad: React.FC = () => (
  <g>
    <rect x={-300} y={-130} width={600} height={260} rx={120} fill="#E5414A" stroke={INK} strokeWidth={LW} />
    <path d="M -210 -20 L -150 -20 L -150 -80 L -110 -80 L -110 -20 L -50 -20 L -50 20 L -110 20 L -110 80 L -150 80 L -150 20 L -210 20 Z" fill="#333" stroke={INK} strokeWidth={5} />
    <circle cx={140} cy={30} r={34} fill="#FFD84A" stroke={INK} strokeWidth={6} />
    <circle cx={210} cy={-30} r={34} fill="#2C7BE5" stroke={INK} strokeWidth={6} />
  </g>
);

// pixel mushroom-ish power-up (original design)
const Pixel: React.FC<{c: string[]}> = ({c}) => (
  <g>{c.map((row, y) => row.split('').map((ch, x) => ch === '.' ? null : <rect key={`${x}-${y}`} x={x * 24 - 96} y={y * 24 - 96} width={24} height={24} fill={ch === 'r' ? '#E5414A' : ch === 'w' ? '#fff' : ch === 'k' ? INK : '#F2C79A'} />))}</g>
);
const STAR = ['...kk...', '..kyyk..', 'kkyyyykk', 'kyywwyyk', '.kyyyyk.', '.kykkyk.', 'kyk..kyk', 'kk....kk'].map((r) => r.replace(/y/g, 'r'));

export const Nintendo1889: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Kyoto - 0.25 ? 'intro' : t < T.cards - 0.25 ? 'kyoto' : t < T.taxi - 0.25 ? 'cards' : t < T.toys - 0.25 ? 'side' : t < T.Mario - 0.25 ? 'toys' : 'games';
  const cues: Cue[] = [
    {f: 'pop', at: T.Nintendo, db: -20}, {f: 'ding', at: T.Nintendo + 0.8, db: -18},
    {f: 'whoosh', at: T.Kyoto - 0.25, db: -24}, {f: 'knock', at: T.Kyoto + 0.2, db: -20},
    {f: 'whoosh', at: T.cards - 0.25, db: -24}, {f: 'clink', at: T.cards, db: -20}, {f: 'clink', at: T.cards + 0.2, db: -20}, {f: 'clink', at: T.cards + 0.4, db: -20},
    {f: 'whoosh', at: T.taxi - 0.25, db: -24}, {f: 'rumble', at: T.taxi, db: -22}, {f: 'slurp', at: T.rice + 0.2, db: -20},
    {f: 'whoosh', at: T.toys - 0.25, db: -24}, {f: 'boing', at: T.toys + 0.2, db: -18},
    {f: 'whoosh', at: T.Mario - 0.25, db: -24}, {f: 'zap', at: T.Mario, db: -20}, {f: 'ding', at: T.Mario + 0.6, db: -16},
  ];
  const bg = scene === 'games' ? '#1B1B2E' : scene === 'toys' ? '#CFEFFF' : SEPIA;
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bg} />

        {scene === 'intro' && (() => {
          const yr = Math.round(lerp(2026, 1889, prog(t, 0.3, T.Kyoto - 0.8)));
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1200, 1.15], [T.Kyoto - 0.3, 540, 1200, 1]])}>
                <g transform={`translate(540 1180) rotate(${2 * Math.sin(t * 3)}) scale(${pop(t, 0.1, 9, 5)})`}>
                  <rect x={-360} y={-200} width={720} height={340} rx={40} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={260} fill={RED}>{yr}</text>
                </g>
                {[0, 1, 2, 3].map((i) => (
                  <g key={i} transform={`translate(${200 + i * 230} ${1600 + 20 * Math.sin(t * 3 + i)}) rotate(${(i - 1.5) * 12}) scale(${0.55 * pop(t, 0.6 + i * 0.12, 10, 6)})`}><Card k={i} /></g>
                ))}
              </Layer>
              <Label x={540} y={640} size={82} s={pop(t, T.Nintendo, 12, 6)} color="#fff">NINTENDO IS OLD</Label>
              <Sticker t={t} t0={T.Nintendo + 0.6} x={540} y={790} text="OVER 135 YEARS OLD" size={60} fill={RED} />
            </g>
          );
        })()}

        {scene === 'kyoto' && (
          <g>
            <Layer cam={keys(t, [[T.Kyoto - 0.25, 540, 1200, 1], [T.cards - 0.3, 540, 1250, 1.1]])}>
              <rect x={-400} y={1600} width={1900} height={800} fill="#C9A77A" stroke={INK} strokeWidth={LW} />
              <path d="M -400 1000 Q -100 900 200 1000 Q 500 880 800 980 Q 1100 880 1500 980 L 1500 1600 L -400 1600 Z" fill="#A9C79A" opacity={0.6} />
              <g transform={`translate(540 1600) scale(${pop(t, T.Kyoto, 10, 6)})`}><Torii /></g>
              {[0, 1, 2, 3, 4].map((i) => { const a = (t * 0.3 + i / 5) % 1; return <ellipse key={i} cx={100 + i * 220 + 40 * Math.sin(t + i)} cy={900 + 900 * a} rx={14} ry={9} fill="#FFB7D0" transform={`rotate(${a * 360} ${100 + i * 220} ${900 + 900 * a})`} />; })}
            </Layer>
            <Label x={540} y={640} size={86} s={pop(t, T.Kyoto, 12, 6)} color="#fff">KYOTO, JAPAN</Label>
            <Sticker t={t} t0={T.Kyoto + 0.6} x={540} y={790} text="FOUNDED 1889" size={62} fill={RED} />
          </g>
        )}

        {scene === 'cards' && (
          <g>
            <Layer cam={keys(t, [[T.cards - 0.25, 540, 1250, 1], [T.taxi - 0.3, 540, 1250, 1.12]])}>
              {[0, 1, 2, 3, 4].map((i) => {
                const fan = prog(t, T.cards + i * 0.12, T.cards + 0.5 + i * 0.12);
                return <g key={i} transform={`translate(540 1500) rotate(${lerp(0, (i - 2) * 18, fan)}) translate(0 -260) scale(1.15)`}><Card k={i} /></g>;
              })}
              <g transform="translate(540 1520)"><circle r={50} fill="#F4D6B8" stroke={INK} strokeWidth={LW} /></g>
            </Layer>
            <Label x={540} y={640} size={55} s={pop(t, T.cards, 12, 6)} color="#fff">NOT GAMES... PLAYING CARDS</Label>
            <Sticker t={t} t0={T.cards + 0.6} x={540} y={1800} text="HANAFUDA" size={70} fill={RED} />
          </g>
        )}

        {scene === 'side' && (() => {
          const rice = t > T.rice - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.taxi - 0.25, 540, 1250, 1], [T.toys - 0.3, 540, 1250, 1.08]])}>
                <rect x={-400} y={1500} width={1900} height={900} fill="#8A8A8A" stroke={INK} strokeWidth={LW} />
                <path d="M -400 1700 L 1500 1700" stroke="#fff" strokeWidth={14} strokeDasharray="60 50" />
                {!rice
                  ? <g transform={`translate(${lerp(-300, 560, prog(t, T.taxi - 0.2, T.taxi + 0.6))} 1520)`}><Taxi t={t} /></g>
                  : <g>
                      <g transform={`translate(${lerp(560, 1400, prog(t, T.rice - 0.2, T.rice + 0.4))} 1520)`}><Taxi t={t} /></g>
                      <g transform={`translate(540 1440) scale(${pop(t, T.rice, 10, 6)})`}><RiceBowl t={t} /></g>
                    </g>}
              </Layer>
              <Label x={540} y={640} size={84} s={pop(t, T.taxi, 12, 6)} color="#fff">{rice ? 'INSTANT RICE?!' : 'A TAXI COMPANY?!'}</Label>
              <Sticker t={t} t0={T.taxi + 0.3} x={540} y={790} text="IT TRIED EVERYTHING" size={58} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'toys' && (() => {
          const ext = 0.5 + 0.5 * Math.sin((t - T.toys) * 4);
          return (
            <g>
              <Layer cam={keys(t, [[T.toys - 0.25, 540, 1250, 1], [T.Mario - 0.3, 540, 1250, 1.08]])}>
                <rect x={-400} y={1600} width={1900} height={800} fill="#F4D6B8" stroke={INK} strokeWidth={LW} />
                {/* extending grabber toy */}
                <g transform={`translate(260 1450) scale(${pop(t, T.toys, 10, 6)})`}>
                  <rect x={-50} y={-30} width={100} height={170} rx={20} fill="#FFD84A" stroke={INK} strokeWidth={LW} />
                  {[0, 1, 2].map((i) => <path key={i} d={`M ${i * 110 * ext + 40} -10 L ${(i + 1) * 110 * ext + 40} 30 M ${i * 110 * ext + 40} 30 L ${(i + 1) * 110 * ext + 40} -10`} stroke={INK} strokeWidth={12} strokeLinecap="round" />)}
                  <circle cx={330 * ext + 60} cy={10} r={40} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                </g>
                {/* toy blocks */}
                {[0, 1, 2].map((i) => <g key={i} transform={`translate(${700 + (i % 2) * 120} ${1540 - Math.floor(i / 2) * 120}) scale(${pop(t, T.toys + 0.3 + i * 0.15, 12, 6)})`}><rect x={-55} y={-55} width={110} height={110} rx={10} fill={['#2C7BE5', '#2EA043', '#E5414A'][i]} stroke={INK} strokeWidth={LW} /><text y={25} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill="#fff">{'ABC'[i]}</text></g>)}
              </Layer>
              <Label x={540} y={640} size={92} s={pop(t, T.toys, 12, 6)} color="#fff">THEN TOYS</Label>
            </g>
          );
        })()}

        {scene === 'games' && (
          <g>
            {Array.from({length: 24}).map((_, i) => <rect key={i} x={(i * 197) % 1080} y={(i * 331 + t * 200) % 1920} width={14} height={14} fill="#fff" opacity={0.5} />)}
            <Layer cam={keys(t, [[T.Mario - 0.25, 540, 1250, 1.1], [T.card, 540, 1250, 1]])}>
              <g transform={`translate(540 1500) rotate(${4 * Math.sin(t * 5)}) scale(${pop(t, T.Mario, 10, 6)})`}><Pad /></g>
              <g transform={`translate(540 ${1100 - 40 * Math.abs(Math.sin(t * 4))}) scale(${1.4 * pop(t, T.Mario + 0.3, 10, 6)}) rotate(${t * 40})`}><Pixel c={STAR} /></g>
            </Layer>
            <Label x={540} y={640} size={64} s={pop(t, T.Mario, 12, 6)} color="#FFE45C">THEN GAMES TOOK OVER</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="43-nintendo-1889" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
