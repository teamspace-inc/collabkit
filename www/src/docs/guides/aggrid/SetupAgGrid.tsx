import { useState } from 'react';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import type { ICellRendererParams } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import './ag-theme-collabkit.css';

const AgGridReactAny = AgGridReact as any;

type RowData = {
  id: string;
  account: string;
  budget: string;
  change: string;
  nested?: true;
};

function CellRenderer(props: ICellRendererParams<RowData>) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '0 calc(var(--ag-cell-horizontal-padding) - 1px)',
        border: '2px solid transparent',
      }}
    >
      {props.value}
    </div>
  );
}

const cellStyle = { padding: 0, border: 'none' };

export function DataGridDemo(props: { onlyTable?: boolean }) {
  const [rowData] = useState<RowData[]>([
    {
      id: 'row001',
      account: 'Income',
      budget: '$3,000,000',
      change: '-2%',
    },
    {
      id: 'row002',
      account: 'Cost of Goods Sold',
      budget: '$2,000,000',
      change: '-2%',
    },
  ]);

  const [columnDefs] = useState<AgGridReactProps['columnDefs']>([
    { headerName: '', field: 'account', cellRenderer: CellRenderer, cellStyle, flex: 1.5 },
    { headerName: 'Budget', field: 'budget', cellRenderer: CellRenderer, cellStyle, flex: 1.5 },
    {
      headerName: 'Change',
      field: 'change',
      cellRenderer: CellRenderer,
      cellStyle: (params) => ({
        ...cellStyle,
      }),
      flex: 1,
    },
  ]);

  return (
    <div style={{ minWidth: 500, height: 430 }}>
      <AgGridReactAny
        columnDefs={columnDefs}
        rowData={rowData}
        modules={[ClientSideRowModelModule]}
      />
    </div>
  );
}
