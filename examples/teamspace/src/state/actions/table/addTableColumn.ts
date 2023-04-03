import { nanoid } from '../../../utils/nanoid';
import { State, TableTarget } from 'state/constants';
import { sortByFractionalIndex } from 'network/constructTable';
import { generateKeyBetween } from 'utils/fractionalIndexing';

export const addTableColumn = (state: State, target: TableTarget) => {
  const table = state.store.editing.tables[target.id];
  const columnIds = Object.keys(sortByFractionalIndex(table.columns, table.deleted || {}));
  const lastColumnId = columnIds[columnIds.length - 1];
  const lastColumnIndex = table.columns[lastColumnId];

  const newColumnId = nanoid();
  const newColumnIndex = generateKeyBetween(lastColumnIndex, null);

  table.columns[newColumnId] = newColumnIndex;
};
