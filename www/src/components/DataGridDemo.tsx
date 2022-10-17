import { useState } from 'react';
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
  const { hasThread, popoverState, context } = usePopoverThread({
    name: props.colDef!.headerName,
    cellId: props.data!.id + '_' + props.colDef!.field,
    openOnClick: true,
  });
  return (
    <PopoverTrigger context={context}>
      <div
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
      id: 'row-4V9aMhjU3_2WRBnnGVZo4',
      account: 'Income',
      budget: '$3,000,000',
      spent: '120%',
      change: '-2%',
    },
    {
      id: 'row-ToeceSzBVwpLIeJOBrOr6',
      account: 'Cost of Goods Sold',
      budget: '$2,000,000',
      spent: '100%',
      change: '-2%',
    },
    {
      id: 'row-C05Y02ZDZIoisnSxQEYRI',
      account: 'Gross Profit',
      budget: '$2,000,000',
      spent: '37%',
      change: '+16%',
      nested: true,
    },
    {
      id: 'row-8y3Jnq3e7jyxm32CcZsGD',
      account: 'Gross Margin',
      budget: '40%',
      spent: '',
      change: '+12%',
      nested: true,
    },
    {
      id: 'row-Pd5ZW67p8XT_WAX4A5GZ0',
      account: 'Sales & Marketing',
      budget: '$1,500,000',
      spent: '72%',
      change: '+2%',
    },
    {
      id: 'row-rQ8revfytBOd6ltVi_j9r',
      account: 'General and Admin',
      budget: '$1,500,000',
      spent: '134%',
      change: '+7%',
    },
    {
      id: 'row-GX0pmL9PEiIFAGXH15agq',
      account: 'Research and Development',
      budget: '$3,000,000',
      spent: '64%',
      change: '-8%',
    },
    {
      id: 'row-Khya64ekcbUtGN5RDu8NC',
      account: 'Net Income',
      budget: '$3,000,000',
      spent: '',
      change: '+10%',
      nested: true,
    },
    {
      id: 'row-L3gsbnl6PROqLEWs8zYTN',
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
    { headerName: 'Change', field: 'change', cellRenderer: CellRenderer, cellStyle, flex: 1 },
  ]);

  return (
    <ThemeProvider theme={location.search.includes('lightDemos') ? 'light' : 'dark'}>
      <div className={light} style={{ display: 'contents' }}>
        <div className={styles.ui}>
          <div>
            <AcmeLogo />
          </div>
          {/* <div>
        <span>online</span> <span>[facepile]</span>
      </div> */}
          <div className={styles.container}>
            <div className={styles.headingRow}>
              <span className={styles.heading}>Q1 Earnings</span>
              <ThemeProvider theme="light">
                <SidebarInboxButton />
              </ThemeProvider>
            </div>

            <div className={'ag-theme-collabkit ' + styles.grid}>
              <AgGridReactAny
                columnDefs={columnDefs}
                rowData={rowData}
                modules={[ClientSideRowModelModule]}
                getRowClass={getRowClass}
              />
            </div>
          </div>
          <Sidebar strategy="absolute">
            <Inbox />
          </Sidebar>
        </div>
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

function AcmeLogo() {
  return (
    <svg width="87" height="15" viewBox="0 0 87 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.8 3.92L4.14 9.02H7.42L5.8 3.92ZM0.18 14V12.92L1.8 12.68L5.86 0.839999H7.92L12.02 12.82L13.24 12.96V14H7.06V12.96L8.6 12.76L7.78 10.18H3.76L2.96 12.68L4.48 12.92V14H0.18ZM18.0455 14.3C17.1388 14.3 16.3055 14.1133 15.5455 13.74C14.7988 13.3533 14.1988 12.78 13.7455 12.02C13.2921 11.26 13.0655 10.32 13.0655 9.2C13.0655 8.10667 13.3055 7.17333 13.7855 6.4C14.2788 5.62667 14.9321 5.04 15.7455 4.64C16.5721 4.22667 17.4788 4.02 18.4655 4.02C19.1721 4.02 19.7988 4.15333 20.3455 4.42C20.8921 4.68667 21.3255 5.04 21.6455 5.48C21.9788 5.92 22.1655 6.40667 22.2055 6.94C21.9921 7.63333 21.5388 7.98 20.8455 7.98C20.4588 7.98 20.1188 7.84 19.8255 7.56C19.5321 7.28 19.3655 6.78667 19.3255 6.08L19.1855 5.08C19.1321 5.06667 19.0721 5.06 19.0055 5.06C18.9388 5.06 18.8721 5.06 18.8055 5.06C18.4321 5.06 18.0588 5.18667 17.6855 5.44C17.3121 5.69333 17.0055 6.09333 16.7655 6.64C16.5255 7.18667 16.4055 7.91333 16.4055 8.82C16.4055 9.96667 16.6588 10.8533 17.1655 11.48C17.6855 12.0933 18.3655 12.4 19.2055 12.4C19.6855 12.4 20.1055 12.3 20.4655 12.1C20.8255 11.8867 21.1521 11.6133 21.4455 11.28L22.1455 11.9C21.7588 12.7133 21.2121 13.32 20.5055 13.72C19.8121 14.1067 18.9921 14.3 18.0455 14.3ZM22.7194 14V13.06L23.7994 12.82C23.8127 12.34 23.8194 11.82 23.8194 11.26C23.8194 10.7 23.8194 10.2133 23.8194 9.8V8.64C23.8194 8.09333 23.8127 7.67333 23.7994 7.38C23.7994 7.07333 23.786 6.72 23.7594 6.32L22.5394 6.14V5.36L26.4794 4.02L26.8394 4.24L26.9594 5.68C27.426 5.13333 27.9127 4.72 28.4194 4.44C28.9394 4.16 29.4927 4.02 30.0794 4.02C31.4527 4.02 32.3394 4.61333 32.7394 5.8C33.286 5.13333 33.8127 4.67333 34.3194 4.42C34.8394 4.15333 35.386 4.02 35.9594 4.02C36.9727 4.02 37.7127 4.31333 38.1794 4.9C38.646 5.48667 38.8794 6.37333 38.8794 7.56V9.8C38.8794 10.2267 38.8794 10.72 38.8794 11.28C38.8794 11.84 38.886 12.36 38.8994 12.84L39.8994 13.06V14H34.7394V13.06L35.7194 12.82C35.7327 12.34 35.7394 11.8267 35.7394 11.28C35.7394 10.72 35.7394 10.2267 35.7394 9.8V7.86C35.7394 7.11333 35.6527 6.61333 35.4794 6.36C35.306 6.09333 35.0127 5.96 34.5994 5.96C34.0394 5.96 33.4794 6.2 32.9194 6.68C32.9327 6.8 32.9394 6.92667 32.9394 7.06C32.9527 7.18 32.9594 7.31333 32.9594 7.46V9.8C32.9594 10.24 32.9594 10.74 32.9594 11.3C32.9594 11.8467 32.966 12.3667 32.9794 12.86L33.9194 13.06V14H28.7594V13.06L29.7994 12.82C29.8127 12.34 29.8194 11.8267 29.8194 11.28C29.8194 10.72 29.8194 10.2267 29.8194 9.8V7.88C29.8194 7.17333 29.7327 6.68 29.5594 6.4C29.3994 6.10667 29.0994 5.96 28.6594 5.96C28.3794 5.96 28.0994 6.02667 27.8194 6.16C27.5394 6.29333 27.2727 6.46667 27.0194 6.68V9.8C27.0194 10.2133 27.0194 10.7067 27.0194 11.28C27.0194 11.84 27.026 12.3667 27.0394 12.86L27.9794 13.06V14H22.7194ZM45.2239 5.06C44.8506 5.06 44.5039 5.29333 44.1839 5.76C43.8772 6.21333 43.7039 7.05333 43.6639 8.28H45.3639C45.8439 8.28 46.1639 8.18667 46.3239 8C46.4972 7.8 46.5839 7.47333 46.5839 7.02C46.5839 6.35333 46.4506 5.86 46.1839 5.54C45.9172 5.22 45.5972 5.06 45.2239 5.06ZM45.2639 14.3C44.2906 14.3 43.4306 14.1 42.6839 13.7C41.9372 13.2867 41.3506 12.7 40.9239 11.94C40.4972 11.1667 40.2839 10.2467 40.2839 9.18C40.2839 8.06 40.5306 7.12 41.0239 6.36C41.5306 5.58667 42.1772 5.00667 42.9639 4.62C43.7506 4.22 44.5706 4.02 45.4239 4.02C46.3039 4.02 47.0506 4.20667 47.6639 4.58C48.2906 4.95333 48.7639 5.46 49.0839 6.1C49.4039 6.72667 49.5639 7.44667 49.5639 8.26C49.5639 8.64667 49.5239 9 49.4439 9.32H43.6639C43.7306 10.3733 44.0172 11.1533 44.5239 11.66C45.0439 12.1533 45.6506 12.4 46.3439 12.4C46.8906 12.4 47.3572 12.3 47.7439 12.1C48.1306 11.8867 48.4706 11.6267 48.7639 11.32L49.4639 11.96C49.0506 12.7467 48.4906 13.3333 47.7839 13.72C47.0772 14.1067 46.2372 14.3 45.2639 14.3ZM53.8709 1.94V0.86H60.3109V1.94L58.8109 2.1C58.7976 2.91333 58.7843 3.73333 58.7709 4.56C58.7709 5.38667 58.7709 6.22 58.7709 7.06V7.78C58.7709 8.60667 58.7709 9.44 58.7709 10.28C58.7843 11.1067 58.7976 11.9333 58.8109 12.76L60.3109 12.92V14H53.8709V12.92L55.3709 12.76C55.3976 11.9467 55.4109 11.1267 55.4109 10.3C55.4109 9.47333 55.4109 8.64 55.4109 7.8V7.06C55.4109 6.23333 55.4109 5.40667 55.4109 4.58C55.4109 3.74 55.3976 2.91333 55.3709 2.1L53.8709 1.94ZM60.9248 14V13.06L62.0048 12.82C62.0182 12.34 62.0248 11.82 62.0248 11.26C62.0248 10.7 62.0248 10.2133 62.0248 9.8V8.64C62.0248 8.09333 62.0182 7.67333 62.0048 7.38C62.0048 7.07333 61.9915 6.72 61.9648 6.32L60.7448 6.14V5.36L64.6848 4.02L65.0448 4.24L65.1648 5.68C65.6848 5.06667 66.1982 4.64 66.7048 4.4C67.2248 4.14667 67.7782 4.02 68.3648 4.02C69.2315 4.02 69.9248 4.30667 70.4448 4.88C70.9782 5.45333 71.2448 6.31333 71.2448 7.46V9.8C71.2448 10.24 71.2448 10.74 71.2448 11.3C71.2448 11.8467 71.2515 12.3667 71.2648 12.86L72.2648 13.06V14H66.9848V13.06L68.0248 12.84C68.0382 12.3467 68.0448 11.8267 68.0448 11.28C68.0448 10.72 68.0448 10.2267 68.0448 9.8V7.7C68.0448 7.06 67.9582 6.61333 67.7848 6.36C67.6115 6.09333 67.3315 5.96 66.9448 5.96C66.4248 5.96 65.8515 6.2 65.2248 6.68V9.8C65.2248 10.2133 65.2248 10.7067 65.2248 11.28C65.2248 11.84 65.2315 12.3667 65.2448 12.86L66.1848 13.06V14H60.9248ZM77.6291 14.3C76.7224 14.3 75.8891 14.1133 75.1291 13.74C74.3824 13.3533 73.7824 12.78 73.3291 12.02C72.8757 11.26 72.6491 10.32 72.6491 9.2C72.6491 8.10667 72.8891 7.17333 73.3691 6.4C73.8624 5.62667 74.5157 5.04 75.3291 4.64C76.1557 4.22667 77.0624 4.02 78.0491 4.02C78.7557 4.02 79.3824 4.15333 79.9291 4.42C80.4757 4.68667 80.9091 5.04 81.2291 5.48C81.5624 5.92 81.7491 6.40667 81.7891 6.94C81.5757 7.63333 81.1224 7.98 80.4291 7.98C80.0424 7.98 79.7024 7.84 79.4091 7.56C79.1157 7.28 78.9491 6.78667 78.9091 6.08L78.7691 5.08C78.7157 5.06667 78.6557 5.06 78.5891 5.06C78.5224 5.06 78.4557 5.06 78.3891 5.06C78.0157 5.06 77.6424 5.18667 77.2691 5.44C76.8957 5.69333 76.5891 6.09333 76.3491 6.64C76.1091 7.18667 75.9891 7.91333 75.9891 8.82C75.9891 9.96667 76.2424 10.8533 76.7491 11.48C77.2691 12.0933 77.9491 12.4 78.7891 12.4C79.2691 12.4 79.6891 12.3 80.0491 12.1C80.4091 11.8867 80.7357 11.6133 81.0291 11.28L81.7291 11.9C81.3424 12.7133 80.7957 13.32 80.0891 13.72C79.3957 14.1067 78.5757 14.3 77.6291 14.3ZM84.4695 14.3C83.9629 14.3 83.5362 14.1267 83.1895 13.78C82.8429 13.4333 82.6695 13.0133 82.6695 12.52C82.6695 12.0267 82.8429 11.6 83.1895 11.24C83.5362 10.88 83.9629 10.7 84.4695 10.7C84.9762 10.7 85.4029 10.88 85.7495 11.24C86.0962 11.6 86.2695 12.0267 86.2695 12.52C86.2695 13.0133 86.0962 13.4333 85.7495 13.78C85.4029 14.1267 84.9762 14.3 84.4695 14.3Z"
        fill="#222222"
      />
    </svg>
  );
}
