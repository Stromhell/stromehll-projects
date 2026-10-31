import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, clamp, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

// ---------------------------------------------------------------- props
const Snowflake: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    {[0, 60, 120].map((a) => <path key={a} transform={`rotate(${a})`} d="M 0 -22 L 0 22 M -6 -16 L 0 -10 L 6 -16 M -6 16 L 0 10 L 6 16" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />)}
  </g>
);
const Snowfall: React.FC<{t: number; n?: number}> = ({t, n = 26}) => (
  <g>{Array.from({length: n}).map((_, i) => {
    const x = ((i * 233) % W) + 30 * Math.sin(t * 1.3 + i), y = ((i * 397 + t * (90 + (i % 4) * 25)) % 2000) - 60;
    return <g key={i} transform={`translate(${x} ${y}) rotate(${t * 40 + i * 20})`}><Snowflake s={0.7 + (i % 3) * 0.3} /></g>;
  })}</g>
);

// close-up forearm (white cut-out skin like the Guy), bumps rise with `up`
const armTop = (x: number) => 1085 - 30 * Math.sin((Math.PI * (x + 150)) / 1010);
const BUMPS = Array.from({length: 24}).map((_, i) => [40 + (i % 8) * 100 + (Math.floor(i / 8) % 2) * 45, 1150 + Math.floor(i / 8) * 70]);
const Arm: React.FC<{t: number; up: (i: number) => number}> = ({t, up}) => (
  <g>
    <path d="M -150 1080 C 200 1040 600 1040 860 1090 L 860 1330 C 600 1360 200 1350 -150 1330 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -150 1300 C 200 1320 600 1325 840 1300" stroke="#E4E7EB" strokeWidth={22} fill="none" strokeLinecap="round" />
    {/* fist */}
    <g transform="translate(930 1210)">
      <circle r={128} fill="#fff" stroke={INK} strokeWidth={LW} />
      {[-60, -10, 40].map((y) => <path key={y} d={`M 40 ${y} Q 90 ${y + 20} 112 ${y + 8}`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />)}
      <path d="M -60 -70 Q 0 -110 60 -90" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
    {/* hairs along the top edge */}
    {Array.from({length: 13}).map((_, i) => {
      const x = -80 + i * 72, y = armTop(x) + 4, a = lerp(68, 6, up(i)) + 4 * Math.sin(t * 2 + i);
      return <path key={i} transform={`translate(${x} ${y}) rotate(${a})`} d="M 0 0 L 0 -48" stroke={INK} strokeWidth={7} strokeLinecap="round" />;
    })}
    {/* bumps on the surface, three with little faces */}
    {BUMPS.map(([x, y], i) => {
      const k = up(i); const big = i === 4 || i === 10 || i === 19; const r = big ? 22 : 13;
      return (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path transform={`rotate(${lerp(65, 5, k)})`} d="M 0 0 L 0 -34" stroke={INK} strokeWidth={5} strokeLinecap="round" />
          {k > 0.02 && <g transform={`scale(${k})`}>
            <circle r={r} fill="#fff" stroke={INK} strokeWidth={5} />
            <path d={`M ${-r * 0.6} ${r * 0.3} A ${r * 0.8} ${r * 0.8} 0 0 0 ${r * 0.6} ${r * 0.5}`} stroke="#E4E7EB" strokeWidth={4} fill="none" />
            {big && <g><circle cx={-7} cy={-3} r={3.5} fill={INK} /><circle cx={7} cy={-3} r={3.5} fill={INK} /><path d="M -6 7 Q 0 12 6 7" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" /></g>}
          </g>}
        </g>
      );
    })}
  </g>
);

// skin cross-section: hair, follicle and the tiny arrector pili muscle character
const SkinSection: React.FC<{t: number; pull: number; muscle: number}> = ({t, pull, muscle}) => {
  const bump = 60 * pull;
  const surf = (x: number) => -bump * Math.exp(-(x * x) / (2 * 110 * 110));
  const xs = Array.from({length: 63}).map((_, i) => -620 + i * 20);
  const top = xs.map((x) => `${x} ${surf(x).toFixed(1)}`);
  const bot = xs.map((x) => `${x} ${(surf(x) * 0.8 + 70).toFixed(1)}`).reverse();
  const strain = pull > 0.15;
  const [jx, jy] = strain ? shake(t, 2.5) : [0, 0];
  const a = lerp(-35, 0, pull) + (strain ? 0 : 2 * Math.sin(t * 1.8));
  const rad = (a * Math.PI) / 180;
  const A: [number, number] = [-250, 92];
  const F: [number, number] = [-230 * Math.sin(rad), 230 * Math.cos(rad) + surf(0)];
  const mx = (A[0] + F[0]) / 2, my = (A[1] + F[1]) / 2;
  const sag = 40 * (1 - pull);
  const md = `M ${A[0]} ${A[1]} Q ${mx} ${my + sag} ${F[0]} ${F[1]}`;
  const mw = lerp(54, 74, pull);
  const follicle = (
    <g transform={`translate(0 ${surf(0)}) rotate(${a})`}>
      <rect x={-32} y={-6} width={64} height={410} rx={32} fill="#F7C0A8" stroke={INK} strokeWidth={7} />
      <circle cx={0} cy={410} r={48} fill="#E58F6E" stroke={INK} strokeWidth={7} />
      <path d="M 0 400 L 0 0" stroke="#5A3A22" strokeWidth={14} strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      <rect x={-620} y={0} width={1240} height={960} fill="#FBD5C8" />
      {/* blood vessels and fat */}
      <path d={`M -620 300 ${Array.from({length: 13}).map((_, i) => `Q ${-570 + i * 100} ${280 + 18 * Math.sin(t * 2 + i)} ${-520 + i * 100} 300`).join(' ')}`} stroke="#E5414A" strokeWidth={14} fill="none" opacity={0.55} />
      <path d={`M -620 340 ${Array.from({length: 13}).map((_, i) => `Q ${-570 + i * 100} ${360 - 18 * Math.sin(t * 2 + i)} ${-520 + i * 100} 340`).join(' ')}`} stroke="#5B7FD6" strokeWidth={12} fill="none" opacity={0.5} />
      {Array.from({length: 9}).map((_, i) => <ellipse key={i} cx={-560 + i * 140} cy={620 + (i % 2) * 40} rx={70} ry={50} fill="#FFE7A0" stroke={INK} strokeWidth={5} />)}
      {follicle}
      <path d={`M ${top.join(' L ')} L ${bot.join(' L ')} Z`} fill="#F4A99A" />
      <path d={`M ${top.join(' L ')}`} fill="none" stroke={INK} strokeWidth={LW} strokeLinecap="round" />
      {/* hair above the skin */}
      <g transform={`translate(0 ${surf(0)}) rotate(${a})`}>
        <path d="M 0 0 L 0 -250" stroke={INK} strokeWidth={24} strokeLinecap="round" />
        <path d="M 0 0 L 0 -250" stroke="#7A4E2C" strokeWidth={12} strokeLinecap="round" />
      </g>
      {/* the muscle character */}
      {muscle > 0.01 && (
        <g transform={`translate(${mx + jx} ${my + jy}) scale(${muscle}) translate(${-mx} ${-my})`}>
          <path d={md} stroke={INK} strokeWidth={mw + 18} fill="none" strokeLinecap="round" />
          <path d={md} stroke="#E5414A" strokeWidth={mw} fill="none" strokeLinecap="round" />
          <path d={md} stroke="#B8323A" strokeWidth={mw * 0.6} fill="none" strokeDasharray="6 22" />
          <circle cx={A[0]} cy={A[1]} r={20} fill="#fff" stroke={INK} strokeWidth={6} />
          <circle cx={F[0]} cy={F[1]} r={20} fill="#fff" stroke={INK} strokeWidth={6} />
          <g transform={`translate(${mx} ${my + sag / 2})`}>
            {strain
              ? <g><path d="M -26 -14 L -12 -6 L -26 2" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M 26 -14 L 12 -6 L 26 2" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <rect x={-16} y={8} width={32} height={14} rx={4} fill="#fff" stroke={INK} strokeWidth={5} /><path d="M -5 8 L -5 22 M 5 8 L 5 22" stroke={INK} strokeWidth={3} /></g>
              : <g><circle cx={-16} cy={-8} r={8} fill="#fff" stroke={INK} strokeWidth={4} /><circle cx={16} cy={-8} r={8} fill="#fff" stroke={INK} strokeWidth={4} />
                <circle cx={-15} cy={-6} r={t % 2.8 < 0.12 ? 1 : 4} fill={INK} /><circle cx={17} cy={-6} r={t % 2.8 < 0.12 ? 1 : 4} fill={INK} />
                <path d="M -8 10 Q 0 16 8 10" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" /></g>}
          </g>
        </g>
      )}
    </g>
  );
};

// fur outline: scalloped tufts around a circle
const furD = (r: number, amp: number, n: number, t: number) => {
  let d = '';
  for (let k = 0; k < n; k++) {
    const a0 = (k / n) * 2 * Math.PI, am = ((k + 0.5) / n) * 2 * Math.PI;
    const ro = r + amp * (1.6 + 0.2 * Math.sin(t * 3 + k));
    if (k === 0) d += `M ${(r * Math.cos(a0)).toFixed(1)} ${(r * Math.sin(a0)).toFixed(1)}`;
    const a1 = ((k + 1) / n) * 2 * Math.PI;
    d += ` Q ${(ro * Math.cos(am)).toFixed(1)} ${(ro * Math.sin(am)).toFixed(1)} ${(r * Math.cos(a1)).toFixed(1)} ${(r * Math.sin(a1)).toFixed(1)}`;
  }
  return d + ' Z';
};

// cartoon furry ancestor (round early primate)
const Furry: React.FC<{t: number; fluff: number; mood: 'calm' | 'cosy' | 'roar'; bubbles?: number; furOp?: number}> = ({t, fluff, mood, bubbles = 0, furOp = 1}) => {
  const r = 170 * (1 + 0.28 * fluff); const amp = 14 + 26 * fluff;
  const blink = t % 3.1 < 0.12;
  return (
    <g>
      {[-1, 1].map((sd) => <circle key={sd} cx={sd * 118} cy={-150} r={36} fill="#9A6236" stroke={INK} strokeWidth={LW} />)}
      {[-1, 1].map((sd) => <ellipse key={'f' + sd} cx={sd * 70} cy={r + 6} rx={50} ry={26} fill="#7A4A26" stroke={INK} strokeWidth={LW} />)}
      <g opacity={furOp}>
        <path d={furD(r, amp, 24, t)} fill="#9A6236" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
        <path d={furD(r * 0.82, amp * 0.5, 20, t + 1)} fill="#B27A48" />
      </g>
      {furOp < 1 && <circle r={r * 0.82} fill="#fff" stroke={INK} strokeWidth={LW} opacity={1 - furOp} />}
      {bubbles > 0 && Array.from({length: 7}).map((_, i) => {
        const ang = (i / 7) * 2 * Math.PI + 0.3, rr = r * 0.9 + 8 * Math.sin(t * 2 + i);
        const k = clamp(bubbles * 7 - i);
        return k > 0 ? (
          <g key={i} transform={`translate(${rr * Math.cos(ang)} ${rr * Math.sin(ang)}) scale(${k})`}>
            <circle r={26} fill="#FFB347" stroke={INK} strokeWidth={5} opacity={0.92} />
            <circle cx={-6} cy={-4} r={3} fill={INK} /><circle cx={6} cy={-4} r={3} fill={INK} />
            <path d="M -6 6 Q 0 11 6 6" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
        ) : null;
      })}
      {/* arms */}
      {[-1, 1].map((sd) => <ellipse key={'a' + sd} cx={sd * (r * 0.78)} cy={40} rx={34} ry={60} fill="#8A5530" stroke={INK} strokeWidth={LW} transform={`rotate(${sd * -20 + (mood === 'roar' ? sd * -40 : 0)} ${sd * r * 0.78} 40)`} />)}
      {/* face */}
      <ellipse cx={0} cy={-50} rx={100} ry={84} fill="#F2C9A0" stroke={INK} strokeWidth={7} />
      <path d={mood === 'roar' ? 'M -70 -112 L -20 -92 M 70 -112 L 20 -92' : 'M -66 -104 Q -44 -116 -22 -104 M 22 -104 Q 44 -116 66 -104'} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      {mood === 'cosy'
        ? <g><path d="M -58 -74 Q -42 -88 -26 -74" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /><path d="M 26 -74 Q 42 -88 58 -74" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /></g>
        : <g><ellipse cx={-42} cy={-74} rx={11} ry={blink ? 2 : 15} fill={INK} /><ellipse cx={42} cy={-74} rx={11} ry={blink ? 2 : 15} fill={INK} /></g>}
      <ellipse cx={0} cy={-18} rx={58} ry={38} fill="#F7DDBF" stroke={INK} strokeWidth={6} />
      <ellipse cx={-14} cy={-34} rx={6} ry={4} fill={INK} /><ellipse cx={14} cy={-34} rx={6} ry={4} fill={INK} />
      {mood === 'roar'
        ? <g><path d="M -36 -10 Q 0 50 36 -10 Z" fill={INK} /><path d="M -28 -8 L -20 6 L -12 -6 M 12 -6 L 20 6 L 28 -8" fill="#fff" stroke="#fff" strokeWidth={3} /></g>
        : <path d="M -24 -6 Q 0 12 24 -6" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
      <circle cx={-76} cy={-36} r={12} fill="#E5414A" opacity={0.35} /><circle cx={76} cy={-36} r={12} fill="#E5414A" opacity={0.35} />
    </g>
  );
};

// grey wolf, side view facing left
const Wolf: React.FC<{t: number; scared: boolean; run: number}> = ({t, scared, run}) => {
  const leg = run > 0 ? 26 * Math.sin(t * 22) : 0;
  return (
    <g>
      <path d="M 140 -30 Q 230 -60 240 -150" stroke={INK} strokeWidth={40} fill="none" strokeLinecap="round" />
      <path d="M 140 -30 Q 230 -60 240 -150" stroke="#8A94A6" strokeWidth={24} fill="none" strokeLinecap="round" />
      {[-80, -40, 60, 100].map((x, i) => (
        <path key={i} d={`M ${x} 10 L ${x + (i % 2 ? leg : -leg)} 110`} stroke={INK} strokeWidth={34} strokeLinecap="round" />
      ))}
      {[-80, -40, 60, 100].map((x, i) => (
        <path key={'i' + i} d={`M ${x} 10 L ${x + (i % 2 ? leg : -leg)} 110`} stroke="#8A94A6" strokeWidth={20} strokeLinecap="round" />
      ))}
      <ellipse cx={20} cy={-10} rx={160} ry={72} fill="#8A94A6" stroke={INK} strokeWidth={LW} />
      <path d="M -60 30 Q 20 50 110 30" stroke="#C3CAD5" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M -170 -150 L -150 -230 L -110 -160 Z M -110 -160 L -80 -230 L -60 -150 Z" fill="#8A94A6" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <circle cx={-120} cy={-100} r={80} fill="#8A94A6" stroke={INK} strokeWidth={LW} />
      <path d="M -170 -110 L -270 -70 L -250 -40 L -160 -40 Z" fill="#C3CAD5" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <circle cx={-268} cy={-70} r={14} fill={INK} />
      {scared
        ? <g><ellipse cx={-140} cy={-122} rx={18} ry={24} fill="#fff" stroke={INK} strokeWidth={6} /><circle cx={-136} cy={-118} r={8} fill={INK} /><ellipse cx={-210} cy={-30} rx={16} ry={20} fill={INK} /></g>
        : <g><path d="M -164 -140 L -116 -124" stroke={INK} strokeWidth={8} strokeLinecap="round" /><circle cx={-140} cy={-114} r={9} fill={INK} />
          <path d="M -250 -44 L -170 -44" stroke={INK} strokeWidth={6} /><path d="M -236 -44 L -228 -30 L -220 -44 M -200 -44 L -192 -30 L -184 -44" fill="#fff" stroke={INK} strokeWidth={3} /></g>}
    </g>
  );
};

const Ghost: React.FC<{t: number}> = ({t}) => (
  <g transform={`rotate(${4 * Math.sin(t * 3)})`}>
    <path d={`M -110 120 L -110 -20 C -110 -170 110 -170 110 -20 L 110 120 Q 92 ${96 + 10 * Math.sin(t * 8)} 74 120 Q 56 ${144 + 10 * Math.sin(t * 8)} 37 120 Q 18 ${96 + 10 * Math.sin(t * 8)} 0 120 Q -18 ${144 + 10 * Math.sin(t * 8)} -37 120 Q -56 ${96 + 10 * Math.sin(t * 8)} -74 120 Q -92 ${144 + 10 * Math.sin(t * 8)} -110 120 Z`} fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -110 0 Q -170 -40 -170 -90" stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" /><path d="M -110 0 Q -170 -40 -170 -90" stroke="#fff" strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d="M 110 0 Q 170 -40 170 -90" stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" /><path d="M 110 0 Q 170 -40 170 -90" stroke="#fff" strokeWidth={18} fill="none" strokeLinecap="round" />
    <ellipse cx={-38} cy={-50} rx={18} ry={26} fill={INK} /><ellipse cx={38} cy={-50} rx={18} ry={26} fill={INK} />
    <ellipse cx={0} cy={20} rx={26} ry={34} fill={INK} />
  </g>
);

const Pine: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-18} y={-40} width={36} height={60} fill="#7A4A26" stroke={INK} strokeWidth={LW} />
    <path d="M 0 -360 L 110 -150 L 60 -150 L 140 -40 L -140 -40 L -60 -150 L -110 -150 Z" fill="#2F7A55" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M 0 -360 L 50 -270 L -30 -250 Z" fill="#fff" />
  </g>
);

const SnowGround: React.FC<{y: number}> = ({y}) => (
  <path d={`M -60 ${y} Q 300 ${y - 40} 560 ${y} Q 820 ${y + 30} 1140 ${y - 20} L 1140 2000 L -60 2000 Z`} fill="#F4FAFF" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
);

export const Goosebumps: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const swPull = T.cold + 1.1, swBumps = T.lost + 3.6;
  const scene = t < T.muscle - 0.25 ? 'arm' : t < T.cold - 0.25 ? 'skin' : t < swPull ? 'cold' : t < T.ancestors - 0.25 ? 'pull'
    : t < T.bigger - 0.25 ? 'ancestor' : t < T.lost - 0.25 ? 'bigger' : t < swBumps ? 'lost' : 'bumps';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.15, db: -24}, {f: 'pop', at: T.goosebumps, db: -20},
    {f: 'whoosh', at: T.muscle - 0.25, db: -24}, {f: 'boing', at: T.muscle, db: -20},
    {f: 'wobble', at: T.cold, db: -22}, {f: 'creak', at: T.cold + 0.75, db: -22}, {f: 'squeeze', at: T.cold + 1.3, db: -20},
    {f: 'whoosh', at: T.ancestors - 0.25, db: -24}, {f: 'rise', at: T.ancestors + 0.77, db: -24}, {f: 'plop', at: T.warm, db: -22},
    {f: 'rumble', at: T.bigger, db: -20}, {f: 'whoosh', at: T.lost - 0.25, db: -24}, {f: 'pop', at: T.lost, db: -20},
    {f: 'ding', at: T.bumps, db: -18},
  ];
  const bgCol = scene === 'arm' ? '#FFE7A8' : scene === 'skin' || scene === 'pull' ? '#CFEFFF' : scene === 'lost' || scene === 'bumps' ? '#FFD9C2' : '#BFE6FF';
  return (
    <AbsoluteFill style={{background: bgCol}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bgCol} />

        {scene === 'arm' && (() => {
          const up = (i: number) => prog(t, T.goosebumps - 0.1 + (i % 9) * 0.07, T.goosebumps + 0.35 + (i % 9) * 0.07);
          const mx = lerp(1350, 470, prog(t, T.goosebumps + 0.9, T.goosebumps + 1.5));
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 960, 1], [T.muscle - 0.85, 540, 960, 1], [T.muscle - 0.25, 470, 1210, 2.6]])}>
                <g transform={`translate(${lerp(-900, 0, prog(t, 0.1, 0.7))} 0) rotate(${-6 + 1.5 * Math.sin(t * 1.2)} 540 1200)`}><Arm t={t} up={up} /></g>
                {mx < 1300 && (
                  <g transform={`translate(${mx} 1210)`}>
                    <path d="M 100 100 L 230 230" stroke={INK} strokeWidth={56} strokeLinecap="round" /><path d="M 100 100 L 230 230" stroke="#7A4E2C" strokeWidth={38} strokeLinecap="round" />
                    <defs><clipPath id="gb-lens"><circle r={140} /></clipPath></defs>
                    <g clipPath="url(#gb-lens)">
                      <rect x={-150} y={-150} width={300} height={300} fill="#F2FAFF" />
                      <path d="M -150 60 Q -70 60 -50 20 Q 0 -60 50 20 Q 70 60 150 60 L 150 150 L -150 150 Z" fill="#fff" stroke={INK} strokeWidth={LW} />
                      <path transform={`translate(0 -20) rotate(${lerp(60, 4, prog(t, T.goosebumps + 1.4, T.goosebumps + 2.0))})`} d="M 0 0 L 0 -110" stroke={INK} strokeWidth={14} strokeLinecap="round" />
                    </g>
                    <circle r={140} fill="none" stroke="#5B6B7A" strokeWidth={22} />
                    <circle r={140} fill="none" stroke={INK} strokeWidth={6} />
                    <circle r={151} fill="none" stroke={INK} strokeWidth={5} />
                    <path d="M -90 -70 Q -70 -100 -30 -110" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.8} />
                  </g>
                )}
              </Layer>
              <Label x={540} y={640} size={86} s={pop(t, T.goosebumps, 12, 6)} color="#fff">GOOSEBUMPS!</Label>
              <Sticker t={t} t0={T.goosebumps + 1.0} t1={T.muscle - 0.7} x={540} y={1640} text="UNDER EVERY HAIR" size={64} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'skin' && (
          <g>
            <g transform="translate(540 1000)"><SkinSection t={t} pull={0} muscle={pop(t, T.muscle, 12, 6)} /></g>
            <Label x={290} y={1300} size={42} s={pop(t, T.muscle + 0.3, 12, 6)} color="#FFE45C">ARRECTOR PILI</Label>
            <Label x={540} y={640} size={80} s={pop(t, T.muscle, 12, 6)} color="#fff">A TINY MUSCLE</Label>
          </g>
        )}

        {scene === 'cold' && (() => {
          const scared = t > T.cold + 0.7;
          const [sx, sy] = shake(t, 7);
          return (
            <g>
              <Snowfall t={t} />
              <SnowGround y={1720} />
              <g transform={`translate(800 ${lerp(1500, 1120, prog(t, T.cold + 0.6, T.cold + 0.9))}) scale(${0.95 * pop(t, T.cold + 0.6, 12, 6)})`}><Ghost t={t} /></g>
              <g transform={`translate(${400 + sx} ${1720 + sy * 0.3}) scale(0.8)`}>
                <Guy t={t} expr="worried" handL={[60, -230]} handR={[-40, -210]} bendL={0.7} bendR={0.7} look={scared ? [14, -4] : [0, 0]} stand sweat={scared ? prog(t, T.cold + 0.75, T.cold + 1.1) : 0} />
              </g>
              <Label x={280} y={640} size={80} s={pop(t, T.cold - 0.1, 12, 6)} color="#BFE6FF">COLD</Label>
              <Label x={680} y={640} size={80} s={pop(t, T.cold + 0.65, 12, 6)} color="#fff">OR SCARED</Label>
            </g>
          );
        })()}

        {scene === 'pull' && (() => {
          const pull = prog(t, T.cold + 1.3, T.cold + 2.5);
          return (
            <g>
              <Layer cam={keys(t, [[swPull, 540, 960, 1], [T.cold + 2.6, 540, 960, 1], [T.ancestors - 0.25, 540, 1020, 1.08]])}>
                <g transform="translate(540 1000)"><SkinSection t={t} pull={pull} muscle={1} /></g>
                <g transform="translate(150 820)"><Snowflake s={1.6} /></g>
              </Layer>
              <Label x={540} y={640} size={64} s={pop(t, T.cold + 1.4, 12, 6)} color="#fff">PULLS HAIR UPRIGHT</Label>
              <Label x={760} y={930} size={60} s={pop(t, T.cold + 2.6, 12, 6)} color="#FFE45C" rot={-6}>BUMP!</Label>
            </g>
          );
        })()}

        {scene === 'ancestor' && (() => {
          const fluff = prog(t, T.ancestors + 0.75, T.ancestors + 1.3);
          const cosy = t > T.warm + 0.3;
          return (
            <g>
              <Pine x={130} y={1560} s={1} /><Pine x={960} y={1540} s={0.85} />
              <SnowGround y={1550} />
              <Snowfall t={t} n={20} />
              <g transform={`translate(540 ${lerp(1900, 1310, prog(t, T.ancestors - 0.25, T.ancestors + 0.2)) + 6 * Math.sin(t * 2)})`}>
                <Furry t={t} fluff={fluff} mood={cosy ? 'cosy' : 'calm'} bubbles={prog(t, T.warm, T.warm + 0.8)} />
              </g>
              <Label x={540} y={640} size={74} s={pop(t, T.ancestors, 12, 6)} color="#fff">FURRY ANCESTORS</Label>
              <Sticker t={t} t0={T.warm} x={540} y={1730} text="TRAPS WARM AIR" size={62} fill="#F08A24" />
            </g>
          );
        })()}

        {scene === 'bigger' && (() => {
          const grow = lerp(0.72, 1.3, pop(t, T.bigger - 0.1, 10, 6));
          const flee = prog(t, T.bigger + 0.8, T.bigger + 1.8);
          return (
            <g>
              <SnowGround y={1750} />
              <Snowfall t={t} n={16} />
              <g transform={`translate(${lerp(900, 1500, flee)} ${1640 - 30 * Math.abs(Math.sin(t * 11)) * (flee > 0 ? 1 : 0)}) scale(${flee > 0 ? -0.8 : 0.8} 0.8)`}>
                <Wolf t={t} scared={t > T.bigger + 0.6} run={flee} />
              </g>
              <g transform={`translate(360 ${1750 - 230 * grow}) scale(${grow})`}>
                <Furry t={t} fluff={1} mood="roar" />
              </g>
              <Label x={540} y={640} size={84} s={pop(t, T.bigger, 12, 6)} color="#FFE45C">LOOK BIGGER!</Label>
            </g>
          );
        })()}

        {scene === 'lost' && (() => {
          const shed = prog(t, T.lost, T.lost + 0.6);
          return (
            <g>
              <path d="M -60 1560 L 1140 1560 L 1140 2000 L -60 2000 Z" fill="#E8B48F" stroke={INK} strokeWidth={LW} />
              {shed < 1 && (
                <g transform={`translate(540 ${1300 - 60 * shed}) scale(${0.8 * (1 - shed)})`}><Furry t={t} fluff={0.4} mood="calm" furOp={1 - shed} /></g>
              )}
              <g transform={`translate(540 1560) scale(${0.8 * pop(t, T.lost + 0.25, 10, 6)})`}>
                <Guy t={t} expr={t > T.lost + 2.6 ? 'hope' : 'worried'} handL={[-110, -170]} handR={[120, -170]} look={t > T.lost + 1 && t < T.lost + 2.4 ? [0, 10] : [6, -4]} stand blink={t % 2.6 < 0.12} />
              </g>
              {t > T.lost && Array.from({length: 10}).map((_, i) => {
                const a = t - T.lost; const ang = (i / 10) * 2 * Math.PI;
                const x = 540 + Math.cos(ang) * (60 + 260 * Math.min(a, 0.8)) + 40 * Math.sin(a * 3 + i);
                const y = 1280 + Math.sin(ang) * 160 * Math.min(a, 0.8) + 200 * a * a * 0.5;
                if (y > 1545) return <ellipse key={i} cx={x} cy={1552} rx={30} ry={10} fill="#9A6236" stroke={INK} strokeWidth={5} />;
                return <path key={i} transform={`translate(${x} ${y}) rotate(${a * 200 + i * 40})`} d="M -26 0 Q -10 -30 0 -6 Q 10 -34 26 0 Q 0 16 -26 0 Z" fill="#9A6236" stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
              })}
              <Label x={540} y={640} size={76} s={pop(t, T.lost, 12, 6)} color="#fff">WE LOST THE FUR</Label>
              <Sticker t={t} t0={T.lost + 2.7} x={540} y={1700} text="THE REFLEX STAYED" size={60} fill="#5B3A8C" />
            </g>
          );
        })()}

        {scene === 'bumps' && (() => {
          const bumpUp = (i: number) => (i === 6 ? pop(t, T.bumps - 0.15, 12, 6) : pop(t, swBumps + 0.3 + i * 0.25, 12, 6));
          return (
            <g>
              <path d="M -60 1720 L 1140 1720 L 1140 2000 L -60 2000 Z" fill="#E8B48F" stroke={INK} strokeWidth={LW} />
              {/* zoom lines from the inset to the arm */}
              <path d="M 600 1170 L 520 1450 M 700 1250 L 535 1462" stroke={INK} strokeWidth={5} strokeDasharray="14 10" opacity={prog(t, swBumps + 0.1, swBumps + 0.4)} />
              <g transform={`translate(330 1720) scale(0.8)`}>
                <Guy t={t} expr="hope" handL={[-210, -330 - 12 * Math.abs(Math.sin(t * 2.2))]} handR={[220, -330 - 12 * Math.abs(Math.sin(t * 2.2))]} bendL={0.6} bendR={0.6} look={[10, -6]} stand blink={t % 2.3 < 0.12} />
              </g>
              <g transform={`translate(760 1060) scale(${pop(t, swBumps + 0.1, 10, 6)})`}>
                <defs><clipPath id="gb-inset"><circle r={190} /></clipPath></defs>
                <g clipPath="url(#gb-inset)">
                  <rect x={-200} y={-200} width={400} height={400} fill="#fff" />
                  {Array.from({length: 7}).map((_, i) => {
                    const x = -120 + (i % 4) * 80 + (i >= 4 ? 40 : 0), y = i >= 4 ? 70 : -40; const k = bumpUp(i);
                    return (
                      <g key={i} transform={`translate(${x} ${y})`}>
                        <path transform={`rotate(${lerp(60, 8, clamp(k))})`} d="M 0 0 L 0 -60" stroke={INK} strokeWidth={6} strokeLinecap="round" />
                        {k > 0.02 && <g transform={`scale(${k})`}><circle r={24} fill="#fff" stroke={INK} strokeWidth={6} /><path d="M -12 10 A 18 18 0 0 0 14 10" stroke="#E4E7EB" strokeWidth={5} fill="none" /></g>}
                      </g>
                    );
                  })}
                </g>
                <circle r={190} fill="none" stroke={INK} strokeWidth={LW} />
              </g>
              <Label x={540} y={640} size={64} s={pop(t, swBumps + 0.2, 12, 6)} color="#fff">THAT'S ALL WE GOT</Label>
              <Label x={760} y={1560} size={58} s={pop(t, T.bumps - 0.5, 12, 6)} color="#FFE45C">LITTLE BUMPS</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="31-goosebumps" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
