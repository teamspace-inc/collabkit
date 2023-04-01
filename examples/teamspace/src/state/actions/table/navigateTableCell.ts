import { TLKeyboardInfo } from '@tldraw/core';
import { generateTable } from 'network/constructTable';
import { State, TableCellTarget } from 'state/constants';
import { targetEqual } from '../shapes/targetEqual';

export const navigateTableCell = (state: State, info: TLKeyboardInfo) => {
  const selectedTableCells = state.store.editing.selectedIds.filter(
    (target): target is TableCellTarget => target.type === 'tableCell'
  );

  if (selectedTableCells.length === 0) {
    console.warn('navigateTableCell: no selected table cells');
    return;
  }

  // In Google Sheets, the first selected
  // cell is used for Arrow key navigation
  // lets do the same here.
  let anchor = selectedTableCells[0];

  const table = generateTable(anchor.docId, state.store.editing.tables[anchor.docId]);

  let rowPos = 0;
  let colPos = 0;

  let [numRows, numCols] = table.size;

  for (const rowId in table.rows) {
    if (rowId === anchor.rowId) {
      break;
    }
    rowPos += 1;
  }

  for (const index in table.columns) {
    if (table.columns[index].id === anchor.columnId) {
      break;
    }
    colPos += 1;
  }

  let [newRowPos, newColPos] = [rowPos, colPos];

  function left(shouldGoToPrevRow = false) {
    if (colPos === 0) {
      newColPos = numCols - 1;
      if (shouldGoToPrevRow) {
        if (newRowPos < numRows - 1) {
          newRowPos -= 1;
        } else {
          newRowPos = 0;
        }
      }
    } else {
      newColPos -= 1;
    }
  }

  function up() {
    if (rowPos === 0) {
      newRowPos = numRows - 1;
    } else {
      newRowPos -= 1;
    }
  }

  function down() {
    if (rowPos === numRows - 1) {
      newRowPos = 0;
    } else {
      newRowPos += 1;
    }
  }

  function right(shouldGoToNextRow = false) {
    if (colPos === numCols - 1) {
      newColPos = 0;
      if (shouldGoToNextRow) {
        if (newRowPos < numRows - 1) {
          newRowPos += 1;
        } else {
          newRowPos = 0;
        }
      }
    } else {
      newColPos += 1;
    }
  }

  switch (info.key) {
    case 'ArrowUp': {
      up();
      break;
    }
    case 'ArrowDown': {
      down();
      break;
    }
    case 'ArrowLeft': {
      left();
      break;
    }
    case 'ArrowRight': {
      right();
      break;
    }
  }

  // if we use Shift+Arrow we
  // want to increase/decrease
  // the existing selection in
  // the direction of the arrow
  // bounds

  // but if we use Shift+Tab,
  // then we simply want to move
  // left, and not increase/decrease
  // the selection.
  // let useShiftKey = info.shiftKey;

  if (info.key === 'Tab') {
    if (info.shiftKey) {
      // useShiftKey = false;
      left(true);
    } else {
      right(true);
    }
  }

  const newRowId = Object.keys(table.rows)[newRowPos];
  if (!newRowId) {
    return;
  }
  const newColumn = table.columns[newColPos];
  if (!newColumn) {
    return;
  }

  const newTarget: TableCellTarget = {
    type: 'tableCell',
    docId: anchor.docId,
    rowId: newRowId,
    columnId: newColumn.id,
    id: `${newColumn.id}-${newRowId}`,
  };

  // @todo nc, figure out how to add support
  // for shiftKey selection.
  // if (useShiftKey) {
  //   const index = state.store.editing.selectedIds.findIndex((target) =>
  //     targetEqual(target, newTarget)
  //   );
  //   if (index > -1) {
  //     state.store.editing.selectedIds.splice(index, 1);
  //   } else {
  //     state.store.editing.selectedIds = [newTarget, ...state.store.editing.selectedIds];
  //   }
  // } else {

  state.store.editing.selectedIds = [newTarget];
  if (targetEqual(state.store.editing.editingId, anchor)) {
    state.store.editing.editingId = newTarget;
  }
};
