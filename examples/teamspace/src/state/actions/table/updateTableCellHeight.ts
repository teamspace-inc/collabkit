import { State, TableCellTarget } from 'state/constants';
import { mutables } from 'state/mutables';

export const updateTableCellHeight = (
  state: State,
  payload: { target: TableCellTarget; height: any }
) => {
  const { target, height } = payload;

  const card = state.store.cards[target.docId];

  if (!card) {
    console.warn('[updateTableCellHeight] No card found with id', target.docId);
    return;
  }

  const { doc } = card;

  if (!doc) {
    console.warn('[updateTableCellHeight] No doc found for card', target.docId);
    return;
  }

  // we track this in mutables, because the only data we need to sync
  // to other clients is the row height, the mutables data is used make
  // sure we don't make a row too small based on updating just one cells height
  mutables.tableCellHeights[target.rowId] ||= {};
  mutables.tableCellHeights[target.rowId][target.columnId] = height;

  const minHeight = Math.max(...Object.values(mutables.tableCellHeights[target.rowId]));

  const table = state.store.editing.tables[target.docId];

  if (table.rowHeights[target.rowId] === minHeight) {
    return;
  }

  table.rowHeights[target.rowId] = minHeight;
};
