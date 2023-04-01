import { nanoid } from '../../../utils/nanoid';
import { State, TableTarget } from 'state/constants';
import { sortByFractionalIndex } from 'network/constructTable';
import { generateKeyBetween } from 'utils/fractionalIndexing';

export const addTableRow = (state: State, target: TableTarget) => {
  const table = state.store.editing.tables[target.id];
  const rowIds = Object.keys(sortByFractionalIndex(table.rows, table.deleted || {}));
  const lastRowId = rowIds[rowIds.length - 1];
  const lastRowIndex = table.rows[lastRowId];

  const newRowId = nanoid();
  const newRowIndex = generateKeyBetween(lastRowIndex, null);

  table.rows[newRowId] = newRowIndex;
};
