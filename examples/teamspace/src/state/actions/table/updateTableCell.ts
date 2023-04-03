import { State, TableCellTarget } from 'state/constants';

export const updateTableCell = (state: State, payload: { target: TableCellTarget; value: any }) => {
  const { target } = payload;

  if (!target) {
    return;
  }

  const card = state.store.cards[target.docId];

  if (!card) {
    console.warn('[updateTableCell] No card found', target);
    return;
  }

  if (!card.doc) {
    console.warn('[updateTableCell] No doc found for card', target);
    return;
  }

  state.store.editing.tables[target.docId].cellValues[target.id] = payload.value;
};
