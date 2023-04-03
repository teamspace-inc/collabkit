import { TLShapeUtil } from '@tldraw/core';
import { Indicator } from 'shapes/Indicator';

import type { BoxShape } from '../';
import getBoxBounds from '../getBoxBounds';
import { BoxComponent } from './BoxComponent';

export class BoxUtil extends TLShapeUtil<BoxShape, SVGSVGElement> {
  Component = BoxComponent;
  Indicator = Indicator;
  getBounds = getBoxBounds;
  canResize = true;
}
