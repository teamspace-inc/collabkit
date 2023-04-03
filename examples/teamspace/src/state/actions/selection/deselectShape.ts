import type { State, Target } from 'state/constants';
import { targetEqual } from '../shapes/targetEqual';

export const deselectShape = (state: State, target: Target) => {
  const deleteIndex = state.store.editing.selectedIds.findIndex((selectedTarget) =>
    targetEqual(selectedTarget, target)
  );
  state.store.editing.selectedIds.splice(deleteIndex, 1);
};
