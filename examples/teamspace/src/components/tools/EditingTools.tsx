import { usePosition } from '@tldraw/core';
import React from 'react';
import { Z } from 'state/constants';

const SHAPE_TOOL_CONTAINER_SIZE = 640;

type ToolProps = { children: React.ReactChild; point: number[] };

// Positions a tool like the FormattingToolbar or Autocomplete on the canvas.

export function CanvasTool({ children, point }: ToolProps) {
  const ref = usePosition({
    minX: point[0],
    minY: point[1],
    width: SHAPE_TOOL_CONTAINER_SIZE,
    height: SHAPE_TOOL_CONTAINER_SIZE,
    maxX: point[0] + SHAPE_TOOL_CONTAINER_SIZE,
    maxY: point[1] + SHAPE_TOOL_CONTAINER_SIZE,
  });

  return (
    <div ref={ref} className="tl-positioned" style={{ zIndex: Z.SYSTEM_MODAL }}>
      <div className="tl-positioned-div">{children}</div>
    </div>
  );
}

export function PageTool({ children, point }: ToolProps) {
  return (
    <div style={{ position: 'absolute', top: point[1], left: point[0], zIndex: Z.CANVAS_TOOL }}>
      {children}
    </div>
  );
}
