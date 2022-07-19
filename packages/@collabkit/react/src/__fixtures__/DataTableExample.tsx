// Adapted from: https://github.com/jbetancur/react-data-table-component/blob/02cfb7285cbb4d3f337e5f3b56c4e9ee3a1a24e2/stories/DataTable/KitchenSink.stories.tsx
import React from 'react';
import Icon1 from '@material-ui/icons/ReplyAll';
import Icon2 from '@material-ui/icons/Markunread';
import Icon3 from '@material-ui/icons/CloudDownload';
import TextField from '@material-ui/core/TextField';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import data from './datasets/sampleMovieData';
import DataTable, {
  Alignment,
  Direction,
  TableProps,
  TableColumn,
  ExpanderComponentProps,
} from 'react-data-table-component';

export { Alignment, Direction };

interface Row {
  title: string;
  director: string;
  year: string;
}

const ExpandableRowComponent: React.FC<ExpanderComponentProps<Row>> = ({ data }) => {
  return (
    <>
      <p>{data.title}</p>
      <p>{data.director}</p>
      <p>{data.year}</p>
    </>
  );
};

const subHeaderComponent = (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      style={{ margin: '5px' }}
    />
    <Icon1 style={{ margin: '5px' }} color="action" />
    <Icon2 style={{ margin: '5px' }} color="action" />
    <Icon3 style={{ margin: '5px' }} color="action" />
  </div>
);

const columns: TableColumn<Row>[] = [
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Director',
    selector: (row) => row.director,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Year',
    selector: (row) => row.year,
    sortable: true,
    reorder: true,
  },
];

interface TablePropsExtended extends TableProps<Row> {
  selectableRowsRadio: boolean;
}

export default function DataTableExample({
  selectableRows,
  selectableRowsNoSelectAll,
  selectableRowsVisibleOnly,
  selectableRowsHighlight,
  selectableRowsSingle,
  expandableRows,
  expandOnRowClicked,
  expandOnRowDoubleClicked,
  expandableRowsHideExpander,
  pagination,
  highlightOnHover,
  striped,
  pointerOnHover,
  dense,
  persistTableHead,
  noHeader,
  fixedHeader,
  fixedHeaderScrollHeight,
  progressPending,
  selectableRowsRadio,
  noTableHead,
  noContextMenu,
  direction,
  subHeader,
  subHeaderAlign,
  subHeaderWrap,
  responsive,
  disabled,
}: TablePropsExtended): JSX.Element {
  const selectableRowsComponentProps = React.useMemo(
    () => ({
      type: selectableRowsRadio ? 'radio' : 'checkbox',
    }),
    [selectableRowsRadio]
  );

  return (
    <DataTable
      title="Movie List"
      columns={columns}
      data={data}
      defaultSortFieldId={1}
      selectableRows={selectableRows}
      selectableRowsComponentProps={selectableRowsComponentProps}
      selectableRowsNoSelectAll={selectableRowsNoSelectAll}
      selectableRowsHighlight={selectableRowsHighlight}
      selectableRowsSingle={selectableRowsSingle}
      selectableRowsVisibleOnly={selectableRowsVisibleOnly}
      expandableRows={expandableRows}
      expandableRowsComponent={ExpandableRowComponent}
      expandOnRowClicked={expandOnRowClicked}
      expandOnRowDoubleClicked={expandOnRowDoubleClicked}
      expandableRowsHideExpander={expandableRowsHideExpander}
      pagination={pagination}
      highlightOnHover={highlightOnHover}
      striped={striped}
      pointerOnHover={pointerOnHover}
      dense={dense}
      noTableHead={noTableHead}
      persistTableHead={persistTableHead}
      progressPending={progressPending}
      noHeader={noHeader}
      subHeader={subHeader}
      subHeaderComponent={subHeaderComponent}
      subHeaderAlign={subHeaderAlign}
      subHeaderWrap={subHeaderWrap}
      noContextMenu={noContextMenu}
      fixedHeader={fixedHeader}
      fixedHeaderScrollHeight={fixedHeaderScrollHeight}
      direction={direction}
      responsive={responsive}
      disabled={disabled}
    />
  );
}

export const DataTableExampleArgs = {
  selectableRows: false,
  selectableRowsNoSelectAll: false,
  selectableRowsVisibleOnly: false,
  selectableRowsHighlight: false,
  selectableRowsSingle: false,
  expandableRows: false,
  expandOnRowClicked: false,
  expandOnRowDoubleClicked: false,
  expandableRowsHideExpander: false,
  pagination: true,
  highlightOnHover: false,
  striped: false,
  pointerOnHover: false,
  dense: false,
  persistTableHead: false,
  noHeader: false,
  fixedHeader: false,
  fixedHeaderScrollHeight: '300px',
  progressPending: false,
  noTableHead: false,
  noContextMenu: false,
  direction: Direction.AUTO,
  subHeader: false,
  subHeaderAlign: Alignment.RIGHT,
  subHeaderWrap: true,
  responsive: true,
  disabled: false,
};
