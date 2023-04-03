import { TLBoundsEdge } from '@tldraw/core';
import { State } from 'state/constants';
import { mutables } from 'state/mutables';
import { generateKeyBetween } from 'utils/fractionalIndexing';

export const stopTranslatingTableColumn = (state: State) => {
  const target = state.store.editing.pointingId;

  if (!target || target.type !== 'tableColumn' || !state.store.editing.translating) {
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
    case TLBoundsEdge.Left:
      a = index - 1;
      b = index;
      break;
    case TLBoundsEdge.Right:
      a = index;
      b = index + 1;
      break;
  }

  let columnA = mutables.table.columns[a];
  let columnB = mutables.table.columns[b];

  let columnAFrIndex = table.columns[columnA?.id] || null;
  let columnBFrIndex = table.columns[columnB?.id] || null;

  let newFrIndex = generateKeyBetween(columnAFrIndex, columnBFrIndex);

  state.store.editing.tables[target.docId].columns[target.id] = newFrIndex;

  state.store.editing.translating = null;
  state.store.editing.pointingId = null;

  mutables.table = undefined;
};
