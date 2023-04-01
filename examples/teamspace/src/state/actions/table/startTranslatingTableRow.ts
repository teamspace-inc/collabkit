import { TLPointerInfo, TLTarget } from '@tldraw/core';
import { generateTable } from 'network/constructTable';
import { State } from 'state/constants';
import { mutables } from 'state/mutables';

export const startTranslatingTableRow = (state: State, info: TLPointerInfo<TLTarget>) => {
  const target = state.store.editing.pointingId;
  if (target?.type !== 'tableRow') {
    console.warn('[startTranslatingTableRow]: no row selected');
    return;
  }

  // we need to store the original position of the table
  // columns so we can calculate the new position even
  // as the table is changed by other actions
  mutables.table = generateTable(target.docId, state.store.editing.tables[target.docId]);

  state.store.editing.translating = {
    target,
    delta: [0, 0],
    edge: null,
    index: -1,
  };
};
