import { TableCell } from './TableCell';
import { TLBoundsCorner, TLBoundsEdge, useShapeEvents } from '@tldraw/core';
import { Cell, Column, Row, Target, Z } from 'state/constants';
import React, { useEffect, useRef, useState } from 'react';
import { TableHandle } from './TableHandle';
import { TLCornerEdge } from './TableCard';
import { blue, sand } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import { animate } from 'motion';
import { animationOptions } from 'styles/animationOptions';
import equal from 'fast-deep-equal';

const SELECTED_BORDER_WIDTH_PX = 3;

const TopBorder = {
  '&:after': {
    content: '',
    top: -SELECTED_BORDER_WIDTH_PX,
    left: 0,
    right: 0,
    height: SELECTED_BORDER_WIDTH_PX,
    background: blue.blue9,
    position: 'absolute',
    zIndex: Z.CANVAS_TOOL,
  },
};

const RightBorder = {
  '&:after': {
    content: '',
    right: -SELECTED_BORDER_WIDTH_PX,
    top: 0,
    bottom: 0,
    width: SELECTED_BORDER_WIDTH_PX,
    background: blue.blue9,
    position: 'absolute',
    zIndex: Z.CANVAS_TOOL,
  },
};

const LeftBorder = {
  '&:after': {
    content: '',
    left: -SELECTED_BORDER_WIDTH_PX,
    top: 0,
    bottom: 0,
    width: SELECTED_BORDER_WIDTH_PX,
    background: blue.blue9,
    position: 'absolute',
    zIndex: Z.CANVAS_TOOL,
  },
};

const BottomBorder = {
  '&:after': {
    content: '',
    bottom: -SELECTED_BORDER_WIDTH_PX,
    left: 0,
    right: 0,
    height: SELECTED_BORDER_WIDTH_PX,
    background: blue.blue9,
    position: 'absolute',
    zIndex: Z.CANVAS_TOOL,
  },
};

const CellSelected = {
  '&:before': {
    content: '',
    boxShadow: `inset 0px 0px 0px 3px ${blue.blue9}`,
    position: 'absolute',
    pointerEvents: 'none',
    inset: -SELECTED_BORDER_WIDTH_PX,
    zIndex: Z.CANVAS_TOOL,
  },
};

const CellEditing = {
  zIndex: Z.CANVAS_TOOL,
  '&:before': {
    content: '',
    boxShadow: `inset 0px 0px 0px 3px ${blue.blue6}`,
    position: 'absolute',
    pointerEvents: 'none',
    inset: -SELECTED_BORDER_WIDTH_PX,
    zIndex: Z.CANVAS_TOOL,
  },
};

const RowSelected = {
  zIndex: Z.CANVAS_TOOL,

  '&:before': {
    content: '',
    border: `${SELECTED_BORDER_WIDTH_PX}px solid ${blue.blue9}`,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    zIndex: Z.CANVAS_TOOL,
    position: 'absolute',
    pointerEvents: 'none',
    inset: -SELECTED_BORDER_WIDTH_PX,
  },
};

const ColumnSelected = {
  '&:before': {
    content: '',
    border: `${SELECTED_BORDER_WIDTH_PX}px solid ${blue.blue9}`,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: Z.CANVAS_TOOL,
    position: 'absolute',
    pointerEvents: 'none',
    inset: -SELECTED_BORDER_WIDTH_PX,
  },
};

export const StyledTd = styled('div', {
  fontSize: 14,
  lineHeight: '22px',
  boxShadow: `0px 0px 0px 1px ${sand.sand4}`,
  background: '$colors$cardBackground',
  minHeight: 44,
  position: 'absolute',
  margin: 0,
  padding: 0,

  variants: {
    isDragging: {
      true: {
        zIndex: Z.CANVAS_TOOL,
        background: 'rgba(255,255,255,0.85)',
      },
    },

    // we can't use :first-child / :first-of-type
    // selectors as they break when dragging items
    cornerEdge: {
      top_left_corner: {
        borderTopLeftRadius: '$radii$1',
      },
      top_right_corner: {
        borderTopRightRadius: '$radii$1',
      },
      bottom_left_corner: {
        borderBottomLeftRadius: '$radii$1',
      },
      bottom_right_corner: {
        borderBottomRightRadius: '$radii$1',
      },
      top_edge: {},
      bottom_edge: {},
      left_edge: {},
      right_edge: {},
    },

    isSelectedColumn: { true: {} },
    isDraggingColumn: { true: {} },

    isSelectedRow: { true: {} },
    isDraggingRow: { true: {} },

    isCellEditing: {
      true: CellEditing,
    },

    isCellSelected: {
      true: CellSelected,
    },
  },

  compoundVariants: [
    {
      isSelectedColumn: true,
      isDraggingColumn: false,
      css: ColumnSelected,
    },
    {
      isSelectedRow: true,
      isDraggingRow: false,
      css: RowSelected,
    },
    {
      isSelectedColumn: true,
      isDraggingColumn: false,
      cornerEdge: 'top_edge',
      css: TopBorder,
    },
    {
      isSelectedColumn: true,
      isDraggingColumn: false,
      cornerEdge: 'top_left_corner',
      css: TopBorder,
    },
    {
      isSelectedColumn: true,
      isDraggingColumn: false,
      cornerEdge: 'top_right_corner',
      css: TopBorder,
    },

    {
      isSelectedColumn: true,
      isDraggingColumn: false,
      cornerEdge: 'bottom_edge',
      css: BottomBorder,
    },
    {
      isSelectedColumn: true,
      isDraggingColumn: false,
      cornerEdge: 'bottom_left_corner',
      css: BottomBorder,
    },
    {
      isSelectedColumn: true,
      isDraggingColumn: false,
      cornerEdge: 'bottom_right_corner',
      css: BottomBorder,
    },

    {
      isSelectedRow: true,
      isDraggingRow: false,
      cornerEdge: 'left_edge',
      css: LeftBorder,
    },
    {
      isSelectedRow: true,
      isDraggingRow: false,
      cornerEdge: 'bottom_left_corner',
      css: LeftBorder,
    },
    {
      isSelectedRow: true,
      isDraggingRow: false,
      cornerEdge: 'top_left_corner',
      css: LeftBorder,
    },

    {
      isSelectedRow: true,
      isDraggingRow: false,
      cornerEdge: 'right_edge',
      css: RightBorder,
    },
    {
      isSelectedRow: true,
      isDraggingRow: false,
      cornerEdge: 'bottom_right_corner',
      css: RightBorder,
    },
    {
      isSelectedRow: true,
      isDraggingRow: false,
      cornerEdge: 'top_right_corner',
      css: RightBorder,
    },
  ],
});

