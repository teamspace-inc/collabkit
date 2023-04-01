import { TLAutoResizeConstraints, TLShapeUtil } from '@tldraw/core';

import type { TextShape } from '../';
import { TextComponent } from './TextComponent';
import getBoxBounds from 'shapes/getBoxBounds';
import { Indicator } from 'shapes/Indicator';

export class TextUtil extends TLShapeUtil<TextShape, HTMLDivElement> {
  Component = TextComponent;
  Indicator = Indicator;
  getBounds = getBoxBounds;
  canResize = true;
  autoResizeDirections = ['growHeight'] as TLAutoResizeConstraints[];

  // Prevent unmounting out-of-view text editors to avoid expensive ProseMirror rendering.
  isStateful = true;
}
