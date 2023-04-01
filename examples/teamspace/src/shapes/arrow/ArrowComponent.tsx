import { css } from '@stitches/react';
import { TLShapeUtil, SVGContainer } from '@tldraw/core';
import { Vec } from '@tldraw/vec';
import { getBoxToBoxArrow } from 'curved-arrows';
import { CardItem } from 'state/constants';
import { useSnapshot } from 'valtio';

import { ArrowShape } from '../';
import { shapeUtils } from '../';
import { useAppContext } from '../../hooks/useAppContext';

const arrowCss = css({
  pointerEvents: 'none',
  strokeWidth: 'calc(1.5px * var(--tl-scale))',
  stroke: '$colors$arrow',
  variants: {
    isSelected: {
      true: {
        stroke: 'var(--tl-selectStroke)',
      },
    },
    isEditing: {
      true: {
        stroke: 'var(--tl-editingStroke)',
      },
    },
  },
});

export const ArrowComponent = TLShapeUtil.Component<ArrowShape, SVGSVGElement>(
  function ArrowComponent({ shape, events }, ref) {
    const { editingId, selectedIds } = useSnapshot(useAppContext().store.editing);
    const { start } = shape;

    const isSelected = selectedIds.some(
      (target) => target.type === 'shape' && target.id === start.id
    );

    const isEditing = !!(
      isSelected &&
      editingId &&
      editingId.type === 'card' &&
      editingId.id &&
      start.type === 'card' &&
      (start as unknown as CardItem).docId === editingId.id
    );
    const bounds = shapeUtils.arrow.getBounds(shape);

    const [x0, y0] = Vec.sub(shape.start.point, [bounds.minX, bounds.minY]);
    const [w0, h0] = shape.start.size;
    const [x1, y1] = Vec.sub(shape.end.point, [bounds.minX, bounds.minY]);
    const [w1, h1] = shape.end.size;

    const arrowHeadSizePx = 5;

    const arrow = getBoxToBoxArrow(x0, y0, w0, h0, x1, y1, w1, h1, { padEnd: arrowHeadSizePx / 4 });
    const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae] = arrow;
    return (
      <SVGContainer ref={ref} {...events} data-testid="ArrowComponent">
        <path
          className={arrowCss({ isSelected, isEditing })}
          d={`M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`}
          fill="none"
        />
        <polygon
          points={`${-arrowHeadSizePx * 2} ${arrowHeadSizePx * 2},0, 0,${arrowHeadSizePx}`}
          fill="none"
          transform={`translate(${ex}, ${ey}) rotate(${ae})`}
          className={arrowCss({ isSelected, isEditing })}
        />
        <polygon
          points={`0, 0,${-arrowHeadSizePx * 2}, ${arrowHeadSizePx * -2}`}
          fill="none"
          transform={`translate(${ex}, ${ey}) rotate(${ae})`}
          className={arrowCss({ isSelected, isEditing })}
        />
      </SVGContainer>
    );
  }
);
