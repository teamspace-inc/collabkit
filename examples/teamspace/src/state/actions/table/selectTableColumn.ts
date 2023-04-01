import { TLPointerInfo } from '@tldraw/core';
import { State, TableColumnTarget } from 'state/constants';

export const selectTableColumn = (state: State, info: TLPointerInfo<TableColumnTarget>) => {
  const { docId, id } = info.target;

  const card = state.store.cards[docId];

  if (!card) {
    console.warn('[selectTableColumn] No card found with id', docId);
    return;
  }

  if (!id) {
    console.warn('[selectTableColumn] Invalid columnId', id);
    return;
  }

  if (!card.doc) {
    console.warn('[selectTableColumn] No doc found for card', docId);
    return;
  }

  state.store.editing.selectedIds = [{ type: 'tableColumn', id, docId }];
};
