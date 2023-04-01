import { State, Target } from 'state/constants';
import { findItemIdByDocId } from 'utils/findItemIdByDocId';

export function isInCurrentSpace(state: State, target: Target) {
  if (!state.currentSpace) {
    return false;
  }

  if (target.type === 'card' || target.type === 'table') {
    return !!findItemIdByDocId(state.currentSpace, target.id);
  }

  if (target.type === 'shape') {
    return !!state.currentSpace.items[target.id];
  }

  return false;
}
