import React from 'react';
import {Composition} from 'remotion';
import {Seawater} from './seawater/Seawater';
import {T, FPS} from './seawater/timing';
import {SeawaterThumb} from './seawater/Thumb';
import {Flamingo as C02Flamingo} from './shorts/02-flamingo/Flamingo';
import {T as T02Flamingo} from './shorts/02-flamingo/timing';
import {PlaneWindows as C03PlaneWindows} from './shorts/03-plane-windows/PlaneWindows';
import {T as T03PlaneWindows} from './shorts/03-plane-windows/timing';
import {Venus as C04Venus} from './shorts/04-venus/Venus';
import {T as T04Venus} from './shorts/04-venus/timing';
import {Woodpecker as C05Woodpecker} from './shorts/05-woodpecker/Woodpecker';
import {T as T05Woodpecker} from './shorts/05-woodpecker/timing';
import {WrinklyFingers as C06WrinklyFingers} from './shorts/06-wrinkly-fingers/WrinklyFingers';
import {T as T06WrinklyFingers} from './shorts/06-wrinkly-fingers/timing';
import {AstronautBones as C07AstronautBones} from './shorts/07-astronaut-bones/AstronautBones';
import {T as T07AstronautBones} from './shorts/07-astronaut-bones/timing';
import {SixtyMinutes as C08SixtyMinutes} from './shorts/08-sixty-minutes/SixtyMinutes';
import {T as T08SixtyMinutes} from './shorts/08-sixty-minutes/timing';
import {SpiderWeb as C09SpiderWeb} from './shorts/09-spider-web/SpiderWeb';
import {T as T09SpiderWeb} from './shorts/09-spider-web/timing';
import {IceFloats as C10IceFloats} from './shorts/10-ice-floats/IceFloats';
import {T as T10IceFloats} from './shorts/10-ice-floats/timing';
import {LeapYear as C11LeapYear} from './shorts/11-leap-year/LeapYear';
import {T as T11LeapYear} from './shorts/11-leap-year/timing';
import {THUMBS, ShortThumb} from './thumbs/Thumbs';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Seawater" component={Seawater} width={1080} height={1920} fps={FPS} durationInFrames={Math.round(T.end * FPS)} />
    <Composition id="SeawaterThumbV" component={SeawaterThumb} width={1080} height={1920} fps={60} durationInFrames={1} defaultProps={{vertical: true}} />
    <Composition id="SeawaterThumbH" component={SeawaterThumb} width={1280} height={720} fps={60} durationInFrames={1} defaultProps={{vertical: false}} />
    <Composition id="S02flamingo" component={C02Flamingo} width={1080} height={1920} fps={60} durationInFrames={Math.round(T02Flamingo.end * 60)} />
    <Composition id="S03planewindows" component={C03PlaneWindows} width={1080} height={1920} fps={60} durationInFrames={Math.round(T03PlaneWindows.end * 60)} />
    <Composition id="S04venus" component={C04Venus} width={1080} height={1920} fps={60} durationInFrames={Math.round(T04Venus.end * 60)} />
    <Composition id="S05woodpecker" component={C05Woodpecker} width={1080} height={1920} fps={60} durationInFrames={Math.round(T05Woodpecker.end * 60)} />
    <Composition id="S06wrinklyfingers" component={C06WrinklyFingers} width={1080} height={1920} fps={60} durationInFrames={Math.round(T06WrinklyFingers.end * 60)} />
    <Composition id="S07astronautbones" component={C07AstronautBones} width={1080} height={1920} fps={60} durationInFrames={Math.round(T07AstronautBones.end * 60)} />
    <Composition id="S08sixtyminutes" component={C08SixtyMinutes} width={1080} height={1920} fps={60} durationInFrames={Math.round(T08SixtyMinutes.end * 60)} />
    <Composition id="S09spiderweb" component={C09SpiderWeb} width={1080} height={1920} fps={60} durationInFrames={Math.round(T09SpiderWeb.end * 60)} />
    <Composition id="S10icefloats" component={C10IceFloats} width={1080} height={1920} fps={60} durationInFrames={Math.round(T10IceFloats.end * 60)} />
    <Composition id="S11leapyear" component={C11LeapYear} width={1080} height={1920} fps={60} durationInFrames={Math.round(T11LeapYear.end * 60)} />
    {THUMBS.map((th) => <Composition key={th.id} id={`Th${th.id}`} component={ShortThumb} defaultProps={{id: th.id}} width={1080} height={1920} fps={60} durationInFrames={1800} />)}
  </>
);
