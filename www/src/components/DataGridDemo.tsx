import { useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import './ag-theme-collabkit.css';
import * as styles from './DataGridDemo.css';
import * as uiStyles from './UI.css';
import { InboxButton } from '@collabkit/react';
import { AcmeLogo } from './AcmeLogo';

const AgGridReactAny = AgGridReact as any;

type RowData = {
  account: string;
  budget: string;
  spent: string;
  change: string;
  nested?: true;
};

export function DataGridDemo() {
  const [rowData] = useState<RowData[]>([
    { account: 'Income', budget: '$3,000,000', spent: '120%', change: '-2%' },
    { account: 'Cost of Goods Sold', budget: '$2,000,000', spent: '100%', change: '-2%' },
    { account: 'Gross Profit', budget: '$2,000,000', spent: '37%', change: '+16%', nested: true },
    { account: 'Gross Margin', budget: '40%', spent: '', change: '+12%', nested: true },
    { account: 'Sales & Marketing', budget: '$1,500,000', spent: '72%', change: '+2%' },
    { account: 'General and Admin', budget: '$1,500,000', spent: '134%', change: '+7%' },
    { account: 'Research and Development', budget: '$3,000,000', spent: '64%', change: '-8%' },
    { account: 'Net Income', budget: '$3,000,000', spent: '', change: '+10%', nested: true },
    { account: 'Net Income Margin', budget: '$400,000', spent: '', change: '+4%', nested: true },
  ]);

  const [columnDefs] = useState([
    { headerName: '', field: 'account' },
    { headerName: 'Budget', field: 'budget' },
    { headerName: 'Budget Spent', field: 'spent' },
    { headerName: 'Change', field: 'change' },
  ]);

  return (
    <div className={uiStyles.ui}>
      <div>
        <AcmeLogo />
      </div>
      <div>
        <span>online</span> <span>[facepile]</span>
      </div>
      <div className={uiStyles.container}>
        <div className={uiStyles.headingRow}>
          <span className={uiStyles.heading}>Q1 Earnings</span>
          <InboxButton />
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
    </div>
  );
}

function getRowClass(params: { data?: RowData }) {
  if (params.data?.nested) {
    return styles.nestedRow;
  }
  return undefined;
}