export type TdProps = {
  row: Row;
  column: Column;
  cell: Cell;
  cornerEdge?: TLCornerEdge;
  hoveringId: Target | null;
  isSelectedColumn: boolean;
  isSelectedRow: boolean;
  isSelected: boolean;
  isEditing: boolean;
  isEditingTableCell: boolean;
  isDraggingColumn: boolean;
  isDraggingRow: boolean;
  isDraggingTable: boolean;
  isEditable: boolean;
  dragX: number | null;
  dragY: number | null;
  value: any;
  minHeight: number;
};

export const Td = React.memo(function Td({
  cornerEdge,
  cell,
  row,
  column,
  hoveringId,
  isSelectedColumn,
  isSelectedRow,
  isSelected,
  isEditing,
  isEditingTableCell,
  isEditable,
  isDraggingColumn,
  isDraggingRow,
  isDraggingTable,
  value,
  dragX,
  dragY,
  minHeight,
}: TdProps) {
  const events = useShapeEvents(cell.target);
  const ref = useRef<HTMLDivElement>(null);
  const [hasSetXY, setHasSetXY] = useState<boolean>(false);

  const isHoveringColumn = !!(
    hoveringId &&
    ((hoveringId.type === 'tableColumn' && hoveringId.id === column.id) ||
      (hoveringId.type === 'tableCell' && hoveringId.columnId === column.id)) &&
    hoveringId.docId === cell.target.docId
  );

  const isHoveringRow = !!(
    hoveringId &&
    ((hoveringId.type === 'tableRow' && hoveringId.id === row.id) ||
      (hoveringId.type === 'tableCell' && hoveringId.rowId === row.id)) &&
    hoveringId.docId === cell.target.docId
  );

  let style: React.CSSProperties = {
    zIndex:
      isSelectedColumn || isSelectedRow || isDraggingRow || isDraggingColumn || isSelected
        ? Z.SYSTEM_MODAL
        : 10,

    width: column.bounds.width,
    minHeight,
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!hasSetXY) {
      const x = cell.bounds.minX + (dragX || 0);
      const y = cell.bounds.minY + (dragY || 0);
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
      setHasSetXY(true);
      return;
    }

    if (isDraggingColumn || isDraggingRow || isEditingTableCell) {
      const x = cell.bounds.minX + (dragX || 0);
      const y = cell.bounds.minY + (dragY || 0);
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      animate(
        ref.current,
        {
          transform: `translate(${cell.bounds.minX}px, ${cell.bounds.minY}px)`,
        },
        animationOptions
      );
    }
  }, [
    ref.current,
    cell.bounds.minX,
    cell.bounds.minY,
    dragX,
    dragY,
    isEditingTableCell,
    isDraggingColumn,
    isDraggingRow,
    hasSetXY,
  ]);

  return (
    <StyledTd
      ref={ref}
      {...events}
      key={cell.target.id}
      cornerEdge={cornerEdge}
      isDragging={isDraggingColumn || isDraggingRow}
      isCellSelected={isSelected}
      isSelectedRow={isSelectedRow}
      isSelectedColumn={isSelectedColumn}
      isDraggingRow={isDraggingRow}
      isDraggingColumn={isDraggingColumn}
      isCellEditing={isEditing}
      className={isSelectedColumn ? 'columnSelected' : ''}
      style={style}
    >
      {(cornerEdge === TLBoundsEdge.Left ||
        cornerEdge === TLBoundsCorner.TopLeft ||
        cornerEdge === TLBoundsCorner.BottomLeft) && (
        <TableHandle
          isVisible={isHoveringRow || isSelectedRow}
          target={row.target}
          isSelected={isSelectedRow}
        />
      )}

      {(cornerEdge === TLBoundsEdge.Top ||
        cornerEdge === TLBoundsCorner.TopLeft ||
        cornerEdge === TLBoundsCorner.TopRight) && (
        <TableHandle
          isVisible={isHoveringColumn || isSelectedColumn}
          target={column.target}
          isSelected={isSelectedColumn}
        />
      )}

      <TableCell
        cell={cell}
        value={value}
        isDragging={isDraggingColumn || isDraggingRow || isDraggingTable}
        isEditable={isEditable}
        isSelected={isSelected}
        isEditing={isEditing}
      />
    </StyledTd>
  );
},
equal);
