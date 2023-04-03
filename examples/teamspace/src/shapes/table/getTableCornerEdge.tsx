import { TLBoundsCorner, TLBoundsEdge } from '@tldraw/core';
import { TLCornerEdge } from './TableCard';

export function getTableCornerEdge(
  rowIndex: number,
  colIndex: number,
  numRows: number,
  numCols: number
): TLCornerEdge | undefined {
  let handle: TLCornerEdge | undefined = undefined;
  const firstRow = rowIndex === 0;
  const lastRow = rowIndex === numRows - 1;
  const firstCol = colIndex === 0;
  const lastCol = colIndex === numCols - 1;

  if (firstRow && firstCol) handle = TLBoundsCorner.TopLeft;
  else if (firstRow && lastCol) handle = TLBoundsCorner.TopRight;
  else if (lastRow && firstCol) handle = TLBoundsCorner.BottomLeft;
  else if (lastRow && lastCol) handle = TLBoundsCorner.BottomRight;
  else if (firstRow) handle = TLBoundsEdge.Top;
  else if (firstCol) handle = TLBoundsEdge.Left;
  else if (lastRow) handle = TLBoundsEdge.Bottom;
  else if (lastCol) handle = TLBoundsEdge.Right;

  return handle;
}
