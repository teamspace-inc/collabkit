import { applyMove } from 'shapes/applyRealtimeUpdates';
import { StateWithSpace } from 'state/constants';
import { findItemIdByDocId } from '../../../utils/findItemIdByDocId';

export const stopTranslating = (data: StateWithSpace) => {
  const space = data.currentSpace;

  const selectedIds = data.store.editing.selectedIds
    .filter(
      (target) =>
        (target.type === 'shape' && space.items[target.id] && !space.items[target.id].isDeleted) ||
        target.type === 'tableCell'
    )
    .map((target) =>
      target.type === 'tableCell' ? findItemIdByDocId(space, target.docId) : target.id
    )
    .filter((target): target is string => typeof target === 'string');

  applyMove(space.optimistic, selectedIds, space.items);
  delete space.optimistic.drag;
  space.pageState.isDragging = false;
};
