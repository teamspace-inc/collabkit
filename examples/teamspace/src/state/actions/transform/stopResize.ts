// import { TLBoundsCorner, TLBoundsEdge } from '@tldraw/core';

// import { applyResize } from 'shapes/applyRealtimeUpdates';
import assert from 'utils/assert';
import { State } from 'state/constants';
// import { mutables } from 'state/mutables';

export const stopResize = (state: State) => {
  assert(state.currentSpace, '[stopResize] No currentSpace');
  // TODO: implement
  const { /* items */ optimistic, pageState } = state.currentSpace;
  // const selectedIds = state.store.editing.selectedIds.filter(
  //   (target) => target.type === 'shape' && items[target.id] && !items[target.id].isDeleted
  // );
  // applyResize(
  //   optimistic,
  //   selectedIds.map((target) => target.id),
  //   mutables.pointedBoundsHandleId as TLBoundsCorner | TLBoundsEdge,
  //   items
  // );
  delete optimistic.resize;
  pageState.isResizing = false;
};
