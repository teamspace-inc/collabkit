import { css } from '@stitches/react';
import { TLShapeUtil } from '@tldraw/core';
import { ShapeWithSize } from 'shapes';
import { INDICATOR_STROKE_WIDTH } from 'state/constants';

const indicatorClassName = css({
  rx: '$radii$2',
})().className;

export const Indicator = TLShapeUtil.Indicator<ShapeWithSize>(({ shape }) => {
  return (
    <rect
      className={indicatorClassName}
      pointerEvents="none"
      width={shape.size[0]}
      height={shape.size[1]}
      fill="none"
      stroke="tl-selectedStroke"
      strokeWidth={INDICATOR_STROKE_WIDTH}
    />
  );
});
