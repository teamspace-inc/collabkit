import { TLAutoResizeConstraints, TLShapeUtil } from '@tldraw/core';

import type { CardShape } from '..';
import { TextCardComponent, TextCardDefaultSize } from './TextCardComponent';
import { Indicator } from 'shapes/Indicator';
import getBoxBounds from 'shapes/getBoxBounds';
import { TextCardPreview } from './TextCardPreview';

export class CardUtil extends TLShapeUtil<CardShape, HTMLDivElement> {
  Component = TextCardComponent;
  Indicator = Indicator;
  getBounds = getBoxBounds;
  defaultSize = TextCardDefaultSize;
  enableBoundsHandles = false;
  canResize = false;
  autoResizeDirections = ['growHeight', 'growWidth'] as TLAutoResizeConstraints[];
  ToolPreviewComponent = TextCardPreview;

  // Prevent unmounting out-of-view text editors to avoid expensive ProseMirror rendering.
  isStateful = true;
}
