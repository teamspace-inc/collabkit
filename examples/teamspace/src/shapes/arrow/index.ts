import { TLBounds, TLShapeUtil, Utils } from '@tldraw/core';

import { ArrowShape, getBounds } from '..';
import { ArrowComponent } from './ArrowComponent';
import { ArrowIndicator } from './ArrowIndicator';

export class ArrowUtil extends TLShapeUtil<ArrowShape, SVGSVGElement> {
  Component = ArrowComponent;
  Indicator = ArrowIndicator;
  getBounds = (shape: ArrowShape): TLBounds => {
    const bounds = Utils.getFromCache(this.boundsCache, shape, () => {
      const { start, end } = shape;
      const startBounds = getBounds(start);
      const endBounds = getBounds(end);
      return Utils.getCommonBounds([startBounds, endBounds]);
    });

    return Utils.translateBounds(bounds, shape.point);
  };
}
