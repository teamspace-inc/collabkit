import { TLShapeUtil } from '@tldraw/core';

import type { ImageShape } from '../';
import { ImageComponent } from './ImageComponent';
import getBoxBounds from 'shapes/getBoxBounds';
import { Indicator } from 'shapes/Indicator';

export class ImageUtil extends TLShapeUtil<ImageShape, HTMLDivElement> {
  Component = ImageComponent;
  Indicator = Indicator;
  getBounds = getBoxBounds;

  shouldRound = false;
  // needed because unloading and loading
  // images on pan is expensive
  isStateful = true;
}
