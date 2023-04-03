import { TLShapeUtil } from '@tldraw/core';

import { TableComponent } from './TableComponent';
import getBoxBounds from 'shapes/getBoxBounds';
import { TablePreview } from './TablePreview';
import { TableShape } from 'shapes';
import { Indicator } from 'shapes/Indicator';

export class TableUtil extends TLShapeUtil<TableShape, HTMLDivElement> {
  Component = TableComponent;
  Indicator = Indicator;
  getBounds = getBoxBounds;
  enableBoundsHandles = false;
  canResize = false;
  ToolPreviewComponent = TablePreview;

  // Prevent unmounting out-of-view text editors to avoid expensive ProseMirror rendering.
  isStateful = true;
}
