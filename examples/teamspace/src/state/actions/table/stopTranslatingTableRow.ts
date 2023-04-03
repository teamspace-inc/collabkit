import { TLBoundsEdge } from '@tldraw/core';
import { State } from 'state/constants';
import { mutables } from 'state/mutables';
import { generateKeyBetween } from 'utils/fractionalIndexing';

export const stopTranslatingTableRow = (state: State) => {
  const target = state.store.editing.pointingId;

  if (!target || target.type !== 'tableRow' || !state.store.editing.translating) {
    return;
  }

  const table = state.store.editing.tables[target.docId];

  const { index, edge } = state.store.editing.translating;

  if (!edge || index < 0) {
    return;
  }

  if (!mutables.table) {
    return;
  }

  let a = -1,
    b = -1;

  switch (edge) {
    case TLBoundsEdge.Top:
      a = index - 1;
      b = index;
      break;
    case TLBoundsEdge.Bottom:
      a = index;
      b = index + 1;
      break;
  }

  let rowAId = Object.keys(mutables.table.rows)[a];
  let rowBId = Object.keys(mutables.table.rows)[b];

  let rowAFrIndex = table.rows[rowAId] || null;
  let rowBFrIndex = table.rows[rowBId] || null;

  let newFrIndex = generateKeyBetween(rowAFrIndex, rowBFrIndex);

  state.store.editing.tables[target.docId].rows[target.id] = newFrIndex;

  state.store.editing.translating = null;
  state.store.editing.pointingId = null;

  mutables.table = undefined;
};
