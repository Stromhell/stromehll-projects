import React from 'react';
import {Composition} from 'remotion';
import {Seawater} from './seawater/Seawater';
import {T, FPS} from './seawater/timing';
import {SeawaterThumb} from './seawater/Thumb';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Seawater" component={Seawater} width={1080} height={1920} fps={FPS}
      durationInFrames={Math.round(T.end * FPS)} />
    <Composition id="SeawaterThumbV" component={SeawaterThumb} width={1080} height={1920} fps={60} durationInFrames={1} defaultProps={{vertical: true}} />
    <Composition id="SeawaterThumbH" component={SeawaterThumb} width={1280} height={720} fps={60} durationInFrames={1} defaultProps={{vertical: false}} />
  </>
);
