import { TLAutoResizeConstraints, TLShape } from '@tldraw/core';

import { useMemo, useRef } from 'react';
import { useAutoResizeObserver } from '../../hooks/useAutoResizeObserver';

import { useSpaceContext } from '../../hooks/useSpaceContext';
import { useSpaceEvents } from '../../events';
import { ShapeTarget } from 'state/constants';

export const AutosizeableShape = function AutosizeableShape({
  shape,
  // isDragging,
  isResizing,
  constraints,
  hasSize,
  // shouldFillWidth,
  // shouldFillHeight,
  width,
  children,
}: {
  isResizing: boolean;
  isDragging: boolean;
  isEditing: boolean;
  hasSize: boolean;
  shape: TLShape & { size: number[] };
  shouldFillWidth: boolean;
  shouldFillHeight: boolean;
  constraints: TLAutoResizeConstraints[];
  width?: number;
  children: React.ReactChild;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { store } = useSpaceContext();
  const { onAutoResizeShape } = useSpaceEvents(store);

  const target: ShapeTarget = useMemo(() => ({ type: 'shape', id: shape.id }), [shape.id]);

  useAutoResizeObserver({
    target,
    ref,
    shouldObserve: !isResizing,
    constraints,
    onResize: onAutoResizeShape,
  });

  return (
    <div
      data-testid="AutosizeableShape"
      style={{
        display: 'inline-flex',
        opacity: hasSize ? 1 : 0,
        // setting height enables overflow: hidden
        // this means we can hide text if the user
        // resizes the textbox to be smaller than
        // the height of the text.
        // height: shouldFillHeight ? (isEditing ? 'unset' : bounds.height) : 'unset',

        // setting minHeight, enables the textbox to
        // automatically grow in height as the user
        // enters text. this is required for the auto
        // resize observer to work.
        //minHeight: shouldFillHeight ? bounds.height : 'unset',

        // width: shouldFillWidth ? (isEditing ? 'unset' : bounds.width) : 'unset',

        //minWidth: shouldFillWidth ? bounds.width : 'unset',
        width: width ?? 'unset',
        pointerEvents: 'all',
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};
