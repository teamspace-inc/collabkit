import {
  Cell,
  Column,
  DEFAULT_TABLE_COLUMN_WIDTH,
  DEFAULT_TABLE_ROW_HEIGHT,
  Row,
  Table,
  TableData,
} from 'state/constants';

export function sortByFractionalIndex(data: Record<string, string>, skipIds: Record<string, true>) {
  return Object.keys(data)
    .filter((id) => !skipIds[id])
    .sort((a, b) => {
      const aIndex = data[a];
      const bIndex = data[b];
      return aIndex < bIndex ? -1 : 1;
    })
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {} as typeof data);
}

// convert sparse-matrix representation stored in YJS
// to a more dense array representation that is easier
// to render, a sparse-matrix is a 2d array where
// each cell is null if it's empty.
// we also store 'rowIds' and 'columnIds' which are
// the dimensions of the array, and also provide ordering
// so we can reorder the array without having to reorder
// the cells.
// rowHeights and columnWidths are stored so we can provider
// user resized columns and rows that resize based on the content
// of the cells.
export function generateTable(docId: string, data: TableData) {
  const {
    cellValues,
    columns: columnData,
    rows: rowData,
    columnWidths,
    rowHeights,
    deleted,
  } = data;

  function getColumnWidth(columnId: string) {
    return columnWidths?.[columnId] ?? DEFAULT_TABLE_COLUMN_WIDTH;
  }

  function getRowHeight(rowId: string) {
    return rowHeights?.[rowId] ?? DEFAULT_TABLE_ROW_HEIGHT;
  }

  let tableWidth = 0;

  for (const columnId in columnData) {
    if (deleted?.[columnId]) {
      continue;
    }
    tableWidth += getColumnWidth(columnId);
  }

  let tableHeight = 0;

  for (const rowId in rowData) {
    if (deleted?.[rowId]) {
      continue;
    }
    tableHeight += getRowHeight(rowId);
  }

  let rowOffset = 0;
  let rowIndex = 0;

  const rows: Record<string, Row> = {};
  const columns: Column[] = [];

  const orderedRowData = sortByFractionalIndex(rowData, deleted || {});
  const orderedColumnData = sortByFractionalIndex(columnData, deleted || {});

  for (const rowId in orderedRowData) {
    let columnOffset = 0;

    const cells: Record<string, Cell> = {};

    const height = getRowHeight(rowId);

    let columnIndex = 0;
    for (const columnId in orderedColumnData) {
      const width = getColumnWidth(columnId);
      const height = getRowHeight(rowId);

      if (rowIndex === 0) {
        columns.push({
          index: columnIndex,
          id: columnId,
          target: {
            id: columnId,
            docId,
            type: 'tableColumn',
          },
          title: '',
          bounds: {
            minX: columnOffset,
            minY: 0,
            maxX: columnOffset + width,
            maxY: tableHeight,
            width,
            height: tableHeight,
          },
        });
      }

      const cellId = `${columnId}-${rowId}`;
      const value = (cellValues?.[cellId] as string | undefined) ?? '';

      cells[columnId] = {
        rowIndex,
        columnIndex,
        value,
        target: {
          id: cellId,
          columnId,
          rowId,
          docId,
          type: 'tableCell',
        },

        // we're only using the height to autosize
        // the table rows, so the rest are left blank
        // for now
        bounds: {
          minX: columnOffset,
          minY: rowOffset,
          maxX: columnOffset + width,
          maxY: rowOffset + height,
          width: width,
          height: height,
        },
      };

      columnOffset += width;
      columnIndex += 1;
    }
    rows[rowId] = {
      index: rowIndex,
      id: rowId,
      target: {
        id: rowId,
        docId,
        type: 'tableRow',
      },
      bounds: {
        minX: 0,
        minY: rowOffset,
        maxX: 0,
        maxY: rowOffset + height,
        width: tableWidth,
        height,
      },
      cells,
    };
    rowOffset += height;
    rowIndex += 1;
  }

  const tableData: Table = {
    size: [Object.keys(rows).length, columns.length],
    rows,
    columns,
    target: {
      id: docId,
      type: 'table',
    },
    bounds: {
      minX: 0,
      maxX: tableWidth,
      minY: 0,
      maxY: tableHeight,
      width: tableWidth,
      height: tableHeight,
    },
  };

  return tableData;
}
