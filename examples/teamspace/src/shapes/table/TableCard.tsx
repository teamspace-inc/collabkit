import { basicCardCss } from 'styles/cardStyles';
import { useSnapshot } from 'valtio';
import { useAppContext } from '../../hooks/useAppContext';
import { TLBoundsCorner, TLBoundsEdge } from '@tldraw/core';
import { CardStore, TableTarget } from 'state/constants';
import React from 'react';
import { targetEqual } from 'state/actions/shapes/targetEqual';
import { generateTable } from 'network/constructTable';
import { Td } from './Td';
import { getTableCornerEdge } from './getTableCornerEdge';
import { AddTableColumnButton, AddTableRowButton } from './AddTableButtons';
import { InsertAtIndicator } from './InsertAtIndicator';

export type TLCornerEdge = TLBoundsCorner | TLBoundsEdge;

export interface TableProps {
  target: TableTarget;
  minWidth?: number;
  maxWidth?: number;
  editable: boolean;
  isEditing?: boolean;
  isDragging?: boolean;
  isSmall?: boolean;
  cardData: CardStore;
  isRounded?: boolean;
  style?: React.CSSProperties;
}

export function TableCard({
  target,
  isRounded,
  isEditing,
  isDragging,
  editable: isShapeEditable,
  isSmall,
}: TableProps) {
  if (!target) {
    console.error('TableCard: id is required');
  }

  const { editing } = useSnapshot(useAppContext().store);

  const { rows, columns, bounds } = generateTable(target.id, editing.tables[target.id]);

  const { selectedIds, translating } = editing;
  const { className } = basicCardCss({ isRounded, isEditing, isSmall, isDragging });

  const { width, height } = bounds;

  let cells: JSX.Element[] = [];

  let rowIndex = 0;
  let numRows = Object.keys(rows).length;

  const isEditingTableCell = !!(
    editing.editingId &&
    editing.editingId.type === 'tableCell' &&
    editing.editingId.docId === target.id
  );

  for (const rowId in rows) {
    const row = rows[rowId];

    const isSelectedRow = !!selectedIds?.some((selectedTarget) =>
      targetEqual(selectedTarget, { type: 'tableRow', docId: target.id, id: rowId })
    );

    const isDraggingRow = !!(translating && targetEqual(translating.target, row.target));

    const minHeight = Math.max(...Object.values(row.cells).map((cell) => cell.bounds.height));

    let columnIndex = 0;
    for (const column of columns) {
      const cell = row.cells[column.id];

      const isSelectedColumn = !!selectedIds?.some((target) => targetEqual(target, column.target));

      const isDraggingColumn = !!(
        editing.translating && targetEqual(editing.translating.target, column.target)
      );

      const isEditing = isEditingTableCell && editing.editingId?.id === cell.target.id;

      const cornerEdge = getTableCornerEdge(rowIndex, columnIndex, numRows, columns.length);

      const isEditable =
        isShapeEditable ||
        (editing.editingId?.type === 'tableCell' && editing.editingId.docId === target.id);

      const isSelected = !!selectedIds.some((target) => targetEqual(target, cell.target));

      const { hoveringId } = editing;

      cells.push(
        <Td
          cornerEdge={cornerEdge}
          key={cell.target.id}
          isSelectedColumn={isSelectedColumn}
          isSelectedRow={isSelectedRow}
          hoveringId={hoveringId}
          column={columns[columnIndex]}
          row={row}
          isSelected={isSelected}
          isEditing={isEditing}
          isEditable={!isDragging && isEditable}
          isEditingTableCell={isEditingTableCell}
          dragX={translating?.delta[0] ?? null}
          dragY={translating?.delta[1] ?? null}
          value={cell.value}
          isDraggingRow={isDraggingRow}
          isDraggingColumn={isDraggingColumn}
          isDraggingTable={!!isDragging}
          minHeight={minHeight}
          cell={cell}
        />
      );

      columnIndex += 1;
    }

    rowIndex += 1;
  }

  let insertAtIndicator = null;

  if (translating && translating.target.docId === target.id && translating.index > -1) {
    switch (translating.edge) {
      // inserting a row
      case TLBoundsEdge.Top:
      case TLBoundsEdge.Bottom:
        const rowId = Object.keys(rows)[translating.index];
        const row = rows[rowId];
        const y = (translating.edge === TLBoundsEdge.Top ? row.bounds.minY : row.bounds.maxY) - 1.5;
        insertAtIndicator = <InsertAtIndicator x={0} y={y} orientation="horizontal" />;
        break;

      // inserting a column
      case TLBoundsEdge.Left:
      case TLBoundsEdge.Right:
        const column = columns[translating.index];
        const x =
          (translating.edge === TLBoundsEdge.Left ? column.bounds.minX : column.bounds.maxX) - 1.5;
        insertAtIndicator = <InsertAtIndicator x={x} y={0} orientation={'vertical'} />;
        break;
    }
  }

  return (
    <div className={className} style={{ position: 'relative', height, width, borderRadius: '6px' }}>
      {cells}
      {insertAtIndicator}
      {<AddTableRowButton target={target} />}
      {<AddTableColumnButton target={target} />}
    </div>
  );
}
