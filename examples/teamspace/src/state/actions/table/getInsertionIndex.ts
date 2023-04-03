import { TableColumnTarget, TableData, TableRowTarget } from 'state/constants';
import { generateKeyBetween } from 'utils/fractionalIndexing';
import { sortByFractionalIndex } from 'network/constructTable';
import { TLBoundsEdge } from '@tldraw/core';

export function getInsertionIndex(
  table: TableData,
  target: TableRowTarget | TableColumnTarget,
  edge: TLBoundsEdge
) {
  const position = edge === TLBoundsEdge.Top || edge === TLBoundsEdge.Left ? 'before' : 'after';

  // we're looking for a new index for rows or columns, lets just call that 'data'
  const data = target.type === 'tableRow' ? table.rows : table.columns;

  const orderedData = sortByFractionalIndex(data, table.deleted ?? {});

  // sort the data by it's fractional index, and get the ids, we can then use normal int indexing
  const ids = Object.keys(orderedData);

  // now that we have the ids we can get the int index of the target
  const index = ids.findIndex((id) => id === target.id);

  const currentFractionalIndex = orderedData[ids[index]];

  // we can now get the new index by either adding or subtracting 1 to the index position
  return position === 'before'
    ? generateKeyBetween(orderedData[ids[index - 1]] || null, currentFractionalIndex)
    : generateKeyBetween(currentFractionalIndex, orderedData[ids[index + 1]] || null);
}
