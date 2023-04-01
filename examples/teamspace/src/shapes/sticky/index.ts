import { TLAutoResizeConstraints, TLShapeUtil } from '@tldraw/core';
import { Indicator } from 'shapes/Indicator';
import { StickyShape } from '../../shapes';
import getBoxBounds from '../getBoxBounds';
import { StickyComponent, StickyDefaultSize } from './StickyComponent';
import { StickyPreview } from './StickyPreview';

export class StickyUtil extends TLShapeUtil<StickyShape, HTMLDivElement> {
  Component = StickyComponent;
  Indicator = Indicator;
  ToolPreviewComponent = StickyPreview;
  defaultSize = StickyDefaultSize;
  getBounds = getBoxBounds;
  enableBoundsHandles = false;
  canResize = false;
  autoResizeDirections = ['growHeight', 'shrinkHeight'] as TLAutoResizeConstraints[];

  // Prevent unmounting out-of-view text editors to avoid expensive ProseMirror rendering.
  isStateful = true;
}
