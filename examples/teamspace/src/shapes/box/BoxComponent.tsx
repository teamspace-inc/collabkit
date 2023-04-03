import { TLShapeUtil, SVGContainer } from '@tldraw/core';
import { css } from '@stitches/react';

import { BoxShape, shapeUtils } from '../';

const boxComponentCss = css({
  rx: '$radii$1',
});

export const BoxComponent = TLShapeUtil.Component<BoxShape, SVGSVGElement>(function BoxComponent(
  { shape, events },
  ref
) {
  const bounds = shapeUtils.box.getBounds(shape);

  return (
    <SVGContainer ref={ref} {...events}>
      <rect
        className={boxComponentCss()}
        data-testid="BoxComponent"
        width={bounds.width}
        height={bounds.height}
        stroke="black"
        strokeWidth={1}
        strokeLinejoin="round"
        fill="none"
        pointerEvents="all"
      />
    </SVGContainer>
  );
});
