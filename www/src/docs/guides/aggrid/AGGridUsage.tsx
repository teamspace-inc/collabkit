import { ICellRendererParams } from '@ag-grid-community/core';
import { PopoverTrigger, usePopoverThread } from '@collabkit/react';

function CellRenderer(props: ICellRendererParams<RowData>) {
  // a unique id for the cell, used to identify the thread
  const cellId = props.data!.id + '_' + props.colDef!.field;

  const { popoverState, setPopoverState, context } = usePopoverThread({
    name: props.colDef!.headerName,
    cellId,
  });

  return (
    <PopoverTrigger context={context}>
      <div
        onClick={() => setPopoverState('open')}
        style={{
          position: 'absolute',
          inset: 0,
          // used to position the popover exactly at the
          // edge of the AG Grid cell.
          padding: '0 calc(var(--ag-cell-horizontal-padding) - 1px)',
          border: '2px solid transparent',
          ...(popoverState === 'open'
            ? {
                border: '2px solid',
                borderColor: 'blue',
                borderStyle: 'var(--ag-range-selection-border-style)',
                outline: 'initial',
              }
            : null),
        }}
      >
        {props.value}
      </div>
    </PopoverTrigger>
  );
}
