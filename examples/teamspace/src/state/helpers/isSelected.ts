import { State, Target } from '../constants';
import { targetEqual } from 'state/helpers/targetEqual';

export function isTargetSelected(state: State, target: Target) {
  return state.store.editing.selectedIds.some((a) => targetEqual(a, target));
}
