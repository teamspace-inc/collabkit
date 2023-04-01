import { TLPointerInfo } from '@tldraw/core';
import { State, TableRowTarget } from 'state/constants';

export const selectTableRow = (state: State, info: TLPointerInfo<TableRowTarget>) => {
  const { docId, id } = info.target;

  const card = state.store.cards[docId];

  if (!card) {
    console.warn('[selectTableRow] No card found with id', docId);
    return;
  }

  if (!id) {
    console.warn('[selectTableRow] Invalid rowId', id);
    return;
  }

  if (!card.doc) {
    console.warn('[selectTableRow] No doc found for card', docId);
    return;
  }

  state.store.editing.selectedIds = [{ type: 'tableRow', id, docId }];
};
