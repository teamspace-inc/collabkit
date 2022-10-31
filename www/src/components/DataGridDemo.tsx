import { useEffect, useState } from 'react';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import type { ICellRendererParams } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import './ag-theme-collabkit.css';
import * as styles from './DataGridDemo.css';
import {
  Inbox,
  PopoverTrigger,
  Sidebar,
  SidebarInboxButton,
  ThemeProvider,
  usePopoverThread,
} from '@collabkit/react';
import { vars, light } from '../styles/Theme.css';
import { AcmeLogo, Container, Heading, HeadingRow, UI } from '../home/DemoUI';

const AgGridReactAny = AgGridReact as any;

type RowData = {
  id: string;
  account: string;
  budget: string;
  spent: string;
  change: string;
  nested?: true;
};

function CellRenderer(props: ICellRendererParams<RowData>) {
  const cellId = props.data!.id + '_' + props.colDef!.field;
  const { hasThread, popoverState, setPopoverState, context } = usePopoverThread({
    name: props.colDef!.headerName,
    cellId,
    _viewId: 'table-demo',
  });
  useEffect(() => {
    if (cellId === 'row003_budget') {
      setPopoverState('open');
    }
  }, []);
  return (
    <PopoverTrigger context={context}>
      <div
        onClick={() => setPopoverState('open')}
        style={{
          position: 'absolute',
          inset: 0,
          padding: '0 calc(var(--ag-cell-horizontal-padding) - 1px)',
          border: '2px solid transparent',
          ...(popoverState === 'open'
            ? {
                border: '2px solid',
                borderColor: vars.color.blue,
                borderStyle: 'var(--ag-range-selection-border-style)',
                outline: 'initial',
              }
            : null),
        }}
      >
        {props.value}
        {hasThread && <ThreadIndicator />}
      </div>
    </PopoverTrigger>
  );
}

const ThreadIndicator = () => (
  <span
    style={{
      position: 'absolute',
      top: -2,
      right: -2,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '0 8px 8px 0',
      borderColor: `transparent ${vars.color.blue} transparent transparent`,
    }}
  />
);

const cellStyle = { padding: 0, border: 'none' };

export function DataGridDemo() {
  const [rowData] = useState<RowData[]>([
    {
      id: 'row001',
      account: 'Income',
      budget: '$3,000,000',
      spent: '120%',
      change: '-2%',
    },
    {
      id: 'row002',
      account: 'Cost of Goods Sold',
      budget: '$2,000,000',
      spent: '100%',
      change: '-2%',
    },
    {
      id: 'row003',
      account: 'Gross Profit',
      budget: '$2,000,000',
      spent: '37%',
      change: '+16%',
      nested: true,
    },
    {
      id: 'row004',
      account: 'Gross Margin',
      budget: '40%',
      spent: '',
      change: '+12%',
      nested: true,
    },
    {
      id: 'row005',
      account: 'Sales & Marketing',
      budget: '$1,500,000',
      spent: '72%',
      change: '+2%',
    },
    {
      id: 'row006',
      account: 'General and Admin',
      budget: '$1,500,000',
      spent: '134%',
      change: '+7%',
    },
    {
      id: 'row007',
      account: 'Research and Development',
      budget: '$3,000,000',
      spent: '64%',
      change: '-8%',
    },
    {
      id: 'row008',
      account: 'Net Income',
      budget: '$3,000,000',
      spent: '',
      change: '+10%',
      nested: true,
    },
    {
      id: 'row009',
      account: 'Net Income Margin',
      budget: '$400,000',
      spent: '',
      change: '+4%',
      nested: true,
    },
  ]);

  const [columnDefs] = useState<AgGridReactProps['columnDefs']>([
    { headerName: '', field: 'account', cellRenderer: CellRenderer, cellStyle, flex: 1.5 },
    { headerName: 'Budget', field: 'budget', cellRenderer: CellRenderer, cellStyle, flex: 1.5 },
    { headerName: 'Budget Spent', field: 'spent', cellRenderer: CellRenderer, cellStyle, flex: 1 },
    {
      headerName: 'Change',
      field: 'change',
      cellRenderer: CellRenderer,
      cellStyle: (params) => ({
        ...cellStyle,
        color: params.value.startsWith('-') ? vars.color.red : vars.color.green,
      }),
      flex: 1,
    },
  ]);

  return (
    <ThemeProvider theme="dark">
      <div className={light} style={{ display: 'contents' }}>
        <UI>
          <div>
            <AcmeLogo />
          </div>
          <Container>
            <HeadingRow>
              <Heading>Q1 Earnings</Heading>
              <ThemeProvider theme="light">
                <SidebarInboxButton />
              </ThemeProvider>
            </HeadingRow>

            <div className={'ag-theme-collabkit ' + styles.grid}>
              <AgGridReactAny
                columnDefs={columnDefs}
                rowData={rowData}
                modules={[ClientSideRowModelModule]}
                getRowClass={getRowClass}
              />
            </div>
          </Container>
          <Sidebar strategy="absolute">
            <Inbox />
          </Sidebar>
        </UI>
      </div>
    </ThemeProvider>
  );
}
function getRowClass(params: { data?: RowData }) {
  if (params.data?.nested) {
    return styles.nestedRow;
  }
  return undefined;
}
